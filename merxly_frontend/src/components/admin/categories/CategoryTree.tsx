import { type Category, CategoryNode } from './CategoryNode';

interface CategoryTreeProps {
  categories: Category[];
  onAddSubcategory: (parentId: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export const CategoryTree = ({
  categories,
  onAddSubcategory,
  onEdit,
  onDelete,
}: CategoryTreeProps) => {
  if (categories.length === 0) {
    return (
      <div className='bg-white rounded-lg border border-neutral-200 p-12 text-center'>
        <h3 className='text-lg font-semibold text-neutral-900 mb-2'>
          No categories yet
        </h3>
        <p className='text-neutral-600'>
          Create your first category to get started
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg border border-neutral-200'>
      <div className='p-4 border-b border-neutral-200'>
        <h2 className='text-sm font-semibold text-neutral-600 uppercase tracking-wider'>
          Category Hierarchy
        </h2>
      </div>
      <div className='p-2'>
        {categories.map((category) => (
          <CategoryNode
            key={category.id}
            category={category}
            level={0}
            onAddSubcategory={onAddSubcategory}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
