import { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, MessageCircle, AlertCircle, User, MapPin, Phone, LogIn } from 'lucide-react';
import { useCart, CustomerInfo } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { weightMultipliers, MIN_KIT_QUANTITY, FREE_DELIVERY_MINIMUM } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import AuthModal from './AuthModal';

export const CartDrawer = () => {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeItem, 
    updateQuantity, 
    totalItems, 
    totalPrice,
    getWhatsAppLink,
    hasFreeDelivery,
    clearCart
  } = useCart();

  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    observations: ''
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Pre-fill form with user profile data
  useEffect(() => {
    if (profile) {
      setCustomerInfo(prev => ({
        ...prev,
        name: profile.name || prev.name,
        phone: profile.phone || prev.phone,
        address: profile.address || prev.address
      }));
    }
  }, [profile]);

  if (!isCartOpen) return null;

  const remainingForFreeDelivery = FREE_DELIVERY_MINIMUM - totalPrice;
  const isKitComplete = totalItems >= MIN_KIT_QUANTITY;

  const validateForm = (): boolean => {
    const newErrors: { name?: string; phone?: string; address?: string } = {};
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Por favor, informe seu nome';
    } else if (customerInfo.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    const phoneClean = customerInfo.phone.replace(/\D/g, '');
    if (!phoneClean) {
      newErrors.phone = 'Por favor, informe seu telefone';
    } else if (phoneClean.length < 10 || phoneClean.length > 11) {
      newErrors.phone = 'Telefone deve ter 10 ou 11 dígitos';
    }
    
    if (!customerInfo.address.trim()) {
      newErrors.address = 'Por favor, informe seu endereço';
    } else if (customerInfo.address.trim().length < 10) {
      newErrors.address = 'Endereço deve ser mais completo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfileData = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await updateProfile({
        name: customerInfo.name.trim(),
        phone: customerInfo.phone.trim(),
        address: customerInfo.address.trim()
      });

      if (error) {
        console.error('Error saving profile:', error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleWhatsAppClick = async () => {
    if (validateForm()) {
      // Save profile data if user is logged in
      if (user) {
        await saveProfileData();
        toast({
          title: 'Dados salvos!',
          description: 'Seus dados foram salvos para próximos pedidos.',
        });
      }
      window.open(getWhatsAppLink(customerInfo), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-[101] shadow-elevated flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h2 className="font-display text-xl font-bold">Meu Pedido</h2>
            <span className="bg-primary text-primary-foreground text-sm font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Items List */}
              <ul className="space-y-4">
                {items.map((item) => {
                  const weightInfo = weightMultipliers[item.selectedWeight];
                  const itemPrice = item.product.basePrice * weightInfo.multiplier;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <li key={`${item.product.id}-${item.selectedWeight}-${item.useIntegralRice}`} className="bg-muted rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.selectedWeight}
                            {item.useIntegralRice && ' • Arroz integral'}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-card rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-accent rounded-l-lg transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-accent rounded-r-lg transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-foreground">
                          R$ {itemTotal.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Login prompt if not authenticated */}
              {!user && (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-muted rounded-xl text-foreground hover:bg-accent transition-colors"
                >
                  <LogIn className="w-5 h-5 text-primary" />
                  <span className="font-medium">Entrar para salvar seus dados</span>
                </button>
              )}

              {/* Customer Info Form */}
              <div className="space-y-3 bg-muted rounded-xl p-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Dados para Entrega
                  {user && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Logado</span>}
                </h3>
                
                <div>
                  <label htmlFor="customer-name" className="text-sm text-muted-foreground mb-1 block">
                    Seu Nome *
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    placeholder="Digite seu nome"
                    value={customerInfo.name}
                    onChange={(e) => {
                      setCustomerInfo(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.name ? 'border-destructive' : 'border-border'
                    }`}
                    maxLength={100}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="customer-phone" className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Seu Telefone *
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    placeholder="(41) 99999-9999"
                    value={customerInfo.phone}
                    onChange={(e) => {
                      setCustomerInfo(prev => ({ ...prev, phone: e.target.value }));
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.phone ? 'border-destructive' : 'border-border'
                    }`}
                    maxLength={20}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="customer-address" className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Endereço Completo *
                  </label>
                  <textarea
                    id="customer-address"
                    placeholder="Rua, número, bairro, complemento..."
                    value={customerInfo.address}
                    onChange={(e) => {
                      setCustomerInfo(prev => ({ ...prev, address: e.target.value }));
                      if (errors.address) setErrors(prev => ({ ...prev, address: undefined }));
                    }}
                    className={`w-full px-4 py-3 rounded-lg border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${
                      errors.address ? 'border-destructive' : 'border-border'
                    }`}
                    rows={2}
                    maxLength={300}
                  />
                  {errors.address && (
                    <p className="text-destructive text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="customer-observations" className="text-sm text-muted-foreground mb-1 block">
                    Observações (opcional)
                  </label>
                  <textarea
                    id="customer-observations"
                    placeholder="Ex: sem cebola, trocar arroz por purê..."
                    value={customerInfo.observations}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, observations: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    rows={2}
                    maxLength={500}
                  />
                </div>
              </div>

              {/* Kit Info */}
              {!isKitComplete && totalItems > 0 && (
                <div className="flex items-start gap-2 bg-secondary/20 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Adicione mais {MIN_KIT_QUANTITY - totalItems} marmita(s) para completar um Kit 10 Refeições!
                  </p>
                </div>
              )}

              {/* Free Delivery Info */}
              {!hasFreeDelivery && (
                <div className="flex items-start gap-2 bg-primary/10 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Faltam <strong className="text-primary">R$ {remainingForFreeDelivery.toFixed(2)}</strong> para frete grátis em Curitiba!
                  </p>
                </div>
              )}

              {hasFreeDelivery && (
                <div className="bg-primary/20 rounded-lg p-3 text-center">
                  <p className="text-primary font-semibold">🚚 Frete GRÁTIS para Curitiba!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 bg-card flex-shrink-0">
            {/* Totals */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total ({totalItems} {totalItems === 1 ? 'item' : 'itens'}):</span>
              <span className="text-2xl font-bold text-primary">R$ {totalPrice.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <button
              onClick={handleWhatsAppClick}
              disabled={isSaving}
              className="btn-whatsapp w-full justify-center text-lg disabled:opacity-50"
            >
              <MessageCircle className="w-6 h-6" />
              {isSaving ? 'Salvando...' : 'Pedir pelo WhatsApp'}
            </button>

            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          toast({
            title: 'Login realizado!',
            description: 'Seus dados serão salvos automaticamente.',
          });
        }}
      />
    </>
  );
};
