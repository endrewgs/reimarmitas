import { useState, useMemo } from 'react';
import { products, ProductCategory } from '@/data/products';
import { ProductCard } from './ProductCard';

type FilterOption = 'all' | ProductCategory;

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'tradicional', label: 'Tradicionais' },
  { value: 'lowcarb', label: 'Low Carb' },
];

export const ProductGrid = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="cardapio" className="py-16 bg-warm-gradient">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="section-title">
            <span className="text-primary">Cardápio</span> Completo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monte sua marmita personalizada conforme seu plano alimentar. 
            Escolha entre nossas opções tradicionais e low carb.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`category-badge ${
                activeFilter === option.value
                  ? 'category-badge-active'
                  : 'category-badge-inactive'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Price Info */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="bg-card rounded-xl px-6 py-3 shadow-card flex items-center gap-3">
            <span className="text-3xl">📌</span>
            <div>
              <p className="text-sm text-muted-foreground">A partir de</p>
              <p className="font-bold text-xl text-primary">R$ 9,90</p>
              <p className="text-xs text-muted-foreground">unidade 350g</p>
            </div>
          </div>
          <div className="bg-card rounded-xl px-6 py-3 shadow-card flex items-center gap-3">
            <span className="text-3xl">🍽️</span>
            <div>
              <p className="text-sm text-muted-foreground">Marmita 400g</p>
              <p className="font-bold text-lg text-foreground">+20% no valor</p>
            </div>
          </div>
          <div className="bg-card rounded-xl px-6 py-3 shadow-card flex items-center gap-3">
            <span className="text-3xl">🥗</span>
            <div>
              <p className="text-sm text-muted-foreground">Marmita 500g</p>
              <p className="font-bold text-lg text-foreground">+25% no valor</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Legumes Info */}
        <div className="mt-10 bg-card rounded-2xl p-6 shadow-card text-center max-w-2xl mx-auto">
          <p className="text-foreground">
            <strong>Legumes inclusos:</strong> Cenoura / Abobrinha / Brócolis
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            *(Opção com arroz integral disponível nas marmitas indicadas)
          </p>
        </div>
      </div>
    </section>
  );
};
