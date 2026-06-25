import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [stage, setStage] = useState('intro'); // 'intro', 'chat', 'generating', 'hud'
  const [theme, setTheme] = useState('cyber'); // 'cyber' (Neon/Dark) ou 'creative' (Glow/Bright)
  const [chatStep, setChatStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('modulos'); // 'modulos', 'pix', 'banco'
  
  // Dados simulados do app do usuário
  const [businessData, setBusinessData] = useState({ name: '', offer: '', contact: '' });
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('Inicializando rede neural...');

  // Cadastro Final
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (stage === 'chat') scrollToBottom();
  }, [messages, stage]);

  const startAppCreation = () => {
    setStage('chat');
    setMessages([
      { sender: 'bot', text: '⚡ Sistema Hapres Sovereign online. Vamos iniciar a forja do seu software autônomo.' },
      { sender: 'bot', text: 'Insira o nome da sua corporação ou negócio para indexarmos no ecossistema:' }
    ]);
    setChatStep(1);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const updatedMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(updatedMessages);
    setInputValue('');

    setTimeout(() => {
      if (chatStep === 1) {
        setBusinessData(prev => ({ ...prev, name: userText }));
        setMessages([...updatedMessages, 
          { sender: 'bot', text: `❖ Identidade [${userText}] registrada com sucesso.` },
          { sender: 'bot', text: 'Qual será a principal atividade ou oferta desse ecossistema? (Ex: Vendas, Plataforma de Jogos, Sistema de Membros)' }
        ]);
        setChatStep(2);
      } else if (chatStep === 2) {
        setBusinessData(prev => ({ ...prev, offer: userText }));
        setMessages([...updatedMessages, 
          { sender: 'bot', text: '❖ Núcleo de regras de negócio sintetizado.' },
          { sender: 'bot', text: 'Por fim, insira o canal ou link principal de contato dos seus clientes:' }
        ]);
        setChatStep(3);
      } else if (chatStep === 3) {
        setBusinessData(prev => ({ ...prev, contact: userText }));
        setMessages([...updatedMessages, 
          { sender: 'bot', text: '❖ Protocolos de comunicação estabelecidos. Matriz pronta para compilação gráfica.' }
        ]);
        setChatStep(4);
        
        setTimeout(() => {
          setStage('generating');
          triggerGenerationAnimation();
        }, 1500);
      }
    }, 1000);
  };

  const triggerGenerationAnimation = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 4;
      if (currentProgress <= 25) setCurrentStatus('Injetando micro-serviços na nuvem Vercel...');
      else if (currentProgress <= 50) setCurrentStatus('Estruturando banco relacional dinâmico...');
      else if (currentProgress <= 75) setCurrentStatus('Compilando motor gráfico de alta fidelidade...');
      else if (currentProgress < 100) setCurrentStatus('Finalizando conexões e chaves criptográficas...');
      
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStage('hud'), 800);
      }
    }, 150);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthMessage({ type: '', text: '' });

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setAuthMessage({ type: 'success', text: '✓ Conta ativada na nuvem Hapres! Verifique seu e-mail.' });
    } catch (error) {
      setAuthMessage({ type: 'error', text: error.message || 'Falha na autenticação das chaves.' });
    } finally {
      setLoading(false);
    }
  };

  // Definição de paletas de cores tecnológicas e de ponta
  const styles = {
    bg: theme === 'cyber' ? 'radial-gradient(circle at top, #0f081d 0%, #030107 100%)' : 'radial-gradient(circle at top, #0c1821 0%, #04080f 100%)',
    containerBg: theme === 'cyber' ? 'rgba(11, 6, 23, 0.75)' : 'rgba(8, 14, 24, 0.8)',
    border: theme === 'cyber' ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid rgba(255, 0, 127, 0.25)',
    primaryGlow: theme === 'cyber' ? '#00f2fe' : '#ff007f',
    secondaryGlow: theme === 'cyber' ? '#9d4edd' : '#7209b7',
    textGradient: theme === 'cyber' ? 'linear-gradient(45deg, #00f2fe, #4facfe)' : 'linear-gradient(45deg, #ff007f, #ff758c)'
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: '"SF Pro Display", -apple-system, sans-serif',
      background: styles.bg,
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Container Principal do Aplicativo */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: styles.containerBg,
        borderLeft: styles.border,
        borderRight: styles.border,
        backdropFilter: 'blur(30px)',
        boxShadow: `0 0 50px ${styles.primaryGlow}15`
      }}>
        
        {/* Switcher de Modos Estilizado (No topo fixo) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: styles.primaryGlow, boxShadow: `0 0 10px ${styles.primaryGlow}` }}></div>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '1px', color: '#888' }}>SOVEREIGN V2</span>
          </div>
          <button 
            type="button"
            onClick={() => setTheme(theme === 'cyber' ? 'creative' : 'cyber')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: `1px solid ${styles.primaryGlow}`,
              background: 'rgba(255,255,255,0.02)',
              color: styles.primaryGlow,
              fontSize: '0.75rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: `0 0 12px ${styles.primaryGlow}30`,
              transition: 'all 0.3s ease'
            }}
          >
            {theme === 'cyber' ? '⚡ Modo Cyber' : '🎨 Modo Criativo'}
          </button>
        </div>

        {/* 1. TELA DE INTRODUÇÃO */}
        {stage === 'intro' && (
          <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ 
                fontSize: '2.4rem', 
                fontWeight: '900', 
                lineHeight: '1.1', 
                marginBottom: '15px',
                background: styles.textGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                A Forja de Software Autônoma.
              </h1>
              <p style={{ color: '#a0a0ab', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '35px' }}>
                Desenvolva ecossistemas inteiros sem encostar no código. Dite as regras, configure seus módulos e implemente em produção instantaneamente.
              </p>

              {/* Grid Tecnológico */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '30px' }}>
                <div style={cardStyle(styles)}>
                  <span style={{ fontSize: '1.1rem', color: styles.primaryGlow }}>❖ Módulos</span>
                  <p style={{ fontSize: '0.8rem', color: '#71717a', margin: '4px 0 0 0' }}>Sistemas de jogos, dízimos e finanças integrados.</p>
                </div>
                <div style={cardStyle(styles)}>
                  <span style={{ fontSize: '1.1rem', color: styles.primaryGlow }}>⚡ Gateway</span>
                  <p style={{ fontSize: '0.8rem', color: '#71717a', margin: '4px 0 0 0' }}>Split de pagamentos e Pix automatizado direto na API.</p>
                </div>
                <div style={cardStyle(styles)}>
                  <span style={{ fontSize: '1.1rem', color: styles.primaryGlow }}>📁 Supabase</span>
                  <p style={{ fontSize: '0.8rem', color: '#71717a', margin: '4px 0 0 0' }}>Arquitetura de dados segura e criptografada de ponta.</p>
                </div>
                <div style={cardStyle(styles)}>
                  <span style={{ fontSize: '1.1rem', color: styles.primaryGlow }}>🔮 Neural HUD</span>
                  <p style={{ fontSize: '0.8rem', color: '#71717a', margin: '4px 0 0 0' }}>Painel completo e modificável em tempo real.</p>
                </div>
              </div>
            </div>

            <button type="button" onClick={startAppCreation} style={mainButtonStyle(styles)}>
              Iniciar Forja Inteligente
            </button>
          </div>
        )}

        {/* 2. INTERFACE DE CHAT CYBERPUNK */}
        {stage === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: 'calc(100vh - 55px)' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? `linear-gradient(135deg, ${styles.primaryGlow}, ${styles.secondaryGlow})` : 'rgba(255,255,255,0.03)',
                  border: msg.sender === 'user' ? 'none' : `1px solid rgba(255,255,255,0.06)`,
                  color: '#ffffff',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  maxWidth: '85%',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  boxShadow: msg.sender === 'user' ? `0 4px 15px ${styles.primaryGlow}30` : 'none'
                }}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '16px 20px', display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Insira as ordens da IA..."
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: '12px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.8)'
                }}
              />
              <button type="submit" style={{
                padding: '0 20px',
                borderRadius: '12px',
                background: '#ffffff',
                border: 'none',
                color: '#000000',
                fontWeight: '900',
                cursor: 'pointer'
              }}>➔</button>
            </form>
          </div>
        )}

        {/* 3. ANIMAÇÃO DE COMPILAÇÃO */}
        {stage === 'generating' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: `3px solid rgba(255,255,255,0.05)`, borderTop: `3px solid ${styles.primaryGlow}`, animation: 'spin 0.8s linear infinite', marginBottom: '25px', boxShadow: `0 0 20px ${styles.primaryGlow}20` }}></div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '0.5px' }}>Compilando Engine</h3>
            <p style={{ color: '#71717a', fontSize: '0.85rem', marginBottom: '24px' }}>{currentStatus}</p>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: styles.textGradient, transition: 'width 0.2s ease' }}></div>
            </div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* 4. CENTRAL DE CONTROLE AVANÇADA (HUD DE FUNÇÕES MULTIPLAS) */}
        {stage === 'hud' && (
          <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            
            {/* Header do App Criado */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: styles.primaryGlow, fontWeight: '700', letterSpacing: '1px' }}>WORKSPACE ATIVO</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '900', margin: 0 }}>{businessData.name || 'Sovereign Core'}</h2>
              </div>
              <div style={{ padding: '6px 12px', background: 'rgba(48, 209, 88, 0.1)', border: '1px solid rgba(48, 209, 88, 0.2)', borderRadius: '8px', fontSize: '0.75rem', color: '#30d158', fontWeight: 'bold' }}>LIVE</div>
            </div>

            {/* Abas de Funções Múltiplas */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '10px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <button type="button" onClick={() => setActiveTab('modulos')} style={tabButtonStyle(activeTab === 'modulos', styles)}>Módulos</button>
              <button type="button" onClick={() => setActiveTab('pix')} style={tabButtonStyle(activeTab === 'pix', styles)}>Gateway Pix</button>
              <button type="button" onClick={() => setActiveTab('banco')} style={tabButtonStyle(activeTab === 'banco', styles)}>Banco SQL</button>
            </div>

            {/* Conteúdo Dinâmico por Abas */}
            <div style={{ flex: 1, marginBottom: '24px' }}>
              {activeTab === 'modulos' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={hudCardStyle}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', display: 'block', color: '#fff' }}>⚽ Sistema de Apostas Esportivas</span>
                    <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Status: Integrado e pronto para operação.</span>
                  </div>
                  <div style={hudCardStyle}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', display: 'block', color: '#fff' }}>🏛️ Módulo de Gestão Geral</span>
                    <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Status: Conectado à central de dados autônoma.</span>
                  </div>
                  <div style={hudCardStyle}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem', display: 'block', color: '#fff' }}>🤖 Automação de Atendimento</span>
                    <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Status: Filtros ativos com inteligência artificial.</span>
                  </div>
                </div>
              )}

              {activeTab === 'pix' && (
                <div style={hudCardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#888' }}>SALDO EM CONTA</span>
                    <span style={{ fontSize: '0.85rem', color: styles.primaryGlow, fontWeight: 'bold' }}>API ATIVA</span>
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 5px 0' }}>R$ 0,00</h3>
                  <p style={{ fontSize: '0.75rem', color: '#71717a', margin: 0 }}>Chave de integração Pix configurada com split automático para o seu negócio.</p>
                </div>
              )}

              {activeTab === 'banco' && (
                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px' }}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: '700', textAlign: 'center' }}>Registrar Chaves Operacionais</h4>
                  <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={hudInputStyle} placeholder="Seu e-mail de administrador" />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={hudInputStyle} placeholder="Definir senha mestre" />
                    
                    {authMessage.text && (
                      <div style={{ padding: '10px', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'center', background: authMessage.type === 'success' ? 'rgba(48,209,88,0.1)' : 'rgba(255,69,58,0.1)', color: authMessage.type === 'success' ? '#30d158' : '#ff453a' }}>
                        {authMessage.text}
                      </div>
                    )}

                    <button type="submit" disabled={loading} style={hudFormButtonStyle(styles)}>
                      {loading ? 'SINCRONIZANDO...' : 'VINCULAR CREDENCIAIS'}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// Estilos de Escopo Isolado
const cardStyle = (styles) => ({
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '14px',
  padding: '16px',
  textAlign: 'left',
  transition: 'all 0.3s ease',
  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.02)'
});

const mainButtonStyle = (styles) => ({
  background: `linear-gradient(135deg, ${styles.primaryGlow}, ${styles.secondaryGlow})`,
  color: '#ffffff',
  border: 'none',
  borderRadius: '14px',
  padding: '16px 24px',
  fontSize: '0.95rem',
  fontWeight: '800',
  cursor: 'pointer',
  boxShadow: `0 8px 25px ${styles.primaryGlow}40`,
  transition: 'transform 0.2s ease',
  textAlign: 'center'
});

const tabButtonStyle = (isActive, styles) => ({
  flex: 1,
  padding: '10px 0',
  background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
  border: 'none',
  borderRadius: '8px',
  color: isActive ? styles.primaryGlow : '#71717a',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
});

const hudCardStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.04)',
  borderRadius: '14px',
  padding: '16px',
  textAlign: 'left'
};

const hudInputStyle = {
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.4)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '12px',
  color: '#ffffff',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const hudFormButtonStyle = (styles) => ({
  width: '100%',
  background: '#ffffff',
  color: '#000000',
  border: 'none',
  borderRadius: '10px',
  padding: '12px',
  fontSize: '0.85rem',
  fontWeight: '800',
  cursor: 'pointer'
});

