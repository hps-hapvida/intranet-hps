/* =============================================
   Portal HPS — Interatividade Global
============================================= */

// FAQ Accordion
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('open');
      // Fecha todos
      document.querySelectorAll('.faq-question.open').forEach(o => {
        o.classList.remove('open');
        o.nextElementSibling.classList.remove('open');
      });
      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        q.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

// Modal de post
function initModal() {
  const overlay = document.getElementById('post-modal');
  if (!overlay) return;

  document.querySelectorAll('[data-modal-title]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      document.getElementById('modal-title').textContent = el.dataset.modalTitle;
      document.getElementById('modal-body-text').innerHTML = el.dataset.modalBody;
      overlay.classList.add('open');
    });
  });

  document.querySelector('.modal-close')?.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
}

// Pesquisa simples na página inicial
function initSearch() {
  const input = document.querySelector('.header-search input');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim().toLowerCase();
      if (!q) return;
      const cards = document.querySelectorAll('.sector-card');
      let found = null;
      cards.forEach(c => {
        const text = c.textContent.toLowerCase();
        if (!found && text.includes(q)) found = c;
      });
      if (found) found.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// Data/hora no rodapé
function updateDateTime() {
  const el = document.getElementById('footer-datetime');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFaq();
  initModal();
  initSearch();
  updateDateTime();
});
