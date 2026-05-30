const { getPool } = require('./_db');
const { verifyLogin, resolveUserId } = require('./_auth');

// Everything a logged-in client needs for their portal in one call:
// profile, their projects (each with its update timeline) and their invoices.
module.exports = async (req, res) => {
  const session = verifyLogin(req);
  if (!session) return res.status(401).json({ error: 'Not signed in' });

  try {
    const pool = getPool();
    const userId = await resolveUserId(session, pool);
    if (!userId) return res.status(404).json({ error: 'Account not found' });

    const userQ = pool.query(
      'SELECT id, use1, email, tele, company, admin FROM users WHERE id = $1',
      [userId]
    );
    const projectsQ = pool.query(
      `SELECT id, name, location, status, progress, summary, created_at
         FROM projects WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    const updatesQ = pool.query(
      `SELECT u.id, u.project_id, u.title, u.body, u.created_at
         FROM project_updates u
         JOIN projects p ON p.id = u.project_id
        WHERE p.user_id = $1
        ORDER BY u.created_at DESC`,
      [userId]
    );
    const invoicesQ = pool.query(
      `SELECT id, project_id, number, description, amount, currency,
              status, issued_at, due_at, paid_at
         FROM invoices WHERE user_id = $1 ORDER BY issued_at DESC, id DESC`,
      [userId]
    );

    const [userR, projectsR, updatesR, invoicesR] = await Promise.all([
      userQ, projectsQ, updatesQ, invoicesQ
    ]);

    if (userR.rows.length === 0) return res.status(404).json({ error: 'Account not found' });

    // Nest updates under their project.
    const updatesByProject = {};
    for (const u of updatesR.rows) {
      (updatesByProject[u.project_id] = updatesByProject[u.project_id] || []).push(u);
    }
    const projects = projectsR.rows.map(p => ({
      ...p,
      updates: updatesByProject[p.id] || []
    }));

    res.json({
      user: userR.rows[0],
      projects,
      invoices: invoicesR.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
