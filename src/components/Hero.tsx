import { ArrowDown, Clock, Truck, Award } from 'lucide-react';
import heroImage from '@/assets/hero-marmita.jpg';
import logo from '@/assets/logo-rei-marmitas.jpeg';
import { useWhatsAppBranch } from '@/context/WhatsAppBranchContext';

export const Hero = () => {
  const { openBranchDialog } = useWhatsAppBranch();
  
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/80" />
      </div>

      {/* Main Container - Agora centralizado com Flexbox */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        
        {/* Wrapper de Conteúdo - Centralizado e com texto alinhado ao centro */}
        <div className="max-w-4xl flex flex-col items-center text-center">
          
          {/* Logo Badge - Centralizada e Piscando */}
          <div className="mb-8 animate-fade-in-up">
            <img 
              src={logo} 
              alt="Rei das Marmitas Express"
              style={{ animationDuration: '2s' }}
              className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-full 
                         border-4 border-secondary 
                         drop-shadow-[0_0_20px_rgba(255,193,7,0.6)] /* Glow Dourado */
                         animate-pulse /* Efeito de piscar lento */
                         transition-transform duration-300 hover:scale-105" 
            />
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-in-up animation-delay-100">
            Marmitas Fitness
            <span className="block text-gradient-gold mt-2">de Qualidade Absoluta</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl animate-fade-in-up animation-delay-200">
            A melhor marmita de Curitiba 😋! Amor é o principal ingrediente da nossa cozinha ❤
          </p>

          {/* CTA Buttons - Centralizados */}
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

          {/* Features - Grid */}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <ArrowDown className="w-8 h-8 text-secondary" />
      </div>
    </section>
  );
};