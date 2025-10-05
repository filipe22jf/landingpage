// Arquivo: install-script.js

document.addEventListener('DOMContentLoaded', () => {
    let deferredPrompt; // Variável para guardar o evento de instalação
    const btnInstalar = document.getElementById('btn-instalar');
    const iosInstallPrompt = document.getElementById('ios-install-prompt');
    const btnFecharPrompt = document.getElementById('btn-fechar-prompt');

    // --- LÓGICA PARA ANDROID (E DESKTOPS COM CHROME) ---

    // 1. Captura o evento de instalação do navegador
    window.addEventListener('beforeinstallprompt', (e) => {
        // Previne que o mini-infobar apareça no Chrome
        e.preventDefault();
        // Guarda o evento para que possa ser disparado depois
        deferredPrompt = e;
        // Mostra nosso botão de instalação personalizado
        if (btnInstalar) {
            btnInstalar.style.display = 'block';
        }
        console.log('`beforeinstallprompt` foi disparado. App pronto para ser instalado.');
    });

    // 2. Adiciona o listener ao nosso botão
    if (btnInstalar) {
        btnInstalar.addEventListener('click', async () => {
            // Esconde nosso botão, pois ele só pode ser usado uma vez.
            btnInstalar.style.display = 'none';
            
            if (deferredPrompt) {
                // Mostra o prompt de instalação do navegador que guardamos
                deferredPrompt.prompt();
                
                // Espera o usuário responder ao prompt
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`Interação do usuário: ${outcome}`);
                
                // Limpamos a variável, pois o prompt não pode ser usado novamente.
                deferredPrompt = null;
            }
        });
    }

    // --- LÓGICA PARA IPHONE (iOS) ---

    // Função para detectar se é iOS
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    // Função para detectar se está rodando como PWA (standalone)
    function isInStandaloneMode() {
        return ('standalone' in window.navigator) && (window.navigator.standalone);
    }

    // Se for iOS e não estiver no modo PWA, mostra as instruções
    if (isIOS() && !isInStandaloneMode()) {
        if (iosInstallPrompt) {
            iosInstallPrompt.style.display = 'flex'; // Mostra o modal de instruções
        }
    }

    // Botão para fechar o modal de instruções do iOS
    if (btnFecharPrompt) {
        btnFecharPrompt.addEventListener('click', () => {
            iosInstallPrompt.style.display = 'none';
        });
    }
});
// =======================================================
//   LÓGICA PARA O MODAL DE AJUDA
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    const btnAjuda = document.getElementById('btn-ajuda-instalacao');
    const modalAjuda = document.getElementById('modal-ajuda');
    const btnFecharModal = document.getElementById('btn-fechar-modal');

    if (btnAjuda && modalAjuda) {
        // Abrir o modal
        btnAjuda.addEventListener('click', () => {
            modalAjuda.style.display = 'flex';
        });

        // Fechar o modal pelo botão 'X'
        btnFecharModal.addEventListener('click', () => {
            modalAjuda.style.display = 'none';
        });

        // Fechar o modal clicando fora dele
        modalAjuda.addEventListener('click', (event) => {
            if (event.target === modalAjuda) {
                modalAjuda.style.display = 'none';
            }
        });
    }
});
