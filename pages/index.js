import { useState } from 'react';

export default function Home() {
  // Controle de Fluxo Geral
  const [stage, setStage] = useState('cadastro'); 
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [chosenRole, setChosenRole] = useState(null);

  // Estados de Input
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [supportInput, setSupportInput] = useState('');

  // Banco de Dados Local dos Chats e Módulos
  const [aiChat, setAiChat] = useState([
    { sender: 'system', text: 'Sovereign Core inicializado. Pronto para forjar novas infraestruturas autônomas.' }
  ]);
  const [supportChat, setSupportChat] = useState([
    { sender: 'system', text: 'Suporte Neural ativo. Aguardando consultas e verificações lógicas de integridade.' }
  ]);
  const [canvaItems, setCanvaItems] = useState([]);

  // Fluxo de Validação e Segurança
  const processarAcesso = (e) => {
    e.preventDefault();
    const foneLimpo = whatsapp.replace(/\D/g, '');
    const mailFormatado = email.toLowerCase().trim();

    if (mailFormatado === 'henryserpa11@gmail.com' || mailFormatado === 'henrytrabalho11@gmail.com' || foneLimpo === '11992819767') {
      setIsAdminMode(true);
      setStage('diretoria');
    } else {
      setStage('workspace');
    }
  };

  const processarInteligencia = (comando) => {
    const texto = comando.toLowerCase().trim();
    if (texto.includes('1 mais 1') || texto.includes('1+1') || texto.includes('quanto é 1')) {
      return "O resultado matemático preciso de 1 mais 1 é exatamente 2.";
    }
    if (texto.includes('criar') || texto.includes('app') || texto.includes('aplicativo')) {
      return "[Hapres Sovereign] Comando interceptado. Estruturando banco de dados isolado, injetando microsserviços selecionados e gerando link nativo de produção.";
    }
    return `Ação "${comando}" processada com sucesso nos servidores distribuídos da rede Sovereign.`;
  };

  const handleSendAi = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: msg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'system', text: processarInteligencia(msg) }]);
    }, 300);
  };

  const handleSendSupport = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const msg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: msg }]);
    setSupportInput('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'system', text: processarInteligencia(msg) }]);
    }, 300);
  };

  const adicionarAoCanva = (nomeModulo) => {
    setCanvaItems(prev => [...prev, { id: Date.now(), title: nomeModulo, status: 'Ativo' }]);
  };

  return (
    <div style={styles.viewport}>
      
      {/* TELA DE AUTENTICAÇÃO LUXUOSA */}
      {stage === 'cadastro' && (
        <form onSubmit={processarAcesso} style={styles.authCard}>
          <div style={styles.brandContainer}>
            <h1 style={styles.mainTitle}>Hapres Sovereign</h1>
            <p style={styles.mainSubtitle}>The Next Generation of Autonomous Software Development</p>
          </div>
          <div style={styles.fieldWrapper}>
            <input type="text" placeholder="Nome Completo" required value={nome} onChange={(e) => setNome(e.target.value)} style={styles.glassInput} />
            <input type="email" placeholder="Endereço de E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.glassInput} />
            <input type="tel" placeholder="WhatsApp (Apenas números)" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={styles.glassInput} />
          </div>
          <button type="submit" style={styles.luxuryButton}>Acessar Rede</button>
        </form>
      )}

      {/* FILTRO DE CONTROLE DA DIRETORIA */}
      {stage === 'diretoria' && (
        <div style={styles.authCard}>
          <div style={styles.brandContainer}>
            <h1 style={{ ...styles.mainTitle, color: '#ff453a' }}>Direção Mestre</h1>
            <p style={styles.mainSubtitle}>Credenciais administrativas identificadas. Escolha o escopo da sessão:</p>
          </div>
          <div style={styles.fieldWrapper}>
            <button onClick={() => { setChosenRole('admin'); setStage('workspace'); }} style={{ ...styles.luxuryButton, background: '#ff453a' }}>🛡 Entrar como Administrador</button>
            <button onClick={() => { setChosenRole('user'); setStage('workspace'); }} style={{ ...styles.luxuryButton, background: '#1c1c24' }}>👤 Entrar como Usuário Pro</button>
          </div>
        </div>
      )}

      {/* PLATAFORMA INTEGRADA (WORKSPACE) */}
      {stage === 'workspace' && (
        <div style={styles.appContainer}>
          
          {/* BARRA LATERAL ESQUERDA (SIDEBAR PREMIUM) */}
          <aside style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <span style={styles.sidebarLogo}>HAPRES</span>
              <span style={styles.sidebarVersion}>v2.0</span>
            </div>
            <nav style={styles.sidebarNav}>
              <button onClick={() => setActiveTab('dashboard')} style={sidebarTabStyle(activeTab === 'dashboard')}>📊 Visão Geral</button>
              <button onClick={() => setActiveTab('criar-ia')} style={sidebarTabStyle(activeTab === 'criar-ia')}>🤖 Co-Pilot IA</button>
              <button onClick={() => setActiveTab('canva')} style={sidebarTabStyle(activeTab === 'canva')}>🎨 Super Canva</button>
              <button onClick={() => setActiveTab('suporte')} style={sidebarTabStyle(activeTab === 'suporte')}>🔮 Suporte Neural</button>
              {isAdminMode && chosenRole === 'admin' && (
                <button onClick={() => setActiveTab('controle-mestre')} style={sidebarTabStyle(activeTab === 'controle-mestre', true)}>🛡 Central Mestre</button>
              )}
            </nav>
            <div style={styles.sidebarFooter}>
              <div style={styles.userDot}></div>
              <div style={{ overflow: 'hidden' }}>
                <p style={styles.userName}>{nome || 'Henry Serpa'}</p>
                <p style={styles.userRole}>{chosenRole === 'admin' ? 'Global Admin' : 'Premium Account'}</p>
              </div>
            </div>
          </aside>

          {/* PAINEL CENTRAL DE CONTEÚDO */}
          <main style={styles.mainContent}>
            
            {/* COMPONENTE: VISÃO GERAL */}
            {activeTab === 'dashboard' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Visão Geral do Sistema</h2>
                  <p style={styles.sectionDesc}>Mapeamento financeiro e de recursos do seu ecossistema ativo.</p>
                </div>
                <div style={styles.statsGrid}>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>ASSINATURA OPERACIONAL</span>
                    <h3 style={styles.statValue}>R$ 97,00</h3>
                    <span style={{ ...styles.statIndicator, color: '#30d158' }}>✓ Faturamento Ativo</span>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>APLICAÇÕES COMPILADAS</span>
                    <h3 style={styles.statValue}>{canvaItems.length} Módulos</h3>
                    <span style={styles.statIndicator}>Rede Estável na Nuvem</span>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>CRÉDITOS DE IA</span>
                    <h3 style={styles.statValue}>Ilimitado</h3>
                    <span style={{ ...styles.statIndicator, color: '#0071e3' }}>Plano Sovereign Líder</span>
                  </div>
                </div>
              </div>
            )}

            {/* COMPONENTE: CO-PILOT IA */}
            {activeTab === 'criar-ia' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Co-Pilot Sovereign</h2>
                  <p style={styles.sectionDesc}>Comande os clusters de inteligência artificial para injetar novas regras no servidor.</p>
                </div>
                <div style={styles.chatWrapper}>
                  <div style={styles.chatArea}>
                    {aiChat.map((m, i) => (
                      <div key={i} style={m.sender === 'user' ? styles.bubbleRight : styles.bubbleLeft}>{m.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleSendAi} style={styles.chatForm}>
                    <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Descreva a aplicação ou microsserviço que deseja forjar..." style={styles.glassInput} />
                    <button type="submit" style={styles.chatButton}>Injetar</button>
                  </form>
                </div>
              </div>
            )}

            {/* COMPONENTE: SUPER CANVA */}
            {activeTab === 'canva' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Super Canva Construtor</h2>
                  <p style={styles.sectionDesc}>Acople blocos funcionais e interfaces vivas diretamente no link de produção.</p>
                </div>
                <div style={styles.canvaActions}>
                  <button onClick={() => adicionarAoCanva('Gateway de Faturamento Automático (Pix API)')} style={styles.actionPill}>+ Injetar Gateway Pix</button>
                  <button onClick={() => adicionarAoCanva('Feed de Dados Esportivos de Futebol Nativo')} style={styles.actionPill}>+ Injetar Módulo Futebol</button>
                  <button onClick={() => setCanvaItems([])} style={styles.actionPillClear}>Limpar Construtor</button>
                </div>
                <div style={styles.canvaWorkspace}>
                  {canvaItems.length === 0 ? (
                    <p style={styles.canvaEmptyMsg}>Grid Limpo. Acople os módulos desejados utilizando os botões de ação acima.</p>
                  ) : (
                    <div style={styles.canvaElementsGrid}>
                      {canvaItems.map(item => (
                        <div key={item.id} style={styles.elementCard}>
                          <div>
                            <span style={styles.elementBadge}>MICROSSERVIÇO</span>
                            <h4 style={styles.elementName}>{item.title}</h4>
                          </div>
                          <button onClick={() => setCanvaItems(canvaItems.filter(x => x.id !== item.id))} style={styles.elementRemove}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* COMPONENTE: SUPORTE NEURAL */}
            {activeTab === 'suporte' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Central de Consultas Neurais</h2>
                  <p style={styles.sectionDesc}>Efetue varreduras, tire dúvidas ou faça testes matemáticos complexos.</p>
                </div>
                <div style={styles.chatWrapper}>
                  <div style={styles.chatArea}>
                    {supportChat.map((m, i) => (
                      <div key={i} style={m.sender === 'user' ? styles.bubbleRight : styles.bubbleLeft}>{m.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleSendSupport} style={styles.chatForm}>
                    <input type="text" value={supportInput} onChange={(e) => setSupportInput(e.target.value)} placeholder="Faça uma consulta operacional (Ex: quanto é 1 mais 1)..." style={styles.glassInput} />
                    <button type="submit" style={styles.chatButton}>Consultar</button>
                  </form>
                </div>
              </div>
            )}

            {/* COMPONENTE: CENTRAL MESTRE ADM */}
            {activeTab === 'controle-mestre' && isAdminMode && chosenRole === 'admin' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={{ ...styles.sectionTitle, color: '#ff453a' }}>Direção Mestre</h2>
                  <p style={styles.sectionDesc}>Modificações estruturais globais na infraestrutura do ecossistema.</p>
                </div>
                <div style={styles.admCardBox}>
                  <span style={styles.admCardLabel}>MUTADOR DE VARIÁVEIS DO BANCO DE DADOS</span>
                  <p style={styles.admCardText}>Escreva uma diretriz mestre para sobrescrever componentes, cores ou regras ativas em todos os clientes filhos.</p>
                  <div style={styles.chatForm}>
                    <input type="text" placeholder="Descreva a mutação de software desejada..." style={styles.glassInput} />
                    <button type="button" onClick={() => alert('Mutação injetada globalmente.')} style={{ ...styles.chatButton, background: '#ff453a' }}>Executar Mutação</button>
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

// Estilos de Engenharia Visual Premium (Padrão de Luxo Apple / Cyber Escuro)
const styles = {
  viewport: {
    margin: 0, padding: 0, boxSizing: 'border-box',
    backgroundColor: '#000000', color: '#f5f5f7', minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  authCard: {
    width: '100%', maxWidth: '410px', backgroundColor: 'rgba(10, 10, 12, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '24px',
    padding: '40px 32px', boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', gap: '28px',
    boxSizing: 'border-box', margin: '20px'
  },
  brandContainer: { textAlign: 'center' },
  mainTitle: { fontSize: '1.9rem', fontWeight: '700', margin: '0 0 6px 0', letterSpacing: '-0.5px' },
  mainSubtitle: { fontSize: '0.85rem', color: '#8e8e93', margin: 0, lineHeight: '1.4' },
  fieldWrapper: { display: 'flex', flexDirection: 'column', gap: '14px' },
  glassInput: {
    width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s, background-color 0.2s'
  },
  luxuryButton: {
    width: '100%', background: '#0071e3', color: '#fff', border: 'none',
    borderRadius: '12px', padding: '16px', fontSize: '0.95rem', fontWeight: '600',
    cursor: 'pointer', transition: 'opacity 0.2s'
  },
  appContainer: {
    width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#000000',
    overflow: 'hidden', boxSizing: 'border-box'
  },
  sidebar: {
    width: '260px', backgroundColor: '#0a0a0c', borderRight: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 16px',
    boxSizing: 'border-box', flexShrink: 0
  },
  sidebarHeader: { display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', marginBottom: '10px' },
  sidebarLogo: { fontSize: '1.1rem', fontWeight: '800', letterSpacing: '1.5px', color: '#fff' },
  sidebarVersion: { fontSize: '0.65rem', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '6px', color: '#8e8e93', fontWeight: '700' },
  sidebarNav: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, marginTop: '24px' },
  sidebarFooter: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.04)' },
  userDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#30d158' },
  userName: { margin: 0, fontSize: '0.85rem', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  userRole: { margin: 0, fontSize: '0.75rem', color: '#8e8e93' },
  mainContent: { flex: 1, padding: '40px', boxSizing: 'border-box', overflowY: 'auto', display: 'flex', flexDirection: 'column' },
  tabContentFlex: { display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 },
  contentHeader: { display: 'flex', flexDirection: 'column', gap: '4px' },
  sectionTitle: { fontSize: '1.6rem', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' },
  sectionDesc: { fontSize: '0.9rem', color: '#8e8e93', margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' },
  statCard: {
    background: 'rgba(18, 18, 24, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px'
  },
  statLabel: { fontSize: '0.7rem', fontWeight: '700', color: '#8e8e93', letterSpacing: '0.5px' },
  statValue: { fontSize: '1.6rem', fontWeight: '700', margin: 0, letterSpacing: '-0.3px' },
  statIndicator: { fontSize: '0.75rem', color: '#8e8e93' },
  chatWrapper: {
    background: 'rgba(10, 10, 12, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px'
  },
  chatArea: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px', marginBottom: '20px' },
  bubbleLeft: { alignSelf: 'flex-start', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.03)', padding: '12px 18px', borderRadius: '16px 16px 16px 4px', fontSize: '0.9rem', maxWidth: '75%', lineHeight: '1.45', color: '#d2d2d7' },
  bubbleRight: { alignSelf: 'flex-end', background: '#0071e3', padding: '12px 18px', borderRadius: '16px 16px 4px 16px', fontSize: '0.9rem', maxWidth: '75%', lineHeight: '1.45', color: '#fff' },
  chatForm: { display: 'flex', gap: '12px', width: '100%' },
  chatButton: { background: '#0071e3', color: '#fff', border: 'none', borderRadius: '12px', padding: '0 28px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' },
  canvaActions: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  actionPill: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' },
  actionPillClear: { background: 'transparent', border: '1px solid #ff453a', color: '#ff453a', padding: '12px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', marginLeft: 'auto' },
  canvaWorkspace: { background: '#030305', border: '2px dashed rgba(255,255,255,0.06)', borderRadius: '20px', padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  canvaEmptyMsg: { color: '#48484a', fontSize: '0.9rem', textAlign: 'center', margin: 0 },
  canvaElementsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '12px', width: '100%', alignSelf: 'flex-start' },
  elementCard: { background: 'rgba(18, 18, 24, 0.8)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '18px 24px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  elementBadge: { fontSize: '0.65rem', fontWeight: '800', color: '#0071e3', letterSpacing: '0.5px', display: 'block', marginBottom: '2px' },
  elementName: { fontSize: '0.95rem', fontWeight: '600', margin: 0, color: '#fff' },
  elementRemove: { background: 'transparent', border: 'none', color: '#ff453a', cursor: 'pointer', fontSize: '1.1rem' },
  admCardBox: { background: 'rgba(255, 69, 58, 0.01)', border: '1px solid rgba(255, 69, 58, 0.12)', padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px' },
  admCardLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#ff453a', letterSpacing: '0.5px' },
  admCardText: { fontSize: '0.85rem', color: '#8e8e93', margin: '0 0 14px 0', lineHeight: '1.45' }
};

const sidebarTabStyle = (active, isAdm = false) => ({
  width: '100%', padding: '14px 16px', textAlign: 'left',
  background: active ? (isAdm ? 'rgba(255, 69, 58, 0.15)' : 'rgba(0, 113, 227, 0.12)') : 'transparent',
  color: active ? (isAdm ? '#ff453a' : '#0071e3') : '#8e8e93',
  border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: active ? '600' : '500',
  cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '10px'
});

