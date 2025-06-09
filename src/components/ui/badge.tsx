// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const badgeVariants = cva(
    "inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        // -------- eixo principal --------
        variants: {
            variant: {
                default:      "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                secondary:    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:  "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline:      "border-input bg-background text-foreground",
                tag:          "text-[6pt] px-2 rounded-full font-bold",
            },

            // -------- eixo de cor extra --------
            color: {
                default: "",
                green: "bg-black/20 hover:bg-green-500/30 border-green-500/50 text-white",
                red: "bg-black/20 hover:bg-red-500/30 border-red-500 text-white",
                danger:  "bg-red-500   border-red-500  text-white",
                info:    "bg-sky-500   border-sky-500  text-white",
            },
        },

        defaultVariants: {
            variant: "default",
            color:   "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, color, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, color }), className)} {...props} />
    )
}
