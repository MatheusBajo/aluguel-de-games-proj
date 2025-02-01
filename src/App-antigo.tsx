import Header from "./pages/Header.tsx";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "./components/ui/carousel"
import {Card, CardContent} from "./components/ui/card.tsx";
import {ThemeProvider} from "./components/theme-provider.tsx";
import Autoplay from "embla-carousel-autoplay";
import {useRef} from "react";
import {CarouselOverlay} from "./components/ui/CarouselOverlay.tsx";
import {Footer} from "./pages/Footer.tsx";

function App() {
    const images = [
        "/assets/carousel/Martelo de força.webp",
        "/assets/carousel/Boxing Machine.webp",
        "/assets/carousel/Braland.webp",
        "/assets/carousel/Karaokê Matrix Mesa.webp",
        "/assets/carousel/Karaokê Matrix Slim.webp",
        "/assets/carousel/Karaokê Matrix 30000.webp",
        "/assets/carousel/photo_5147916662928944180_y (1).webp",
        "/assets/carousel/Simulador Grua Fliperama.webp",
        "/assets/carousel/Videokê Pop 300.webp"
    ];

    const autoplayRef = useRef(
        Autoplay({
            delay: 2000,
            stopOnInteraction: true, // Aqui é o ponto principal
            stopOnMouseEnter: false, // Só para não pausar ao passar o mouse em desktop
        })
    );


    return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header/>

        <main className="flex flex-col gap-5 p-0 mx-auto w-full">
            <section className="relative w-full">
                <Carousel
                    plugins={[autoplayRef.current]}
                    className="relative mx-auto w-full max-w-[1280px] select-none"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselOverlay images={images} />
                    <CarouselContent className="w-full">
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent
                                        className="
                relative
                flex
                items-center
                justify-center
                p-0
                overflow-hidden
                aspect-video
                2xl:max-h-[720px]
                after:absolute
                after:bottom-0
                after:left-0
                after:w-full
                after:h-1/2
                after:bg-gradient-to-t
                after:from-black/80
                after:to-transparent
              "
                                    >
                                        <img
                                            src={image}
                                            alt={`Imagem ${index + 1}`}
                                            className="relative w-full h-full object-cover select-none z-100"
                                        />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </section>

            {/*<section className="container flex w-full max-h-[400px] overflow-hidden">*/}
            {/*    <img*/}
            {/*        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"*/}
            {/*        alt="Photo by Drew Beamer"*/}
            {/*        className="aspect-video object-cover rounded-md"*/}
            {/*    />*/}
            {/*</section>*/}
        </main>
        <Footer/>
    </ThemeProvider>
    )
}

export default App
