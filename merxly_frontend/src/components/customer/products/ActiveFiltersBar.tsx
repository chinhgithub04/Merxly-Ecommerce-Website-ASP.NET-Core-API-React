import { XMarkIcon } from '@heroicons/react/24/outline';

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface ActiveFiltersBarProps {
  filters: ActiveFilter[];
  totalResults: number;
  onRemoveFilter: (key: string) => void;
}

export const ActiveFiltersBar = ({
  filters,
  totalResults,
  onRemoveFilter,
}: ActiveFiltersBarProps) => {
  if (filters.length === 0) {
    return (
      <div className='bg-neutral-100 px-6 py-4 rounded-lg mb-6'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-neutral-600'>No active filters</p>
          <p className='text-sm font-medium text-neutral-900'>
            {totalResults} Results found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-neutral-100 px-6 py-4 rounded-lg mb-6'>
      <div className='flex items-center justify-between'>
        {/* Active Filters */}
        <div className='flex items-center gap-2 flex-wrap'>
          <span className='text-sm font-medium text-neutral-700'>
            Active filter:
          </span>
          {filters.map((filter) => (
            <div
              key={filter.key}
              className='flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-300 rounded-lg'
            >
              <span className='text-sm text-neutral-700'>{filter.label}</span>
              <button
                onClick={() => onRemoveFilter(filter.key)}
                className='text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer'
                aria-label={`Remove ${filter.label} filter`}
              >
                <XMarkIcon className='h-4 w-4' />
              </button>
            </div>
          ))}
        </div>

        {/* Results Count */}
        <p className='text-sm font-medium text-neutral-900'>
          {totalResults} Results found
        </p>
      </div>
    </div>
  );
};
