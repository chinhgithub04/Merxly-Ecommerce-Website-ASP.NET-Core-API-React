import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { getCategoryTree } from '../../services/categoryService';
import type { CategoryDto } from '../../types/models/category';

interface ProductCategorySelectorProps {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export const ProductCategorySelector = ({
  selectedCategoryId,
  onSelectCategory,
}: ProductCategorySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [navigationPath, setNavigationPath] = useState<CategoryDto[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['categoryTree'],
    queryFn: () => getCategoryTree(),
  });

  const categories = data?.data?.items || [];

  // Flatten categories with parent path for navigation restoration
  const { flatCategories, categoryPaths } = useMemo(() => {
    const flat: CategoryDto[] = [];
    const paths: Record<string, CategoryDto[]> = {};

    const traverse = (cats: CategoryDto[], parentPath: CategoryDto[] = []) => {
      cats.forEach((cat) => {
        flat.push(cat);
        paths[cat.id] = parentPath;
        if (cat.children.length > 0) {
          traverse(cat.children, [...parentPath, cat]);
        }
      });
    };

    traverse(categories);
    return { flatCategories: flat, categoryPaths: paths };
  }, [categories]);

  // Get current view categories
  const currentCategories = useMemo(() => {
    if (navigationPath.length === 0) {
      return categories; // Root level
    }
    return navigationPath[navigationPath.length - 1].children;
  }, [categories, navigationPath]);

  // Global search across all categories or current level navigation
  const { displayCategories, isSearchMode } = useMemo(() => {
    if (!searchTerm) {
      return { displayCategories: currentCategories, isSearchMode: false };
    }

    // Global search - flatten and filter all categories
    const lowerSearch = searchTerm.toLowerCase();
    const results = flatCategories.filter((cat) =>
      cat.name.toLowerCase().includes(lowerSearch)
    );
    return { displayCategories: results, isSearchMode: true };
  }, [currentCategories, searchTerm, flatCategories]);

  const handleDrillDown = (category: CategoryDto) => {
    setNavigationPath([...navigationPath, category]);
    setSearchTerm('');
  };

  const handleNavigateBack = () => {
    setNavigationPath(navigationPath.slice(0, -1));
    setSearchTerm('');
  };

  const handleSelectCategory = (categoryId: string) => {
    onSelectCategory(categoryId);
    setIsOpen(false);
    setNavigationPath([]);
    setSearchTerm('');
  };

  const handleOpenDropdown = () => {
    setIsOpen(true);
    setSearchTerm('');

    // Restore navigation path to selected category's parent
    if (selectedCategoryId && categoryPaths[selectedCategoryId]) {
      setNavigationPath(categoryPaths[selectedCategoryId]);
    } else {
      setNavigationPath([]);
    }
  };

  const handleClearCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCategory('');
    setNavigationPath([]);
    setSearchTerm('');
  };

  // Get selected category name only (not full path)
  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId) return null;
    return (
      flatCategories.find((c) => c.id === selectedCategoryId)?.name || null
    );
  }, [selectedCategoryId, flatCategories]);

  return (
    <div className='relative'>
      <label className='block text-sm font-medium text-neutral-700 mb-1'>
        Category
      </label>
      <button
        type='button'
        onClick={handleOpenDropdown}
        className='cursor-pointer w-full px-3 py-2 border border-neutral-300 rounded-md text-left bg-white hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between gap-2'
      >
        <span className='text-sm text-neutral-900 flex-1'>
          {selectedCategoryName || 'Select a category'}
        </span>
        {selectedCategoryId && (
          <span
            onClick={handleClearCategory}
            className='cursor-pointer shrink-0 p-0.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded transition-colors'
            aria-label='Clear category'
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClearCategory(e as any);
              }
            }}
          >
            <XMarkIcon className='w-4 h-4' />
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={() => {
              setIsOpen(false);
              setNavigationPath([]);
              setSearchTerm('');
            }}
          />
          <div className='absolute z-20 mt-2 w-full bg-white border border-neutral-200 rounded-lg shadow-xl max-h-[420px] overflow-hidden'>
            {/* Search */}
            <div className='p-3 bg-white border-b border-neutral-100'>
              <input
                type='text'
                placeholder='Search all categories...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow'
              />
            </div>

            {/* Navigation Header (only shown when drilled down and NOT searching) */}
            {navigationPath.length > 0 && !isSearchMode && (
              <button
                onClick={handleNavigateBack}
                className='cursor-pointer w-full px-4 py-3 text-left bg-neutral-50 border-b border-neutral-200 hover:bg-neutral-100 transition-colors'
                type='button'
              >
                {/* Breadcrumb Path */}
                <div className='flex items-center gap-1.5 text-xs text-neutral-500 mb-1'>
                  <ChevronLeftIcon className='w-3.5 h-3.5 shrink-0' />
                  <span className='font-medium'>
                    {navigationPath
                      .slice(0, -1)
                      .map((cat) => cat.name)
                      .join(' > ') || 'Categories'}
                  </span>
                </div>

                {/* Current Category Name */}
                <div className='text-sm font-bold text-neutral-900 pl-5'>
                  {navigationPath[navigationPath.length - 1].name}
                </div>
              </button>
            )}

            {/* Category List */}
            <div className='overflow-y-auto max-h-[280px] bg-white'>
              {isLoading ? (
                <div className='p-6 text-center text-sm text-neutral-500'>
                  Loading categories...
                </div>
              ) : displayCategories.length === 0 ? (
                <div className='p-6 text-center text-sm text-neutral-500'>
                  No categories found
                </div>
              ) : (
                displayCategories.map((category) => {
                  const hasChildren =
                    category.children.length > 0 && !isSearchMode;
                  const isSelected = selectedCategoryId === category.id;

                  return (
                    <div
                      key={category.id}
                      className={`flex items-stretch border-b border-neutral-50 last:border-b-0 transition-colors ${
                        isSelected ? 'bg-primary-50/50' : 'hover:bg-neutral-50'
                      }`}
                    >
                      {/* Category Name - Selectable */}
                      <button
                        onClick={() => handleSelectCategory(category.id)}
                        className={`cursor-pointer flex-1 text-left px-4 py-3 text-sm flex items-center gap-2.5 min-h-11 transition-colors ${
                          isSelected
                            ? 'text-primary-700 font-semibold'
                            : 'text-neutral-700 hover:text-neutral-900'
                        }`}
                        type='button'
                      >
                        <span className='flex-1'>{category.name}</span>
                        {isSelected && (
                          <CheckIcon className='w-4 h-4 text-primary-600 shrink-0' />
                        )}
                      </button>

                      {/* Drill-down Arrow - Only if has children and not in search mode */}
                      {hasChildren && (
                        <button
                          onClick={() => handleDrillDown(category)}
                          className='cursor-pointer px-3 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 border-l border-neutral-100 transition-colors min-w-11'
                          type='button'
                          aria-label={`Browse ${category.name}`}
                        >
                          <ChevronRightIcon className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
