import { ClipboardList, MessageCircle, CreditCard, Truck } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Escolha suas Marmitas',
    description: 'Navegue pelo cardápio e selecione as marmitas que deseja. Escolha os tamanhos e adicione ao pedido.',
  },
  {
    icon: MessageCircle,
    title: 'Envie pelo WhatsApp',
    description: 'Clique em "Pedir pelo WhatsApp" para enviar seu pedido completo com a mensagem formatada.',
  },
  {
    icon: CreditCard,
    title: 'Pague via PIX',
    description: 'Realize o pagamento via PIX usando a chave informada. Envie o comprovante no WhatsApp.',
  },
  {
    icon: Truck,
    title: 'Receba em Casa',
    description: 'Aguarde sua entrega em até 120 minutos. Se passar, você ganha um brinde!',
  },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 bg-warm-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Como <span className="text-primary">Funciona</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fazer seu pedido é simples e rápido. Siga os passos abaixo:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 relative z-10">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-secondary/40 group-hover:scale-110 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PIX Info */}
        <div className="mt-12 bg-card rounded-2xl p-8 shadow-card max-w-2xl mx-auto text-center">
          <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            Pagamento via PIX
          </h3>
          <p className="text-muted-foreground mb-4">
            Faça seu pagamento de forma rápida e segura usando o PIX:
          </p>
          <div className="bg-muted rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Chave PIX (E-mail):</p>
            <p className="font-mono font-semibold text-lg text-foreground break-all">
              reidasmarmitasm@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
