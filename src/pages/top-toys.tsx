import React, { useLayoutEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

// Dados dos 5 primeiros brinquedos
const topBrinquedos = [
    {
        title: "Videokê Profissional",
        description: "Anime sua festa com um repertório de milhares de músicas.",
        imageSrc: "/assets/equipamentos/fliperamas/Fliperama.jpg",
        alt: "Videokê Profissional",
    },
    {
        title: "Mesa de Sinuca Luxo",
        description: "Para quem busca sofisticação e diversão no mesmo pacote.",
        imageSrc: "/assets/carousel/Braland.webp",
        alt: "Mesa de Sinuca Luxo",
    },
    {
        title: "Fliperama Clássico",
        description: "Reviva a nostalgia dos anos 80 e 90 com centenas de jogos retrô.",
        imageSrc: "/assets/equipamentos/mesas-de-sinuca/Mesa de Sinuca.png",
        alt: "Fliperama Clássico",
    },
    {
        title: "Simulador de Corrida",
        description: "Experimente a emoção de corridas virtuais.",
        imageSrc: "/assets/equipamentos/simulador-corrida.jpg",
        alt: "Simulador de Corrida",
    },
    {
        title: "Arcade Interativo",
        description: "Diversão garantida com jogos clássicos em um arcade moderno.",
        imageSrc: "/assets/equipamentos/arcade-interativo.jpg",
        alt: "Arcade Interativo",
    },
];

export default function TopBrinquedos() {
    const containerRef = useRef(null);

    // useLayoutEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);
    //
    //     const textElement = document.querySelector(".titulo-brinquedos");
    //
    //     if (textElement) {
    //         const chars = textElement.textContent.split("").map((char) => {
    //             const span = document.createElement("span");
    //             span.textContent = char === " " ? "\u00A0" : char;
    //             span.style.display = "inline-block";
    //             return span;
    //         });
    //
    //         textElement.innerHTML = ""; // Limpa o texto original
    //         chars.forEach((char) => textElement.appendChild(char));
    //
    //         gsap.from(chars, {
    //             y: 50,
    //             opacity: 0,
    //             duration: 0.6,
    //             stagger: 0.05,
    //             ease: "power3.out",
    //         });
    //     }
    //
    //     return () => gsap.killTweensOf(".titulo-brinquedos");
    // }, []);

    return (
        <section
            className="max-w-screen-xl mx-auto px-4 py-8"
            ref={containerRef}
        >
            <div className="text-center mb-8">
                <h1 className="titulo-brinquedos text-2xl lg:text-3xl font-bold mb-2 text-primary/80">Top Brinquedos Mais Alugados</h1>

                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Descubra os brinquedos mais populares para tornar seu evento ainda mais especial.
                </p>
            </div>

            {/* Container vertical dos cards */}
            <div className="flex flex-col gap-8">
                {topBrinquedos.map((brinquedo, index) => (
                    <Card
                        key={index}
                        className="shadow-md overflow-hidden max-w-md mx-auto card" // adiciona a classe "card" para facilitar a seleção
                    >
                        <CardContent className="flex flex-col">
                            {/* Container da imagem com efeito de hover */}
                            <div className="relative w-full h-64 rounded-lg overflow-hidden group">
                                <img
                                    src={brinquedo.imageSrc}
                                    alt={brinquedo.alt}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Conteúdo textual */}
                            <div className="p-4 flex flex-col">
                                <h3 className="text-xl font-semibold mb-2">
                                    {brinquedo.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {brinquedo.description}
                                </p>
                                <Button variant="secondary" size="sm" className="self-start">
                                    Saiba Mais
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
