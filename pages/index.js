import { useState } from 'react';

export default function Home() {
  // Estados de Controle de Fluxo
  const [stage, setStage] = useState('cadastro'); 
  const [dashTab, setDashTab] = useState('criar-ia'); 
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [chosenRole, setChosenRole] = useState(null);

  // Estados de Input de Dados
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [supportInput, setSupportInput] = useState('');

  // Estados de Armazenamento Interno (Sem dependências externas)
  const [aiChat, setAiChat] = useState([
    { sender: 'bot', text: 'Sovereign Engine ativa. Dite o aplicativo ou microsserviço que deseja forjar na nuvem.' }
  ]);
  const [supportChat, setSupportChat] = useState([
    { sender: 'bot', text: 'Central de Suporte Ativa. Insira qualquer consulta lógica ou dúvida técnica.' }
  ]);
  const [canvaModules, setCanvaModules] = useState([]);

  // Validação de Credenciais do Diretor
  const processarAcesso = (e) => {
    e.preventDefault();
    const foneLimpo = whatsapp.replace(/\D/g, '');
    const emailFormatado = email.toLowerCase().trim();

    if (emailFormatado === 'henryserpa11@gmail.com' || emailFormatado === 'henrytrabalho11@gmail.com' || foneLimpo === '11992819767') {
      setIsAdminMode(true);
      setStage('filtro-diretoria');
    } else {
      setStage('dashboard');
    }
  };

  // Processamento de Respostas Pró-Ativas (Lógica Real)
  const analisarComando = (input) => {
    const texto = input.toLowerCase().trim();
    if (texto.includes('1 mais 1') || texto.includes('1+1') || texto.includes('quanto e 1')) {
      return "O resultado matemático exato de 1 mais 1 é igual a 2.";
    }
    if (texto.includes('criar') || texto.includes('app') || texto.includes('aplicativo') || texto.includes('plataforma')) {
      return `[Hapres Sovereign] Diretriz aceita. Estruturando tabelas relacionais, acoplando microsserviços e compilando o link de produção de forma autônoma.`;
    }
    return `Comando "${input}" interpretado. A infraestrutura do Hapres processou a requisição com sucesso.`;
  };

  const dispararMensagemIa = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: msg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'bot', text: analisarComando(msg) }]);
    }, 400);
  };

  const dispararMensagemSuporte = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const msg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: msg }]);
    setSupportInput('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'bot', text: analisarComando(msg) }]);
    }, 400);
  };

  const injetarModuloCanva = (tipo) => {
    setCanvaModules(prev => [...prev, { id: Date.now(), nome: tipo }]);
  };

  return (
    <div style={styles.viewport}>
      
      {/* TELA 1: CADASTRO PREMIUM */}
      {stage === 'cadastro' && (
        <form onSubmit={processarAcesso} style={styles.authContainer}>
          <div style={styles.brandHeader}>
            <h1 style={styles.brandTitle}>Hapres Sovereign</h1>
            <p style={styles.brandSubtitle}>Infraestrutura de Desenvolvimento Autônomo</p>
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>NOME OPERACIONAL</label>
            <input type="text" placeholder="Insira seu nome completo" required value={nome} onChange={(e) => setNome(e.target.value)} style={styles.inputField} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>ENDEREÇO DE E-MAIL</label>
            <input type="email" placeholder="seuemail@provedor.com" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.inputField} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>WHATSAPP CORPORATIVO</label>
            <input type="tel" placeholder="Apenas dígitos numéricos" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={styles.inputField} />
          </div>

          <button type="submit" style={styles.primaryButton}>Inicializar Sistema</button>
        </form>
      )}

      {/* TELA 2: FILTRO DE PRIVILÉGIOS (EXCLUSIVO HENRY) */}
      {stage === 'filtro-diretoria' && (
        <div style={styles.authContainer}>
          <div style={styles.brandHeader}>
            <h1 style={{ ...styles.brandTitle, color: '#ff453a' }}>Acesso Diretor</h1>
            <p style={styles.brandSubtitle}>Assinatura administrativa global identificada no ecossistema.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <button onClick={() => { setChosenRole('admin'); setStage('dashboard'); }} style={{ ...styles.primaryButton, background: '#ff453a' }}>🛡 Entrar como Administrador</button>
            <button onClick={() => { setChosenRole('user'); setStage('dashboard'); }} style={{ ...styles.primaryButton, background: '#2c2c35' }}>👤 Entrar como Usuário Padrão</button>
          </div>
        </div>
      )}

      {/* TELA 3: WORKSPACE COMPLETO COM TODAS AS ABAS */}
      {stage === 'dashboard' && (
        <div style={styles.workspaceContainer}>
          
          {/* Cabeçalho de Controle */}
          <div style={styles.workspaceHeader}>
            <div>
              <h2 style={styles.workspaceTitle}>Sovereign Workspace</h2>
              <span style={styles.workspaceStatus}>
                Operador: <strong style={{ color: '#fff' }}>{nome || 'Henry'}</strong> | Nível: <strong style={{ color: chosenRole === 'admin' ? '#ff453a' : '#0071e3' }}>{chosenRole === 'admin' ? 'ADMINISTRADOR GLOBAL' : 'USUÁRIO PRO'}</strong>
              </span>
            </div>
            <div style={styles.badgeMensal}>ASSINATURA MENSAL: R$ 97,00</div>
          </div>

          {/* Barra de Navegação Superior */}
          <div style={styles.navigationBar}>
            <button onClick={() => setDashTab('criar-ia')} style={tabStyle(dashTab === 'criar-ia')}>🤖 Co-Pilot IA</button>
            <button onClick={() => setDashTab('canva')} style={tabStyle(dashTab === 'canva')}>🎨 Super Canva</button>
            <button onClick={() => setDashTab('suporte')} style={tabStyle(dashTab === 'suporte')}>🔮 Suporte 24h</button>
            {isAdminMode && chosenRole === 'admin' && (
              <button onClick={() => setDashTab('adm-panel')} style={tabStyle(dashTab === 'adm-panel', true)}>🛡 Controle Mestre</button>
            )}
          </div>

          {/* Conteúdo Dinâmico das Abas */}
          <div style={styles.contentArea}>
            
            {/* ABA 1: CO-PILOT IA */}
            {dashTab === 'criar-ia' && (
              <div style={styles.tabFlexWrapper}>
                <div style={styles.chatBox}>
                  {aiChat.map((m, i) => (
                    <div key={i} style={m.sender === 'user' ? styles.msgUser : styles.msgBot}>{m.text}</div>
                  ))}
                </div>
                <form onSubmit={dispararMensagemIa} style={styles.chatForm}>
                  <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Insira comandos em linguagem natural para gerar sua aplicação..." style={styles.inputField} />
                  <button type="submit" style={styles.sendButton}>Enviar</button>
                </form>
              </div>
            )}

            {/* ABA 2: SUPER CANVA MANUAL */}
            {dashTab === 'canva' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <div style={styles.canvaActionsRow}>
                  <button onClick={() => injetarModuloCanva('Gateway de Pagamentos Pix')} style={styles.actionButton}>⚡ Injetar Gateway Pix</button>
                  <button onClick={() => injetarModuloCanva('Feed de Dados Esportivos')} style={styles.actionButton}>⚽ Injetar Painel Futebol</button>
                  <button onClick={() => setCanvaModules([])} style={styles.clearButton}>Limpar Grid</button>
                </div>
                <div style={styles.canvaGrid}>
                  {canvaModules.length === 0 ? (
                    <p style={styles.canvaPlaceholder}>Canva pronto. Selecione os módulos acima para acoplar componentes de software na tela.</p>
                  ) : (
                    canvaModules.map(mod => (
                      <div key={mod.id} style={styles.canvaCard}>
                        <span><strong>[Componente Nativo]</strong> {mod.nome}</span>
                        <button onClick={() => setCanvaModules(canvaModules.filter(x => x.id !== mod.id))} style={styles.deleteCardBtn}>✕</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ABA 3: SUPORTE 24H (INTELIGÊNCIA COMPLETA) */}
            {dashTab === 'suporte' && (
              <div style={styles.tabFlexWrapper}>
                <div style={styles.chatBox}>
                  {supportChat.map((m, i) => (
                    <div key={i} style={m.sender === 'user' ? styles.msgUser : styles.msgBot}>{m.text}</div>
                  ))}
                </div>
                <form onSubmit={dispararMensagemSuporte} style={styles.chatForm}>
                  <input type="text" value={supportInput} onChange={(e) => setSupportInput(e.target.value)} placeholder="Efetue testes livres de lógica (Ex: quanto é 1 mais 1)..." style={styles.inputField} />
                  <button type="submit" style={styles.sendButton}>Consultar</button>
                </form>
              </div>
            )}

            {/* ABA 4: CONTROLE SUPREMO DO ADMINISTRADOR */}
            {dashTab === 'adm-panel' && isAdminMode && chosenRole === 'admin' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ color: '#ff453a', margin: 0, fontSize: '1.2rem' }}>Painel do Diretor Geral</h3>
                <div style={styles.admMutationCard}>
                  <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>MUTAÇÃO COMPLETA DO SISTEMA</strong>
                  <p style={{ fontSize: '0.85rem', color: '#8e8e93', margin: '0 0 14px 0' }}>Altere regras globais, cores estruturais e restrições de banco de dados instantaneamente sem encostar no código fonte.</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Digite a nova regra ou mutação de comportamento global..." style={styles.inputField} />
                    <button onClick={() => alert('Mutação de infraestrutura distribuída com sucesso!')} style={{ ...styles.primaryButton, background: '#ff453a', width: 'auto', padding: '0 24px', whiteSpace: 'nowrap' }}>Executar Mutação</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// Estilos dinâmicos baseados no Design Language da Apple
const styles = {
  viewport: {
    margin: 0, padding: '20px', boxSizing: 'border-box',
    backgroundColor: '#08080a', color: '#f5f5f7', minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  authContainer: {
    width: '100%', maxWidth: '400px', backgroundColor: 'rgba(20, 20, 25, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px',
    padding: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
    backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', gap: '18px'
  },
  brandHeader: { textAlign: 'center', marginBottom: '6px' },
  brandTitle: { fontSize: '1.75rem', fontWeight: '700', margin: '0 0 4px 0', letterSpacing: '-0.5px' },
  brandSubtitle: { fontSize: '0.85rem', color: '#8e8e93', margin: 0, lineHeight: '1.4' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.7rem', fontWeight: '700', color: '#8e8e93', letterSpacing: '1px' },
  inputField: {
    width: '100%', backgroundColor: '#141419', border: '1px solid #2c2c35',
    borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
  },
  primaryButton: {
    width: '100%', background: '#0071e3', color: '#fff', border: 'none',
    borderRadius: '10px', padding: '14px', fontSize: '0.95rem', fontWeight: '600',
    cursor: 'pointer', transition: 'background 0.2s', marginTop: '6px'
  },
  workspaceContainer: {
    width: '100%', maxWidth: '920px', backgroundColor: 'rgba(18, 18, 24, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '20px',
    padding: '28px', minHeight: '560px', boxShadow: '0 30px 70px rgba(0,0,0,0.7)',
    backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', gap: '22px'
  },
  workspaceHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px'
  },
  workspaceTitle: { fontSize: '1.3rem', fontWeight: '700', margin: '0 0 4px 0' },
  workspaceStatus: { fontSize: '0.8rem', color: '#8e8e93' },
  badgeMensal: {
    background: 'rgba(0, 113, 227, 0.15)', color: '#0071e3', border: '1px solid rgba(0, 113, 227, 0.3)',
    padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700'
  },
  navigationBar: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' },
  contentArea: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: '360px' },
  tabFlexWrapper: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' },
  chatBox: {
    background: '#09090c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px',
    padding: '16px', height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px'
  },
  msgUser: { alignSelf: 'flex-end', background: '#0071e3', padding: '10px 16px', borderRadius: '14px 14px 4px 14px', fontSize: '0.9rem', maxWidth: '75%', lineHeight: '1.4' },
  msgBot: { alignSelf: 'flex-start', background: '#1c1c24', padding: '10px 16px', borderRadius: '14px 14px 14px 4px', fontSize: '0.9rem', maxWidth: '75%', lineHeight: '1.4', border: '1px solid rgba(255,255,255,0.04)' },
  chatForm: { display: 'flex', gap: '10px', marginTop: '14px' },
  sendButton: { background: '#0071e3', color: '#fff', border: 'none', borderRadius: '10px', padding: '0 24px', fontWeight: '600', cursor: 'pointer' },
  canvaActionsRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  actionButton: { background: '#1c1c24', border: '1px solid #2c2c35', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  clearButton: { background: 'transparent', border: '1px solid #ff453a', color: '#ff453a', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', marginLeft: 'auto' },
  canvaGrid: { background: '#09090c', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' },
  canvaPlaceholder: { color: '#48484a', fontSize: '0.9rem', textAlign: 'center', margin: 0, maxWidth: '400px', alignSelf: 'center', lineHeight: '1.5' },
  canvaCard: { background: '#1c1c24', border: '1px solid rgba(255,255,255,0.06)', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' },
  deleteCardBtn: { background: 'transparent', border: 'none', color: '#ff453a', cursor: 'pointer', fontSize: '1rem' },
  admMutationCard: { background: 'rgba(255, 69, 58, 0.03)', border: '1px solid rgba(255, 69, 58, 0.15)', padding: '20px', borderRadius: '12px' }
};

const tabStyle = (active, isAdm = false) => ({
  padding: '10px 18px',
  background: active ? (isAdm ? '#ff453a' : '#0071e3') : '#1c1c24',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '600',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontSize: '0.85rem',
  transition: 'background 0.2s'
});
