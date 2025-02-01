import React, { useEffect, useState } from 'react';

type GradientsOverlayProps = {
    newGradient: string;
    fadeDuration?: number;
};

export function GradientsOverlay({
                                     newGradient,
                                     fadeDuration = 600,
                                 }: GradientsOverlayProps) {
    const [currentGradient, setCurrentGradient] = useState<string>(newGradient);
    const [previousGradient, setPreviousGradient] = useState<string>('');
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    useEffect(() => {
        if (newGradient !== currentGradient) {
            console.log("GradientsOverlay: nova cor detectada", newGradient);
            setPreviousGradient(currentGradient);
            setCurrentGradient(newGradient);
            setIsTransitioning(true);

            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setPreviousGradient('');
            }, fadeDuration);

            return () => clearTimeout(timeout);
        }
    }, [newGradient, currentGradient, fadeDuration]);

    return (
        <div style={{ position: 'relative', width: 300, height: 300 }}>
            {/* gradiente antigo */}
            {previousGradient && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        filter: 'blur(30px)',
                        background: previousGradient,
                        transition: `opacity ${fadeDuration}ms ease`,
                        opacity: isTransitioning ? 1 : 0,
                    }}
                />
            )}
            {/* gradiente atual */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    filter: 'blur(30px)',
                    background: currentGradient,
                    transition: `opacity ${fadeDuration}ms ease`,
                    opacity: isTransitioning ? 0 : 1,
                }}
            />
        </div>
    );
}
