import { ArrowDown, MessageSquarePlus } from 'lucide-react';
import heroImage from '@/assets/hero-marmita.jpg';
import logo from '@/assets/logo-rei-marmitas.jpeg';
import bannerHipertrofia from '@/assets/banner-hipertrofia.jpeg'; // Sua imagem 9:16
import { useWhatsAppBranch } from '@/context/WhatsAppBranchContext';

export const Hero = () => {
  const { openBranchDialog } = useWhatsAppBranch();
  
  return (
    <>
      {/* CAPA PRINCIPAL */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
        <style>{`
          @keyframes entranceUp {
            from { opacity: 0; transform: translateY(40px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          /* Animação Neon Pulsante Amarela */
          @keyframes neonPulse {
            0% { box-shadow: 0 0 10px rgba(250,204,21,0.5); }
            50% { box-shadow: 0 0 25px rgba(250,204,21,0.9); }
            100% { box-shadow: 0 0 10px rgba(250,204,21,0.5); }
          }
          .animate-entrance {
            animation: entranceUp 1s ease-out forwards;
            opacity: 0;
            animation-delay: 0.2s;
          }
          .animate-floating {
            animation: floating 4s ease-in-out infinite;
          }
          .animate-neon {
            animation: neonPulse 2s ease-in-out infinite;
          }
        `}</style>

        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
          <div className="max-w-4xl flex flex-col items-center text-center">
            
            <div className="mb-6 mt-8 animate-entrance">
              <img 
                src={logo} 
                alt="Rei das Marmitas Express"
                className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-full border-4 border-secondary shadow-2xl shadow-secondary/20 animate-floating" 
              />
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-2 animate-fade-in-up animation-delay-100">
              Melhores Marmitas
              <span className="block text-gradient-gold mt-1">Fitness de Curitiba</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 max-w-xl animate-fade-in-up animation-delay-200">
              Saúde e sabor na medida certa! Amor é o principal ingrediente da nossa cozinha ❤
            </p>

            {/* DESTAQUE NEON AMARELO para Combos e Observações */}
            <div className="mb-10 w-full max-w-lg bg-yellow-300 border-4 border-yellow-600 rounded-2xl p-5 animate-fade-in-up animation-delay-300 animate-neon text-center">
              <div className="flex flex-col items-center gap-2">
                <p className="text-black text-base md:text-lg font-extrabold flex items-center justify-center gap-2 uppercase tracking-tight">
                  <MessageSquarePlus className="w-6 h-6 text-black flex-shrink-0" />
                  Deseja combos ou observações?
                </p>
                <button
                  type="button"
                  onClick={() => openBranchDialog((num) => `https://wa.me/${num}?text=Olá! Gostaria de fazer um pedido com observações/combo personalizado.`)}
                  className="bg-black text-yellow-300 font-bold py-2 px-6 rounded-full hover:scale-105 transition-all text-sm uppercase tracking-wide mt-1"
                >
                  Chame agora no WhatsApp!
                </button>
              </div>
            </div>

            {/* BOTÕES PRINCIPAIS (Restaurado e com Flex-Wrap) */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 animate-fade-in-up animation-delay-400 justify-center w-full max-w-3xl">
              <a href="#cardapio" className="btn-secondary text-lg group flex items-center justify-center">
                Ver Cardápio
                <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </a>
              
              <button
                type="button"
                onClick={() => openBranchDialog((num) => `https://wa.me/${num}?text=Olá! Gostaria de fazer um pedido.`)}
                className="btn-whatsapp text-lg flex items-center justify-center"
              >
                Pedir pelo WhatsApp
              </button>

              <a href="#hipertrofia" className="bg-green-600 hover:bg-green-500 text-white shadow-lg text-lg flex items-center justify-center py-3 px-8 rounded-full font-bold transition-all hover:scale-105 w-full sm:w-auto">
                🔥 Promoção Hipertrofia
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO BANNER HIPERTROFIA */}
      <section id="hipertrofia" className="py-20 bg-white flex flex-col items-center justify-center px-4 relative z-10 border-t border-zinc-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
         <div className="max-w-4xl w-full flex flex-col items-center text-center">
             <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-8 tracking-wide">
               CONHEÇA A <span className="text-green-600">PROMOÇÃO HIPERTROFIA</span>
             </h2>
             
             <img 
                src={bannerHipertrofia} 
                alt="Promoção Hipertrofia" 
                className="w-full max-w-2xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] mb-10 border-2 border-zinc-50" 
             />
             
             <button
              type="button"
              onClick={() => openBranchDialog((num) => `https://wa.me/${num}?text=Olá! Quero aproveitar a Promoção Hipertrofia 💪`)}
              className="bg-green-600 hover:bg-green-500 text-white text-lg md:text-xl font-extrabold w-full md:w-auto px-12 py-5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:scale-105 flex items-center justify-center gap-3"
             >
                Pedir Kit Hipertrofia pelo WhatsApp
             </button>
         </div>
      </section>
    </>
  );
};