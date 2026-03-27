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
});
