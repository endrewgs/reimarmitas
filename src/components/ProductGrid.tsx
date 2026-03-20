import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export const ProductGrid = () => {
  const [filter, setFilter] = useState("tradicional");

  const filteredProducts = products.filter((p) => p.category === filter);

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Título Atualizado (Sem o a partir de 9,90) */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Todas as nossas opções por apenas <span className="font-bold text-primary">R$ 11,70</span>. Escolha a sua linha preferida abaixo:
          </p>
        </div>

        {/* Filtro de Categorias (Opções de Peso Removidas) */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setFilter("tradicional")}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${
              filter === "tradicional"
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-muted text-muted-foreground hover:bg-secondary/50"
            }`}
          >
            Linha Tradicional
          </button>
          <button
            onClick={() => setFilter("lowcarb")}
            className={`px-6 py-2.5 rounded-full font-bold transition-all ${
              filter === "lowcarb"
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-muted text-muted-foreground hover:bg-green-500/20"
            }`}
          >
            Linha Low Carb
          </button>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
