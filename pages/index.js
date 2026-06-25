import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // Controle de Fluxo Rígido do Manual
  const [stage, setStage] = useState('overboarding'); // 'overboarding', 'cadastro', 'planopro', 'temaselector', 'tour', 'dashboard'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tourStep, setTourStep] = useState(0);
  const [dashTab, setDashTab] = useState('criar-ia'); 
  const [isAdminMode, setIsAdminMode] = useState(false);

  // --- SISTEMA DE CUSTOMIZAÇÃO TOTAL (CONCEITO CRIATIVO) ---
  const [themeMode, setThemeMode] = useState('apple-dark'); // 'cyber' ou 'apple-dark' (cinza espacial premium)
  const [customPrimary, setCustomPrimary] = useState('#0071e3'); // Cor principal dos botões/destaques
  const [customRadius, setCustomRadius] = useState('14px'); // Estilo dos botões/cards (Arredondado, Quadrado, Extra)
  const [customLayout, setCustomLayout] = useState('moderno'); // 'moderno' ou 'minimalista'

  // Formulário de Cadastro
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados do Chat
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
      if (currentSlide < 2) setCurrentSlide(currentSlide + 1);
      else setStage('cadastro');
    }
    if (touchStartX.current - touchEndX.current < -60) {
      if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    }
  };

  const mandamentos = [
    { title: 'HAPRES SOVEREIGN', desc: 'A Fábrica de Software Autônoma. Você não escreve código; você dá ordens para a máquina criar.' },
    { title: 'MÓDULOS VIVOS', desc: 'Acople Pix automático, sistemas esportivos, plataformas de membros e dízimos com um clique.' },
    { title: 'ENCICLOPÉDIA DE UM BILHÃO', desc: 'Qualquer leigo tem a total capacidade de construir e estruturar o ecossistema mais complexo do planeta.' }
  ];

  const handleCadastroSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validação rígida para ativar o modo ADM secreto conforme seu e-mail/telefone do manual
    const cleanPhone = whatsapp.replace(/\D/g, '');
    if (cleanPhone === '11992819767' || nome.toLowerCase().includes('henry')) {
      setIsAdminMode(true);
    }

    setTimeout(() => {
      setLoading(false);
      setStage('planopro'); // Avança rigorosamente para a tela do Plano Pro
    }, 800);
  };

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'bot', text: `❖ Entendido. Processando matriz conceitual para "${userMsg}". Engenharia de microsserviços sendo estruturada...` }]);
    }, 1000);
  };

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const userMsg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSupportInput('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'bot', text: `Análise concluída: Executando resposta irrestrita para sua dúvida sobre a enciclopédia.` }]);
    }, 1000);
  };

  // --- PALETA DE CORES ATUALIZADA (Fundo Cinza Escuro Premium / Espacial Apple) ---
  const isCyber = themeMode === 'cyber';
  const s = {
    bg: isCyber ? 'radial-gradient(circle at top, #0d061a 0%, #020105 100%)' : '#1c1c1e', // Cinza Espacial Apple Premium
    cardBg: isCyber ? 'rgba(18, 12, 32, 0.85)' : 'rgba(28, 28, 30, 0.95)',
    innerCard: isCyber ? 'rgba(255, 255, 255, 0.03)' : '#2c2c2e', // Containers internos
    text: '#ffffff',
    textMuted: isCyber ? '#94a3b8' : '#aeaeae',
    border: isCyber ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid #3a3a3c',
    buttonBg: customPrimary, 
    buttonText: '#ffffff',
    inputBg: isCyber ? 'rgba(0,0,0,0.4)' : '#2c2c2e',
    radius: customRadius,
    shadow: isCyber ? '0 12px 40px rgba(0, 242, 254, 0.15)' : '0 12px 40px rgba(0, 0, 0, 0.5)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Roboto, sans-serif'
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
        transition: 'all 0.3s ease', overflowX: 'hidden'
      }}
    >
      
      {/* Container Principal do Aplicativo */}
      <div style={{
        width: '100%', maxWidth: '420px', minHeight: '90vh',
        backgroundColor: s.cardBg, border: s.border, borderRadius: s.radius,
        padding: '28px 24px', boxShadow: s.shadow, display: 'flex', flexDirection: 'column',
        boxSizing: 'border-box', backdropFilter: 'blur(30px)', position: 'relative', margin: '16px'
      }}>

        {/* ======================================= */}
        {/* ETAPA 1: OVERBOARDING TOUCH/SWIPE */}
        {/* ======================================= */}
        {stage === 'overboarding' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', color: s.buttonBg }}>HAPRES</span>
            
            <div style={{ margin: '40px 0' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                {mandamentos[currentSlide].title}
              </h2>
              <p style={{ color: s.textMuted, fontSize: '0.95rem', lineHeight: '1.6', minHeight: '80px' }}>
                {mandamentos[currentSlide].desc}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                {[0, 1, 2].map(idx => (
                  <div key={idx} style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: currentSlide === idx ? s.buttonBg : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.2s ease'
                  }}></div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {currentSlide > 0 && (
                  <button onClick={() => setCurrentSlide(currentSlide - 1)} style={{
                    padding: '14px 20px', border: s.border, borderRadius: s.radius,
                    backgroundColor: 'transparent', color: s.text, fontWeight: '600', cursor: 'pointer'
                  }}>VOLTAR</button>
                )}
                <button 
                  onClick={() => currentSlide < 2 ? setCurrentSlide(currentSlide + 1) : setStage('cadastro')}
                  style={{ flex: 1, background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {currentSlide === 2 ? 'CONTINUAR' : 'PRÓXIMO'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 2: CADASTRO COMPLETO (CORRIGIDO) */}
        {/* ======================================= */}
        {stage === 'cadastro' && (
          <form onSubmit={handleCadastroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'center' }}>Crie sua conta</h2>
            
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '6px' }}>NOME COMPLETO</label>
              <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle(s)} placeholder="Seu nome" />
            </div>
            
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '6px' }}>WHATSAPP</label>
              <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={inputStyle(s)} placeholder="(11) 99281-9767" />
            </div>
            
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '6px' }}>SENHA MESTRE</label>
              <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} style={inputStyle(s)} placeholder="••••••••" />
            </div>

            <button type="submit" disabled={loading} style={{ background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
              {loading ? 'SALVANDO PROTOCOLOS...' : 'CONTINUAR PARA O PLANO'}
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
              
              <div style={{ border: s.border, borderRadius: s.radius, padding: '16px', background: s.innerCard, marginBottom: '14px', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 10px 0', color: s.buttonBg }}>★ PLANO PRO (Acesso Vitalício)</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6', color: s.text }}>
                  <li>Criação ilimitada de apps complexos</li>
                  <li>Inclusão de Módulos de Pix e Apostas</li>
                  <li>IA GPT e Claude em altíssima velocidade</li>
                  <li>Exportação e link nativo imediato</li>
                </ul>
              </div>

              <div style={{ border: s.border, borderRadius: s.radius, padding: '16px', background: 'transparent', textAlign: 'left', opacity: 0.4 }}>
                <h4 style={{ margin: '0 0 10px 0' }}>PLANO GRÁTIS</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6', color: s.text }}>
                  <li>Apenas 1 projeto de teste básico</li>
                </ul>
              </div>
            </div>

            <button onClick={() => setStage('temaselector')} style={{ background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: s.radius, padding: '15px', fontWeight: '700', cursor: 'pointer' }}>
              PROSSEGUIR PARA CUSTOMIZAÇÃO DO APP
            </button>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 4: TELA DE ESCOLHA COMPLETA (CRIATIVO) */}
        {/* ======================================= */}
        {stage === 'temaselector' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px', textAlign: 'center' }}>Crie Seu Estilo</h2>
              <p style={{ color: s.textMuted, fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center' }}>Configure cores, botões e layout do próprio Hapres.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. Escolha de Estilo Base */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '8px' }}>ESTILO VISUAL BASE</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setThemeMode('apple-dark')} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: themeMode === 'apple-dark' ? '#3a3a3c' : s.inputBg, border: s.border, color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Cinza Espacial</button>
                    <button type="button" onClick={() => setThemeMode('cyber')} style={{ flex: 1, padding: '10px', borderRadius: '10px', background: themeMode === 'cyber' ? '#3a3a3c' : s.inputBg, border: s.border, color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Cyber Neon</button>
                  </div>
                </div>

                {/* 2. Escolha da Cor Mestra */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '8px' }}>COR DOS BOTÕES E DESTAQUES</label>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                    {['#0071e3', '#ff3b30', '#34c759', '#af52de', '#ff9500', '#00f2fe'].map(color => (
                      <div 
                        key={color} 
                        onClick={() => setCustomPrimary(color)}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: color, cursor: 'pointer', border: customPrimary === color ? '3px solid #fff' : 'none', boxSizing: 'border-box' }}
                      />
                    ))}
                  </div>
                </div>

                {/* 3. Estilo dos Botões */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '8px' }}>ARREDONDAMENTO DAS BORDAS</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setCustomRadius('24px')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: customRadius === '24px' ? '#3a3a3c' : s.inputBg, border: s.border, color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}>Muito Arredondado</button>
                    <button type="button" onClick={() => setCustomRadius('12px')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: customRadius === '12px' ? '#3a3a3c' : s.inputBg, border: s.border, color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}>Suave (Padrão)</button>
                    <button type="button" onClick={() => setCustomRadius('0px')} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: customRadius === '0px' ? '#3a3a3c' : s.inputBg, border: s.border, color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}>Reto / Quadrado</button>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => setStage('tour')} style={{ background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '16px' }}>
              APLICAR MINHA CONFIGURAÇÃO E IR PRO TOUR
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
                <div style={{ background: s.innerCard, border: s.border, borderRadius: s.radius, padding: '16px' }}>
                  <span style={{ fontWeight: '800', color: s.buttonBg, display: 'block', marginBottom: '6px' }}>🤖 Módulo IA Co-Pilot</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: s.text, lineHeight: '1.5' }}>Localizado no topo do painel. Basta digitar em linguagem natural o app que deseja criar e a IA constrói a engenharia em tempo de execução.</p>
                </div>
              )}
              {tourStep === 1 && (
                <div style={{ background: s.innerCard, border: s.border, borderRadius: s.radius, padding: '16px' }}>
                  <span style={{ fontWeight: '800', color: s.buttonBg, display: 'block', marginBottom: '6px' }}>🎨 Construtor Manual Livre</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: s.text, lineHeight: '1.5' }}>Painel estilo "Canva" intuitivo para customizar layouts, botões, conexões de Pix e arrastar funcionalidades complexas sem travas.</p>
                </div>
              )}
              {tourStep === 2 && (
                <div style={{ background: s.innerCard, border: s.border, borderRadius: s.radius, padding: '16px' }}>
                  <span style={{ fontWeight: '800', color: s.buttonBg, display: 'block', marginBottom: '6px' }}>🔮 Suporte Neural Avançado 24h</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: s.text, lineHeight: '1.5' }}>Canal direto aberto para responder instantaneamente qualquer questão da enciclopédia, dúvidas de infraestrutura ou códigos gerados.</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {tourStep > 0 && (
                <button onClick={() => setTourStep(tourStep - 1)} style={{ padding: '14px', border: s.border, background: 'transparent', color: s.text, borderRadius: s.radius, cursor: 'pointer' }}>VOLTAR</button>
              )}
              <button 
                onClick={() => tourStep < 2 ? setTourStep(tourStep + 1) : setStage('dashboard')}
                style={{ flex: 1, background: s.buttonBg, color: s.buttonText, border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700', cursor: 'pointer' }}
              >
                {tourStep === 2 ? 'ACESSAR MEU DASHBOARD' : 'PRÓXIMO'}
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
                <span style={{ fontSize: '0.7rem', color: s.textMuted, fontWeight: '700' }}>SISTEMA ATIVO</span>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>Mestre {nome || 'Henry'}</h3>
              </div>
              <button onClick={() => setStage('temaselector')} style={{ padding: '4px 10px', borderRadius: '20px', border: s.border, background: 'transparent', color: '#fff', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}>
                ⚙ Customizar
              </button>
            </div>

            {/* Menu de Abas */}
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
              <button onClick={() => setDashTab('criar-ia')} style={tabStyle(dashTab === 'criar-ia', s)}>Criador IA</button>
              <button onClick={() => setDashTab('canva')} style={tabStyle(dashTab === 'canva', s)}>Canva Manual</button>
              <button onClick={() => setDashTab('suporte-24h')} style={tabStyle(dashTab === 'suporte-24h', s)}>IA 24h</button>
              {isAdminMode && <button onClick={() => setDashTab('adm')} style={tabStyle(dashTab === 'adm', s)}>Painel ADM</button>}
            </div>

            {/* Conteúdo Dinâmico */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '320px' }}>
              
              {/* ABA: CRIADOR IA */}
              {dashTab === 'criar-ia' && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                    {aiChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? s.buttonBg : s.innerCard, color: '#fff', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', maxWidth: '85%' }}>{msg.text}</div>
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
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                    {supportChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? s.buttonBg : s.innerCard, color: '#fff', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', maxWidth: '85%' }}>{msg.text}</div>
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
                <div style={{ background: s.innerCard, border: s.border, borderRadius: s.radius, padding: '14px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#ff453a', fontSize: '0.9rem' }}>❖ Central Administrativa Superior</h4>
                  <p style={{ color: s.textMuted, fontSize: '0.75rem', margin: '0 0 12px 0' }}>Controle global e irrestrito sobre usuários, créditos e chaves operacionais.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', background: s.inputBg, borderRadius: '6px' }}><span>Usuários Indexados:</span><strong>1.482</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px', background: s.inputBg, borderRadius: '6px' }}><span>Créditos Totais Ativos:</span><strong>Ilimitados</strong></div>
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
  color: '#ffffff',
  border: active ? 'none' : styles.border,
  borderRadius: '10px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
});
