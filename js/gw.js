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

  const adminLinks = isAdmin
    ? `<a href="table.html" data-page="table">Table</a>`
    : '';

  const contactLink = session
    ? `<a href="contacts.html" data-page="contacts">Contact</a>`
    : '';

  const nav = `
    <header class="gw-header" id="gwHeader">
      <div class="row">
        <a class="gw-logo" href="index.html">
          <svg class="mark" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="gwlg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stop-color="#10B981"/>
                <stop offset="1" stop-color="#1F5F3A"/>
              </linearGradient>
            </defs>
            <path d="M4 20 C 10 10, 22 10, 28 20" stroke="url(#gwlg)" stroke-width="2" fill="none" stroke-linecap="round"/>
            <circle cx="16" cy="22" r="3" fill="url(#gwlg)"/>
            <path d="M16 22 C 14 18, 18 14, 21 12" stroke="#1F5F3A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          </svg>
          <span class="name">Green Wadi</span>
        </a>
        <nav class="gw-nav" id="gwNav">
          <a href="index.html" data-page="index">Home</a>
          <a href="whorwe.html" data-page="whorwe">Who we are</a>
          <a href="scope.html" data-page="scope">Our scope</a>
          <a href="services.html" data-page="services">Services</a>
          <a href="activities.html" data-page="activities">Activities</a>
          <a href="whatrwe.html" data-page="whatrwe">What we are</a>
          <a href="clients.html" data-page="clients">Clients</a>
          ${contactLink}
          ${adminLinks}
        </nav>
        <div class="gw-right">
          <span class="chip" style="display:none" id="gwStatusChip"><span class="dot"></span> Season 07 · Field data live</span>
          ${loginLink}
        </div>
      </div>
      <div class="hairline" style="opacity:.6"></div>
    </header>
  `;

  const host = document.getElementById('gw-header-mount');
  if (host) { host.outerHTML = nav; }
  else { document.body.insertAdjacentHTML('afterbegin', nav); }

  const page = (document.body.dataset.page || '').trim();
  if (page){
    document.querySelectorAll('#gwNav a').forEach(a => {
      if (a.dataset.page === page) a.classList.add('active');
    });
  }

  function toggleChip(){
    const chip = document.getElementById('gwStatusChip');
    if (!chip) return;
    chip.style.display = window.innerWidth >= 1280 ? 'inline-flex' : 'none';
  }
  toggleChip(); window.addEventListener('resize', toggleChip);

  const footer = `
    <footer class="gw-footer">
      <div class="row">
        <span>© 2026 Green Wadi Consulting</span>
        <span class="mono">Precision · Growth · Legacy</span>
      </div>
    </footer>
  `;
  const fhost = document.getElementById('gw-footer-mount');
  if (fhost) fhost.outerHTML = footer;
  else document.body.insertAdjacentHTML('beforeend', footer);
})();
