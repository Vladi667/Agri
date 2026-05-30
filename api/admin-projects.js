const { getPool } = require('./_db');
const { verifyAdmin } = require('./_auth');

// Admin management of projects and their update timeline.
//   GET                       -> all projects joined to client name
//   POST { action:'create' }  -> new project
//   POST { action:'update' }  -> edit project fields / progress / status
//   POST { action:'delete' }  -> remove a project
//   POST { action:'addUpdate'}-> append a progress note to a project
module.exports = async (req, res) => {
  if (!verifyAdmin(req)) return res.status(403).json({ error: 'Forbidden' });
  const pool = getPool();

  try {
    if (req.method === 'GET') {
      const result = await pool.query(`
        SELECT p.*, u.use1 AS client_username, u.company AS client_company
          FROM projects p
          JOIN users u ON u.id = p.user_id
         ORDER BY p.created_at DESC`);
      return res.json(result.rows);
    }

    if (req.method !== 'POST') return res.status(405).end();

    const { action } = req.body || {};

    if (action === 'create') {
      const { user_id, name, location, status, progress, summary } = req.body;
      if (!user_id || !name) return res.status(400).json({ error: 'Client and name are required' });
      const r = await pool.query(
        `INSERT INTO projects (user_id, name, location, status, progress, summary)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [user_id, name, location || null, status || 'Planning',
         clampProgress(progress), summary || null]
      );
      return res.json({ success: true, id: r.rows[0].id });
    }

    if (action === 'update') {
      const { id, name, location, status, progress, summary } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing project id' });
      await pool.query(
        `UPDATE projects
            SET name = $1, location = $2, status = $3, progress = $4, summary = $5
          WHERE id = $6`,
        [name, location || null, status || 'Planning', clampProgress(progress), summary || null, id]
      );
      return res.json({ success: true });
    }

    if (action === 'delete') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing project id' });
      await pool.query('DELETE FROM projects WHERE id = $1', [id]);
      return res.json({ success: true });
    }

    if (action === 'addUpdate') {
      const { project_id, title, body } = req.body;
      if (!project_id || !body) return res.status(400).json({ error: 'Project and note are required' });
      await pool.query(
        'INSERT INTO project_updates (project_id, title, body) VALUES ($1, $2, $3)',
        [project_id, title || null, body]
      );
      return res.json({ success: true });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

function clampProgress(v) {
  const n = parseInt(v, 10);
  if (isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}
