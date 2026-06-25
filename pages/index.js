import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { themes } from '../styles/themes';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HapresApp() {
  // Estados do App
  const [currentTheme, setCurrentTheme] = useState(themes.cyberDark);
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

  const onboardingSteps = [
    { title: "HAPRES SOVEREIGN", desc: "A Fábrica de Software Autônoma. Você não escreve código; você dá ordens." },
    { title: "MÓDULOS VIVOS", desc: "Arraste Pix, sistemas de futebol, dízimos e muito mais com um clique." },
    { title: "ENCICLOPÉDIA DE UM BILHÃO", desc: "Qualquer leigo tem a capacidade de criar o aplicativo mais complexo do mundo." }
  ];

  const nextOnboarding = () => {
    if (onboardingIndex < onboardingSteps.length - 1) {
      setOnboardingIndex(onboardingIndex + 1);
    } else {
      setCurrentStep('auth');
    }
  };

  const toggleTheme = () => {
    if (currentTheme.id === 'cyber') {
      setCurrentTheme(themes.brightCreative);
    } else {
      setCurrentTheme(themes.cyberDark);
    }
  };

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

  const sendAiMessage = () => {
    if (!aiMessage) return;
    const newChat = [...aiChat, { role: 'user', text: aiMessage }];
    setAiChat(newChat);
    setAiMessage('');

    setTimeout(() => {
      setAiChat([...newChat, { 
        role: 'assistant', 
        text: `Comando recebido no centro de controle HUD! Aplicando parâmetros no tema atual.` 
      }]);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: currentTheme.background, color: currentTheme.primary, minHeight: '100vh', fontFamily: 'monospace', padding: '20px', transition: 'all 0.3s ease' }}>
      
      {/* BOTÃO GLOBAL DE ALTERNAR TEMA (HUD CONTROLLER) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button onClick={toggleTheme} style={{ background: currentTheme.surface, color: currentTheme.secondary, border: currentTheme.border, padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', boxShadow: currentTheme.shadow }}>
          🔄 INTERMUTAR: {currentTheme.name}
        </button>
      </div>

      {/* 1. TELA DE ONBOARDING */}
      {currentStep === 'onboarding' && (
        <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', border: currentTheme.border, background: currentTheme.surface, padding: '40px', borderRadius: '12px', boxShadow: currentTheme.shadow }}>
          <h1 style={{ color: currentTheme.secondary, letterSpacing: '2px' }}>{onboardingSteps[onboardingIndex].title}</h1>
          <p style={{ color: currentTheme.text, fontSize: '16px', lineHeight: '1.6', margin: '30px 0' }}>{onboardingSteps[onboardingIndex].desc}</p>
          <button onClick={nextOnboarding} style={{ background: 'transparent', border: currentTheme.border, color: currentTheme.primary, padding: '12px 30px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>
            {onboardingIndex === onboardingSteps.length - 1 ? "ENTRAR NO HUD" : "PRÓXIMO"}
          </button>
        </div>
      )}

      {/* 2. TELA DE AUTENTICAÇÃO */}
      {currentStep === 'auth' && (
        <div style={{ maxWidth: '400px', margin: '100px auto', border: currentTheme.border, background: currentTheme.surface, padding: '30px', borderRadius: '8px', boxShadow: currentTheme.shadow }}>
          <h2 style={{ textAlign: 'center', color: currentTheme.secondary }}>REGISTRO DE INGRESSO</h2>
          <div style={{ margin: '20px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: currentTheme.text }}>E-mail:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', background: currentTheme.background, border: currentTheme.border, color: currentTheme.text }} />
          </div>
          <div style={{ margin: '20px 0' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: currentTheme.text }}>Senha:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', background: currentTheme.background, border: currentTheme.border, color: currentTheme.text }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button onClick={() => handleAuth('login')} style={{ background: currentTheme.primary, color: currentTheme.background, padding: '10px 20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>ENTRAR</button>
            <button onClick={() => handleAuth('signup')} style={{ background: 'transparent', color: currentTheme.secondary, padding: '10px 20px', border: currentTheme.border, fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>CADASTRAR</button>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD CENTRAL (HUD) */}
      {currentStep === 'dashboard' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: currentTheme.border, paddingBottom: '15px', marginBottom: '20px' }}>
            <h2 style={{ color: currentTheme.text }}>HAPRES CENTRAL COMMAND {isAdmin && <span style={{ color: currentTheme.secondary }}>(MODO ADM ACTIVE)</span>}</h2>
            <button onClick={() => setCurrentStep('auth')} style={{ background: currentTheme.secondary, color: '#fff', border: 'none', padding: '5px 15px', cursor: 'pointer', borderRadius: '4px' }}>LOGOUT</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' }}>
            
            {/* Esquerda: Módulos OMNI-API */}
            <div style={{ border: currentTheme.border, background: currentTheme.surface, padding: '15px', borderRadius: '6px', boxShadow: currentTheme.shadow }}>
              <h3 style={{ color: currentTheme.primary }}>ARSENAIS OMNI</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                <div style={{ padding: '10px', background: currentTheme.background, borderLeft: `4px solid ${currentTheme.secondary}`, color: currentTheme.text }}>⛪ Módulo Vaticano & Louvor</div>
                <div style={{ padding: '10px', background: currentTheme.background, borderLeft: `4px solid ${currentTheme.secondary}`, color: currentTheme.text }}>⚽ Módulo SofaScore Pro</div>
                <div style={{ padding: '10px', background: currentTheme.background, borderLeft: `4px solid ${currentTheme.secondary}`, color: currentTheme.text }}>💳 Sistema Pix Financeiro</div>
                <div style={{ padding: '10px', background: currentTheme.background, borderLeft: `4px solid ${currentTheme.secondary}`, color: currentTheme.text }}>📈 Bolsa & Cripto Mercado</div>
              </div>
            </div>

            {/* Centro: Canvas HUD do App */}
            <div style={{ border: currentTheme.border, padding: '15px', borderRadius: '6px', textAlign: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: currentTheme.surface, boxShadow: currentTheme.shadow }}>
              <p style={{ color: currentTheme.textMuted }}>[ CANVAS HUB INTERATIVO ]</p>
              <h1 style={{ color: currentTheme.text }}>O SEU APLICATIVO APARECE AQUI</h1>
              <p style={{ color: currentTheme.primary }}>Altere cores, adicione blocos vivos e construa em tempo real.</p>
              <button style={{ margin: '20px auto', background: currentTheme.secondary, color: '#fff', border: 'none', padding: '12px 35px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', boxShadow: currentTheme.shadow }}>
                PUBLIKAR APLICATIVO (PWA)
              </button>
            </div>

            {/* Direita: Assistente Holograma IA */}
            <div style={{ border: currentTheme.border, background: currentTheme.surface, padding: '15px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: currentTheme.shadow }}>
              <div>
                <h3 style={{ color: currentTheme.primary }}>ASSISTENTE IA OMNI</h3>
                <div style={{ height: '300px', overflowY: 'auto', marginTop: '15px', padding: '10px', background: currentTheme.background, borderRadius: '4px' }}>
                  {aiChat.map((msg, index) => (
                    <p key={index} style={{ color: msg.role === 'assistant' ? currentTheme.primary : currentTheme.text, fontSize: '13px' }}>
                      <strong>{msg.role === 'assistant' ? 'IA:' : 'Você:'}</strong> {msg.text}
                    </p>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <input type="text" value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} placeholder="Pergunte como ligar o Pix..." style={{ flexGrow: 1, padding: '8px', background: currentTheme.background, border: currentTheme.border, color: currentTheme.text }} />
                <button onClick={sendAiMessage} style={{ background: currentTheme.secondary, color: '#fff', border: 'none', padding: '0 15px', cursor: 'pointer', borderRadius: '0 4px 4px 0' }}>SEND</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
