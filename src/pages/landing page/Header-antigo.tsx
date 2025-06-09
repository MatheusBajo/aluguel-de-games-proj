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

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Fliperamas",
        href: "/fliperamas",
        description:
            "Jogos clássicos e diversos para festas e eventos.",
    },
    {
        title: "Mesas de Sinuca",
        href: "/docs/primitives/hover-card",
        description:
            "Bilhar e sinuca para festas e eventos.",
    },
    {
        title: "Videokês",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

function Header() {
    return (
        // <header
            //     className="sticky top-0 z-50 w-full border-dashed border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            //     <nav
            //     className="flex items-center gap-2 px-5 mx-auto h-14 4xl:max-w-screen-3xl 3xl:max-w-screen-2xl 2xl:max-w-screen-2xl w-full 2xl:border-dashed 2xl:border-x 2xl:border-border">
        <header
            className="sticky top-0 z-50 w-full border-dashed border-b border-border bg-transparent backdrop-blur-3xl
    supports-[backdrop-filter]:before:absolute
    supports-[backdrop-filter]:before:inset-0
    supports-[backdrop-filter]:before:bg-gradient-to-t
    supports-[backdrop-filter]:before:from-transparent
    supports-[backdrop-filter]:before:to-background/80
    supports-[backdrop-filter]:before:z-[-1]">            <nav
                className="flex items-center justify-center gap-2 px-5 mx-auto h-14 w-full max-w-screen-3xl">

                <div className="grow flex h-full items-center w-full justify-start gap-5 text-nowrap">
                    <div className="h-full">
                        <a className="flex w-full h-full items-center gap-2 ">
                            <img className="h-5 dark:invert"
                                 src="assets/carro-logo-aluguel-de-games.png"
                                 alt="Logo Aluguel de Games"/>
                            <span className="text-lg font-bold uppercase block lg:block sm:hidden select-none">Aluguel de Games</span>
                        </a>
                    </div>
                </div>
                <div className="grow sm:flex h-full items-center w-full justify-center hidden">
                    <NavigationMenu >
                        <NavigationMenuList>
                            {/* Dropdown "Getting Started" */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Sobre Nós</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] gap-4">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to="/"
                                                    className="relative z-0 text-white flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md"
                                                >
                                                    {/* Container pai para as camadas de fundo */}
                                                    <div className="absolute inset-0 z-[-2]">
                                                        {/* Gradiente dinâmico com z-index menor */}
                                                        <DynamicGradient imageUrl="/assets/maquinadeboxing.jpg"/>

                                                        <picture>
                                                            <source
                                                                media="(min-width: 1024px)"
                                                                srcSet="/assets/maquinadeboxing.jpg"
                                                            />
                                                            <img
                                                                src="/assets/carousel/Karaokê Matrix Slim.webp"
                                                                alt="Máquina de Boxing"
                                                                className="absolute inset-0 h-full w-full object-cover rounded-md z-[-1]"
                                                            />
                                                        </picture>
                                                    </div>

                                                    {/* Overlay escuro (pseudo-elemento) */}
                                                    <div
                                                        className="after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-t after:from-black/80 after:to-transparent after:z-0"/>

                                                    <div className="mb-2 mt-4 text-lg font-medium relative">
                                                        Aluguel de Games
                                                    </div>
                                                    <p className="text-sm leading-tight text-white/70 relative">
                                                        Brinquedos e jogos para festas e eventos.
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>

                                        </li>
                                        <ListItem href="/docs" title="Quem somos nós e o que fazemos.">
                                            <p>Conheça um pouco mais sobre a nossa empresa.</p>
                                        </ListItem>
                                        <ListItem href="/docs/installation" title="Como alugar e os benefícios.">
                                            <p>Veja como é fácil alugar conosco.</p>
                                        </ListItem>
                                        <ListItem href="/docs/primitives/typography"
                                                  title="Tipos de brinquedos e jogos.">
                                            <p>Conheça os brinquedos e jogos disponíveis.</p>
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* Dropdown "Components" */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Equipamentos</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components.map((component) => (
                                            <ListItem key={component.title} title={component.title}
                                                      href={component.href}>
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* Link "Documentation" */}
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link to="/docs" className={navigationMenuTriggerStyle()}>
                                        Fazer um orçamento
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="grow flex h-full items-center w-full justify-end">
                    <ul className="flex items-center gap-0.5">
                        <li>
                            <Button variant="ghost" size="icon" className="transition-none"><FaWhatsapp/></Button>
                        </li>
                        <li>
                            <ModeToggle/>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>


    );
};

export default Header;
