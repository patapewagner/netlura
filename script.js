const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('span');

const THEME_KEY = 'netflix-clone-theme';

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    if (themeIcon) {
        // Ícones limpos em preto e branco (sem gradientes ou emojis coloridos)
        themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
        themeToggle.setAttribute('aria-label', `Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`);
    }
}

function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
        return stored;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

function initTheme() {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || 'dark';
        const nextTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

// Perfil ativo salvo ao clicar em cada perfil da página inicial
const profileLinks = document.querySelectorAll('.profile');
profileLinks.forEach(link => {
    link.addEventListener('click', () => {
        const profileId = link.dataset.profileId || 'default';
        const profileName = link.dataset.profileName || link.querySelector('figcaption')?.textContent?.trim() || 'Usuário';
        const profileImg = link.dataset.profileImg || link.querySelector('img')?.src || '';

        localStorage.setItem('perfilAtivoId', profileId);
        localStorage.setItem('perfilAtivoNome', profileName);
        localStorage.setItem('perfilAtivoImagem', profileImg);
    });
});

initTheme();
