const { getPool } = require('./_db');

module.exports = async (req, res) => {
  if (req.query.secret !== process.env.JWT_SECRET)
    return res.status(403).json({ error: 'Forbidden' });

  try {
    const pool = getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id    SERIAL PRIMARY KEY,
        use1  VARCHAR(50) UNIQUE NOT NULL,
        pass  VARCHAR(100) NOT NULL,
        tele  VARCHAR(20),
        email VARCHAR(100),
        admin BOOLEAN DEFAULT false
      )
    `);
    res.json({ success: true, message: 'Database initialized' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
