import {ModeToggle} from "../components/mode-toggle.tsx";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu"
import {Link} from "react-router-dom";
import {ListItem} from "../components/ui/ListItem.tsx";
import { FaWhatsapp } from "react-icons/fa";
import {Button} from "../components/ui/button.tsx";
import {DynamicGradient} from "../components/hooks/DynamicGradient.tsx";

function Header() {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-dashed border-border bg-transparent dark:background-blur-[10px] backdrop-blur-[20px]
  supports-[backdrop-filter]:before:absolute
  supports-[backdrop-filter]:before:inset-0
  supports-[backdrop-filter]:before:bg-gradient-to-b
  dark:supports-[backdrop-filter]:before:from-background/80
  dark:supports-[backdrop-filter]:before:via-background/60
  dark:supports-[backdrop-filter]:before:to-background/30
  supports-[backdrop-filter]:before:from-background/80
  supports-[backdrop-filter]:before:via-background/60
  supports-[backdrop-filter]:before:to-background/40

  supports-[backdrop-filter]:before:z-[-1]"
        >

            <nav className="flex items-center justify-center gap-2 px-5 mx-auto h-14 w-full max-w-screen-3xl">

                {/* LOGO / Título */}
                <div className="grow flex h-full items-center w-full justify-start text-nowrap">
                    <Link
                        to="/"
                        className="flex w-full h-full items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <img
                            className="h-5 dark:invert"
                            src="assets/carro-logo-aluguel-de-games.png"
                            alt="Logo Aluguel de Games"
                        />
                        <span className="text-lg font-bold uppercase block lg:block sm:hidden select-none">
    Aluguel de Games
  </span>
                    </Link>

                </div>

                {/* NAVIGATION MENU */}
                <div className="grow sm:flex h-full items-center w-full justify-center hidden ">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* 1) Dropdown "Sobre Nós" */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Sobre Nós</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] gap-4">
                                        {/* Cartão grande do lado esquerdo */}
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/"
                                                    className="relative z-0 text-white flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md"
                                                >
                                                    {/* Container pai para as camadas de fundo */}
                                                    <div className="absolute inset-0 z-[-2]">
                                                        {/* Gradiente dinâmico com z-index menor */}
                                                        <DynamicGradient  imageUrl="/assets/maquinadeboxing.jpg"/>

                                                        <picture>
                                                            <source
                                                                media="(min-width: 1024px)"
                                                                srcSet="/assets/maquinadeboxing.jpg"
                                                            />
                                                            <img
                                                                src="/assets/equipamentos/fliperamas/Fliperamas.jpg"
                                                                alt="Máquina de Boxing"
                                                                className="absolute inset-0 h-full w-full object-cover rounded-md z-[-1]"
                                                            />
                                                        </picture>
                                                    </div>

                                                    {/* Overlay escuro (pseudo-elemento) */}
                                                    <div className="after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-t after:from-black/80 after:to-transparent after:z-0"/>

                                                    <div className="mb-2 mt-4 text-lg font-medium relative">
                                                        Aluguel de Games
                                                    </div>
                                                    <p className="text-sm leading-tight text-white/70 relative">
                                                        Brinquedos e jogos para festas e eventos.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        {/* Links em Lista */}
                                        <ListItem
                                            href="/sobre/historia"
                                            title="Nossa História"
                                        >
                                            Um breve resumo sobre nossa jornada.
                                        </ListItem>
                                        <ListItem
                                            href="/sobre/equipe"
                                            title="Equipe"
                                        >
                                            Veja quem faz tudo acontecer.
                                        </ListItem>
                                        <ListItem
                                            href="/sobre/parceiros"
                                            title="Parceiros e Clientes"
                                        >
                                            Alguns de nossos principais parceiros.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* 2) Dropdown "Jogos e Brinquedos" */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Jogos & Equipamentos</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        <ListItem
                                            href="/jogos/fliperamas"
                                            title="Fliperamas"
                                        >
                                            Clássicos, retrô e multijogos para o seu evento.
                                        </ListItem>
                                        <ListItem
                                            href="/jogos/sinuca"
                                            title="Mesas de Sinuca"
                                        >
                                            Bilhar, sinuca e outros jogos de mesa.
                                        </ListItem>
                                        <ListItem
                                            href="/jogos/videokes"
                                            title="Videokês"
                                        >
                                            Karaokê completo para animar a festa.
                                        </ListItem>
                                        <ListItem
                                            href="/jogos/simuladores"
                                            title="Simuladores"
                                        >
                                            Corrida, Realidade Virtual e muito mais.
                                        </ListItem>
                                        <ListItem
                                            href="/jogos/brinquedos"
                                            title="Brinquedos Diversos"
                                        >
                                            Air Game, Basquete, Martelo de Força, etc.
                                        </ListItem>
                                        <ListItem
                                            href="/jogos/arcades"
                                            title="Outros Arcades"
                                        >
                                            Pinball, Guitar Hero, Boxing Machine...
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* 3) Link "Galeria" */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/galeria" className={navigationMenuTriggerStyle()}>
                                        Galeria
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* 4) Link "Contato" */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/contato" className={navigationMenuTriggerStyle()}>
                                        Contato
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* 5) Botão/Link "Fazer Orçamento" (fixo) */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/orcamento" className={navigationMenuTriggerStyle()}>
                                        Fazer um Orçamento
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Ações à direita (WhatsApp, Modo Dark/Light) */}
                <div className="grow flex h-full items-center w-full justify-end">
                    <ul className="flex items-center gap-0.5">
                        <li>
                            <a
                                href="https://wa.me/+551142377766"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="ghost" size="icon" className="transition-none">
                                    <FaWhatsapp/>
                                </Button>
                            </a>
                        </li>
                        <li>
                            <ModeToggle/>
                        </li>
                    </ul>
                </div>

            </nav>
        </header>
    );
}

export default Header;
