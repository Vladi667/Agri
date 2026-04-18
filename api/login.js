const jwt = require('jsonwebtoken');
const { getPool } = require('./_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const pool = getPool();
    const result = await pool.query(
      'SELECT * FROM users WHERE use1 = $1 AND pass = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Wrong Username or Password' });
    }

    const user = result.rows[0];
    const token = jwt.sign(
      { username: user.use1, admin: user.admin === true || user.admin === 't' || user.admin === 1 },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
