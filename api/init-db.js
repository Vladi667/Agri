const { getPool } = require('./_db');

module.exports = async (req, res) => {
  if (req.query.secret !== process.env.JWT_SECRET)
    return res.status(403).json({ error: 'Forbidden' });

  try {
    const pool = getPool();

    // --- Clients / admins ---
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
    // Friendly display name for the portal (added for existing installs).
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS company VARCHAR(120)`);
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now()`);

    // --- Projects we steward for a client ---
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name       VARCHAR(160) NOT NULL,
        location   VARCHAR(160),
        status     VARCHAR(40) DEFAULT 'Planning',
        progress   INTEGER DEFAULT 0,
        summary    TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // --- Timeline of progress notes posted by the team ---
    await pool.query(`
      CREATE TABLE IF NOT EXISTS project_updates (
        id         SERIAL PRIMARY KEY,
        project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        title      VARCHAR(160),
        body       TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // --- Invoices / payments ---
    await pool.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        project_id  INTEGER REFERENCES projects(id) ON DELETE SET NULL,
        number      VARCHAR(40) NOT NULL,
        description TEXT,
        amount      NUMERIC(12,2) NOT NULL DEFAULT 0,
        currency    VARCHAR(3) DEFAULT 'AED',
        status      VARCHAR(20) DEFAULT 'Due',
        issued_at   DATE DEFAULT CURRENT_DATE,
        due_at      DATE,
        paid_at     DATE,
        created_at  TIMESTAMPTZ DEFAULT now()
      )
    `);

    // --- Contact form submissions ---
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
        name       VARCHAR(120),
        email      VARCHAR(120),
        subject    VARCHAR(160),
        body       TEXT NOT NULL,
        handled    BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    // --- Seed an admin account so the admin console is usable ---
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin1234';
    await pool.query(
      `INSERT INTO users (use1, pass, email, admin, company)
       VALUES ($1, $2, $3, true, 'Eden Terranova')
       ON CONFLICT (use1) DO UPDATE SET admin = true`,
      [adminUser, adminPass, process.env.ADMIN_EMAIL || 'admin@edenterranova.com']
    );

    res.json({
      success: true,
      message: 'Database initialized',
      adminSeeded: adminUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
