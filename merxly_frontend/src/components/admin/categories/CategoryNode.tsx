import { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { CategoryActions } from './CategoryActions';

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategoryId?: string;
  isActive: boolean;
  subCategories: Category[];
}

interface CategoryNodeProps {
  category: Category;
  level: number;
  onAddSubcategory: (parentId: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export const CategoryNode = ({
  category,
  level,
  onAddSubcategory,
  onEdit,
  onDelete,
}: CategoryNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = category.subCategories.length > 0;
  const isParent = level === 0;

  return (
    <div>
      {/* Category Item */}
      <div
        className='flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors group'
        style={{ marginLeft: `${level * 24}px` }}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex-shrink-0 p-1 rounded hover:bg-neutral-200 transition-colors ${
            hasChildren ? 'visible' : 'invisible'
          }`}
        >
          {isExpanded ? (
            <ChevronDownIcon className='h-4 w-4 text-neutral-600' />
          ) : (
            <ChevronRightIcon className='h-4 w-4 text-neutral-600' />
          )}
        </button>

        {/* Category Image (Parent only) */}
        {isParent && (
          <div className='flex-shrink-0'>
            {category.imageUrl ? (
              <img
                src={category.imageUrl}
                alt={category.name}
                className='w-10 h-10 object-cover rounded-lg border border-neutral-200'
              />
            ) : (
              <div className='w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-lg border border-neutral-200'>
                <PhotoIcon className='h-5 w-5 text-neutral-400' />
              </div>
            )}
          </div>
        )}

        {/* Category Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2'>
            <h3
              className={`font-medium text-neutral-900 truncate ${
                isParent ? 'text-base' : 'text-sm'
              }`}
            >
              {category.name}
            </h3>
            {!category.isActive && (
              <span className='px-2 py-0.5 bg-neutral-200 text-neutral-600 text-xs font-medium rounded'>
                Inactive
              </span>
            )}
            {hasChildren && (
              <span className='px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded'>
                {category.subCategories.length} subcategories
              </span>
            )}
          </div>
          {category.description && (
            <p className='text-xs text-neutral-500 truncate mt-0.5'>
              {category.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <CategoryActions
          category={category}
          isParent={isParent}
          onAddSubcategory={onAddSubcategory}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Subcategories */}
      {hasChildren && isExpanded && (
        <div className='mt-1'>
          {category.subCategories.map((subCategory) => (
            <CategoryNode
              key={subCategory.id}
              category={subCategory}
              level={level + 1}
              onAddSubcategory={onAddSubcategory}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
