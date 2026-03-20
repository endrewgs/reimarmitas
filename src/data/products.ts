export type ProductCategory = "tradicional" | "lowcarb" | "kit" | "hipertrofia";
export type WeightOption = "300g";

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
  // Tradicionais com Legumes
  {
    id: 20,
    name: "Carne moída, arroz, feijão e legumes",
    description: "Carne moída completa com legumes (cenoura, abobrinha, brócolis)",
    category: "tradicional",
    basePrice: 11.70,
    weight: "300g",
    hasIntegralRice: true,
    image: "/produtos/20.png",
  },
  {
    id: 21,
    name: "Patinho desfiado, arroz, feijão e legumes",
    description: "Patinho com arroz, feijão e legumes",
    category: "tradicional",
    basePrice: 11.70,
    weight: "300g",
    hasIntegralRice: true,
    image: "/produtos/21.png",
  },
  {
    id: 22,
    name: "Patinho grelhado acebolado, arroz, feijão e legumes",
    description: "Patinho acebolado completo",
    category: "tradicional",
    basePrice: 11.70,
    weight: "300g",
    hasIntegralRice: true,
    image: "/produtos/22.png",
  },
  {
    id: 23,
    name: "Carne de panela c/ mandioca, arroz e legumes",
    description: "Carne de panela com mandioca e legumes",
    category: "tradicional",
    basePrice: 11.70,
    weight: "300g",
    hasIntegralRice: true,
    image: "/produtos/23.png",
  },
  {
    id: 25,
    name: "Frango grelhado, arroz, feijão e legumes",
    description: "Frango grelhado completo com legumes",
    category: "tradicional",
    basePrice: 11.70,
    weight: "300g",
    hasIntegralRice: true,
    image: "/produtos/25.png",
  },

  // Low Carb (Apenas Legumes)
  {
    id: 33,
    name: "Carne desfiada, mix de legumes",
    description: "Low carb: Carne desfiada com cenoura, abobrinha e brócolis",
    category: "lowcarb",
    basePrice: 11.70,
    weight: "300g",
    image: "/produtos/33.png",
  },
  {
    id: 34,
    name: "Carne moída, feijão e legumes",
    description: "Low carb: Carne moída sem arroz",
    category: "lowcarb",
    basePrice: 11.70,
    weight: "300g",
    image: "/produtos/34.png",
  },
  {
    id: 35,
    name: "Frango desfiado, feijão e legumes",
    description: "Low carb: Frango desfiado sem arroz",
    category: "lowcarb",
    basePrice: 11.70,
    weight: "300g",
    image: "/produtos/35.png",
  },
  {
    id: 36,
    name: "Frango grelhado com legumes",
    description: "Low carb: Peito de frango grelhado com mix de legumes",
    category: "lowcarb",
    basePrice: 11.70,
    weight: "300g",
    image: "/produtos/36.png",
  },
];

// Mantemos o multiplicador apenas para 300g para não quebrar a lógica do carrinho
export const weightMultipliers: Record<WeightOption, { label: string; multiplier: number }> = {
  "300g": { label: "300g", multiplier: 1 },
};

export const WHATSAPP_NUMBER = "5541999851704";

export const BRANCHES_WHATSAPP = [
  { name: "Matriz Curitiba", whatsappNumber: "5541999851704" },
  { name: "Unidade Fazenda Rio Grande", whatsappNumber: "5541997030071" },
] as const;

export const INSTAGRAM_USERNAME = "marmitas.congelada.curitiba";
export const INSTAGRAM_URL = "https://www.instagram.com/marmitas.congelada.curitiba/";
export const WEBSITE_URL = "https://www.reidasmarmitascongeladas.com/";
export const EMAIL = "reidasmarmitasm@gmail.com";
export const PIX_KEY = "reidasmarmitasm@gmail.com";

export const FREE_DELIVERY_MINIMUM = 200;
export const MIN_KIT_QUANTITY = 10;
