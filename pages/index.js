import { useState } from 'react';

export default function Home() {
  // Controle de Fluxo Geral (Mapeado exatamente conforme o Onboarding do vídeo)
  const [stage, setStage] = useState('introducao'); // introducao -> categorias -> criando-app -> workspace
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [chosenRole, setChosenRole] = useState(null);
  
  // Estados de Input
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  const [negocioNome, setNegocioNome] = useState('');
  const [negocioOferece, setNegocioOferece] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  
  // Estados do Chat da IA interna e Canva
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([
    { sender: 'system', text: 'Hapres AI online. Pronto para expandir seu app de inglês e material digital.' }
  ]);
  const [canvaItems, setCanvaItems] = useState([
    { id: 1, title: 'Gateway Pix Integrado' },
    { id: 2, title: 'Modulo de Agendamento Online' }
  ]);

  // Avançar onboarding com validação administrativa
  const handleFinalizarCadastro = (e) => {
    e.preventDefault();
    const mailFormatado = nome.toLowerCase().trim();
    const foneLimpo = whatsapp.replace(/\D/g, '');

    if (mailFormatado.includes('henry') || foneLimpo === '11992819767') {
      setIsAdminMode(true);
      setStage('diretoria');
    } else {
      setStage('categorias');
    }
  };

  const iniciarGeracaoApp = (cat) => {
    setSelectedCategoria(cat);
    setStage('criando-app');
    // Simulação exata da barra de progresso de 100% do vídeo
    setTimeout(() => {
      setStage('workspace');
    }, 4000);
  };

  return (
    <div style={styles.viewport}>
      
      {/* 1. FLUXO DE INTRODUÇÃO E CADASTRO LUXUOSO */}
      {stage === 'introducao' && (
        <div style={styles.authCard}>
          {onboardingStep === 1 && (
            <div style={styles.slideFlex}>
              <span style={styles.badgeTop}>INTELIGÊNCIA ARTIFICIAL</span>
              <h1 style={styles.onboardingTitle}>Seu app criado pela IA em minutos.</h1>
              <p style={styles.onboardingDesc}>Descreva o seu negócio e nossa IA constrói um app completo, personalizado e pronto para usar — sem código, sem complicação.</p>
              <div style={styles.dotContainer}><div style={styles.dotActive}></div><div style={styles.dot}></div><div style={styles.dot}></div></div>
              <button onClick={() => setOnboardingStep(2)} style={styles.cleanButton}>Continuar</button>
            </div>
          )}
          
          {onboardingStep === 2 && (
            <div style={styles.slideFlex}>
              <span style={styles.badgeTop}>GESTÃO COMPLETA</span>
              <h1 style={styles.onboardingTitle}>Agenda e pagamentos em um só lugar.</h1>
              <p style={styles.onboardingDesc}>Gerencie horários, confirme reservas e receba pagamentos direto pelo app. Tudo organizado, tudo automatizado.</p>
              <div style={styles.previewBox}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><span style={{fontSize:'0.75rem', color:'#a1a1aa'}}>Agenda da Semana</span><span style={{fontSize:'0.65rem', color:'#30d158'}}>● 6 agendamentos</span></div>
                <div style={{fontSize:'1.1rem', fontWeight:'700', color:'#fff'}}>R$ 1.240 <span style={{fontSize:'0.8rem', color:'#71717a'}}>em pagamentos</span></div>
              </div>
              <div style={styles.dotContainer}><div style={styles.dot}></div><div style={styles.dotActive}></div><div style={styles.dot}></div></div>
              <button onClick={() => setOnboardingStep(3)} style={styles.cleanButton}>Continuar</button>
            </div>
          )}

          {onboardingStep === 3 && (
            <form onSubmit={handleFinalizarCadastro} style={styles.slideFlex}>
              <span style={styles.badgeTop}>PASSO 1 DE 3</span>
              <h1 style={styles.onboardingTitle}>Crie sua conta</h1>
              <p style={styles.onboardingDesc}>Vamos começar com suas informações básicas.</p>
              <div style={styles.fieldWrapper}>
                <input type="text" placeholder="Nome completo" required value={nome} onChange={(e) => setNome(e.target.value)} style={styles.cleanInput} />
                <input type="tel" placeholder="WhatsApp" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={styles.cleanInput} />
                <input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} style={styles.cleanInput} />
              </div>
              <button type="submit" style={styles.cleanButton}>Continuar</button>
            </form>
          )}
        </div>
      )}

      {/* FILTRO DA DIRETORIA */}
      {stage === 'diretoria' && (
        <div style={styles.authCard}>
          <h1 style={styles.onboardingTitle}>Filtro de Diretoria</h1>
          <p style={styles.onboardingDesc}>Nível mestre detectado. Selecione o ambiente:</p>
          <div style={styles.fieldWrapper}>
            <button onClick={() => { setChosenRole('admin'); setStage('categorias'); }} style={styles.cleanButton}>🛡 Modo Administrador</button>
            <button onClick={() => { setChosenRole('user'); setStage('categorias'); }} style={{ ...styles.cleanButton, background: '#18181b', border: '1px solid #27272a', color: '#fff' }}>👤 Modo Usuário Comum</button>
          </div>
        </div>
      )}

      {/* 2. PASSO 2 DE 3: SELEÇÃO DE CATEGORIAS */}
      {stage === 'categorias' && (
        <div style={styles.authCard}>
          <span style={styles.badgeTop}>PASSO 2 DE 3</span>
          <h1 style={styles.onboardingTitle}>Qual é o seu negócio?</h1>
          <p style={styles.onboardingDesc}>Olá! Escolha a categoria que melhor descreve seu empreendimento.</p>
          <div style={styles.gridCategorias}>
            <div onClick={() => iniciarGeracaoApp('Barbearia')} style={styles.catCard}>💈 Barbearia</div>
            <div onClick={() => iniciarGeracaoApp('Manicure')} style={styles.catCard}>💅 Manicure</div>
            <div onClick={() => iniciarGeracaoApp('Estética')} style={styles.catCard}>🧴 Estética</div>
            <div onClick={() => iniciarGeracaoApp('Outros')} style={styles.catCard}>💼 Outros / Cursos</div>
          </div>
        </div>
      )}

      {/* 3. TELA DE CARREGAMENTO / GERAÇÃO DO APP */}
      {stage === 'criando-app' && (
        <div style={{ ...styles.authCard, textAlign: 'center', alignItems: 'center' }}>
          <div style={styles.spinnerCore}></div>
          <h1 style={styles.onboardingTitle}>Gerando seu app</h1>
          <p style={styles.onboardingDesc}>Configurando arquitetura de luxo, banco de dados e UI limpa...</p>
          <div style={styles.progressContainer}>
            <div style={styles.progressBarFill}></div>
          </div>
        </div>
      )}

      {/* 4. ECOSSISTEMA COMPLETO WORKSPACE (TOTALMENTE RESPONSIVO) */}
      {stage === 'workspace' && (
        <div style={styles.appContainer}>
          
          {/* Menu Superior Mobile e Lateral Desktop Unificados */}
          <aside style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <span style={styles.sidebarLogo}>HAPRES SOVEREIGN</span>
            </div>
            <nav style={styles.sidebarNav}>
              <button onClick={() => setActiveTab('dashboard')} style={sidebarTabStyle(activeTab === 'dashboard')}>📊 Dashboard</button>
              <button onClick={() => setActiveTab('canva')} style={sidebarTabStyle(activeTab === 'canva')}>🎨 Construtor Canva</button>
              <button onClick={() => setActiveTab('ia')} style={sidebarTabStyle(activeTab === 'ia')}>🤖 Co-Pilot IA</button>
            </nav>
            <div style={styles.sidebarFooter}>
              <p style={styles.userName}>{nome || 'Henry Serpa'}</p>
              <p style={styles.userRole}>{chosenRole === 'admin' ? 'Root Admin' : 'Premium Operational'}</p>
            </div>
          </aside>

          {/* Painel Central */}
          <main style={styles.mainContent}>
            {activeTab === 'dashboard' && (
              <div style={styles.tabFlex}>
                <div>
                  <h2 style={styles.sectionTitle}>Dashboard Global</h2>
                  <p style={styles.sectionDesc}>Mapeamento financeiro limpo e funções ativas do sistema.</p>
                </div>
                <div style={styles.statsGrid}>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Faturamento</span>
                    <h3 style={styles.statValue}>R$ 97,00</h3>
                    <span style={styles.statIndicatorActive}>✓ Assinatura em Dia</span>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Segmento do App</span>
                    <h3 style={styles.statValue}>{selectedCategoria || 'Outros'}</h3>
                    <span style={styles.statIndicator}>Ajustado via IA</span>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Funções Acopladas</span>
                    <h3 style={styles.statValue}>{canvaItems.length} Módulos</h3>
                    <span style={styles.statIndicatorActive}>Infraestrutura Estável</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'canva' && (
              <div style={styles.tabFlex}>
                <div>
                  <h2 style={styles.sectionTitle}>Super Canva Construtor</h2>
                  <p style={styles.sectionDesc}>Adicione ou limpe blocos funcionais do app final.</p>
                </div>
                <div style={{display:'flex', gap:'8px'}}>
                  <button onClick={() => setCanvaItems([...canvaItems, { id: Date.now(), title: 'Módulo Material Online (PDFs)' }])} style={styles.actionPill}>+ Material Online</button>
                  <button onClick={() => setCanvaItems([])} style={styles.actionPillClear}>Limpar Tudo</button>
                </div>
                <div style={styles.canvaBox}>
                  {canvaItems.map(item => (
                    <div key={item.id} style={styles.elementCard}>
                      <span style={styles.elementName}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ia' && (
              <div style={styles.tabFlex}>
                <div>
                  <h2 style={styles.sectionTitle}>Co-Pilot AI</h2>
                  <p style={styles.sectionDesc}>Ajuste as definições e parâmetros do seu app diretamente.</p>
                </div>
                <div style={styles.chatWrapper}>
                  <div style={styles.chatArea}>
                    {aiChat.map((m, i) => (
                      <div key={i} style={m.sender === 'user' ? styles.bubbleRight : styles.bubbleLeft}>{m.text}</div>
                    ))}
                  </div>
                  <div style={{display:'flex', gap:'8px'}}>
                    <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Digite um comando..." style={styles.cleanInput} />
                    <button onClick={() => {
                      if(!aiInput.trim()) return;
                      setAiChat([...aiChat, { sender: 'user', text: aiInput }]);
                      setAiInput('');
                    }} style={styles.chatButton}>Enviar</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

// ESTILOS DE ENGENHARIA VISUAL MOBILE-FIRST LUXO (Cinzas e Carbono, Altamente Limpo)
const styles = {
  viewport: {
    margin: 0, padding: 0, boxSizing: 'border-box',
    backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'flex', justifyContent: 'center', alignItems: 'stretch'
  },
  authCard: {
    width: '100%', maxWidth: '420px', padding: '32px 24px',
    display: 'flex', flexDirection: 'column', gap: '24px', alignSelf: 'center', boxSizing: 'border-box'
  },
  slideFlex: { display: 'flex', flexDirection: 'column', gap: '20px' },
  badgeTop: { fontSize: '0.7rem', fontWeight: '700', color: '#a1a1aa', letterSpacing: '0.1em' },
  onboardingTitle: { fontSize: '1.9rem', fontWeight: '700', margin: 0, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: '1.15' },
  onboardingDesc: { fontSize: '0.9rem', color: '#a1a1aa', margin: 0, lineHeight: '1.5' },
  dotContainer: { display: 'flex', gap: '8px', margin: '8px 0' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#27272a' },
  dotActive: { width: '18px', height: '6px', borderRadius: '3px', backgroundColor: '#ffffff' },
  previewBox: { background: '#18181b', border: '1px solid #27272a', padding: '16px', borderRadius: '12px' },
  fieldWrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  cleanInput: {
    width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a',
    borderRadius: '10px', padding: '14px 16px', color: '#ffffff', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box'
  },
  cleanButton: {
    width: '100%', background: '#ffffff', color: '#09090b', border: 'none',
    borderRadius: '10px', padding: '16px', fontSize: '0.95rem', fontWeight: '600',
    cursor: 'pointer', transition: 'opacity 0.2s'
  },
  gridCategorias: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' },
  catCard: {
    background: '#18181b', border: '1px solid #27272a', borderRadius: '12px',
    padding: '24px 16px', textAlign: 'center', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer'
  },
  spinnerCore: { width: '40px', height: '40px', border: '3px solid #27272a', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '12px' },
  progressContainer: { width: '100%', height: '4px', background: '#18181b', borderRadius: '2px', overflow: 'hidden', marginTop: '10px' },
  progressBarFill: { width: '100%', height: '100%', background: '#fff', animation: 'load 4s linear' },
  
  // ARQUITETURA DE LAYOUT TOTALMENTE RESPONSIVA PARA DISPOSITIVOS MÓVEIS
  appContainer: {
    width: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: '#09090b', minHeight: '100vh',
    // No Desktop vira row nativamente via CSS implícito/flex
    '@media (minWidth: 768px)': { flexDirection: 'row' }
  },
  sidebar: {
    width: '100%', backgroundColor: '#18181b', borderBottom: '1px solid #27272a',
    padding: '16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  sidebarHeader: { display: 'flex', alignItems: 'center' },
  sidebarLogo: { fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em', color: '#fff' },
  sidebarNav: { display: 'flex', flexDirection: 'row', gap: '8px' },
  sidebarFooter: { display: 'none' }, // Oculto no mobile para poupar espaço precioso
  mainContent: { flex: 1, padding: '24px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '24px' },
  tabFlex: { display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' },
  sectionTitle: { fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#fff' },
  sectionDesc: { fontSize: '0.85rem', color: '#71717a', margin: 0 },
  statsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  statCard: { background: '#18181b', border: '1px solid #27272a', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '0.65rem', fontWeight: '700', color: '#71717a', letterSpacing: '0.05em' },
  statValue: { fontSize: '1.3rem', fontWeight: '700', margin: 0, color: '#fff' },
  statIndicator: { fontSize: '0.75rem', color: '#71717a' },
  statIndicatorActive: { fontSize: '0.75rem', color: '#a1a1aa' },
  canvaBox: { background: '#09090b', border: '1px dashed #27272a', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' },
  elementCard: { background: '#18181b', border: '1px solid #27272a', padding: '14px 16px', borderRadius: '8px' },
  elementName: { fontSize: '0.85rem', fontWeight: '500', color: '#fff' },
  actionPill: { background: '#fff', color: '#09090b', border: 'none', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' },
  actionPillClear: { background: 'transparent', border: '1px solid #27272a', color: '#71717a', padding: '10px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer' },
  chatWrapper: { background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
  chatArea: { minHeight: '180px', display: 'flex', flexDirection: 'column', gap: '10px' },
  bubbleLeft: { alignSelf: 'flex-start', background: '#27272a', padding: '10px 14px', borderRadius: '12px 12px 12px 4px', fontSize: '0.85rem', color: '#e4e4e7', maxWidth: '85%' },
  bubbleRight: { alignSelf: 'flex-end', background: '#fff', padding: '10px 14px', borderRadius: '12px 12px 4px 12px', fontSize: '0.85rem', color: '#09090b', maxWidth: '85%', fontWeight: '500' },
  chatButton: { background: '#fff', color: '#09090b', border: 'none', borderRadius: '10px', padding: '0 16px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }
};

const sidebarTabStyle = (active) => ({
  padding: '8px 12px', textAlign: 'center',
  background: active ? '#27272a' : 'transparent',
  color: active ? '#ffffff' : '#a1a1aa',
  border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: active ? '600' : '500',
  cursor: 'pointer'
});
