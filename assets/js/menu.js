document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.c-header__burger');
    const nav = document.querySelector('.c-header__nav');
    const body = document.querySelector('body');

    // On vérifie que les éléments existent pour éviter les erreurs
    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Ajoute/Enlève la classe pour l'overlay
            nav.classList.toggle('is-open');
            // Ajoute/Enlève la classe pour l'animation des barres du burger
            burger.classList.toggle('is-active');
            // Empêche le scroll de la page quand le menu est ouvert
            body.classList.toggle('u-no-scroll');
        });

        // Optionnel : Fermer le menu si on clique sur un lien
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                burger.classList.remove('is-active');
                body.classList.remove('u-no-scroll');
            });
        });
    }
});