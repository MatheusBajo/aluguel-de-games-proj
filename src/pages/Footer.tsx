import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="mt-10 w-full border-t border-dashed border-border bg-secondary p-5 text-secondary-foreground">
            <div className="mx-auto flex max-w-screen-3xl flex-col gap-6 md:flex-row md:justify-between">
                {/* Coluna 1 */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Aluguel de Games</h2>
                    <p className="text-sm mt-2 max-w-sm">
                        Oferecemos serviços de locação de Games, Fliperamas, Mesas de Sinuca
                        e muito mais para tornar seu evento inesquecível.
                    </p>
                    <span className="mt-2 text-sm">
            Grande São Paulo e região.
          </span>
                </div>

                {/* Coluna 2: Navegação Rápida */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-2">Páginas</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/" className="hover:underline">Início</a></li>
                        <li><a href="/sobre" className="hover:underline">Sobre Nós</a></li>
                        <li><a href="/galeria" className="hover:underline">Galeria</a></li>
                        <li><a href="/contato" className="hover:underline">Contato</a></li>
                    </ul>
                </div>

                {/* Coluna 3: Contato e Redes Sociais */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-2">Contato</h3>
                    <ul className="space-y-1 text-sm">
                        <li>Tel: (11) 4237-7766</li>
                        <li>Email: contato@alugueldegames.com.br</li>
                    </ul>
                    <div className="mt-2 flex items-center gap-2">
                        <a
                            href="https://wa.me/1142377766"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-secondary/50 rounded"
                        >
                            <FaWhatsapp />
                        </a>
                        <a
                            href="https://instagram.com/locacaodegames/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-secondary/50 rounded"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://facebook.com/alugueldegames"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-secondary/50 rounded"
                        >
                            <FaFacebookF />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 text-center border-t border-dashed border-border text-xs text-muted-foreground">
                © {new Date().getFullYear()} Aluguel de Games - Todos os direitos reservados.
            </div>
        </footer>
    );
}
