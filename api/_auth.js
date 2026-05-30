const jwt = require('jsonwebtoken');

function verifyAdmin(req) {
  const auth = req.headers.authorization;
  if (!auth) return false;
  try {
    const token = auth.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.admin === true;
  } catch {
    return false;
  }
}

function verifyLogin(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.replace('Bearer ', '');
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// Resolve the numeric user id for the logged-in caller. Older tokens issued
// before `uid` was added carry only `username`, so fall back to a lookup.
async function resolveUserId(payload, pool) {
  if (!payload) return null;
  if (payload.uid) return payload.uid;
  if (!payload.username) return null;
  const r = await pool.query('SELECT id FROM users WHERE use1 = $1', [payload.username]);
  return r.rows.length ? r.rows[0].id : null;
}

module.exports = { verifyAdmin, verifyLogin, resolveUserId };
