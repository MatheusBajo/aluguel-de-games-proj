import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ListItemProps {
    title: string;
    href: string;
    children?: React.ReactNode;
}

export function ListItem({ title, href, children }: ListItemProps) {
    return (
        <li>
            <Link
                to={href}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                    "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
            </Link>
        </li>
    );
}
