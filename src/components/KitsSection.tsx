import { Package, Check, AlertCircle } from 'lucide-react';
import kitImage from '@/assets/kit-marmitas.jpg';

export const KitsSection = () => {
  return (
    <section id="kits" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={kitImage}
                alt="Kit 10 Refeições Congeladas"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-2xl p-4 shadow-lg rotate-6">
              <p className="font-display text-2xl font-bold">10</p>
              <p className="text-xs font-semibold">Refeições</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-10 h-10 text-primary" />
              <h2 className="section-title text-2xl md:text-3xl">
                Kits 10 Refeições <span className="text-primary">Congeladas</span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mb-6">
              Monte seu kit com as marmitas que você preferir! 
              Ideal para quem quer praticidade e economia na semana.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Escolha entre todas as opções do cardápio</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Mix de marmitas tradicionais e low carb</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Escolha os tamanhos: 350g, 400g ou 500g</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Opção com arroz integral disponível</span>
              </li>
            </ul>

            {/* Alert */}
            <div className="flex items-start gap-3 bg-secondary/20 border border-secondary rounded-xl p-4 mb-8">
              <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Pedido mínimo de 10 marmitas para kits</p>
                <p className="text-sm text-muted-foreground">
                  Você pode escolher qualquer combinação de marmitas variadas
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#cardapio"
              className="btn-primary inline-flex items-center gap-2 text-lg"
            >
              <Package className="w-5 h-5" />
              Montar Meu Kit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
