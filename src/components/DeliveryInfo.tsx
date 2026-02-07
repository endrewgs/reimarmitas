import { Truck, Clock, MapPin, Gift } from 'lucide-react';
import { FREE_DELIVERY_MINIMUM } from '@/data/products';

export const DeliveryInfo = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Entrega e Pagamento
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Atendemos Curitiba e Região Metropolitana (RMC) com entrega rápida e segura.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-0.5">
            <Clock className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h3 className="font-semibold text-lg mb-2">Entrega Rápida</h3>
            <p className="text-primary-foreground/80 text-sm">
              Em até 120 minutos ou ganhe um brinde!
            </p>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-0.5">
            <Truck className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h3 className="font-semibold text-lg mb-2">Frete Grátis</h3>
            <p className="text-primary-foreground/80 text-sm">
              Compras acima de R$ {FREE_DELIVERY_MINIMUM.toFixed(2)} para Curitiba
            </p>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-0.5">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h3 className="font-semibold text-lg mb-2">Área de Entrega</h3>
            <p className="text-primary-foreground/80 text-sm">
              Curitiba e Região Metropolitana (RMC)
            </p>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-0.5">
            <Gift className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h3 className="font-semibold text-lg mb-2">Brinde Garantido</h3>
            <p className="text-primary-foreground/80 text-sm">
              Se passar de 120min, você ganha um brinde!
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-primary-foreground/70 text-sm">
            *Consultar taxa de entrega para Curitiba e RMC
          </p>
        </div>
      </div>
    </section>
  );
};
