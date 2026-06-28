import React, { useState, useEffect } from 'react';

export default function HapresSovereign() {
  const [activeMenu, setActiveMenu] = useState('Visão Geral');
  const [categoria, setCategoria] = useState('Ainda não configurado');
  const [contas, setContas] = useState([
    { id: 1, nome: "Henry Serpa", role: "Root Administrator", avatar: "H" }
  ]);
  const [contaAtual, setContaAtual] = useState({ id: 1, nome: "Henry Serpa", role: "Root Administrator", avatar: "H" });
  
  const [novoNome, setNovoNome] = useState('');
  const [novaFuncao, setNovaFuncao] = useState('Premium Operator');

  const adicionarNovoPerfil = (e) => {
    e.preventDefault();
    if (!novoNome.trim()) return;
    
    const novo = {
      id: Date.now(),
      nome: novoNome,
      role: novaFuncao,
      avatar: novoNome.charAt(0).toUpperCase()
    };
    
    setContas([...contas, novo]);
    setNovoNome('');
    alert(`Conta de ${novo.nome} vinculada com sucesso!`);
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        :root {
          --bg-main: #0b0813;
          --bg-card: #141122;
          --bg-card-hover: #1d1932;
          --accent-purple: #7b57ff;
          --border-color: rgba(123, 87, 255, 0.08);
          --text-main: #ffffff;
          --text-secondary: #948fa6;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.25s ease;
        }

        body {
          background-color: var(--bg-main);
          color: var(--text-main);
          min-height: 100vh;
          overflow-x: hidden;
        }
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: '100vh' }}>
        
        {/* SIDEBAR */}
        <aside style={{ background: '#07050d', borderRight: '1px solid var(--border-color)', padding: '32px 20px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', justifyContent: 'space-between' }}>
          <div>
            <div style={{ padding: '0 12px 24px 12px', borderBottom: '1px solid rgba(255,255,255,0.03)', marginBottom: '24px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.03em', color: '#fff' }}>HAPRES</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--accent-purple)', marginLeft: '6px', background: 'rgba(123, 87, 255, 0.15)', padding: '2px 8px', borderRadius: '20px' }}>SOVEREIGN</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { name: 'Visão Geral', icon: 'fa-chart-simple' },
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
                    padding: '14px 16px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeMenu === item.name ? '600' : '500',
                    color: activeMenu === item.name ? '#fff' : 'var(--text-secondary)',
                    background: activeMenu === item.name ? 'linear-gradient(90deg, rgba(123, 87, 255, 0.15) 0%, rgba(123, 87, 255, 0.02) 100%)' : 'transparent',
                    boxShadow: activeMenu === item.name ? 'inset 2px 0 0 var(--accent-purple)' : 'none'
                  }}
                >
                  <i className={`fa-solid ${item.icon}`} style={{ color: activeMenu === item.name ? 'var(--accent-purple)' : 'var(--text-secondary)', fontSize: '16px' }}></i>
                  {item.name}
                </div>
              ))}
            </nav>
          </div>

          {/* PERFIL FIXADO ABAIXO */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>
              {contaAtual.avatar}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{contaAtual.nome}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{contaAtual.role}</div>
            </div>
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main style={{ padding: '48px 56px', background: 'radial-gradient(circle at 50% 0%, #15102a 0%, #0b0813 50%)' }}>
          
          {activeMenu === 'Visão Geral' && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dashboard Analítico</span>
                <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', marginTop: '6px' }}>Visão Geral do Sistema</h1>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(123, 87, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <i className="fa-solid fa-wallet" style={{ color: 'var(--accent-purple)' }}></i>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Assinatura Mapeada</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', marginTop: '8px', letterSpacing: '-0.02em' }}>R$ 97,00</div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(123, 87, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <i className="fa-solid fa-layer-group" style={{ color: 'var(--accent-purple)' }}></i>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Segmento Ativo</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', marginTop: '12px', letterSpacing: '-0.02em' }}>{categoria}</div>
                </div>

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(123, 87, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <i className="fa-solid fa-shield-halved" style={{ color: 'var(--accent-purple)' }}></i>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Hierarquia Operacional</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', marginTop: '16px', color: '#fff' }}>{contaAtual.role}</div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'Super Canva' && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Builder Visual</span>
                <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', marginTop: '6px' }}>Super Canva Architecture</h1>
              </div>

              <div style={{ border: '2px dashed rgba(123, 87, 255, 0.15)', background: 'rgba(20, 17, 34, 0.4)', borderRadius: '24px', padding: '60px 40px', textAlign: 'center' }}>
                <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '40px', color: 'var(--accent-purple)', marginBottom: '24px' }}></i>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Grid de Construção Vazio</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 32px auto', fontSize: '15px', lineHeight: '1.6' }}>
                  Injete novos módulos funcionais como gateway de Pix ou automações diretamente na estrutura do servidor.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button onClick={() => setCategoria('Módulo Pix VIP')} style={{ background: 'var(--accent-purple)', color: '#fff', border: 'none', borderRadius: '14px', padding: '14px 28px', fontWeight: '600', cursor: 'pointer' }}>
                    + Injetar Módulo Pix
                  </button>
                  <button onClick={() => setCategoria('Módulo Futebol')} style={{ background: 'transparent', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px 28px', fontWeight: '600', cursor: 'pointer' }}>
                    + Injetar Módulo Futebol
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'Central Mestre' && (
            <div style={{ maxWidth: '750px' }}>
              <div style={{ marginBottom: '36px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-purple)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ambiente do Usuário</span>
                <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', marginTop: '6px' }}>Configuração de Perfil & Contas</h1>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Contas Vinculadas na Instância</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {contas.map((c) => {
                    const isSelected = c.id === contaAtual.id;
                    return (
                      <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isSelected ? 'rgba(123, 87, 255, 0.06)' : 'rgba(255,255,255,0.01)', border: isSelected ? '1px solid var(--accent-purple)' : '1px solid rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isSelected ? 'var(--accent-purple)' : '#292543', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700' }}>{c.avatar}</div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{c.nome} {isSelected && <span style={{ fontSize: '11px', color: 'var(--accent-purple)', marginLeft: '8px' }}>Ativa</span>}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.role}</div>
                          </div>
                        </div>
                        {!isSelected && <button onClick={() => setContaAtual(c)} style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer' }}>Alternar</button>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Adicionar Perfil Operacional</h3>
                <form onSubmit={adicionarNovoPerfil} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input type="text" placeholder="Nome do Usuário" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} style={{ background: '#07050d', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px 16px', color: '#fff' }} />
                    <select value={novaFuncao} onChange={(e) => setNovaFuncao(e.target.value)} style={{ background: '#07050d', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px 16px', color: '#fff' }}>
                      <option value="Premium Operator">Premium Operator</option>
                      <option value="Sub-User Manager">Sub-User Manager</option>
                    </select>
                  </div>
                  <button type="submit" style={{ background: 'transparent', color: '#fff', border: '1px dashed var(--accent-purple)', borderRadius: '12px', padding: '14px', fontWeight: '600', cursor: 'pointer' }}>+ Vincular Nova Conta ao Ecossistema</button>
                </form>
              </div>
            </div>
          )}

          {(activeMenu === 'Co-Pilot IA' || activeMenu === 'Suporte Neural') && (
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>{activeMenu}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Módulo ativo e operando em segundo plano.</p>
            </div>
          )}

        </main>
      </div>
    </>
  );
}
