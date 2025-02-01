// src/hooks/useAllPalettes.tsx
import { useState, useEffect } from 'react';
import ColorThief from 'colorthief'; // se preferir usar a lib "color-thief" pura

// Ou você pode manter color-thief-react, mas o mais comum é usar a "pura"
// para iterar manualmente as imagens.

export function useAllPalettes(imageUrls: string[], colorCount = 5) {
    const [palettes, setPalettes] = useState<string[][]>([]); // array de arrays de cores em HEX
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        async function fetchPalettes() {
            try {
                const colorThief = new ColorThief();

                // Precisamos carregar as imagens para extrair as cores.
                // Para cada URL, criaremos um Image e esperaremos o "onload".
                const results: string[][] = [];

                for (const url of imageUrls) {
                    // Carrega a imagem
                    const img = await loadImage(url);
                    // Pega a paleta no formato RGB
                    const paletteRGB = colorThief.getPalette(img, colorCount);

                    // Converte de RGB para HEX
                    const paletteHex = paletteRGB.map(rgbToHex);
                    results.push(paletteHex);
                }

                setPalettes(results);
            } catch (err: any) {
                setError(err.message || 'Erro ao extrair paletas');
            } finally {
                setLoading(false);
            }
        }

        fetchPalettes();
    }, [imageUrls, colorCount]);

    return { palettes, loading, error };
}

// Função auxiliar para carregar imagem
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // se precisar
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

// Converte de [r,g,b] para "#rrggbb"
function rgbToHex([r, g, b]: number[]): string {
    return '#' + [r, g, b]
        .map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');
}
