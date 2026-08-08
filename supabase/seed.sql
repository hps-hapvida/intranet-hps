-- ================================================
--  Intranet HPS — Dados iniciais (seed)
--  Execute DEPOIS do schema.sql
-- ================================================

-- ---- Setores -----------------------------------------

insert into public.sectors (slug, name, emoji, color, description, featured_app_url, featured_app_name, sort_order) values
  ('pronto-socorro',  'Pronto Socorro',       '🚨', 'red',    'Triagem, leitos, avisos cirúrgicos, escala e ferramentas operacionais do PS.', 'https://gerenciamento-leitos-hps.streamlit.app', 'App de Gerenciamento de Leitos', 1),
  ('uti-adulto',      'UTI Adulto',           '🫀', 'blue',   'Protocolos, leitos e gestão de pacientes críticos.', null, null, 2),
  ('uti-neonatal',    'UTI Neonatal',         '🍼', 'purple', 'Recursos para assistência neonatal e materna.', null, null, 3),
  ('centro-cirurgico','Centro Cirúrgico',     '🔪', 'blue',   'Programação, avisos e protocolos cirúrgicos.', null, null, 4),
  ('internacao',      'Internação',           '🛏️', 'green',  'Enfermarias, altas, transferências e leitos.', null, null, 5),
  ('ambulatorio',     'Ambulatório',          '🏃', 'orange', 'Consultas, agendamentos e especialidades.', null, null, 6),
  ('farmacia',        'Farmácia',             '💊', 'green',  'Dispensação, padronização e solicitações.', null, null, 7),
  ('same',            'SAME',                 '📁', 'yellow', 'Prontuários, laudos e arquivo médico.', null, null, 8),
  ('laboratorio',     'Laboratório',          '🧪', 'purple', 'Exames, coletas e resultados.', null, null, 9),
  ('radiologia',      'Radiologia / Imagem',  '🩻', 'blue',   'RX, TC, RM e laudos de imagem.', null, null, 10),
  ('nutricao',        'Nutrição',             '🥗', 'orange', 'Dietética, NDT e suporte nutricional.', null, null, 11),
  ('fisioterapia',    'Fisioterapia',         '🦾', 'green',  'Reabilitação, respiratória e motora.', null, null, 12),
  ('servico-social',  'Serviço Social',       '🤝', 'purple', 'Regulação de vagas, alta social e benefícios.', null, null, 13),
  ('qualidade',       'Qualidade',            '⭐', 'yellow', 'Indicadores, acreditação e melhorias.', null, null, 14),
  ('ti',              'TI',                   '💻', 'blue',   'Suporte, sistemas e infraestrutura.', null, null, 15),
  ('administracao',   'Administração',        '🏛️', 'yellow', 'Gestão, recursos humanos e operações.', null, null, 16);

-- ---- Posts do Pronto Socorro -------------------------

with ps as (select id from public.sectors where slug = 'pronto-socorro')
insert into public.posts (sector_id, title, summary, body, tag, post_date, author) values
(
  (select id from ps),
  'Escala de plantão — agosto 2025 disponível',
  'Confira sua escala antes de 10/08. Trocas devem ser solicitadas com 72h de antecedência à coordenação.',
  '<p>A escala de plantão do mês de agosto foi publicada. Todos os profissionais devem conferir suas escalas até <strong>10/08</strong>.</p><p>Trocas devem ser solicitadas à coordenação com no mínimo 72h de antecedência. O documento completo está na pasta compartilhada: <em>\\Servidor\PS\Escalas\2025</em></p><p>Dúvidas: coordenacao.ps@hps.hapvida.com.br</p>',
  'urgente',
  '2025-08-08',
  'Coordenação PS'
),
(
  (select id from ps),
  'Protocolo de Sepse atualizado — leitura obrigatória',
  'Novo protocolo de sepse em vigor desde 05/08. Principais mudanças na antibioticoterapia e reposição volêmica.',
  '<p>O protocolo de sepse foi atualizado conforme as diretrizes da Surviving Sepsis Campaign 2024. As principais mudanças incluem:</p><ul style="margin-left:16px;margin-top:8px;"><li>Coleta de hemocultura antes de antibiótico (sempre que possível)</li><li>Antibiótico na 1ª hora após reconhecimento</li><li>Reavaliação de fluidos com ultrassom</li></ul><p style="margin-top:12px;">O documento completo está disponível nos links rápidos abaixo.</p>',
  'aviso',
  '2025-08-05',
  'Qualidade / Médico Referência'
),
(
  (select id from ps),
  'Monitor do leito 12 em manutenção',
  'Utilize o monitor reserva. Previsão de retorno: 09/08 às 14h. Contato: TI ramal 2100.',
  '<p>O monitor do leito 12 está em manutenção preventiva. Utilize o monitor reserva disponível na sala de equipamentos.</p><p>Previsão de retorno: <strong>09/08 às 14h</strong>. Qualquer dúvida, contate a TI (ramal 2100).</p>',
  'info',
  '2025-08-03',
  'Engenharia Clínica'
),
(
  (select id from ps),
  'Treinamento Manchester — 15/08 — presença obrigatória',
  'Treinamento obrigatório para toda equipe de enfermagem do PS em 15/08. Dois turnos disponíveis. Confirme presença até 12/08.',
  '<p>Será realizado um treinamento obrigatório sobre o Sistema de Triagem Manchester para toda equipe de enfermagem do PS.</p><p><strong>Data:</strong> 15/08/2025<br><strong>Horário:</strong> 08h às 12h e 14h às 18h (2 turnos)<br><strong>Local:</strong> Auditório 2 — bloco A</p><p>Confirmação de presença obrigatória até 12/08.</p>',
  'tutorial',
  '2025-08-01',
  'Educação Continuada'
);

-- ---- Links do Pronto Socorro -------------------------

with ps as (select id from public.sectors where slug = 'pronto-socorro')
insert into public.links (sector_id, label, url, icon, is_featured, sort_order) values
  ((select id from ps), 'App de Gerenciamento de Leitos', 'https://gerenciamento-leitos-hps.streamlit.app', '🛏️', true,  1),
  ((select id from ps), 'Censo diário (planilha)',         '#', '📋', false, 2),
  ((select id from ps), 'Escala de plantão — agosto',     '#', '📅', false, 3),
  ((select id from ps), 'Protocolo de Sepse (PDF)',        '#', '🦠', false, 4),
  ((select id from ps), 'Protocolo de IAM/AVC',           '#', '🫀', false, 5),
  ((select id from ps), 'Padronização Farmácia — PS',     '#', '💊', false, 6),
  ((select id from ps), 'SAME — prontuários',             '#', '📁', false, 7),
  ((select id from ps), 'Resultados de Exames (Lab)',     '#', '🧪', false, 8),
  ((select id from ps), 'Radiologia / PACS',              '#', '🩻', false, 9);

-- ---- Ramais do Pronto Socorro ------------------------

with ps as (select id from public.sectors where slug = 'pronto-socorro')
insert into public.extensions (sector_id, label, number, icon, sort_order) values
  ((select id from ps), 'UTI Adulto',   '2210', '🫀', 1),
  ((select id from ps), 'UTI Neonatal', '2220', '🍼', 2),
  ((select id from ps), 'Centro Cirúrgico', '2300', '🔪', 3),
  ((select id from ps), 'TI / Suporte', '2100', '💻', 4),
  ((select id from ps), 'Farmácia',     '2050', '💊', 5),
  ((select id from ps), 'Laboratório',  '2400', '🧪', 6),
  ((select id from ps), 'Radiologia',   '2350', '🩻', 7),
  ((select id from ps), 'Código 99 (PCR)', '2001', '📢', 8);

-- ---- Documentos do Pronto Socorro --------------------

with ps as (select id from public.sectors where slug = 'pronto-socorro')
insert into public.documents (sector_id, label, url, icon, sort_order) values
  ((select id from ps), 'POP — Triagem Manchester',       '#', '📄', 1),
  ((select id from ps), 'POP — Gerenciamento de Leitos',  '#', '📄', 2),
  ((select id from ps), 'Formulário de Aviso Cirúrgico',  '#', '📄', 3),
  ((select id from ps), 'Formulário de Transferência',    '#', '📄', 4),
  ((select id from ps), 'Mapa de Leitos — Contingência',  '#', '📄', 5),
  ((select id from ps), 'Indicadores do PS — Jul 2025',   '#', '📊', 6);

-- ---- FAQs do Pronto Socorro --------------------------

with ps as (select id from public.sectors where slug = 'pronto-socorro')
insert into public.faqs (sector_id, question, answer, sort_order) values
  ((select id from ps),
   'Como solicitar leito de UTI pelo PS?',
   'Acesse o App de Gerenciamento de Leitos → aba "Regulação" → clique em "Solicitar UTI". Preencha o formulário com dados clínicos e score SOFA. A regulação responde em até 30 minutos. Para urgências, ligue direto para o ramal da UTI: 2210.',
   1),
  ((select id from ps),
   'Qual o fluxo para paciente que chega em PCR?',
   '1. Triagem imediata — vermelho (emergência). 2. Acionar equipe de reanimação pelo interfone (código 99). 3. Direcionar para sala de reanimação (sala 1 do PS). 4. Registrar horário de chegada e de início do RCP. 5. Após estabilização, solicitar leito de UTI via sistema.',
   2),
  ((select id from ps),
   'Como registrar alta administrativa no sistema?',
   'No App de Leitos, selecione o paciente → botão "Alta" → escolha o tipo (alta médica, transferência, óbito) → confirme a limpeza do leito. O SAME é notificado automaticamente para fechamento do prontuário.',
   3),
  ((select id from ps),
   'O que fazer quando o sistema de leitos estiver fora do ar?',
   'Utilize a planilha de contingência disponível na pasta compartilhada: \\Servidor\PS\Contingencia\Censo_Manual.xlsx. Notifique a TI pelo ramal 2100 imediatamente.',
   4),
  ((select id from ps),
   'Como solicitar aviso cirúrgico de emergência?',
   'Ligue para o Centro Cirúrgico (ramal 2300) e informe: nome do paciente, diagnóstico, tipo de cirurgia e cirurgião responsável. O CC abrirá a sala e enviará o aviso cirúrgico eletronicamente.',
   5);
