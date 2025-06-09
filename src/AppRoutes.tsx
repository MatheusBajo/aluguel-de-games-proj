import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./pages/landing page/Header";
import Main from "./pages/landing page/Main-v2";
import { Footer } from "./pages/landing page/Footer";
import ModalCard from "./pages/landing page/sections/top-toys/product-modal/ModalCard.tsx";
import Catalogo from "./pages/Catalogo";

export default function AppRoutes() {
    const location = useLocation();
    const state = location.state as { background?: Location };

    return (
        <>
            <Header />

            {/* rota principal (landing) */}
            <Routes location={state?.background || location}>
                <Route path="/" element={<Main />} />
                <Route path="/catalogo" element={<Catalogo />} />
            </Routes>

            <Footer />

            {/* sobreposição do modal (só se veio de background) */}
            {state?.background && (
                <Routes>
                    <Route path="/itens/:id" element={<ModalCard />} />
                </Routes>
            )}
        </>
    );
}
