import { Instagram, Globe, Mail, Phone, Heart } from "lucide-react";
import { INSTAGRAM_URL, WEBSITE_URL, EMAIL } from "@/data/products";
import logo from "@/assets/logo-rei-marmitas.jpeg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <img src={logo} alt="Rei das Marmitas Express" className="w-20 h-20 rounded-full shadow-lg mb-6" />

          {/* Tagline */}
          <p className="text-primary-foreground/80 mb-6 max-w-md">
            Marmitas congeladas de qualidade absoluta.
            <br />
            <strong>Entregas em até 120 minutos ou ganhe um brinde!</strong>
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              aria-label="E-mail"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/554199851704"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-foreground/10 rounded-full hover:bg-whatsapp/80 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-foreground/10 pt-6 w-full">
            <p className="text-sm text-primary-foreground/60 flex items-center justify-center gap-1">
              © {currentYear} Rei das Marmitas Express. Feito com
              <Heart className="w-4 h-4 text-primary inline" fill="currentColor" />
              em Curitiba
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
