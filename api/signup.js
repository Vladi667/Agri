const { getPool } = require('./_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password, telephone, email } = req.body;
  if (!username || !password || !telephone || !email)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    const pool = getPool();
    const check = await pool.query(
      'SELECT COUNT(*) FROM users WHERE use1 = $1',
      [username]
    );
    if (parseInt(check.rows[0].count) > 0) {
      return res.status(409).json({ error: 'Username is taken' });
    }

    await pool.query(
      'INSERT INTO users (use1, pass, tele, email, admin) VALUES ($1, $2, $3, $4, false)',
      [username, password, telephone, email]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
