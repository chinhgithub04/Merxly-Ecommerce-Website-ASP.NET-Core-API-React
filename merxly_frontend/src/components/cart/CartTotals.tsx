interface CartTotalsProps {
  subtotal: number;
}

export const CartTotals = ({ subtotal }: CartTotalsProps) => {
  return (
    <div className='bg-white border border-neutral-200 rounded-lg p-6 sticky top-6'>
      <h2 className='text-lg font-semibold text-neutral-900 mb-4'>
        Cart Totals
      </h2>

      <div className='space-y-3 mb-4'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-neutral-600'>Subtotal</span>
          <span className='text-neutral-900 font-medium'>
            ₫{subtotal.toLocaleString('vi-VN')}
          </span>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-neutral-600'>Shipping</span>
          <span className='text-green-600 font-medium'>Free</span>
        </div>
      </div>

      <div className='border-t border-neutral-200 pt-4 mb-4'>
        <div className='flex items-center justify-between'>
          <span className='text-base font-semibold text-neutral-900'>
            Total
          </span>
          <span className='text-xl font-bold text-primary-600'>
            ₫{subtotal.toLocaleString('vi-VN')}
          </span>
        </div>
      </div>

      <button className='cursor-pointer w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors'>
        Proceed to checkout
      </button>
    </div>
  );
};
