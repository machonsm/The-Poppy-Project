import { sitePath } from "@/lib/site-path";

export const mapAssets = {
  pl: {
    pdf: sitePath("/mapa-polskiego-femtechu-2025.pdf"),
    poster: sitePath("/mapa-polskiego-femtechu-2025.png"),
    filename: "Mapa-Polskiego-Femtechu-2025.pdf",
  },
  en: {
    pdf: sitePath("/polish-femtech-map-2025.pdf"),
    poster: sitePath("/polish-femtech-map-2025.png"),
    filename: "Polish-Femtech-Map-2025.pdf",
  },
} as const;
