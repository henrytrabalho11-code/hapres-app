<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hapres Sovereign - Full Ecosystem</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        :root {
            --bg-main: #09090b;
            --bg-card: #141417;
            --bg-card-hover: #1c1c21;
            --border-color: rgba(255, 255, 255, 0.04);
            --text-main: #ffffff;
            --text-secondary: #71717a;
            --accent-color: #f4f4f5;
            --accent-glow: rgba(244, 244, 245, 0.1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; transition: all 0.2s ease; }
        body { background-color: var(--bg-main); color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }

        .hidden { display: none !important; }

        /* INTERFACE DE CORES SUPERIOR */
        .color-orchestrator {
            background: rgba(20, 20, 23, 0.7); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color); padding: 16px 40px;
            display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;
        }
        .orchestrator-title { font-size: 13px; font-weight: 600; letter-spacing: 0.05em; color: var(--text-secondary); text-transform: uppercase; }
        .color-picker-wrapper { display: flex; align-items: center; gap: 12px; }
        .color-pill { width: 20px; height: 20px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; }
        .pill-platina { background: #f4f4f5; }
        .pill-gold { background: #e5c158; }
        .pill-emerald { background: #10b981; }
        .custom-picker { background: transparent; border: none; width: 24px; height: 24px; cursor: pointer; }

        /* FLUXO 1: ONBOARDING & CADASTRO (FLUIDO E CENTRALIZADO) */
        .auth-container { max-width: 420px; margin: 100px auto padding: 0 24px; display: flex; flex-direction: column; gap: 32px; }
        .badge-top { font-size: 11px; font-weight: 700; color: var(--text-secondary); letter-spacing: 0.1em; text-transform: uppercase; }
        .headline { font-size: 32px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.2; }
        .description { font-size: 15px; color: var(--text-secondary); line-height: 1.6; }
        
        .dots-wrapper { display: flex; gap: 8px; margin: 8px 0; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #27272a; }
        .dot.active { width: 18px; border-radius: 3px; background: var(--text-main); }

        .clean-input {
            width: 100%; background: var(--bg-card); border: 1px solid var(--border-color);
            border-radius: 12px; padding: 16px; color: var(--text-main); font-size: 15px; outline: none;
        }
        .clean-input:focus { border-color: var(--accent-color); }
        
        .primary-btn {
            background: var(--accent-color); color: var(--bg-main); border: none;
            border-radius: 12px; padding: 16px; font-size: 15px; font-weight: 600; cursor: pointer;
            box-shadow: 0 4px 20px var(--accent-glow); text-align: center; width: 100%;
        }

        /* CATEGORIAS GRID */
        .grid-cats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cat-card {
            background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px;
            padding: 24px; text-align: center; font-weight: 500; cursor: pointer;
        }
        .cat-card:hover { border-color: var(--accent-color); background: var(--bg-card-hover); }

        /* TIMELINE / LOADING ENGINE */
        .loader-box { text-align: center; padding: 60px 0; }
        .spinner {
            width: 40px; height: 40px; border: 3px solid var(--border-color);
            border-top-color: var(--text-main); border-radius: 50%;
            animation: spin 0.8s linear infinite; margin: 0 auto 24px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .progress-bar { width: 100%; height: 4px; background: var(--border-color); border-radius: 2px; margin-top: 24px; overflow: hidden; }
        .progress-fill { width: 0%; height: 100%; background: var(--text-main); animation: fillUp 3s forwards linear; }
        @keyframes fillUp { to { width: 100%; } }

        /* FLUXO 2: WORKSPACE PRINCIPAL (GRID RESPONSIVO) */
        .app-layout { display: grid; grid-template-columns: 280px 1fr; min-height: calc(100vh - 63px); }
        
        .sidebar { background: #0c0c0e; border-right: 1px solid var(--border-color); padding: 40px 24px; display: flex; flex-direction: column; justify-content: space-between; }
        .logo { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; }
        .logo span { color: var(--text-secondary); font-weight: 400; }
        
        .nav-list { display: flex; flex-direction: column; gap: 8px; margin-top: 40px; flex-grow: 1; }
        .nav-item {
            display: flex; align-items: center; gap: 14px; padding: 14px 16px;
            color: var(--text-secondary); font-size: 14px; font-weight: 500; cursor: pointer; border-radius: 12px;
        }
        .nav-item:hover, .nav-item.active { color: var(--text-main); background: var(--bg-card); }
        .nav-item.active { box-shadow: inset 0 0 0 1px var(--border-color); }

        .main-content { padding: 48px 56px; }
        .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
        .bento-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; }
        .bento-card:hover { border-color: rgba(255,255,255,0.08); background: var(--bg-card-hover); }
        .icon-box { width: 44px; height: 44px; border-radius: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .bento-card:hover .icon-box { color: var(--accent-color); border-color: var(--accent-color); box-shadow: 0 0 15px var(--accent-glow); }
        
        .card-label { font-size: 14px; color: var(--text-secondary); margin-bottom: 6px; }
        .card-number { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; }

        /* SEÇÃO DE PERFIL AVANÇADO (MÚLTIPLAS CONTAS) */
        .profile-container { max-width: 600px; display: flex; flex-direction: column; gap: 32px; }
        .account-strip {
            display: flex; align-items: center; justify-content: space-between;
            padding: 16px; background: var(--bg-card); border: 1px solid var(--border-color);
            border-radius: 14px; margin-bottom: 12px;
        }
        .account-info { display: flex; align-items: center; gap: 12px; }
        .avatar-sub { width: 36px; height: 36px; background: #27272a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
        .sec-btn { background: transparent; border: 1px solid var(--border-color); color: var(--text-main); border-radius: 10px; padding: 8px 14px; font-size: 13px; cursor: pointer; }
        .sec-btn:hover { background: var(--bg-card-hover); border-color: var(--text-secondary); }

        .danger-zone { border-top: 1px solid var(--border-color); padding-top: 24px; margin-top: 16px; }
    </style>
</head>
<body>

    <div class="color-orchestrator">
        <div class="orchestrator-title"><i class="fa-solid fa-layer-group"></i> Engine Configuration</div>
        <div class="color-picker-wrapper">
            <div class="color-pill pill-platina" onclick="setAccent('#f4f4f5', 'rgba(244,244,245,0.1)')"></div>
            <div class="color-pill pill-gold" onclick="setAccent('#e5c158', 'rgba(229,193,88,0.1)')"></div>
            <div class="color-pill pill-emerald" onclick="setAccent('#10b981', 'rgba(16,185,129,0.1)')"></div>
            <input type="color" class="custom-picker" onchange="setAccentLivre(this.value)">
        </div>
    </div>

    <div id="step-slide1" class="auth-container">
        <span class="badge-top">Inteligência Artificial</span>
        <h1 class="headline">Seu app criado pela IA em minutos.</h1>
        <p class="description">Descreva o seu negócio e nossa infraestrutura monta o app completo, limpo e integrado — sem complicação.</p>
        <div class="dots-wrapper"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
        <button class="primary-btn" onclick="goStage('step-slide2')">Avançar</button>
    </div>

    <div id="step-slide2" class="auth-container hidden">
        <span class="badge-top">Gestão & Recorrência</span>
        <h1 class="headline">Agenda e pagamentos em um só lugar.</h1>
        <p class="description">Esqueça sistemas complexos. Gerencie faturamentos regulares e controle dados estruturais direto pelo painel.</p>
        <div class="dots-wrapper"><div class="dot"></div><div class="dot active"></div><div class="dot"></div></div>
        <button class="primary-btn" onclick="goStage('step-cadastro')">Avançar</button>
    </div>

    <div id="step-cadastro" class="auth-container hidden">
        <span class="badge-top">Passo 1 de 3</span>
        <h1 class="headline">Crie sua conta mestre</h1>
        <p class="description">Defina as credenciais para inicializar sua instância.</p>
        <div style="display:flex; flex-direction:column; gap:12px;">
            <input type="text" id="acc-name" class="clean-input" placeholder="Nome completo">
            <input type="tel" id="acc-phone" class="clean-input" placeholder="WhatsApp Corporativo">
            <input type="password" class="clean-input" placeholder="Senha de acesso">
        </div>
        <button class="primary-btn" onclick="processarAcesso()">Criar Conta</button>
    </div>

    <div id="step-categorias" class="auth-container hidden">
        <span class="badge-top">Passo 2 de 3</span>
        <h1 class="headline">Qual o escopo do app?</h1>
        <p class="description">Escolha o nicho básico para guiar a injeção de APIs da inteligência artificial.</p>
        <div class="grid-cats">
            <div class="cat-card" onclick="buildApp('Inglês / Cursos')">📚 Inglês & Cursos</div>
            <div class="cat-card" onclick="buildApp('Igreja / Membros')">⛪ Igreja & Comunidade</div>
            <div class="cat-card" onclick="buildApp('Agendamento')">🗓️ Agendamento Luxo</div>
            <div class="cat-card" onclick="buildApp('Customizado')">⚙️ Outro Segmento</div>
        </div>
    </div>

    <div id="step-loading" class="auth-container hidden">
        <div class="loader-box">
            <div class="spinner"></div>
            <h1 class="headline" style="font-size:24px;">Configurando Infraestrutura</h1>
            <p class="description">Acoplando banco de dados isolado e gerando chaves SSL...</p>
            <div class="progress-bar"><div class="progress-fill"></div></div>
        </div>
    </div>

    <div id="step-workspace" class="app-layout hidden">
        <aside class="sidebar">
            <div>
                <div class="logo">HAPRES <span>SOVEREIGN</span></div>
                <div class="nav-list">
                    <div id="menu-dash" class="nav-item active" onclick="switchTab('tab-dash')"><i class="fa-solid fa-chart-simple"></i> Visão Geral</div>
                    <div id="menu-canva" class="nav-item" onclick="switchTab('tab-canva')"><i class="fa-solid fa-cubes"></i> Super Canva</div>
                    <div id="menu-profile" class="nav-item" onclick="switchTab('tab-profile')"><i class="fa-solid fa-circle-user"></i> Meu Perfil</div>
                </div>
            </div>
            <div style="font-size: 13px; color: var(--text-secondary);" id="user-display">Henry Serpa</div>
        </aside>

        <main class="main-content">
            <div id="tab-dash" class="tab-pane">
                <div style="margin-bottom:40px;">
                    <h1 class="headline" style="font-size:28px; margin-bottom:6px;">Visão Geral</h1>
                    <p class="description">Dados integrados e status financeiro da sua conta ativa.</p>
                </div>
                <div class="bento-grid">
                    <div class="bento-card">
                        <div class="icon-box"><i class="fa-solid fa-wallet"></i></div>
                        <div class="card-label">Assinatura Mapeada</div>
                        <div class="card-number">R$ 97,00</div>
                    </div>
                    <div class="bento-card">
                        <div class="icon-box"><i class="fa-solid fa-sliders"></i></div>
                        <div class="card-label">Segmento Ativo</div>
                        <div class="card-number" id="dash-cat-display">Cursos</div>
                    </div>
                    <div class="bento-card">
                        <div class="icon-box"><i class="fa-solid fa-shield"></i></div>
                        <div class="card-label">Nível Operacional</div>
                        <div class="card-number" id="dash-role-display">Premium</div>
                    </div>
                </div>
            </div>

            <div id="tab-canva" class="tab-pane hidden">
                <div style="margin-bottom:40px;">
                    <h1 class="headline" style="font-size:28px; margin-bottom:6px;">Super Canva Builder</h1>
                    <p class="description">Monitore as APIs conectadas e módulos acoplados diretamente.</p>
                </div>
                <div class="bento-card" style="border-style: dashed; text-align: center; padding: 60px 24px;">
                    <i class="fa-solid fa-microchip" style="font-size: 32px; margin-bottom: 16px; color: var(--text-secondary);"></i>
                    <p class="description" style="margin-bottom: 24px;">Módulos estruturais de Pix, Agendamento e Redes Sociais prontos para expansão.</p>
                    <button class="primary-btn" style="width:auto; padding: 12px 32px;" onclick="alert('Injetando submódulos de API...')">Injetar Novo Módulo</button>
                </div>
            </div>

            <div id="tab-profile" class="tab-pane hidden">
                <div class="profile-container">
                    <div>
                        <h1 class="headline" style="font-size:28px; margin-bottom:6px;">Gerenciamento de Perfil</h1>
                        <p class="description">Alterne contas, adicione novos perfis operacionais e controle acessos.</p>
                    </div>

                    <div>
                        <h3 style="font-size:16px; font-weight:600; margin-bottom:16px;">Contas Vinculadas</h3>
                        <div id="lista-contas">
                            </div>
                        <button class="sec-btn" style="width:100%; padding:14px; margin-top:8px; border-style:dashed;" onclick="adicionarPerfil()">+ Adicionar Nova Conta Operacional</button>
                    </div>

                    <div class="danger-zone">
                        <h3 style="font-size:16px; font-weight:600; margin-bottom:8px; color:#ef4444;">Encerrar Sessão</h3>
                        <p class="description" style="margin-bottom:16px;">Desconectar a sessão atual e retornar à tela inicial de onboarding.</p>
                        <button class="sec-btn" style="color:#ef4444; border-color: rgba(239,68,68,0.2);" onclick="logout()">Desconectar Conta</button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        let contasAtivas = [];
        let contaAtual = null;
        let categoriaSelecionada = "Geral";

        function goStage(id) {
            document.querySelectorAll('.auth-container, .app-layout, #step-loading').forEach(el => el.classList.add('hidden'));
            document.getElementById(id).classList.remove('hidden');
        }

        function processarAcesso() {
            const nomeInput = document.getElementById('acc-name').value.trim() || "Henry Serpa";
            const foneInput = document.getElementById('acc-phone').value.trim();

            let role = "Premium Operational";
            if (nomeInput.toLowerCase().includes('henry') || foneInput === '11992819767') {
                role = "Root Director Admin";
            }

            contaAtual = { id: Date.now(), nome: nomeInput, role: role };
            contasAtivas = [contaAtual];

            goStage('step-categorias');
        }

        function buildApp(cat) {
            categoriaSelecionada = cat;
            goStage('step-loading');
            
            setTimeout(() => {
                // Sincroniza dados na tela
                document.getElementById('user-display').innerText = contaAtual.nome;
                document.getElementById('dash-cat-display').innerText = categoriaSelecionada;
                document.getElementById('dash-role-display').innerText = contaAtual.role.split(' ')[0];
                renderContas();
                goStage('step-workspace');
                switchTab('tab-dash');
            }, 3000);
        }

        function switchTab(tabId) {
            document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            
            document.getElementById(tabId).classList.remove('hidden');
            
            if(tabId === 'tab-dash') document.getElementById('menu-dash').classList.add('active');
            if(tabId === 'tab-canva') document.getElementById('menu-canva').classList.add('active');
            if(tabId === 'tab-profile') document.getElementById('menu-profile').classList.add('active');
        }

        function renderContas() {
            const container = document.getElementById('lista-contas');
            container.innerHTML = '';
            contasAtivas.forEach(c => {
                const isActive = c.id === contaAtual.id;
                container.innerHTML += `
                    <div class="account-strip" style="${isActive ? 'border-color: var(--accent-color);' : ''}">
                        <div class="account-info">
                            <div class="avatar-sub">${c.nome.charAt(0).toUpperCase()}</div>
                            <div>
                                <div style="font-size:14px; font-weight:600;">${c.nome} ${isActive ? '<span style="font-size:11px; color:var(--text-secondary); margin-left:6px;">(Ativa)</span>' : ''}</div>
                                <div style="font-size:12px; color:var(--text-secondary);">${c.role}</div>
                            </div>
                        </div>
                        ${!isActive ? `<button class="sec-btn" onclick="alternarConta(${c.id})">Alternar</button>` : ''}
                    </div>
                `;
            });
        }

        function adicionarPerfil() {
            const novoNome = prompt("Digite o nome da nova conta operacional:");
            if(!novoNome) return;
            const novaConta = { id: Date.now(), nome: novoNome, role: "Sub-User Operational" };
            contasAtivas.push(novaConta);
            renderContas();
        }

        function alternarConta(id) {
            const alvo = contasAtivas.find(c => c.id === id);
            if(alvo) {
                contaAtual = alvo;
                document.getElementById('user-display').innerText = contaAtual.nome;
                document.getElementById('dash-role-display').innerText = contaAtual.role.split(' ')[0];
                renderContas();
            }
        }

        function logout() {
            contasAtivas = [];
            contaAtual = null;
            document.getElementById('acc-name').value = '';
            document.getElementById('acc-phone').value = '';
            goStage('step-slide1');
        }

        function setAccent(hex, glow) {
            document.documentElement.style.setProperty('--accent-color', hex);
            document.documentElement.style.setProperty('--accent-glow', glow);
        }

        function setAccentLivre(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            setAccent(hex, `rgba(${r}, ${g}, ${b}, 0.1)`);
        }
    </script>
</body>
</html>
