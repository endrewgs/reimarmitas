import { Instagram, Globe, Mail, Phone, MapPin, Clock } from "lucide-react";
import { INSTAGRAM_URL, WEBSITE_URL, EMAIL } from "@/data/products";
import { useWhatsAppBranch } from "@/context/WhatsAppBranchContext";
import logo from "@/assets/logo-rei-marmitas.jpeg";

const branches = [
  {
    name: "Matriz Curitiba",
    address: "Rua Professor Fábio De Sousa, 2346 - Portão",
    whatsapp: "41 99985-1704",
    whatsappLink: "https://wa.me/554199851704",
    hours: [
      "Seg a Sex: 09:00 às 20:00",
      "Sábados: 09:00 às 15:00",
      "Domingos: Fechada",
    ],
  },
  {
    name: "Unidade Fazenda Rio Grande",
    address: "Rua de Exemplo, 123 - BairroX",
    whatsapp: "41 99703-0071",
    whatsappLink: "https://wa.me/5541997030071",
    hours: [
      "Seg a Sex: 09:00 às 20:00",
      "Sábados: 09:00 às 15:00",
      "Domingos: Fechada",
    ],
  },
];

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
    isWhatsApp: true,
    color: "hover:bg-whatsapp",
  },
];

export const Contact = () => {
  const { openBranchDialog } = useWhatsAppBranch();
  return (
    <section id="contato" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <img src={logo} alt="Rei das Marmitas Express" className="w-24 h-24 mx-auto rounded-full shadow-lg mb-6 transition-transform duration-300 hover:scale-105" />

          <h2 className="section-title mb-4">
            Fale <span className="text-primary">Conosco</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Estamos aqui para atender você! Entre em contato por qualquer um dos nossos canais.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {socialLinks.map((link) =>
              "isWhatsApp" in link && link.isWhatsApp ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => openBranchDialog((num) => `https://wa.me/${num}`)}
                  className={`flex items-center gap-3 px-6 py-4 bg-muted rounded-xl transition-all duration-300 ${link.color} hover:text-white group`}
                >
                  <link.icon className="w-6 h-6" />
                  <span className="font-medium">{link.label}</span>
                </button>
              ) : (
                <a
                  key={link.label}
                  href={"href" in link ? link.href : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-6 py-4 bg-muted rounded-xl transition-all duration-300 ${link.color} hover:text-white group`}
                >
                  <link.icon className="w-6 h-6" />
                  <span className="font-medium">{link.label}</span>
                </a>
              )
            )}
          </div>

          {/* Contact Info */}
          <div className="bg-muted rounded-2xl p-6 mb-10">
            <p className="text-muted-foreground mb-2">E-mail para contato:</p>
            <a
              href={`mailto:${EMAIL}`}
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              {EMAIL}
            </a>
          </div>

          {/* Unidades */}
          <h3 className="text-lg font-semibold text-foreground mb-6">Nossas unidades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="bg-muted rounded-2xl p-6 text-left border border-border/50 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <h4 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 rounded-full bg-primary" />
                  {branch.name}
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-sm">Endereço</p>
                      <p className="font-medium text-foreground">{branch.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-sm">WhatsApp</p>
                      <a
                        href={branch.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {branch.whatsapp}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Funcionamento</p>
                      <ul className="text-foreground text-sm space-y-0.5">
                        {branch.hours.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
