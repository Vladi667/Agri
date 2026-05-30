const { getPool } = require('./_db');
const { initSchema } = require('./_schema');

module.exports = async (req, res) => {
  if (req.query.secret !== process.env.JWT_SECRET)
    return res.status(403).json({ error: 'Forbidden' });

  try {
    const pool = getPool();
    const { adminUser } = await initSchema(pool, {
      adminUser: process.env.ADMIN_USERNAME,
      adminPass: process.env.ADMIN_PASSWORD,
      adminEmail: process.env.ADMIN_EMAIL
    });
    res.json({ success: true, message: 'Database initialized', adminSeeded: adminUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
