import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../components/theme-provider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        // Atualiza a classe "dark" no <html>
        document.documentElement.classList.toggle("dark", newTheme === "dark");

        // Obtém a cor do --background do novo tema
        setTimeout(() => {
            const rootStyles = getComputedStyle(document.documentElement);
            const bgColor = rootStyles.getPropertyValue("--background").trim();
            // @ts-ignore
            document.querySelector("meta[name='theme-color']").setAttribute("content", `hsl(${bgColor})`);
        }, 10); // Pequeno delay para garantir que as variáveis CSS já foram aplicadas
    }

    return (
        <Button
            className="transition-none"
            variant="ghost"
            size="icon"
            onClick={toggleTheme} // Agora usa a função corrigida
        >
            <Moon className="text-md p-0 transition-none dark:hidden" />
            <Sun className="text-md p-0 hidden transition-none dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
