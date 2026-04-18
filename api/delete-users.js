const { getPool } = require('./_db');
const { verifyAdmin } = require('./_auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!verifyAdmin(req)) return res.status(403).json({ error: 'Forbidden' });

  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0)
    return res.status(400).json({ error: 'No IDs provided' });

  try {
    const pool = getPool();
    await pool.query('DELETE FROM users WHERE id = ANY($1::int[])', [ids]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
