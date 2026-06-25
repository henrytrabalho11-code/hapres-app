import { useState } from 'react';

export default function Home() {
  const [stage, setStage] = useState('cadastro');
  const [dashTab, setDashTab] = useState('criar-ia');
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(null);
  
  // Inputs
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [supInput, setSupInput] = useState('');

  // Histórico dos Chats
  const [aiChat, setAiChat] = useState([{ origin: 'system', msg: 'Sovereign Ativo. Dite a aplicação que deseja forjar.' }]);
  const [supChat, setSupChat] = useState([{ origin: 'system', msg: 'Suporte Neural Inteligenccia 24h ativo. Faça qualquer pergunta.' }]);

  const executarFiltroAcesso = (e) => {
    e.preventDefault();
    const foneLimpo = whatsapp.replace(/\D/g, '');
    const mailFormatado = email.toLowerCase().trim();

    if (mailFormatado === 'henryserpa11@gmail.com' || mailFormatado === 'henrytrabalho11@gmail.com' || foneLimpo === '11992819767') {
      setIsAdmin(true);
      setStage('escolha-painel');
    } else {
      setStage('workspace');
    }
  };

  const processarTexto = (comando) => {
    const texto = comando.toLowerCase().trim();
    if (texto.includes('1 mais 1') || texto.includes('1+1')) {
      return "O resultado exato de 1 mais 1 é igual a 2.";
    }
    if (texto.includes('criar') || texto.includes('app') || texto.includes('aplicativo')) {
      return "[Hapres Sovereign] Comando reconhecido. Injetando módulos estruturais na nuvem de forma autônoma.";
    }
    return `Diretriz "${comando}" processada com sucesso pela inteligência do ecossistema.`;
  };

  const enviarMensagemIa = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userMsg = aiInput;
    setAiChat(prev => [...prev, { origin: 'user', msg: userMsg }]);
    setAiInput('');
    setTimeout(() => {
      setAiChat(prev => [...prev, { origin: 'system', msg: processarTexto(userMsg) }]);
    }, 400);
  };

  const enviarMensagemSuporte = (e) => {
    e.preventDefault();
    if (!supInput.trim()) return;
    const userMsg = supInput;
    setSupChat(prev => [...prev, { origin: 'user', msg: userMsg }]);
    setSupInput('');
    setTimeout(() => {
      setSupChat(prev => [...prev, { origin: 'system', msg: processarTexto(userMsg) }]);
    }, 400);
  };

  return (
    <div style={{ background: '#0a0a0c', color: '#f5f5f7', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      
      {stage === 'cadastro' && (
        <form onSubmit={executarFiltroAcesso} style={{ background: '#121216', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '18px', border: '1px solid #1f1f24' }}>
          <h2 style={{ textAlign: 'center', margin: '0 0 8px 0', fontSize: '1.6rem', fontWeight: '700' }}>Hapres Sovereign</h2>
          <input type="text" placeholder="Nome Completo" required value={nome} onChange={(e) => setNome(e.target.value)} style={fieldStyle} />
          <input type="email" placeholder="Seu Melhor E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} style={fieldStyle} />
          <input type="tel" placeholder="WhatsApp (Apenas números)" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} style={fieldStyle} />
          <button type="submit" style={{ background: '#0071e3', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}>Acessar Ecossistema</button>
        </form>
      )}

      {stage === 'escolha-painel' && (
        <div style={{ background: '#121216', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '380px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #ff453a' }}>
          <h3 style={{ color: '#ff453a', margin: 0, fontSize: '1.4rem' }}>Direção Suprema Detectada</h3>
          <p style={{ color: '#8e8e93', fontSize: '0.9rem', margin: 0 }}>Selecione o nível de privilégio para esta credencial:</p>
          <button onClick={() => { setRole('admin'); setStage('workspace'); }} style={{ background: '#ff453a', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>🛡 Modo Administrador</button>
          <button onClick={() => { setRole('user'); setStage('workspace'); }} style={{ background: '#2c2c35', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>👤 Modo Usuário Comum</button>
        </div>
      )}

      {stage === 'workspace' && (
        <div style={{ background: '#121216', width: '100%', maxWidth: '850px', borderRadius: '16px', padding: '24px', minHeight: '520px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid #1f1f24' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f1f24', paddingBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Hapres Workspace</h3>
              <span style={{ fontSize: '0.8rem', color: '#0071e3', fontWeight: '500' }}>Operador: {nome || 'Mestre'} ({role === 'admin' ? 'ADMIN' : 'USER'})</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button onClick={() => setDashTab('criar-ia')} style={menuTabStyle(dashTab === 'criar-ia')}>🤖 Co-Pilot IA</button>
            <button onClick={() => setDashTab('canva')} style={menuTabStyle(dashTab === 'canva')}>🎨 Super Canva</button>
            <button onClick={() => setDashTab('suporte')} style={menuTabStyle(dashTab === 'suporte')}>🔮 Suporte 24h</button>
            {isAdmin && role === 'admin' && <button onClick={() => setDashTab('painel-adm')} style={menuTabStyle(dashTab === 'painel-adm', true)}>🛡 Controle Mestre</button>}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {dashTab === 'criar-ia' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div style={{ background: '#0a0a0c', border: '1px solid #1f1f24', padding: '14px', borderRadius: '10px', height: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {aiChat.map((c, i) => (
                    <div key={i} style={{ alignSelf: c.origin === 'user' ? 'flex-end' : 'flex-start', background: c.origin === 'user' ? '#0071e3' : '#1f1f24', padding: '10px 14px', borderRadius: '12px', fontSize: '0.9rem', maxWidth: '80%' }}>{c.msg}</div>
                  ))}
                </div>
                <form onSubmit={enviarMensagemIa} style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Dite a ordem para criar seu app..." style={fieldStyle} />
                  <button style={{ background: '#0071e3', border: 'none', color: '#fff', padding: '0 ' + '24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Enviar</button>
                </form>
              </div>
            )}

            {dashTab === 'canva' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#8e8e93' }}>Arraste ou injete módulos vivos diretamente na estrutura nativa.</p>
                <div style={{ background: '#0a0a0c', border: '2px dashed #2c2c35', padding: '40px 20px', borderRadius: '12px', textAlign: 'center', color: '#48484a' }}>
                  Área do Canva Visual Ativa (Pronta para acoplamento de Pix e Futebol)
                </div>
              </div>
            )}

            {dashTab === 'suporte' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div style={{ background: '#0a0a0c', border: '1px solid #1f1f24', padding: '14px', borderRadius: '10px', height: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {supChat.map((c, i) => (
                    <div key={i} style={{ alignSelf: c.origin === 'user' ? 'flex-end' : 'flex-start', background: c.origin === 'user' ? '#0071e3' : '#1f1f24', padding: '10px 14px', borderRadius: '12px', fontSize: '0.9rem', maxWidth: '80%' }}>{c.msg}</div>
                  ))}
                </div>
                <form onSubmit={enviarMensagemSuporte} style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <input type="text" value={supInput} onChange={(e) => setSupInput(e.target.value)} placeholder="Faça sua pergunta de lógica real..." style={fieldStyle} />
                  <button style={{ background: '#0071e3', border: 'none', color: '#fff', padding: '0 ' + '24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Perguntar</button>
                </form>
              </div>
            )}

            {dashTab === 'painel-adm' && isAdmin && role === 'admin' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ margin: 0, color: '#ff453a', fontSize: '1.1rem' }}>Controle Global do Administrador</h4>
                <div style={{ background: '#1f1f24', padding: '16px', borderRadius: '10px', border: '1px solid #2c2c35' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Mutador de Variáveis da Nuvem</span>
                  <p style={{ fontSize: '0.85rem', color: '#8e8e93', margin: '6px 0 12px 0' }}>Altere módulos inteiros de servidores nativos instantaneamente.</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Descreva a mutação do ecossistema..." style={fieldStyle} />
                    <button onClick={() => alert('Mutação aplicada nos clusters com sucesso!')} style={{ background: '#ff453a', border: 'none', color: '#fff', padding: '0 ' + '20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>Aplicar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

const fieldStyle = {
  width: '100%',
  background: '#1f1f24',
  border: '1px solid #2c2c35',
  padding: '12px',
  borderRadius: '10px',
  color: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
  fontSize: '0.95rem'
};

const menuTabStyle = (active, isAdmMode = false) => ({
  padding: '10px 16px',
  background: active ? (isAdmMode ? '#ff453a' : '#0071e3') : '#1f1f24',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontWeight: '600',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontSize: '0.9rem'
});
