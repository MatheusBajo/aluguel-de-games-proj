/* -----------------------------------------------------------
 * components/CarouselModal.tsx
 * ----------------------------------------------------------- */
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "../../../../../components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../../../components/ui/carousel";
import {FaSearch, FaStar} from "react-icons/fa";
import FlyingEmojis from "../../../../../components/hooks/FlyingEmojis";
import { Badge } from "../../../../../components/ui/badge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {StarRating} from "../../../../../components/util/StarRating.tsx";
import { Button } from "../../../../../components/ui/button.tsx";

export interface CarouselModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: Array<{
        id: string;
        title: string;
        desc?: string;
        imgSrc: string;
        rate?: number;
        confeti?: boolean;
    }>;
    initialIndex: number;
}

export function CarouselModal({
                                  open,
                                  onOpenChange,
                                  items,
                                  initialIndex,
                              }: CarouselModalProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                {/* -- Acessibilidade hidden -- */}
                <VisuallyHidden>
                    <DialogTitle>Galeria de Imagens</DialogTitle>
                    <DialogDescription>
                        Navegue pelas imagens do carrossel utilizando os controles.
                    </DialogDescription>
                </VisuallyHidden>

                {/* -- Carrossel -- */}
                <div className="h-[80vh] w-full rounded-md overflow-hidden aspect-[9/16]">
                    <Carousel
                        opts={{ loop: true, align: "center" }}  // loop infinito + alinhado no centro
                        setApi={(api) => {
                            if (!api) return;
                            // garante que, depois de qualquer re-init, ele volte pro slide certo
                            api.on("reInit", () => api.scrollTo(initialIndex));
                            api.scrollTo(initialIndex);
                        }}
                        className="h-full w-full "
                    >

                    <CarouselContent className="h-full w-full">
                            {items.map((item, index) => (
                                <CarouselItem
                                    key={item.id}
                                    /*  - “aspect-[9/16]” garante o retrato
                                       - “w-auto” deixa o width ser calculado pelo aspect-ratio
                                       - “flex-shrink-0” impede o Embla de esticar */
                                    className="relative h-full w-auto aspect-[9/16] flex-shrink-0"
                                >
                                    <img
                                        src={item.imgSrc}
                                        alt={item.title}
                                        className="object-cover w-full h-full select-none rounded-md"
                                    />

                                    {/* overlay  texto */}
                                    <div className="absolute inset-0 pointer-events-none z-10 after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent" />
                                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 text-white gap-2">
                                        {item.confeti && (
                                            <div className="p-10">
                                                <FlyingEmojis
                                                    className="text-4xl sm:text-5xl"
                                                    maxDistancePercent={0.3}
                                                    offsetX={10}   /* 50 px da direita */
                                                    offsetY={15}   /* 50 px de baixo  */
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1 w-4/5">
                                            <p
                                                className="font-bold leading-tight
                                             text-3xl sm:text-4xl
                                             line-clamp-2 sm:line-clamp-1 mb-1">
                                                {`${index + 1}. ${item.title}`}
                                            </p>


                                            {/*<div className="flex gap-2">*/}
                                            {/*    <Badge variant="tag" color="green">*/}
                                            {/*    🥇 Preferido*/}
                                            {/*    </Badge>*/}
                                            {/*    <Badge variant="tag" color="red">*/}
                                            {/*        🕹 Retrô*/}
                                            {/*    </Badge>*/}
                                            {/*</div>*/}

                                            {item.desc && (
                                                <div className="text-xs font-semibold text-primary/70 line-clamp-3">
                                                    {item.desc}
                                                </div>
                                            )}

                                            {item.rate !== undefined && (
                                               <div className="flex items-center gap-[2px]">
                                                     <StarRating value={item.rate} /><p>{item.rate + "/5"}</p>
                                               </div>
                                            )}
                                        </div>
                                        <Button size="sm" variant="outline">🔎 Faça um Orçamento!</Button>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CarouselModal;
