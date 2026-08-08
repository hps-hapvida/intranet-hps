#!/usr/bin/env python3
"""Gerador de páginas de setores do Portal HPS."""

import os

SETORES = [
    {
        "slug": "uti-adulto",
        "nome": "UTI Adulto",
        "emoji": "🫀",
        "cor": "blue",
        "descricao": "Gestão de pacientes críticos, protocolos, escalas e recursos da Unidade de Terapia Intensiva Adulto.",
        "cor_icone_css": "",
        "app": None,
        "links": [
            ("📋", "Mapa de Leitos — UTI", "#"),
            ("🦠", "Protocolo de Sepse Grave", "#"),
            ("💊", "Antimicrobianos — UTI (PDF)", "#"),
            ("📅", "Escala de Plantonistas", "#"),
            ("📊", "Indicadores UTI — Julho 2025", "#"),
            ("📁", "SAME — prontuários UTI", "#"),
            ("🩻", "PACS / Imagens", "#"),
            ("🧪", "Laboratório — Resultados", "#"),
        ],
        "avisos": [
            ("08", "AGO", "urgente", "Bundle de ventilação mecânica — novo protocolo", "A partir de 10/08, o bundle de VM passa a incluir avaliação de delirium 2x/dia com CAM-ICU. Leia o protocolo completo no link abaixo."),
            ("05", "AGO", "aviso", "Troca de circuito — prazo atualizado para 7 dias", "Conforme resolução da ANVISA, o prazo de troca de circuito ventilatório passou de 5 para 7 dias em pacientes sem infecção respiratória ativa."),
            ("01", "AGO", "info", "Calibração dos monitores — concluída", "A calibração semestral de todos os monitores multiparamétricos da UTI foi concluída. Relatórios disponíveis na engenharia clínica."),
        ],
        "faqs": [
            ("Como solicitar interconsulta na UTI?", "Acesse o sistema de regulação → aba 'Interconsulta' → preencha os dados clínicos e o especialista desejado. Resposta em até 2h em dias úteis."),
            ("Qual o protocolo de extubação?", "Utilize o critério PABA + SBT de 30 min. Documentar no prontuário o resultado do teste e a decisão clínica. Formulário disponível na pasta de POPs."),
            ("Como acionar a equipe multidisciplinar?", "Via sistema ou ramal 2215. A visita multidisciplinar ocorre todos os dias às 09h30."),
        ],
        "ramais": [
            ("🫀", "Chefia UTI Adulto", "2211"),
            ("👩‍⚕️", "Enfermagem UTI", "2212"),
            ("💊", "Farmácia UTI", "2051"),
            ("🧪", "Laboratório urgência", "2401"),
            ("🩺", "Médico Plantonista", "2213"),
        ],
        "documentos": [
            ("POP — Ventilação Mecânica", "#"),
            ("POP — Sedoanalgesia", "#"),
            ("Bundle IRAS — UTI", "#"),
            ("Check-list Admissão UTI", "#"),
            ("Protocolo Glicemia Capilar", "#"),
        ],
    },
    {
        "slug": "uti-neonatal",
        "nome": "UTI Neonatal",
        "emoji": "🍼",
        "cor": "purple",
        "descricao": "Recursos para assistência neonatal intensiva, suporte ao recém-nascido crítico e à família.",
        "app": None,
        "links": [
            ("📋", "Mapa de Leitos — UTIN", "#"),
            ("🍼", "Protocolo de CPAP Nasal", "#"),
            ("💊", "Padronização Neonatal", "#"),
            ("📅", "Escala de Plantonistas", "#"),
            ("📊", "Indicadores UTIN — Julho 2025", "#"),
            ("🤱", "Protocolo de Aleitamento Materno", "#"),
            ("🏠", "Método Canguru — POP", "#"),
        ],
        "avisos": [
            ("07", "AGO", "urgente", "Falta de surfactante — contatar farmácia", "Estoque de surfactante crítico. Contactar farmácia imediatamente (ramal 2052) antes de qualquer prescrição."),
            ("03", "AGO", "aviso", "Triagem neonatal — coleta atualizada", "A coleta do teste do pezinho passa a ser obrigatoriamente documentada no sistema a partir de 10/08."),
            ("29", "JUL", "tutorial", "Capacitação reanimação neonatal — vagas abertas", "Curso de Reanimação Neonatal (SBP) com vagas disponíveis para equipe da UTIN. Inscrições até 15/08."),
        ],
        "faqs": [
            ("Como registrar alta para o alojamento conjunto?", "Acesse o sistema → aba UTIN → selecione o paciente → 'Alta para alojamento conjunto'. Informe o peso de alta e condições clínicas."),
            ("Qual o critério para suspender a nutrição parenteral?", "Quando a dieta enteral atingir 120ml/kg/dia e o RN tolerar bem, conforme protocolo de PN disponível nos links."),
            ("Como acionar suporte emocional para a família?", "Via serviço social (ramal 2500) ou psicologia (ramal 2510) durante horário comercial. Fora do horário, acione o plantonista."),
        ],
        "ramais": [
            ("🍼", "Chefia UTIN", "2221"),
            ("👩‍⚕️", "Enfermagem UTIN", "2222"),
            ("👨‍👩‍👧", "Serviço Social", "2500"),
            ("🧠", "Psicologia", "2510"),
            ("💊", "Farmácia Neonatal", "2052"),
        ],
        "documentos": [
            ("POP — Reanimação Neonatal", "#"),
            ("Protocolo de CPAP", "#"),
            ("POP — Método Canguru", "#"),
            ("Check-list Alta UTIN", "#"),
            ("Formulário Aleitamento Materno", "#"),
        ],
    },
    {
        "slug": "centro-cirurgico",
        "nome": "Centro Cirúrgico",
        "emoji": "🔪",
        "cor": "blue",
        "descricao": "Programação cirúrgica, avisos, protocolos e recursos do Centro Cirúrgico e SRPA.",
        "app": None,
        "links": [
            ("📅", "Programação Cirúrgica — Hoje", "#"),
            ("📋", "Mapa de Salas Cirúrgicas", "#"),
            ("🔪", "Formulário de Aviso Cirúrgico", "#"),
            ("💉", "Protocolo de Profilaxia ATB", "#"),
            ("📊", "Indicadores CC — Julho 2025", "#"),
            ("🩺", "Check-list Cirúrgico OMS", "#"),
            ("💊", "Padronização Anestesia", "#"),
        ],
        "avisos": [
            ("08", "AGO", "urgente", "Sala 3 disponível somente a partir das 14h", "A sala 3 está em limpeza terminal após caso infeccioso. Disponível somente após as 14h de hoje."),
            ("06", "AGO", "aviso", "Check-list cirúrgico OMS — preenchimento obrigatório", "A partir de 09/08, o check-list OMS deve ser fotografado e anexado ao prontuário eletronicamente."),
            ("02", "AGO", "info", "Novo autoclave — operacional", "O novo autoclave de grande capacidade está operacional desde 01/08. Treinamento disponível no link de tutoriais."),
        ],
        "faqs": [
            ("Como solicitar cirurgia de emergência?", "Ligue para o CC (ramal 2300) e informe: paciente, diagnóstico, cirurgião e tipo de cirurgia. O CC abre a sala e emite o aviso eletronicamente."),
            ("Qual a antecedência para aviso cirúrgico eletivo?", "Mínimo de 24h para cirurgias eletivas e 12h para urgências não imediatas."),
            ("Como funciona a SRPA?", "A SRPA tem 8 leitos. O paciente permanece até escore de Aldrete ≥ 9 e critérios de alta cumpridos. Formulário SRPA no sistema."),
        ],
        "ramais": [
            ("🔪", "Coordenação CC", "2301"),
            ("👩‍⚕️", "Enfermagem CC", "2302"),
            ("💉", "Anestesiologia", "2310"),
            ("🧹", "Higienização CC", "2305"),
            ("🛌", "SRPA", "2320"),
        ],
        "documentos": [
            ("Check-list Cirúrgico OMS", "#"),
            ("POP — Profilaxia Antimicrobiana", "#"),
            ("POP — Limpeza Terminal de Sala", "#"),
            ("Formulário de Aviso Cirúrgico", "#"),
            ("Protocolo de Contagem de Compressas", "#"),
        ],
    },
    {
        "slug": "internacao",
        "nome": "Internação",
        "emoji": "🛏️",
        "cor": "green",
        "descricao": "Gestão de leitos de enfermaria, altas, transferências e recursos das alas de internação.",
        "app": None,
        "links": [
            ("📋", "Mapa de Leitos — Internação", "#"),
            ("📅", "Programação de Altas — Hoje", "#"),
            ("🔁", "Formulário de Transferência", "#"),
            ("📊", "Indicadores de Ocupação", "#"),
            ("📄", "POP — Alta Hospitalar", "#"),
            ("🤝", "Serviço Social — Regulação", "#"),
        ],
        "avisos": [
            ("08", "AGO", "aviso", "Leitos bloqueados — bloco C, 3º andar (reforma)", "8 leitos do bloco C 3º andar bloqueados para reforma elétrica até 20/08. Remanejamento em andamento."),
            ("04", "AGO", "info", "Visitas: horário atualizado", "O horário de visitas passa a ser das 14h às 16h e das 18h às 19h a partir de 10/08."),
            ("01", "AGO", "tutorial", "Treinamento — Prevenção de LPP (lesão por pressão)", "Capacitação obrigatória para toda equipe de enfermagem da internação. Datas: 12 e 13/08."),
        ],
        "faqs": [
            ("Como registrar uma transferência interna?", "Acesse o sistema → aba 'Leitos' → selecione o paciente → 'Transferência' → informe o leito destino. A higienização é notificada automaticamente."),
            ("Qual o fluxo de alta hospitalar?", "Médico assina prescrição de alta → enfermagem confere → SAME fecha prontuário → paciente recebe resumo de alta e orientações."),
            ("Como acionar o serviço social para alta complexa?", "Ramal 2500 ou pelo sistema (aba 'Interconsultas → Serviço Social'). Especifique a demanda social identificada."),
        ],
        "ramais": [
            ("🛏️", "Coordenação Internação", "2601"),
            ("👩‍⚕️", "Enfermagem — Bloco A", "2610"),
            ("👩‍⚕️", "Enfermagem — Bloco B", "2620"),
            ("🤝", "Serviço Social", "2500"),
            ("🧹", "Higienização", "2700"),
        ],
        "documentos": [
            ("POP — Alta Hospitalar", "#"),
            ("POP — Prevenção de LPP", "#"),
            ("Formulário de Transferência Interna", "#"),
            ("Escala de Braden", "#"),
            ("Indicadores Internação — Julho 2025", "#"),
        ],
    },
    {
        "slug": "farmacia",
        "nome": "Farmácia",
        "emoji": "💊",
        "cor": "green",
        "descricao": "Dispensação, padronização de medicamentos, solicitações e recursos do serviço farmacêutico.",
        "app": None,
        "links": [
            ("💊", "Padronização de Medicamentos", "#"),
            ("📋", "Formulário de Solicitação", "#"),
            ("🚨", "Medicamentos de Alta Vigilância", "#"),
            ("📊", "Controle de Estoque — Críticos", "#"),
            ("📄", "Antimicrobianos — Protocolos", "#"),
            ("🔬", "Farmacovigilância — Formulário", "#"),
        ],
        "avisos": [
            ("07", "AGO", "urgente", "Surfactante — estoque crítico", "Estoque de surfactante em nível crítico. Todas as prescrições devem ser comunicadas antes do uso."),
            ("05", "AGO", "aviso", "Novo formulário de solicitação de hemoderivados", "A partir de 11/08, todas as solicitações de hemoderivados devem ser feitas pelo novo formulário eletrônico."),
            ("02", "AGO", "info", "Treinamento: manuseio de medicamentos citotóxicos", "Treinamento obrigatório para farmacêuticos e técnicos — 14/08 às 14h. Sala de treinamento 1."),
        ],
        "faqs": [
            ("Como solicitar medicamento não padronizado?", "Preencha o formulário de exceção disponível no sistema (aba Farmácia → Não Padronizados). Necessita assinatura do médico e aprovação do farmacêutico responsável."),
            ("Qual o prazo para dispensação de medicamentos especiais?", "Medicamentos controlados: até 2h após prescrição validada. Emergências: imediato com ramal 2050."),
            ("Como notificar reação adversa a medicamento (RAM)?", "Preencha o formulário de farmacovigilância disponível nos links rápidos ou acesse o sistema Notivisa."),
        ],
        "ramais": [
            ("💊", "Farmácia Central", "2050"),
            ("💊", "Farmácia UTI", "2051"),
            ("💊", "Farmácia Neonatal", "2052"),
            ("🔬", "Farmácia Clínica", "2055"),
        ],
        "documentos": [
            ("Padronização de Medicamentos 2025", "#"),
            ("Lista de Medicamentos Alta Vigilância", "#"),
            ("POP — Dispensação de Psicotrópicos", "#"),
            ("Formulário Hemoderivados", "#"),
            ("Guia de Antimicrobianos", "#"),
        ],
    },
    {
        "slug": "same",
        "nome": "SAME",
        "emoji": "📁",
        "cor": "yellow",
        "descricao": "Serviço de Arquivo Médico e Estatístico — prontuários, laudos, estatísticas e faturamento.",
        "app": None,
        "links": [
            ("📁", "Sistema de Prontuário Eletrônico", "#"),
            ("📊", "Estatísticas — Julho 2025", "#"),
            ("📋", "Formulário de Resumo de Alta", "#"),
            ("🔍", "Busca de Prontuários Físicos", "#"),
            ("📄", "Requisição de Cópias", "#"),
        ],
        "avisos": [
            ("06", "AGO", "aviso", "Prazo para fechamento de prontuários — agosto", "Todos os prontuários do mês de julho devem estar fechados até 15/08."),
            ("03", "AGO", "info", "Novo sistema de digitalização implantado", "A partir de 10/08, todos os documentos físicos passam a ser digitalizados no momento da entrada."),
            ("29", "JUL", "urgente", "LGPD — atualização de procedimentos de acesso", "Novos procedimentos para solicitação de cópias de prontuário conforme LGPD. Leitura obrigatória."),
        ],
        "faqs": [
            ("Como solicitar cópia de prontuário para o paciente?", "O paciente deve apresentar documento de identidade e preencher o formulário de autorização. O SAME disponibiliza a cópia em até 72h."),
            ("Qual o prazo para fechamento de prontuário após alta?", "48h para o médico assinar o resumo de alta. Prontuários em aberto após esse prazo geram alerta automático."),
            ("Como corrigir erro de digitação no cadastro?", "Acione o SAME pelo ramal 2800 ou presencialmente. Correções de dados sensíveis requerem documento comprobatório."),
        ],
        "ramais": [
            ("📁", "SAME — Arquivo", "2800"),
            ("📊", "SAME — Estatística", "2801"),
            ("💰", "Faturamento", "2810"),
        ],
        "documentos": [
            ("POP — Fechamento de Prontuário", "#"),
            ("Formulário de Requisição de Cópia", "#"),
            ("Procedimento LGPD — Prontuários", "#"),
            ("Indicadores Hospitalares — Julho 2025", "#"),
        ],
    },
    {
        "slug": "laboratorio",
        "nome": "Laboratório",
        "emoji": "🧪",
        "cor": "purple",
        "descricao": "Exames laboratoriais, coletas, resultados e recursos do laboratório clínico.",
        "app": None,
        "links": [
            ("🔬", "Resultados de Exames (sistema)", "#"),
            ("📋", "Tabela de Exames e Materiais", "#"),
            ("🩸", "Protocolo de Hemostasia", "#"),
            ("🦠", "Hemocultura — POP", "#"),
            ("📊", "Controle de Qualidade — Lab", "#"),
            ("📄", "Tabela de Valores de Referência", "#"),
        ],
        "avisos": [
            ("07", "AGO", "aviso", "Reagente de troponina — lote atualizado (novos valores de referência)", "O novo lote de reagente para troponina ultrassensível altera o ponto de corte. Veja tabela atualizada nos links."),
            ("04", "AGO", "info", "Manutenção do hematologista — 10/08 das 06h às 08h", "Neste período, hemogramas de urgência serão processados manualmente. Comunicar ao laboratório antes de coletar."),
            ("01", "AGO", "urgente", "Escassez de tubos EDTA — 4ml", "Utilizar tubos de 3ml ou 2ml até reposição prevista para 12/08."),
        ],
        "faqs": [
            ("Qual o prazo para resultados de urgência?", "Hemograma e bioquímica básica: até 1h. Gasometria: 15 min. Culturas: 48-72h. Resultados críticos são comunicados por telefone imediatamente."),
            ("Como solicitar exame não disponível na tabela?", "Entre em contato com o laboratório de referência via SAME ou diretamente pelo ramal 2402. Necessita autorização médica."),
            ("Como proceder com amostra hemolisada?", "Notifique o laboratório (ramal 2400) e solicite nova coleta. Resultados de amostras hemolisadas são liberados com ressalva."),
        ],
        "ramais": [
            ("🧪", "Laboratório Urgência", "2400"),
            ("🧪", "Laboratório Rotina", "2401"),
            ("🦠", "Microbiologia", "2402"),
            ("🩸", "Banco de Sangue", "2410"),
        ],
        "documentos": [
            ("Tabela de Exames e Materiais", "#"),
            ("Valores de Referência 2025", "#"),
            ("POP — Coleta de Hemocultura", "#"),
            ("Protocolo de Transfusão", "#"),
            ("POP — Transporte de Amostras", "#"),
        ],
    },
    {
        "slug": "radiologia",
        "nome": "Radiologia / Imagem",
        "emoji": "🩻",
        "cor": "blue",
        "descricao": "Exames de imagem, PACS, laudos e recursos do serviço de radiologia e diagnóstico por imagem.",
        "app": None,
        "links": [
            ("🩻", "PACS — Imagens", "#"),
            ("📋", "Tabela de Exames de Imagem", "#"),
            ("🧲", "Protocolo RM — Contraindicações", "#"),
            ("☢️", "Proteção Radiológica — POP", "#"),
            ("📊", "Produção — Julho 2025", "#"),
        ],
        "avisos": [
            ("06", "AGO", "aviso", "Tomógrafo 2 em manutenção — 09 e 10/08", "O TC2 estará em manutenção. Demanda será direcionada ao TC1. Priorizar urgências."),
            ("03", "AGO", "info", "Novo protocolo de TC de tórax para COVID disponível", "Acesse nos documentos o protocolo atualizado de TC de tórax."),
            ("31", "JUL", "urgente", "Contraste iodado — novo lote, mesmo protocolo de preparo", "Atenção ao novo lote de contraste — verificar validade antes do uso."),
        ],
        "faqs": [
            ("Como solicitar exame de imagem de urgência?", "Via sistema (aba Imagem → Urgência) ou ramal 2350. Trazer o paciente diretamente em casos críticos."),
            ("Qual o prazo para laudo?", "RX: 2h. TC: 4h. RM: 8h. Laudos de urgência: comunicados verbalmente ao solicitante em até 30 min."),
            ("Quais as contraindicações para RM?", "Veja o formulário de triagem RM disponível nos documentos. Sempre avaliar implantes metálicos, marcapassos e claustrofobia."),
        ],
        "ramais": [
            ("🩻", "Radiologia Urgência", "2350"),
            ("🩻", "TC / RM", "2351"),
            ("📡", "Laudo / PACS", "2352"),
        ],
        "documentos": [
            ("Formulário de Triagem RM", "#"),
            ("Protocolo de Contraste Iodado", "#"),
            ("POP — Proteção Radiológica", "#"),
            ("Indicadores Radiologia — Julho 2025", "#"),
        ],
    },
    {
        "slug": "nutricao",
        "nome": "Nutrição",
        "emoji": "🥗",
        "cor": "orange",
        "descricao": "Terapia nutricional, dietas, NDT e suporte nutricional enteral e parenteral.",
        "app": None,
        "links": [
            ("🥗", "Cardápio Semanal", "#"),
            ("🍼", "Protocolo de TNE — Adulto", "#"),
            ("💉", "Protocolo de Nutrição Parenteral", "#"),
            ("📋", "Tabela de Dietas Hospitalares", "#"),
            ("📊", "Triagem Nutricional — NRS 2002", "#"),
        ],
        "avisos": [
            ("07", "AGO", "aviso", "Mudança no cardápio — alergênicos identificados", "A partir de 11/08, todos os alergênicos estarão sinalizados no cardápio. Alergia do paciente deve ser registrada no prontuário."),
            ("04", "AGO", "info", "Treinamento: Suporte Nutricional no Paciente Crítico", "20/08 às 08h — auditório 1. Para toda equipe de nutricionistas e residentes."),
            ("01", "AGO", "urgente", "Falta de módulo proteico — solicitação em andamento", "Aguardando reposição. Utilize alternativas disponíveis no protocolo de substituição."),
        ],
        "faqs": [
            ("Como solicitar avaliação nutricional para um paciente?", "Via sistema (aba Interconsultas → Nutrição) ou ramal 2900. Informar diagnóstico e condição clínica atual."),
            ("Qual o prazo para inicio de TNE após indicação?", "O objetivo é iniciar TNE em até 24-48h após admissão na UTI, conforme protocolo interno."),
            ("Como modificar a dieta de um paciente?", "Prescrição médica no sistema → nutricionista avalia e adapta → produção de refeições é notificada automaticamente."),
        ],
        "ramais": [
            ("🥗", "Nutrição Clínica", "2900"),
            ("🍽️", "Produção de Refeições", "2901"),
            ("🏥", "NDT / Terapia Nutricional", "2902"),
        ],
        "documentos": [
            ("Protocolo de TNE — Adulto", "#"),
            ("Protocolo de Nutrição Parenteral", "#"),
            ("Triagem NRS 2002", "#"),
            ("Tabela de Dietas e Indicações", "#"),
        ],
    },
    {
        "slug": "fisioterapia",
        "nome": "Fisioterapia",
        "emoji": "🦾",
        "cor": "green",
        "descricao": "Reabilitação motora e respiratória, protocolos de mobilização e recursos da fisioterapia.",
        "app": None,
        "links": [
            ("🦾", "Protocolo de Mobilização Precoce", "#"),
            ("💨", "Protocolo de Fisioterapia Respiratória", "#"),
            ("📅", "Escala de Fisioterapeutas", "#"),
            ("📊", "Indicadores Fisioterapia — Julho", "#"),
            ("📋", "Formulário de Avaliação Motora", "#"),
        ],
        "avisos": [
            ("06", "AGO", "aviso", "Novo protocolo de desmame ventilatório — em vigor", "O protocolo de desmame foi revisado e aprovado. Leitura obrigatória para toda equipe de fisioterapia."),
            ("03", "AGO", "info", "Fisioterapia em sábados — escala ajustada", "A partir de 10/08, haverá cobertura de 06h às 18h aos sábados para UTI e PS."),
            ("30", "JUL", "tutorial", "Curso: Ventilação Mecânica para Fisioterapeutas", "Inscrições abertas para o curso interno — 22/08. Vagas limitadas."),
        ],
        "faqs": [
            ("Como solicitar avaliação fisioterápica?", "Via sistema (Interconsultas → Fisioterapia) ou ramal 3000. Urgências na UTI e PS têm prioridade de atendimento."),
            ("Qual a frequência de atendimento na UTI?", "2x/dia para pacientes em VM. 1x/dia para demais. Fins de semana: 1x/dia conforme escala."),
            ("Como solicitar equipamento respiratório?", "Via ramal 3001 ou sistema de requisição de materiais. Equipamentos disponíveis: CPAP, BiPAP, nebulizadores."),
        ],
        "ramais": [
            ("🦾", "Fisioterapia Clínica", "3000"),
            ("💨", "Fisioterapia Respiratória", "3001"),
            ("🏃", "Reabilitação", "3002"),
        ],
        "documentos": [
            ("Protocolo de Mobilização Precoce", "#"),
            ("POP — Fisioterapia Respiratória", "#"),
            ("Protocolo de Desmame Ventilatório", "#"),
            ("Escala de Berg", "#"),
        ],
    },
    {
        "slug": "servico-social",
        "nome": "Serviço Social",
        "emoji": "🤝",
        "cor": "purple",
        "descricao": "Regulação de vagas, alta social, benefícios sociais e suporte às famílias dos pacientes.",
        "app": None,
        "links": [
            ("🤝", "Formulário de Regulação de Vagas", "#"),
            ("📋", "Recursos Sociais Disponíveis", "#"),
            ("🏠", "Albergue e Transporte — Guia", "#"),
            ("📞", "Contatos de Serviços Externos", "#"),
        ],
        "avisos": [
            ("07", "AGO", "aviso", "Fila de regulação UTI — atualização de critérios", "Os critérios de regulação de vagas de UTI foram atualizados conforme resolução estadual. Veja nos documentos."),
            ("04", "AGO", "info", "Parceria com albergue municipal — vagas disponíveis", "5 vagas disponíveis para familiares de pacientes de longa permanência. Acione o Serviço Social."),
            ("01", "AGO", "tutorial", "Capacitação: Violência Doméstica e Fluxo de Notificação", "13/08 às 14h — obrigatório para equipe de assistência social e psicologia."),
        ],
        "faqs": [
            ("Como solicitar vaga de UTI para paciente de outro serviço?", "Via CROSS (Central de Regulação) ou Serviço Social ramal 2500. Preencher formulário com dados clínicos e SADT."),
            ("Como acionar o Serviço Social para questão de violência?", "Ramal 2500 ou diretamente. Em casos urgentes (criança, idoso), acionar também o Conselho Tutelar ou IML via Serviço Social."),
            ("O que é a alta social e quando acionar?", "Alta social é quando o paciente tem alta médica mas não tem condições sociais de ir para casa. Acionar Serviço Social assim que identificado para planejamento de alta."),
        ],
        "ramais": [
            ("🤝", "Serviço Social", "2500"),
            ("🧠", "Psicologia", "2510"),
            ("📋", "Regulação de Vagas", "2501"),
        ],
        "documentos": [
            ("Fluxo de Regulação de Vagas", "#"),
            ("Guia de Benefícios Sociais", "#"),
            ("POP — Alta Social", "#"),
            ("Ficha de Notificação de Violência", "#"),
        ],
    },
    {
        "slug": "qualidade",
        "nome": "Qualidade",
        "emoji": "⭐",
        "cor": "yellow",
        "descricao": "Indicadores hospitalares, acreditação, gestão de riscos e programas de melhoria contínua.",
        "app": None,
        "links": [
            ("📊", "Dashboard de Indicadores", "#"),
            ("⭐", "Acreditação — Documentos ONA", "#"),
            ("🚨", "Notificação de Incidentes", "#"),
            ("📋", "Manual de Gestão de Riscos", "#"),
            ("📄", "Relatório de Qualidade — Julho 2025", "#"),
        ],
        "avisos": [
            ("08", "AGO", "urgente", "Auditoria interna — 20 a 22/08", "A auditoria interna de acreditação ocorrerá de 20 a 22/08. Todos os setores devem garantir documentação atualizada."),
            ("05", "AGO", "aviso", "Novos indicadores de metas internacionais de segurança", "Os indicadores foram atualizados para o ciclo 2025/2026. Acesse o dashboard para verificar metas de seu setor."),
            ("01", "AGO", "info", "Resultados da pesquisa de satisfação — Julho 2025", "Índice de satisfação geral: 88,4%. Resultados completos disponíveis no link abaixo."),
        ],
        "faqs": [
            ("Como notificar um incidente ou evento adverso?", "Acesse o sistema → aba 'Qualidade' → 'Notificação de Incidente'. O preenchimento é anônimo opcional. Toda notificação é analisada pela equipe de qualidade."),
            ("O que é o índice IPASS e como calculo?", "IPASS = Indicador de Paciente Alto Risco de Segurança. Calculado automaticamente pelo sistema com base nos dados clínicos. Veja o manual nos documentos."),
            ("Quais são as metas internacionais de segurança do paciente?", "São 6 metas: identificação correta, comunicação efetiva, medicação segura, cirurgia segura, prevenção de infecção e prevenção de quedas/LPP. Ver manual completo nos links."),
        ],
        "ramais": [
            ("⭐", "Qualidade / Acreditação", "3100"),
            ("🚨", "Gestão de Riscos", "3101"),
            ("📊", "Indicadores", "3102"),
        ],
        "documentos": [
            ("Manual de Gestão de Riscos", "#"),
            ("Procedimento de Notificação de Incidentes", "#"),
            ("Indicadores — Metas Internacionais", "#"),
            ("Relatório de Qualidade — Julho 2025", "#"),
            ("Check-list de Auditoria Interna", "#"),
        ],
    },
    {
        "slug": "ti",
        "nome": "TI",
        "emoji": "💻",
        "cor": "blue",
        "descricao": "Suporte técnico, sistemas hospitalares, infraestrutura e ferramentas digitais.",
        "app": None,
        "links": [
            ("💻", "Abertura de Chamado (Service Desk)", "#"),
            ("📡", "Status dos Sistemas", "#"),
            ("🔐", "Redefinição de Senha", "#"),
            ("📋", "Catálogo de Sistemas Hospitalares", "#"),
            ("🌐", "VPN — Acesso Remoto", "#"),
        ],
        "avisos": [
            ("08", "AGO", "urgente", "Manutenção no servidor de arquivos — 09/08 das 01h às 03h", "O servidor de arquivos ficará indisponível das 01h às 03h de 09/08 para manutenção."),
            ("05", "AGO", "aviso", "Atualização de senha obrigatória — prazo 15/08", "Por política de segurança, todos os usuários devem atualizar suas senhas até 15/08."),
            ("02", "AGO", "info", "Novo app de Gerenciamento de Leitos — versão 2.1 disponível", "A versão 2.1 inclui filtros avançados, histórico de pacientes e relatórios de censo."),
        ],
        "faqs": [
            ("Como abrir um chamado de suporte?", "Acesse o Service Desk pelo link nos links rápidos, ou ligue para o ramal 2100. Para emergências de sistema (fora do ar), ligue diretamente para o ramal 2101."),
            ("Esqueci minha senha — o que fazer?", "Acesse o portal de redefinição de senha (link nos links rápidos) ou contate a TI pessoalmente com seu crachá."),
            ("Como solicitar novo equipamento ou software?", "Abra um chamado no Service Desk com justificativa e aprovação da chefia imediata. Prazo de análise: 5 dias úteis."),
        ],
        "ramais": [
            ("💻", "TI — Suporte Geral", "2100"),
            ("🚨", "TI — Emergências de Sistema", "2101"),
            ("📡", "Telecomunicações", "2102"),
        ],
        "documentos": [
            ("Catálogo de Sistemas Hospitalares", "#"),
            ("Manual do Usuário — Sistema Leitos", "#"),
            ("Política de Segurança da Informação", "#"),
            ("Guia de Uso Responsável da TI", "#"),
        ],
    },
    {
        "slug": "administracao",
        "nome": "Administração",
        "emoji": "🏛️",
        "cor": "yellow",
        "descricao": "Gestão hospitalar, recursos humanos, operações administrativas e comunicações institucionais.",
        "app": None,
        "links": [
            ("📋", "Formulários de RH", "#"),
            ("📅", "Calendário Institucional 2025", "#"),
            ("💼", "Portal do Colaborador — Hapvida", "#"),
            ("📊", "Relatório de Gestão — Julho 2025", "#"),
            ("📄", "Comunicados Institucionais", "#"),
        ],
        "avisos": [
            ("08", "AGO", "aviso", "Férias — prazo para solicitação agosto/setembro", "Solicitações de férias para agosto e setembro devem ser encaminhadas até 15/08 via portal do colaborador."),
            ("05", "AGO", "info", "Reunião de liderança — 19/08 às 08h30", "Pauta: indicadores de qualidade, planejamento de agosto e programa de melhoria contínua. Presença obrigatória para coordenadores."),
            ("01", "AGO", "urgente", "Conformidade LGPD — treinamento obrigatório até 30/08", "Todos os colaboradores devem concluir o treinamento de LGPD disponível no portal do colaborador."),
        ],
        "faqs": [
            ("Como solicitar folga ou troca de plantão?", "Acesse o portal do colaborador → aba RH → Solicitações. Trocas devem ter concordância do par e aprovação da chefia em até 48h."),
            ("Onde encontro o contracheque?", "Portal do colaborador Hapvida → Financeiro → Holerite. Disponível até o 5º dia útil do mês seguinte."),
            ("Como abrir uma ouvidoria interna?", "Via canal de ética Hapvida (link no portal do colaborador) ou caixa de sugestões nos corredores. O processo é confidencial."),
        ],
        "ramais": [
            ("🏛️", "Administração", "2000"),
            ("👥", "Recursos Humanos", "2010"),
            ("💰", "Financeiro", "2020"),
            ("📣", "Comunicação Institucional", "2030"),
        ],
        "documentos": [
            ("Regulamento Interno HPS", "#"),
            ("Política de RH — Hapvida", "#"),
            ("Calendário de Reuniões 2025", "#"),
            ("Relatório de Gestão — Julho 2025", "#"),
        ],
    },
    {
        "slug": "ambulatorio",
        "nome": "Ambulatório",
        "emoji": "🏃",
        "cor": "orange",
        "descricao": "Consultas ambulatoriais, agendamentos, especialidades e recursos do atendimento externo.",
        "app": None,
        "links": [
            ("📅", "Agenda de Consultas — Hoje", "#"),
            ("📋", "Formulário de Encaminhamento", "#"),
            ("🩺", "Lista de Especialidades Disponíveis", "#"),
            ("📊", "Produção Ambulatorial — Julho", "#"),
            ("🔁", "Referência e Contrarreferência", "#"),
        ],
        "avisos": [
            ("07", "AGO", "aviso", "Consultas de cardiologia — remanejamento de agenda", "As consultas de cardiologia do dia 10/08 foram remarcadas para 12/08 devido à ausência do especialista."),
            ("04", "AGO", "info", "Novo fluxo de agendamento via Hapvida Digital", "A partir de 15/08, todos os agendamentos podem ser feitos pelo app Hapvida Digital."),
            ("01", "AGO", "tutorial", "Treinamento: Sistema de Agendamento Hapvida", "12/08 às 14h — para toda equipe da recepção ambulatorial."),
        ],
        "faqs": [
            ("Como agendar consulta de retorno?", "Via sistema de agendamento (link nos links rápidos) ou ramal 3200. Informe o número do prontuário e a especialidade."),
            ("Qual o fluxo de encaminhamento entre PS e ambulatório?", "O PS emite a referência via sistema. O ambulatório agenda em até 72h conforme prioridade clínica definida no encaminhamento."),
            ("O paciente pode ser atendido sem agendamento?", "Somente em casos de urgência leve. Neste caso, o paciente é avaliado e pode ser redirecionado ao PS se necessário."),
        ],
        "ramais": [
            ("🏃", "Ambulatório — Recepção", "3200"),
            ("📅", "Central de Agendamento", "3201"),
            ("🩺", "Coordenação Médica", "3202"),
        ],
        "documentos": [
            ("Lista de Especialidades — HPS", "#"),
            ("Formulário de Encaminhamento", "#"),
            ("Protocolo de Referência e Contrarreferência", "#"),
            ("Indicadores Ambulatório — Julho 2025", "#"),
        ],
    },
]

TAG_CORES = {
    "urgente": "urgente",
    "aviso": "aviso",
    "info": "info",
    "tutorial": "tutorial",
}

MESES_PT = {
    "01": "JAN", "02": "FEV", "03": "MAR", "04": "ABR",
    "05": "MAI", "06": "JUN", "07": "JUL", "08": "AGO",
    "09": "SET", "10": "OUT", "11": "NOV", "12": "DEZ",
}

def gen_page(s):
    def link_target(url):
        return 'target="_blank"' if url != "#" else ""

    links_html = "\n".join(
        f'<li class="link-item"><a href="{url}" {link_target(url)}>'
        f'<span class="link-icon">{icon}</span> {label} <span class="link-arrow">→</span></a></li>'
        for icon, label, url in s["links"]
    )

    avisos_html = ""
    for dia, mes_num, tag, titulo, resumo in s["avisos"]:
        mes = MESES_PT.get(mes_num, mes_num)
        tag_class = TAG_CORES.get(tag, "info")
        tag_label = {"urgente": "Urgente", "aviso": "Aviso", "info": "Info", "tutorial": "Treinamento"}.get(tag, tag.capitalize())
        avisos_html += f"""
              <div class="post-item">
                <div class="post-date"><div class="dia">{dia}</div><div class="mes">{mes}</div></div>
                <div class="post-content">
                  <span class="post-tag {tag_class}">{tag_label}</span>
                  <div class="post-titulo">{titulo}</div>
                  <div class="post-resumo">{resumo}</div>
                </div>
              </div>"""

    faqs_html = ""
    for pergunta, resposta in s["faqs"]:
        faqs_html += f"""
              <div class="faq-item">
                <div class="faq-question">{pergunta}<span class="faq-chevron">▼</span></div>
                <div class="faq-answer">{resposta}</div>
              </div>"""

    ramais_html = "\n".join(
        f'<li class="link-item"><a href="tel:{ramal}"><span class="link-icon">{icon}</span> {nome} — {ramal} <span class="link-arrow">→</span></a></li>'
        for icon, nome, ramal in s["ramais"]
    )

    docs_html = "\n".join(
        f'<li class="link-item"><a href="{url}"><span class="link-icon">📄</span> {nome} <span class="link-arrow">→</span></a></li>'
        for nome, url in s["documentos"]
    )

    app_block = ""
    if s.get("app"):
        app_url, app_label = s["app"]
        app_block = f"""
    <div class="app-destaque">
      <div class="app-destaque-icon">🚀</div>
      <div class="app-destaque-info">
        <h3>{app_label}</h3>
        <p>Clique para acessar o sistema integrado deste setor.</p>
        <a href="{app_url}" target="_blank" class="btn-app">Abrir Sistema</a>
      </div>
    </div>"""

    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{s["nome"]} — Portal HPS | Hapvida</title>
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>

  <header class="site-header">
    <div class="header-inner">
      <a href="../index.html" class="header-logo">
        <img src="../assets/img/hapvida-logo.svg" alt="Hapvida" class="logo-img">
        <div class="logo-divider"></div>
        <div class="logo-hospital">
          <span class="nome">Hospital Paulo Sacramento</span>
          <span class="sub">Fortaleza · CE</span>
        </div>
      </a>
      <nav class="header-nav">
        <a href="../index.html">← Setores</a>
        <a href="../index.html#avisos">Avisos</a>
      </nav>
    </div>
  </header>

  <div class="breadcrumb-bar">
    <nav class="breadcrumb">
      <a href="../index.html">Início</a>
      <span class="sep">›</span>
      <span>{s["nome"]}</span>
    </nav>
  </div>

  <section class="hero" style="padding: 36px 24px;">
    <div class="hero-inner" style="display:flex; align-items:center; gap:20px;">
      <div style="font-size:52px; flex-shrink:0;">{s["emoji"]}</div>
      <div>
        <h1 style="font-size: clamp(20px,3vw,30px);">{s["nome"]}</h1>
        <p style="margin:0;">{s["descricao"]}</p>
      </div>
    </div>
  </section>

  <main class="main-container">
    {app_block}

    <div class="sector-layout">
      <div class="sector-main">

        <section>
          <div class="section-header">
            <div class="section-title">
              <div class="icon red">📢</div>
              Avisos &amp; Comunicados
            </div>
            <button class="btn-primary" onclick="alert('Funcionalidade de novo aviso — conecte ao GitHub Issues ou CMS para habilitar.')">
              + Novo Aviso
            </button>
          </div>
          <div class="card">
            <div class="card-body" style="padding: 8px 16px;">
              {avisos_html}
            </div>
          </div>
        </section>

        <section>
          <div class="section-header">
            <div class="section-title">
              <div class="icon green">📖</div>
              Perguntas Frequentes (FAQ)
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              {faqs_html}
            </div>
          </div>
        </section>

      </div>

      <div class="sector-side">

        <div class="card">
          <div class="card-header">
            <div class="section-title" style="font-size:15px;">
              <div class="icon" style="width:28px;height:28px;font-size:14px;">🔗</div>
              Links Rápidos
            </div>
          </div>
          <div class="card-body" style="padding:12px;">
            <ul class="link-list">
              {links_html}
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="section-title" style="font-size:15px;">
              <div class="icon orange" style="width:28px;height:28px;font-size:14px;">📞</div>
              Ramais
            </div>
          </div>
          <div class="card-body" style="padding:8px 16px;">
            <ul class="link-list">
              {ramais_html}
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="section-title" style="font-size:15px;">
              <div class="icon purple" style="width:28px;height:28px;font-size:14px;">📄</div>
              Documentos
            </div>
          </div>
          <div class="card-body" style="padding:8px 16px;">
            <ul class="link-list">
              {docs_html}
            </ul>
          </div>
        </div>

      </div>
    </div>
  </main>

  <footer class="site-footer">
    <strong>{s["nome"]} · Hospital Paulo Sacramento</strong> · Hapvida NotreDame Intermédica ·
    Portal interno — uso exclusivo da equipe · <span id="footer-datetime"></span>
  </footer>

  <script src="../assets/js/main.js"></script>
</body>
</html>
"""

os.makedirs("setores", exist_ok=True)
for s in SETORES:
    path = os.path.join("setores", f'{s["slug"]}.html')
    with open(path, "w", encoding="utf-8") as f:
        f.write(gen_page(s))
    print(f"✅ {path}")

print(f"\n{len(SETORES)} páginas geradas com sucesso.")
