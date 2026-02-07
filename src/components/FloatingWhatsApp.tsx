import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/554199851704"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full
                 shadow-elevated hover:shadow-2xl hover:scale-110 transition-all duration-300
                 animate-pulse-gentle"
      aria-label="Pedir pelo WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
};
