import "./top-toys.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import EmojiConfetti from "../../../../components/hooks/EmojiConfetti.tsx";
import VolcanoEffect from "../../../../components/hooks/VolcanoEffect.tsx";
import ImageModal from "./product-modal/CarouselModal.tsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FlyingEmojis from "../../../../components/hooks/FlyingEmojis.tsx";
import topToysDataJson from "./topToysData_full_svg_all.json";
import { Medal, MedalIcon } from "lucide-react";
import CarouselModal from "./product-modal/CarouselModal.tsx";
import {useGSAP} from "@gsap/react";
import { useModalHistory } from "../../../../components/hooks/useModalHistory.ts";
import {StarRating} from "../../../../components/util/StarRating.tsx";

interface TopToysItem {
    id: string;
    rank: string;       // ex: "1", "2" etc.
    title: string;      // título do card
    desc?: string;      // descrição do card
    rate?: number;      // descrição do card
    href: string;       // link para a página do item
    imgSrc: string;     // imagem de fundo
    svgViewBox: string; // viewBox do SVG da posição no ranking
    svgPath: string;    // path do SVG do ranking
    confeti?: boolean;
    typeConfeti?: string;
}

const topToysData: TopToysItem[] = topToysDataJson as TopToysItem[];

export default function TopToys() {

    const sliderMaskRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);


    const [activePage, setActivePage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    // Estado para o modal
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    // Ref para controle da animação (para evitar cliques rápidos)
    const isAnimating = useRef(false);
    // Estado para detectar se está em mobile (largura <= 768px)
    const [isMobile, setIsMobile] = useState(false);

    const sortedData = [...topToysData].sort(
        (a, b) => parseInt(a.rank) - parseInt(b.rank)
    );

    const [openModal, setOpenModal] = useState(false);
    useModalHistory(openModal, setOpenModal);

    const handleOpenModal = (i: number) => {
        // (re)cria a almofada se ela não existir ainda
        if (history.state?.modal !== true) {
            window.history.pushState({ modal: true }, "");
        }

        setSelectedIndex(i);
        setOpenModal(true);        // hook só instala o listener
    };


    // Mede o tamanho do primeiro card para termos a largura individual
    const updateDimensions = () => {
        if (sliderMaskRef.current) {
            const firstCard = sliderMaskRef.current.querySelector(
                ".slider-item"
            ) as HTMLElement;
            if (firstCard) {
                const cardW = firstCard.getBoundingClientRect().width;
                setCardWidth(cardW);
                // console.log("[updateDimensions]", {
                //     maskWidth: sliderMaskRef.current.getBoundingClientRect().width,
                //     cardW,
                // });
            }
        }
    };

    // Atualiza a página ativa com base na posição do scroll e na largura do container
    const updatePagination = () => {
        if (sliderMaskRef.current && cardWidth) {
            const { scrollLeft, offsetWidth } = sliderMaskRef.current;
            const totalContentWidth = sortedData.length * cardWidth;
            const pages = Math.ceil(totalContentWidth / offsetWidth);
            let newPage = Math.round(scrollLeft / offsetWidth);
            const maxScrollLeft = totalContentWidth - offsetWidth;
            if (scrollLeft >= maxScrollLeft - 5) {
                newPage = pages - 1;
            }
            setActivePage(newPage);
            setTotalPages(pages);
        }
    };

    useEffect(() => {
        // Função para detectar se a tela é mobile
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            updateDimensions();
            updatePagination();
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        const sliderEl = sliderMaskRef.current;
        if (sliderEl) {
            sliderEl.addEventListener("scroll", updatePagination);
        }
        return () => {
            window.removeEventListener("resize", handleResize);
            if (sliderEl) {
                sliderEl.removeEventListener("scroll", updatePagination);
            }
        };
    }, [cardWidth]);

    const handleNext = () => {
        // Se estiver em mobile, não executa a navegação pelas setas
        if (isMobile) return;
        if (isAnimating.current || !sliderMaskRef.current || !cardWidth) return;
        isAnimating.current = true;

        const { scrollLeft, offsetWidth } = sliderMaskRef.current;
        const totalContentWidth = sortedData.length * cardWidth;
        const maxScrollLeft = totalContentWidth - offsetWidth;
        let target: number;
        if (scrollLeft >= maxScrollLeft - 5) {
            target = 0;
        } else {
            target = Math.min(scrollLeft + offsetWidth, maxScrollLeft);
        }
        // console.log("[handleNext]", { scrollLeft, offsetWidth, target });
        sliderMaskRef.current.scrollTo({
            left: target,
            behavior: "smooth",
        });
        setTimeout(() => {
            isAnimating.current = false;
        }, 500);
    };

    const handlePrev = () => {
        // Se estiver em mobile, não executa a navegação pelas setas
        if (isMobile) return;
        if (isAnimating.current || !sliderMaskRef.current || !cardWidth) return;
        isAnimating.current = true;

        const { scrollLeft, offsetWidth } = sliderMaskRef.current;
        const totalContentWidth = sortedData.length * cardWidth;
        const maxScrollLeft = totalContentWidth - offsetWidth;
        let target: number;
        if (scrollLeft <= 5) {
            target = maxScrollLeft;
        } else {
            target = Math.max(scrollLeft - offsetWidth, 0);
        }
        sliderMaskRef.current.scrollTo({
            left: target,
            behavior: "smooth",
        });
        setTimeout(() => {
            isAnimating.current = false;
        }, 500);
    };

    // registra o plugin apenas uma vez
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    // configura e dispara a animação bottom→top
    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".slider-item");

            ScrollTrigger.batch(cards, {
                scroller:   sliderMaskRef.current,
                horizontal: true,
                start:      "left right", // quando o LEFT do card encosta no RIGHT do container
                end:        "right left", // quando o RIGHT do card sai pelo LEFT

                // ao entrar (pra direita ou ao voltar) → anima de 50px abaixo pra 0
                onEnter: batch => {
                    batch.forEach(el => (el.style.visibility = "visible"));
                    gsap.to(batch, {
                        opacity:   1,
                        y:         0,
                        duration:  0.5,
                        stagger:   { each: 0.05, from: "start" },
                        ease:      "power2.out",
                    });
                },
                onEnterBack: batch => {
                    batch.forEach(el => (el.style.visibility = "visible"));
                    gsap.to(batch, {
                        opacity:   1,
                        y:         0,
                        duration:  0.5,
                        stagger:   { each: 0.05, from: "end" },
                        ease:      "power2.out",
                    });
                },

                // ao sair (pra direita ou ao voltar) → sobe de volta para 50px abaixo e some
                onLeave: batch =>
                    gsap.to(batch, {
                        opacity:   0,
                        y:         50,
                        duration:  0.3,
                        ease:      "power2.in",
                        onComplete: () =>
                            batch.forEach(el => (el.style.visibility = "hidden")),
                    }),
                onLeaveBack: batch =>
                    gsap.to(batch, {
                        opacity:   0,
                        y:         50,
                        duration:  0.3,
                        ease:      "power2.in",
                        onComplete: () =>
                            batch.forEach(el => (el.style.visibility = "hidden")),
                    }),
            });

            ScrollTrigger.refresh();
        },
        [isMobile],       // se quiser condicional mobile x desktop, mantenha essa dependência
        sliderMaskRef     // contexto do scroller
    );


    return (
        <section ref={sectionRef} className="max-w-full max-w-screen-4xl">
            <div
                className="lolomoRow lolomoRow_title_card ltr-0 select-none"
                data-list-context="mostWatched"
            >
                <h2 className="rowHeader ltr-0 m-0">
          <span className="rowTitle ltr-0">
            <div className="px-5">
              <h1
                  className="text-primary font-bold 2xl:text-2xl md:text-xl text-lg"
              >
                Brinquedos: top 10 mais alugados
              </h1>
            </div>
          </span>
                </h2>

                <div className="rowContainer rowContainer_title_card" id="row-2">
                    <div className="ptrack-container">
                        <div className="rowContent slider-hover-trigger-layer">
                            <div className="slider 2xl:px-[2%] px-5">
                                {/* Indicadores de paginação */}
                                <ul className="pagination-indicator">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <li
                                            key={index}
                                            className={index === activePage ? "active" : ""}
                                            onClick={() => {
                                                if (sliderMaskRef.current && cardWidth) {
                                                    const { offsetWidth } = sliderMaskRef.current;
                                                    const target = index * offsetWidth;
                                                    sliderMaskRef.current.scrollTo({
                                                        left: target,
                                                        behavior: "smooth",
                                                    });
                                                }
                                            }}
                                            style={{ cursor: "pointer" }}
                                        />
                                    ))}
                                </ul>

                                {/* Container do slider com estilos para swipe */}
                                <div
                                    ref={sliderMaskRef}
                                    className="sliderMask scrollbar-hide overflow-x-auto md:overflow-x-hidden webkit-touch overflow-y-hidden"
                                >
                                    <div className="sliderContent row-with-x-columns">
                                        {sortedData.map((item, index) => (
                                            <div key={item.id} className={`slider-item slider-item-${index}`}>
                                                <div className="title-card-container ltr-0">
                                                    <div id={`title-card-${index}`}
                                                         className="title-card title-card-top-10">
                                                        <div className="ptrack-content" data-tracking-uuid="...">
                                                            <a
                                                                aria-label={item.title}
                                                                tabIndex={0}
                                                                aria-hidden="false"
                                                                className="slider-refocus"
                                                            >
                                                                <div
                                                                    className="boxart-container boxart-rounded boxart-size-7x10"
                                                                    style={{position: "relative"}}
                                                                >
                                                                    <svg
                                                                        id={`rank-${item.rank}`}
                                                                        width="100%"
                                                                        height="100%"
                                                                        viewBox={item.svgViewBox}
                                                                        className={`svg-icon svg-icon-rank-${item.rank} top-10-rank pointer-events-none dark:invert-0 invert`}
                                                                    >
                                                                        <path
                                                                            stroke="#595959"
                                                                            strokeWidth="4"
                                                                            d={item.svgPath}
                                                                        />
                                                                    </svg>

                                                                    {/* Container da imagem com título */}
                                                                    <div
                                                                        className="w-full h-full"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleOpenModal(index);
                                                                        }}
                                                                    >
                                                                        <img
                                                                            className="boxart-image-in-padded-container"
                                                                            src={item.imgSrc}
                                                                            alt={`Capa de ${item.title}`}
                                                                        />
                                                                        <div
                                                                            className="absolute bottom-0 right-0 h-full w-1/2 z-10 pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent after:z-0"
                                                                        />
                                                                        <div
                                                                            className="absolute right-0 bottom-0 w-1/2 z-10 py-1 px-1">
                                                                            <p className="md:text-xs text-[7pt] font-bold truncate">
                                                                                {`${index + 1}. ${item.title}`}
                                                                            </p>
                                                                            {item.desc != null && (
                                                                                <div
                                                                                    className="md:text-[7pt] text-[5pt] font-bold text-primary/70">
                                                                                    <p className="truncate">{item.desc}</p>
                                                                                </div>
                                                                            )}
                                                                            {item.rate !== undefined && (
                                                                                <div className="flex items-center gap-[2px] md:text-[7pt] text-[5pt] font-bold">
                                                                                    <StarRating value={item.rate} />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="fallback-text-container"
                                                                         aria-hidden="true">
                                                                        <p className="fallback-text">{item.title}</p>
                                                                    </div>

                                                                    {/*{index === 0 && (*/}
                                                                    {/*    <FlyingEmojis className="text-xl sm:text-3xl"/>*/}
                                                                    {/*)}*/}
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="bob-container"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Renderiza as setas somente se NÃO for mobile */}
                                {!isMobile && (
                                    <>
                                        <div
                                            className="handle handlePrev active p-5 lg:p-0"
                                            onClick={handlePrev}
                                            role="button"
                                            tabIndex={0}
                                        >
                      <span className="indicator-icon">
                        <FaChevronLeft />
                      </span>
                                        </div>
                                        <div
                                            className="handle handleNext active p-5 lg:p-0"
                                            onClick={handleNext}
                                            role="button"
                                            tabIndex={0}
                                        >
                      <span className="indicator-icon">
                        <FaChevronRight />
                      </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para exibir a imagem do card */}
            {openModal && selectedIndex !== null && (
                <CarouselModal
                    open={openModal}
                    onOpenChange={setOpenModal}
                    items={sortedData.map(({ id, title, desc, imgSrc, rate, confeti }) => ({
                        id,
                        title,
                        desc,
                        imgSrc,
                        rate,
                        confeti,
                    }))}
                    initialIndex={selectedIndex}
                />

            )}
        </section>
    );
};