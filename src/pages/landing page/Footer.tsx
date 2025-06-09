// ======================== Footer.tsx (Atualizado) ========================
import { FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="mt-20 w-full border-t border-dashed border-border bg-background text-foreground">
            <div className="max-w-screen-3xl mx-auto grid gap-10 px-6 py-14 md:grid-cols-4">
                {/* Coluna 1: Logo & tagline */}
                <div className=" space-y-3">
                    <div className="flex items-center gap-2">
                        <img
                            className="h-6 dark:invert select-none"
                            src="/assets/carro-logo-aluguel-de-games.png"
                            alt="Logo Aluguel de Games"
                        />
                        <span className="font-bold text-lg uppercase">
                            Aluguel de Games
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Entretenimento completo e sem complicação para eventos de todos os tamanhos.
                    </p>
                </div>

                {/* Coluna 2: Links rápidos */}
                <div className=" w-fit">
                    <h3 className="font-semibold mb-3">Páginas</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:underline">
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link to="/sobre" className="hover:underline">
                                Sobre Nós
                            </Link>
                        </li>
                        <li>
                            <Link to="/como-funciona" className="hover:underline">
                                Como Funciona
                            </Link>
                        </li>
                        <li>
                            <Link to="/galeria" className="hover:underline">
                                Galeria
                            </Link>
                        </li>
                        <li>
                            <Link to="/contato" className="hover:underline">
                                Contato
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Coluna 3: Contato */}
                <div className=" w-full grow">
                    <h3 className="font-semibold mb-3">Contato</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt className="shrink-0" /> Atendemos toda  a a Grande São Paulo
                        </li>
                        <li>(11) 4237‑7766</li>
                        <li>contato@alugueldegames.com.br</li>
                    </ul>
                    <div className="mt-4 flex items-center gap-3">
                        <a
                            href="https://wa.me/551142377766"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-primary/10 rounded"
                        >
                            <FaWhatsapp />
                        </a>
                        <a
                            href="https://instagram.com/locacaodegames/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-primary/10 rounded"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://facebook.com/alugueldegames"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-primary/10 rounded"
                        >
                            <FaFacebookF />
                        </a>
                    </div>
                </div>

                {/* Coluna 4: Missão rápida */}
                <div className=" space-y-3">
                    <h3 className="font-semibold mb-3">Nossa Missão</h3>
                    <p className="text-sm text-muted-foreground">
                        Proporcionar experiências inesquecíveis com equipamentos modernos, qualidade
                        impecável e atendimento de primeira.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        <strong>10 anos</strong> entregando diversão por todo o Brasil.
                    </p>
                </div>
            </div>

            <div className="border-t border-dashed border-border py-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Aluguel de Games — Todos os direitos reservados.
            </div>
        </footer>
    );
}

export default Footer;
