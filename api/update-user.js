const bcrypt = require('bcryptjs');
const { getPool } = require('./_db');
const { verifyAdmin } = require('./_auth');

const BCRYPT_RE = /^\$2[aby]\$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!verifyAdmin(req)) return res.status(403).json({ error: 'Forbidden' });

  const { id, username, password, telephone, email } = req.body;
  if (!id || !username || !password || !telephone || !email)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    const pool = getPool();
    // The edit form loads the stored (already-hashed) password. Only hash
    // when the admin actually typed a new plaintext value.
    const pass = BCRYPT_RE.test(password) ? password : await bcrypt.hash(password, 10);
    await pool.query(
      'UPDATE users SET use1 = $1, pass = $2, tele = $3, email = $4 WHERE id = $5',
      [username, pass, telephone, email, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
