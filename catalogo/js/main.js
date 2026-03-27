import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');

        // Resolve path para pasta /catalogo/
        const resolvedImage = imagemPerfil.match(/^https?:\/\//)
            ? imagemPerfil
            : imagemPerfil.replace(/^\/+/, '');

        const catalogoImage = resolvedImage.startsWith('..') || resolvedImage.startsWith('/')
            ? resolvedImage
            : `../${resolvedImage}`;

        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = catalogoImage;
    }

    const container = document.getElementById('main-content');

    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }

    // Menu hambúrguer toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            } else {
                mobileNav.classList.add('active');
                hamburgerMenu.classList.add('active');
            }
        });

        // Fechar menu ao clicar fora ou em um link
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        });

        // Fechar menu ao clicar em um link
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            });
        });
    }
});
