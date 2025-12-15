interface ProductFeaturedSectionProps {
  isStoreFeatured: boolean;
  onFeaturedChange: (isFeatured: boolean) => void;
}

export const ProductFeaturedSection = ({
  isStoreFeatured,
  onFeaturedChange,
}: ProductFeaturedSectionProps) => {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <h2 className='text-base font-semibold text-neutral-900 mb-4'>
        Store Featured
      </h2>

      <label className='flex items-center gap-3 cursor-pointer'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isStoreFeatured}
            onChange={(e) => onFeaturedChange(e.target.checked)}
            className='sr-only peer'
          />
          <div className='w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:bg-primary-600 peer-focus:ring-2 peer-focus:ring-primary-500 transition-colors'></div>
          <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></div>
        </div>
        <span className='text-sm text-neutral-700'>
          Feature this product in your store
        </span>
      </label>

      <p className='mt-2 text-xs text-neutral-600'>
        Featured products are highlighted and promoted in your store.
      </p>
    </div>
  );
};
