/* ================================================
   Intranet HPS — Sistema de Administração
   Senha padrão: Hapvida@2025
   Autenticação local + persistência via localStorage
   ================================================ */
(function () {
  'use strict';

  const PASS_HASH = '1873b71b96459ce944d44adca8f341a58e652fd4e30babcd45bcc35a21fa9e98';
  const SESSION_KEY = 'hps_admin_v1';
  const CONTENT_KEY = 'hps_content_v1';

  let isAdmin = sessionStorage.getItem(SESSION_KEY) === '1';

  /* ---- Utilities -------------------------------- */
  async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function pageId() {
    const m = location.pathname.match(/setores\/([^/]+?)(?:\.html)?(?:\/|$)/);
    return m ? m[1] : 'home';
  }

  function getPageContent() {
    try { return JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}')[pageId()] || {}; }
    catch { return {}; }
  }

  function savePageContent(data) {
    try {
      const all = JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}');
      all[pageId()] = data;
      localStorage.setItem(CONTENT_KEY, JSON.stringify(all));
    } catch (e) { console.warn('HPS Admin: falha ao salvar', e); }
  }

  function escHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- Init ------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    injectAdminBtn();
    applyStoredContent();
    if (isAdmin) activateAdminMode();
  });

  /* ---- Header button ---------------------------- */
  function injectAdminBtn() {
    const nav = document.querySelector('.header-nav');
    if (!nav) return;
    const btn = document.createElement('button');
    btn.id = 'hps-admin-btn';
    btn.className = 'hps-admin-btn' + (isAdmin ? ' active' : '');
    btn.innerHTML = isAdmin ? '✏️ Admin' : '🔒';
    btn.title = isAdmin ? 'Sair do modo Admin' : 'Acesso administrador';
    btn.addEventListener('click', () => isAdmin ? doLogout() : showLoginModal());
    nav.appendChild(btn);
  }

  function updateAdminBtn() {
    const btn = document.getElementById('hps-admin-btn');
    if (!btn) return;
    btn.className = 'hps-admin-btn' + (isAdmin ? ' active' : '');
    btn.innerHTML = isAdmin ? '✏️ Admin' : '🔒';
    btn.title = isAdmin ? 'Sair do modo Admin' : 'Acesso administrador';
  }

  /* ---- Auth ------------------------------------- */
  async function doLogin(password) {
    const hash = await sha256(password);
    if (hash === PASS_HASH) {
      sessionStorage.setItem(SESSION_KEY, '1');
      isAdmin = true;
      closeModal('hps-login-modal');
      activateAdminMode();
      updateAdminBtn();
    } else {
      const err = document.getElementById('hps-login-error');
      if (err) err.style.display = 'block';
    }
  }

  function doLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    isAdmin = false;
    deactivateAdminMode();
    updateAdminBtn();
  }

  /* ---- Admin Mode ------------------------------- */
  function activateAdminMode() {
    document.body.classList.add('hps-admin-mode');
    renderAdminBar();
    addPostEditButtons();
  }

  function deactivateAdminMode() {
    document.body.classList.remove('hps-admin-mode');
    document.getElementById('hps-admin-bar')?.remove();
    document.querySelectorAll('.hps-post-edit-btns').forEach(el => el.remove());
  }

  function renderAdminBar() {
    document.getElementById('hps-admin-bar')?.remove();
    const bar = document.createElement('div');
    bar.id = 'hps-admin-bar';
    bar.innerHTML = `
      <div class="hps-admin-bar-inner">
        <span class="hps-admin-bar-label">✏️ Modo Administrador — Intranet HPS</span>
        <div class="hps-admin-bar-actions">
          <button class="hps-bar-btn primary" id="hps-add-post-btn">+ Novo Aviso</button>
          <button class="hps-bar-btn" id="hps-logout-bar-btn">Sair</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentElement('afterbegin', bar);
    document.getElementById('hps-add-post-btn').addEventListener('click', () => openPostEditor(null));
    document.getElementById('hps-logout-bar-btn').addEventListener('click', doLogout);
  }

  function addPostEditButtons() {
    document.querySelectorAll('.post-item').forEach((el, i) => {
      if (!el.dataset.postId) el.dataset.postId = `p${i}`;
      addSinglePostEditButtons(el);
    });
  }

  function addSinglePostEditButtons(el) {
    if (el.querySelector('.hps-post-edit-btns')) return;
    const wrap = document.createElement('div');
    wrap.className = 'hps-post-edit-btns';
    wrap.innerHTML = `
      <button class="hps-edit-btn" title="Editar aviso">✏️</button>
      <button class="hps-del-btn" title="Excluir aviso">🗑</button>
    `;
    wrap.querySelector('.hps-edit-btn').addEventListener('click', e => { e.stopPropagation(); openPostEditor(el); });
    wrap.querySelector('.hps-del-btn').addEventListener('click', e => { e.stopPropagation(); deletePost(el); });
    el.appendChild(wrap);
  }

  /* ---- Apply saved content ---------------------- */
  function applyStoredContent() {
    // Assign stable IDs to all posts before applying saved content
    const pid = pageId();
    document.querySelectorAll('.post-item').forEach((el, i) => {
      if (!el.dataset.postId) el.dataset.postId = `${pid}-${i}`;
    });

    const data = getPageContent();

    if (data.postEdits) {
      Object.entries(data.postEdits).forEach(([id, saved]) => {
        const el = document.querySelector(`[data-post-id="${id}"]`);
        if (!el) return;
        if (saved.deleted) { el.remove(); return; }
        applyPostData(el, saved);
      });
    }

    if (data.newPosts && data.newPosts.length) {
      const container = document.querySelector('.posts-container') || findPostContainer();
      if (container) {
        [...data.newPosts].reverse().forEach(post => {
          container.insertAdjacentHTML('afterbegin', buildPostHTML(post, true));
        });
      }
    }
  }

  function findPostContainer() {
    const firstPost = document.querySelector('.post-item');
    return firstPost ? firstPost.parentElement : null;
  }

  function applyPostData(el, data) {
    const titulo = el.querySelector('.post-titulo a, .post-titulo');
    const resumo = el.querySelector('.post-resumo');
    const tag = el.querySelector('.post-tag');
    const dia = el.querySelector('.dia');
    const mes = el.querySelector('.mes');

    if (titulo && data.titulo) titulo.textContent = data.titulo;
    if (resumo && data.resumo !== undefined) resumo.textContent = data.resumo;
    if (tag && data.tag) {
      tag.className = `post-tag ${data.tag}`;
      tag.textContent = data.tagLabel || data.tag;
    }
    if (dia && data.dia) dia.textContent = data.dia;
    if (mes && data.mes) mes.textContent = data.mes.toUpperCase();
    if (data.titulo) el.dataset.modalTitle = data.titulo;
    if (data.corpo !== undefined) el.dataset.modalBody = data.corpo;
    const metaSpan = el.querySelector('.post-meta span:first-child');
    if (metaSpan && data.autor) metaSpan.textContent = `👤 ${data.autor}`;
  }

  /* ---- Post editor modal ----------------------- */
  function openPostEditor(postEl) {
    const months = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    const today = new Date();
    let cur = {
      titulo: '', resumo: '', corpo: '',
      tag: 'aviso', tagLabel: 'Aviso',
      dia: String(today.getDate()).padStart(2, '0'),
      mes: months[today.getMonth()], autor: ''
    };

    if (postEl) {
      cur.titulo = postEl.querySelector('.post-titulo a, .post-titulo')?.textContent?.trim() || '';
      cur.resumo = postEl.querySelector('.post-resumo')?.textContent?.trim() || '';
      cur.corpo = (postEl.dataset.modalBody || '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
      const tag = postEl.querySelector('.post-tag');
      if (tag) {
        cur.tag = tag.className.replace('post-tag', '').trim().split(/\s+/)[0] || 'aviso';
        cur.tagLabel = tag.textContent.trim();
      }
      cur.dia = postEl.querySelector('.dia')?.textContent?.trim() || cur.dia;
      cur.mes = postEl.querySelector('.mes')?.textContent?.trim() || cur.mes;
      const authorSpan = postEl.querySelector('.post-meta span:first-child');
      if (authorSpan) cur.autor = authorSpan.textContent.replace('👤 ', '').trim();
    }

    closeModal('hps-editor-modal');

    const modal = document.createElement('div');
    modal.className = 'hps-modal-overlay';
    modal.id = 'hps-editor-modal';
    modal.innerHTML = `
      <div class="hps-modal">
        <div class="hps-modal-header">
          <h3>${postEl ? 'Editar Aviso' : 'Novo Aviso'}</h3>
          <button class="hps-modal-close" data-close="hps-editor-modal">✕</button>
        </div>
        <div class="hps-modal-body">
          <label>Título *
            <input id="hps-f-titulo" type="text" value="${escAttr(cur.titulo)}" placeholder="Título do aviso" />
          </label>
          <label>Resumo <span style="font-weight:400;opacity:.7">(texto curto exibido na lista)</span>
            <textarea id="hps-f-resumo" rows="2">${escHtml(cur.resumo)}</textarea>
          </label>
          <label>Corpo completo <span style="font-weight:400;opacity:.7">(exibido ao clicar — aceita HTML simples)</span>
            <textarea id="hps-f-corpo" rows="5">${escHtml(cur.corpo)}</textarea>
          </label>
          <div class="hps-f-row">
            <label style="flex:2">Categoria
              <select id="hps-f-tag">
                <option value="urgente" ${cur.tag==='urgente'?'selected':''}>🔴 Urgente</option>
                <option value="aviso"   ${cur.tag==='aviso'||!cur.tag?'selected':''}>🔵 Aviso</option>
                <option value="info"    ${cur.tag==='info'?'selected':''}>⚪ Info</option>
                <option value="tutorial"${cur.tag==='tutorial'?'selected':''}>🟢 Treinamento</option>
              </select>
            </label>
            <label>Dia
              <input id="hps-f-dia" type="text" value="${escAttr(cur.dia)}" maxlength="2" placeholder="DD" />
            </label>
            <label>Mês
              <select id="hps-f-mes">
                ${months.map(m => `<option value="${m}" ${cur.mes===m?'selected':''}>${m}</option>`).join('')}
              </select>
            </label>
          </div>
          <label>Autor / Setor responsável
            <input id="hps-f-autor" type="text" value="${escAttr(cur.autor)}" placeholder="Ex: Coordenação PS" />
          </label>
        </div>
        <div class="hps-modal-footer">
          <button class="hps-bar-btn" data-close="hps-editor-modal">Cancelar</button>
          <button class="hps-bar-btn primary" id="hps-save-post-btn">${postEl ? 'Salvar alterações' : 'Publicar aviso'}</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal('hps-editor-modal')));
    modal.addEventListener('click', e => { if (e.target === modal) closeModal('hps-editor-modal'); });
    requestAnimationFrame(() => modal.classList.add('open'));
    document.getElementById('hps-f-titulo').focus();

    document.getElementById('hps-save-post-btn').addEventListener('click', () => {
      const titulo = document.getElementById('hps-f-titulo').value.trim();
      if (!titulo) { document.getElementById('hps-f-titulo').focus(); return; }

      const tagEl = document.getElementById('hps-f-tag');
      const saved = {
        titulo,
        resumo: document.getElementById('hps-f-resumo').value.trim(),
        corpo:  document.getElementById('hps-f-corpo').value.trim(),
        tag:    tagEl.value,
        tagLabel: tagEl.selectedOptions[0].text.replace(/^[^\s]+\s/, '').trim(),
        dia:    document.getElementById('hps-f-dia').value.trim().padStart(2, '0'),
        mes:    document.getElementById('hps-f-mes').value,
        autor:  document.getElementById('hps-f-autor').value.trim(),
      };

      if (postEl) {
        applyPostData(postEl, saved);
        const pageData = getPageContent();
        pageData.postEdits = pageData.postEdits || {};
        pageData.postEdits[postEl.dataset.postId] = saved;
        savePageContent(pageData);
      } else {
        saved.id = `new-${Date.now()}`;
        const container = document.querySelector('.posts-container') || findPostContainer();
        if (container) {
          container.insertAdjacentHTML('afterbegin', buildPostHTML(saved, false));
          const newEl = container.querySelector(`[data-post-id="${saved.id}"]`);
          if (newEl) {
            addSinglePostEditButtons(newEl);
            newEl.style.cursor = 'pointer';
            newEl.addEventListener('click', () => {
              const overlay = document.getElementById('post-modal');
              if (!overlay) return;
              document.getElementById('modal-title').textContent = saved.titulo;
              document.getElementById('modal-body-text').innerHTML = saved.corpo || saved.resumo;
              overlay.classList.add('open');
            });
          }
        }
        const pageData = getPageContent();
        pageData.newPosts = pageData.newPosts || [];
        pageData.newPosts.unshift(saved);
        savePageContent(pageData);
      }

      closeModal('hps-editor-modal');
    });
  }

  function buildPostHTML(data, fromStorage) {
    const tagLabels = { urgente: 'Urgente', aviso: 'Aviso', info: 'Info', tutorial: 'Treinamento' };
    const tl = data.tagLabel || tagLabels[data.tag] || 'Aviso';
    return `<div class="post-item hps-new-post" data-post-id="${escAttr(data.id)}"
         data-modal-title="${escAttr(data.titulo)}"
         data-modal-body="${escAttr(data.corpo || data.resumo || '')}">
      <div class="post-date">
        <div class="dia">${escHtml(data.dia)}</div>
        <div class="mes">${escHtml(data.mes)}</div>
      </div>
      <div class="post-content">
        <span class="post-tag ${escAttr(data.tag)}">${escHtml(tl)}</span>
        <div class="post-titulo"><a>${escHtml(data.titulo)}</a></div>
        <div class="post-resumo">${escHtml(data.resumo || data.titulo)}</div>
        ${data.autor ? `<div class="post-meta"><span>👤 ${escHtml(data.autor)}</span><span>👁 Clique para ler mais</span></div>` : ''}
      </div>
    </div>`;
  }

  function deletePost(el) {
    if (!confirm('Excluir este aviso? A ação não pode ser desfeita.')) return;
    const id = el.dataset.postId;
    el.remove();
    const data = getPageContent();
    if (id && id.startsWith('new-')) {
      data.newPosts = (data.newPosts || []).filter(p => p.id !== id);
    } else {
      data.postEdits = data.postEdits || {};
      data.postEdits[id] = { deleted: true };
    }
    savePageContent(data);
  }

  /* ---- Login Modal ------------------------------ */
  function showLoginModal() {
    closeModal('hps-login-modal');
    const modal = document.createElement('div');
    modal.className = 'hps-modal-overlay';
    modal.id = 'hps-login-modal';
    modal.innerHTML = `
      <div class="hps-modal hps-modal-sm">
        <div class="hps-modal-header">
          <h3>🔒 Acesso Administrativo</h3>
          <button class="hps-modal-close" data-close="hps-login-modal">✕</button>
        </div>
        <div class="hps-modal-body">
          <p class="hps-login-info">Área restrita a administradores da Intranet HPS.</p>
          <label>Senha de acesso
            <input id="hps-pass-input" type="password" placeholder="••••••••" autocomplete="current-password" />
          </label>
          <p id="hps-login-error" class="hps-login-err">Senha incorreta. Tente novamente.</p>
        </div>
        <div class="hps-modal-footer">
          <button class="hps-bar-btn" data-close="hps-login-modal">Cancelar</button>
          <button class="hps-bar-btn primary" id="hps-do-login-btn">Entrar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('hps-pass-input');
    input.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(input.value); });
    document.getElementById('hps-do-login-btn').addEventListener('click', () => doLogin(input.value));
    modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal('hps-login-modal')));
    modal.addEventListener('click', e => { if (e.target === modal) closeModal('hps-login-modal'); });
    requestAnimationFrame(() => { modal.classList.add('open'); input.focus(); });
  }

  /* ---- Modal close util ------------------------ */
  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    setTimeout(() => el.remove(), 280);
  }

})();
