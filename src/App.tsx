import {useRef, useLayoutEffect} from "react"
import Header from "./pages/Header.tsx"
import {Carousel, CarouselContent, CarouselItem} from "./components/ui/carousel"
import {CarouselOverlay} from "./components/ui/CarouselOverlay.tsx"
import {Card, CardContent} from "./components/ui/card.tsx"
import {Button} from "./components/ui/button.tsx"
import {ThemeProvider} from "./components/theme-provider.tsx"
import Autoplay from "embla-carousel-autoplay"
import {Footer} from "./pages/Footer.tsx";
import {DynamicGradient} from "./components/hooks/DynamicGradient.tsx";
import TopBrinquedos from "./pages/top-toys.tsx";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Main from "./pages/Main.tsx";

// Exemplo de imagens no Carousel


function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Header/>
            <Main />
            <Footer/>

            <a
                href="https://wa.me/1142377766"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50 drop-shadow-primary 4xl:p-10 p-0"
            >
                <img
                    src="/assets/WhatsApp-logo-42377766.png"
                    alt="WhatsApp"
                    className="lg:size-20 size-16 object-contain"
                />
            </a>
        </ThemeProvider>
    );
}

export default App;
