document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.c-block-wrapper__copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const htmlContent = targetElement.outerHTML;
                let cssRulesSet = new Set();

                const allElements = [targetElement, ...targetElement.querySelectorAll('*')];
                const classList = new Set();
                const tagList = new Set();

                allElements.forEach(el => {
                    el.classList.forEach(cls => classList.add(cls));
                    tagList.add(el.tagName.toLowerCase()); // On récupère aussi h1, h2...
                });

                Array.from(document.styleSheets).forEach(sheet => {
                    try {
                        Array.from(sheet.cssRules).forEach(rule => {
                            const processRule = (selector) => {
                                // Vérifie les classes exactes
                                for (let className of classList) {
                                    const classRegex = new RegExp(`\\.${className.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}(?![a-zA-Z0-9_-])`);
                                    if (classRegex.test(selector)) return true;
                                }
                                // Vérifie les balises exactes (pour les titres vides de CSS actuellement)
                                for (let tagName of tagList) {
                                    const tagRegex = new RegExp(`^${tagName}$|^${tagName}\\s|\\s${tagName}\\s|\\s${tagName}$`);
                                    if (tagRegex.test(selector)) return true;
                                }
                                return false;
                            };

                            if (rule.selectorText && processRule(rule.selectorText)) {
                                cssRulesSet.add(rule.cssText);
                            }

                            if (rule.type === CSSRule.MEDIA_RULE) {
                                const mediaRules = Array.from(rule.cssRules);
                                if (mediaRules.some(r => r.selectorText && processRule(r.selectorText))) {
                                    cssRulesSet.add(rule.cssText);
                                }
                            }
                        });
                    } catch (e) {}
                });

                const cssContent = Array.from(cssRulesSet).join('\n');
                const finalBlob = `${htmlContent}\n\n/* CSS (AUTO-EXTRACT) */\n${cssContent}`;

                navigator.clipboard.writeText(finalBlob).then(() => {
                    const originalText = button.textContent;
                    button.textContent = 'Copié !';
                    setTimeout(() => button.textContent = originalText, 2000);
                }).catch(err => console.error(err));
            }
        });
    });
});