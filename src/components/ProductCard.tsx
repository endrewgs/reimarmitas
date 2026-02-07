import { useState } from 'react';
import { Plus, Minus, ShoppingCart, Leaf } from 'lucide-react';
import { Product, WeightOption, weightMultipliers } from '@/data/products';
import { useCart } from '@/context/CartContext';
import marmitaTradicional from '@/assets/marmita-tradicional.jpg';
import marmitaLowcarb from '@/assets/marmita-lowcarb.jpg';
import kitMarmitas from '@/assets/kit-marmitas.jpg';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(product.weight);
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
        {product.category === 'lowcarb' && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            LOW CARB
          </span>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 price-tag">
          <span className="text-xs">Só</span>
          <span className="text-xl font-bold ml-1">R$ {currentPrice.toFixed(2)}</span>
          <span className="text-xs block">/{selectedWeight}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-sm sm:text-lg text-foreground mb-3 line-clamp-2">
          {product.name}
        </h3>

        {/* Weight Options */}
        <div className="flex gap-1 sm:gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1 -mb-1 snap-x snap-mandatory">
          {(['350g', '400g', '500g'] as WeightOption[]).map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`flex-shrink-0 min-w-[60px] sm:flex-1 sm:min-w-0 text-[9px] sm:text-xs py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-md sm:rounded-lg font-medium transition-all whitespace-nowrap snap-start ${
                selectedWeight === weight
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {weightMultipliers[weight].label}
            </button>
          ))}
        </div>

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
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center bg-muted rounded-md shrink-0">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 sm:p-2 hover:bg-accent rounded-l-md transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="w-5 sm:w-10 text-center text-xs sm:text-base font-semibold">{quantity}</span>
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
            className={`flex-1 py-1.5 sm:py-3 rounded-md sm:rounded-lg text-[10px] sm:text-sm font-semibold flex items-center justify-center gap-1 transition-all min-w-0 ${
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
