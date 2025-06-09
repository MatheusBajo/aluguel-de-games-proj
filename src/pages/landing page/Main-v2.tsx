// ======================== Main.tsx (Atualizado) ========================
import {
    CarouselLanding,
    CarouselContent,
    CarouselItem,
    useCarousel,
} from "../../components/ui/carousel-landing.tsx";
import { CarouselOverlayGradient } from "../../components/ui/CarouselOverlayGradient.tsx";
import { Card, CardContent } from "../../components/ui/card.tsx";
import { DynamicGradient } from "../../components/hooks/DynamicGradient.tsx";
import { Button } from "../../components/ui/button.tsx";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import TopToys from "./sections/top-toys/TopToys.tsx";
import FlyingEmojis from "../../components/hooks/FlyingEmojis.tsx";
import {
    FaSearch,
    FaClipboardCheck,
    FaTruck,
    FaSmile,
    FaStar,
} from "react-icons/fa";
import ComoFunciona from "./sections/como-funciona/ComoFunciona.tsx";

gsap.registerPlugin(ScrollTrigger);

const carouselImages = [
    "/assets/carousel/compressed/Martelo de força.png",
    "/assets/carousel/compressed/Boxing Machine.png",
    "/assets/carousel/compressed/Braland.png",
    "/assets/carousel/compressed/Karaokê Matrix Mesa.png",
    "/assets/carousel/compressed/Karaokê Matrix Slim.png",
    "/assets/carousel/compressed/Karaokê Matrix 30000.png",
];

const carouselTexts = [
    "Martelo de Força - Desafie seus limites!",
    "Boxing Machine - Teste seu soco!",
    "Braland - Diversão garantida!",
    "Karaokê Matrix Mesa - Solte a voz!",
    "Karaokê Matrix Slim - Compacto e poderoso!",
    "Karaokê Matrix 30.000 - Opções intermináveis!",
];
function AnimatedCarouselText({ texts }) {
    const { realIndex } = useCarousel();
    const containerRef = useRef(null);
    const [currentText, setCurrentText] = useState(texts[realIndex]);
    const entryTimelineRef = useRef(null);
    const prevRealIndex = useRef(realIndex);

    useEffect(() => {
        if (realIndex === prevRealIndex.current) return;
        if (!containerRef.current) return;

        gsap.killTweensOf(containerRef.current);
        if (entryTimelineRef.current) {
            entryTimelineRef.current.kill();
            entryTimelineRef.current = null;
        }

        const chars = containerRef.current.querySelectorAll(".char");
        const nextText = texts[realIndex];
        if (!chars || chars.length === 0) {
            setCurrentText(nextText);
            prevRealIndex.current = realIndex;
            return;
        }

        gsap.to(chars, {
            y: -30,
            opacity: 0,
            duration: 0.3,
            ease: "power1.in",
            stagger: { each: 0.01, from: "end" },
            onComplete: () => {
                setCurrentText(nextText);
                prevRealIndex.current = realIndex;
            },
        });
    }, [realIndex, texts]);

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.textContent = currentText;
        const splitInstance = new SplitType(containerRef.current, { types: "chars" });
        const chars = splitInstance.chars;

        entryTimelineRef.current = gsap.from(chars, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: "power3.out",
        });
    }, [currentText]);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <h2 key={currentText} ref={containerRef} className="text-white lg:text-3xl md:text-xl text-[8pt] font-bold"></h2>
        </div>
    );
}
function Main() {



    return (
        <main className="flex flex-col gap-20 pt-5 mx-auto w-full">
            {/* =============== SECTION 1: CAROUSEL =============== */}


            {/* =============== SECTION 2: TOP TOYS =============== */}
            <TopToys />

            <ComoFunciona />

            {/* =============== SECTION 4: SOBRE NÓS =============== */}
            <section className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full mx-auto px-5">
                {/* Logo + efeito */}
                <div className="relative flex flex-col items-center gap-5 shrink-0">
                    <DynamicGradient imageUrl="/assets/carro-logo-aluguel-de-games.png" />
                    <img
                        className="h-40 dark:invert relative z-10 select-none"
                        src="/assets/carro-logo-aluguel-de-games.png"
                        alt="Logo Aluguel de Games"
                    />
                    <span className="relative z-10 text-2xl font-bold uppercase">
                        Aluguel de Games
                    </span>
                </div>

                {/* Texto */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold">Sobre Nós</h2>
                    <p className="text-sm text-muted-foreground">
                        Há mais de 10 anos transformamos eventos em experiências marcantes. Nossa
                        missão é tornar o entretenimento de qualidade <strong>acessível</strong> em
                        todo o Brasil, levando desde Fliperamas retrô até Realidade Virtual de
                        última geração.
                    </p>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                        <li>
                            <strong>Inovação:</strong> Equipamentos sempre atualizados.
                        </li>
                        <li>
                            <strong>Qualidade:</strong> Manutenção preventiva e suporte técnico no
                            evento.
                        </li>
                        <li>
                            <strong>Excelência no atendimento:</strong> consultores dedicados do
                            orçamento à retirada.
                        </li>
                    </ul>
                    <Button asChild>
                        <a href="/sobre">Saiba mais</a>
                    </Button>
                </div>
            </section>

            {/* =============== SECTION 5: CTA =============== */}
            <section className="bg-secondary text-secondary-foreground py-10 px-5 rounded-md">
                <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-4 text-center">
                    <h2 className="text-xl font-bold">
                        Pronto para levar mais diversão ao seu evento?
                    </h2>
                    <p className="max-w-xl text-sm md:text-base">
                        Fale com a nossa equipe e monte o combo perfeito para sua festa, feira ou
                        confraternização.
                    </p>
                    <Button variant="outline" size="lg" asChild>
                        <a href="/orcamento">Solicitar Orçamento</a>
                    </Button>
                </div>
            </section>
        </main>
    );
}

export default Main;
