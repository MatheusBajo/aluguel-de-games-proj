import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const VolcanoEffect = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Função para criar e inserir um emoji no DOM
        const createEmoji = (emoji: string) => {
            const el = document.createElement("div");
            el.classList.add("emoji-particle");
            el.textContent = emoji;
            Object.assign(el.style, {
                position: "absolute",
                // começa na base (bottom: 0), centralizado no eixo X
                bottom: "0px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "20px",
                pointerEvents: "none",
            });
            containerRef.current.appendChild(el);
            return el;
        };

        // Dispara um "lote" de emojis subindo
        const spawnEmojis = () => {
            const emojis = ["😮", "😂", "❤️"]; // emojis que deseja exibir
            const total = 6; // quantidade de emojis por "lote"

            for (let i = 0; i < total; i++) {
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                const el = createEmoji(randomEmoji);

                // Anima cada emoji
                gsap.to(el, {
                    y: -150 - Math.random() * 100,  // sobe (entre 150 e 250px)
                    x: (Math.random() * 120) - 60,  // dispersão horizontal entre -60 e 60px
                    opacity: 0,
                    duration: 2 + Math.random(),    // tempo de animação (2 a 3s)
                    ease: "power2.out",
                    onComplete: () => {
                        // remove o elemento ao final
                        containerRef.current?.removeChild(el);
                    },
                });
            }
        };

        // A cada 1 segundo, cria um lote de emojis
        const interval = setInterval(spawnEmojis, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                // ocupa a mesma área do container pai
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none", // não interfere no mouse
                zIndex: 2,            // fica acima da imagem
            }}
        />
    );
};

export default VolcanoEffect;
