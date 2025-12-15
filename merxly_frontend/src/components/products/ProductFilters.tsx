import type { CategoryForStore } from '../../types/models/category';

interface ProductFiltersProps {
  activeFilter: 'all' | 'active' | 'draft' | 'featured';
  onFilterChange: (filter: 'all' | 'active' | 'draft' | 'featured') => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categories: CategoryForStore[];
}

export const ProductFilters = ({
  activeFilter,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ProductFiltersProps) => {
  const filters: Array<{
    id: 'all' | 'active' | 'draft' | 'featured';
    label: string;
  }> = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'draft', label: 'Draft' },
    { id: 'featured', label: 'Featured' },
  ];

  return (
    <div className='flex items-center gap-2'>
      {/* Filter Buttons */}
      <div className='flex items-center gap-1 border border-neutral-200 rounded-lg p-1 bg-white'>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className='px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors cursor-pointer'
      >
        <option value=''>All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name} ({category.productCount})
          </option>
        ))}
      </select>
    </div>
  );
};
