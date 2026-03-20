import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Leaf } from 'lucide-react';
import { Product, weightMultipliers } from '@/data/products';
import { useCart } from '@/context/CartContext';
import marmitaTradicional from '@/assets/marmita-tradicional.jpg';
import marmitaLowcarb from '@/assets/marmita-lowcarb.jpg';
import kitMarmitas from '@/assets/kit-marmitas.jpg';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const selectedWeight = product.weight;
  const [useIntegralRice, setUseIntegralRice] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const getProductImage = () => {
    if (product.image) return product.image;
    if (product.category === 'lowcarb') return marmitaLowcarb;
    if (product.category === 'kit') return kitMarmitas;
    return marmitaTradicional;
  };

  const currentPrice = product.basePrice * weightMultipliers[selectedWeight].multiplier;
  const isLowCarb = product.category === 'lowcarb';

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedWeight, useIntegralRice);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    setQuantity(1);
  };

  return (
    <article className="card-product group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={getProductImage()}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        {isLowCarb && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
            <Leaf className="w-2 h-2" />
            LOW CARB
          </span>
        )}

        {/* Price Tag - REDUZIDA CONFORME PEDIDO */}
        <div className={`absolute bg-yellow-400 text-black 
                      px-1.5 py-0.5 rounded shadow-sm z-10
                      ${isLowCarb ? 'top-8 left-2 md:top-auto md:bottom-2 md:left-auto md:right-2' : 'top-2 left-2 md:top-auto md:bottom-2 md:left-auto md:right-2'}
                      `}>
          <div className="flex items-baseline leading-none gap-1">
            <span className="text-[9px] font-bold uppercase">Só</span>
            <span className="text-sm font-extrabold">
              R$ {currentPrice.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="text-left leading-none mt-0.5">
            <span className="text-[8px] font-bold">/300g</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-sm sm:text-base text-foreground mb-3 line-clamp-2">
          {product.name}
        </h3>

        {/* Integral Rice Option */}
        {product.hasIntegralRice && (
          <label className="flex items-center gap-2 mb-4 cursor-pointer group/check">
            <input
              type="checkbox"
              checked={useIntegralRice}
              onChange={(e) => setUseIntegralRice(e.target.checked)}
              className="w-4 h-4 accent-primary rounded"
            />
            <span className="text-sm text-muted-foreground group-hover/check:text-foreground transition-colors">
              Com arroz integral
            </span>
          </label>
        )}

        {/* Quantity + Add Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 mt-auto">
          <div className="flex items-center bg-muted rounded-md shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 sm:p-2 hover:bg-accent rounded-l-md transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="w-5 sm:w-8 text-center text-xs sm:text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 sm:p-2 hover:bg-accent rounded-r-md transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex-1 py-1.5 sm:py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1 transition-all min-w-0 ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{isAdded ? 'OK!' : 'Adicionar'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
