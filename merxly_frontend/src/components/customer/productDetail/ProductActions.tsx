import { useState } from 'react';
import {
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface ProductActionsProps {
  stockQuantity: number;
}

export const ProductActions = ({ stockQuantity }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= stockQuantity) {
      setQuantity(value);
    }
  };

  return (
    <div className='space-y-4'>
      {/* Quantity Selector */}
      <div>
        <p className='text-sm text-neutral-600 mb-2'>
          Available: {stockQuantity.toLocaleString()} units
        </p>
        <div className='flex items-center gap-3'>
          <div className='flex items-center border border-neutral-300 rounded-lg'>
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className='cursor-pointer p-2 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              <MinusIcon className='h-5 w-5 text-neutral-700' />
            </button>
            <input
              type='number'
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={stockQuantity}
              className='cursor-pointer w-16 text-center border-x border-neutral-300 py-2 text-neutral-900 font-medium focus:outline-none'
            />
            <button
              onClick={handleIncrement}
              disabled={quantity >= stockQuantity}
              className='cursor-pointer p-2 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              <PlusIcon className='h-5 w-5 text-neutral-700' />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button className='cursor-pointer flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors'>
            <ShoppingCartIcon className='h-5 w-5' />
            <span>Add to Cart</span>
          </button>

          {/* Buy Now Button */}
          <button className='cursor-pointer px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors'>
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
