/* -----------------------------------------------------------
 * sections/ComoFunciona.tsx – V5 (exit simultâneo)
 * ----------------------------------------------------------- */
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { emoji: "🛒", title: "Escolha seu jogo", text: "Diversas opções e brinquedos! Monte seu combo de diversão." },
    {
        emoji: "📞",
        title: "Peça seu orçamento",
        text: (
            <>
            Faça um <strong>orçamento</strong> via <strong>Whatsapp</strong> e receba a proposta em minutos - sem burocracia!
            </>
        )
    },
    { emoji: "🚚", title: "Receba & instale", text: (
        <>
            Nossos entregadores <strong>recebem, montam e testam</strong> os equipamentos <strong>antes do evento começar!</strong>
        </>
        ) },
    { emoji: "🎉", title: "Aproveite sem limites", text: "Você curte a festa; nós ficamos de plantão. Diversão garantida!" },
];


export default function ComoFunciona() {
    const scope = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            /* ========== DESKTOP (≥768 px) ========== */
            mm.add("(min-width:768px)", () => {
                const cards = gsap.utils.toArray<HTMLElement>(".step");

                /* estado inicial (fora da tela, opaco) */
                gsap.set(cards, { autoAlpha: 0, y: 30 });

                /* timeline de ENTRADA (cascata) */
                const tlIn = gsap.timeline({ paused: true });
                cards.forEach(card => {
                    const chars = new SplitType(card.querySelector("h3") as HTMLElement, { types: "chars" }).chars;

                    tlIn
                        .to(card,  { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" })
                        .from(chars,{ y: 18, autoAlpha: 0, ease: "power3.out", stagger: 0.02, duration: 0.35 }, "<+0.05");
                });

                /* animação de SAÍDA: todos sobem juntos */
                const playOut = () =>
                    gsap.to(cards, { autoAlpha: 0, y: -30, duration: 0.35, ease: "power2.in" });

                ScrollTrigger.create({
                    trigger: ".steps-grid",
                    start: "top 80%",
                    end:   "bottom 20%",
                    onEnter:      () => tlIn.restart(),
                    onEnterBack:  () => tlIn.restart(),
                    onLeave:      () => {    // scroll pra baixo além do end
                        tlIn.pause();          // pausa SEM resetar
                        playOut();             // anima todo mundo subindo e sumindo
                    },
                    onLeaveBack:  () => {    // scroll pra cima além do start
                        tlIn.pause();
                        playOut();
                    }
                });

            });

            /* ========== MOBILE (<768 px) ========== */
            mm.add("(max-width:767px)", () => {
                gsap.utils.toArray<HTMLElement>(".step").forEach(card => {
                    gsap.set(card, { autoAlpha: 0, y: 30 });

                    const tl = gsap.timeline({ paused: true })
                        .to(card, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" });

                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 85%",
                        end: "bottom 15%",
                        onEnter: () => tl.play(),
                        onLeaveBack: () => {
                            tl.pause(0);
                            gsap.to(card, { autoAlpha: 0, y: -30, duration: 0.3, ease: "power2.in" });
                        },
                    });
                });
            });
        }, scope);

        return () => ctx.revert();
    }, []);

    /* ===================== JSX ===================== */
    return (
        <section ref={scope} className="max-w-5xl w-full mx-auto px-5 text-center scroll-mt-20">

            <h2 className="text-2xl font-bold mb-10">Como funciona</h2>

            <div className="steps-grid grid gap-10 md:grid-cols-4">
                {steps.map(({ emoji, title, text }, i) => (
                    <div key={i} className="step flex flex-col items-center gap-3">
                        <span className="text-4xl md:text-5xl select-none">{emoji}</span>
                        <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
                        <p className="text-sm text-foreground/80 leading-snug md:px-2">{text}</p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-10 relative flex justify-center">
                <Button
                    size="lg"
                    className=""
                >
                    Fazer Orçamento
                </Button>
            </div>
        </section>
    );
}
