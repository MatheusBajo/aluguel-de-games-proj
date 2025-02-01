import { Carousel, CarouselContent, CarouselItem, useCarousel } from "../components/ui/carousel.tsx";
import { CarouselOverlay } from "../components/ui/CarouselOverlay.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";
import TopBrinquedos from "./top-toys.tsx";
import { DynamicGradient } from "../components/hooks/DynamicGradient.tsx";
import { Button } from "../components/ui/button.tsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const carouselImages = [
    "/assets/carousel/Martelo de força.webp",
    "/assets/carousel/Boxing Machine.webp",
    "/assets/carousel/Braland.webp",
    "/assets/carousel/Karaokê Matrix Mesa.webp",
    "/assets/carousel/Karaokê Matrix Slim.webp",
    "/assets/carousel/Karaokê Matrix 30000.webp",
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
            stagger: { each: 0.02, from: "end" },
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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 key={currentText} ref={containerRef} className="text-white lg:text-3xl md:text-xl text-xs font-bold"></h2>
        </div>
    );
}





function Main() {
    const autoplayRef = useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: false,
        })
    );

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".div-carousel", {
            y: 0,
            opacity: 1,
            duration: 2,
        });

        return () => {
            gsap.killTweensOf(".div-carousel");
        };
    }, []);

    return (
        <main className="flex flex-col gap-10 px-4 pt-4 mx-auto w-full max-w-[1400px]">
            {/* =============== SECTION 1: CAROUSEL =============== */}
            <section className="div-carousel relative w-full">
                <Carousel
                    plugins={[autoplayRef.current]}
                    className="relative mx-auto w-full max-w-[1280px] select-none"
                    opts={{ align: "start", loop: true }}
                >
                    <CarouselOverlay images={carouselImages} />
                    <CarouselContent className="w-full">
                        {carouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent className="relative flex items-center justify-center p-0 overflow-hidden aspect-video 2xl:max-h-[720px]">
                                        <img
                                            src={image}
                                            alt={`Imagem Carousel ${index + 1}`}
                                            className="relative w-full h-full object-cover select-none z-10"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* Coloque o AnimatedCarouselText uma única vez aqui */}
                    <AnimatedCarouselText texts={carouselTexts} />
                </Carousel>

            </section>

            {/* =============== SECTION 2: DESTAQUES (EXEMPLO) =============== */}
            <TopBrinquedos />

            {/* =============== SECTION 3: SOBRE NÓS (EXEMPLO) =============== */}
            <section className="flex flex-col md:flex-row items-center gap-10 max-w-3xl w-full mx-auto">
                <div className="relative z-0 flex flex-col justify-center items-center gap-5">
                    <DynamicGradient imageUrl="/assets/carro-logo-aluguel-de-games.png" />
                    <img
                        className="h-40 dark:invert relative z-10"
                        src="/assets/carro-logo-aluguel-de-games.png"
                        alt="Logo Aluguel de Games"
                    />
                    <span className="relative z-10 text-2xl font-bold uppercase">
            Aluguel de Games
          </span>
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Sobre a Nossa Empresa</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Oferecemos serviços de locação de jogos e brinquedos eletrônicos para eventos corporativos, festas particulares, aniversários, casamentos e muito mais. Com mais de 10 anos de experiência no mercado, garantimos qualidade, pontualidade e segurança para que o seu evento seja um sucesso.
                    </p>
                    <Button variant="default">Leia mais...</Button>
                </div>
            </section>

            {/* =============== SECTION 4: CHAMADA PARA AÇÃO (CTA) =============== */}
            <section className="bg-secondary text-secondary-foreground py-10 px-5 rounded-md">
                <div className="max-w-[1000px] mx-auto flex flex-col items-center gap-4 text-center">
                    <h2 className="text-xl font-bold">
                        Pronto para levar mais diversão ao seu evento?
                    </h2>
                    <p className="max-w-xl text-sm md:text-base">
                        Entre em contato conosco e faça um orçamento sem compromisso. Nossa equipe terá o prazer de ajudar a escolher as melhores opções para o seu evento, seja pequeno, médio ou grande porte.
                    </p>
                    <Button variant="outline" size="lg">
                        Solicitar Orçamento
                    </Button>
                </div>
            </section>
        </main>
    );
}

export default Main;
