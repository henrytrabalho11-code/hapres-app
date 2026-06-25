import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializa o Supabase com as variáveis corretas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState('cyber'); // 'cyber' ou 'creative'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu e-mail.' });
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
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme === 'cyber' 
        ? 'linear-gradient(135deg, #0f0c1b 0%, #05020a 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      color: theme === 'cyber' ? '#ffffff' : '#1a1a1a',
      transition: 'all 0.5s ease',
      padding: '20px'
    }}>
      {/* Botão de alternar tema */}
      <button 
        type="button"
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
          zIndex: 10
        }}
      >
        {theme === 'cyber' ? '⚡ Cyber-Dark' : '🎨 Creative-Bright'}
      </button>

      {/* Container principal Centralizado e Escalável */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '30px 24px',
        borderRadius: '24px',
        background: theme === 'cyber' ? 'rgba(20, 16, 38, 0.7)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: theme === 'cyber' ? '1px solid rgba(0, 242, 254, 0.15)' : '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: theme === 'cyber' 
          ? '0 20px 50px rgba(0, 0, 0, 0.5)' 
          : '0 20px 50px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        
        {/* PASSO 1 */}
        {step === 1 && (
          <div>
            <h1 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '800', 
              marginBottom: '15px',
              background: theme === 'cyber' ? 'linear-gradient(45deg, #00f2fe, #4facfe)' : 'linear-gradient(45deg, #4a90e2, #50e3c2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              HAPRES SOVEREIGN
            </h1>
            <p style={{ opacity: 0.8, lineHeight: '1.5', marginBottom: '30px', fontSize: '1rem' }}>
              A Fábrica de Software Autônoma. Você não escreve código; você dá ordens.
            </p>
            <button type="button" onClick={nextStep} style={buttonStyle(theme)}>PRÓXIMO</button>
          </div>
        )}

        {/* PASSO 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '15px', color: theme === 'cyber' ? '#00f2fe' : '#4a90e2' }}>
              MÓDULOS VIVOS
            </h2>
            <p style={{ opacity: 0.8, lineHeight: '1.5', marginBottom: '30px', fontSize: '1rem' }}>
              Arraste Pix, sistemas de futebol, dízimos e muito mais com um clique.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={prevStep} style={secondaryButtonStyle(theme)}>VOLTAR</button>
              <button type="button" onClick={nextStep} style={buttonStyle(theme)}>PRÓXIMO</button>
            </div>
          </div>
        )}

        {/* PASSO 3 */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '15px', color: theme === 'cyber' ? '#00f2fe' : '#4a90e2' }}>
              ENCICLOPÉDIA DE UM BILHÃO
            </h2>
            <p style={{ opacity: 0.8, lineHeight: '1.5', marginBottom: '30px', fontSize: '1rem' }}>
              Qualquer leigo tem a capacidade de criar o aplicativo mais complexo do mundo.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={prevStep} style={secondaryButtonStyle(theme)}>VOLTAR</button>
              <button type="button" onClick={nextStep} style={buttonStyle(theme)}>ENTRAR NO HUD</button>
            </div>
          </div>
        )}

        {/* PASSO 4 */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', color: theme === 'cyber' ? '#ff007f' : '#ff4081' }}>
              REGISTRO DE INGRESSO
            </h2>
            
            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600', opacity: 0.8, display: 'block', marginBottom: '6px' }}>E-mail:</label>
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
                <label style={{ fontSize: '0.8rem', fontWeight: '600', opacity: 0.8, display: 'block', marginBottom: '6px' }}>Senha:</label>
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
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  backgroundColor: message.type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                  color: message.type === 'success' ? '#4ade80' : '#f87171',
                  border: message.type === 'success' ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(248, 113, 113, 0.3)',
                  textAlign: 'center'
                }}>
                  {message.text}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '5px' }}>
                <button type="button" onClick={prevStep} style={secondaryButtonStyle(theme)}>VOLTAR</button>
                <button type="submit" disabled={

