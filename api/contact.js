const { getPool } = require('./_db');
const { verifyLogin, resolveUserId } = require('./_auth');

// Contact-form submission. Works for logged-in clients (attaches their id and
// pre-known details) and anonymous visitors alike.
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, subject, body } = req.body || {};
  if (!body || !body.trim()) return res.status(400).json({ error: 'Message is required' });

  try {
    const pool = getPool();

    let userId = null;
    const session = verifyLogin(req);
    if (session) userId = await resolveUserId(session, pool);

    await pool.query(
      `INSERT INTO messages (user_id, name, email, subject, body)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, name || null, email || null, subject || null, body.trim()]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
