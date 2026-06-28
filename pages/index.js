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
  const [activeTheme, setActiveTheme] = useState('luxury'); // luxury, minimalist, neon, sapphire

  // Progresso do Forging (85% Loading)
  const [progress, setProgress] = useState(0);
  const [forgingLogs, setForgingLogs] = useState([]);

  // Tour Interativo
  const [tourStep, setTourStep] = useState(0);

  // Navegação do Dashboard
  const [activeMenu, setActiveMenu] = useState('Overview'); // Overview, Super Canva, Co-Pilot IA, Suporte Neural, Perfil, Configurações, Manual, Central Mestre

  // Configurações do Sistema Altamente Expandidas (Stripe/Vercel Tech-Luxury Style)
  const [apiKeyOpenAI, setApiKeyOpenAI] = useState('sk-proj-••••••••••••••••34a1');
  const [apiKeyAnthropic, setApiKeyAnthropic] = useState('sk-ant-••••••••••••••••92b3');
  const [sslActive, setSslActive] = useState(true);
  const [serverRegion, setServerRegion] = useState('sa-east-1');
  const [webhookUrl, setWebhookUrl] = useState('https://api.hapres.com/v1/webhook/receiver_01');
  const [backupSchedule, setBackupSchedule] = useState('daily'); // daily, weekly, manual
  const [aiTemperature, setAiTemperature] = useState(0.7);
  const [rateLimit, setRateLimit] = useState(60); // req/min
  const [customDomain, setCustomDomain] = useState('app.henryserpa.com');
  const [smtpHost, setSmtpHost] = useState('smtp.sovereign.io');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('auth@sovereign.io');
  const [edgeCaching, setEdgeCaching] = useState(true);
  const [dbBackupLimit, setDbBackupLimit] = useState(10); // backups retidos

  // Gestão de Multi-Contas (Perfil)
  const [contas, setContas] = useState([
    { id: 1, nome: "Henry Serpa", role: "Root Administrator", avatar: "H", email: "henryserpa11@gmail.com", status: "Ativo" }
  ]);
  const [contaAtual, setContaAtual] = useState({ id: 1, nome: "Henry Serpa", role: "Root Administrator", avatar: "H", email: "henryserpa11@gmail.com", status: "Ativo" });
  const [novoPerfilNome, setNovoPerfilNome] = useState('');
  const [novoPerfilEmail, setNovoPerfilEmail] = useState('');
  const [novoPerfilRole, setNovoPerfilRole] = useState('Premium Operator');

  // Super Canva (Catálogo e Canvas de Arrasto)
  const [searchQuery, setSearchQuery] = useState('');
  const [modulosInjetados, setModulosInjetados] = useState([]);
  const [modulosDisponiveis] = useState([
    { id: 'mod_pix', name: 'Gateway Pix VIP', icon: 'fa-qrcode', desc: 'Processamento instantâneo de faturamento com split automático.', cat: 'faturamento' },
    { id: 'mod_futebol', name: 'Sport Bot Pro', icon: 'fa-soccer-ball', desc: 'Análise de placares e probabilidade esportiva em tempo real.', cat: 'futebol' },
    { id: 'mod_fe', name: 'Lumen Diei (Fé)', icon: 'fa-church', desc: 'Liturgia diária, exame de consciência e captação de dízimo.', cat: 'fe' },
    { id: 'mod_crypto', name: 'Cripto Matrix', icon: 'fa-bitcoin', desc: 'Cotações de criptomoedas e tokens de utilidade em tempo real.', cat: 'crypto' },
    { id: 'mod_agendamento', name: 'Agendamento High-Ticket', icon: 'fa-calendar-alt', desc: 'Gestão de horários de luxo e reservas integradas.', cat: 'agendamento' }
  ]);

  // Estados dos Componentes Funcionais do Canva
  const [pixAmount, setPixAmount] = useState('97.00');
  const [pixStatus, setPixStatus] = useState('Aguardando pagamento...');
  const [conscienciaAnswer, setConscienciaAnswer] = useState(null);

  // Inteligência Artificial (Co-Pilot IA)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChats, setAiLogs] = useState([
    { role: 'system', msg: 'Sovereign Core ativo. Sou o teu Assistente Neural. Podes me fazer qualquer pergunta (como "quanto é 1+1") ou pedir para eu adicionar ou excluir módulos na tua malha de criação.' }
  ]);

  // --- COMPORTAMENTOS ---

  // Slide de Overboarding
  const overboards = [
    { title: "A Fábrica de Magia", text: "Cria qualquer tipo de aplicação no mundo de forma instantânea, prática e livre de burocracias técnicas." },
    { title: "Módulos Vivos", text: "Injeta placares esportivos, gateways de pagamento Pix e liturgia católica arrastando os blocos direto no Canva." },
    { title: "Soberania Inquebrável", text: "O teu link gerado na hora, o teu app publicado imediatamente, sem depender de terceiros ou perder faturamento." },
    { title: "Chave Mestra Criada", text: "Autonomia completa controlando utilizadores e instâncias diretamente pelo teu painel administrativo." }
  ];

  const handleNextOverboard = () => {
    if (overboardIndex < overboards.length - 1) {
      setOverboardIndex(overboardIndex + 1);
    } else {
      setStage('register');
    }
  };

  // Processamento do Cadastro (Identity Forge)
  const handleRegister = (e) => {
    e.preventDefault();
    if (!nome.trim() || !whatsapp.trim() || !email.trim()) {
      alert("Por favor, preenche todos os campos obrigatórios.");
      return;
    }
    const token = `SRV_ROOT_${Math.floor(1000 + Math.random() * 9000)}_${nome.split(' ')[0].toUpperCase()}`;
    setChaveMestra(token);
    
    // Atualiza conta atual do criador
    const novaConta = { id: Date.now(), nome, role: "Root Administrator", avatar: nome.charAt(0).toUpperCase(), email, status: "Ativo" };
    setContaAtual(novaConta);
    setContas([novaConta]);
    
    setStage('plans');
  };

  // Simulação de Loading do Forging
  useEffect(() => {
    if (stage !== 'forging') return;

    const logs = [
      "Inicializando ambiente de segurança isolado...",
      "Alocando servidores na nuvem soberana de alta performance...",
      "Injetando inteligência artificial nativa (Claude 3.5 Sonnet / GPT-4o)...",
      "Compilando componentes de design de luxo tecnológico...",
      "Sincronizando bancos de dados em tempo real...",
      "Gerando PWA instalável com service-workers ativos..."
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
    }, 250);

    return () => clearInterval(interval);
  }, [stage]);

  // Escolha Cromática Dinâmica (Chroma Forge)
  const themes = {
    luxury: {
      '--bg-main': '#050311', // Roxo escuro profundo / Noturno nativo
      '--bg-card': 'rgba(25, 18, 55, 0.45)', // Glassmorphism de baixa opacidade
      '--border-color': 'rgba(197, 160, 89, 0.15)',
      '--accent-primary': '#8b5cf6', // Roxo Neon de Viagens
      '--accent-secondary': '#10b981', // Esmeralda
      '--accent-glow': 'rgba(139, 92, 246, 0.15)',
      '--text-main': '#f3f4f6',
      '--text-muted': '#8e8ca2'
    },
    minimalist: {
      '--bg-main': '#020202',
      '--bg-card': 'rgba(255, 255, 255, 0.03)',
      '--border-color': 'rgba(255, 255, 255, 0.05)',
      '--accent-primary': '#e5e7eb', // Platina
      '--accent-secondary': '#4b5563',
      '--accent-glow': 'rgba(255, 255, 255, 0.02)',
      '--text-main': '#f9fafb',
      '--text-muted': '#5c5e69'
    },
    neon: {
      '--bg-main': '#010004',
      '--bg-card': 'rgba(255, 0, 85, 0.05)',
      '--border-color': 'rgba(255, 0, 85, 0.25)',
      '--accent-primary': '#ff0055', // Rosa Cyberpunk
      '--accent-secondary': '#00ffcc', // Ciano Neon
      '--accent-glow': 'rgba(255, 0, 85, 0.05)',
      '--text-main': '#ffffff',
      '--text-muted': '#7c3aed'
    },
    sapphire: {
      '--bg-main': '#00020a',
      '--bg-card': 'rgba(59, 130, 246, 0.05)',
      '--border-color': 'rgba(59, 130, 246, 0.2)',
      '--accent-primary': '#3b82f6', // Safira Real
      '--accent-secondary': '#f59e0b', // Âmbar
      '--accent-glow': 'rgba(59, 130, 246, 0.03)',
      '--text-main': '#f1f5f9',
      '--text-muted': '#475569'
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
    const x = e.clientX - rect.left - 140; // Centraliza o elemento no drop
    const y = e.clientY - rect.top - 80;

    const novoModulo = {
      ...item,
      uniqueId: Date.now(),
      x: x < 10 ? 10 : x,
      y: y < 10 ? 10 : y
    };

    setModulosInjetados([...modulosInjetados, novoModulo]);
  };

  const handleRemoveModule = (uniqueId) => {
    setModulosInjetados(modulosInjetados.filter(m => m.uniqueId !== uniqueId));
  };

  // Envio de mensagem para a IA e controle de elementos
  const handleSendAi = () => {
    if (!aiPrompt.trim()) return;
    const cleanPrompt = aiPrompt.toLowerCase();
    const newChat = [
      ...aiChats,
      { role: 'user', msg: aiPrompt }
    ];
    setAiLogs(newChat);
    setAiPrompt('');

    setTimeout(() => {
      // IA executora adicionando módulos de forma autônoma
      if (cleanPrompt.includes('adicionar') || cleanPrompt.includes('injetar') || cleanPrompt.includes('colocar')) {
        let moduloEncontrado = null;
        if (cleanPrompt.includes('pix')) moduloEncontrado = modulosDisponiveis.find(m => m.id === 'mod_pix');
        if (cleanPrompt.includes('futebol') || cleanPrompt.includes('esporte')) moduloEncontrado = modulosDisponiveis.find(m => m.id === 'mod_futebol');
        if (cleanPrompt.includes('fé') || cleanPrompt.includes('liturgia') || cleanPrompt.includes('igreja') || cleanPrompt.includes('lumen')) moduloEncontrado = modulosDisponiveis.find(m => m.id === 'mod_fe');
        if (cleanPrompt.includes('cripto') || cleanPrompt.includes('bitcoin')) moduloEncontrado = modulosDisponiveis.find(m => m.id === 'mod_crypto');
        if (cleanPrompt.includes('agendamento')) moduloEncontrado = modulosDisponiveis.find(m => m.id === 'mod_agendamento');

        if (moduloEncontrado) {
          const novoModulo = {
            ...moduloEncontrado,
            uniqueId: Date.now(),
            x: 80 + Math.random() * 200,
            y: 80 + Math.random() * 150
          };
          setModulosInjetados((prev) => [...prev, novoModulo]);
          setAiLogs([
            ...newChat,
            { role: 'system', msg: `Entendido perfeitamente. Acabei de mapear e injetar o módulo funcional "${moduloEncontrado.name}" diretamente nas coordenadas do teu Canva. Ele já está operacional e sincronizado.` }
          ]);
          return;
        }
      }

      // Respostas matemáticas requisitadas no manual
      if (cleanPrompt.includes('1+1') || cleanPrompt.includes('1 + 1')) {
        setAiLogs([
          ...newChat,
          { role: 'system', msg: 'Análise matemática elementar concluída: 1 + 1 é igual a 2. Desejas aplicar alguma otimização de faturamento ou microsserviço com base neste cálculo?' }
        ]);
        return;
      }

      // Resposta padrão
      setAiLogs([
        ...newChat,
        { role: 'system', msg: `Sovereign Core processou a tua instrução: "${aiPrompt}". A sincronizar nós de rede e barramento de dados seguros.` }
      ]);
    }, 700);
  };

  // Gestão de Multi-Contas (Adicionar Perfil)
  const handleAdicionarPerfil = (e) => {
    e.preventDefault();
    if (!novoPerfilNome.trim() || !novoPerfilEmail.trim()) {
      alert("Por favor, preenche todos os campos.");
      return;
    }
    const novo = {
      id: Date.now(),
      nome: novoPerfilNome,
      role: novoPerfilEmail.toLowerCase().includes('henry') ? "Root Administrator" : novoPerfilRole,
      avatar: novoPerfilNome.charAt(0).toUpperCase(),
      email: novoPerfilEmail,
      status: "Ativo"
    };
    setContas([...contas, novo]);
    setNovoPerfilNome('');
    setNovoPerfilEmail('');
    alert(`Conta operacional de ${novo.nome} vinculada com sucesso!`);
  };

  const handleAlternarConta = (conta) => {
    setContaAtual(conta);
    setEmail(conta.email);
    setNome(conta.nome);
  };

  const handleLogout = () => {
    setStage('overboarding');
    setOverboardIndex(0);
    setNome('');
    setEmail('');
    setWhatsApp('');
    setChaveMestra('');
    setModulosInjetados([]);
  };

  // Filtragem de catálogo do Canva
  const filteredCatalog = modulosDisponiveis.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ ...getThemeStyles(), minHeight: '100vh', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

      {/* --- ETAPA 1: OVERBOARDING COMPLETO --- */}
      {stage === 'overboarding' && (
        <div style={styles.fullscreenCenter}>
          <div style={styles.glassCard} className="glass-panel">
            <span style={styles.badgeMono}>SOVEREIGN PLATFORM // STAGE 01</span>
            <h1 style={styles.overboardTitle}>{overboards[overboardIndex].title}</h1>
            <p style={styles.overboardText}>{overboards[overboardIndex].text}</p>
            
            <div style={styles.indicatorContainer}>
              {overboards.map((_, idx) => (
                <div key={idx} style={{
                  ...styles.dot,
                  backgroundColor: idx === overboardIndex ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  width: idx === overboardIndex ? '24px' : '6px'
                }} />
              ))}
            </div>

            <button style={styles.primaryButton} onClick={handleNextOverboard}>Avançar</button>
          </div>
        </div>
      )}

      {/* --- ETAPA 2: IDENTITY FORGE (CADASTRO EXIGIDO) --- */}
      {stage === 'register' && (
        <div style={styles.fullscreenCenter}>
          <form style={{ ...styles.glassCard, maxWidth: '480px' }} onSubmit={handleRegister} className="glass-panel">
            <span style={styles.badgeMono}>SECURE PROTOCOL</span>
            <h1 style={{ ...styles.overboardTitle, fontSize: '28px', marginBottom: '8px' }}>Identity Forge</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '13px', lineHeight: '1.5' }}>Cria a tua identidade mestre e gera as tuas chaves lógicas de segurança.</p>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nome Completo</label>
              <input type="text" style={styles.input} placeholder="Henry Serpa" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>WhatsApp Operacional</label>
              <input type="text" style={styles.input} placeholder="(11) 99281-9767" value={whatsapp} onChange={(e) => setWhatsApp(e.target.value)} required />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>E-mail Principal</label>
              <input type="email" style={styles.input} placeholder="henryserpa11@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <button type="submit" style={{ ...styles.primaryButton, width: '100%', marginTop: '16px' }}>Forjar Instância</button>
          </form>
        </div>
      )}

      {/* --- ETAPA 3: SOVEREIGN PLANS (TABELA DE PREÇOS PRO) --- */}
      {stage === 'plans' && (
        <div style={styles.fullscreenCenter}>
          <div style={{ ...styles.glassCard, maxWidth: '850px', width: '100%' }} className="glass-panel">
            <span style={styles.badgeMono}>PRICING TIERS</span>
            <h1 style={{ ...styles.overboardTitle, fontSize: '32px', marginBottom: '40px' }}>Nível de Permissão</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '30px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Essence (Free)</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }}>Para testes rápidos e fluxos estáticos básicos.</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px', fontSize: '13px' }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px', fontSize: '11px' }}></i> 2 Módulos no Canva</li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px', fontSize: '11px' }}></i> Templates Standard</li>
                  </ul>
                </div>
                <button style={{ ...styles.primaryButton, background: 'transparent', color: '#fff', border: '1px solid var(--border-color)', marginTop: '32px' }} onClick={() => setStage('chroma')}>Continuar com Free</button>
              </div>

              <div style={{ background: 'var(--accent-glow)', padding: '30px', borderRadius: '16px', border: '1px solid var(--accent-primary)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                <span style={{ position: 'absolute', top: '-10px', right: '20px', background: 'var(--accent-primary)', color: '#000', padding: '2px 10px', borderRadius: '4px', fontSize: '9px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>RECOMENDADO</span>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-primary)' }}>SOVEREIGN PRO</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }}>Acesso ilimitado ao ecossistema global, inteligência artificial avançada e publicação nativa.</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px', fontSize: '13px' }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px', fontSize: '11px' }}></i> Todos os Módulos Omni-API</li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px', fontSize: '11px' }}></i> Chroma Forge Expandido</li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}><i className="fa-solid fa-check" style={{ color: 'var(--accent-primary)', marginRight: '10px', fontSize: '11px' }}></i> IA Claude/GPT Executora 24/7</li>
                  </ul>
                </div>
                <button style={{ ...styles.primaryButton, marginTop: '32px' }} onClick={() => setStage('chroma')}>Liberar Acesso Pro</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ETAPA 4: CHROMA FORGE (PALETAS COMPLETAS) --- */}
      {stage === 'chroma' && (
        <div style={styles.fullscreenCenter}>
          <div style={{ ...styles.glassCard, maxWidth: '900px', width: '100%', textAlign: 'center' }} className="glass-panel">
            <span style={styles.badgeMono}>CORE ASSIGNMENT</span>
            <h1 style={{ ...styles.overboardTitle, fontSize: '32px', marginBottom: '40px' }}>Chroma Forge</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <div 
                style={{ ...styles.themeCard, border: activeTheme === 'luxury' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)', boxShadow: '0 8px 32px var(--accent-glow)', background: activeTheme === 'luxury' ? 'var(--accent-glow)' : 'transparent' }}
                onClick={() => setActiveTheme('luxury')}
              >
                <i className="fa-solid fa-crown" style={{ fontSize: '20px', color: '#c5a059', marginBottom: '12px' }}></i>
                <h3 style={{ fontSize: '14px', fontWeight: '700' }}>High-Luxury</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Ouro, Esmeralda & Safira</p>
              </div>

              <div 
                style={{ ...styles.themeCard, border: activeTheme === 'minimalist' ? '1px solid #fff' : '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(255,255,255,0.04)', background: activeTheme === 'minimalist' ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                onClick={() => setActiveTheme('minimalist')}
              >
                <i className="fa-solid fa-feather" style={{ fontSize: '20px', color: '#f3f4f6', marginBottom: '12px' }}></i>
                <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Minimalist</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Branco, Carbono & Cinzas</p>
              </div>

              <div 
                style={{ ...styles.themeCard, border: activeTheme === 'neon' ? '1px solid #ff0055' : '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(255,0,85,0.08)', background: activeTheme === 'neon' ? 'rgba(255,0,85,0.02)' : 'transparent' }}
                onClick={() => setActiveTheme('neon')}
              >
                <i className="fa-solid fa-bolt" style={{ fontSize: '20px', color: '#ff0055', marginBottom: '12px' }}></i>
                <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Vibrant Neon</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Cores intensas & criativas</p>
              </div>

              <div 
                style={{ ...styles.themeCard, border: activeTheme === 'sapphire' ? '1px solid #3b82f6' : '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(59,130,246,0.08)', background: activeTheme === 'sapphire' ? 'rgba(59,130,246,0.02)' : 'transparent' }}
                onClick={() => setActiveTheme('sapphire')}
              >
                <i className="fa-solid fa-gem" style={{ fontSize: '20px', color: '#3b82f6', marginBottom: '12px' }}></i>
                <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Sapphire</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Safira Real & Âmbar</p>
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
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>Compilar Instância</h1>
            <div style={styles.progressBarContainer}>
              <div style={{ ...styles.progressBarFill, width: `${progress}%` }}></div>
            </div>
            <div style={{ marginTop: '16px', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '1px' }}>
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
            <span style={styles.badgeMono}>SOVEREIGN ONBOARDING</span>
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginTop: '10px', marginBottom: '20px', letterSpacing: '-0.5px' }}>Guia Rápido de Utilização</h1>
            
            {tourStep === 0 && (
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>O teu comando central está no **Dashboard**. As funções principais (como projetos e faturamento) ficam concentradas em botões grandes no meio da tua tela.</p>
            )}
            {tourStep === 1 && (
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>Utiliza a **Barra Lateral** para gerenciar os teus utilitários essenciais: Perfil, Configurações de Servidor, Manual do Usuário e o teu Assistente de Inteligência Artificial.</p>
            )}
            {tourStep === 2 && (
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '14px' }}>No **Super Canva**, tu procuras pelo bloco ideal, arrastas e soltas diretamente na malha espacial. O sistema injeta automaticamente o código e conecta as APIs.</p>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px' }}>
              {tourStep > 0 && (
                <button style={{ ...styles.primaryButton, background: 'transparent', color: '#fff', border: '1px solid var(--border-color)', padding: '12px 24px' }} onClick={() => setTourStep(tourStep - 1)}>Anterior</button>
              )}
              {tourStep < 2 ? (
                <button style={{ ...styles.primaryButton, padding: '12px 24px' }} onClick={() => setTourStep(tourStep + 1)}>Próximo</button>
              ) : (
                <button style={{ ...styles.primaryButton, padding: '12px 24px' }} onClick={() => setStage('dashboard')}>Começar</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ETAPA 7: WORKSPACE / DASHBOARD PRINCIPAL (LUXO TECNOLÓGICO SEV_CORE) --- */}
      {stage === 'dashboard' && (
        <div style={styles.dashboardContainer}>
          {/* BARRA LATERAL FIXA - UTILITÁRIOS */}
          <aside style={styles.sidebar}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>HAPRES</span>
                <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--accent-primary)', background: 'var(--accent-glow)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)' }}>SOVEREIGN</span>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Overview' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Overview' ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: activeMenu === 'Overview' ? '3px solid var(--accent-primary)' : '3px solid transparent' }}
                  onClick={() => setActiveMenu('Overview')}
                >
                  <i className="fa-solid fa-chart-pie" style={{ fontSize: '13px' }}></i> Visão Geral
                </div>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Super Canva' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Super Canva' ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: activeMenu === 'Super Canva' ? '3px solid var(--accent-primary)' : '3px solid transparent' }}
                  onClick={() => setActiveMenu('Super Canva')}
                >
                  <i className="fa-solid fa-cubes" style={{ fontSize: '13px' }}></i> Super Canva
                </div>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Co-Pilot IA' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Co-Pilot IA' ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: activeMenu === 'Co-Pilot IA' ? '3px solid var(--accent-primary)' : '3px solid transparent' }}
                  onClick={() => setActiveMenu('Co-Pilot IA')}
                >
                  <i className="fa-solid fa-brain" style={{ fontSize: '13px' }}></i> Co-Pilot IA
                </div>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Suporte Neural' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Suporte Neural' ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: activeMenu === 'Suporte Neural' ? '3px solid var(--accent-primary)' : '3px solid transparent' }}
                  onClick={() => setActiveMenu('Suporte Neural')}
                >
                  <i className="fa-solid fa-headset" style={{ fontSize: '13px' }}></i> Suporte Neural
                </div>
                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Perfil' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Perfil' ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: activeMenu === 'Perfil' ? '3px solid var(--accent-primary)' : '3px solid transparent' }}
                  onClick={() => setActiveMenu('Perfil')}
                >
                  <i className="fa-solid fa-circle-user" style={{ fontSize: '13px' }}></i> Meu Perfil
                </div>

                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Configurações' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Configurações' ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: activeMenu === 'Configurações' ? '3px solid var(--accent-primary)' : '3px solid transparent' }}
                  onClick={() => setActiveMenu('Configurações')}
                >
                  <i className="fa-solid fa-gear" style={{ fontSize: '13px' }}></i> Configurações
                </div>

                <div 
                  style={{ ...styles.navItem, color: activeMenu === 'Manual' ? '#fff' : 'var(--text-muted)', background: activeMenu === 'Manual' ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: activeMenu === 'Manual' ? '3px solid var(--accent-primary)' : '3px solid transparent' }}
                  onClick={() => setActiveMenu('Manual')}
                >
                  <i className="fa-solid fa-book-open" style={{ fontSize: '13px' }}></i> Manual
                </div>

                {/* ABA SECRETA DE ADMINISTRADOR ROOT */}
                {(email === "henryserpa11@gmail.com" || email === "henrytrabalho11@gmail.com" || whatsapp.includes("992819767")) && (
                  <div 
                    style={{ ...styles.navItem, color: activeMenu === 'Central Mestre' ? 'var(--accent-secondary)' : 'var(--text-muted)', background: activeMenu === 'Central Mestre' ? 'rgba(16,185,129,0.05)' : 'transparent', borderLeft: '3px solid var(--accent-secondary)' }}
                    onClick={() => setActiveMenu('Central Mestre')}
                  >
                    <i className="fa-solid fa-shield-halved" style={{ fontSize: '13px' }}></i> Central Mestre
                  </div>
                )}
              </nav>
            </div>

            {/* Perfil logado no fundo da Sidebar */}
            <div style={styles.sidebarProfile}>
              <div style={{ width: '34px', height: '38px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', color: '#000' }}>
                {contaAtual.avatar}
              </div>
              <div style={{ overflow: 'hidden', marginLeft: '10px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{contaAtual.nome}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{contaAtual.role.split(' ')[0]}</div>
              </div>
            </div>
          </aside>

          {/* PAINEL CENTRAL DE CONTEÚDO (DESIGN PREMIUM GLOWING DE LUXO) */}
          <main style={styles.workspace}>
            
            {/* VIEW 1: OVERVIEW COMPLETA COM GRÁFICOS SVG */}
            {activeMenu === 'Overview' && (
              <div style={{ width: '100%', maxWidth: '1000px' }}>
                
                {/* Cabeçalho centralizado com foto e localização estilo App Viagens */}
                <div style={styles.headerProfileContainer}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={styles.headerAvatar}>
                      {contaAtual.nome.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>Hello, {contaAtual.nome}</h2>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <i className="fa-solid fa-location-dot" style={{ color: 'var(--accent-primary)' }}></i> Sovereign Node: {serverRegion}
                      </p>
                    </div>
                  </div>
                  <div style={styles.headerStatsMono}>
                    <span style={{ color: 'var(--accent-secondary)' }}>● CORE INSTANCE</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '3px' }}>API STATUS: FUNCTIONAL</span>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <span style={styles.badgeMono}>SOVEREIGN STATUS</span>
                  <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '6px', letterSpacing: '-1.5px' }}>Comando Central</h1>
                </div>

                {/* Grid Centralizado de Funções e Métricas estilo e0a0d0.jpg & Bento Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                  
                  <div className="glass-card" style={styles.luxuryDashboardCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                        <i className="fa-solid fa-wallet" style={{ color: 'var(--accent-primary)', fontSize: '16px' }}></i>
                      </div>
                      <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>ONLINE</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500' }}>Faturamento Recorrente</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', letterSpacing: '-1px', color: '#fff' }}>R$ 12.450,00</div>
                  </div>

                  <div className="glass-card" style={styles.luxuryDashboardCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                        <i className="fa-solid fa-cubes" style={{ color: 'var(--accent-primary)', fontSize: '16px' }}></i>
                      </div>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500' }}>Módulos Ativos no Canva</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', letterSpacing: '-1px', color: '#fff' }}>{modulosInjetados.length} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '400' }}>Ativos</span></div>
                  </div>

                  {/* Widget Real-Time de Latência e nós de Rede */}
                  <div className="glass-card" style={styles.luxuryDashboardCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                        <i className="fa-solid fa-server" style={{ color: 'var(--accent-primary)', fontSize: '16px' }}></i>
                      </div>
                      <span style={{ fontSize: '10px', background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>SECURE</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500' }}>Operational Readouts</div>
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff' }}>
                      <div>PING: <span style={{ color: 'var(--accent-secondary)' }}>12ms</span></div>
                      <div>SSL: <span style={{ color: 'var(--accent-secondary)' }}>ACTIVE (TLS 1.3)</span></div>
                    </div>
                  </div>
                </div>

                {/* Bento Grid Layout Principal - Seção de Schedule e Gráficos combinados */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '32px' }}>
                  
                  {/* Gráfico de Performance */}
                  <div className="glass-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700' }}><i className="fa-solid fa-chart-line" style={{ color: 'var(--accent-primary)', marginRight: '10px' }}></i> Tráfego do Sistema</h3>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>LIVE METRICS</span>
                    </div>
                    <div style={{ width: '100%', height: '140px', position: 'relative' }}>
                      <svg viewBox="0 0 500 100" style={{ width: '100%', height: '100%' }}>
                        <defs>
                          <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 80 Q 80 20 160 50 T 320 30 T 500 15 L 500 100 L 0 100 Z" fill="url(#glowGrad)" />
                        <path d="M 0 80 Q 80 20 160 50 T 320 30 T 500 15" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" />
                        <circle cx="160" cy="50" r="4" fill="var(--accent-secondary)" />
                        <circle cx="320" cy="30" r="4" fill="var(--accent-primary)" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Bottom Sheet de Schedule / Transações Recentes */}
                  <div className="glass-card" style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: '16px', padding: '24px', color: '#000', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Agenda Recorrente</h3>
                      <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>PRO</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ borderLeft: '3px solid #7b57ff', paddingLeft: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700' }}>Dízimo Lumen Diei</div>
                        <div style={{ fontSize: '10px', color: '#71717a', marginTop: '2px' }}>Disparo às 12:00 via API Pix</div>
                      </div>
                      <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700' }}>Backup de Instâncias</div>
                        <div style={{ fontSize: '10px', color: '#71717a', marginTop: '2px' }}>Região: AWS sa-east-1</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Event Log Terminal integrado diretamente no Dashboard */}
                <div className="glass-card" style={{ background: '#040406', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '700', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>&gt;_ SYSTEM_EVENT_LOG</h3>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>AUTO-SYNC</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#a1a1aa' }}>
                    <div>[20:56:12] <span style={{ color: 'var(--accent-secondary)' }}>SUCCESS</span>: SSL Certificate verified for domain "{customDomain}".</div>
                    <div>[20:57:45] <span style={{ color: 'var(--accent-primary)' }}>INFO</span>: Automatic DB backup created successfully ({dbBackupLimit} retained).</div>
                    <div>[20:59:01] <span style={{ color: 'var(--accent-secondary)' }}>ACTIVE</span>: Edge caching nodes optimized globally (TTFB: 8ms).</div>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: SUPER CANVA (CATÁLOGO AVANÇADO E COMPONENTES COMPLETOS) */}
            {activeMenu === 'Super Canva' && (
              <div style={{ width: '100%', maxWidth: '1150px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <span style={styles.badgeMono}>ENGINE ENVIRONMENT</span>
                  <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '6px', letterSpacing: '-1.5px' }}>Super Canva Engine</h1>
                </div>

                <div style={styles.canvaLayout}>
                  {/* Catálogo de Elementos com Pesquisa */}
                  <div style={styles.canvaSidebar}>
                    <input 
                      type="text" 
                      style={styles.inputSearch} 
                      placeholder="Pesquisar catálogo..." 
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
                          <i className={`fa-solid ${m.icon}`} style={{ fontSize: '18px', color: 'var(--accent-primary)', marginBottom: '8px' }}></i>
                          <div style={{ fontSize: '11px', fontWeight: '700' }}>{m.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Canvas de Produção Inteligente */}
                  <div 
                    style={styles.canvaWorkspace} 
                    onDragOver={handleDragOver} 
                    onDrop={handleDrop}
                  >
                    {modulosInjetados.length === 0 ? (
                      <div style={{ color: 'rgba(255,255,255,0.1)', textAlign: 'center', pointerEvents: 'none' }}>
                        <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--accent-primary)' }}></i>
                        <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Malha de Criação Vazia</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>Arrasta os elementos do catálogo lateral para aqui</p>
                      </div>
                    ) : (
                      modulosInjetados.map(m => (
                        <div 
                          key={m.uniqueId} 
                          style={{ ...styles.canvasElement, left: m.x, top: m.y }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <i className={`fa-solid ${m.icon}`} style={{ color: 'var(--accent-primary)', fontSize: '12px' }}></i>
                              <span style={{ fontSize: '11px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>{m.name}</span>
                            </div>
                            <i className="fa-solid fa-circle" style={{ color: 'var(--accent-secondary)', fontSize: '6px' }}></i>
                          </div>

                          {/* --- COMPONENTE REAL: GATEWAY PIX --- */}
                          {m.id === 'mod_pix' && (
                            <div style={{ fontSize: '12px' }}>
                              <label style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>VALOR DO PIX (R$)</label>
                              <input 
                                type="number" 
                                value={pixAmount} 
                                onChange={(e) => setPixAmount(e.target.value)} 
                                style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 10px', color: '#fff', borderRadius: '6px', fontSize: '11px', outline: 'none', fontFamily: 'var(--font-mono)' }}
                              />
                              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fa-solid fa-qrcode" style={{ fontSize: '24px', color: 'var(--accent-primary)' }}></i>
                                <div>
                                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '11px' }}>PIX Gerado</div>
                                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{pixStatus}</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* --- COMPONENTE REAL: SPORT BOT PRO --- */}
                          {m.id === 'mod_futebol' && (
                            <div style={{ fontSize: '12px', color: '#fff' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px' }}>
                                <span>Real Madrid</span>
                                <span style={{ fontWeight: '800', color: 'var(--accent-primary)' }}>2</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000', padding: '6px 10px', borderRadius: '8px' }}>
                                <span>Barcelona</span>
                                <span style={{ fontWeight: '800', color: 'var(--accent-primary)' }}>1</span>
                              </div>
                              <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                                PROBABILIDADE: 84% VITÓRIA RM
                              </div>
                            </div>
                          )}

                          {/* --- COMPONENTE REAL: LUMEN DIEI (FÉ) --- */}
                          {m.id === 'mod_fe' && (
                            <div style={{ fontSize: '11px', color: '#fff', maxWidth: '280px' }}>
                              <div style={{ background: 'linear-gradient(135deg, #1b1235 0%, #0c081a 100%)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ color: 'var(--accent-primary)', fontWeight: '800', fontSize: '12px' }}>Lumen Diei</div>
                                <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Liturgia Diária & Fé</div>
                                <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', fontSize: '10px', lineHeight: '1.4' }}>
                                  <strong>Evangelho:</strong> "Vós sois o sal da terra e a luz do mundo."
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                  <div style={{ fontWeight: '700', marginBottom: '4px' }}>Exame de Consciência:</div>
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <button onClick={() => setConscienciaAnswer('realizado')} style={{ flex: 1, padding: '4px', background: conscienciaAnswer === 'realizado' ? 'var(--accent-secondary)' : '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '9px', fontWeight: '700' }}>Realizado</button>
                                    <button onClick={() => setConscienciaAnswer('pendente')} style={{ flex: 1, padding: '4px', background: conscienciaAnswer === 'pendente' ? 'var(--accent-primary)' : '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '9px', fontWeight: '700' }}>Pendente</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* --- COMPONENTE REAL: CRIPTO MATRIX --- */}
                          {m.id === 'mod_crypto' && (
                            <div style={{ fontSize: '11px', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>BTC/USD</span>
                                <span style={{ fontWeight: '700', color: 'var(--accent-secondary)' }}>$64.250,00</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)' }}>ETH/USD</span>
                                <span style={{ fontWeight: '700', color: 'var(--accent-secondary)' }}>$3.450,00</span>
                              </div>
                            </div>
                          )}

                          {/* --- COMPONENTE REAL: AGENDAMENTO --- */}
                          {m.id === 'mod_agendamento' && (
                            <div style={{ fontSize: '11px' }}>
                              <div style={{ background: '#000', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                                <div style={{ fontWeight: '700', color: '#fff' }}>Agenda de Mentorias</div>
                                <div style={{ fontSize: '9px', color: 'var(--accent-primary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>PRÓXIMO: HOJE 14:00</div>
                              </div>
                            </div>
                          )}

                          <button 
                            onClick={() => handleRemoveModule(m.uniqueId)}
                            style={styles.btnRemoveElement}
                          >
                            Excluir Módulo
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: CO-PILOT IA (COM SUPORTE A REQUISIÇÕES LIVRES) */}
            {activeMenu === 'Co-Pilot IA' && (
              <div style={{ width: '100%', maxWidth: '850px' }}>
                <div style={{ marginBottom: '30px' }}>
                  <span style={styles.badgeMono}>AI ASSISTANT</span>
                  <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '6px', letterSpacing: '-2px' }}>Co-Pilot IA</h1>
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
                      placeholder="Pergunta-me qualquer coisa (como 'quanto é 1+1') ou pede para adicionar o Pix..." 
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
                <p style={{ color: 'var(--text-muted)', marginTop: '10px', maxWidth: '500px', margin: '15px auto', lineHeight: '1.6' }}>A tua instância encontra-se a funcionar em perfeitas condições. Quaisquer alertas de tráfego, faturamento ou API serão indicados em tempo real nesta central de atendimento autônomo.</p>
              </div>
            )}

            {/* VIEW 5: MEU PERFIL (GERENCIAMENTO DE MULTI-CONTAS EXIGIDO) */}
            {activeMenu === 'Perfil' && (
              <div style={{ width: '100%', maxWidth: '900px' }}>
                <div style={{ marginBottom: '40px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Configurações de Identidade</span>
                  <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '6px', letterSpacing: '-2px' }}>Gerenciamento de Perfil</h1>
                </div>

                {/* Lista de Contas Vinculadas */}
                <div className="glass-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', marginBottom: '32px', boxShadow: '0 8px 32px var(--accent-glow)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Contas Vinculadas nesta Instância</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {contas.map((c) => {
                      const isSelected = c.id === contaAtual.id;
                      return (
                        <div 
                          key={c.id} 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: isSelected ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.2)',
                            border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                            padding: '16px 20px',
                            borderRadius: '16px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isSelected ? 'var(--accent-primary)' : '#231c3c', color: isSelected ? '#000' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>
                              {c.avatar}
                            </div>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                                {c.nome} {isSelected && <span style={{ fontSize: '11px', color: 'var(--accent-primary)', background: 'var(--accent-glow)', padding: '2px 8px', borderRadius: '6px', marginLeft: '10px' }}>Ativa</span>}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{c.email} • {c.role}</div>
                            </div>
                          </div>

                          {!isSelected && (
                            <button 
                              onClick={() => handleAlternarConta(c)}
                              style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Alternar Conta
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Formulário de Adicionar Nova Conta */}
                <div className="glass-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>Adicionar Novo Perfil</h3>
                  <form onSubmit={handleAdicionarPerfil} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Nome do Usuário</label>
                        <input type="text" style={styles.input} placeholder="Ex: Carlos Silva" value={novoPerfilNome} onChange={(e) => setNovoPerfilNome(e.target.value)} required />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>E-mail de Acesso</label>
                        <input type="email" style={styles.input} placeholder="Ex: carlos@hapres.com" value={novoPerfilEmail} onChange={(e) => setNovoPerfilEmail(e.target.value)} required />
                      </div>
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Nível de Acesso</label>
                      <select 
                        value={novoPerfilRole} 
                        onChange={(e) => setNovoPerfilRole(e.target.value)}
                        style={{ ...styles.input, background: '#000', cursor: 'pointer' }}
                      >
                        <option value="Premium Operator">Premium Operator</option>
                        <option value="Sub-User Manager">Sub-User Manager</option>
                        <option value="Guest Support">Guest Support</option>
                      </select>
                    </div>
                    <button type="submit" style={{ ...styles.primaryButton, width: '100%' }}>+ Vincular Perfil ao Ecossistema</button>
                  </form>
                </div>

                {/* Botão de Logout */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', textAlign: 'right' }}>
                  <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700' }}>
                    Sair da Instância
                  </button>
                </div>
              </div>
            )}

            {/* --- VIEW 6: CONFIGURAÇÕES COMPLETAS (ALTAMENTE EXPANDIDAS E ROBUSTAS) --- */}
            {activeMenu === 'Configurações' && (
              <div style={{ width: '100%', maxWidth: '900px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <span style={styles.badgeMono}>CORE INTERFACE / SYSTEM SETTINGS</span>
                  <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '6px', letterSpacing: '-1.5px' }}>Configurações Globais</h1>
                </div>

                <div className="glass-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>Chaves lógicas de API (Modelos de Elite)</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>OpenAI API Key</label>
                      <input type="password" style={styles.input} value={apiKeyOpenAI} onChange={(e) => setApiKeyOpenAI(e.target.value)} />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Anthropic API Key (Claude)</label>
                      <input type="password" style={styles.input} value={apiKeyAnthropic} onChange={(e) => setApiKeyAnthropic(e.target.value)} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginTop: '12px' }}>Parâmetros da Instância de IA</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginBottom: '24px' }}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Temperatura de Criatividade: {aiTemperature}</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fria</span>
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1.0" 
                          step="0.1"
                          style={{ flex: 1, cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
                          value={aiTemperature} 
                          onChange={(e) => setAiTemperature(parseFloat(e.target.value))} 
                        />
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Livre</span>
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Limite de Chamadas por Minuto (Rate Limit)</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type="number" style={{ ...styles.input, width: '100px' }} value={rateLimit} onChange={(e) => setRateLimit(parseInt(e.target.value))} />
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>requisições / minuto por utilizador mestre</span>
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginTop: '12px' }}>Parâmetros de Rede e Domínio</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', marginBottom: '24px' }}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Região do Servidor</label>
                      <select value={serverRegion} onChange={(e) => setServerRegion(e.target.value)} style={{ ...styles.input, background: '#000', cursor: 'pointer' }}>
                        <option value="sa-east-1">São Paulo, Brasil (sa-east-1)</option>
                        <option value="us-east-1">Estados Unidos (us-east-1)</option>
                        <option value="eu-central-1">Frankfurt, Alemanha (eu-central-1)</option>
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Domínio Customizado (Apontamento DNS)</label>
                      <input type="text" style={styles.input} value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} placeholder="Ex: app.seudominio.com" />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginTop: '12px' }}>Infraestrutura SMTP & Servidores de Disparo</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1.5fr', gap: '16px', marginBottom: '24px' }}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>SMTP Host</label>
                      <input type="text" style={styles.input} value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>SMTP Port</label>
                      <input type="text" style={styles.input} value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>SMTP User Auth</label>
                      <input type="text" style={styles.input} value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginTop: '12px' }}>Rotinas de Backups e Cache</h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Frequência de Backup Automatizado</label>
                      <select value={backupSchedule} onChange={(e) => setBackupSchedule(e.target.value)} style={{ ...styles.input, background: '#000', cursor: 'pointer' }}>
                        <option value="daily">Rotina Diária (Madrugada)</option>
                        <option value="weekly">Rotina Semanal (Domingos)</option>
                        <option value="manual">Controle puramente Manual</option>
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Limite Retido de Backups Estáveis</label>
                      <input type="number" style={styles.input} value={dbBackupLimit} onChange={(e) => setDbBackupLimit(parseInt(e.target.value))} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Otimização Edge Caching CDN</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Cache de baixa latência distribuído globalmente.</p>
                    </div>
                    <button 
                      onClick={() => setEdgeCaching(!edgeCaching)} 
                      style={{ ...styles.primaryButton, padding: '8px 16px', background: edgeCaching ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.05)', color: edgeCaching ? '#000' : '#fff' }}
                    >
                      {edgeCaching ? 'Ativo' : 'Inativo'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Certificado SSL Dedicado (TLS 1.3)</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Forçar conexões HTTPS seguras nativamente.</p>
                    </div>
                    <button 
                      onClick={() => setSslActive(!sslActive)} 
                      style={{ ...styles.primaryButton, padding: '8px 16px', background: sslActive ? 'var(--accent-secondary)' : 'rgba(255,255,255,0.05)', color: sslActive ? '#000' : '#fff' }}
                    >
                      {sslActive ? 'Ativo' : 'Inativo'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* --- VIEW 7: MANUAL INTERATIVO (O MANUAL DO LEIGO) --- */}
            {activeMenu === 'Manual' && (
              <div style={{ width: '100%', maxWidth: '900px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <span style={styles.badgeMono}>ENCYCLOPEDIA OVERVIEW</span>
                  <h1 style={{ fontSize: '32px', fontWeight: '800', marginTop: '6px', letterSpacing: '-1.5px' }}>Manual do Usuário</h1>
                </div>

                <div className="glass-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: 'var(--accent-primary)' }}>Como Operar a tua Fábrica de Magia</h2>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                    O **Hapres Sovereign** foi planejado sob o conceito de Soberania Tecnológica Absoluta. Não precisas de programadores, agências ou servidores externos. Aqui tens o controle completo da tua infraestrutura estática e dos módulos integrados.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '20px', borderRadius: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}><i className="fa-solid fa-qrcode" style={{ color: 'var(--accent-primary)', marginRight: '8px' }}></i> Gateway Pix VIP</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Arrasta o módulo Pix para o Canva. Altera o valor nos inputs internos do componente. O QR-Code e a chave Pix funcional serão gerados imediatamente na tela do teu app filho.</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
                      <i className="fa-solid fa-soccer-ball" style={{ color: 'var(--accent-primary)', fontSize: '18px', marginBottom: '10px', display: 'block' }}></i>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Módulo Esportes</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Exibe placares em tempo real e calcula estatísticas de forma automática utilizando os barramentos de dados do SofaScore Pro.</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
                      <i className="fa-solid fa-church" style={{ color: 'var(--accent-primary)', fontSize: '18px', marginBottom: '10px', display: 'block' }}></i>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Lumen Diei (Fé)</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>Gera layouts e calendários litúrgicos ricos. Exibe passagens, salmos e exames de consciência para os teus utilizadores de forma fluída.</p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
                      <i className="fa-solid fa-brain" style={{ color: 'var(--accent-primary)', fontSize: '18px', marginBottom: '10px', display: 'block' }}></i>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Integrações com IA</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>O teu Assistente Neural responde de forma livre no painel. Podes dar comandos diretos de linguagem natural como: "Adiciona o módulo de liturgia no meu Canva" para ele executar as ações por ti.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 8: CENTRAL MESTRE (ROOT MODOS EXCLUSIVOS DO HENRY) */}
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
    borderRadius: '8px',
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
    height: '6px',
    borderRadius: '3px',
    transition: 'all 0.3s ease'
  },
  primaryButton: {
    background: 'var(--accent-primary)',
    color: '#000',
    fontWeight: '700',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'var(--font-mono)'
  },
  input: {
    width: '100%',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid var(--border-color)',
    padding: '14px 16px',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  themeCard: {
    background: 'var(--bg-card)',
    borderRadius: '8px',
    padding: '24px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.3s'
  },
  progressBarContainer: {
    width: '100%',
    height: '4px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '2px',
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
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    textAlign: 'left',
    marginTop: '30px',
    color: '#10b981',
    maxHeight: '180px',
    overflowY: 'auto'
  },
  dashboardContainer: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    height: '100vh',
    overflow: 'hidden'
  },
  sidebar: {
    background: '#040406',
    borderRight: '1px solid var(--border-color)',
    padding: '32px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  sidebarProfile: {
    background: 'rgba(255,255,255,0.01)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.02)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  workspace: {
    padding: '40px 48px',
    overflowY: 'auto',
    background: 'radial-gradient(circle at 50% 0%, #110d24 0%, var(--bg-main) 60%)'
  },
  headerProfileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '20px 24px',
    marginBottom: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  },
  headerAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '18px',
    color: '#000'
  },
  headerStatsMono: {
    textAlign: 'right',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    fontWeight: '700'
  },
  canvaLayout: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    height: '560px',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  canvaSidebar: {
    background: '#060608',
    padding: '20px',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column'
  },
  inputSearch: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-color)',
    padding: '12px',
    borderRadius: '6px',
    color: '#fff',
    outline: 'none',
    marginBottom: '16px',
    fontSize: '13px'
  },
  catalogGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    overflowY: 'auto'
  },
  draggableCard: {
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    padding: '14px 10px',
    textAlign: 'center',
    cursor: 'grab',
    userSelect: 'none'
  },
  canvaWorkspace: {
    background: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    backgroundColor: '#030305',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  canvasElement: {
    position: 'absolute',
    background: 'rgba(10, 10, 14, 0.95)',
    border: '1px solid var(--accent-primary)',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
    minWidth: '220px'
  },
  btnRemoveElement: {
    background: 'rgba(239, 68, 68, 0.08)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.15)',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '10px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    fontFamily: 'var(--font-mono)'
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '480px',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  chatHistory: {
    flexGrow: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  chatBubble: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    lineHeight: '1.5'
  },
  chatInput: {
    flexGrow: 1,
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    padding: '12px',
    color: '#fff',
    outline: 'none',
    fontSize: '13px'
  },
  rootBanner: {
    background: 'linear-gradient(90deg, rgba(16,185,129,0.05) 0%, transparent 100%)',
    borderLeft: '4px solid var(--accent-secondary)',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0'
  },
  rootStatCard: {
    padding: '20px',
    borderRadius: '8px'
  },
  badgeMono: {
    fontSize: '10px',
    fontFamily: 'var(--font-mono)',
    fontWeight: '700',
    color: 'var(--accent-primary)',
    letterSpacing: '1.5px',
    display: 'block',
    marginBottom: '8px'
  },
  overboardTitle: {
    fontSize: '32px',
    fontWeight: '800',
    marginTop: '8px',
    marginBottom: '16px',
    letterSpacing: '-1px',
    color: '#fff'
  },
  overboardText: {
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    fontSize: '15px',
    marginBottom: '32px'
  },
  luxuryDashboardCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 8px 32px var(--accent-glow)'
  }
};
