import { useState } from "react";
import { Menu, X, ShoppingCart, Phone, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWhatsAppBranch } from "@/context/WhatsAppBranchContext";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo-rei-marmitas.jpeg";
import { BackgroundMusic } from "./BackgroundMusic";

const navLinks = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#kits", label: "Kits" },
  { href: "#lowcarb", label: "Low Carb" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#contato", label: "Contato" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, profile, signOut, loading } = useAuth();
  const { openBranchDialog } = useWhatsAppBranch();

  const handlePedirWhatsApp = () => openBranchDialog((num) => `https://wa.me/${num}`);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm shadow-card">
        {/* Promo Banner */}
        <div className="promo-banner text-sm md:text-base">
          <span className="inline-block transition-transform duration-300 hover:scale-110">🎁</span> Entregas em até 120 minutos ou ganhe um brinde!{" "}
          <span className="inline-block transition-transform duration-300 hover:scale-110">🎁</span>
        </div>

        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Mobile Ajustada */}
            <a href="#" className="flex items-center transition-transform duration-300 hover:scale-105 active:scale-100">
              <img
                src={logo}
                alt="Rei das Marmitas Express"
                // AJUSTE FINAL: Reduzi para 'h-10' no mobile e removi margens extras. 
                // Isso centraliza ela perfeitamente sem cortar.
                className="h-10 sm:h-14 w-auto object-contain rounded-full shadow-lg bg-white p-0.5"
              />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <BackgroundMusic />
              {/* Auth Button - Desktop */}
              {!loading &&
                (user ? (
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-sm text-foreground/80">
                      Olá, <strong>{profile?.name || "Cliente"}</strong>
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
                      title="Sair"
                    >
                      <LogOut className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-accent transition-colors text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    Entrar
                  </button>
                ))}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
                aria-label="Abrir carrinho"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-subtle">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* WhatsApp Button - Desktop */}
              <button
                type="button"
                onClick={handlePedirWhatsApp}
                className="hidden md:flex btn-whatsapp text-sm py-2"
              >
                <Phone className="w-4 h-4" />
                <span>Pedir Agora</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-card shadow-elevated animate-slide-up">
              <ul className="py-4 px-4 space-y-2">
                {/* Auth - Mobile */}
                {!loading && (
                  <li className="pb-2 border-b border-border">
                    {user ? (
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-sm text-foreground">
                          Olá, <strong>{profile?.name || "Cliente"}</strong>
                        </span>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive"
                        >
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full py-3 px-4 rounded-lg text-foreground hover:bg-accent font-medium transition-colors"
                      >
                        <User className="w-5 h-5" />
                        Entrar / Cadastrar
                      </button>
                    )}
                  </li>
                )}

                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-4 rounded-lg text-foreground hover:bg-accent font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handlePedirWhatsApp();
                      setIsMenuOpen(false);
                    }}
                    className="btn-whatsapp w-full justify-center"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Pedir pelo WhatsApp</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
