import { usePalette } from 'color-thief-react';
import { useCarousel } from './carousel'; // ajuste o path se necessário
import { useTheme } from '../theme-provider.tsx'; // ajuste o path conforme sua estrutura

type CarouselOverlayProps = {
    images: string[];
};

export function CarouselOverlay({ images }: CarouselOverlayProps) {
    // Pega o índice do slide atual do contexto do Carousel
    const { selectedIndex } = useCarousel();
    const currentImageUrl = images[selectedIndex];

    // Extrai até 5 cores em formato 'hex'
    const { data: palette, loading, error } = usePalette(currentImageUrl, 5, 'hex');

    // Acessa o tema atual via seu ThemeProvider
    const { theme } = useTheme();

    if (loading || error || !palette) {
        return null;
    }

    // Monta os stops do gradiente a partir das cores
    const stops = palette
        .map((color, i) => {
            const pos = Math.round((i / (palette.length - 1)) * 100);
            return `${color} ${pos}%`;
        })
        .join(', ');

    // Valores dinâmicos para blur e opacidade conforme o tema
    const blurValue = theme === 'dark' ? '120px' : '50px';
    const opacityValue = theme === 'dark' ? '0.8' : '0.5';
    const transformValue = theme === 'dark' ? '1.05' : '1.15';

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    opacity: opacityValue,
                    inset: 0, // Ocupa todo o container
                    zIndex: 0, // Fica atrás do Carousel
                    filter: `blur(${blurValue})`,
                    background: `linear-gradient(45deg, ${stops})`,
                    backgroundSize: '200% 200%',
                    animation: 'gradientLoop 10s ease-in-out infinite',
                    transition: 'all 1s ease',
                    transform: 'scale(1.05)',
                }}
            />
            <style jsx>{`
                @keyframes gradientLoop {
                    0% {
                        background: linear-gradient(45deg, ${stops});
                    }
                    50% {
                        background: linear-gradient(-45deg, ${stops});
                    }
                    100% {
                        background: linear-gradient(45deg, ${stops});
                    }
                }
            `}</style>
        </>
    );
}
