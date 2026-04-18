// Green Wadi — shared nav + auth awareness
(function(){
  function getAuthSession(){
    const token = localStorage.getItem('gw_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()){ localStorage.removeItem('gw_token'); return null; }
      return payload;
    } catch { localStorage.removeItem('gw_token'); return null; }
  }
  const session = getAuthSession();
  const isAdmin = session && session.admin === true;
  const loginLink = session
    ? `<a href="#" class="btn btn-ghost" style="padding:.5rem 1rem; font-size:13px;" onclick="localStorage.removeItem('gw_token'); window.location.reload(); return false;">Log out</a>`
    : `<a href="login.html" class="btn btn-ghost" style="padding:.5rem 1rem; font-size:13px;">Log in</a>`;
  const adminLinks = isAdmin ? `<a href="table.html" data-page="table">Table</a>` : '';
  const contactLink = session ? `<a href="contacts.html" data-page="contacts">Contacts</a>` : '';
  const nav = `
    <header class="gw-header" id="gwHeader">
      <div class="row">
        <a class="gw-logo" href="index.html">
          <img src="/images/logo.jpg" alt="Green Wadi" style="height:40px; border-radius:6px; object-fit:contain;">
        </a>
        <nav class="gw-nav" id="gwNav">
          <a href="index.html" data-page="index">Green Wadi</a>
          <a href="whorwe.html" data-page="whorwe">Who Are We</a>
          <a href="scope.html" data-page="scope">Our Scope</a>
          <a href="services.html" data-page="services">Services</a>
          <a href="activities.html" data-page="activities">Activities</a>
          <a href="whatrwe.html" data-page="whatrwe">What Are We</a>
          <a href="clients.html" data-page="clients">Clients</a>
          ${contactLink}
          ${adminLinks}
        </nav>
        <div class="gw-right">
          <span class="chip" style="display:none" id="gwStatusChip"><span class="dot"></span> Est. 2014 · Israel</span>
          ${loginLink}
        </div>
      </div>
      <div class="hairline" style="opacity:.6"></div>
    </header>`;
  const host = document.getElementById('gw-header-mount');
  if (host) { host.outerHTML = nav; }
  else { document.body.insertAdjacentHTML('afterbegin', nav); }
  const page = (document.body.dataset.page || '').trim();
  if (page){ document.querySelectorAll('#gwNav a').forEach(a => { if (a.dataset.page === page) a.classList.add('active'); }); }
  function toggleChip(){ const chip = document.getElementById('gwStatusChip'); if (!chip) return; chip.style.display = window.innerWidth >= 1280 ? 'inline-flex' : 'none'; }
  toggleChip(); window.addEventListener('resize', toggleChip);
  const footer = `<footer class="gw-footer"><div class="row"><span>© 2026 Green Wadi – Advanced Agriculture and Know-How Ltd.</span><span class="mono">Precision · Growth · Legacy</span></div></footer>`;
  const fhost = document.getElementById('gw-footer-mount');
  if (fhost) fhost.outerHTML = footer;
  else document.body.insertAdjacentHTML('beforeend', footer);
})();
