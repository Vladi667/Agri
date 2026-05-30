const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getPool } = require('./_db');

const BCRYPT_RE = /^\$2[aby]\$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const pool = getPool();
    const result = await pool.query('SELECT * FROM users WHERE use1 = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Wrong Username or Password' });
    }

    const user = result.rows[0];
    const stored = user.pass || '';

    let ok = false;
    if (BCRYPT_RE.test(stored)) {
      // Modern path: stored value is a bcrypt hash.
      ok = await bcrypt.compare(password, stored);
    } else {
      // Legacy path: stored value is plaintext (pre-bcrypt account).
      ok = password === stored;
      if (ok) {
        // Transparently upgrade the account to a bcrypt hash on login.
        const hash = await bcrypt.hash(password, 10);
        await pool.query('UPDATE users SET pass = $1 WHERE id = $2', [hash, user.id]);
      }
    }

    if (!ok) return res.status(401).json({ error: 'Wrong Username or Password' });

    const token = jwt.sign(
      {
        uid: user.id,
        username: user.use1,
        admin: user.admin === true || user.admin === 't' || user.admin === 1
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
