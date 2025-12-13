import { useState, useRef, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import type {
  StoreProductSortBy,
  StoreProductSortOrder,
} from '../../types/enums';

interface ProductSearchAndSortProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: StoreProductSortBy;
  sortOrder: StoreProductSortOrder;
  onSortChange: (
    sortBy: StoreProductSortBy,
    sortOrder: StoreProductSortOrder
  ) => void;
}

interface SortOption {
  value: StoreProductSortBy;
  label: string;
  ascendingLabel: string;
  descendingLabel: string;
}

const sortOptions: SortOption[] = [
  {
    value: 'ProductName',
    label: 'Product name',
    ascendingLabel: 'A-Z',
    descendingLabel: 'Z-A',
  },
  {
    value: 'CreatedAt',
    label: 'Created date',
    ascendingLabel: 'Oldest first',
    descendingLabel: 'Newest first',
  },
  {
    value: 'UpdatedAt',
    label: 'Updated date',
    ascendingLabel: 'Oldest first',
    descendingLabel: 'Newest first',
  },
  {
    value: 'TotalStock',
    label: 'Inventory',
    ascendingLabel: 'Low to high',
    descendingLabel: 'High to low',
  },
];

export const ProductSearchAndSort = ({
  searchTerm,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
}: ProductSearchAndSortProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const currentSortOption = sortOptions.find((opt) => opt.value === sortBy);
  const currentSortLabel =
    sortOrder === 'Ascending'
      ? currentSortOption?.ascendingLabel
      : currentSortOption?.descendingLabel;

  const handleSortByChange = (newSortBy: StoreProductSortBy) => {
    onSortChange(newSortBy, sortOrder);
  };

  const handleSortOrderChange = (newSortOrder: StoreProductSortOrder) => {
    onSortChange(sortBy, newSortOrder);
  };

  return (
    <div className='flex items-center gap-2'>
      {/* Search Input */}
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <MagnifyingGlassIcon className='h-5 w-5 text-neutral-400' />
        </div>
        <input
          type='text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className='w-64 pl-10 pr-4 py-2 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors'
        />
      </div>

      {/* Sort Dropdown */}
      <div className='relative' ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='flex items-center gap-2 px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors cursor-pointer'
        >
          <AdjustmentsHorizontalIcon className='h-5 w-5' />
          <span>Sort</span>
          {currentSortLabel && (
            <>
              <span className='text-neutral-400'>·</span>
              <span className='text-neutral-900 font-medium'>
                {currentSortLabel}
              </span>
            </>
          )}
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg z-50'>
            <div className='p-4 space-y-4'>
              {/* Sort By Section */}
              <div>
                <h3 className='text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2'>
                  Sort by
                </h3>
                <div className='space-y-1'>
                  {sortOptions.map((option) => (
                    <label
                      key={option.value}
                      className='flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-50 cursor-pointer transition-colors'
                    >
                      <input
                        type='radio'
                        name='sortBy'
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={() => handleSortByChange(option.value)}
                        className='w-4 h-4 text-primary-600 border-neutral-300 focus:ring-2 focus:ring-primary-600 cursor-pointer'
                      />
                      <span className='text-sm text-neutral-700'>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Order Section */}
              <div>
                <h3 className='text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2'>
                  Order
                </h3>
                <div className='space-y-1'>
                  <label className='flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-50 cursor-pointer transition-colors'>
                    <input
                      type='radio'
                      name='sortOrder'
                      value='Ascending'
                      checked={sortOrder === 'Ascending'}
                      onChange={() => handleSortOrderChange('Ascending')}
                      className='w-4 h-4 text-primary-600 border-neutral-300 focus:ring-2 focus:ring-primary-600 cursor-pointer'
                    />
                    <span className='text-sm text-neutral-700'>
                      {currentSortOption?.ascendingLabel}
                    </span>
                  </label>
                  <label className='flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-neutral-50 cursor-pointer transition-colors'>
                    <input
                      type='radio'
                      name='sortOrder'
                      value='Descending'
                      checked={sortOrder === 'Descending'}
                      onChange={() => handleSortOrderChange('Descending')}
                      className='w-4 h-4 text-primary-600 border-neutral-300 focus:ring-2 focus:ring-primary-600 cursor-pointer'
                    />
                    <span className='text-sm text-neutral-700'>
                      {currentSortOption?.descendingLabel}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
