import { ArrowDown, Clock, Truck, Award } from 'lucide-react';
import heroImage from '@/assets/hero-marmita.jpg';
import logo from '@/assets/logo-rei-marmitas.jpeg';
import { useWhatsAppBranch } from '@/context/WhatsAppBranchContext';

export const Hero = () => {
  const { openBranchDialog } = useWhatsAppBranch();
  
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      <style>{`
        /* 1. Animação de Entrada (Carregamento da página) */
        @keyframes entranceUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* 2. Animação Contínua (Flutuação / Levitação) */
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); } /* Sobe levemente */
          100% { transform: translateY(0px); }
        }

        .animate-entrance {
          animation: entranceUp 1s ease-out forwards;
          opacity: 0; /* Começa invisível */
          animation-delay: 0.2s;
        }

        .animate-floating {
          /* Flutua infinitamente de forma suave */
          animation: floating 4s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-4xl flex flex-col items-center text-center">
          
          {/* ESTRUTURA DE ANIMAÇÃO DUPLA:
            1. A div externa (wrapper) controla a ENTRADA na tela.
            2. A imagem interna controla a FLUTUAÇÃO infinita.
            Isso garante que uma animação não cancele a outra.
          */}
          <div className="mb-8 mt-12 md:mt-16 animate-entrance">
            <img 
              src={logo} 
              alt="Rei das Marmitas Express"
              className="w-40 h-40 md:w-64 md:h-64 object-contain rounded-full 
                         border-4 border-secondary 
                         shadow-2xl shadow-secondary/20
                         animate-floating" 
            />
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-in-up animation-delay-100">
            Melhores Marmitas
            <span className="block text-gradient-gold mt-2">Fitness de Curitiba</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl animate-fade-in-up animation-delay-200">
            A melhor marmita de Curitiba 😋! Amor é o principal ingrediente da nossa cozinha ❤
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up animation-delay-300 justify-center w-full sm:w-auto">
            <a href="#cardapio" className="btn-secondary text-lg group flex items-center justify-center">
              Ver Cardápio Completo
              <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
            <button
              type="button"
              onClick={() => openBranchDialog((num) => `https://wa.me/${num}`)}
              className="btn-whatsapp text-lg flex items-center justify-center"
            >
              Pedir pelo WhatsApp
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up animation-delay-400 w-full">
            <div className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4 transition-transform duration-300 hover:scale-[1.02] text-left sm:justify-center">
              <Clock className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary-foreground text-sm">Entrega Rápida</p>
                <p className="text-primary-foreground/70 text-xs">Em até 120 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4 transition-transform duration-300 hover:scale-[1.02] text-left sm:justify-center">
              <Truck className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary-foreground text-sm">Frete Grátis</p>
                <p className="text-primary-foreground/70 text-xs">Curitiba +R$200</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4 transition-transform duration-300 hover:scale-[1.02] text-left sm:justify-center">
              <Award className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary-foreground text-sm">Kits 10 Refeições</p>
                <p className="text-primary-foreground/70 text-xs">Marmitas variadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <ArrowDown className="w-8 h-8 text-secondary" />
      </div>
    </section>
  );
};