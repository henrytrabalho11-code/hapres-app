<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hapres Sovereign - Premium Interface</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        /* VARIÁVEIS DINÂMICAS: O segredo para o usuário customizar a cor do app */
        :root {
            --bg-main: #09090b;
            --bg-card: #141417;
            --bg-card-hover: #1c1c21;
            --border-color: rgba(255, 255, 255, 0.04);
            --text-main: #ffffff;
            --text-secondary: #71717a;
            
            /* Cor de Destaque Padrão (O Cinza Platina Industrial que você pediu) */
            --accent-color: #f4f4f5;
            --accent-glow: rgba(244, 244, 245, 0.1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; transition: all 0.25s ease; }
        
        body {
            background-color: var(--bg-main);
            color: var(--text-main);
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
        }

        /* PALETA DE CORES DINÂMICA (BARRA SUPERIOR) */
        .color-orchestrator {
            background: rgba(20, 20, 23, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
            padding: 16px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .orchestrator-title { font-size: 13px; font-weight: 600; letter-spacing: 0.05em; color: var(--text-secondary); text-transform: uppercase; }
        
        .color-picker-wrapper { display: flex; align-items: center; gap: 16px; }
        
        .color-pill {
            width: 24px; height: 24px; border-radius: 50%; cursor: pointer;
            border: 2px solid transparent; display: inline-block;
        }
        .pill-platina { background: #f4f4f5; }
        .pill-gold { background: #e5c158; }
        .pill-emerald { background: #10b981; }
        .pill-purple { background: #8b5cf6; }
        
        /* Input de paleta completa para o usuário escolher livremente */
        .custom-picker {
            background: transparent; border: none; width: 30px; height: 30px;
            cursor: pointer; border-radius: 50%;
        }

        /* ESTRUTURA DO WORKSPACE (IGUAL AO LAYOUT DESIGN CLEAN DA HOSTINGER) */
        .app-layout {
            display: grid;
            grid-template-columns: 280px 1fr;
            flex-grow: 1;
            min-height: calc(100vh - 63px);
        }

        /* SIDEBAR MINIMALISTA */
        .clean-sidebar {
            background-color: #0c0c0e;
            border-right: 1px solid var(--border-color);
            padding: 40px 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .brand-logo { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; color: var(--text-main); }
        .brand-logo span { color: var(--text-secondary); font-weight: 400; }

        .nav-group { display: flex; flex-direction: column; gap: 8px; margin-top: 48px; flex-grow: 1; }
        
        .nav-link {
            display: flex; align-items: center; gap: 14px; padding: 14px 16px;
            color: var(--text-secondary); font-size: 14px; font-weight: 500;
            text-decoration: none; border-radius: 12px;
        }
        .nav-link:hover { color: var(--text-main); background: rgba(255,255,255,0.02); }
        .nav-link.active {
            color: var(--text-main);
            background: var(--bg-card);
            box-shadow: inset 0 0 0 1px var(--border-color), 0 4px 12px rgba(0,0,0,0.1);
        }
        .nav-link i { font-size: 16px; }

        /* PAINEL CENTRAL DE CONTEÚDO (BENTO GRID LUXO) */
        .main-workspace { padding: 48px 56px; overflow-y: auto; }
        
        .welcome-header { margin-bottom: 40px; }
        .welcome-header h1 { font-size: 32px; font-weight: 600; letter-spacing: -0.03em; margin-bottom: 8px; }
        .welcome-header p { font-size: 15px; color: var(--text-secondary); }

        /* O BENTO GRID IDENTIFICADO NO SEU PRINT */
        .bento-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 40px;
        }

        .lux-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 32px;
            position: relative;
            overflow: hidden;
        }
        .lux-card:hover { border-color: rgba(255,255,255,0.08); background: var(--bg-card-hover); }

        .card-icon-box {
            width: 48px; height: 48px; border-radius: 12px;
            background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 24px; font-size: 18px; color: var(--text-main);
        }
        /* Aplica o highlight dinâmico escolhido pelo usuário */
        .lux-card:hover .card-icon-box {
            color: var(--accent-color);
            border-color: var(--accent-color);
            box-shadow: 0 0 20px var(--accent-glow);
        }

        .card-title { font-size: 16px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.01em; }
        .card-value { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 12px; }
        .card-meta { font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; }

        /* COMPONENTE INTERATIVO: SUPER CANVA MINIMALISTA */
        .canva-section {
            background: var(--bg-card); border: 1px dashed var(--border-color);
            border-radius: 24px; padding: 48px; text-align: center;
        }
        .canva-section h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .canva-section p { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; }
        
        .action-trigger {
            background: var(--accent-color); color: var(--bg-main);
            border: none; padding: 14px 28px; border-radius: 12px;
            font-size: 14px; font-weight: 600; cursor: pointer;
            box-shadow: 0 4px 20px var(--accent-glow);
        }
        .action-trigger:hover { opacity: 0.9; }

        /* RESPONSIVIDADE INTELIGENTE */
        @media (max-width: 1024px) {
            .app-layout { grid-template-columns: 1fr; }
            .clean-sidebar { display: none; }
            .bento-container { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <div class="color-orchestrator">
        <div class="orchestrator-title"><i class="fa-solid fa-palette"></i> Paleta do Ecossistema</div>
        <div class="color-picker-wrapper">
            <span style="font-size: 13px; color: var(--text-secondary);">Escolha o tom de destaque:</span>
            <div class="color-pill pill-platina" onclick="mudarTom('#f4f4f5', 'rgba(244,244,245,0.1)')"></div>
            <div class="color-pill pill-gold" onclick="mudarTom('#e5c158', 'rgba(229,193,88,0.1)')"></div>
            <div class="color-pill pill-emerald" onclick="mudarTom('#10b981', 'rgba(16,185,129,0.1)')"></div>
            <div class="color-pill pill-purple" onclick="mudarTom('#8b5cf6', 'rgba(139,92,246,0.1)')"></div>
            
            <input type="color" id="customColor" class="custom-picker" onchange="mudarTomLivre(this.value)">
        </div>
    </div>

    <div class="app-layout">
        
        <aside class="clean-sidebar">
            <div>
                <div class="brand-logo">HAPRES <span>SOVEREIGN</span></div>
                <nav class="nav-group">
                    <a href="#" class="nav-link active"><i class="fa-solid fa-grid-2"></i> Visão Geral</a>
                    <a href="#" class="nav-link"><i class="fa-solid fa-wand-magic-sparkles"></i> Core IA</a>
                    <a href="#" class="nav-link"><i class="fa-solid fa-layer-group"></i> Super Canva</a>
                    <a href="#" class="nav-link"><i class="fa-solid fa-sliders"></i> Ajustes</a>
                </nav>
            </div>
            <div style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">Henry Serpa • Root</div>
        </aside>

        <main class="main-workspace">
            <div class="welcome-header">
                <h1>Painel Operacional</h1>
                <p>Monitore o andamento, faturamento ativo e módulos injetados no servidor estável.</p>
            </div>

            <div class="bento-container">
                <div class="lux-card">
                    <div class="card-icon-box"><i class="fa-solid fa-wallet"></i></div>
                    <div class="card-title">Faturamento Ativo</div>
                    <div class="card-value">R$ 97,00</div>
                    <div class="card-meta"><span style="color:#10b981;">●</span> Mensalidade Recorrente</div>
                </div>

                <div class="lux-card">
                    <div class="card-icon-box"><i class="fa-solid fa-cubes"></i></div>
                    <div class="card-title">Módulos Acoplados</div>
                    <div class="card-value">2 Unidades</div>
                    <div class="card-meta">Gateway Pix & Agendamento</div>
                </div>

                <div class="lux-card">
                    <div class="card-icon-box"><i class="fa-solid fa-bolt"></i></div>
                    <div class="card-title">Status da Instância</div>
                    <div class="card-value">100%</div>
                    <div class="card-meta">Sovereign Engine Ativa</div>
                </div>
            </div>

            <div class="canva-section">
                <h3>Super Canva Integrado</h3>
                <p>Arraste novos microsserviços pré-configurados diretamente para a malha de produção do seu aplicativo.</p>
                <button class="action-trigger" onclick="alert('Injetando novos parâmetros lógicos...')">Acoplar Novo Componente</button>
            </div>
        </main>
    </div>

    <script>
        function mudarTom(hex, glow) {
            document.documentElement.style.setProperty('--accent-color', hex);
            document.documentElement.style.setProperty('--accent-glow', glow);
        }

        function mudarTomLivre(hex) {
            // Converte o HEX livre para RGBA para criar o efeito de brilho nos cards
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const glow = `rgba(${r}, ${g}, ${b}, 0.1)`;
            
            document.documentElement.style.setProperty('--accent-color', hex);
            document.documentElement.style.setProperty('--accent-glow', glow);
        }
    </script>
</body>
</html>
