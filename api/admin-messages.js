const { getPool } = require('./_db');
const { verifyAdmin } = require('./_auth');

// Admin inbox for contact-form submissions.
//   GET                        -> all messages (newest first)
//   POST { action:'setHandled'}-> mark a message handled / unhandled
//   POST { action:'delete' }   -> remove a message
module.exports = async (req, res) => {
  if (!verifyAdmin(req)) return res.status(403).json({ error: 'Forbidden' });
  const pool = getPool();

  try {
    if (req.method === 'GET') {
      const result = await pool.query(`
        SELECT m.*, u.use1 AS client_username
          FROM messages m
          LEFT JOIN users u ON u.id = m.user_id
         ORDER BY m.created_at DESC`);
      return res.json(result.rows);
    }

    if (req.method !== 'POST') return res.status(405).end();

    const { action, id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Missing message id' });

    if (action === 'setHandled') {
      await pool.query('UPDATE messages SET handled = $1 WHERE id = $2', [!!req.body.handled, id]);
      return res.json({ success: true });
    }

    if (action === 'delete') {
      await pool.query('DELETE FROM messages WHERE id = $1', [id]);
      return res.json({ success: true });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
