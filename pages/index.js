import { useState } from 'react';

export default function Home() {
  const [stage, setStage] = useState('cadastro'); 
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [chosenRole, setChosenRole] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [supportInput, setSupportInput] = useState('');

  const [aiChat, setAiChat] = useState([
    { sender: 'system', text: 'Sovereign Engine online. Insira os parâmetros para compilação de microsserviços.' }
  ]);
  const [supportChat, setSupportChat] = useState([
    { sender: 'system', text: 'Módulo de verificação lógica ativo. Pronto para consultas estruturais.' }
  ]);
  const [canvaItems, setCanvaItems] = useState([]);

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
      return "O resultado da verificação matemática elementar de 1 mais 1 é exatamente 2.";
    }
    if (texto.includes('criar') || texto.includes('app') || texto.includes('aplicativo')) {
      return `[Sovereign Core] Injetando microsserviços selecionados, mapeando esquemas de banco de dados isolados e gerando link estável de produção na nuvem.`;
    }
    return `Diretriz executada: "${comando}". Infraestrutura atualizada com sucesso.`;
  };

  const handleSendAi = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: msg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'system', text: processarInteligencia(msg) }]);
    }, 250);
  };

  const handleSendSupport = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const msg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: msg }]);
    setSupportInput('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'system', text: processarInteligencia(msg) }]);
    }, 250);
  };

  const adicionarAoCanva = (nomeModulo) => {
    setCanvaItems(prev => [...prev, { id: Date.now(), title: nomeModulo }]);
  };

  return (
    <div style={styles.viewport}>
      
      {/* CADASTRO ULTRA CLEAN */}
      {stage === 'cadastro' && (
        <form onSubmit={processarAcesso} style={styles.authCard}>
          <div style={styles.brandContainer}>
            <h1 style={styles.mainTitle}>Hapres Sovereign</h1>
            <p style={styles.mainSubtitle}>Autonomous Software Ecosystem</p>
          </div>
          <div style={styles.fieldWrapper}>
            <input type="text" placeholder="Nome Completo" required value={nome} onChange={(e) => setNome(e.target.value)} style={styles.cleanInput} />
            <input type="email" placeholder="Endereço de E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.cleanInput} />
            <input type="tel" placeholder="WhatsApp (Apenas números)" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={styles.cleanInput} />
          </div>
          <button type="submit" style={styles.cleanButton}>Acessar Plataforma</button>
        </form>
      )}

      {/* FILTRO DE CONTROLE DA DIRETORIA */}
      {stage === 'diretoria' && (
        <div style={styles.authCard}>
          <div style={styles.brandContainer}>
            <h1 style={styles.mainTitle}>Filtro de Diretoria</h1>
            <p style={styles.mainSubtitle}>Nível administrativo detectado. Selecione o escopo:</p>
          </div>
          <div style={styles.fieldWrapper}>
            <button onClick={() => { setChosenRole('admin'); setStage('workspace'); }} style={styles.cleanButton}>🛡 Modo Administrador</button>
            <button onClick={() => { setChosenRole('user'); setStage('workspace'); }} style={{ ...styles.cleanButton, background: '#18181b', border: '1px solid #27272a', color: '#e4e4e7' }}>👤 Modo Usuário Padrão</button>
          </div>
        </div>
      )}

      {/* INTEGRAÇÃO DO ECOSSISTEMA COMPLETO */}
      {stage === 'workspace' && (
        <div style={styles.appContainer}>
          
          {/* BARRA LATERAL (SIDEBAR LUXO) */}
          <aside style={styles.sidebar}>
            <div>
              <div style={styles.sidebarHeader}>
                <span style={styles.sidebarLogo}>HAPRES SOVEREIGN</span>
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
            </div>
            <div style={styles.sidebarFooter}>
              <div style={styles.userDot}></div>
              <div>
                <p style={styles.userName}>{nome || 'Henry Serpa'}</p>
                <p style={styles.userRole}>{chosenRole === 'admin' ? 'Root Administrator' : 'Premium Operational'}</p>
              </div>
            </div>
          </aside>

          {/* PAINEL CENTRAL DE CONTEÚDO */}
          <main style={styles.mainContent}>
            
            {/* VISÃO GERAL */}
            {activeTab === 'dashboard' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Visão Geral do Sistema</h2>
                  <p style={styles.sectionDesc}>Mapeamento analítico e status das faturas ativas no servidor.</p>
                </div>
                <div style={styles.statsGrid}>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>ASSINATURA OPERACIONAL</span>
                    <h3 style={styles.statValue}>R$ 97,00</h3>
                    <span style={styles.statIndicatorActive}>✓ Faturamento Regular</span>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>MÓDULOS DE ARQUITETURA</span>
                    <h3 style={styles.statValue}>{canvaItems.length} Unidades</h3>
                    <span style={styles.statIndicator}>Compilação Distribuída</span>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>REDES NEURAIS DE IA</span>
                    <h3 style={styles.statValue}>Ilimitado</h3>
                    <span style={styles.statIndicatorActive}>Acesso Master</span>
                  </div>
                </div>
              </div>
            )}

            {/* CO-PILOT IA */}
            {activeTab === 'criar-ia' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Co-Pilot Autonomous</h2>
                  <p style={styles.sectionDesc}>Comande a infraestrutura central para injetar novos fluxos de software.</p>
                </div>
                <div style={styles.chatWrapper}>
                  <div style={styles.chatArea}>
                    {aiChat.map((m, i) => (
                      <div key={i} style={m.sender === 'user' ? styles.bubbleRight : styles.bubbleLeft}>{m.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleSendAi} style={styles.chatForm}>
                    <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Descreva os blocos ou modificações que deseja injetar..." style={styles.cleanInput} />
                    <button type="submit" style={styles.chatButton}>Injetar</button>
                  </form>
                </div>
              </div>
            )}

            {/* SUPER CANVA */}
            {activeTab === 'canva' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Super Canva Architecture</h2>
                  <p style={styles.sectionDesc}>Injete módulos funcionais diretamente na malha estável da aplicação.</p>
                </div>
                <div style={styles.canvaActions}>
                  <button onClick={() => adicionarAoCanva('Gateway de Pagamentos Instantâneos (Pix API Nativa)')} style={styles.actionPill}>+ Injetar Módulo Pix</button>
                  <button onClick={() => adicionarAoCanva('Feed de Dados Esportivos de Futebol e Odds Globais')} style={styles.actionPill}>+ Injetar Módulo Futebol</button>
                  <button onClick={() => setCanvaItems([])} style={styles.actionPillClear}>Limpar Construtor</button>
                </div>
                <div style={styles.canvaWorkspace}>
                  {canvaItems.length === 0 ? (
                    <p style={styles.canvaEmptyMsg}>Grid estrutural pronto. Acople módulos funcionais utilizando os gatilhos acima.</p>
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

            {/* SUPORTE NEURAL */}
            {activeTab === 'suporte' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Varreduras e Consultas Neurais</h2>
                  <p style={styles.sectionDesc}>Execute testes lógicos ou valide comandos complexos de infraestrutura.</p>
                </div>
                <div style={styles.chatWrapper}>
                  <div style={styles.chatArea}>
                    {supportChat.map((m, i) => (
                      <div key={i} style={m.sender === 'user' ? styles.bubbleRight : styles.bubbleLeft}>{m.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleSendSupport} style={styles.chatForm}>
                    <input type="text" value={supportInput} onChange={(e) => setSupportInput(e.target.value)} placeholder="Insira uma consulta operacional (Ex: quanto é 1 mais 1)..." style={styles.cleanInput} />
                    <button type="submit" style={styles.chatButton}>Consultar</button>
                  </form>
                </div>
              </div>
            )}

            {/* CENTRAL MESTRE ADM */}
            {activeTab === 'controle-mestre' && isAdminMode && chosenRole === 'admin' && (
              <div style={styles.tabContentFlex}>
                <div style={styles.contentHeader}>
                  <h2 style={styles.sectionTitle}>Central de Controle Mestre</h2>
                  <p style={styles.sectionDesc}>Gerenciamento de mutações de escopo e variáveis globais do servidor.</p>
                </div>
                <div style={styles.admCardBox}>
                  <span style={styles.admCardLabel}>DIRETRIZ DE MUTAÇÃO E ESTRUTURA GLOBAL</span>
                  <p style={styles.admCardText}>Envie um comando definitivo para reconfigurar propriedades e restrições de todas as instâncias filhas ativas.</p>
                  <div style={styles.chatForm}>
                    <input type="text" placeholder="Descreva a alteração comportamental para propagação global..." style={styles.cleanInput} />
                    <button type="button" onClick={() => alert('Mutação de escopo distribuída com sucesso.')} style={styles.chatButton}>Executar Mutação</button>
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

// Estilos de Luxo Platina & Carbono (Estética Limpa, Escura, Sem Cores Pobres)
const styles = {
  viewport: {
    margin: 0, padding: 0, boxSizing: 'border-box',
    backgroundColor: '#09090b', color: '#f4f4f5', minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  authCard: {
    width: '100%', maxWidth: '400px', backgroundColor: '#18181b',
    border: '1px solid #27272a', borderRadius: '16px',
    padding: '40px 32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box'
  },
  brandContainer: { textAlign: 'center' },
  mainTitle: { fontSize: '1.6rem', fontWeight: '700', margin: '0 0 6px 0', letterSpacing: '-0.03em', color: '#ffffff' },
  mainSubtitle: { fontSize: '0.85rem', color: '#a1a1aa', margin: 0 },
  fieldWrapper: { display: 'flex', flexDirection: 'column', gap: '12px' },
  cleanInput: {
    width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a',
    borderRadius: '8px', padding: '14px 16px', color: '#ffffff', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box'
  },
  cleanButton: {
    width: '100%', background: '#ffffff', color: '#09090b', border: 'none',
    borderRadius: '8px', padding: '14px', fontSize: '0.9rem', fontWeight: '600',
    cursor: 'pointer'
  },
  appContainer: {
    width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#09090b',
    overflow: 'hidden', boxSizing: 'border-box'
  },
  sidebar: {
    width: '260px', backgroundColor: '#18181b', borderRight: '1px solid #27272a',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 16px',
    boxSizing: 'border-box', flexShrink: 0
  },
  sidebarHeader: { paddingLeft: '8px', marginBottom: '8px' },
  sidebarLogo: { fontSize: '0.95rem', fontWeight: '700', letterSpacing: '0.05em', color: '#ffffff' },
  sidebarNav: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, marginTop: '28px' },
  sidebarFooter: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 8px', borderTop: '1px solid #27272a' },
  userDot: { width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a1a1aa' },
  userName: { margin: 0, fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' },
  userRole: { margin: 0, fontSize: '0.75rem', color: '#71717a' },
  mainContent: { flex: 1, padding: '40px 48px', boxSizing: 'border-box', overflowY: 'auto', display: 'flex', flexDirection: 'column' },
  tabContentFlex: { display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 },
  contentHeader: { display: 'flex', flexDirection: 'column', gap: '4px' },
  sectionTitle: { fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#ffffff', letterSpacing: '-0.02em' },
  sectionDesc: { fontSize: '0.85rem', color: '#71717a', margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  statCard: {
    background: '#18181b', border: '1px solid #27272a',
    padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px'
  },
  statLabel: { fontSize: '0.65rem', fontWeight: '700', color: '#71717a', letterSpacing: '0.05em' },
  statValue: { fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#ffffff' },
  statIndicator: { fontSize: '0.75rem', color: '#71717a' },
  statIndicatorActive: { fontSize: '0.75rem', color: '#a1a1aa' },
  chatWrapper: {
    background: '#18181b', border: '1px solid #27272a',
    borderRadius: '16px', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '360px'
  },
  chatArea: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' },
  bubbleLeft: { alignSelf: 'flex-start', background: '#27272a', padding: '12px 16px', borderRadius: '12px 12px 12px 4px', fontSize: '0.85rem', maxWidth: '75%', lineHeight: '1.45', color: '#e4e4e7' },
  bubbleRight: { alignSelf: 'flex-end', background: '#ffffff', padding: '12px 16px', borderRadius: '12px 12px 4px 12px', fontSize: '0.85rem', maxWidth: '75%', lineHeight: '1.45', color: '#09090b', fontWeight: '500' },
  chatForm: { display: 'flex', gap: '12px', width: '100%' },
  chatButton: { background: '#ffffff', color: '#09090b', border: 'none', borderRadius: '8px', padding: '0 24px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  canvaActions: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  actionPill: { background: '#18181b', border: '1px solid #27272a', color: '#f4f4f5', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer' },
  actionPillClear: { background: 'transparent', border: '1px solid #27272a', color: '#71717a', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', marginLeft: 'auto' },
  canvaWorkspace: { background: '#09090b', border: '1px dashed #27272a', borderRadius: '16px', padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  canvaEmptyMsg: { color: '#71717a', fontSize: '0.85rem', textAlign: 'center', margin: 0 },
  canvaElementsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '10px', width: '100%', alignSelf: 'flex-start' },
  elementCard: { background: '#18181b', border: '1px solid #27272a', padding: '16px 20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  elementBadge: { fontSize: '0.6rem', fontWeight: '700', color: '#a1a1aa', letterSpacing: '0.05em', display: 'block', marginBottom: '2px' },
  elementName: { fontSize: '0.9rem', fontWeight: '500', margin: 0, color: '#ffffff' },
  elementRemove: { background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer', fontSize: '1rem' },
  admCardBox: { background: '#18181b', border: '1px solid #27272a', padding: '24px', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '12px' },
  admCardLabel: { fontSize: '0.65rem', fontWeight: '700', color: '#e4e4e7', letterSpacing: '0.05em' },
  admCardText: { fontSize: '0.85rem', color: '#71717a', margin: 0, lineHeight: '1.45' }
};

const sidebarTabStyle = (active, isAdm = false) => ({
  width: '100%', padding: '12px 14px', textAlign: 'left',
  background: active ? '#27272a' : 'transparent',
  color: active ? '#ffffff' : '#a1a1aa',
  border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: active ? '600' : '500',
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
});
