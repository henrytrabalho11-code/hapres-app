import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('cyber'); // 'cyber' (Dark/Neon) ou 'creative' (Clean/Modern/Bright)
  const [stage, setStage] = useState('mandamentos'); // 'mandamentos', 'cadastro', 'chat', 'generating'
  const [currentMandamento, setCurrentMandamento] = useState(0);
  
  // Fluxo do Chat
  const [chatStep, setChatStep] = useState(1);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (stage === 'chat') scrollToBottom();
  }, [messages, stage]);

  // Definição dos Mandamentos Originais
  const mandamentos = [
    { title: 'HAPRES SOVEREIGN', desc: 'A Fábrica de Software Autônoma. Você não escreve código; você dá ordens.' },
    { title: 'MÓDULOS VIVOS', desc: 'Arraste Pix, sistemas de futebol, dízimos e muito mais com um clique.' },
    { title: 'ENCICLOPÉDIA DE UM BILHÃO', desc: 'Qualquer leigo tem a capacidade de criar o aplicativo mais complexo do mundo.' }
  ];

  const nextMandamento = () => {
    if (currentMandamento < mandamentos.length - 1) {
      setCurrentMandamento(currentMandamento + 1);
    } else {
      setStage('cadastro');
    }
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    setStage('chat');
    setMessages([
      { sender: 'bot', text: 'Olá! Seja bem-vindo ao Hapres.' },
      { sender: 'bot', text: 'Vejo que você quer criar um novo projeto. Vou te ajudar a configurar tudo.' },
      { sender: 'bot', text: 'Qual é o nome do seu negócio?' }
    ]);
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
        setMessages([...updatedMessages, { sender: 'bot', text: 'O que você vende ou oferece?' }]);
        setChatStep(2);
      } else if (chatStep === 2) {
        setMessages([...updatedMessages, { sender: 'bot', text: 'Como seus clientes costumam entrar em contato com você?' }]);
        setChatStep(3);
      } else if (chatStep === 3) {
        setMessages([...updatedMessages, { sender: 'bot', text: 'Perfeito. Tenho tudo o que preciso para criar o seu app.' }]);
        setTimeout(() => {
          setStage('generating');
          let p = 0;
          const interval = setInterval(() => {
            p += 20;
            setProgress(p);
            if (p >= 100) {
              clearInterval(interval);
            }
          }, 300);
        }, 1500);
      }
    }, 1000);
  };

  // Configuração de Paletas de Cores Distintas e Profissionais
  const isCyber = theme === 'cyber';
  const currentStyles = {
    bg: isCyber ? '#000000' : '#f4f5f7',
    cardBg: isCyber ? '#09090b' : '#ffffff',
    border: isCyber ? '1px solid #1c1c1e' : '1px solid #e4e4e7',
    text: isCyber ? '#ffffff' : '#09090b',
    textMuted: isCyber ? '#a1a1aa' : '#71717a',
    primary: isCyber ? '#00f2fe' : '#4f46e5', // Ciano Neon vs Roxo/Azul Profissional
    buttonBg: isCyber ? '#ffffff' : '#09090b',
    buttonText: isCyber ? '#000000' : '#ffffff',
    inputBg: isCyber ? '#18181b' : '#f4f5f7',
    inputTextColor: isCyber ? '#ffffff' : '#09090b',
    chatBotBg: isCyber ? '#1c1c1e' : '#e4e4e7'
  };

  return (
    <div style={{
      margin: 0, padding: 0, boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: currentStyles.bg, color: currentStyles.text,
      minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      
      {/* Botão Superior de Alternância de Modos */}
      <button 
        onClick={() => setTheme(isCyber ? 'creative' : 'cyber')}
        style={{
          position: 'absolute', top: '20px', zIndex: 10,
          padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem',
          cursor: 'pointer', border: currentStyles.border,
          backgroundColor: currentStyles.cardBg, color: currentStyles.primary,
          boxShadow: isCyber ? '0 0 15px rgba(0,242,254,0.1)' : '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        {isCyber ? '⚡ MODO CYBER' : '🎨 MODO CRIATIVO'}
      </button>

      <div style={{
        width: '100%', maxWidth: '420px', height: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '24px', boxSizing: 'border-box', position: 'relative'
      }}>

        {/* FASE 1: OS MANDAMENTOS */}
        {stage === 'mandamentos' && (
          <div style={{
            backgroundColor: currentStyles.cardBg, border: currentStyles.border,
            borderRadius: '24px', padding: '32px 24px', textAlign: 'center',
            boxShadow: isCyber ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.04)'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px', color: currentStyles.primary, marginBottom: '16px' }}>
              {mandamentos[currentMandamento].title}
            </h2>
            <p style={{ color: currentStyles.textMuted, fontSize: '1rem', lineHeight: '1.5', marginBottom: '32px', minHeight: '70px' }}>
              {mandamentos[currentMandamento].desc}
            </p>
            <button onClick={nextMandamento} style={{
              width: '100%', backgroundColor: currentStyles.buttonBg, color: currentStyles.buttonText,
              border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer'
            }}>
              PRÓXIMO
            </button>
          </div>
        )}

        {/* FASE 2: CADASTRO COMPLETO */}
        {stage === 'cadastro' && (
          <form onSubmit={handleCadastro} style={{
            backgroundColor: currentStyles.cardBg, border: currentStyles.border,
            borderRadius: '24px', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px', textAlign: 'center' }}>Crie sua conta</h2>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: currentStyles.textMuted, display: 'block', marginBottom: '6px' }}>NOME COMPLETO</label>
              <input type="text" required style={inputStyle(currentStyles)} placeholder="Seu nome" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: currentStyles.textMuted, display: 'block', marginBottom: '6px' }}>WHATSAPP</label>
              <input type="text" required style={inputStyle(currentStyles)} placeholder="(00) 00000-0000" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: currentStyles.textMuted, display: 'block', marginBottom: '6px' }}>SENHA</label>
              <input type="password" required style={inputStyle(currentStyles)} placeholder="••••••••" />
            </div>
            <button type="submit" style={{
              width: '100%', backgroundColor: currentStyles.buttonBg, color: currentStyles.buttonText,
              border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', marginTop: '8px'
            }}>
              CONTINUAR
            </button>
          </form>
        )}

        {/* FASE 3: CHAT INTELIGENTE */}
        {stage === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', width: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? currentStyles.primary : currentStyles.chatBotBg,
                  color: msg.sender === 'user' ? '#ffffff' : currentStyles.text,
                  padding: '12px 16px', borderRadius: '16px', maxWidth: '80%', fontSize: '0.95rem', lineHeight: '1.4'
                }}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua resposta..." style={inputStyle(currentStyles)}
              />
              <button type="submit" style={{
                backgroundColor: currentStyles.buttonBg, color: currentStyles.buttonText,
                border: 'none', borderRadius: '12px', width: '50px', cursor: 'pointer', fontWeight: 'bold'
              }}>➔</button>
            </form>
          </div>
        )}

        {/* FASE 4: ANIMAÇÃO DE CARREGAMENTO */}
        {stage === 'generating' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px' }}>Gerando seu app</h2>
            <p style={{ color: currentStyles.textMuted, fontSize: '0.9rem', marginBottom: '24px' }}>Criando fluxos e interfaces...</p>
            <div style={{ width: '100%', backgroundColor: currentStyles.inputBg, height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, backgroundColor: currentStyles.primary, height: '100%', transition: 'width 0.3s ease' }}></div>
            </div>
            <span style={{ fontSize: '0.85rem', color: currentStyles.textMuted, marginTop: '8px', display: 'block' }}>{progress}% Concluído</span>
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = (styles) => ({
  width: '100%',
  backgroundColor: styles.inputBg,
  border: styles.border,
  borderRadius: '12px',
  padding: '14px',
  color: styles.inputTextColor,
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box'
});
