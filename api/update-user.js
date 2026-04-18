const { getPool } = require('./_db');
const { verifyAdmin } = require('./_auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!verifyAdmin(req)) return res.status(403).json({ error: 'Forbidden' });

  const { id, username, password, telephone, email } = req.body;
  if (!id || !username || !password || !telephone || !email)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    const pool = getPool();
    await pool.query(
      'UPDATE users SET use1 = $1, pass = $2, tele = $3, email = $4 WHERE id = $5',
      [username, password, telephone, email, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
