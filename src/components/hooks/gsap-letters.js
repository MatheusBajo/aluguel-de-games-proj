window.addEventListener("DOMContentLoaded", (event) => {
    // Verifica se a largura da tela é maior que 768px
    if (window.innerWidth > 768) {
        // Split text into spans para telas maiores que 768px
        let typeSplit = new SplitType("[text-split]", {
            types: "words, chars",
            tagName: "span"
        });

        // Garantir que o texto seja visível após o SplitType dividir o texto
        gsap.set("[text-split]", { opacity: 1 });

        // Função genérica para criar ScrollTrigger
        function createScrollTrigger(triggerElement, timeline) {
            ScrollTrigger.create({
                trigger: triggerElement,
                start: "top bottom",
                onLeaveBack: () => {
                    timeline.progress(0);
                    timeline.pause();
                }
            });
            ScrollTrigger.create({
                trigger: triggerElement,
                start: "top 72.8%",
                onEnter: () => timeline.play()
            });
        }

        // Função para aplicar animações com duração e delay personalizados
        function applyAnimations(selector, animationFunction) {
            document.querySelectorAll(selector).forEach((element) => {
                const duration = element.getAttribute("data-gsap-duration") || 0.5;
                const delay = element.getAttribute("data-gsap-delay") || 0;
                animationFunction(element, parseFloat(duration), parseFloat(delay));
            });
        }

        // Animação para "letters-slide-up"
        function animateLettersSlideUp(element, duration, delay) {
            let tl = gsap.timeline({ paused: true });
            tl.from(element.querySelectorAll(".char"), {
                yPercent: 100,
                opacity: 0,
                duration: duration,
                delay: delay,
                ease: "power1.out",
                stagger: {
                    amount: 0.6
                }
            });
            createScrollTrigger(element, tl);
        }

        // Aplicar animação para "letters-slide-up"
        applyAnimations("[letters-slide-up]", animateLettersSlideUp);

        // Ajustar a visibilidade após as animações serem aplicadas
        gsap.set("[text-split]", { opacity: 1 });
    } else {
        // Para telas menores, mostrar o texto normalmente sem animação
        document.querySelector("[text-split]").style.opacity = 1;
    }
});
