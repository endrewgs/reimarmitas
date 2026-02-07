import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, WeightOption, weightMultipliers, WHATSAPP_NUMBER, PIX_KEY, FREE_DELIVERY_MINIMUM } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: WeightOption;
  useIntegralRice: boolean;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  observations: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, weight: WeightOption, useIntegralRice: boolean) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppMessage: (customerInfo: CustomerInfo) => string;
  getWhatsAppLink: (customerInfo: CustomerInfo) => string;
  hasFreeDelivery: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((product: Product, weight: WeightOption, useIntegralRice: boolean) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && 
               item.selectedWeight === weight && 
               item.useIntegralRice === useIntegralRice
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { product, quantity: 1, selectedWeight: weight, useIntegralRice }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const weightInfo = weightMultipliers[item.selectedWeight];
    const price = item.product.basePrice * weightInfo.multiplier * item.quantity;
    return sum + price;
  }, 0);

  const hasFreeDelivery = totalPrice >= FREE_DELIVERY_MINIMUM;

  const generateWhatsAppMessage = useCallback((customerInfo: CustomerInfo) => {
    if (items.length === 0) return '';

    let message = `Olá! Meu nome é ${customerInfo.name}, meu telefone é ${customerInfo.phone} e gostaria de fazer um pedido para entrega no endereço: ${customerInfo.address}.\n\n`;
    message += `Meu pedido:\n`;
    
    items.forEach((item) => {
      const weightInfo = weightMultipliers[item.selectedWeight];
      const itemPrice = item.product.basePrice * weightInfo.multiplier;
      const itemTotal = itemPrice * item.quantity;
      const integralNote = item.product.hasIntegralRice && item.useIntegralRice ? ' (com arroz integral)' : '';
      
      message += `- ${item.quantity}x ${item.product.name} (${item.selectedWeight})${integralNote} - R$ ${itemTotal.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\nTotal: ${totalItems} ${totalItems === 1 ? 'item' : 'itens'} - R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    if (customerInfo.observations.trim()) {
      message += `\n\nObservações: ${customerInfo.observations.trim()}`;
    }

    return message;
  }, [items, totalItems, totalPrice]);

  const getWhatsAppLink = useCallback((customerInfo: CustomerInfo) => {
    const message = encodeURIComponent(generateWhatsAppMessage(customerInfo));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }, [generateWhatsAppMessage]);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
      generateWhatsAppMessage,
      getWhatsAppLink,
      hasFreeDelivery,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
