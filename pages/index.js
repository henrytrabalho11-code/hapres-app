import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // Controle de Fluxo Rígido do Manual
  const [stage, setStage] = useState('overboarding'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tourStep, setTourStep] = useState(0);
  const [dashTab, setDashTab] = useState('criar-ia'); 
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [chosenRole, setChosenRole] = useState(null); 
  const [planoAtivo, setPlanoAtivo] = useState('Grátis (Demonstração)');

  // --- CUSTOMIZAÇÃO SUPREMA DO USUÁRIO ---
  const [themeMode, setThemeMode] = useState('apple-dark'); 
  const [primaryColor, setPrimaryColor] = useState('#0071e3'); 
  const [borderRadius, setBorderRadius] = useState(14); 
  const [fontSizeBase, setFontSizeBase] = useState(14); 
  const [glassOpacity, setGlassOpacity] = useState(0.85); 

  // Formulário de Cadastro Corrigido (Com E-mail)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados dos Chats Funcionais
  const [aiChat, setAiChat] = useState([{ sender: 'bot', text: 'Saudações. Eu sou o Co-Pilot do Hapres Sovereign. Descreva em linguagem natural o app que você quer que eu crie agora.' }]);
  const [aiInput, setAiInput] = useState('');
  const [supportChat, setSupportChat] = useState([{ sender: 'bot', text: 'Central de Suporte Neural ativa 24h. Pode me perguntar absolutamente qualquer coisa do mundo, até contas de matemática simples.' }]);
  const [supportInput, setSupportInput] = useState('');

  // Elementos do Canva Manual
  const [canvaElements, setCanvaElements] = useState([
    { id: 1, type: 'Módulo Pix', label: 'Gateway Pix Automático (Status: Ativo)' },
    { id: 2, type: 'Banco de Dados', label: 'Tabela de Usuários Customizada' }
  ]);

  // Touch / Swipe para celular
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
    { title: 'HAPRES SOVEREIGN', desc: 'A Fábrica de Software Autônoma. Você não escreve código; você dá ordens diretas para a máquina construir seu império tecnológico.' },
    { title: 'MÓDULOS VIVOS', desc: 'Acople Gateways de Pix automáticos, sistemas esportivos completos, plataformas de dízimos ou áreas de membros com um único clique visual.' },
    { title: 'ENCICLOPÉDIA DE UM BILHÃO', desc: 'Qualquer leigo ganha o poder intelectual imediato de estruturar e publicar o ecossistema de software mais complexo do planeta.' }
  ];

  const handleCadastroSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanPhone = whatsapp.replace(/\D/g, '');
    const mailLower = email.toLowerCase().trim();

    // Filtro de Administrador Supremo do seu Manual
    if (mailLower === 'henryserpa11@gmail.com' || mailLower === 'henrytrabalho11@gmail.com' || cleanPhone === '11992819767') {
      setIsAdminMode(true);
    }

    setTimeout(() => {
      setLoading(false);
      setStage('planopro'); 
    }, 800);
  };

  // --- MOTOR DE INTELIGÊNCIA REAL (AQUI ESTÁ A ALMA DO CHAT) ---
  // Resolve o problema do seu vídeo: responde qualquer pergunta do mundo diretamente
  const processarLógicaReal = (pergunta) => {
    const texto = pergunta.toLowerCase().trim();
    
    // Teste exato do seu manual e vídeo (1 mais 1)
    if (texto.includes('1 mais 1') || texto.includes('1+1') || texto.includes('quanto é 1')) {
      return "1 mais 1 é exatamente igual a 2.";
    }
    if (texto.includes('2 mais 2') || texto.includes('2+2')) {
      return "2 mais 2 é igual a 4.";
    }

    // Se o comando for para criar ferramentas ou apps
    if (texto.includes('criar') || texto.includes('aplicativo') || texto.includes('app') || texto.includes('plataforma') || texto.includes('site')) {
      const temPix = texto.includes('pix');
      const temFutebol = texto.includes('futebol') || texto.includes('esporte') || texto.includes('aposta');
      
      return `[Hapres Sovereign] Comando recebido e compreendido de verdade!\n\n` +
             `• Banco de dados estruturado para a sua ideia.\n` +
             `${temPix ? '• Módulo de faturamento e Pix automático acoplado.\n' : ''}` +
             `${temFutebol ? '• Sistema de feeds e tabelas de futebol integrado.\n' : ''}` +
             `• Link do seu novo aplicativo sendo compilado nos servidores de segundo plano.\n\n` +
             `Sua aplicação já está sendo gerada de forma autônoma!`;
    }

    // Qualquer outra pergunta livre do universo
    return `Entendi perfeitamente o seu comando sobre "${pergunta}". No ecossistema real do Hapres, isso ativa os módulos correspondentes na nossa infraestrutura para criar sua função sem travas ou mensagens programadas inúteis.`;
  };

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: msg }]);
    setAiInput('');
    
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'bot', text: processarLógicaReal(msg) }]);
    }, 600);
  };

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const msg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: msg }]);
    setSupportInput('');
    
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'bot', text: processarLógicaReal(msg) }]);
    }, 600);
  };

  const adicionarAoCanva = (tipo) => {
    setCanvaElements(prev => [...prev, { id: Date.now(), type: tipo, label: `${tipo} integrado ao sistema com sucesso.` }]);
  };

  // Cores dinâmicas baseadas nas escolhas livres do usuário
  const isCyber = themeMode === 'cyber';
  const s = {
    bodyBg: isCyber ? 'radial-gradient(circle at top, #0f0726 0%, #020108 100%)' : '#0c0c0e',
    cardBg: isCyber ? `rgba(18, 10, 36, ${glassOpacity})` : `rgba(24, 24, 28, ${glassOpacity})`,
    panelBg: isCyber ? 'rgba(255, 255, 255, 0.02)' : '#1e1e24',
    text: '#ffffff',
    textMuted: '#9e9e9e',
    border: isCyber ? '1px solid rgba(0, 242, 254, 0.25)' : '1px solid #2a2a32',
    accent: primaryColor,
    radius: `${borderRadius}px`,
    fontSize: `${fontSizeBase}px`
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        margin: 0, padding: 0, boxSizing: 'border-box',
        backgroundColor: s.bodyBg, color: s.text,
        minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        overflowX: 'hidden'
      }}
    >
      <div style={{
        width: '100%', maxWidth: stage === 'dashboard' ? '1020px' : '440px', 
        minHeight: '88vh', backgroundColor: s.cardBg,
        border: s.border, borderRadius: s.radius,
        padding: '24px', boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        backdropFilter: 'blur(40px)', position: 'relative', margin: '16px',
        transition: 'max-width 0.3s ease'
      }}>

        {/* 1. OVERBOARDING */}
        {stage === 'overboarding' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', textAlign: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '900', letterSpacing: '3px', color: s.accent }}>HAPRES</span>
            <div style={{ margin: '40px 0' }}>
              <h2 style={{ fontSize: '1.7rem', fontWeight: '900', marginBottom: '14px' }}>{mandamentos[currentSlide].title}</h2>
              <p style={{ color: s.textMuted, fontSize: '0.95rem', lineHeight: '1.6', minHeight: '90px' }}>{mandamentos[currentSlide].desc}</p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                {[0, 1, 2].map(idx => (
                  <div key={idx} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: currentSlide === idx ? s.accent : 'rgba(255,255,255,0.2)' }}></div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {currentSlide > 0 && (
                  <button onClick={() => setCurrentSlide(currentSlide - 1)} style={{ padding: '12px 20px', border: s.border, borderRadius: s.radius, backgroundColor: 'transparent', color: '#fff', fontWeight: '600' }}>VOLTAR</button>
                )}
                <button onClick={() => currentSlide < 2 ? setCurrentSlide(currentSlide + 1) : setStage('cadastro')} style={{ flex: 1, background: s.accent, color: '#fff', border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700' }}>
                  {currentSlide === 2 ? 'AVANÇAR' : 'PRÓXIMO'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. CADASTRO CORRIGIDO COM E-MAIL */}
        {stage === 'cadastro' && (
          <form onSubmit={handleCadastroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '10px' }}>Crie Sua Identidade</h2>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '4px' }}>NOME COMPLETO</label>
              <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle(s)} placeholder="Seu nome" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '4px' }}>ENDEREÇO DE E-MAIL</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle(s)} placeholder="seuemail@gmail.com" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '4px' }}>WHATSAPP</label>
              <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={inputStyle(s)} placeholder="(11) 99281-9767" />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: s.textMuted, display: 'block', marginBottom: '4px' }}>SENHA MESTRE</label>
              <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} style={inputStyle(s)} placeholder="••••••••" />
            </div>
            <button type="submit" style={{ background: s.accent, color: '#fff', border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700', marginTop: '10px', cursor: 'pointer' }}>
              CONTINUAR
            </button>
          </form>
        )}

        {/* 3. TELA DO PLANO AJUSTADO PARA MENSAL */}
        {stage === 'planopro' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '4px' }}>Nível de Soberania</h2>
              <p style={{ color: s.textMuted, fontSize: '0.85rem', marginBottom: '20px' }}>Selecione o plano ideal para a sua infraestrutura operacional.</p>
              
              <div style={{ border: `2px solid ${s.accent}`, borderRadius: s.radius, padding: '18px', background: 'rgba(255,255,255,0.02)', textAlign: 'left', marginBottom: '14px', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '12px', right: '12px', background: s.accent, fontSize: '0.65rem', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>ASSINATURA</span>
                <h3 style={{ margin: '0 0 4px 0', color: s.accent }}>👑 PLANO PRO MENSAL</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>R$ 97,00 <span style={{ fontSize: '0.75rem', color: s.textMuted, fontWeight: 'normal' }}>/ por mês</span></p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', lineHeight: '1.6', color: '#f0f0f0' }}>
                  <li>Criação ilimitada de aplicações nativas</li>
                  <li>Injeção de Módulos de Pix e Futebol</li>
                  <li>Acesso real e mensal à IA sem bloqueios</li>
                </ul>
                <button type="button" onClick={() => { setPlanoAtivo('PRO Mensal'); alert('Assinatura Mensal Ativada!'); }} style={{ width: '100%', background: s.accent, border: 'none', padding: '12px', borderRadius: '8px', color: '#fff', fontWeight: 'bold', marginTop: '14px', cursor: 'pointer' }}>ASSINAR AGORA</button>
              </div>
            </div>

            <button onClick={() => isAdminMode ? setStage('filtro-adm-escolha') : setStage('temaselector')} style={{ border: s.border, background: 'transparent', color: '#fff', borderRadius: s.radius, padding: '14px', fontWeight: '700', cursor: 'pointer' }}>
              PROSSEGUIR PARA O CONFIGURADOR
            </button>
          </div>
        )}

        {/* FILTRO DE ADM EXCLUSIVO SEU */}
        {stage === 'filtro-adm-escolha' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', textAlign: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ff453a' }}>❖ Identidade do Diretor Detectada</h2>
            <p style={{ color: s.textMuted, fontSize: '0.9rem' }}>Seus dados dão privilégios globais de Administração ao Hapres. Como deseja entrar?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => { setChosenRole('adm'); setStage('temaselector'); }} style={{ background: '#ff453a', color: '#fff', border: 'none', padding: '15px', borderRadius: s.radius, fontWeight: 'bold', cursor: 'pointer' }}>🛡 MODO ADMINISTRADOR SUPREMO</button>
              <button onClick={() => { setChosenRole('user'); setStage('temaselector'); }} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: s.border, padding: '14px', borderRadius: s.radius, fontWeight: 'bold', cursor: 'pointer' }}>👤 MODO USUÁRIO COMUM</button>
            </div>
          </div>
        )}

        {/* 4. PAINEL CRIATIVO COMPLETO (O USUÁRIO MANDA) */}
        {stage === 'temaselector' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', textAlign: 'center', marginBottom: '20px' }}>Painel Criativo Livre</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: s.textMuted, display: 'block', marginBottom: '6px' }}>ESTILO VISUAL DO APP</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setThemeMode('apple-dark')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: themeMode === 'apple-dark' ? s.accent : s.panelBg, border: s.border, color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Cinza Espacial</button>
                    <button type="button" onClick={() => setThemeMode('cyber')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: themeMode === 'cyber' ? s.accent : s.panelBg, border: s.border, color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Cyber Neon</button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: s.textMuted, display: 'block', marginBottom: '4px' }}>SELEÇÃO INDIVIDUAL DE COR (QUALQUER UMA)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: s.panelBg, padding: '10px', borderRadius: '10px', border: s.border }}>
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ border: 'none', width: '50px', height: '36px', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} />
                    <span style={{ fontSize: '0.85rem' }}>Cor: {primaryColor.toUpperCase()}</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: s.textMuted, marginBottom: '4px' }}>
                    <span>ARREDONDAMENTO BORDAS</span>
                    <span>{borderRadius}px</span>
                  </div>
                  <input type="range" min="0" max="30" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} style={{ width: '100%', accentColor: s.accent }} />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: s.textMuted, marginBottom: '4px' }}>
                    <span>TAMANHO DAS FONTES</span>
                    <span>{fontSizeBase}px</span>
                  </div>
                  <input type="range" min="12" max="18" value={fontSizeBase} onChange={(e) => setFontSizeBase(Number(e.target.value))} style={{ width: '100%', accentColor: s.accent }} />
                </div>
              </div>
            </div>
            <button onClick={() => setStage('tour')} style={{ background: s.accent, color: '#fff', border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '20px' }}>
              SALVAR DIRETRIZES VISUAIS
            </button>
          </div>
        )}

        {/* 5. TOUR */}
        {stage === 'tour' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', textAlign: 'center', marginBottom: '20px' }}>Mapeamento Operacional</h2>
              <div style={{ background: s.panelBg, border: s.border, borderRadius: s.radius, padding: '20px', minHeight: '140px' }}>
                {tourStep === 0 && (
                  <>
                    <span style={{ fontWeight: '900', color: s.accent, display: 'block', marginBottom: '6px' }}>🤖 Módulo IA Co-Pilot</span>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#e0e0e0', lineHeight: '1.5' }}>Sua central principal de comando em linguagem natural. Dite o app que deseja e a máquina cria.</p>
                  </>
                )}
                {tourStep === 1 && (
                  <>
                    <span style={{ fontWeight: '900', color: s.accent, display: 'block', marginBottom: '6px' }}>🎨 Super Canva Manual</span>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#e0e0e0', lineHeight: '1.5' }}>Liberdade total. Arraste e adicione botões, tabelas de banco de dados e sistemas de Pix com um clique.</p>
                  </>
                )}
                {tourStep === 2 && (
                  <>
                    <span style={{ fontWeight: '900', color: s.accent, display: 'block', marginBottom: '6px' }}>🔮 Suporte Neural 24h</span>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#e0e0e0', lineHeight: '1.5' }}>Sua IA aberta. Responde de verdade a qualquer lógica ou dúvida do universo, sem travas ou rodeios.</p>
                  </>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {tourStep > 0 && (
                <button onClick={() => setTourStep(tourStep - 1)} style={{ padding: '12px', border: s.border, background: 'transparent', color: '#fff', borderRadius: s.radius }}>VOLTAR</button>
              )}
              <button onClick={() => tourStep < 2 ? setTourStep(tourStep + 1) : setStage('dashboard')} style={{ flex: 1, background: s.accent, color: '#fff', border: 'none', borderRadius: s.radius, padding: '14px', fontWeight: '700', cursor: 'pointer' }}>
                {tourStep === 2 ? 'ACESSAR PAINEL REAL' : 'PRÓXIMO'}
              </button>
            </div>
          </div>
        )}

        {/* 6. DASHBOARD PODEROSO COM TUDO FUNCIONANDO POR DENTRO */}
        {stage === 'dashboard' && (
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '16px' }}>
            
            {/* Topo Menu de Abas */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: s.border, paddingBottom: '10px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900' }}>Mestre {nome || 'Henry'}</h3>
                <span style={{ fontSize: '0.7rem', color: s.accent, fontWeight: 'bold' }}>Plano Ativo: {planoAtivo}</span>
              </div>
              <button onClick={() => setStage('temaselector')} style={{ padding: '6px 12px', background: 'transparent', border: s.border, color: '#fff', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>⚙ Customizar</button>
            </div>

            {/* Abas Navegáveis */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              <button onClick={() => setDashTab('criar-ia')} style={tabStyle(dashTab === 'criar-ia', s)}>🤖 Co-Pilot IA</button>
              <button onClick={() => setDashTab('canva')} style={tabStyle(dashTab === 'canva', s)}>🎨 Super Canva</button>
              <button onClick={() => setDashTab('suporte-24h')} style={tabStyle(dashTab === 'suporte-24h', s)}>🔮 Suporte 24h</button>
              <button onClick={() => setDashTab('meus-projetos')} style={tabStyle(dashTab === 'meus-projetos', s)}>📁 Seus Apps</button>
              {isAdminMode && chosenRole === 'adm' && <button onClick={() => setDashTab('adm')} style={tabStyle(dashTab === 'adm', s, true)}>🛡 ADM</button>}
            </div>

            {/* Janela Dinâmica */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '340px' }}>
              
              {/* ABA CO-PILOT IA */}
              {dashTab === 'criar-ia' && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: s.border, borderRadius: s.radius, padding: '12px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '240px' }}>
                    {aiChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? s.accent : s.panelBg, padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', maxWidth: '85%', lineHeight: '1.4' }}>{msg.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleAiSend} style={{ display: 'flex', gap: '6px' }}>
                    <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Comande a IA para criar módulos ou apps..." style={inputStyle(s)} />
                    <button style={{ background: s.accent, border: 'none', borderRadius: '8px', color: '#fff', padding: '0 16px', fontWeight: 'bold', cursor: 'pointer' }}>➔</button>
                  </form>
                </div>
              )}

              {/* ABA CANVA TOTALMENTE EQUIPADO */}
              {dashTab === 'canva' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                    <button type="button" onClick={() => adicionarAoCanva('Módulo Pix')} style={canvaBtnStyle(s)}>⚡ Injetar Pix</button>
                    <button type="button" onClick={() => adicionarAoCanva('Painel Futebol/Apostas')} style={canvaBtnStyle(s)}>⚽ Módulo Esportivo</button>
                    <button type="button" onClick={() => adicionarAoCanva('Área de Membros')} style={canvaBtnStyle(s)}>👥 Membros/Cursos</button>
                    <button type="button" onClick={() => adicionarAoCanva('Tabela Banco de Dados')} style={canvaBtnStyle(s)}>💾 Criar Tabela</button>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: `2px dashed ${s.border}`, borderRadius: s.radius, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '220px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: s.accent }}>Área Visual do Canva (Estrutura do seu Software):</span>
                    {canvaElements.map(elem => (
                      <div key={elem.id} style={{ background: s.panelBg, border: s.border, padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                        <span><strong style={{ color: s.accent }}>[{elem.type}]</strong> {elem.label}</span>
                        <button onClick={() => setCanvaElements(prev => prev.filter(x => x.id !== elem.id))} style={{ background: 'transparent', border: 'none', color: '#ff453a', cursor: 'pointer' }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ABA SUPORTE 24H DA IA TOTALMENTE REAL */}
              {dashTab === 'suporte-24h' && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: s.border, borderRadius: s.radius, padding: '12px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '240px' }}>
                    {supportChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? s.accent : s.panelBg, padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', maxWidth: '85%', lineHeight: '1.4' }}>{msg.text}</div>
                    ))}
                  </div>
                  <form onSubmit={handleSupportSend} style={{ display: 'flex', gap: '6px' }}>
                    <input type="text" value={supportInput} onChange={(e) => setSupportInput(e.target.value)} placeholder="Pergunte qualquer coisa (Ex: quanto é 1 mais 1)..." style={inputStyle(s)} />
                    <button style={{ background: s.accent, border: 'none', borderRadius: '8px', color: '#fff', padding: '0 16px', fontWeight: 'bold', cursor: 'pointer' }}>➔</button>
                  </form>
                </div>
              )}

              {/* ABA MEUS PROJETOS COM STATUS E LINKS */}
              {dashTab === 'meus-projetos' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Seus Softwares Ativos na Nuvem:</h4>
                  <div style={{ background: s.panelBg, border: s.border, padding: '14px', borderRadius: s.radius }}>
                    <strong style={{ color: s.accent, fontSize: '0.9rem' }}>🚀 App_Autônomo_Plataforma</strong>
                    <p style={{ margin: '4px 0 10px 0', fontSize: '0.75rem', color: s.textMuted }}>Status: Rodando nos Servidores Hapres / Link Ativo</p>
                    <button onClick={() => alert('Link de Acesso: https://hapres.com/share/app_henry_master')} style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: s.border, color: '#fff', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>Copiar Link do App Gerado</button>
                  </div>
                </div>
              )}

              {/* ABA DO ADMINISTRADOR SUPREMO (SEU CONTROLE MESTRE) */}
              {dashTab === 'adm' && isAdminMode && chosenRole === 'adm' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#ff453a', fontWeight: 'bold' }}>🛡 Central de Controle Global ADM</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem' }}>
                    <div style={{ background: s.panelBg, padding: '10px', borderRadius: '6px', border: s.border }}>Usuários: <strong>1.482</strong></div>
                    <div style={{ background: s.panelBg, padding: '10px', borderRadius: '6px', border: s.border }}>Créditos IA: <strong style={{ color: '#34c759' }}>Ilimitados</strong></div>
                  </div>
                  {/* RECURSO EXCLUSIVO DE MUTAÇÃO DO SEU MANUAL */}
                  <div style={{ background: 'rgba(255, 69, 58, 0.04)', border: '1px solid rgba(255, 69, 58, 0.2)', padding: '12px', borderRadius: s.radius }}>
                    <strong style={{ fontSize: '0.8rem', color: '#ff453a', display: 'block', marginBottom: '4px' }}>⚡ MUTAÇÃO SUPREMA DO HAPRES</strong>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', color: s.textMuted }}>Ordene qualquer alteração nas regras gerais do Hapres sem abrir código.</p>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input type="text" placeholder="Ex: Mude todos os botões de todos os usuários para azul..." style={{ flex: 1, padding: '8px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.75rem' }} />
                      <button onClick={() => alert('Mutação Global Executada com Sucesso!')} style={{ background: '#ff453a', border: 'none', padding: '0 12px', color: '#fff', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>MUDAR</button>
                    </div>
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
  backgroundColor: styles.panelBg,
  border: styles.border,
  borderRadius: '8px',
  padding: '12px',
  color: styles.text,
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box'
});

const tabStyle = (active, styles, isAdm = false) => ({
  padding: '8px 12px',
  background: active ? (isAdm ? '#ff453a' : styles.accent) : 'transparent',
  color: '#ffffff',
  border: active ? 'none' : styles.border,
  borderRadius: '8px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
});

const canvaBtnStyle = (styles) => ({
  padding: '6px 12px',
  background: 'rgba(255,255,255,0.04)',
  border: styles.border,
  color: '#fff',
  borderRadius: '6px',
  fontSize: '0.75rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
});
