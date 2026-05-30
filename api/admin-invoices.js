const { getPool } = require('./_db');
const { verifyAdmin } = require('./_auth');

// Admin management of invoices / payments.
//   GET                        -> all invoices joined to client name
//   POST { action:'create' }   -> issue an invoice
//   POST { action:'update' }   -> edit invoice
//   POST { action:'setStatus'} -> mark Paid / Due / Overdue (sets paid_at)
//   POST { action:'delete' }   -> remove an invoice
module.exports = async (req, res) => {
  if (!verifyAdmin(req)) return res.status(403).json({ error: 'Forbidden' });
  const pool = getPool();

  try {
    if (req.method === 'GET') {
      const result = await pool.query(`
        SELECT i.*, u.use1 AS client_username, u.company AS client_company,
               p.name AS project_name
          FROM invoices i
          JOIN users u ON u.id = i.user_id
          LEFT JOIN projects p ON p.id = i.project_id
         ORDER BY i.issued_at DESC, i.id DESC`);
      return res.json(result.rows);
    }

    if (req.method !== 'POST') return res.status(405).end();

    const { action } = req.body || {};

    if (action === 'create') {
      const { user_id, project_id, number, description, amount, currency, status, issued_at, due_at } = req.body;
      if (!user_id || !number) return res.status(400).json({ error: 'Client and invoice number are required' });
      await pool.query(
        `INSERT INTO invoices (user_id, project_id, number, description, amount, currency, status, issued_at, due_at, paid_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, CURRENT_DATE), $9, $10)`,
        [user_id, project_id || null, number, description || null, amount || 0,
         currency || 'AED', status || 'Due', issued_at || null, due_at || null,
         status === 'Paid' ? new Date() : null]
      );
      return res.json({ success: true });
    }

    if (action === 'update') {
      const { id, project_id, number, description, amount, currency, status, issued_at, due_at } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing invoice id' });
      await pool.query(
        `UPDATE invoices
            SET project_id = $1, number = $2, description = $3, amount = $4,
                currency = $5, status = $6, issued_at = $7, due_at = $8,
                paid_at = CASE WHEN $6 = 'Paid' THEN COALESCE(paid_at, CURRENT_DATE) ELSE NULL END
          WHERE id = $9`,
        [project_id || null, number, description || null, amount || 0,
         currency || 'AED', status || 'Due', issued_at || null, due_at || null, id]
      );
      return res.json({ success: true });
    }

    if (action === 'setStatus') {
      const { id, status } = req.body;
      if (!id || !status) return res.status(400).json({ error: 'Missing id or status' });
      await pool.query(
        `UPDATE invoices
            SET status = $1,
                paid_at = CASE WHEN $1 = 'Paid' THEN COALESCE(paid_at, CURRENT_DATE) ELSE NULL END
          WHERE id = $2`,
        [status, id]
      );
      return res.json({ success: true });
    }

    if (action === 'delete') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing invoice id' });
      await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
      return res.json({ success: true });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
