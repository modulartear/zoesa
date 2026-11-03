import scooter from "@/assets/p-scooter.jpg";
import enduro from "@/assets/p-enduro.jpg";
import naked from "@/assets/p-naked.jpg";
import cub from "@/assets/p-cub.jpg";
import heladera from "@/assets/p-heladera.jpg";
import lavarropas from "@/assets/p-lavarropas.jpg";
import tv from "@/assets/p-tv.jpg";
import aire from "@/assets/p-aire.jpg";
import cocina from "@/assets/p-cocina.jpg";
import microondas from "@/assets/p-microondas.jpg";

export type Product = {
  id: string;
  line: "motos" | "hogar";
  category: string;
  name: string;
  tagline: string;
  specs: string[];
  image: string;
  badge?: string;
};

/**
 * Catálogo de ejemplo: reemplazar por los modelos y fotos reales del local.
 * Los precios se consultan por WhatsApp (no se publican).
 */
export const PRODUCTS: Product[] = [
  {
    id: "scooter-125",
    line: "motos",
    category: "Scooter",
    name: "Scooter urbano 125 cc",
    tagline: "Automática, cómoda y económica para la ciudad.",
    specs: ["125 cc", "Automática", "Freno a disco"],
    image: scooter,
    badge: "Más vendida",
  },
  {
    id: "cub-110",
    line: "motos",
    category: "Cub / Ciclomotor",
    name: "Cub 110 cc",
    tagline: "La compañera de todos los días. Rinde y no falla.",
    specs: ["110 cc", "4 velocidades", "Bajo consumo"],
    image: cub,
  },
  {
    id: "naked-200",
    line: "motos",
    category: "Calle / Naked",
    name: "Naked 200 cc",
    tagline: "Diseño agresivo, buena potencia y look deportivo.",
    specs: ["200 cc", "5 velocidades", "Óptica LED"],
    image: naked,
    badge: "Nueva",
  },
  {
    id: "enduro-250",
    line: "motos",
    category: "Enduro / Cross",
    name: "Enduro 250 cc",
    tagline: "Para el campo, la tierra y la aventura.",
    specs: ["250 cc", "Suspensión larga", "Cubiertas taqueras"],
    image: enduro,
  },
  {
    id: "heladera-sbs",
    line: "hogar",
    category: "Heladeras",
    name: "Heladera Side by Side No Frost",
    tagline: "Gran capacidad y frío parejo para toda la familia.",
    specs: ["No Frost", "Acero inoxidable", "Bajo consumo"],
    image: heladera,
    badge: "Destacado",
  },
  {
    id: "lavarropas-carga-frontal",
    line: "hogar",
    category: "Lavado",
    name: "Lavarropas carga frontal",
    tagline: "Programas rápidos y cuidado de la ropa.",
    specs: ["Carga frontal", "Varios programas", "Eficiencia A"],
    image: lavarropas,
  },
  {
    id: "smart-tv",
    line: "hogar",
    category: "Tecnología",
    name: "Smart TV LED",
    tagline: "Tus series y el fútbol con imagen de cine.",
    specs: ["Smart", "Wi-Fi", "Varias pulgadas"],
    image: tv,
  },
  {
    id: "aire-split",
    line: "hogar",
    category: "Climatización",
    name: "Aire acondicionado split",
    tagline: "Frío / calor para pasar el verano y el invierno.",
    specs: ["Frío / Calor", "Silencioso", "Instalación a consultar"],
    image: aire,
  },
  {
    id: "cocina-4h",
    line: "hogar",
    category: "Cocina",
    name: "Cocina 4 hornallas",
    tagline: "Horno amplio y terminación en acero.",
    specs: ["Gas natural / envasado", "Horno con visor", "Acero"],
    image: cocina,
  },
  {
    id: "microondas",
    line: "hogar",
    category: "Cocina",
    name: "Microondas 20 L",
    tagline: "Práctico, compacto y fácil de usar.",
    specs: ["20 litros", "Perillas", "Descongelado"],
    image: microondas,
  },
];

export const byLine = (line: Product["line"]) => PRODUCTS.filter((p) => p.line === line);
