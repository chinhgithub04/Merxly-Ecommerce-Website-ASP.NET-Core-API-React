interface StoreOrderSummarySectionProps {
  subTotal: number;
  totalCommission: number;
  totalAmount: number;
}

export const StoreOrderSummarySection = ({
  subTotal,
  totalCommission,
  totalAmount,
}: StoreOrderSummarySectionProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-neutral-900'>Order Summary</h3>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-neutral-600'>Subtotal</span>
          <span className='text-neutral-900'>{formatCurrency(subTotal)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-neutral-600'>Total Commission</span>
          <span className='text-red-600 font-medium'>
            -{formatCurrency(totalCommission)}
          </span>
        </div>
        <div className='border-t border-neutral-200 pt-3'>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-semibold text-neutral-900'>
              Total
            </span>
            <span className='text-lg font-bold text-neutral-900'>
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
