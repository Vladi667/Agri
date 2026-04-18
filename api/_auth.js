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

module.exports = { verifyAdmin, verifyLogin };
