// src/types/colorthief.d.ts

declare module "colorthief" {
    export default class ColorThief {
        /**
         * Retorna uma cor dominante [r, g, b].
         * @param sourceImage Imagem DOM ou objeto Image() carregado
         * @param quality Qualidade da amostragem
         */
        getColor(sourceImage: HTMLImageElement, quality?: number): [number, number, number];

        /**
         * Retorna uma paleta de cores (padrão 10) no formato [r, g, b].
         * @param sourceImage Imagem DOM ou objeto Image() carregado
         * @param colorCount Quantidade de cores a extrair
         * @param quality Qualidade da amostragem
         */
        getPalette(
            sourceImage: HTMLImageElement,
            colorCount?: number,
            quality?: number
        ): [number, number, number][];
    }
}
