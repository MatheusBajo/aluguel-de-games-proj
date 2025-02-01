import { usePalette } from 'color-thief-react';

// @ts-ignore
export function DynamicGradient({ imageUrl , opacity }) {
    const { data: palette, loading, error } = usePalette(imageUrl, 5, 'hex');
    if (loading || error || !palette) return null;

    const stops = palette
        .map((color, i) => {
            const pos = Math.round((i / (palette.length - 1)) * 100);
            return `${color} ${pos}%`;
        })
        .join(', ');

    const gradient = `radial-gradient(circle at 50% 100%, ${stops})`;

    return (
        <div
            style={{
                position: 'absolute',
                opacity: opacity,
                inset: 0,
                zIndex: -1,
                filter: 'blur(50px)',
                background: gradient,
                transition: 'all 1s ease',

            }}
        />
    );
}
