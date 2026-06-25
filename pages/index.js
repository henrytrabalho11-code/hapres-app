import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-client';

// Inicializa o Supabase com as variáveis que você configurou na Vercel
const supabaseUrl = process-env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process-env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('next');
  const [theme, setTheme] = useState('cyber'); // 'cyber' ou 'creative'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const nextStep = () => {
    setDirection('next');
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection('prev');
    setStep((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Cadastro realizado com sucesso! Verifique seu e-mail.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Erro ao cadastrar.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme === 'cyber' 
        ? 'linear-gradient(135deg, #0f0c1b 0%, #05020a 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      color: theme === 'cyber' ? '#ffffff' : '#1a1a1a',
      overflow: 'hidden',
      position: 'relative',
      transition: 'all 0.5s ease'
    }}>
      {/* Botão de alternar tema moderno */}
      <button 
        onClick={() => setTheme(theme === 'cyber' ? 'creative' : 'cyber')}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          borderRadius: '30px',
          border: theme === 'cyber' ? '1px solid #00f2fe' : '1px solid #4a90e2',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          color: theme === 'cyber' ? '#00f2fe' : '#4a90e2',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: theme === 'cyber' ? '0 0 15px rgba(0, 242, 254, 0.2)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {theme === 'cyber' ? '⚡ Tema Cyber-Dark' : '🎨 Tema Creative-Bright'}
      </button>

      {/* Container principal Fluido e Responsivo */}
      <div style={{
        width: '90%',
        maxWidth: '450px',
        padding: '40px 30px',
        borderRadius: '24px',
        background: theme === 'cyber' ? 'rgba(20, 16, 38, 0.7)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: theme === 'cyber' ? '1px solid rgba(0, 242, 254, 0.15)' : '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: theme === 'cyber' 
          ? '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255,255,255,0.1)' 
          : '0 20px 50px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        position: 'relative',
        animation: 'fadeIn 0.6s ease-out'
      }}>
        
        {/* PASSO 1: Boas-vindas */}
        {step === 1 && (
          <div style={{ animation: 'slideIn 0.4s ease-out' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: '800', 
              marginBottom: '15px',
              background: theme === 'cyber' ? 'linear-gradient(45deg, #00f2fe, #4facfe)' : 'linear-gradient(45deg, #4a90e2, #50e3c2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              HAPRES SOVEREIGN
            </h1>
            <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '35px', fontSize: '1.05rem' }}>
              A Fábrica de Software Autônoma. Você não escreve código; você dá ordens.
            </p>
            <button onClick={nextStep} style={buttonStyle(theme)}>PRÓXIMO</button>
          </div>
        )}

        {/* PASSO 2: Módulos */}
        {step === 2 && (
          <div style={{ animation: 'slideIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px', color: theme === 'cyber' ? '#00f2fe' : '#4a90e2' }}>
              MÓDULOS VIVOS
            </h2>
            <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '35px', fontSize: '1.05rem' }}>
              Arraste Pix, sistemas de futebol, dízimos e muito mais com um clique.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={prevStep} style={secondaryButtonStyle(theme)}>VOLTAR</button>
              <button onClick={nextStep} style={buttonStyle(theme)}>PRÓXIMO</button>
            </div>
          </div>
        )}

        {/* PASSO 3: Enciclopédia */}
        {step === 3 && (
          <div style={{ animation: 'slideIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '15px', color: theme === 'cyber' ? '#00f2fe' : '#4a90e2' }}>
              ENCICLOPÉDIA DE UM BILHÃO
            </h2>
            <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '35px', fontSize: '1.05rem' }}>
              Qualquer leigo tem a capacidade de criar o aplicativo mais complexo do mundo.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={prevStep} style={secondaryButtonStyle(theme)}>VOLTAR</button>
              <button onClick={nextStep} style={buttonStyle(theme)}>ENTRAR NO HUD</button>
            </div>
          </div>
        )}

        {/* PASSO 4: Cadastro Real */}
        {step === 4 && (
          <div style={{ animation: 'slideIn 0.4s ease-out' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '25px', color: theme === 'cyber' ? '#ff007f' : '#ff4081' }}>
              REGISTRO DE INGRESSO
            </h2>
            
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.8, display: 'block', marginBottom: '8px' }}>E-mail:</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle(theme)}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.8, display: 'block', marginBottom: '8px' }}>Senha:</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle(theme)}
                  placeholder="••••••••"
                />
              </div>

              {message.text && (
                <div style={{
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  backgroundColor: message.type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                  color: message.type === 'success' ? '#4ade80' : '#f87171',
                  border: message.type === 'success' ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(248, 113, 113, 0.3)',
                  textAlign: 'center'
                }}>
                  {message.text}
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="button" onClick={prevStep} style={secondaryButtonStyle(theme)}>VOLTAR</button>
                <button type="submit" disabled={loading} style={buttonStyle(theme)}>
                  {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Estilos CSS Injetados para animações de deslize modernas */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// Estilos dinâmicos auxiliares
function buttonStyle(theme) {
  return {
    flex: 1,
    padding: '15px',
    borderRadius: '14px',
    border: 'none',
    background: theme === 'cyber' ? 'linear-gradient(45deg, #00f2fe, #4facfe)' : 'linear-gradient(45deg, #4a90e2, #50e3c2)',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: theme === 'cyber' ? '0 8px 25px rgba(0, 242, 254, 0.3)' : '0 8px 25px rgba(74, 144, 226, 0.3)',
    transition: 'transform 0.2s ease, opacity 0.2s ease'
  };
}

function secondaryButtonStyle(theme) {
  return {
    padding: '15px 25px',
    borderRadius: '14px',
    border: theme === 'cyber' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
    background: 'transparent',
    color: theme === 'cyber' ? '#ffffff' : '#1a1a1a',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };
}

function inputStyle(theme) {
  return {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: theme === 'cyber' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    background: theme === 'cyber' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
    color: theme === 'cyber' ? '#ffffff' : '#1a1a1a',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box'
  };
}
