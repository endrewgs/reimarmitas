import { ArrowDown, Clock, Truck, Award } from 'lucide-react';
import heroImage from '@/assets/hero-marmita.jpg';
import logo from '@/assets/logo-rei-marmitas.jpeg';
export const Hero = () => {
  return <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Logo Badge */}
          <div className="mb-6 animate-float">
            <img src={logo} alt="Rei das Marmitas Express" className="w-24 h-24 mt-10 md:mt-0 md:w-40 md:h-40 object-contain rounded-full shadow-glow border-4 border-secondary" />
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4">
            Marmitas Congeladas
            <span className="block text-gradient-gold">de Qualidade Absoluta</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl">A melhor marmita de curitiba 😋! Amor é o principal ingrediente da nossa cozinha ❤</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#cardapio" className="btn-secondary text-lg group">
              Ver Cardápio Completo
              <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
            <a href="https://wa.me/554199851704" target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg">
              Pedir pelo WhatsApp
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4">
              <Clock className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary-foreground text-sm">Entrega Rápida</p>
                <p className="text-primary-foreground/70 text-xs">Em até 120 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4">
              <Truck className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary-foreground text-sm">Frete Grátis</p>
                <p className="text-primary-foreground/70 text-xs">Curitiba +R$200</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/10 backdrop-blur-sm rounded-xl p-4">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-secondary" />
      </div>
    </section>;
};