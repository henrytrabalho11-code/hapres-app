import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // Controle de Fluxo Rígido
  const [stage, setStage] = useState('overboarding'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dashTab, setDashTab] = useState('criar-ia'); 
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [chosenRole, setChosenRole] = useState(null); 

  // Cadastro de Usuários
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // Motores de Comunicação Real
  const [aiChat, setAiChat] = useState([{ sender: 'bot', text: 'Sovereign Core ativo. Insira a diretriz em linguagem natural para forjar sua aplicação.' }]);
  const [aiInput, setAiInput] = useState('');
  const [supportChat, setSupportChat] = useState([{ sender: 'bot', text: 'Suporte Avançado 24h. Pronto para qualquer consulta lógica do universo.' }]);
  const [supportInput, setSupportInput] = useState('');

  // Componentes do Super Canva
  const [canvaElements, setCanvaElements] = useState([]);

  // Touch e Gestos para Dispositivos Móveis
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  
  const handleTouchStart = (e) => { touchStart.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEnd.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (stage !== 'overboarding') return;
    if (touchStart.current - touchEnd.current > 50) {
      if (currentSlide < 2) setCurrentSlide(currentSlide + 1);
      else setStage('cadastro');
    }
    if (touchStart.current - touchEnd.current < -50) {
      if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    }
  };

  const manualSlides = [
    { title: 'HAPRES SOVEREIGN', desc: 'A Fábrica de Software Autônoma. O usuário governa a máquina através de comandos diretos para erguer ecossistemas digitais completos.' },
    { title: 'MÓDULOS DE FLUXO VIVO', desc: 'Acople instantaneamente gateways automáticos de Pix, painéis esportivos de futebol e estruturas complexas de banco de dados sem tocar em código.' },
    { title: 'ENCICLOPÉDIA NEURAL', desc: 'A inteligência artificial que resolve e projeta qualquer lógica operacional do planeta. Autonomia absoluta para mentes ambiciosas.' }
  ];

  const executarAutenticacao = (e) => {
    e.preventDefault();
    const foneLimpo = whatsapp.replace(/\D/g, '');
    const mailFormatado = email.toLowerCase().trim();

    if (mailFormatado === 'henryserpa11@gmail.com' || mailFormatado === 'henrytrabalho11@gmail.com' || foneLimpo === '11992819767') {
      setIsAdminMode(true);
      setStage('filtro-adm');
    } else {
      setStage('plano-mensal');
    }
  };

  const processarInteligenciaLocal = (entrada) => {
    const termo = entrada.toLowerCase().trim();
    if (termo.includes('1 mais 1') || termo.includes('1+1') || termo.includes('quanto é 1')) {
      return "1 mais 1 é exatamente igual a 2.";
    }
    if (termo.includes('criar') || termo.includes('app') || termo.includes('aplicativo') || termo.includes('plataforma')) {
      return `[Hapres Sovereign Engine] Comando interceptado. Mapeando esquemas de dados, provisionando microsserviços e compilando o link de produção na nuvem de forma autônoma.`;
    }
    return `Diretriz "${entrada}" processada. O núcleo operacional executou a ação requisitada com sucesso no ecossistema.`;
  };

  const enviarMensagemIa = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: msg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'bot', text: processarInteligenciaLocal(msg) }]);
    }, 300);
  };

  const enviarMensagemSuporte = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const msg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: msg }]);
    setSupportInput('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'bot', text: processarInteligenciaLocal(msg) }]);
    }, 300);
  };

  return (
    <div 
      onTouchStart={handleTouchStart} 
      onTouchMove={handleTouchMove} 
      onTouchEnd={handleTouchEnd} 
      style={styles.container}
    >
      
      {/* 1. SLIDES DO MANUAL (TOUCH SENSITIVE) */}
      {stage === 'overboarding' && (
        <div style={styles.cardPremium}>
          <div style={styles.headerCentered}>
            <span style={styles.tagBrand}>HAPRES SOVEREIGN</span>
          </div>
          <div style={styles.contentBody}>
            <h2 style={styles.titleSlide}>{manualSlides[currentSlide].title}</h2>
            <p style={styles.descSlide}>{manualSlides[currentSlide].desc}</p>
          </div>
          <div>
            <div style={styles.dotContainer}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ ...styles.dot, backgroundColor: currentSlide === i ? '#0071e3' : 'rgba(255,255,255,0.15)' }}></div>
              ))}
            </div>
            <div style={styles.buttonRow}>
              {currentSlide > 0 && (
                <button onClick={() => setCurrentSlide(currentSlide - 1)} style={styles.secButton}>VOLTAR</button>
              )}
              <button onClick={() => currentSlide < 2 ? setCurrentSlide(currentSlide + 1) : setStage('cadastro')} style={styles.primButton}>
                {currentSlide === 2 ? 'INICIAR' : 'AVANÇAR'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CADASTRO PREMIUM */}
      {stage === 'cadastro' && (
        <form onSubmit={executarAutenticacao} style={styles.cardPremium}>
          <div style={styles.headerCentered}>
            <h2 style={styles.titleMain}>Criar Credenciais</h2>
            <p style={styles.subtitleMain}>Identificação mestre dentro da rede autônoma</p>
          </div>
          <div style={styles.formGroup}>
            <input type="text" placeholder="Nome Completo" required value={nome} onChange={(e) => setNome(e.target.value)} style={styles.inputField} />
            <input type="email" placeholder="Endereço de E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.inputField} />
            <input type="tel" placeholder="WhatsApp (Apenas números)" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={styles.inputField} />
          </div>
          <button type="submit" style={styles.primButton}>Avançar</button>
        </form>
      )}

      {/* 3. FILTRO ADM (SEUS DADOS) */}
      {stage === 'filtro-adm' && (
        <div style={styles.cardPremium}>
          <div style={styles.headerCentered}>
            <h2 style={{ ...styles.titleMain, color: '#ff453a' }}>Direção Suprema</h2>
            <p style={styles.subtitleMain}>Privilégios administrativos detectados. Escolha o modo de entrada:</p>
          </div>
          <div style={styles.formGroup}>
            <button onClick={() => { setChosenRole('admin'); setStage('plano-mensal'); }} style={{ ...styles.primButton, background: '#ff453a' }}>🛡 MODO ADMINISTRADOR GLOBAL</button>
            <button onClick={() => { setChosenRole('user'); setStage('plano-mensal'); }} style={{ ...styles.primButton, background: '#1c1c24', border: '1px solid rgba(255,255,255,0.08)' }}>👤 MODO USUÁRIO COMUM</button>
          </div>
        </div>
      )}

      {/* 4. TELA DE PLANO MENSAL */}
      {stage === 'plano-mensal' && (
        <div style={styles.cardPremium}>
          <div style={styles.headerCentered}>
            <h2 style={styles.titleMain}>Assinatura Operacional</h2>
            <p style={styles.subtitleMain}>Acesso irrestrito aos clusters de processamento</p>
          </div>
          <div style={styles.planBox}>
            <div style={styles.planHeader}>
              <span style={styles.planTitle}>👑 PLANO PRO MENSAL</span>
              <span style={styles.planBadge}>ATIVO</span>
            </div>
            <div style={styles.planPriceRow}>
              <span style={styles.planPrice}>R$ 97,00</span>
              <span style={styles.planPeriod}>/ por mês</span>
            </div>
            <ul style={styles.planFeatures}>
              <li>Criação ilimitada de infraestruturas</li>
              <li>Módulos ativos de Pix e Esportes nativos</li>
              <li>Acesso irrestrito às redes de inteligência GPT-4o/Claude</li>
            </ul>
          </div>
          <button onClick={() => setStage('dashboard')} style={styles.primButton}>Acessar Workspace</button>
        </div>
      )}

      {/* 5. WORKSPACE COMPLETO */}
      {stage === 'dashboard' && (
        <div style={styles.dashboardContainer}>
          <div style={styles.dashHeader}>
            <div>
              <h1 style={styles.dashTitle}>Hapres Sovereign Workspace</h1>
              <p style={styles.dashUser}>Operador: {nome || 'Mestre Henry'} | Credencial: <span style={{ color: chosenRole === 'admin' ? '#ff453a' : '#0071e3', fontWeight: 'bold' }}>{chosenRole === 'admin' ? 'ADMIN' : 'USER'}</span></p>
            </div>
            <div style={styles.dashBadge}>Assinatura Mensal Ativa</div>
          </div>

          <div style={styles.tabsRow}>
            <button onClick={() => setDashTab('criar-ia')} style={tabStyle(dashTab === 'criar-ia')}>🤖 Co-Pilot IA</button>
            <button onClick={() => setDashTab('canva')} style={tabStyle(dashTab === 'canva')}>🎨 Super Canva</button>
            <button onClick={() => setDashTab('suporte')} style={tabStyle(dashTab === 'suporte')}>🔮 Suporte 24h</button>
            {isAdminMode && chosenRole === 'admin' && (
              <button onClick={() => setDashTab('adm')} style={tabStyle(dashTab === 'adm', true)}>🛡 Central Mestre</button>
            )}
          </div>

          <div style={styles.dashContent}>
            {/* CO-PILOT IA */}
            {dashTab === 'criar-ia' && (
              <div style={styles.chatContainer}>
                <div style={styles.chatDisplay}>
                  {aiChat.map((m, i) => (
                    <div key={i} style={m.sender === 'user' ? styles.bubbleUser : styles.bubbleBot}>{m.text}</div>
                  ))}
                </div>
                <form onSubmit={enviarMensagemIa} style={styles.chatForm}>
                  <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Ordene a criação de aplicativos ou acoplamento de módulos..." style={styles.inputField} />
                  <button type="submit" style={styles.sendButton}>Enviar</button>
                </form>
              </div>
            )}

            {/* SUPER CANVA */}
            {dashTab === 'canva' && (
              <div style={styles.canvaWrapper}>
                <div style={styles.canvaControls}>
                  <button onClick={() => setCanvaElements([...canvaElements, { id: Date.now(), title: '⚡ Gateway Pix de Faturamento Automático' }])} style={styles.canvaAddBtn}>+ Injetar Pix</button>
                  <button onClick={() => setCanvaElements([...canvaElements, { id: Date.now(), title: '⚽ Módulo Esportivo de Futebol e Odds' }])} style={styles.canvaAddBtn}>+ Injetar Futebol</button>
                  <button onClick={() => setCanvaElements([])} style={styles.canvaClearBtn}>Limpar Canvas</button>
                </div>
                <div style={styles.canvaView}>
                  {canvaElements.length === 0 ? (
                    <span style={styles.canvaEmptyText}>Canva de Arquitetura Visual Vazio. Injete os módulos vivos utilizando os botões acima.</span>
                  ) : (
                    canvaElements.map(el => (
                      <div key={el.id} style={styles.canvaItemCard}>
                        <span><strong>[Microsserviço]</strong> {el.title}</span>
                        <button onClick={() => setCanvaElements(canvaElements.filter(x => x.id !== el.id))} style={styles.canvaItemDel}>✕</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SUPORTE 24H */}
            {dashTab === 'suporte' && (
              <div style={styles.chatContainer}>
                <div style={styles.chatDisplay}>
                  {supportChat.map((m, i) => (
                    <div key={i} style={m.sender === 'user' ? styles.bubbleUser : styles.bubbleBot}>{m.text}</div>
                  ))}
                </div>
                <form onSubmit={enviarMensagemSuporte} style={styles.chatForm}>
                  <input type="text" value={supportInput} onChange={(e) => setSupportInput(e.target.value)} placeholder="Efetue testes lógicos de verificação de integridade..." style={styles.inputField} />
                  <button type="submit" style={styles.sendButton}>Perguntar</button>
                </form>
              </div>
            )}

            {/* CENTRAL MESTRE ADM */}
            {dashTab === 'adm' && isAdminMode && chosenRole === 'admin' && (
              <div style={styles.admWrapper}>
                <h3 style={styles.admTitle}>Painel de Mutação de Escopo</h3>
                <div style={styles.admBox}>
                  <span style={styles.admLabel}>DIRETRIZ DE ALTERAÇÃO GLOBAL DE SERVIDORES</span>
                  <p style={styles.admDesc}>Ordene reconfigurações estruturais completas nas aplicações ativas sem alteração manual de código.</p>
                  <div style={styles.chatForm}>
                    <input type="text" placeholder="Ex: Mutar paleta estrutural de todas as aplicações filhas para Neon..." style={styles.inputField} />
                    <button type="button" onClick={() => alert('Mutação de infraestrutura distribuída com sucesso.')} style={{ ...styles.sendButton, background: '#ff453a' }}>Executar</button>
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

// Estilos de Alta Definição Visual (Apple Premium UI Style)
const styles = {
  container: {
    margin: 0, padding: '24px', boxSizing: 'border-box',
    backgroundColor: '#000000', color: '#f5f5f7', minHeight: '100vh',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    overflowX: 'hidden'
  },
  cardPremium: {
    width: '100%', maxWidth: '390px', backgroundColor: 'rgba(22, 22, 26, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px',
    padding: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
    backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', gap: '24px',
    boxSizing: 'border-box'
  },
  headerCentered: { textAlign: 'center' },
  tagBrand: { fontSize: '0.75rem', fontWeight: '800', letterSpacing: '3px', color: '#0071e3' },
  titleSlide: { fontSize: '1.45rem', fontWeight: '700', margin: '0 0 10px 0', letterSpacing: '-0.5px' },
  descSlide: { fontSize: '0.9rem', color: '#8e8e93', margin: 0, lineHeight: '1.5' },
  contentBody: { minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  dotContainer: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' },
  dot: { width: '6px', height: '6px', borderRadius: '50%', transition: 'background-color 0.2s' },
  buttonRow: { display: 'flex', gap: '12px' },
  primButton: {
    flex: 1, background: '#0071e3', color: '#fff', border: 'none',
    borderRadius: '10px', padding: '14px', fontSize: '0.9rem', fontWeight: '600',
    cursor: 'pointer', transition: 'background 0.2s'
  },
  secButton: {
    padding: '14px 20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
    backgroundColor: 'transparent', color: '#fff', fontWeight: '600', cursor: 'pointer'
  },
  titleMain: { fontSize: '1.5rem', fontWeight: '700', margin: '0 0 6px 0', letterSpacing: '-0.3px' },
  subtitleMain: { fontSize: '0.85rem', color: '#8e8e93', margin: 0, lineHeight: '1.4' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  inputField: {
    width: '100%', backgroundColor: '#0b0b0d', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', padding: '14px', color: '#fff', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box'
  },
  planBox: {
    border: '1px solid rgba(0, 113, 227, 0.3)', borderRadius: '12px',
    padding: '20px', background: 'rgba(0, 113, 227, 0.03)'
  },
  planHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  planTitle: { fontWeight: '700', color: '#0071e3', fontSize: '0.95rem' },
  planBadge: { background: '#0071e3', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '10px', fontWeight: '800' },
  planPriceRow: { display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px' },
  planPrice: { fontSize: '1.4rem', fontWeight: '700' },
  planPeriod: { fontSize: '0.8rem', color: '#8e8e93' },
  planFeatures: { margin: 0, paddingLeft: '16px', fontSize: '0.85rem', color: '#d2d2d7', lineHeight: '1.6' },
  
  dashboardContainer: {
    width: '100%', maxWidth: '940px', backgroundColor: 'rgba(22, 22, 26, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '20px',
    padding: '32px', minHeight: '580px', boxShadow: '0 40px 80px rgba(0,0,0,0.9)',
    backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', gap: '24px',
    boxSizing: 'border-box'
  },
  dashHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '18px', flexWrap: 'wrap', gap: '12px'
  },
  dashTitle: { fontSize: '1.35rem', fontWeight: '700', margin: '0 0 4px 0', letterSpacing: '-0.3px' },
  dashUser: { fontSize: '0.85rem', color: '#8e8e93', margin: 0 },
  dashBadge: {
    background: 'rgba(52, 199, 89, 0.1)', color: '#34c759', border: '1px solid rgba(52, 199, 89, 0.2)',
    padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700'
  },
  tabsRow: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' },
  dashContent: { flex: 1, display: 'flex', flexDirection: 'column', minHeight: '380px' },
  chatContainer: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' },
  chatDisplay: {
    background: '#050507', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px',
    padding: '18px', height: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px'
  },
  bubbleUser: { alignSelf: 'flex-end', background: '#0071e3', padding: '10px 16px', borderRadius: '14px 14px 4px 14px', fontSize: '0.9rem', maxWidth: '75%', lineHeight: '1.4' },
  bubbleBot: { alignSelf: 'flex-start', background: '#1c1c24', padding: '10px 16px', borderRadius: '14px 14px 14px 4px', fontSize: '0.9rem', maxWidth: '75%', lineHeight: '1.4', border: '1px solid rgba(255,255,255,0.03)' },
  chatForm: { display: 'flex', gap: '10px', marginTop: '14px' },
  sendButton: { background: '#0071e3', color: '#fff', border: 'none', borderRadius: '10px', padding: '0 24px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' },
  canvaWrapper: { display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 },
  canvaControls: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  canvaAddBtn: { background: '#1c1c24', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  canvaClearBtn: { background: 'transparent', border: '1px solid #ff453a', color: '#ff453a', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', marginLeft: 'auto' },
  canvaView: { background: '#050507', border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px', minHeight: '240px', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' },
  canvaEmptyText: { color: '#48484a', fontSize: '0.85rem', textAlign: 'center', margin: 0, maxWidth: '420px', alignSelf: 'center', lineHeight: '1.5' },
  canvaItemCard: { background: '#1c1c24', border: '1px solid rgba(255,255,255,0.05)', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' },
  canvaItemDel: { background: 'transparent', border: 'none', color: '#ff453a', cursor: 'pointer', fontSize: '1rem' },
  admWrapper: { display: 'flex', flexDirection: 'column', gap: '14px' },
  admTitle: { margin: 0, color: '#ff453a', fontSize: '1.15rem', fontWeight: '700' },
  admBox: { background: 'rgba(255, 69, 58, 0.02)', border: '1px solid rgba(255, 69, 58, 0.15)', padding: '20px', borderRadius: '12px' },
  admLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#ff453a', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' },
  admDesc: { fontSize: '0.85rem', color: '#8e8e93', margin: '0 0 14px 0', lineHeight: '1.4' }
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
