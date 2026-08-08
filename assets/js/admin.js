/* ================================================
   Intranet HPS — Admin (Supabase Auth)
   Autentica via Supabase; o índice de páginas de
   setor agora usa setor.html + banco de dados.
   ================================================ */
(function () {
  'use strict';

  function injectAdminBtn(user) {
    const nav = document.querySelector('.header-nav');
    if (!nav || document.getElementById('hps-admin-btn')) return;

    const btn = document.createElement(user ? 'button' : 'a');
    btn.id = 'hps-admin-btn';
    const isAdmin = user?.app_metadata?.role === 'admin';

    if (user) {
      btn.className = 'hps-admin-btn active';
      btn.textContent = isAdmin ? '✏️ Admin' : '👤 ' + (user.email?.split('@')[0] || '');
      btn.title = 'Sair';
      btn.addEventListener('click', async () => {
        await Auth.signOut();
        location.reload();
      });
    } else {
      btn.className = 'hps-admin-btn';
      btn.textContent = '🔒';
      btn.title = 'Acesso administrador';
      btn.href = 'login.html?next=' + encodeURIComponent(location.pathname + location.search);
      if (btn.tagName === 'A') btn.style.textDecoration = 'none';
    }
    nav.appendChild(btn);
  }

  async function init() {
    // Supabase pode não estar disponível em páginas sem o SDK
    if (typeof Auth === 'undefined') return;

    try {
      const user = await Auth.getUser();
      injectAdminBtn(user);

      Auth.onAuthChange((u) => {
        document.getElementById('hps-admin-btn')?.remove();
        document.getElementById('hps-admin-bar')?.remove();
        injectAdminBtn(u);
        if (u?.app_metadata?.role === 'admin') showAdminBar(u);
      });

      if (user?.app_metadata?.role === 'admin') showAdminBar(user);
    } catch(e) {
      // Supabase não configurado — modo silencioso
    }
  }

  function showAdminBar(user) {
    if (document.getElementById('hps-admin-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'hps-admin-bar';
    bar.innerHTML = `
      <div class="hps-admin-bar-inner">
        <span class="hps-admin-bar-label">✏️ Admin — ${user.email}</span>
        <div class="hps-admin-bar-actions">
          <button class="hps-bar-btn" id="hps-logout-bar-btn">Sair</button>
        </div>
      </div>`;
    document.body.insertAdjacentElement('afterbegin', bar);
    document.body.classList.add('hps-admin-mode');
    document.querySelector('.site-header')?.style.setProperty('top', '44px');
    document.getElementById('hps-logout-bar-btn').addEventListener('click', async () => {
      await Auth.signOut();
      location.reload();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
