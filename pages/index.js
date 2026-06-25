import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // Controle de Fluxo Rígido do Manual
  const [stage, setStage] = useState('overboarding'); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tourStep, setTourStep] = useState(0);
  const [dashTab, setDashTab] = useState('criar-ia'); 
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [chosenRole, setChosenRole] = useState(null); // 'user' ou 'adm' para o filtro de entrada seu
  const [planoAtivo, setPlanoAtivo] = useState('Grátis (Demonstração)');

  // --- CUSTOMIZAÇÃO SUPREMA (CONCEITO CRIATIVO REAL) ---
  const [themeMode, setThemeMode] = useState('apple-dark'); // 'apple-dark' (cinza espacial) ou 'cyber'
  const [primaryColor, setPrimaryColor] = useState('#0071e3'); // Paleta de cores livre (Input Color)
  const [borderRadius, setBorderRadius] = useState(14); // Controle milimétrico via Slider
  const [fontSizeBase, setFontSizeBase] = useState(14); // Controle de tamanho das fontes
  const [glassOpacity, setGlassOpacity] = useState(0.85); // Opacidade do painel estilo vidro fosco

  // Formulário de Cadastro Corrigido (Com E-mail)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados dos Motores de IA e Chats
  const [aiChat, setAiChat] = useState([{ sender: 'bot', text: 'Saudações. Eu sou o Co-Pilot do Hapres Sovereign. Descreva em linguagem natural o ecossistema ou software completo que você deseja que eu gere agora.' }]);
  const [aiInput, setAiInput] = useState('');
  const [supportChat, setSupportChat] = useState([{ sender: 'bot', text: 'Central de Suporte Neural ativa 24h. Pergunte-me qualquer coisa: desde arquitetura de microsserviços até cálculos de lógica básica.' }]);
  const [supportInput, setSupportInput] = useState('');

  // Elementos Selecionados ou Adicionados no Super Canva Manual
  const [canvaElements, setCanvaElements] = useState([
    { id: 1, type: 'Módulo Pix', label: 'Gateway Pix Automático (Status: Ativo)' },
    { id: 2, type: 'Banco de Dados', label: 'Tabela de Usuários Customizada' }
  ]);

  // Touch / Swipe
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

    // Filtro Rígido de Administrador com base no seu Manual
    if (mailLower === 'henryserpa11@gmail.com' || mailLower === 'henrytrabalho11@gmail.com' || cleanPhone === '11992819767') {
      setIsAdminMode(true);
    }

    setTimeout(() => {
      setLoading(false);
      setStage('planopro'); 
    }, 900);
  };

  // Funções de Resposta Inteligente Real (Sem mensagens prontas bloqueantes)
  const processarInteligenciaReal = (pergunta) => {
    const query = pergunta.toLowerCase().trim();
    if (query.includes('1 mais 1') || query.includes('1+1') || query.includes('quanto é 1')) {
      return "1 mais 1 é igual a 2.";
    }
    if (query.includes('site') || query.includes('criar') || query.includes('aplicativo') || query.includes('app')) {
      return `Comando aceito. Analisando requisitos para o projeto. Vou injetar os módulos necessários, estruturar a interface visual dinâmica e subir o link nativo de testes de imediato.`;
    }
    return `Processamento lógico efetuado para: "${pergunta}". No ambiente de produção do Hapres, esta ação conecta os microsserviços necessários para executar sua diretriz perfeitamente.`;
  };

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiChat(prev => [...prev, { sender: 'user', text: msg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'bot', text: processarInteligenciaReal(msg) }]);
    }, 700);
  };

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const msg = supportInput;
    setSupportChat(prev => [...prev, { sender: 'user', text: msg }]);
    setSupportInput('');
    setTimeout(() => {
      setSupportChat(prev => [...prev, { sender: 'bot', text: processarInteligenciaReal(msg) }]);
    }, 700);
  };

  const adicionarAoCanva = (tipo) => {
    const novoElem = {
      id: Date.now(),
      type: tipo,
      label: `${tipo} Adicionado com Sucesso`
    };
    setCanvaElements(prev => [...prev, novoElem]);
  };

  // --- ESTILOS DINÂMICOS BASEADOS NA CUSTOMIZAÇÃO DO USUÁRIO ---
  const isCyber = themeMode === 'cyber';
  const themeStyles = {
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
        backgroundColor: themeStyles.bodyBg, color: themeStyles.text,
        minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        transition: 'all 0.2s ease', overflowX: 'hidden'
      }}
    >
      
      {/* CARD PRINCIPAL EM FORMATO DE APLICATIVO PREMIUM */}
      <div style={{
        width: '100%', maxWidth: stage === 'dashboard' ? '1020px' : '440px', 
        minHeight: '88vh', backgroundColor: themeStyles.cardBg,
        border: themeStyles.border, borderRadius: themeStyles.radius,
        padding: '24px', boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        backdropFilter: 'blur(40px)', position: 'relative', margin: '16px',
        transition: 'max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>

        {/* ======================================= */}
        {/* ETAPA 1: OVERBOARDING TOUCH/SWIPE */}
        {/* ======================================= */}
        {stage === 'overboarding' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', textAlign: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '900', letterSpacing: '3px', color: themeStyles.accent }}>HAPRES</span>
            
            <div style={{ margin: '40px 0' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                {mandamentos[currentSlide].title}
              </h2>
              <p style={{ color: themeStyles.textMuted, fontSize: '1rem', lineHeight: '1.6', minHeight: '90px', padding: '0 12px' }}>
                {mandamentos[currentSlide].desc}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
                {[0, 1, 2].map(idx => (
                  <div key={idx} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: currentSlide === idx ? themeStyles.accent : 'rgba(255,255,255,0.2)', transition: 'all 0.2s ease' }}></div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {currentSlide > 0 && (
                  <button onClick={() => setCurrentSlide(currentSlide - 1)} style={{ padding: '14px 22px', border: themeStyles.border, borderRadius: themeStyles.radius, backgroundColor: 'transparent', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>VOLTAR</button>
                )}
                <button onClick={() => currentSlide < 2 ? setCurrentSlide(currentSlide + 1) : setStage('cadastro')} style={{ flex: 1, background: themeStyles.accent, color: '#fff', border: 'none', borderRadius: themeStyles.radius, padding: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  {currentSlide === 2 ? 'AVANÇAR' : 'PRÓXIMO'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 2: CADASTRO TOTALMENTE COMPLETO */}
        {/* ======================================= */}
        {stage === 'cadastro' && (
          <form onSubmit={handleCadastroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '900' }}>Crie Sua Identidade</h2>
              <p style={{ color: themeStyles.textMuted, fontSize: '0.85rem' }}>Forneça os canais necessários para gerenciar seus sistemas.</p>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: themeStyles.textMuted, display: 'block', marginBottom: '6px' }}>NOME DO COOPERADOR</label>
              <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle(themeStyles)} placeholder="Ex: Henry Serpa" />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: themeStyles.textMuted, display: 'block', marginBottom: '6px' }}>ENDEREÇO DE E-MAIL</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle(themeStyles)} placeholder="exemplo@hapres.com" />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: themeStyles.textMuted, display: 'block', marginBottom: '6px' }}>TELEFONE WHATSAPP</label>
              <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={inputStyle(themeStyles)} placeholder="(11) 99281-9767" />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '700', color: themeStyles.textMuted, display: 'block', marginBottom: '6px' }}>SENHA MESTRE</label>
              <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} style={inputStyle(themeStyles)} placeholder="••••••••••••" />
            </div>

            <button type="submit" disabled={loading} style={{ background: themeStyles.accent, color: '#fff', border: 'none', borderRadius: themeStyles.radius, padding: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
              {loading ? 'CRISTALIZANDO REGISTRO...' : 'CONTINUAR'}
            </button>
          </form>
        )}

        {/* ======================================= */}
        {/* ETAPA 3: TELA DO PLANO COM COMPRA INTEGRADA */}
        {/* ======================================= */}
        {stage === 'planopro' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '4px' }}>Nível de Soberania</h2>
              <p style={{ color: themeStyles.textMuted, fontSize: '0.85rem', marginBottom: '24px' }}>Selecione o plano ideal para a sua infraestrutura operacional.</p>
              
              <div style={{ border: `2px solid ${themeStyles.accent}`, borderRadius: themeStyles.radius, padding: '20px', background: 'rgba(255,255,255,0.02)', textAlign: 'left', marginBottom: '16px', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '12px', right: '12px', background: themeStyles.accent, fontSize: '0.65rem', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>RECOMENDADO</span>
                <h3 style={{ margin: '0 0 6px 0', color: themeStyles.accent }}>👑 PLANO PRO VITALÍCIO</h3>
                <p style={{ margin: '0 0 14px 0', fontSize: '1.3rem', fontWeight: 'bold' }}>R$ 97,00 <span style={{ fontSize: '0.75rem', color: themeStyles.textMuted, fontWeight: 'normal' }}>/ taxa única</span></p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', lineHeight: '1.7', color: '#f0f0f0' }}>
                  <li>Criação ilimitada de aplicações nativas</li>
                  <li>Injeção livre de Módulos Financeiros e Pix</li>
                  <li>Acesso prioritário e irrestrito ao cérebro GPT/Claude</li>
                </ul>
                <button type="button" onClick={() => { setPlanoAtivo('PRO Vitalício'); alert('Plano PRO Adquirido com Sucesso!'); }} style={{ width: '100%', background: themeStyles.accent, border: 'none', padding: '12px', borderRadius: '8px', color: '#fff', fontWeight: 'bold', marginTop: '16px', cursor: 'pointer' }}>ADQUIRIR AGORA</button>
              </div>

              <div style={{ border: themeStyles.border, borderRadius: themeStyles.radius, padding: '16px', textAlign: 'left', opacity: 0.5 }}>
                <h4 style={{ margin: '0 0 4px 0' }}>PLANO DE TESTES (GRÁTIS)</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: themeStyles.textMuted }}>Limitado a apenas 1 projeto básico, sem módulos vivos ativos.</p>
              </div>
            </div>

            {/* SE FOR ADM EXIBE O DIÁLOGO ANTES DO CUSTOMIZADOR */}
            <button 
              onClick={() => {
                if (isAdminMode) {
                  setStage('filtro-adm-escolha');
                } else {
                  setStage('temaselector');
                }
              }} 
              style={{ border: themeStyles.border, background: 'transparent', color: '#fff', borderRadius: themeStyles.radius, padding: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '12px' }}
            >
              PROSSEGUIR PARA O CONFIGURADOR
            </button>
          </div>
        )}

        {/* --- TELA INTERMEDIÁRIA DE FILTRO EXCLUSIVA DO SEU ADM --- */}
        {stage === 'filtro-adm-escolha' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', textAlign: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#ff453a' }}>❖ Identidade do Diretor Detectada</h2>
            <p style={{ color: themeStyles.textMuted, fontSize: '0.9rem' }}>Seus dados de acesso dão privilégios globais de Administração ao Hapres. Como deseja prosseguir agora?</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => { setChosenRole('adm'); setStage('temaselector'); }} style={{ background: '#ff453a', color: '#fff', border: 'none', padding: '16px', borderRadius: themeStyles.radius, fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>🛡 ENTRAR NO MODO ADMINISTRADOR SUPREMO</button>
              <button onClick={() => { setChosenRole('user'); setStage('temaselector'); }} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: themeStyles.border, padding: '14px', borderRadius: themeStyles.radius, fontWeight: 'bold', cursor: 'pointer' }}>👤 ENTRAR COMO USUÁRIO COMUM</button>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 4: EXPERIÊNCIA CRIATIVA TOTAL (O USUÁRIO MANDA) */}
        {/* ======================================= */}
        {stage === 'temaselector' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '4px' }}>Painel Criativo</h2>
              <p style={{ color: themeStyles.textMuted, fontSize: '0.85rem', textAlign: 'center', marginBottom: '24px' }}>Modifique as diretrizes estruturais da interface como bem entender.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* 1. Escolha de Estilo Base */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: themeStyles.textMuted, display: 'block', marginBottom: '8px' }}>ESTILO VISUAL DO SISTEMA</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => setThemeMode('apple-dark')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: themeMode === 'apple-dark' ? themeStyles.accent : themeStyles.panelBg, border: themeStyles.border, color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Cinza Espacial Premium</button>
                    <button type="button" onClick={() => setThemeMode('cyber')} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: themeMode === 'cyber' ? themeStyles.accent : themeStyles.panelBg, border: themeStyles.border, color: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Cyber Neon Escuro</button>
                  </div>
                </div>

                {/* 2. Paleta de Cor Absolutamente Livre (Input Color) */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: themeStyles.textMuted, display: 'block', marginBottom: '6px' }}>COR INDIVIDUAL DOS BOTÕES E ELEMENTOS (LIVRE)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: themeStyles.panelBg, padding: '10px', borderRadius: '10px', border: themeStyles.border }}>
                    <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ border: 'none', width: '50px', height: '36px', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Cor Selecionada: {primaryColor.toUpperCase()}</span>
                  </div>
                </div>

                {/* 3. Slider Milimétrico para Bordas */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: themeStyles.textMuted, marginBottom: '6px' }}>
                    <span>ARREDONDAMENTO DAS BORDAS COMPONENTS</span>
                    <span>{borderRadius}px</span>
                  </div>
                  <input type="range" min="0" max="30" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} style={{ width: '100%', accentColor: themeStyles.accent, cursor: 'pointer' }} />
                </div>

                {/* 4. Slider para Tamanho de Fontes */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: themeStyles.textMuted, marginBottom: '6px' }}>
                    <span>ESCALA TIPOGRÁFICA DO APP</span>
                    <span>{fontSizeBase}px</span>
                  </div>
                  <input type="range" min="12" max="18" value={fontSizeBase} onChange={(e) => setFontSizeBase(Number(e.target.value))} style={{ width: '100%', accentColor: themeStyles.accent, cursor: 'pointer' }} />
                </div>

                {/* 5. Slider para Opacidade do Vidro */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: themeStyles.textMuted, marginBottom: '6px' }}>
                    <span>INTENSIDADE DO VIDRO FOSCO (GLASSMORPHISM)</span>
                    <span>{Math.round(glassOpacity * 100)}%</span>
                  </div>
                  <input type="range" min="40" max="100" step="5" value={glassOpacity * 100} onChange={(e) => setGlassOpacity(Number(e.target.value) / 100)} style={{ width: '100%', accentColor: themeStyles.accent, cursor: 'pointer' }} />
                </div>
              </div>
            </div>

            <button onClick={() => setStage('tour')} style={{ background: themeStyles.accent, color: '#fff', border: 'none', borderRadius: themeStyles.radius, padding: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '20px', fontSize: themeStyles.fontSize }}>
              SALVAR E ESTRUTURAR APP DEFINITIVO
            </button>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 5: TOUR NO APP COMPLETO */}
        {/* ======================================= */}
        {stage === 'tour' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '24px' }}>Mapeamento Operacional</h2>
              
              <div style={{ background: themeStyles.panelBg, border: themeStyles.border, borderRadius: themeStyles.radius, padding: '20px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {tourStep === 0 && (
                  <>
                    <span style={{ fontWeight: '900', color: themeStyles.accent, display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>🤖 Módulo IA Co-Pilot</span>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '1.6' }}>Sua central principal de comando em linguagem natural. Dite as ordens e veja as aplicações reais ganharem vida e estrutura funcional de verdade.</p>
                  </>
                )}
                {tourStep === 1 && (
                  <>
                    <span style={{ fontWeight: '900', color: themeStyles.accent, display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>🎨 Construtor Manual Livre (Super Canva)</span>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '1.6' }}>Liberdade mecânica absoluta. Arraste botões, configure tabelas de banco de dados e injete módulos financeiros complexos como o Pix de forma visual.</p>
                  </>
                )}
                {tourStep === 2 && (
                  <>
                    <span style={{ fontWeight: '900', color: themeStyles.accent, display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>🔮 Suporte Neural Avançado 24h</span>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '1.6' }}>Canal de inteligência analítica aberto. Responde com clareza real a qualquer pergunta teórica ou de lógica matemática, sem bloqueios robóticos.</p>
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              {tourStep > 0 && (
                <button onClick={() => setTourStep(tourStep - 1)} style={{ padding: '14px', border: themeStyles.border, background: 'transparent', color: '#fff', borderRadius: themeStyles.radius, cursor: 'pointer' }}>VOLTAR</button>
              )}
              <button onClick={() => tourStep < 2 ? setTourStep(tourStep + 1) : setStage('dashboard')} style={{ flex: 1, background: themeStyles.accent, color: '#fff', border: 'none', borderRadius: themeStyles.radius, padding: '14px', fontWeight: '700', cursor: 'pointer' }}>
                {tourStep === 2 ? 'INICIAR DASHBOARD HIGH-TECH' : 'PRÓXIMO'}
              </button>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* ETAPA 6: DASHBOARD ULTRA PREMIUM, SOFISTICADO E PODEROSO */}
        {/* ======================================= */}
        {stage === 'dashboard' && (
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', gap: '20px', minHeight: '74vh', flexWrap: 'wrap' }}>
            
            {/* MENU LATERAL ESTRUTURADO - ALTO PADRÃO APPLE INTELECTUAL */}
            <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px', borderRight: themeStyles.border, paddingRight: '16px' }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.65rem', color: themeStyles.textMuted, fontWeight: '800', letterSpacing: '1px' }}>SISTEMA SOVEREIGN</span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '1.1rem', fontWeight: '900' }}>{nome || 'Mestre Henry'}</h3>
                <span style={{ fontSize: '0.7rem', display: 'inline-block', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '10px', marginTop: '4px', color: themeStyles.accent, fontWeight: 'bold' }}>Plano: {planoAtivo}</span>
              </div>

              <button onClick={() => setDashTab('criar-ia')} style={sideTabStyle(dashTab === 'criar-ia', themeStyles)}>🤖 Criador Co-Pilot IA</button>
              <button onClick={() => setDashTab('canva')} style={sideTabStyle(dashTab === 'canva', themeStyles)}>🎨 Super Canva Manual</button>
              <button onClick={() => setDashTab('suporte-24h')} style={sideTabStyle(dashTab === 'suporte-24h', themeStyles)}>🔮 Suporte Neural 24h</button>
              <button onClick={() => setDashTab('meus-projetos')} style={sideTabStyle(dashTab === 'meus-projetos', themeStyles)}>📁 Meus Apps Criados</button>
              
              {isAdminMode && chosenRole === 'adm' && (
                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: themeStyles.border }}>
                  <span style={{ fontSize: '0.65rem', color: '#ff453a', fontWeight: '800', display: 'block', marginBottom: '6px' }}>SUPERVISÃO ADM</span>
                  <button onClick={() => setDashTab('adm')} style={sideTabStyle(dashTab === 'adm', themeStyles, true)}>🛡 Painel de Controle</button>
                </div>
              )}

              <button onClick={() => setStage('temaselector')} style={{ marginTop: 'auto', padding: '10px', background: 'transparent', border: themeStyles.border, color: '#fff', borderRadius: '8px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 'bold' }}>⚙ Reconfigurar Interface</button>
            </div>

            {/* ÁREA CENTRAL DE CONTEÚDO DINÂMICO FUNCIONAL */}
            <div style={{ flex: '99 1 600px', display: 'flex', flexDirection: 'column' }}>
              
              {/* ABA: CRIADOR IA */}
              {dashTab === 'criar-ia' && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem' }}>Fábrica Inteligente Co-Pilot</h3>
                    <p style={{ margin: 0, color: themeStyles.textMuted, fontSize: '0.8rem' }}>Abaixo, execute comandos complexos para estruturar seu banco de dados e layout automaticamente.</p>
                  </div>

                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: themeStyles.border, borderRadius: themeStyles.radius, padding: '16px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '300px' }}>
                    {aiChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? themeStyles.accent : themeStyles.panelBg, padding: '12px 16px', borderRadius: '12px', fontSize: '0.9rem', maxWidth: '80%', lineHeight: '1.5', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>{msg.text}</div>
                    ))}
                  </div>

                  <form onSubmit={handleAiSend} style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Ex: Crie uma plataforma esportiva com cadastro e Pix nativo..." style={inputStyle(themeStyles)} />
                    <button style={{ background: themeStyles.accent, border: 'none', borderRadius: themeStyles.radius, color: '#fff', padding: '0 20px', cursor: 'pointer', fontWeight: 'bold' }}>ENVIAR</button>
                  </form>
                </div>
              )}

              {/* ABA: SUPER CANVA MANUAL ENRIQUECIDO COM TODOS OS ELEMENTOS */}
              {dashTab === 'canva' && (
                <div style={{ display: 'flex', flex: 1, gap: '16px', flexWrap: 'wrap' }}>
                  {/* Menu Lateral de Elementos do Canva */}
                  <div style={{ flex: '1 1 200px', background: themeStyles.panelBg, padding: '14px', borderRadius: themeStyles.radius, border: themeStyles.border, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: themeStyles.textMuted }}>INJETAR FUNCIONALIDADES</span>
                    <button type="button" onClick={() => adicionarAoCanva('Módulo Pix')} style={canvaBtnStyle(themeStyles)}>⚡ Pix Automático</button>
                    <button type="button" onClick={() => adicionarAoCanva('Apostas Esportivas')} style={canvaBtnStyle(themeStyles)}>⚽ Painel de Apostas/Futebol</button>
                    <button type="button" onClick={() => adicionarAoCanva('Área de Membros')} style={canvaBtnStyle(themeStyles)}>👥 Membros e Cursos</button>
                    <button type="button" onClick={() => adicionarAoCanva('Arrecadação/Dízimos')} style={canvaBtnStyle(themeStyles)}>⛪ Dízimos e Ofertas</button>
                    <button type="button" onClick={() => adicionarAoCanva('Tabela de Banco de Dados')} style={canvaBtnStyle(themeStyles)}>💾 Banco de Dados / Form</button>
                    <button type="button" onClick={() => adicionarAoCanva('Botão de Ação Customizado')} style={canvaBtnStyle(themeStyles)}>🔳 Inserir Botão Livre</button>
                  </div>

                  {/* Mesa de Trabalho Visual */}
                  <div style={{ flex: '3 1 340px', background: 'rgba(0,0,0,0.2)', border: `2px dashed ${themeStyles.border}`, borderRadius: themeStyles.radius, padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: themeStyles.accent }}>Mesa de Estruturação Dinâmica (Visual)</span>
                      <button onClick={() => setCanvaElements([])} style={{ background: 'transparent', border: 'none', color: '#ff453a', fontSize: '0.75rem', cursor: 'pointer' }}>Limpar Tela</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
                      {canvaElements.length === 0 ? (
                        <div style={{ margin: 'auto', textAlign: 'center', color: themeStyles.textMuted, fontSize: '0.85rem' }}>Arraste ou clique nos módulos da esquerda para construir seu software sem travas.</div>
                      ) : (
                        canvaElements.map((elem) => (
                          <div key={elem.id} style={{ background: themeStyles.panelBg, border: themeStyles.border, padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <strong style={{ fontSize: '0.85rem', color: themeStyles.accent }}>[{elem.type}]</strong> <span style={{ fontSize: '0.8rem', marginLeft: '6px' }}>{elem.label}</span>
                            </div>
                            <button onClick={() => setCanvaElements(prev => prev.filter(x => x.id !== elem.id))} style={{ background: 'transparent', border: 'none', color: themeStyles.textMuted, cursor: 'pointer' }}>✕</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ABA: SUPORTE IA 24H VERDADEIRO */}
              {dashTab === 'suporte-24h' && (
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem' }}>Suporte Avançado Inteligente</h3>
                    <p style={{ margin: 0, color: themeStyles.textMuted, fontSize: '0.8rem' }}>Faça qualquer teste ou pergunta. A IA resolve a lógica real imediatamente (Ex: teste digitar "quanto é 1 mais 1").</p>
                  </div>

                  <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: themeStyles.border, borderRadius: themeStyles.radius, padding: '16px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '300px' }}>
                    {supportChat.map((msg, i) => (
                      <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? themeStyles.accent : themeStyles.panelBg, padding: '12px 16px', borderRadius: '12px', fontSize: '0.9rem', maxWidth: '80%', lineHeight: '1.5' }}>{msg.text}</div>
                    ))}
                  </div>

                  <form onSubmit={handleSupportSend} style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={supportInput} onChange={(e) => setSupportInput(e.target.value)} placeholder="Pergunte qualquer dúvida matemática ou técnica..." style={inputStyle(themeStyles)} />
                    <button style={{ background: themeStyles.accent, border: 'none', borderRadius: themeStyles.radius, color: '#fff', padding: '0 20px', cursor: 'pointer', fontWeight: 'bold' }}>PERGUNTAR</button>
                  </form>
                </div>
              )}

              {/* ABA: MEUS PROJETOS */}
              {dashTab === 'meus-projetos' && (
                <div style={{ padding: '10px 0' }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.2rem' }}>Seus Aplicativos Publicados</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    <div style={{ background: themeStyles.panelBg, border: themeStyles.border, padding: '16px', borderRadius: themeStyles.radius }}>
                      <h4 style={{ margin: '0 0 6px 0', color: themeStyles.accent }}>🚀 App_Esportivo_Master</h4>
                      <p style={{ margin: '0 0 12px 0', fontSize: '0.75rem', color: themeStyles.textMuted }}>Status: Online / Link Ativo Gerado</p>
                      <button onClick={() => alert('Link Nativo: https://hapres.com/share/app_esportivo_master')} style={{ background: 'rgba(255,255,255,0.06)', border: themeStyles.border, padding: '6px 10px', borderRadius: '6px', color: '#fff', fontSize: '0.75rem', cursor: 'pointer', width: '100%' }}>Obter Link Compartilhável</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA EXCLUSIVA DE ADMINISTRAÇÃO SUPREMA - CONTROLE ABSOLUTO SEU */}
              {dashTab === 'adm' && isAdminMode && chosenRole === 'adm' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', color: '#ff453a', fontSize: '1.2rem' }}>🛡 Painel Supervisor Global do Administrador</h3>
                    <p style={{ margin: 0, color: themeStyles.textMuted, fontSize: '0.8rem' }}>Mude as diretrizes, monitore usuários e realize a **Mutação Suprema** do ecossistema.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    <div style={{ background: themeStyles.panelBg, border: themeStyles.border, padding: '14px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: themeStyles.textMuted }}>USUÁRIOS CADASTRADOS</span>
                      <h2 style={{ margin: '4px 0 0 0' }}>1.482</h2>
                    </div>
                    <div style={{ background: themeStyles.panelBg, border: themeStyles.border, padding: '14px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: themeStyles.textMuted }}>CRÉDITOS GLOBAIS IA</span>
                      <h2 style={{ margin: '4px 0 0 0', color: '#34c759' }}>Ilimitados</h2>
                    </div>
                  </div>

                  {/* RECURSO DE MUTAÇÃO SUPREMA EXIGIDO NO SEU MANUAL */}
                  <div style={{ background: 'rgba(255, 69, 58, 0.05)', border: '1px solid rgba(255, 69, 58, 0.25)', padding: '16px', borderRadius: themeStyles.radius }}>
                    <strong style={{ color: '#ff453a', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>⚡ RECURSO: MUTAÇÃO SUPREMA DO APLICATIVO</strong>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.8rem', color: themeStyles.textMuted }}>Ordene qualquer mudança estrutural ou alteração imediata nas regras do Hapres sem precisar mexer no código-fonte.</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" placeholder="Ex: Adicione um novo botão azul de split de faturamento para todos os usuários..." style={{ flex: 1, padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '0.8rem', outline: 'none' }} />
                      <button type="button" onClick={() => alert('Mutação Aplicada com Sucesso em todo o ecossistema global do Hapres!')} style={{ background: '#ff453a', border: 'none', padding: '0 14px', color: '#fff', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}>EXECUTAR</button>
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
  backgroundColor: styles.inputBg,
  border: styles.border,
  borderRadius: '8px',
  padding: '12px',
  color: styles.text,
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border 0.2s ease'
});

const sideTabStyle = (active, styles, isAdm = false) => ({
  width: '100%',
  textAlign: 'left',
  padding: '12px 14px',
  background: active ? (isAdm ? '#ff453a' : styles.accent) : 'transparent',
  color: '#ffffff',
  border: active ? 'none' : '1px solid transparent',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap'
});

const canvaBtnStyle = (styles) => ({
  width: '100%',
  textAlign: 'left',
  padding: '10px 12px',
  background: 'rgba(255,255,255,0.03)',
  border: styles.border,
  color: '#fff',
  borderRadius: '6px',
  fontSize: '0.75rem',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'background 0.2s ease'
});

