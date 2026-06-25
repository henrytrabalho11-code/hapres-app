import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Correção efetuada: utilizando o ponto correto para as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HapresApp() {
  // Estados para gerir a navegação e a essência do app
  const [currentStep, setCurrentStep] = useState('onboarding'); // onboarding, auth, dashboard
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiChat, setAiChat] = useState([
    { role: 'assistant', text: 'Olá! Sou o Assistente IA do Hapres. Como posso ajudar na sua Fábrica de Magia hoje?' }
  ]);

  // Mensagens do Overboarding Dinâmico do manual
  const onboardingSteps = [
    { title: "HAPRES SOVEREIGN", desc: "A Fábrica de Software Autônoma. Você não escreve código; você dá ordens." },
    { title: "MÓDULOS VIVOS", desc: "Arraste Pix, sistemas de futebol, dízimos e muito mais com um clique." },
    { title: "ENCICLOPÉDIA DE UM BILHÃO", desc: "Qualquer leigo tem a capacidade de criar o aplicativo mais complexo do mundo." }
  ];

  // Avançar no onboarding ou ir para autenticação
  const nextOnboarding = () => {
    if (onboardingIndex < onboardingSteps.length - 1) {
      setOnboardingIndex(onboardingIndex + 1);
    } else {
      setCurrentStep('auth');
    }
  };

  // Autenticação direta no Supabase
  const handleAuth = async (type) => {
    if (!email || !password) return alert("Preencha todos os campos!");
    
    let result;
    if (type === 'signup') {
      result = await supabase.auth.signUp({ email, password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    if (result.error) {
      alert("Erro: " + result.error.message);
    } else if (result.data?.user) {
      setUser(result.data.user);
      if (email === 'henryserpa11@gmail.com' || email === 'henrytrabalho11@gmail.com') {
        setIsAdmin(true);
      }
      setCurrentStep('dashboard');
    }
  };

  // Chat com a IA 24 Horas Integrada
  const sendAiMessage = () => {
    if (!aiMessage) return;
    const newChat = [...aiChat, { role: 'user', text: aiMessage }];
    setAiChat(newChat);
    setAiMessage('');

    setTimeout(() => {
      setAiChat([...newChat, { 
        role: 'assistant', 
        text: `Comando recebido no centro de controle HUD! Vou processar a integração do módulo solicitado.` 
      }]);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#0a0a12', color: '#00ffcc', minHeight: '100vh', fontFamily: 'monospace', padding: '20px' }}>
      
      {/* 1. TELA DE ONBOARDING HUD */}
      {currentStep === 'onboarding' && (
        <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', border: '1px solid #00ffcc', padding: '40px', borderRadius: '12px', boxShadow: '0 0 20px #00ffcc44' }}>
          <h1 style={{ color: '#ff007f', letterSpacing: '2px' }}>{onboardingSteps[onboardingIndex].title}</h1>
          <p style={{ color: '#ffffff', fontSize: '16px', lineHeight: '1.6', margin: '30px 0' }}>{onboardingSteps[onboardingIndex].desc}</p>
          <button onClick={nextOnboarding} style={{ background: 'transparent', border: '1px solid #00ffcc', color: '#00ffcc', padding: '12px 30px', cursor: 'pointer', fontWeight: 'bold' }}>
            {onboardingIndex === onboardingSteps.length - 1 ? "ENTRAR NO HUD" : "PRÓXIMO"}
          </button>
        </div>
      )}

      {/* 2. TELA DE AUTENTICAÇÃO */}
      {currentStep === 'auth' && (
        <div style={{ maxWidth: '400px', margin: '100px auto', border: '1px solid #ff007f', padding: '30px', borderRadius: '8px', boxShadow: '0 0 15px #ff007f33' }}>
          <h2 style={{ textAlign: 'center', color: '#ff007f' }}>REGISTRO DE INGRESSO</h2>
          <div style={{ margin: '20px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>E-mail:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', background: '#121225', border: '1px solid #00ffcc', color: '#fff' }} />
          </div>
          <div style={{ margin: '20px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', background: '#121225', border: '1px solid #00ffcc', color: '#fff' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button onClick={() => handleAuth('login')} style={{ background: '#00ffcc', color: '#000', padding: '10px 20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>ENTRAR</button>
            <button onClick={() => handleAuth('signup')} style={{ background: 'transparent', color: '#ff007f', padding: '10px 20px', border: '1px solid #ff007f', fontWeight: 'bold', cursor: 'pointer' }}>CADASTRAR</button>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD CENTRAL (HUD) */}
      {currentStep === 'dashboard' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #00ffcc', paddingBottom: '15px', marginBottom: '20px' }}>
            <h2>HAPRES CENTRAL COMMAND {isAdmin && <span style={{ color: '#ff007f' }}>(MODO ADM ACTIVE)</span>}</h2>
            <button onClick={() => setCurrentStep('auth')} style={{ background: '#ff007f', color: '#fff', border: 'none', padding: '5px 15px', cursor: 'pointer' }}>LOGOUT</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' }}>
            
            {/* Esquerda: Módulos OMNI-API */}
            <div style={{ border: '1px solid #00ffcc', padding: '15px', borderRadius: '6px' }}>
              <h3>ARSENAIS OMNI</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                <div style={{ padding: '10px', background: '#121225', borderLeft: '4px solid #ff007f' }}>⛪ Módulo Vaticano & Louvor</div>
                <div style={{ padding: '10px', background: '#121225', borderLeft: '4px solid #ff007f' }}>⚽ Módulo SofaScore Pro</div>
                <div style={{ padding: '10px', background: '#121225', borderLeft: '4px solid #ff007f' }}>💳 Sistema Pix Financeiro</div>
                <div style={{ padding: '10px', background: '#121225', borderLeft: '4px solid #ff007f' }}>📈 Bolsa & Cripto Mercado</div>
              </div>
            </div>

            {/* Centro: Canvas HUD do App */}
            <div style={{ border: '1px solid #00ffcc', padding: '15px', borderRadius: '6px', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#050510' }}>
              <p style={{ color: '#888' }}>[ CANVAS HUB INTERATIVO ]</p>
              <h1 style={{ color: '#ffffff' }}>O SEU APLICATIVO APARECE AQUI</h1>
              <p style={{ color: '#00ffcc' }}>Altere cores, adicione blocos vivos e construa em tempo real.</p>
              <button style={{ margin: '20px auto', background: '#ff007f', color: '#fff', border: 'none', padding: '12px 35px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', boxShadow: '0 0 15px #ff007f' }}>
                PUBLIKAR APLICATIVO (PWA)
              </button>
            </div>

            {/* Direita: Assistente Holograma IA */}
            <div style={{ border: '1px solid #ff007f', padding: '15px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3>ASSISTENTE IA OMNI</h3>
                <div style={{ height: '300px', overflowY: 'auto', marginTop: '15px', padding: '10px', background: '#121225', borderRadius: '4px' }}>
                  {aiChat.map((msg, index) => (
                    <p key={index} style={{ color: msg.role === 'assistant' ? '#00ffcc' : '#ffffff', fontSize: '13px' }}>
                      <strong>{msg.role === 'assistant' ? 'IA:' : 'Você:'}</strong> {msg.text}
                    </p>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <input type="text" value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} placeholder="Pergunte como ligar o Pix..." style={{ flexGrow: 1, padding: '8px', background: '#0a0a12', border: '1px solid #ff007f', color: '#fff' }} />
                <button onClick={sendAiMessage} style={{ background: '#ff007f', color: '#fff', border: 'none', padding: '0 15px', cursor: 'pointer' }}>SEND</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

