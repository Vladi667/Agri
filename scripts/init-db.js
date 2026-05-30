// Local, one-time database setup. Reads DATABASE_URL (and optional ADMIN_*)
// from the environment — run it with Node's built-in env-file loader after
// pulling the project's env vars:
//
//   vercel env pull .env.local
//   node --env-file=.env.local scripts/init-db.js
//
// This avoids sending the JWT_SECRET in a URL (as /api/init-db requires).
const { Pool } = require('pg');
const { initSchema } = require('../api/_schema');

(async () => {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    console.error('No DATABASE_URL / POSTGRES_URL found. Run: vercel env pull .env.local');
    process.exit(1);
  }

  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    const { adminUser } = await initSchema(pool, {
      adminUser: process.env.ADMIN_USERNAME,
      adminPass: process.env.ADMIN_PASSWORD,
      adminEmail: process.env.ADMIN_EMAIL
    });
    console.log('✓ Database initialized. Admin account:', adminUser);
  } catch (err) {
    console.error('✗ Init failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
