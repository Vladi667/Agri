// Eden Terranova - shared nav + auth awareness
(function(){
  function installPageTransition(){
    if (document.getElementById('gwPageTransition')) return;

    document.body.classList.add('gw-transitioning');
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="gw-page-transition" id="gwPageTransition" aria-hidden="true">
        <div class="gw-transition-stage">
          <img class="gw-transition-mark" src="/images/eden-terranova-symbol.svg" alt="">
          <div class="gw-transition-line"><span></span></div>
          <div class="gw-transition-word">Eden Terranova</div>
        </div>
      </div>`);

    function revealPage(){
      window.requestAnimationFrame(() => {
        document.body.classList.remove('gw-transitioning');
        document.body.classList.add('gw-ready');
      });
    }

    window.addEventListener('pageshow', revealPage, { once:true });
    window.setTimeout(revealPage, 260);

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download')) return;

      const url = new URL(link.getAttribute('href'), window.location.href);
      const isSamePageHash = url.pathname === window.location.pathname && url.hash;
      const isLocalPage = url.origin === window.location.origin && /\.(html|aspx)$/i.test(url.pathname);
      if (!isLocalPage || isSamePageHash) return;

      event.preventDefault();
      document.body.classList.remove('gw-ready');
      document.body.classList.add('gw-transitioning');
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 540);
    }, true);
  }

  installPageTransition();

  function getAuthSession(){
    const token = localStorage.getItem('gw_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()){
        localStorage.removeItem('gw_token');
        return null;
      }
      return payload;
    } catch {
      localStorage.removeItem('gw_token');
      return null;
    }
  }

  const session = getAuthSession();
  const isAdmin = session && session.admin === true;
  const loginLink = session
    ? `<a href="#" class="btn btn-ghost" style="padding:.5rem 1rem; font-size:13px;" onclick="localStorage.removeItem('gw_token'); window.location.reload(); return false;">Log out</a>`
    : `<a href="login.html" class="btn btn-ghost" style="padding:.5rem 1rem; font-size:13px;">Log in</a>`;
  const adminLinks = isAdmin ? `<a href="table.html" data-page="table">Portal</a>` : '';
  const contactLink = session ? `<a href="contacts.html" data-page="contacts">Contact</a>` : '';
  const navLinks = `
          <a href="index.html" data-page="index">Home</a>
          <a href="whorwe.html" data-page="whorwe">Who we are</a>
          <a href="scope.html" data-page="scope">Our scope</a>
          <a href="services.html" data-page="services">Services</a>
          <a href="activities.html" data-page="activities">Activities</a>
          <a href="whatrwe.html" data-page="whatrwe">What we are</a>
          <a href="clients.html" data-page="clients">Clients</a>
          ${contactLink}
          ${adminLinks}`;

  const nav = `
    <header class="gw-header" id="gwHeader">
      <div class="row">
        <a class="gw-logo" href="index.html">
          <img src="/images/eden-terranova-logo.png" alt="Eden Terranova" style="height:44px; width:auto; max-width:190px; object-fit:contain;">
        </a>
        <nav class="gw-nav" id="gwNav">
          ${navLinks}
        </nav>
        <div class="gw-right">
          <span class="chip" style="display:none" id="gwStatusChip"><span class="dot"></span> Dubai · FZCO</span>
          ${loginLink}
          <button class="gw-mobile-toggle" id="gwMobileToggle" type="button" aria-expanded="false" aria-controls="gwMobileNav" aria-label="Open navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div class="gw-mobile-nav" id="gwMobileNav" aria-hidden="true">
        <div class="gw-mobile-nav-inner">
          ${navLinks}
        </div>
      </div>
      <div class="hairline" style="opacity:.6"></div>
    </header>`;

  const host = document.getElementById('gw-header-mount');
  if (host) host.outerHTML = nav;
  else document.body.insertAdjacentHTML('afterbegin', nav);

  const page = (document.body.dataset.page || '').trim();
  if (page){
    document.querySelectorAll('[data-page]').forEach(a => {
      if (a.dataset.page === page) a.classList.add('active');
    });
  }

  function toggleChip(){
    const chip = document.getElementById('gwStatusChip');
    if (!chip) return;
    chip.style.display = window.innerWidth >= 1280 ? 'inline-flex' : 'none';
  }
  toggleChip();
  window.addEventListener('resize', toggleChip);

  const mobileToggle = document.getElementById('gwMobileToggle');
  const mobileNav = document.getElementById('gwMobileNav');

  function closeMobileNav(){
    if (!mobileNav || !mobileToggle) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggle && mobileNav){
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMobileNav);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1100) closeMobileNav();
    });
  }

  const footer = `<footer class="gw-footer"><div class="row"><span>© 2026 EDEN TERRANOVA FZCO · Dubai, United Arab Emirates</span><span class="mono">Precision · Growth · Legacy</span></div></footer>`;
  const fhost = document.getElementById('gw-footer-mount');
  if (fhost) fhost.outerHTML = footer;
  else document.body.insertAdjacentHTML('beforeend', footer);
})();
