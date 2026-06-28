import React, { useState } from 'react';

export default function HapresSovereign() {
  const [activeMenu, setActiveMenu] = useState('Overview');
  const [activeTab, setActiveTab] = useState('Overview');
  
  // State: Gerenciamento Mestre de Contas e Perfis
  const [contas, setContas] = useState([
    { id: 1, nome: "Henry Serpa", role: "Root Administrator", avatar: "H", status: "Ativo", email: "henry@hapres.com", hash: "srv_root_01" }
  ]);
  const [contaAtual, setContaAtual] = useState(contas[0]);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaFuncao, setNovaFuncao] = useState('Premium Operator');

  // State: Super Canva (Construtor de Módulos Arrasta e Solta)
  const [modulosDisponiveis, setModulosDisponiveis] = useState([
    { id: 'mod_pix', name: 'Gateway Pix VIP', icon: 'fa-qrcode', desc: 'Processamento instantâneo de faturamento com split automático.' },
    { id: 'mod_futebol', name: 'Robô Esportivo Inteligente', icon: 'fa-robot', desc: 'Análise neural de probabilidade e automação de sinais para futebol.' },
    { id: 'mod_checkout', name: 'Checkout High-Ticket', icon: 'fa-credit-card', desc: 'Página de pagamento otimizada com conversão em 1 clique.' },
    { id: 'mod_webhook', name: 'Disparador Webhook Mestre', icon: 'fa-network-wired', desc: 'Integração de dados em tempo real com qualquer CRM do mercado.' }
  ]);
  const [modulosInjetados, setModulosInjetados] = useState([]);

  // State: Co-Pilot IA Módulo de Requisições
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLogs, setAiLogs] = useState([
    { time: '21:04:12', status: 'SUCCESS', msg: 'Sincronização da malha neural completada.' },
    { time: '21:12:45', status: 'ACTIVE', msg: 'Aguardando novas diretrizes de injeção de código...' }
  ]);

  // Handler: Criar Perfil
  const handleCriarPerfil = (e) => {
    e.preventDefault();
    if (!novoNome.trim() || !novoEmail.trim()) return alert("Preencha todos os campos do perfil operacional.");
    
    const novo = {
      id: Date.now(),
      nome: novoNome,
      role: novaFuncao,
      avatar: novoNome.charAt(0).toUpperCase(),
      status: "Pendente",
      email: novoEmail,
      hash: `srv_op_${Math.floor(Math.random() * 90 + 10)}`
    };
    
    setContas([...contas, novo]);
    setNovoNome('');
    setNovoEmail('');
  };

  // Handler: Injetar Módulo no Canva
  const injetarModulo = (modulo) => {
    if (modulosInjetados.find(m => m.id === modulo.id)) return alert("Módulo já acoplado na instância.");
    setModulosInjetados([...modulosInjetados, modulo]);
  };

  // Handler: Remover Módulo do Canva
  const removerModulo = (id) => {
    setModulosInjetados(modulosInjetados.filter(m => m.id !== id));
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --bg-main: #06040a;
          --bg-sidebar: #0b0813;
          --bg-card: #120e22;
          --bg-card-hover: #191430;
          --accent-purple: #7b57ff;
          --accent-glow: rgba(123, 87, 255, 0.15);
          --border-color: rgba(123, 87, 255, 0.1);
          --text-main: #ffffff;
          --text-secondary: #948fa6;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
          background-color: var(--bg-main);
          color: var(--text-main);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Custom Scrollbar Premium */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-main); }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-purple); }
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: '100vh' }}>
        
        {/* SIDEBAR ORQUESTRAÇÃO */}
        <aside style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-color)', padding: '32px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ padding: '0 12px 24px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.04em', color: '#fff' }}>HAPRES</span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--accent-purple)', marginLeft: '6px', background: 'rgba(123, 87, 255, 0.12)', padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.05em' }}>SOVEREIGN</span>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Overview', icon: 'fa-chart-pie' },
                { name: 'Co-Pilot IA', icon: 'fa-robot' },
                { name: 'Super Canva', icon: 'fa-cubes' },
                { name: 'Suporte Neural', icon: 'fa-brain' },
                { name: 'Central Mestre', icon: 'fa-sliders' }
              ].map((item) => (
                <div 
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeMenu === item.name ? '600' : '500',
                    color: activeMenu === item.name ? '#fff' : 'var(--text-secondary)',
                    background: activeMenu === item.name ? 'linear-gradient(90deg, rgba(123, 87, 255, 0.12) 0%, rgba(123, 87, 255, 0.01) 100%)' : 'transparent',
                    borderLeft: activeMenu === item.name ? '3px solid var(--accent-purple)' : '3px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <i className={`fa-solid ${item.icon}`} style={{ color: activeMenu === item.name ? 'var(--accent-purple)' : 'var(--text-secondary)', fontSize: '16px', width: '20px' }}></i>
                  {item.name}
                </div>
              ))}
            </nav>
          </div>

          {/* INSTÂNCIA ATIVA DO PERFIL */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple) 0%, #4c26d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 12px rgba(123, 87, 255, 0.3)' }}>
              {contaAtual.avatar}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{contaAtual.nome}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                {contaAtual.role}
              </div>
            </div>
          </div>
        </aside>

        {/* MALHA PRINCIPAL DE CONTEÚDO */}
        <main style={{ padding: '48px 64px', background: 'radial-gradient(circle at 50% 0%, #110b24 0%, #06040a 60%)', overflowY: 'auto', maxHeight: '100vh' }}>
          
          {/* PAINEL: OVERVIEW MULTICONTAS */}
          {activeMenu === 'Overview' && (
            <div>
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Sovereign Dashboard</span>
                <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '6px' }}>Visão Geral da Operação</h1>
              </div>

              {/* Grid de Métricas Principais */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(123, 87, 255, 0.1)', display: 'flex', alignItems: 'center', justifycontent: 'center', justifyContent: 'center' }}>
                      <i className="fa-solid fa-layer-group" style={{ color: 'var(--accent-purple)', fontSize: '18px' }}></i>
                    </div>
                    <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>ONLINE</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Módulos Ativos no Canva</div>
                  <div style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px', letterSpacing: '-0.02em' }}>{modulosInjetados.length} <span style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '400' }}>/ {modulosDisponiveis.length}</span></div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(123, 87, 255, 0.1)', display: 'flex', alignItems: 'center', justifycontent: 'center', justifyContent: 'center' }}>
                      <i className="fa-solid fa-users-gear" style={{ color: 'var(--accent-purple)', fontSize: '18px' }}></i>
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Operadores Vinculados</div>
                  <div style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px', letterSpacing: '-0.02em' }}>{contas.length}</div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(123, 87, 255, 0.1)', display: 'flex', alignItems: 'center', justifycontent: 'center', justifyContent: 'center' }}>
                      <i className="fa-solid fa-terminal" style={{ color: 'var(--accent-purple)', fontSize: '18px' }}></i>
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Perfil Operando Instância</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '16px', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{contaAtual.nome}</div>
                </div>
              </div>

              {/* Bloco de Monitoramento em Tempo Real */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa-solid fa-wave-square" style={{ color: 'var(--accent-purple)' }}></i> Arquitetura de Módulos Injetados
                </h3>
                {modulosInjetados.length === 0 ? (
                  <div style={{ textAlignment: 'center', textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '24px', marginBottom: '12px', display: 'block' }}></i>
                    Nenhum microsserviço ou bloco funcional acoplado no Super Canva atualmente.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {modulosInjetados.map(m => (
                      <div key={m.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(123, 87, 255, 0.2)', padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifycontent: 'center', justifyContent: 'center' }}>
                          <i className={`fa-solid ${m.icon}`} style={{ color: '#fff' }}></i>
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600' }}>{m.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Status: Ativo e integrado à API Mestre.</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PAINEL: SUPER CANVA (ARRASTA/CLICA E INJETA) */}
          {activeMenu === 'Super Canva' && (
            <div>
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Visual Matrix Builder</span>
                <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '6px' }}>Super Canva Architecture</h1>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
                {/* Área de Ativação / Grid de Módulos */}
                <div style={{ border: '2px dashed rgba(123, 87, 255, 0.2)', background: 'rgba(18, 14, 34, 0.3)', borderRadius: '28px', padding: '40px', minHeight: '450px' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>Malha de Execução de Microsserviços SaaS</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Os blocos ativados abaixo rodam em paralelo diretamente no servidor.</p>
                  </div>

                  {modulosInjetados.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                      <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '48px', color: 'var(--accent-purple)', marginBottom: '20px', display: 'block' }}></i>
                      <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Malha Vazia</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>Selecione e acople os módulos da central lateral para habilitar gateways de pagamento, robôs ou integrações.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {modulosInjetados.map(m => (
                        <div key={m.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--accent-purple)', padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(123,87,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(123, 87, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className={`fa-solid ${m.icon}`} style={{ color: 'var(--accent-purple)', fontSize: '20px' }}></i>
                            </div>
                            <div>
                              <h4 style={{ fontSize: '16px', fontWeight: '600' }}>{m.name}</h4>
                              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{m.desc}</p>
                            </div>
                          </div>
                          <button onClick={() => removerModulo(m.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Desacoplar</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Central de Microsserviços para Injeção */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '28px', padding: '28px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}><i className="fa-solid fa-box-open" style={{ color: 'var(--accent-purple)', marginRight: '8px' }}></i> Injetores Disponíveis</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {modulosDisponiveis.map(m => {
                      const isInjected = modulosInjetados.some(injetado => injetado.id === m.id);
                      return (
                        <div key={m.id} style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.02)', padding: '18px', borderRadius: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <i className={`fa-solid ${m.icon}`} style={{ color: 'var(--accent-purple)' }}></i>
                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{m.name}</span>
                          </div>
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>{m.desc}</p>
                          <button 
                            onClick={() => injetarModulo(m)}
                            disabled={isInjected}
                            style={{ 
                              width: '100%', 
                              background: isInjected ? 'rgba(255,255,255,0.05)' : 'var(--accent-purple)', 
                              color: isInjected ? 'var(--text-secondary)' : '#fff', 
                              border: 'none', 
                              padding: '10px', 
                              borderRadius: '10px', 
                              fontSize: '13px', 
                              fontWeight: '600', 
                              cursor: isInjected ? 'default' : 'pointer' 
                            }}
                          >
                            {isInjected ? 'Injetado e Ativo' : '+ Injetar na Malha'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAINEL: CENTRAL MESTRE (CADASTRO E GERENCIAMENTO MULTICONTAS REAL) */}
          {activeMenu === 'Central Mestre' && (
            <div style={{ maxWidth: '900px' }}>
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Identity Management</span>
                <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '6px' }}>Configuração de Perfil & Contas</h1>
              </div>

              {/* Tabela/Lista Real de Contas Vinculadas */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '28px', padding: '32px', marginBottom: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa-solid fa-id-card-clip" style={{ color: 'var(--accent-purple)' }}></i> Instâncias de Contas na Cripto-Malha
                </h2>
                
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
                          background: isSelected ? 'linear-gradient(90deg, rgba(123, 87, 255, 0.08) 0%, transparent 100%)' : 'rgba(255,255,255,0.01)', 
                          border: isSelected ? '1px solid var(--accent-purple)' : '1px solid rgba(255,255,255,0.03)', 
                          padding: '20px 24px', 
                          borderRadius: '20px' 
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: isSelected ? 'var(--accent-purple)' : '#231d3c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', boxShadow: isSelected ? '0 4px 14px rgba(123,87,255,0.2)' : 'none' }}>
                            {c.avatar}
                          </div>
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {c.nome} 
                              {isSelected && <span style={{ fontSize: '10px', color: 'var(--accent-purple)', background: 'rgba(123, 87, 255, 0.15)', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>SESSÃO INICIADA</span>}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'flex', gap: '16px' }}>
                              <span><i className="fa-solid fa-envelope" style={{ marginRight: '5px' }}></i> {c.email}</span>
                              <span><i className="fa-solid fa-key" style={{ marginRight: '5px' }}></i> {c.hash}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          {isSelected ? (
                            <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '600', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px' }}>{c.role}</span>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.role}</span>
                              <button onClick={() => setContaAtual(c)} style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Alternar Instância</button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formulário Real e Estruturado de Cadastro */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '28px', padding: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}><i className="fa-solid fa-user-plus" style={{ color: 'var(--accent-purple)', marginRight: '8px' }}></i> Vincular Novo Operador</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Adicione credenciais operacionais para liberar acessos segmentados à API do sistema.</p>
                
                <form onSubmit={handleCriarPerfil} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Nome Completo do Usuário</label>
                      <input type="text" placeholder="Ex: Taylor Chicago" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} style={{ width: '100%', background: '#0a0714', border: '1px solid rgba(123, 87, 255, 0.15)', borderRadius: '14px', padding: '16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>E-mail de Acesso Corporativo</label>
                      <input type="email" placeholder="Ex: taylor@suporte.com" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} style={{ width: '100%', background: '#0a0714', border: '1px solid rgba(123, 87, 255, 0.15)', borderRadius: '14px', padding: '16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Nível de Hierarquia e Permissões</label>
                    <select value={novaFuncao} onChange={(e) => setNovaFuncao(e.target.value)} style={{ width: '100%', background: '#0a0714', border: '1px solid rgba(123, 87, 255, 0.15)', borderRadius: '14px', padding: '16px', color: '#fff', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                      <option value="Premium Operator">Premium Operator (Acesso ao Canva e Logs de IA)</option>
                      <option value="Sub-User Manager">Sub-User Manager (Leitura de Dashboards e Suporte)</option>
                      <option value="Guest Support">Guest Support (Apenas Visualização Neural Estática)</option>
                    </select>
                  </div>

                  <button type="submit" style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px dashed var(--accent-purple)', borderRadius: '14px', padding: '16px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
                    + Gerar Chave de Acesso e Vincular Conta ao Ecossistema
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* PAINEL: CO-PILOT IA (LOGS DE IA E INTERAÇÃO) */}
          {activeMenu === 'Co-Pilot IA' && (
            <div style={{ maxWidth: '850px' }}>
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>AI Core Engine</span>
                <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '6px' }}>Co-Pilot IA</h1>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Prompt de Comando Estrutural</h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <input 
                    type="text" 
                    placeholder="Injete comandos diretos para a malha de IA (Ex: Otimizar rotas do Gateway)..." 
                    value={aiPrompt} 
                    onChange={(e) => setAiPrompt(e.target.value)}
                    style={{ flex: 1, background: '#0a0714', border: '1px solid rgba(123, 87, 255, 0.15)', borderRadius: '14px', padding: '16px', color: '#fff', fontSize: '14px', outline: 'none' }} 
                  />
                  <button 
                    onClick={() => {
                      if(!aiPrompt.trim()) return;
                      setAiLogs([...aiLogs, { time: new Date().toLocaleTimeString(), status: 'RUNNING', msg: `Executando diretriz: "${aiPrompt}"` }]);
                      setAiPrompt('');
                    }}
                    style={{ background: 'var(--accent-purple)', color: '#fff', border: 'none', padding: '0 24px', borderRadius: '14px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Enviar
                  </button>
                </div>
              </div>

              <div style={{ background: '#07050d', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logs operacionais do Servidor Neural</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {aiLogs.map((log, index) => (
                    <div key={index} style={{ fontFamily: 'monospace', fontSize: '13px', display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>[{log.time}]</span>
                      <span style={{ color: log.status === 'SUCCESS' ? '#10b981' : log.status === 'ACTIVE' ? 'var(--accent-purple)' : '#f59e0b', fontWeight: '700' }}>{log.status}</span>
                      <span style={{ color: '#e2e0e7' }}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PAINEL: SUPORTE NEURAL */}
          {activeMenu === 'Suporte Neural' && (
            <div>
              <div style={{ marginBottom: '40px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Core Support Terminal</span>
                <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginTop: '6px' }}>Suporte Neural</h1>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '40px', textAlignment: 'center', textAlign: 'center' }}>
                <i className="fa-solid fa-brain" style={{ fontSize: '48px', color: 'var(--accent-purple)', marginBottom: '20px' }}></i>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Canal de Comunicação Direto</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '14px', lineHeight: '1.6' }}>Sua instância está operando de forma saudável conectada à infraestrutura mestre da API. Requisições críticas abertas por operadores subordinados constarão listadas aqui.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}
