import React from "react";

interface Metadata {
    titulo: string;
    descricao?: string;
    imagens: string[];
}

function useCatalog(): Array<Metadata & { key: string }> {
    const modules = import.meta.glob("/Organizado/**/metadata.json", { eager: true }) as Record<string, any>;
    return Object.entries(modules).map(([path, mod]) => {
        const data: Metadata = mod.default ?? mod;
        const dir = path.replace(/\/metadata\.json$/, "");
        const imagens = (data.imagens || []).map((img) => {
            if (img.startsWith("http")) return img;
            return `${dir}/${img}`.replace(/^\/+/, "");
        });
        return { ...data, imagens, key: path };
    });
}

export default function Catalogo() {
    const itens = useCatalog();
    return (
        <main className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {itens.map((item) => (
                <div key={item.key} className="border rounded shadow-sm overflow-hidden">
                    {item.imagens[0] && (
                        <img
                            src={item.imagens[0]}
                            alt={item.titulo}
                            className="w-full h-48 object-cover"
                        />
                    )}
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{item.titulo}</h3>
                        {item.descricao && <p className="text-sm text-gray-700">{item.descricao}</p>}
                    </div>
                </div>
            ))}
        </main>
    );
}
