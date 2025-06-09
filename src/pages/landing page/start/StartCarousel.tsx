import {CarouselContent, CarouselItem, CarouselLanding, useCarousel} from "../../../components/ui/carousel-landing.tsx";
import {CarouselOverlayGradient} from "../../../components/ui/CarouselOverlayGradient.tsx";
import {Card, CardContent} from "../../../components/ui/card.tsx";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Autoplay from "embla-carousel-autoplay";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import SplitType from "split-type";


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

function StartCarousel() {
    const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

    // anima o carousel
    useLayoutEffect(() => {
        gsap.to(".div-carousel", { y: 0, opacity: 1, duration: 3 });
        return () => gsap.killTweensOf(".div-carousel");
    }, []);


    return (
        <div className="relative flex flex-col gap-20 py-5 w-full">
            {/* o FinisherHeader vai injetar o <canvas> aqui */}

            <div className="div-carousel relative z-10 max-w-[1400px] mx-auto w-full px-5 select-none">
                <CarouselLanding
                    slidesCount={carouselImages.length}
                    plugins={[autoplayRef.current]}
                    className="relative mx-auto w-full max-w-[1280px]"
                    opts={{align: "start", loop: true}}
                >
                    <CarouselOverlayGradient images={carouselImages}/>
                    <CarouselContent className="w-full">
                        {carouselImages.map((image, index) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent
                                        className="relative flex items-center justify-center p-0 overflow-hidden w-full aspect-video max-h-[720px]">
                                        <img
                                            src={image}
                                            alt={`Imagem Carousel ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <AnimatedCarouselText texts={carouselTexts}/>
                </CarouselLanding>
            </div>
        </div>
    );
}

export default StartCarousel;
