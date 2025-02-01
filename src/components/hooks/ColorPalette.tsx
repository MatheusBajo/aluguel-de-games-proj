import { usePalette } from 'color-thief-react';

function ColorPalette() {
    // URL da imagem (substitua por uma URL válida)
    const imageUrl = 'assets/maquinadeboxing.jpg';
    // Extraímos uma paleta com 5 cores no formato hexadecimal
    const { data, loading, error } = usePalette(imageUrl, 5, 'hex');

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao extrair a paleta</div>;

    return (
        <div>
            {data.map((color, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: color,
                        padding: '20px',
                        marginBottom: '10px',
                        color: '#fff',
                    }}
                >
                    Cor {index + 1}: {color}
                </div>
            ))}
        </div>
    );
}

export default ColorPalette;
