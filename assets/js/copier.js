document.querySelectorAll('.c-block-wrapper__copy-btn').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const htmlContent = targetElement.outerHTML;
            
            // On définit manuellement le CSS propre correspondant à tes classes SCSS
            // C'est beaucoup plus propre que de laisser le navigateur "deviner"
            const cssContent = `/* CSS source (_block.scss) */
.c-float-container { display: flow-root; width: 100%; margin-bottom: 2rem; }
.c-float-container p { margin-top: 0; }
.u-float-left { float: left; width: 150px; height: 100px; margin-right: 1.5rem; margin-bottom: 1rem; background-color: #f4f4f4; border: 1px solid #ddd; }
.u-float-right { float: right; width: 150px; height: 100px; margin-left: 1.5rem; margin-bottom: 1rem; background-color: #f4f4f4; border: 1px solid #ddd; }`;

            const finalBlob = `${htmlContent}\n\n/* CSS */\n${cssContent}`;

            navigator.clipboard.writeText(finalBlob).then(() => {
                alert("HTML et CSS source copiés !");
                const originalText = button.textContent;
                button.textContent = 'Copié !';
                setTimeout(() => button.textContent = originalText, 2000);
            }).catch(err => {
                alert("Erreur : " + err);
            });
        }
    });
});