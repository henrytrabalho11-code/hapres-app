import React, { useState, useEffect } from 'react';

export default function App() {
  // --- ESTADOS DO SISTEMA ---
  const [stage, setStage] = useState('overboarding'); // overboarding, register, plans, chroma, forging, tour, dashboard
  const [overboardIndex, setOverboardIndex] = useState(0);
  
  // Dados de Cadastro (Identity Forge)
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [chaveMestra, setChaveMestra] = useState('');

  // Chroma Forge (Paleta de Cores Expandida)
  const [activeTheme, setActiveTheme] = useState('luxury'); // luxury, minimalist, neon

  // Progresso do Forging (85% Loading)
  const [progress, setProgress] = useState(0);
  const [forgingLogs, setForgingLogs] = useState([]);

  // Tour Interativo
  const [tourStep, setTourStep] = useState(0);

  // Navegação do Dashboard
  const [activeMenu, setActiveMenu] = useState('Overview'); // Overview, Super Canva, Co-Pilot IA, Suporte Neural, Central Mestre

  // Super Canva (Catálogo e Canvas de Arrasto)
  const [searchQuery, setSearchQuery] = useState('');
  const [modulosInjetados, setModulosInjetados] = useState([]);
  const [modulosDisponiveis, setModulosDisponiveis] = useState([
    { id: 'mod_pix', name: 'Gateway Pix VIP', icon: 'fa-qrcode', desc: 'Processamento instantâneo de faturamento com split automático.', cat: 'faturamento' },
    { id: 'mod_futebol', name: 'Sport Bot Pro', icon: 'fa-soccer-ball', desc: 'Análise neural e automação de sinais esportivos em tempo real.', cat: 'futebol' },
    { id: 'mod_fe', name: 'Módulo Fé & Liturgia', icon: 'fa-church', desc: 'Liturgia diária, Santos do dia e doação automática via Pix.', cat: 'fe' },
    { id: 'mod_crypto', name: 'Cripto Matrix', icon: 'fa-bitcoin', desc: 'Cotações de criptomoedas e tokens em tempo real.', cat: 'crypto' },
    { id: 'mod_logistica', name: 'Roteador ViaCEP', icon: 'fa-truck', desc: 'Cálculo de frete por KM e rastreamento de entregas.', cat: 'logistica' }
  ]);

  // Inteligência Artificial (Co-Pilot IA)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChats, setAiLogs] = useState([
    { role: 'system', msg: 'Sovereign Core ativo. Como posso ajustar a tua infraestrutura hoje?' }
  ]);

  // --- COMPORTAMENTOS ---

  // Slide de Overboarding
  const overboards = [
    { title: "A Fábrica de Magia", text: "Cria qualquer tipo de aplicação no mundo de forma instantânea, prática e livre de burocracias técnicas." },
    { title: "Módulos Vivos", text: "Injeta placares de futebol, gateways de pagamento Pix e liturgia católica arrastando os blocos direto no Canva." },
    { title: "Soberania Inquebrável", text: "O teu link gerado na hora, o teu app publicado imediatamente, sem depender de terceiros ou perder faturamento." },
    { title: "Chave Mestra Criada", text: "Autonomia completa controlando utilizadores e assinaturas diretamente pelo teu painel administrativo." }
  ];

  const handleNextOverboard = () => {
    if (overboardIndex < overboards.length - 1) {
      setOverboardIndex(overboardIndex + 1);
    } else {
      setStage('register');
    }
  };

  // Processamento do Cadastro
  const handleRegister = (e) => {
    e.preventDefault();
    if (!nome.trim() || !whatsapp.trim() || !email.trim()) {
      alert("Por favor, preenche todos os campos.");
      return;
    }
    // Geração de Chave Mestra Única
    const token = `SRV_ROOT_${Math.floor(1000 + Math.random() * 9000)}_${nome.split(' ')[0].toUpperCase()}`;
    setChaveMestra(token);
    setStage('plans');
  };

  // Simulação de Loading do Forging
  useEffect(() => {
    if (stage !== 'forging') return;

    const logs = [
      "Inicializando ambiente de segurança isolado...",
      "Alocando servidores na nuvem soberana...",
      "Injetando inteligência artificial (Claude/GPT)...",
      "Compilando componentes visuais em tempo real...",
      "Gerando PWA instalável..."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          setStage('tour');
          return 85;
        }
        return prev + 5;
      });

      if (currentLogIndex < logs.length) {
        setForgingLogs((prevLogs) => [...prevLogs, logs[currentLogIndex]]);
        currentLogIndex++;
      }
    }, 200);

    return () => clearInterval(interval);
  }, [stage]);

  // Escolha Cromática Dinâmica (Chroma Forge)
  const themes = {
    luxury: {
      '--bg-main': '#06040a',
      '--bg-card': 'rgba(20, 17, 34, 0.7)',
      '--border-color': 'rgba(123, 87, 255, 0.12)',
      '--accent-primary': '#c5a059', // Ouro
      '--accent-secondary': '#10b981', // Esmeralda
      '--text-main': '#ffffff',
      '--text-muted': '#948fa6'
    },
    minimalist: {
      '--bg-main': '#0a0a0a',
      '--bg-card': 'rgba(255, 255, 255, 0.03)',
      '--border-color': 'rgba(255, 255, 255, 0.08)',
      '--accent-primary': '#f3f4f6', // Platina/Branco
      '--accent-secondary:': '#6b7280',
      '--text-main': '#ffffff',
      '--text-muted': '#9ca3af'
    },
    neon: {
      '--bg-main': '#02000a',
      '--bg-card': 'rgba(20, 10, 40, 0.5)',
      '--border-color': 'rgba(255, 0, 85, 0.2)',
      '--accent-primary': '#ff0055', // Rosa Neon
      '--accent-secondary': '#00ffcc', // Ciano Neon
      '--text-main': '#ffffff',
      '--text-muted': '#a78bfa'
    }
  };

  const getThemeStyles = () => {
    return themes[activeTheme] || themes.luxury;
  };

  // Drag and Drop do Canva
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");
    if (!itemData) return;
    const item = JSON.parse(itemData);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 40;
    const y = e.clientY - rect.top - 20;

    const novoModulo = {
      ...item,
      uniqueId: Date.now(),
      x,
      y
    };

    setModulosInjetados([...modulosInjetados, novoModulo]);
  };

  const handleRemoveModule = (uniqueId) => {
    setModulosInjetados(modulosInjetados.filter(m => m.uniqueId !== uniqueId));
  };

  // Envio de mensagem para a IA
  const handleSendAi = () => {
    if (!aiPrompt.trim()) return;
    const newChat = [
      ...aiChats,
      { role: 'user', msg: aiPrompt }
    ];
    setAiLogs(newChat);
    setAiPrompt('');

    setTimeout(() => {
      setAiLogs([
        ...newChat,
        { role: 'system', msg: `Comando "${aiPrompt}" recebido. A otimizar a estrutura interna do Canva e sincronizar novas chaves de API...` }
      ]);
    }, 800);
  };

  // Filtragem de catálogo do Canva
  const filteredCatalog = modulosDisponiveis.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ ...getThemeStyles(), minHeight: '100vh', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', transition: 'all 0.5s ease' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      {/* --- ETAPA 1: OVERBOARDING --- */}
      {stage === 'overboarding' && (
        <div style={styles.fullscreenCenter}>
          <div style={styles.glassCard} className="glass-panel">
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>PRE-LAUNCH</span>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '10px', marginBottom: '20px' }}>{overboards[overboardIndex].title}</h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '40px' }}>{overboards[overboardIndex].text}</p>
            
            <div style={styles.indicatorContainer}>
              {overboards.map((_, idx) => (
                <div key={idx} style={{
                  ...styles.dot,
                  backgroundColor: idx === overboardIndex ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                  width: idx === overboardIndex ? '30px' : '10px'
                }} />
              ))}
            </div>

            <button style={styles.primaryButton} onClick={handleNextOverboard}>Avançar</button>
          </div>
        </div>
      )}

      {/* --- ETAPA 2: IDENTITY FORGE (CADASTRO) --- */}
      {stage === 'register' && (
        <div style={styles.fullscreenCenter}>
          <form style={{ ...styles.glassCard, maxWidth: '500px' }} onSubmit={handleRegister} className="glass-panel">
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>Identity Forge</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '14px' }}>Cria a tua identidade mestre e gera as tuas chaves lógicas.</p>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nome Completo</label>
              <input type="text" style={styles.input} placeholder="Henry Serpa" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>WhatsApp Operacional</label>
              <input type="text" style={styles.input} placeholder="(11) 99999-9999" value={whatsapp} onChange={(e) => setWhatsApp(e.target.value)} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>E-mail Principal</label>
              <input type="email" style={styles.input} placeholder="henryserpa11@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <button type="submit" style={{ ...styles.primaryButton, width: '100%', marginTop: '20px' }}>Forjar Instância</button>
          </form>
        </div>
      )}

      {/* --- ETAPA 3: SOVEREIGN PLANS (TABELA DE PREÇOS PRO) --- */}
      {stage === 'plans' && (
        <div style={styles.fullscreenCenter}>
          <div style={{ ...styles.glassCard, maxWidth: '850px', width: '100%' }} className="glass-panel">
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>MUTAÇÃO DE RECURSOS</span>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '10px', marginBottom: '40px', textAlign: 'center' }}>Escolhe o teu Nível de Permissão</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '30px', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Essence (Free)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px' }}>Para testes rápidos e fluxos estáticos básicos.</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', fontSize: '14px' }}>
                    <li style={{ marginBottom: '10px' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px' }}></i> 2 Módulos no Canva</li>
                    <li style={{ marginBottom: '10px' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px' }}></i> Templates Standard</li>
                  </ul>
                </div>
                <button style={{ ...styles.primaryButton, background: 'transparent', color: '#fff', border: '1px solid var(--border-color)', marginTop: '30px' }} onClick={() => setStage('chroma')}>Continuar com Free</button>
              </div>

              <div style={{ background: 'rgba(197, 160, 89, 0.03)', padding: '30px', borderRadius: '20px', border: '2px solid var(--accent-primary)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ position: 'absolute', top: '-12px', right: '20px', background: 'var(--accent-primary)', color: '#000', padding: '3px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800' }}>RECOMENDADO</span>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--accent-primary)' }}>SOVEREIGN PRO</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px' }}>Acesso ilimitado ao ecossistema global, inteligência artificial avançada e publicação nativa.</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', fontSize: '14px' }}>
                    <li style={{ marginBottom: '10px' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px' }}></i> Todos os Módulos Omni-API</li>
                    <li style={{ marginBottom: '10px' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px' }}></i> Chroma Forge Expandido</li>
                    <li style={{ marginBottom: '10px' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px' }}></i> IA Claude/GPT Executora 24/7</li>
                  </ul>
                </div>
                <button style={{ ...styles.primaryButton, marginTop: '30px' }} onClick={() => setStage('chroma')}>Liberar Acesso Pro</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ETAPA 4: CHROMA FORGE (PALETAS COMPLETAS) --- */}
      {stage === 'chroma' && (
        <div style={styles.fullscreenCenter}>
          <div style={{ ...styles.glassCard, maxWidth: '900px', width: '100%', textAlign: 'center' }} className="glass-panel">
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>IDENTIDADE VISUAL</span>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '10px', marginBottom: '40px' }}>Chroma Forge</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
              <div 
                style={{ ...styles.themeCard, border: activeTheme === 'luxury' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)' }}
                onClick={() => setActiveTheme('luxury')}
              >
                <i className="fa-solid fa-crown" style={{ fontSize: '24px', color: '#c5a059', marginBottom: '15px' }}></i>
                <h3>High-Luxury</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Ouro, Esmeralda & Safira</p>
              </div>

              <div 
                style={{ ...styles.themeCard, border: activeTheme === 'minimalist' ? '2px solid #fff' : '1px solid var(--border-color)' }}
                onClick={() => setActiveTheme('minimalist')}
              >
                <i className="fa-solid fa-feather" style={{ fontSize: '24px', color: '#f3f4f6', marginBottom: '15px' }}></i>
                <h3>Minimalist Essence</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Branco, Carbono & Tons de Cinza</p>
              </div>

              <div 
                style={{ ...styles.themeCard, border: activeTheme === 'neon' ? '2px solid #ff0055' : '1px solid var(--border-color)' }}
                onClick={() => setActiveTheme('neon')}
              >
                <i className="fa-solid fa-bolt" style={{ fontSize: '24px', color: '#ff0055', marginBottom: '15px' }}></i>
                <h3>Vibrant Neon</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Cores intensas, acesas & artísticas</p>
              </div>
            </div>

            <button style={styles.primaryButton} onClick={() => setStage('forging')}>Aplicar Identidade</button>
          </div>
        </div>
      )}

      {/* --- ETAPA 5: FORGING INSTANCE (PROGRESS BAR 85%) --- */}
      {stage === 'forging' && (
        <div style={styles.fullscreenCenter}>
          <div style={{ ...styles.glassCard, maxWidth: '600px', width: '100%', textAlign: 'center' }} className="glass-panel">
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>Compilar Instância</h1>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBarFill, width: `${progress}%` }}></div>
            </div>
            <div style={{ marginTop: '15px', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
              {progress}% - INSTÂNCIA ATIVA
            </div>

            <div style={styles.terminalConsole}>
              {forgingLogs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: '6px' }}>&gt; {log}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- ETAPA 6: TOUR INTERATIVO OBRIGATÓRIO --- */}
      {stage === 'tour' && (
        <div style={styles.fullscreenCenter}>
          <div style={{ ...styles.glassCard, maxWidth: '550px', textAlign: 'center' }} className="glass-panel">
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>GUIA DO IMPÉRIO</span>
            <h1 style={{ fontSize: '28px', fontWeight: '800', marginTop: '10px', marginBottom: '20px' }}>Guia Rápido de Utilização</h1>
            
            {tourStep === 0 && (
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>O teu comando central está no **Dashboard**. As funções principais (como projetos e faturamento) ficam concentradas em botões grandes no meio da tua tela.</p>
            )}
            {tourStep === 1 && (
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Utiliza a **Barra Lateral** para gerenciar os teus utilitários essenciais: Perfil, Configurações de Servidor, Manual do Usuário e o teu Assistente de Inteligência Artificial.</p>
            )}
            {tourStep === 2 && (
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>No **Super Canva**, tu procuras pelo bloco ideal, arrastas e soltas diretamente na malha espacial. O sistema injeta automaticamente o código e conecta as APIs.</p>
            )}

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px' }}>
              {tourStep > 0 && (
                <button style={{ ...styles.primaryButton, background: 'transparent', color: '#fff', border: '1px solid var(--border-color)' }} onClick={() => setTourStep(tourStep - 1)}>Anterior</button>
              )}
              {tourStep < 2 ? (
                <button style={styles.primaryButton} onClick={() => setTourStep(tourStep + 1)}>Próximo</button>
              ) : (
                <button style={styles.primaryButton} onClick={() => setStage('dashboard')}>Começar</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ETAPA 7: WORKSPACE / DASHBOARD --- */}
      {stage === 'dashboard' && (
        <div style={styles.dashboardContainer}>
          {/* BARRA LATERAL FIXA - UTILITÁRIOS */}
          <aside style={styles.sidebar}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '30px' }}>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>HAPRES</span>
                <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--accent-primary)', background: 'rgba(197, 160, 89, 0.12)', padding: '2px 8px', borderRadius: '20px' }}>SOVEREIGN</span>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Overview' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Overview' ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                  onClick={() => setActiveMenu('Overview')}
                >
                  <i className="fa-solid fa-grid-2"></i> Visão Geral
                </div>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Super Canva' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Super Canva' ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                  onClick={() => setActiveMenu('Super Canva')}
                >
                  <i className="fa-solid fa-cubes"></i> Super Canva
                </div>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Co-Pilot IA' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Co-Pilot IA' ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                  onClick={() => setActiveMenu('Co-Pilot IA')}
                >
                  <i className="fa-solid fa-brain"></i> Co-Pilot IA
                </div>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Suporte Neural' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Suporte Neural' ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                  onClick={() => setActiveMenu('Suporte Neural')}
                >
                  <i className="fa-solid fa-headset"></i> Suporte Neural
                </div>

                {/* ABA SECRETA DE ADMINISTRADOR ROOT */}
                {(email === "henryserpa11@gmail.com" || email === "henrytrabalho11@gmail.com" || whatsapp.includes("992819767")) && (
                  <div 
                    style={{ ...styles.navItem, color: activeMenu === 'Central Mestre' ? 'var(--accent-secondary)' : 'var(--text-muted)', background: activeMenu === 'Central Mestre' ? 'rgba(16,185,129,0.05)' : 'transparent', borderLeft: '2px solid var(--accent-secondary)' }}
                    onClick={() => setActiveMenu('Central Mestre')}
                  >
                    <i className="fa-solid fa-shield-halved"></i> Central Mestre
                  </div>
                )}
              </nav>
            </div>

            {/* Perfil logado no fundo da Sidebar */}
            <div style={styles.sidebarProfile}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', color: '#000' }}>
                {nome.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{nome}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Chave: {chaveMestra}</div>
              </div>
            </div>
          </aside>

          {/* PAINEL CENTRAL DE CONTEÚDO */}
          <main style={styles.workspace}>
            
            {/* VIEW 1: OVERVIEW COMPLETA */}
            {activeMenu === 'Overview' && (
              <div style={{ width: '100%', maxWidth: '1000px' }}>
                <div style={{ marginBottom: '40px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>CORES & DADOS</span>
                  <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '6px' }}>Dashboard Central</h1>
                </div>

                {/* Grid Centralizado de Funções e Métricas */}
                <div style={styles.centralMobileGrid}>
                  <div style={styles.bentoTile} className="glass-panel" onClick={() => setActiveMenu('Super Canva')}>
                    <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '15px' }}></i>
                    <h3>Super Canva</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '5px' }}>Arrasta e solta de precisão de microsserviços</p>
                  </div>

                  <div style={styles.bentoTile} className="glass-panel">
                    <i className="fa-solid fa-wallet" style={{ fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '15px' }}></i>
                    <h3>Faturamento Ativo</h3>
                    <p style={{ fontSize: '24px', fontWeight: '800', marginTop: '5px' }}>R$ 12.450,00</p>
                    <p style={{ fontSize: '11px', color: 'var(--accent-secondary)', marginTop: '5px' }}><i className="fa-solid fa-circle"></i> Online</p>
                  </div>

                  <div style={styles.bentoTile} className="glass-panel">
                    <i className="fa-solid fa-circle-nodes" style={{ fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '15px' }}></i>
                    <h3>Módulos Ativos</h3>
                    <p style={{ fontSize: '24px', fontWeight: '800', marginTop: '5px' }}>{modulosInjetados.length}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Microsserviços instalados</p>
                  </div>

                  <div style={styles.bentoTile} className="glass-panel" onClick={() => setActiveMenu('Co-Pilot IA')}>
                    <i className="fa-solid fa-robot" style={{ fontSize: '32px', color: 'var(--accent-primary)', marginBottom: '15px' }}></i>
                    <h3>Assistente Neural</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '5px' }}>Peça alterações diretamente no chat</p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: SUPER CANVA (CATÁLOGO E DRAG & DROP) */}
            {activeMenu === 'Super Canva' && (
              <div style={{ width: '100%', maxWidth: '1100px' }}>
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>BUILDER VISUAL</span>
                  <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '6px' }}>Super Canva Engine</h1>
                </div>

                <div style={styles.canvaLayout}>
                  {/* Catálogo com Pesquisa */}
                  <div style={styles.canvaSidebar}>
                    <input 
                      type="text" 
                      style={styles.inputSearch} 
                      placeholder="Buscar elementos..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div style={styles.catalogGrid}>
                      {filteredCatalog.map(m => (
                        <div 
                          key={m.id} 
                          draggable 
                          onDragStart={(e) => handleDragStart(e, m)}
                          style={styles.draggableCard}
                        >
                          <i className={`fa-solid ${m.icon}`} style={{ fontSize: '20px', color: 'var(--accent-primary)', marginBottom: '8px' }}></i>
                          <div style={{ fontSize: '12px', fontWeight: '600' }}>{m.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dropzone do Canva */}
                  <div 
                    style={styles.canvaWorkspace} 
                    onDragOver={handleDragOver} 
                    onDrop={handleDrop}
                  >
                    {modulosInjetados.length === 0 ? (
                      <div style={{ color: 'rgba(255,255,255,0.15)', textAlign: 'center', pointerEvents: 'none' }}>
                        <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
                        <h3>Arrasta os elementos do catálogo para aqui</h3>
                      </div>
                    ) : (
                      modulosInjetados.map(m => (
                        <div 
                          key={m.uniqueId} 
                          style={{ ...styles.canvasElement, left: m.x, top: m.y }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className={`fa-solid ${m.icon}`} style={{ color: 'var(--accent-primary)' }}></i>
                            <span style={{ fontSize: '12px', fontWeight: '700' }}>{m.name}</span>
                          </div>
                          <span style={{ fontSize: '10px', color: 'var(--accent-secondary)', display: 'block', marginTop: '5px' }}>● API ATIVA</span>
                          <button 
                            onClick={() => handleRemoveModule(m.uniqueId)}
                            style={styles.btnRemoveElement}
                          >
                            Excluir
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: CO-PILOT IA */}
            {activeMenu === 'Co-Pilot IA' && (
              <div style={{ width: '100%', maxWidth: '800px' }}>
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em' }}>AI ASSISTANT</span>
                  <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '6px' }}>Co-Pilot IA</h1>
                </div>

                <div style={styles.chatContainer} className="glass-panel">
                  <div style={styles.chatHistory}>
                    {aiChats.map((chat, idx) => (
                      <div 
                        key={idx} 
                        style={{
                          ...styles.chatBubble,
                          alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                          backgroundColor: chat.role === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
                          color: chat.role === 'user' ? '#000' : '#fff'
                        }}
                      >
                        {chat.msg}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', padding: '20px', borderTop: '1px solid var(--border-color)' }}>
                    <input 
                      type="text" 
                      style={styles.chatInput} 
                      placeholder="Pergunta-me qualquer coisa sobre a tua infraestrutura..." 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendAi()}
                    />
                    <button style={styles.primaryButton} onClick={handleSendAi}>Enviar</button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: SUPORTE NEURAL */}
            {activeMenu === 'Suporte Neural' && (
              <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
                <i className="fa-solid fa-headset" style={{ fontSize: '48px', color: 'var(--accent-primary)', marginBottom: '20px' }}></i>
                <h1 style={{ fontSize: '32px', fontWeight: '800' }}>Suporte Neural</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px', maxWidth: '500px', margin: '15px auto', lineHeight: '1.6' }}>A tua instância encontra-se a funcionar em perfeitas condições. Quaisquer alertas de tráfego, faturamento ou API serão indicados em tempo real nesta central.</p>
              </div>
            )}

            {/* VIEW 5: CENTRAL MESTRE (ROOT MODOS EXCLUSIVOS DO HENRY) */}
            {activeMenu === 'Central Mestre' && (
              <div style={{ width: '100%', maxWidth: '1000px' }}>
                <div style={styles.rootBanner}>
                  <h3 style={{ color: 'var(--accent-secondary)', fontWeight: '800' }}><i className="fa-solid fa-shield-halved"></i> MODO DIRETOR ATIVO</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Tens controlo absoluto sobre as instâncias globais do Hapres.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '30px' }}>
                  <div style={styles.rootStatCard} className="glass-panel">
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Utilizadores Globais</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '5px' }}>1.452</div>
                  </div>
                  <div style={styles.rootStatCard} className="glass-panel">
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Faturamento Global</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '5px', color: 'var(--accent-secondary)' }}>R$ 140.842</div>
                  </div>
                  <div style={styles.rootStatCard} className="glass-panel">
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aplicações em Produção</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '5px' }}>842</div>
                  </div>
                  <div style={styles.rootStatCard} className="glass-panel">
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Carga do Servidor</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '5px' }}>12%</div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      )}
    </div>
  );
}

// --- ESTILOS AUXILIARES ---
const styles = {
  fullscreenCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    padding: '24px'
  },
  glassCard: {
    background: 'var(--bg-card)',
    backdropFilter: 'blur(30px)',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    padding: '48px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
    textAlign: 'center'
  },
  indicatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    margin: '30px 0'
  },
  dot: {
    height: '10px',
    borderRadius: '5px',
    transition: 'all 0.3s ease'
  },
  primaryButton: {
    background: 'var(--accent-primary)',
    color: '#000',
    fontWeight: '700',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  input: {
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid var(--border-color)',
    padding: '16px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  themeCard: {
    background: 'var(--bg-card)',
    borderRadius: '20px',
    padding: '30px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s'
  },
  progressBarContainer: {
    width: '100%',
    height: '6px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '3px',
    marginTop: '30px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    background: 'var(--accent-primary)',
    transition: 'width 0.2s linear'
  },
  terminalConsole: {
    background: 'rgba(0,0,0,0.6)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '24px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    textAlign: 'left',
    marginTop: '30px',
    color: '#10b981',
    maxHeight: '180px',
    overflowY: 'auto'
  },
  dashboardContainer: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    height: '100vh',
    overflow: 'hidden'
  },
  sidebar: {
    background: '#07050d',
    borderRight: '1px solid var(--border-color)',
    padding: '40px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  sidebarProfile: {
    background: 'rgba(255,255,255,0.02)',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.02)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  workspace: {
    padding: '48px 56px',
    overflowY: 'auto',
    background: 'radial-gradient(circle at 50% 0%, #15102a 0%, var(--bg-main) 60%)'
  },
  centralMobileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    width: '100%',
    maxWidth: '750px',
    marginTop: '40px'
  },
  bentoTile: {
    padding: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  canvaLayout: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    height: '580px',
    border: '1px solid var(--border-color)',
    borderRadius: '24px',
    overflow: 'hidden'
  },
  canvaSidebar: {
    background: 'rgba(5, 5, 8, 0.95)',
    padding: '24px',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column'
  },
  inputSearch: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-color)',
    padding: '14px',
    borderRadius: '10px',
    color: '#fff',
    outline: 'none',
    marginBottom: '20px'
  },
  catalogGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    overflowY: 'auto'
  },
  draggableCard: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '16px 12px',
    textAlign: 'center',
    cursor: 'grab',
    userSelect: 'none'
  },
  canvaWorkspace: {
    background: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
    backgroundColor: '#09090c',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  canvasElement: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid var(--accent-primary)',
    padding: '16px',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    minWidth: '150px'
  },
  btnRemoveElement: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: 'none',
    borderRadius: '8px',
    padding: '4px 8px',
    fontSize: '11px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%'
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    borderRadius: '24px',
    overflow: 'hidden'
  },
  chatHistory: {
    flexGrow: 1,
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  chatBubble: {
    maxWidth: '80%',
    padding: '14px 20px',
    borderRadius: '16px',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  chatInput: {
    flexGrow: 1,
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '14px',
    color: '#fff',
    outline: 'none'
  },
  rootBanner: {
    background: 'linear-gradient(90deg, rgba(16,185,129,0.08) 0%, transparent 100%)',
    borderLeft: '4px solid var(--accent-secondary)',
    padding: '20px 24px',
    borderRadius: '0 16px 16px 0'
  },
  rootStatCard: {
    padding: '24px',
    borderRadius: '16px'
  }
};
