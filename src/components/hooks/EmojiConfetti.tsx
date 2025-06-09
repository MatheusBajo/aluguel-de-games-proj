// EmojiConfetti.jsx

const EmojiConfetti = ({ emoji, width, height }) => {
    // Gera peças de emoji com posições e tempos aleatórios
    const pieces = Array.from({ length: 20 }).map((_, i) => ({
        left: Math.random() * width,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
    }));

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width,
                height,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {pieces.map((piece, i) => (
                <span
                    key={i}
                    style={{
                        position: 'absolute',
                        left: piece.left,
                        animation: `fall ${piece.duration}s linear ${piece.delay}s infinite`,
                        fontSize: '24px',
                    }}
                >
          {emoji}
        </span>
            ))}
        </div>
    );
};

export default EmojiConfetti;
