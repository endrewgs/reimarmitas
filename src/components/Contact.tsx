import { Instagram, Globe, Mail, Phone } from "lucide-react";
import { INSTAGRAM_URL, WEBSITE_URL, EMAIL } from "@/data/products";
import logo from "@/assets/logo-rei-marmitas.jpeg";

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: INSTAGRAM_URL,
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500",
  },
  {
    icon: Globe,
    label: "Website",
    href: WEBSITE_URL,
    color: "hover:bg-primary",
  },
  {
    icon: Mail,
    label: "E-mail",
    href: `mailto:${EMAIL}`,
    color: "hover:bg-blue-500",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    href: "https://wa.me/554199851704",
    color: "hover:bg-whatsapp",
  },
];

export const Contact = () => {
  return (
    <section id="contato" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img src={logo} alt="Rei das Marmitas Express" className="w-24 h-24 mx-auto rounded-full shadow-lg mb-6" />

          <h2 className="section-title mb-4">
            Fale <span className="text-primary">Conosco</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Estamos aqui para atender você! Entre em contato por qualquer um dos nossos canais.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-4 bg-muted rounded-xl transition-all duration-300 ${link.color} hover:text-white group`}
              >
                <link.icon className="w-6 h-6" />
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="bg-muted rounded-2xl p-6">
            <p className="text-muted-foreground mb-2">E-mail para contato:</p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
