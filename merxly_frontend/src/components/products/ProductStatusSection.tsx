interface ProductStatusSectionProps {
  isActive: boolean;
  onStatusChange: (isActive: boolean) => void;
}

export const ProductStatusSection = ({
  isActive,
  onStatusChange,
}: ProductStatusSectionProps) => {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <h2 className='text-base font-semibold text-neutral-900 mb-4'>Status</h2>

      <select
        value={isActive ? 'active' : 'draft'}
        onChange={(e) => onStatusChange(e.target.value === 'active')}
        className='w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
      >
        <option value='active'>Active</option>
        <option value='draft'>Draft</option>
      </select>

      <p className='mt-2 text-xs text-neutral-600'>
        {isActive
          ? 'This product will be visible to customers.'
          : 'This product will be hidden from customers.'}
      </p>
    </div>
  );
};
