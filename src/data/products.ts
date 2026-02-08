export type ProductCategory = "tradicional" | "lowcarb" | "kit";
export type WeightOption = "350g" | "400g" | "500g";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  basePrice: number;
  weight: WeightOption;
  hasIntegralRice?: boolean;
  isKit?: boolean;
  kitMinQuantity?: number;
  image?: string;
}

export const products: Product[] = [
  // Tradicionais - R$ 9,90 (350g)
  {
    id: 1,
    name: "Carne moída e arroz",
    description: "Carne moída com arroz branco",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/1.png",
  },
  {
    id: 2,
    name: "Carne moída, feijão e arroz",
    description: "Carne moída com feijão e arroz",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/2.png",
  },
  {
    id: 3,
    name: "Frango desfiado e arroz",
    description: "Frango desfiado com arroz branco",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/3.png",
  },
  {
    id: 4,
    name: "Frango desfiado, feijão e arroz",
    description: "Frango desfiado com feijão e arroz",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/4.png",
  },
  {
    id: 5,
    name: "Frango grelhado e arroz",
    description: "Filé de frango grelhado com arroz",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/5.png",
  },
  {
    id: 6,
    name: "Frango grelhado, feijão e arroz",
    description: "Filé de frango grelhado com feijão e arroz",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/6.png",
  },
  {
    id: 7,
    name: "Patinho desfiado acebolado, arroz e feijão",
    description: "Patinho acebolado com arroz e feijão",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/7.png",
  },
  {
    id: 8,
    name: "Patinho desfiado e arroz",
    description: "Patinho desfiado com arroz branco",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/8.png",
  },
  {
    id: 9,
    name: "Risoto de frango cremoso",
    description: "Risoto cremoso de frango",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/9.png",
  },
  {
    id: 10,
    name: "Risoto cremoso de patinho desfiado",
    description: "Risoto cremoso com patinho desfiado",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/10.png",
  },
  {
    id: 11,
    name: "Risoto de alho poró",
    description: "Risoto cremoso de alho poró",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/11.png",
  },
  {
    id: 12,
    name: "Escondidinho de carne moída",
    description: "Escondidinho com carne moída",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/12.png",
  },
  {
    id: 13,
    name: "Escondidinho de frango desfiado c/ requeijão",
    description: "Escondidinho de frango com requeijão",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/13.png",
  },
  {
    id: 14,
    name: "Escondidinho de iscas de frango grelhado",
    description: "Escondidinho com iscas de frango",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/14.png",
  },
  {
    id: 15,
    name: "Escondidinho de Mignon suíno desfiado",
    description: "Escondidinho com mignon suíno",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/15.png",
  },
  {
    id: 16,
    name: "Espaguete à bolonhesa",
    description: "Espaguete com molho bolonhesa",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/16.png",
  },
  {
    id: 17,
    name: "Espaguete de frango cremoso",
    description: "Espaguete cremoso de frango",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/17.png",
  },
  {
    id: 18,
    name: "Espaguete com almôndegas ao sugo",
    description: "Espaguete com almôndegas",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/18.png",
  },
  {
    id: 19,
    name: "Espaguete ao sugo com parmesão",
    description: "Espaguete ao sugo gratinado",
    category: "tradicional",
    basePrice: 9.9,
    weight: "350g",
    image: "/produtos/19.png",
  },

  // Tradicionais com legumes - R$ 10,90 (350g)
  {
    id: 20,
    name: "Carne moída, arroz, feijão e legumes",
    description: "Carne moída completa com legumes (cenoura, abobrinha, brócolis)",
    category: "tradicional",
    basePrice: 10.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/20.png",
  },
  {
    id: 21,
    name: "Patinho desfiado, arroz, feijão e legumes",
    description: "Patinho com arroz, feijão e legumes",
    category: "tradicional",
    basePrice: 10.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/21.png",
  },
  {
    id: 22,
    name: "Patinho grelhado acebolado, arroz, feijão e legumes",
    description: "Patinho acebolado completo",
    category: "tradicional",
    basePrice: 10.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/22.png",
  },
  {
    id: 23,
    name: "Carne de panela c/ mandioca, arroz e legumes",
    description: "Carne de panela com mandioca",
    category: "tradicional",
    basePrice: 10.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/23.png",
  },
  {
    id: 24,
    name: "Frango grelhado, arroz e creme de milho",
    description: "Frango com creme de milho",
    category: "tradicional",
    basePrice: 10.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/24.png",
  },
  {
    id: 25,
    name: "Frango grelhado, arroz, feijão e legumes",
    description: "Frango grelhado completo",
    category: "tradicional",
    basePrice: 10.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/25.png",
  },
  {
    id: 26,
    name: "Frango ao molho, arroz e purê de batata",
    description: "Frango ao molho com purê",
    category: "tradicional",
    basePrice: 10.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/26.png",
  },

  // Premium - R$ 12,90 (350g)
  {
    id: 27,
    name: "Carne moída, arroz, feijão e legumes Premium",
    description: "Versão premium com legumes frescos",
    category: "tradicional",
    basePrice: 12.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/27.png",
  },
  {
    id: 28,
    name: "Patinho desfiado, arroz, feijão e legumes Premium",
    description: "Patinho premium completo",
    category: "tradicional",
    basePrice: 12.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/28.png",
  },
  {
    id: 29,
    name: "Estrogonoff de frango, arroz com batata assada",
    description: "Estrogonoff de frango cremoso",
    category: "tradicional",
    basePrice: 14.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/29.png",
  },
  {
    id: 30,
    name: "Estrogonoff de carne com arroz",
    description: "Estrogonoff de carne cremoso",
    category: "tradicional",
    basePrice: 14.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/30.png",
  },
  {
    id: 31,
    name: "Frango à parmegiana, arroz com batata assada",
    description: "Frango à parmegiana completo",
    category: "tradicional",
    basePrice: 14.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/31.png",
  },
  {
    id: 32,
    name: "Frango à milanesa, arroz e feijão",
    description: "Frango empanado com arroz e feijão",
    category: "tradicional",
    basePrice: 14.9,
    weight: "350g",
    hasIntegralRice: true,
    image: "/produtos/32.png",
  },

  // Low Carb - R$ 12,90 (350g)
  {
    id: 33,
    name: "Carne desfiada, mix de legumes",
    description: "Low carb: Carne desfiada com cenoura, abobrinha e brócolis",
    category: "lowcarb",
    basePrice: 12.9,
    weight: "350g",
    image: "/produtos/33.png",
  },
  {
    id: 34,
    name: "Carne moída, feijão e legumes",
    description: "Low carb: Carne moída sem arroz",
    category: "lowcarb",
    basePrice: 12.9,
    weight: "350g",
    image: "/produtos/34.png",
  },
  {
    id: 35,
    name: "Frango desfiado, feijão e legumes",
    description: "Low carb: Frango desfiado sem arroz",
    category: "lowcarb",
    basePrice: 12.9,
    weight: "350g",
    image: "/produtos/35.png",
  },
  {
    id: 36,
    name: "Frango grelhado com legumes",
    description: "Low carb: Peito de frango grelhado com mix de legumes",
    category: "lowcarb",
    basePrice: 12.9,
    weight: "350g",
    image: "/produtos/36.png",
  },
];

export const weightMultipliers: Record<WeightOption, { label: string; multiplier: number }> = {
  "350g": { label: "350g", multiplier: 1 },
  "400g": { label: "400g (+20%)", multiplier: 1.2 },
  "500g": { label: "500g (+25%)", multiplier: 1.25 },
};

export const WHATSAPP_NUMBER = "5541999851704";

/** Unidades para escolha no WhatsApp (pedido / contato) */
export const BRANCHES_WHATSAPP = [
  { name: "Matriz Curitiba", whatsappNumber: "5541999851704" },
  { name: "Unidade Fazenda Rio Grande", whatsappNumber: "5541997030071" },
] as const;

export const INSTAGRAM_URL = "https://www.instagram.com/marmitas.congelada.curitiba?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
export const WEBSITE_URL = "https://www.reidasmarmitascongeladas.com/";
export const EMAIL = "reidasmarmitasm@gmail.com";
export const PIX_KEY = "reidasmarmitasm@gmail.com";

export const FREE_DELIVERY_MINIMUM = 200;
export const MIN_KIT_QUANTITY = 10;
