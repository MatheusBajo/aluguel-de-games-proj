import {ThemeProvider} from "./components/theme-provider.tsx";
import Header from "./pages/landing page/Header.tsx";
import Main from "./pages/landing page/Main-v2.tsx";
import {Footer} from "./pages/landing page/Footer.tsx";
import StartCarousel from "./pages/landing page/start/StartCarousel.tsx";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Header/>
                <StartCarousel/>
                <Main />
                <Footer/>
                <a
                    href="https://wa.me/+551142377766"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-4 right-4 z-50 drop-shadow-primary 4xl:p-10 p-0 select-none"
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
