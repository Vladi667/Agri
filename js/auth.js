function getSession() {
  const token = localStorage.getItem('gw_token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('gw_token');
      return null;
    }
    return payload;
  } catch (e) {
    localStorage.removeItem('gw_token');
    return null;
  }
}

function getToken() {
  return localStorage.getItem('gw_token');
}

function authHeaders() {
  return { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' };
}

function initNav() {
  const session = getSession();
  const isLoggedIn = !!session;
  const isAdmin = session && session.admin;
  const username = (session && session.username) || 'Guest';

  const welcomeEl = document.getElementById('welcomeMsg');
  if (welcomeEl) welcomeEl.textContent = 'Welcome ' + username;

  if (isLoggedIn) {
    const page1 = document.getElementById('page1');
    const logoutEl = document.getElementById('logoutq');
    const loginEl = document.getElementById('login');
    if (page1) page1.style.display = 'block';
    if (logoutEl) logoutEl.style.display = 'block';
    if (loginEl) loginEl.style.display = 'none';
  } else {
    const page1 = document.getElementById('page1');
    const logoutEl = document.getElementById('logoutq');
    if (page1) page1.style.display = 'none';
    if (logoutEl) logoutEl.style.display = 'none';
  }

  if (isAdmin) {
    const tableEl = document.getElementById('table');
    if (tableEl) tableEl.style.display = 'block';
  } else {
    const tableEl = document.getElementById('table');
    if (tableEl) tableEl.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('gw_token');
  window.location.href = '/login.html';
}

function requireLogin() {
  if (!getSession()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

function requireAdmin() {
  const session = getSession();
  if (!session || !session.admin) {
    window.location.href = '/index.html';
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', initNav);
