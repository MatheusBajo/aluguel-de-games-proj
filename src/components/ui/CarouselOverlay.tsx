import { useEffect, useState } from 'react';
import { useCarousel } from './carousel-landing.tsx'; // ajuste o path se necessário
import { useTheme } from '../theme-provider.tsx'; // ajuste o path conforme sua estrutura

type CarouselOverlayProps = {
    images: string[];
};

export function CarouselOverlay({ images }: CarouselOverlayProps) {
    const { selectedIndex } = useCarousel();
    const { theme } = useTheme();

    // Estado para armazenar a URL da imagem atual
    const [backgroundUrl, setBackgroundUrl] = useState('');

    // Atualiza a URL sempre que o índice ou as imagens mudarem
    useEffect(() => {
        setBackgroundUrl(images[selectedIndex]);
    }, [selectedIndex, images]);

    // Valores dinâmicos para blur, opacidade e escala conforme o tema
    const blurValue = theme === 'dark' ? '80px' : '60px';
    const opacityValue = theme === 'dark' ? '1' : '1';
    const transformValue = theme === 'dark' ? '1' : '1';
    const brightnessValue = theme === 'dark' ? '1' : '1.5';
    const saturationValue = theme === 'dark' ? '1.5' : '2';

    return (
        <div  className="pointer-events-none select-none"
            style={{
                position: 'absolute',
                inset: 0, // Ocupa todo o container
                zIndex: 0, // Fica atrás do conteúdo do CarouselLanding
                backgroundImage: `url("${backgroundUrl}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: `blur(${blurValue}) brightness(${brightnessValue}) saturate(${saturationValue})`,
                opacity: opacityValue,
                transform: `scale(${transformValue})`,
            }}
        />
    );
}
