/* ================================================
   Intranet HPS — Seletor de Emoji
   API: buildEmojiField(id, value, label) → HTML string
        initEmojiPickers(root)             → wires events
   ================================================ */
(function () {
  'use strict';

  const EMOJIS = [
    // Saúde
    { e:'🏥', n:'hospital pronto socorro uti cti', c:'Saúde' },
    { e:'💊', n:'remedio medicamento comprimido farmacia', c:'Saúde' },
    { e:'🩺', n:'estetoscopio medico consulta clinico', c:'Saúde' },
    { e:'🩻', n:'raio x exame imagem radiologia', c:'Saúde' },
    { e:'🩹', n:'curativo bandagem ferimento', c:'Saúde' },
    { e:'🩸', n:'sangue hemoterapia hemoglobina', c:'Saúde' },
    { e:'💉', n:'injecao vacina seringa aplicacao', c:'Saúde' },
    { e:'🧬', n:'dna genetica molecula', c:'Saúde' },
    { e:'🔬', n:'microscopio laboratorio analise', c:'Saúde' },
    { e:'🩼', n:'muleta ortopedia fisioterapia', c:'Saúde' },
    { e:'🚑', n:'ambulancia emergencia socorros urgencia', c:'Saúde' },
    { e:'❤️', n:'coracao cardiologia amor', c:'Saúde' },
    { e:'🫀', n:'coracao anatomia batimento', c:'Saúde' },
    { e:'🧠', n:'cerebro neurologia mente', c:'Saúde' },
    { e:'🫁', n:'pulmao pneumologia respiracao', c:'Saúde' },
    { e:'🦷', n:'dente odontologia dentista', c:'Saúde' },
    { e:'👁️', n:'olho oftalmologia visao', c:'Saúde' },
    { e:'🦴', n:'osso ortopedia esqueleto', c:'Saúde' },
    { e:'🌡️', n:'termometro temperatura febre', c:'Saúde' },
    { e:'🧪', n:'tubo ensaio laboratorio quimica', c:'Saúde' },
    { e:'🧫', n:'placa bacterias microbiologia cultura', c:'Saúde' },
    { e:'🏋️', n:'fisioterapia exercicio reabilitacao', c:'Saúde' },
    { e:'🧴', n:'higiene alcool gel sanitizante', c:'Saúde' },
    { e:'🧹', n:'limpeza higienizacao', c:'Saúde' },
    { e:'🛏️', n:'leito cama internacao', c:'Saúde' },

    // Documentos
    { e:'📄', n:'documento arquivo folha', c:'Documentos' },
    { e:'📃', n:'pagina papel folha', c:'Documentos' },
    { e:'📋', n:'clipboard prancheta formulario', c:'Documentos' },
    { e:'📁', n:'pasta arquivo organizar', c:'Documentos' },
    { e:'📂', n:'pasta aberta arquivo aberto', c:'Documentos' },
    { e:'🗂️', n:'organizador fichario abas', c:'Documentos' },
    { e:'📑', n:'marcadores paginas abas', c:'Documentos' },
    { e:'📊', n:'grafico tabela planilha dados', c:'Documentos' },
    { e:'📈', n:'grafico crescimento subindo alta', c:'Documentos' },
    { e:'📉', n:'grafico queda baixa descendo', c:'Documentos' },
    { e:'📝', n:'nota anotacao bloco rascunho', c:'Documentos' },
    { e:'✏️', n:'lapis escrita editar', c:'Documentos' },
    { e:'🖊️', n:'caneta escrita assinar', c:'Documentos' },
    { e:'📌', n:'alfinete fixar destacar', c:'Documentos' },
    { e:'📍', n:'marcador pin localizacao', c:'Documentos' },
    { e:'🔖', n:'favorito marcador salvo', c:'Documentos' },
    { e:'🗒️', n:'caderno bloco notas agenda', c:'Documentos' },
    { e:'🗓️', n:'calendario agenda planejamento', c:'Documentos' },
    { e:'📎', n:'clipe papel juntar', c:'Documentos' },
    { e:'📚', n:'livros biblioteca colecao', c:'Documentos' },
    { e:'📖', n:'livro aberto leitura', c:'Documentos' },
    { e:'🗃️', n:'arquivos fichario organizacao', c:'Documentos' },
    { e:'🗄️', n:'arquivo gaveta servidor', c:'Documentos' },

    // Avisos
    { e:'⚠️', n:'aviso atencao cuidado alerta perigo', c:'Avisos' },
    { e:'🔴', n:'vermelho urgente critico', c:'Avisos' },
    { e:'🟡', n:'amarelo atencao moderado', c:'Avisos' },
    { e:'🟢', n:'verde ok bom liberado', c:'Avisos' },
    { e:'🔵', n:'azul informacao normal', c:'Avisos' },
    { e:'🟠', n:'laranja cuidado moderado', c:'Avisos' },
    { e:'🔔', n:'sino notificacao alerta', c:'Avisos' },
    { e:'📢', n:'megafone comunicado anuncio', c:'Avisos' },
    { e:'📣', n:'alto falante anuncio gritar', c:'Avisos' },
    { e:'🚨', n:'sirene emergencia urgente policia', c:'Avisos' },
    { e:'❗', n:'exclamacao importante atentar', c:'Avisos' },
    { e:'❕', n:'exclamacao branca aviso', c:'Avisos' },
    { e:'❓', n:'interrogacao duvida pergunta', c:'Avisos' },
    { e:'ℹ️', n:'informacao info ajuda', c:'Avisos' },
    { e:'🚫', n:'proibido nao permitido bloquear', c:'Avisos' },
    { e:'🛑', n:'parar stop nao pode', c:'Avisos' },
    { e:'⛔', n:'entrada proibida bloqueado', c:'Avisos' },
    { e:'🔒', n:'cadeado fechado seguranca restrito', c:'Avisos' },
    { e:'🔓', n:'cadeado aberto desbloqueado', c:'Avisos' },
    { e:'☢️', n:'radioativo quimico perigo', c:'Avisos' },
    { e:'☣️', n:'biologico biohazard perigo', c:'Avisos' },
    { e:'🆘', n:'socorro sos ajuda emergencia', c:'Avisos' },
    { e:'🔕', n:'silencioso sem som mudo', c:'Avisos' },

    // Comunicação
    { e:'📧', n:'email correio eletronico mensagem', c:'Comunicação' },
    { e:'📬', n:'caixa postal correspondencia recebido', c:'Comunicação' },
    { e:'☎️', n:'telefone fixo ligacao', c:'Comunicação' },
    { e:'📞', n:'telefone celular ligacao chamada', c:'Comunicação' },
    { e:'📠', n:'fax transmissao', c:'Comunicação' },
    { e:'💬', n:'mensagem chat conversa bate papo', c:'Comunicação' },
    { e:'💭', n:'pensamento ideia balao', c:'Comunicação' },
    { e:'🗨️', n:'fala dialogo conversa', c:'Comunicação' },
    { e:'🗣️', n:'falando anuncio voz', c:'Comunicação' },
    { e:'📡', n:'antena sinal wifi internet', c:'Comunicação' },
    { e:'📰', n:'jornal noticia artigo', c:'Comunicação' },
    { e:'📻', n:'radio transmissao', c:'Comunicação' },

    // Pessoas
    { e:'👤', n:'pessoa usuario perfil conta', c:'Pessoas' },
    { e:'👥', n:'grupo equipe time colaboradores', c:'Pessoas' },
    { e:'👨‍⚕️', n:'medico homem doutor dr', c:'Pessoas' },
    { e:'👩‍⚕️', n:'medica mulher doutora dra', c:'Pessoas' },
    { e:'🧑‍⚕️', n:'profissional saude enfermagem', c:'Pessoas' },
    { e:'👨‍💼', n:'executivo homem administrador gestor', c:'Pessoas' },
    { e:'👩‍💼', n:'executiva mulher administradora gestora', c:'Pessoas' },
    { e:'👷', n:'trabalhador operario servicos gerais', c:'Pessoas' },
    { e:'🧑‍🔬', n:'cientista pesquisador laboratorio', c:'Pessoas' },
    { e:'🫂', n:'abraco acolhimento apoio', c:'Pessoas' },
    { e:'🤝', n:'aperto maos parceria acordo', c:'Pessoas' },
    { e:'👶', n:'bebe pediatria neonatal', c:'Pessoas' },

    // Local
    { e:'🏢', n:'predio edificio escritorio hospital', c:'Local' },
    { e:'🏫', n:'escola predio setor bloco', c:'Local' },
    { e:'🏬', n:'loja departamento ala', c:'Local' },
    { e:'🏗️', n:'construcao obra reforma', c:'Local' },
    { e:'🚪', n:'porta entrada saida acesso', c:'Local' },
    { e:'🪟', n:'janela vidro', c:'Local' },
    { e:'🏠', n:'casa residencia domicilio', c:'Local' },
    { e:'🗺️', n:'mapa localizacao planta baixa', c:'Local' },
    { e:'🔑', n:'chave acesso entrada', c:'Local' },
    { e:'🗝️', n:'chave antiga acesso especial', c:'Local' },
    { e:'🌍', n:'mundo terra planeta global', c:'Local' },
    { e:'📍', n:'pin localizacao marcador', c:'Local' },

    // Ferramentas & TI
    { e:'⚙️', n:'engrenagem configuracao sistema', c:'Ferramentas' },
    { e:'🔧', n:'chave inglesa ferramenta configurar', c:'Ferramentas' },
    { e:'🔨', n:'martelo construir manutencao', c:'Ferramentas' },
    { e:'🛠️', n:'ferramentas manutencao reparo', c:'Ferramentas' },
    { e:'🔩', n:'parafuso porca ferramenta', c:'Ferramentas' },
    { e:'💻', n:'computador notebook laptop ti', c:'Ferramentas' },
    { e:'🖥️', n:'monitor desktop computador ti', c:'Ferramentas' },
    { e:'🖨️', n:'impressora imprimir', c:'Ferramentas' },
    { e:'⌨️', n:'teclado digitar computador', c:'Ferramentas' },
    { e:'🖱️', n:'mouse computador clicar', c:'Ferramentas' },
    { e:'📱', n:'celular smartphone aplicativo', c:'Ferramentas' },
    { e:'🔋', n:'bateria energia carga', c:'Ferramentas' },
    { e:'💾', n:'disquete salvar armazenar', c:'Ferramentas' },
    { e:'🔌', n:'tomada energia plugar', c:'Ferramentas' },
    { e:'📷', n:'camera foto imagem', c:'Ferramentas' },
    { e:'🖱️', n:'mouse ponteiro cursor', c:'Ferramentas' },
    { e:'🛡️', n:'escudo protecao seguranca', c:'Ferramentas' },
    { e:'🔐', n:'cadeado chave seguro privado', c:'Ferramentas' },

    // Tempo & Agenda
    { e:'📅', n:'calendario data agendamento', c:'Agenda' },
    { e:'📆', n:'calendario desmontado data', c:'Agenda' },
    { e:'⏰', n:'alarme horario acordar lembrete', c:'Agenda' },
    { e:'⌚', n:'relogio hora tempo', c:'Agenda' },
    { e:'⏱️', n:'cronometro tempo medir', c:'Agenda' },
    { e:'⏳', n:'ampulheta espera aguardando', c:'Agenda' },
    { e:'⌛', n:'ampulheta tempo esgotado prazo', c:'Agenda' },
    { e:'🕐', n:'uma hora relogio pontualidade', c:'Agenda' },
    { e:'🕛', n:'meio dia meia noite', c:'Agenda' },

    // Outros
    { e:'✅', n:'ok concluido aprovado feito check', c:'Outros' },
    { e:'❌', n:'errado cancelado nao recusado', c:'Outros' },
    { e:'➕', n:'adicionar mais novo incluir', c:'Outros' },
    { e:'➖', n:'remover menos excluir', c:'Outros' },
    { e:'🔄', n:'atualizar sincronizar renovar', c:'Outros' },
    { e:'♻️', n:'reciclar renovar sustentabilidade', c:'Outros' },
    { e:'🎯', n:'objetivo meta alvo foco', c:'Outros' },
    { e:'🏆', n:'trofeu conquista premio vencedor', c:'Outros' },
    { e:'⭐', n:'estrela favorito destaque especial', c:'Outros' },
    { e:'💡', n:'ideia lampada sugestao inovacao', c:'Outros' },
    { e:'🔍', n:'pesquisar buscar lupa procurar', c:'Outros' },
    { e:'💰', n:'dinheiro financeiro custo', c:'Outros' },
    { e:'🎓', n:'formatura educacao treinamento curso', c:'Outros' },
    { e:'🚀', n:'foguete lancamento novo inicio', c:'Outros' },
    { e:'🎉', n:'comemoracao evento festa celebracao', c:'Outros' },
    { e:'📊', n:'relatorio indicador kpi resultado', c:'Outros' },
    { e:'🧩', n:'puzzle integracao componente', c:'Outros' },
    { e:'🏅', n:'medalha reconhecimento merito', c:'Outros' },
  ];

  const CAT_ICONS = { 'Saúde':'🩺','Documentos':'📄','Avisos':'⚠️','Comunicação':'💬','Pessoas':'👥','Local':'🏢','Ferramentas':'⚙️','Agenda':'📅','Outros':'✨' };

  /* ---- CSS (injetado uma vez) ---- */
  if (!document.getElementById('ep-styles')) {
    const s = document.createElement('style');
    s.id = 'ep-styles';
    s.textContent = `
      .ep-wrapper{position:relative;display:inline-block;vertical-align:middle}
      .ep-trigger{
        display:inline-flex;align-items:center;gap:6px;
        padding:5px 10px;border:1.5px solid var(--borda,#d1d5db);
        border-radius:8px;cursor:pointer;
        background:var(--fundo-card,#fff);color:var(--texto,#111827);
        font-size:18px;line-height:1;transition:border-color .15s;
        font-family:inherit
      }
      .ep-trigger:hover{border-color:var(--azul-medio,#1D71B8)}
      .ep-current{font-size:20px;line-height:1}
      .ep-arrow{font-size:11px;opacity:.5;line-height:1}
      .ep-dropdown{
        position:fixed;z-index:99999;
        background:var(--fundo-card,#fff);
        border:1.5px solid var(--borda,#d1d5db);
        border-radius:12px;
        box-shadow:0 8px 32px rgba(0,0,0,.18);
        width:292px;max-height:340px;
        display:flex;flex-direction:column;
        overflow:hidden
      }
      .ep-search-wrap{padding:8px 10px;border-bottom:1px solid var(--borda,#e5e7eb);flex-shrink:0}
      .ep-search{
        width:100%;box-sizing:border-box;
        padding:6px 10px;border:1.5px solid var(--borda,#d1d5db);
        border-radius:6px;font-size:13px;outline:none;
        background:var(--fundo-card,#fff);color:var(--texto,#111827);
        font-family:inherit
      }
      .ep-search:focus{border-color:var(--azul-medio,#1D71B8)}
      .ep-body{overflow-y:auto;flex:1;padding:4px 8px 8px}
      .ep-cat-block{margin-bottom:4px}
      .ep-cat-label{
        font-size:10px;font-weight:700;text-transform:uppercase;
        letter-spacing:.06em;color:var(--cinza-texto,#6b7280);
        padding:6px 2px 3px;display:block;
        position:sticky;top:0;
        background:var(--fundo-card,#fff);z-index:1
      }
      .ep-grid{display:flex;flex-wrap:wrap;gap:2px;margin-bottom:2px}
      .ep-btn{
        width:34px;height:34px;font-size:19px;
        border:none;background:none;cursor:pointer;
        border-radius:6px;display:flex;align-items:center;justify-content:center;
        line-height:1;transition:background .1s;padding:0
      }
      .ep-btn:hover{background:var(--cinza-fundo,#f3f4f6)}
      .ep-btn.ep-sel{
        background:rgba(21,57,170,.10);
        outline:2px solid var(--azul-medio,#1D71B8);
        outline-offset:-1px
      }
      .ep-empty{padding:16px;text-align:center;font-size:13px;color:var(--cinza-texto,#6b7280)}
    `;
    document.head.appendChild(s);
  }

  /* ---- Estado ---- */
  let _activeDrop = null;
  let _activeTrigger = null;

  function closeAll() {
    _activeDrop?.remove();
    _activeDrop = null;
    _activeTrigger = null;
  }

  document.addEventListener('click', function (e) {
    if (_activeDrop && !_activeDrop.contains(e.target) && !e.target.closest('.ep-trigger')) {
      closeAll();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && _activeDrop) closeAll();
  });

  /* ---- Abre o dropdown ---- */
  function openDropdown(trigger) {
    const id      = trigger.dataset.epId;
    const hidden  = document.getElementById(id);
    const current = hidden ? hidden.value : '';

    const dd = document.createElement('div');
    dd.className = 'ep-dropdown';
    _activeDrop   = dd;
    _activeTrigger = trigger;

    const cats = [...new Set(EMOJIS.map(x => x.c))];

    function renderGrid(list) {
      if (!list.length) return `<div class="ep-empty">Nenhum emoji encontrado</div>`;
      return `<div class="ep-grid">${list.map(x =>
        `<button type="button" class="ep-btn${x.e === current ? ' ep-sel' : ''}"
          data-emoji="${x.e}" data-name="${x.n}" title="${x.n}">${x.e}</button>`
      ).join('')}</div>`;
    }

    dd.innerHTML = `
      <div class="ep-search-wrap">
        <input class="ep-search" type="text" placeholder="Buscar emoji…" autocomplete="off">
      </div>
      <div class="ep-body">
        ${cats.map(cat => {
          const icon = CAT_ICONS[cat] || '';
          return `<div class="ep-cat-block" data-cat="${cat}">
            <span class="ep-cat-label">${icon} ${cat}</span>
            ${renderGrid(EMOJIS.filter(x => x.c === cat))}
          </div>`;
        }).join('')}
      </div>`;

    document.body.appendChild(dd);

    /* Posicionamento */
    const r = trigger.getBoundingClientRect();
    let top  = r.bottom + 6;
    let left = r.left;
    if (left + 292 > window.innerWidth - 8)  left = Math.max(8, window.innerWidth - 300);
    if (top  + 340 > window.innerHeight - 8) top  = Math.max(8, r.top - 346);
    dd.style.top  = top  + 'px';
    dd.style.left = left + 'px';

    /* Busca */
    const search = dd.querySelector('.ep-search');
    search.focus();
    search.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      const body = dd.querySelector('.ep-body');
      if (!q) {
        body.innerHTML = cats.map(cat => {
          const icon = CAT_ICONS[cat] || '';
          return `<div class="ep-cat-block" data-cat="${cat}">
            <span class="ep-cat-label">${icon} ${cat}</span>
            ${renderGrid(EMOJIS.filter(x => x.c === cat))}
          </div>`;
        }).join('');
      } else {
        const found = EMOJIS.filter(x => x.n.includes(q) || x.e === q);
        body.innerHTML = `<div class="ep-cat-block">
          <span class="ep-cat-label">🔍 Resultados</span>
          ${renderGrid(found)}
        </div>`;
      }
    });

    /* Seleção */
    dd.addEventListener('click', function (e) {
      e.stopPropagation();
      const btn = e.target.closest('.ep-btn');
      if (!btn) return;
      const emoji = btn.dataset.emoji;
      if (hidden) hidden.value = emoji;
      trigger.querySelector('.ep-current').textContent = emoji;
      closeAll();
    });
  }

  /* ---- API pública ---- */
  window.buildEmojiField = function (id, value, label) {
    const v = value || '🏥';
    return `<label>${label || 'Emoji'}
      <div class="ep-wrapper">
        <button type="button" class="ep-trigger" data-ep-id="${id}">
          <span class="ep-current">${v}</span><span class="ep-arrow">▾</span>
        </button>
        <input type="hidden" id="${id}" value="${v}">
      </div>
    </label>`;
  };

  window.initEmojiPickers = function (root) {
    (root || document).querySelectorAll('.ep-trigger[data-ep-id]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isMine = _activeTrigger === trigger;
        closeAll();
        if (!isMine) openDropdown(trigger);
      });
    });
  };

})();
