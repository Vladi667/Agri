const { getPool } = require('./_db');
const { verifyAdmin } = require('./_auth');

const ALLOWED_COLS = ['id', 'use1', 'pass', 'tele', 'email'];

module.exports = async (req, res) => {
  if (!verifyAdmin(req)) return res.status(403).json({ error: 'Forbidden' });

  const { sort = 'id', order = 'ASC', filterCol, filterVal } = req.query;
  const safeSort = ALLOWED_COLS.includes(sort.toLowerCase()) ? sort : 'id';
  const safeOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  try {
    const pool = getPool();
    let query = 'SELECT * FROM users';
    const params = [];

    if (filterCol && filterVal && ALLOWED_COLS.includes(filterCol.toLowerCase())) {
      query += ` WHERE ${filterCol}::text ILIKE $1`;
      params.push(`%${filterVal}%`);
    }

    query += ` ORDER BY "${safeSort}" ${safeOrder}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
