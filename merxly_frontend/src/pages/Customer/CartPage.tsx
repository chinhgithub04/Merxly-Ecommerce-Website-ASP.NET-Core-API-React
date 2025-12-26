import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { CartTable, CartTotals } from '../../components/cart';

export const CartPage = () => {
  const { cart, isLoading, updateCartItem, removeCartItem, clearCart } =
    useCart();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && cart?.cartItems) {
      setSelectedItems(new Set(cart.cartItems.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      await updateCartItem({ cartItemId: itemId, dto: { quantity } });
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeCartItem(itemId);
      // Remove from selection if it was selected
      const newSelected = new Set(selectedItems);
      newSelected.delete(itemId);
      setSelectedItems(newSelected);
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      try {
        await clearCart();
        setSelectedItems(new Set());
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className='px-20 py-12'>
        <div className='flex items-center justify-center py-20'>
          <p className='text-neutral-500'>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='px-20 py-12'>
      <div className='grid grid-cols-3 gap-8'>
        {/* Left: Shopping Cart Section */}
        <div className='col-span-2'>
          {/* Header */}
          <div className='bg-white border-t border-x border-neutral-200 rounded-t-lg px-4 py-4 flex items-center justify-between'>
            <h1 className='text-xl font-semibold text-neutral-900'>
              Shopping Cart
            </h1>
            {cart && cart.cartItems.length > 0 && (
              <button
                onClick={handleClearAll}
                className='cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors'
              >
                Clear All
              </button>
            )}
          </div>

          {/* Cart Table */}
          <CartTable
            items={cart?.cartItems || []}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>

        {/* Right: Cart Totals */}
        <div className='col-span-1'>
          <CartTotals subtotal={cart?.subtotal || 0} />
        </div>
      </div>
    </div>
  );
};
