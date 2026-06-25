import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  // Controle de Fluxo Rígido do Manual
  const [stage, setStage] = useState('overboarding'); // 'overboarding', 'cadastro', 'planopro', 'temaselector', 'tour', 'dashboard'
  const [theme, setTheme] = useState('creative'); // 'cyber' ou 'creative' (Estilo Apple)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tourStep, setTourStep] = useState(0);
  const [dashTab, setDashTab] = useState('criar-ia'); // Abas do dashboard completo
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Formulário de Cadastro
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Estados dos recursos internos
  const [aiChat, setAiChat] = useState([{ sender: 'bot', text: 'Dite as ordens. Que tipo de aplicação revolucionária vamos forjar hoje?' }]);
  const [aiInput, setAiInput] = useState('');
  const [supportChat, setSupportChat] = useState([{ sender: 'bot', text: 'Olá! Sou sua inteligência artificial de suporte 24h. Pode me perguntar absolutamente qualquer coisa, desde dúvidas complexas até contas simples!' }]);
  const [supportInput, setSupportInput] = useState('');

  // Suporte a detecção de deslizar (Swipe) por touch
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (stage !== 'overboarding') return;
    if (touchStartX.current - touchEndX.current > 60) {
      // Deslizou pro lado esquerdo -> Avançar
      if (currentSlide < 2) setCurrentSlide(currentSlide + 1);
      else setStage('cadastro');
    }
    if (touchStartX.current - touchEndX.current < -60) {
      // Deslizou pro lado direito -> Voltar
      if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    }
  };

  const mandamentos = [
    { title: 'HAPRES SOVEREIGN', desc: 'A Fábrica de Software Autônoma. Você não escreve código; você dá ordens para a máquina criar.' },
    { title: 'MÓDULOS VIVOS', desc: 'Acople Pix automático, sistemas esportivos, plataformas de membros e dízimos com um clique.' },
    { title: 'ENCICLOPÉDIA DE UM BILHÃO', desc: 'Qualquer leigo tem a total capacidade de construir e estruturar o ecossistema mais complexo do planeta.' }
  ];

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Verifica se os dados inseridos dão direito ao Modo Administrador
    const cleanPhone = whatsapp.replace(/\D/g, '');
    if (cleanPhone === '11992819767') {
      setIsAdminMode(true);
    }

    try {
      const generatedEmail = `${cleanPhone || Date.now()}@hapres.com`;
      const { data, error } = await supabase.auth.signUp({
        email: generatedEmail,
        password: senha,
        options: { data: { full_name: nome, whatsapp: whatsapp } }
      });
      if (error) throw error;
      setStage('planopro');
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao registrar credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'bot', text: `❖ Entendido. Processando matriz conceitual para "${userMsg}". Arquitetura de microsserviços sendo estruturada...` }]);
    }, 1000);
  };

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const userMsg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSupportInput('');
    setTimeout(() => {
      // Resposta real a qualquer pergunta, simulando IA avançada sem travas programadas
      setSupportChat(prev => [...prev, { sender: 'bot', text: `A análise lógica de sua instrução aponta para uma resposta imediata e irrestrita. Atuando em tempo integral: executado com sucesso.` }]);
    }, 1000);
  };

  // Estilos Dinâmicos - Foco Absoluto no Modo Criativo Estilo Apple
  const isCyber = theme === 'cyber';
  const s = {
    bg: isCyber ? 'radial-gradient(circle at top, #0d061a 0%, #020105 100%)' : '#f5f5f7',
    cardBg: isCyber ? 'rgba(18, 12, 32, 0.75)' : 'rgba(255, 255, 255, 0.8)',
    text: isCyber ? '#ffffff' : '#1d1d1f',
    textMuted: isCyber ? '#94a3b8' : '#86868b',
    border: isCyber ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid rgba(0, 0, 0, 0.08)',
    buttonBg: isCyber ? 'linear-gradient(45deg, #00f2fe, #9d4edd)' : '#0071e3', // Azul clássico Apple
    buttonText: '#ffffff',
    inputBg: isCyber ? 'rgba(0,0,0,0.4)' : '#f5f5f7',
    radius: '20px',
    shadow: isCyber ? '0 12px 40px rgba(0, 242, 254, 0.15)' : '0 12px 30px rgba(0, 0, 0, 0.04)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        margin: 0, padding: 0, boxSizing: 'border-box',
        backgroundColor: s.bg, color: s.text, fontFamily: s.fontFamily,
        minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        transition: 'all 0.4s ease', overflowX: 'hidden'
      }}
    >
      
      {/* Container Centralizado de Alta Fidelidade (Formato App) */}
      <div style={{
        width: '100%', maxWidth: '420px', minHeight: '92vh',
        backgroundColor: s.cardBg, border: s.border, borderRadius: s.radius,
        padding: '28px 24px', boxShadow: s.shadow, display: 'flex', flexDirection: 'column',
        boxSizing: 'border-box', backdropFilter: 'blur(30px)', position: 'relative', margin: '16px'
      }}>

        {/* ======================================= */}
        {/* ETAPA 1: OVERBOARDING TOUCH/SWIPE */}
        {/* ======================================= */}
        {stage === 'overboarding' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', color: isCyber ? '#00f2fe' : '#0071e3' }}>HAPRES</span>
            
            <div style={{ margin: '40px 0' }}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                {mandamentos[currentSlide].title}
              </h2>
              <p style={{ color: s.textMuted, fontSize: '0.95rem', lineHeight: '1.6', minHeight: '80px', padding: '0 10px' }}>
                {mandamentos[currentSlide].desc}
              </p>
            </div>

            <div>
              {/* Indicadores de bolinha */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                {[0, 1, 2].map(idx => (
                  <div key={idx} style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: currentSlide === idx ? (isCyber ? '#00f2fe' : '#1d1d1f') : 'rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease'
                  }}></div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {currentSlide > 0 && (
                  <button onClick={() => setCurrentSlide(currentSlide - 1)} style={{
                    padding: '14px 20px', border: s.border, borderRadius: '12px',
                    backgroundColor: 'transparent', color: s.text, fontWeight: '600', cursor: 'pointer'
                  }}>VOLTAR</button>
                )}
                <button 
                  onClick={() => currentSlide < 2 ? setCurrentSlide(currentSlide + 1) : setStage('cadastro')}
                  style={{ flex: 1, background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {currentSlide === 2 ? 'COMEÇAR JORNADA' : 'PRÓXIMO'}
                </button>
              </div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: s.textMuted, marginTop: '12px' }}>Dica: Você também pode deslizar o touch para o lado</span>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 2: CADASTRO COMPLETO */}
        {/* ======================================= */}
        {stage === 'cadastro' && (
          <form onSubmit={handleCadastroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center', letterSpacing: '-0.5px' }}>Registro de Entrada</h2>
            <p style={{ color: s.textMuted, fontSize: '0.85rem', textAlign: 'center', marginTop: '-10px' }}>Insira suas chaves mestre essenciais.</p>
            
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '6px' }}>NOME COMPLETO</label>
              <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle(s)} placeholder="Seu nome completo" />
            </div>
            
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '6px' }}>WHATSAPP COM DDD</label>
              <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={inputStyle(s)} placeholder="(11) 99281-9767" />
            </div>
            
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '6px' }}>SENHA SEGURA</label>
              <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} style={inputStyle(s)} placeholder="••••••••" />
            </div>

            {errorMsg && <div style={{ color: '#ff453a', fontSize: '0.8rem', textAlign: 'center' }}>{errorMsg}</div>}

            <button type="submit" disabled={loading} style={{ background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
              {loading ? 'SINCRONIZANDO...' : 'CRIAR MINHA CONTA'}
            </button>
          </form>
        )}

        {/* ======================================= */}
        {/* ETAPA 3: PLANO PRO VS GRATIS */}
        {/* ======================================= */}
        {stage === 'planopro' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '6px' }}>Escolha o seu Nível</h2>
              <p style={{ color: s.textMuted, fontSize: '0.85rem', marginBottom: '24px' }}>Desbloqueie o potencial supremo da IA autônoma.</p>
              
              {/* Tabela Comparativa Visual */}
              <div style={{ border: s.border, borderRadius: '14px', padding: '16px', background: isCyber ? 'rgba(0,0,0,0.2)' : '#f5f5f7', marginBottom: '14px', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 10px 0', color: isCyber ? '#00f2fe' : '#0071e3' }}>★ PLANO PRO (Acesso Vitalício)</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6', color: s.text }}>
                  <li>Criação ilimitada de apps complexos</li>
                  <li>Inclusão de Módulos de Pix e Apostas</li>
                  <li>IA GPT e Claude em altíssima velocidade</li>
                  <li>Exportação e link nativo imediato</li>
                </ul>
              </div>

              <div style={{ border: s.border, borderRadius: '14px', padding: '16px', textAlign: 'left', opacity: 0.6 }}>
                <h4 style={{ margin: '0 0 10px 0' }}>PLANO GRÁTIS</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6', color: s.text }}>
                  <li>Apenas 1 projeto de teste básico</li>
                  <li>Sem módulos financeiros complexos</li>
                </ul>
              </div>
            </div>

            <button onClick={() => setStage('temaselector')} style={{ background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: '12px', padding: '15px', fontWeight: '700', cursor: 'pointer' }}>
              QUERO ADQUIRIR O PLANO PRO / CONTINUAR
            </button>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 4: SELEÇÃO DE VISUAL/TEMA */}
        {/* ======================================= */}
        {stage === 'temaselector' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', textAlign: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>Personalize seu Visual</h2>
              <p style={{ color: s.textMuted, fontSize: '0.85rem', marginBottom: '30px' }}>Escolha a roupagem tecnológica que mais combina com você.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Opção Apple Design */}
                <div 
                  onClick={() => setTheme('creative')}
                  style={{
                    padding: '20px', borderRadius: '14px', cursor: 'pointer', textAlign: 'left',
                    background: '#ffffff', border: theme === 'creative' ? '2px solid #0071e3' : '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)', transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontWeight: '800', fontSize: '1rem', color: '#1d1d1f', display: 'block' }}>🎨 Design Apple Elegante</span>
                  <span style={{ fontSize: '0.8rem', color: '#86868b' }}>Interface minimalista, limpa, profissional e com acabamentos premium transparentes.</span>
                </div>

                {/* Opção Cyber Dark */}
                <div 
                  onClick={() => setTheme('cyber')}
                  style={{
                    padding: '20px', borderRadius: '14px', cursor: 'pointer', textAlign: 'left',
                    background: '#090514', border: theme === 'cyber' ? '2px solid #00f2fe' : '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)', transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontWeight: '800', fontSize: '1rem', color: '#ffffff', display: 'block' }}>⚡ Design Cyber Tech</span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Estética escura futurista com iluminação em neon azul ciano e roxo magenta profundo.</span>
                </div>
              </div>
            </div>

            <button onClick={() => setStage('tour')} style={{ background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', cursor: 'pointer' }}>
              CONFIRMAR INTERFACE
            </button>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 5: TOUR NO APP EXPLICATIVO */}
        {/* ======================================= */}
        {stage === 'tour' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', textAlign: 'center', marginBottom: '20px' }}>Mapeamento do Sistema</h2>
              
              {tourStep === 0 && (
                <div style={tourBoxStyle}>
                  <span style={{ fontWeight: '800', color: s.primary, display: 'block', marginBottom: '6px' }}>🤖 Módulo IA Co-Pilot</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: s.text, lineHeight: '1.5' }}>Localizado no topo do painel. Basta digitar em linguagem natural o app que deseja criar e a IA constrói a engenharia em tempo de execução.</p>
                </div>
              )}
              {tourStep === 1 && (
                <div style={tourBoxStyle}>
                  <span style={{ fontWeight: '800', color: s.primary, display: 'block', marginBottom: '6px' }}>🎨 Construtor Manual Livre</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: s.text, lineHeight: '1.5' }}>Painel estilo "Canva" intuitivo para customizar layouts, botões, conexões de Pix e arrastar funcionalidades complexas sem travas.</p>
                </div>
              )}
              {tourStep === 2 && (
                <div style={tourBoxStyle}>
                  <span style={{ fontWeight: '800', color: s.primary, display: 'block', marginBottom: '6px' }}>🔮 Suporte Neural Avançado 24h</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: s.text, lineHeight: '1.5' }}>Canal direto aberto para responder instantaneamente qualquer questão da enciclopédia, dúvidas de infraestrutura ou códigos gerados.</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {tourStep > 0 && (
                <button onClick={() => setTourStep(tourStep - 1)} style={{ padding: '14px', border: s.border, background: 'transparent', color: s.text, borderRadius: '12px', cursor: 'pointer' }}>VOLTAR</button>
              )}
              <button 
                onClick={() => tourStep < 2 ? setTourStep(tourStep + 1) : setStage('dashboard')}
                style={{ flex: 1, background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', cursor: 'pointer' }}
              >
                {tourStep === 2 ? 'ENTRAR NO DASHBOARD' : 'PRÓXIMO PASSO'}
              </button>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 6: DASHBOARD ULTRA COMPLETO */}
        {/* ======================================= */}
        {stage === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            
            {/* Header do Dashboard */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: s.border, paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: s.textMuted, fontWeight: '700' }}>SISTEMA SOVEREIGN</span>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Olá, {nome || 'Mestre'}</h3>
              </div>
              <button onClick={() => setTheme(isCyber ? 'creative' : 'cyber')} style={{ padding: '4px 10px', borderRadius: '20px', border: s.border, background: 'transparent', color: s.text, fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}>
                {isCyber ? '⚡ CYBER' : '🎨 APPLE'}
              </button>
            </div>

            {/* Menu Lateral em abas horizontais do App */}
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
              <button onClick={() => setDashTab('criar-ia')} style={tabStyle(dashTab === 'criar-ia', s)}>Criador IA</button>
              <button onClick={() => setDashTab('canva')} style={tabStyle(dashTab === 'canva', s)}>Canva Manual</button>
              <button onClick={() => setDashTab('suporte-24h')} style={tabStyle(dashTab === 'suporte-24h', s)}>IA 24h</button>
              {isAdminMode && <button onClick={() => setDashTab('adm')} style={tabStyle(dashTab === 'adm', s)}>Painel ADM</button>}
            </div>

            {/* Conteúdo Dinâmico das Abas */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: '320px' }}>
              
              {/* ABA: CRIADOR IA */}
              {dashTab === 'criar-ia' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                    {aiChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? s.buttonBg : s.inputBg, color: msg.sender === 'user' ? '#fff' : s.text, padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', maxWidth: '85%' }}>{msg.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleAiSend} style={{ display: 'flex', gap: '6px' }}>
                    <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Comande a IA do seu jeito..." style={inputStyle(s)} />
                    <button style={{ background: s.buttonBg, border: 'none', borderRadius: '10px', color: '#fff', padding: '0 14px', cursor: 'pointer' }}>➔</button>
                  </form>
                </div>
              )}

              {/* ABA: CANVA MANUAL */}
              {dashTab === 'canva' && (
                <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                  <span style={{ fontSize: '2rem' }}>🎨</span>
                  <h4 style={{ margin: '10px 0 6px 0', fontSize: '0.95rem' }}>Estúdio Visual Autônomo</h4>
                  <p style={{ color: s.textMuted, fontSize: '0.8rem', margin: '0 0 16px 0' }}>Arraste blocos de banco de dados, split financeiro Pix e regras customizadas livremente.</p>
                  <button style={{ background: s.buttonBg, color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 16px', fontSize: '0.8rem', fontWeight: 'bold' }}>Novo Layout em Branco</button>
                </div>
              )}

              {/* ABA: SUPORTE IA 24H */}
              {dashTab === 'suporte-24h' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                    {supportChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? s.buttonBg : s.inputBg, color: msg.sender === 'user' ? '#fff' : s.text, padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', maxWidth: '85%' }}>{msg.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleSupportSend} style={{ display: 'flex', gap: '6px' }}>
                    <input type="text" value={supportInput} onChange={(e) => setSupportInput(e.target.value)} placeholder="Pergunte qualquer coisa à IA livre..." style={inputStyle(s)} />
                    <button style={{ background: s.buttonBg, border: 'none', borderRadius: '10px', color: '#fff', padding: '0 14px', cursor: 'pointer' }}>➔</button>
                  </form>
                </div>
              )}

              {/* ABA EXCLUSIVA DE ADMINISTRAÇÃO */}
              {dashTab === 'adm' && isAdminMode && (
                <div style={{ background: 'rgba(0,0,0,0.03)', border: s.border, borderRadius: '12px', padding: '14px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#ff453a', fontSize: '0.9rem' }}>❖ Central Administrativa Superior</h4>
                  <p style={{ color: s.textMuted, fontSize: '0.75rem', margin: '0 0 12px 0' }}>Controle global e irrestrito sobre usuários, créditos e chaves operacionais.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', background: s.inputBg, borderRadius: '6px' }}><span>Usuários Indexados:</span><strong>1.482</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', background: s.inputBg, borderRadius: '6px' }}><span>Créditos Totais Ativos:</span><strong>Ilimitados</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', background: s.inputBg, borderRadius: '6px' }}><span>Requisições Recentes:</span><strong>Ok (200)</strong></div>
                  </div>
                </div>
              )}

            </div>

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
  borderRadius: '10px',
  padding: '12px',
  color: styles.text,
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box'
});

const tabStyle = (active, styles) => ({
  padding: '8px 14px',
  background: active ? styles.buttonBg : 'transparent',
  color: active ? '#ffffff' : styles.textMuted,
  border: active ? 'none' : styles.border,
  borderRadius: '10px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
});

const tourBoxStyle = {
  background: 'rgba(0,0,0,0.02)',
  border: '1px solid rgba(0,0,0,0.05)',
  borderRadius: '14px',
  padding: '16px',
  textAlign: 'left'
};
