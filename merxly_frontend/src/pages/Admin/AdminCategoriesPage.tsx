import { useState } from 'react';
import { RectangleGroupIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CategoryTree } from '../../components/admin/categories/CategoryTree';
import {
  AddEditCategoryModal,
  type CategoryFormData,
} from '../../components/admin/categories/AddEditCategoryModal';
import type { Category } from '../../components/admin/categories/CategoryNode';

// Mock categories data with hierarchy
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    imageUrl: 'https://placehold.co/400',
    isActive: true,
    subCategories: [
      {
        id: '1-1',
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        parentCategoryId: '1',
        isActive: true,
        subCategories: [],
      },
      {
        id: '1-2',
        name: 'Laptops',
        description: 'Notebook computers and accessories',
        parentCategoryId: '1',
        isActive: true,
        subCategories: [],
      },
      {
        id: '1-3',
        name: 'Tablets',
        description: 'Tablet devices and accessories',
        parentCategoryId: '1',
        isActive: true,
        subCategories: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Clothing, shoes, and accessories',
    imageUrl: 'https://placehold.co/400',
    isActive: true,
    subCategories: [
      {
        id: '2-1',
        name: "Men's Clothing",
        parentCategoryId: '2',
        isActive: true,
        subCategories: [],
      },
      {
        id: '2-2',
        name: "Women's Clothing",
        parentCategoryId: '2',
        isActive: true,
        subCategories: [],
      },
      {
        id: '2-3',
        name: 'Shoes',
        parentCategoryId: '2',
        isActive: true,
        subCategories: [],
      },
    ],
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Home improvement and garden supplies',
    imageUrl: 'https://placehold.co/400',
    isActive: true,
    subCategories: [
      {
        id: '3-1',
        name: 'Furniture',
        parentCategoryId: '3',
        isActive: true,
        subCategories: [],
      },
      {
        id: '3-2',
        name: 'Kitchen',
        parentCategoryId: '3',
        isActive: true,
        subCategories: [],
      },
    ],
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    description: 'Sports equipment and outdoor gear',
    imageUrl: 'https://placehold.co/400',
    isActive: false,
    subCategories: [
      {
        id: '4-1',
        name: 'Exercise & Fitness',
        parentCategoryId: '4',
        isActive: false,
        subCategories: [],
      },
    ],
  },
];

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentCategoryForAdd, setParentCategoryForAdd] = useState<
    Category | undefined
  >();
  const [editingCategory, setEditingCategory] = useState<
    Category | undefined
  >();

  const handleAddTopLevel = () => {
    setParentCategoryForAdd(undefined);
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const handleAddSubcategory = (parentId: string) => {
    const findCategory = (
      cats: Category[],
      id: string
    ): Category | undefined => {
      for (const cat of cats) {
        if (cat.id === id) return cat;
        const found = findCategory(cat.subCategories, id);
        if (found) return found;
      }
      return undefined;
    };

    const parent = findCategory(categories, parentId);
    setParentCategoryForAdd(parent);
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setParentCategoryForAdd(undefined);
    setIsModalOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    if (
      confirm(
        'Are you sure you want to delete this category? This will also delete all subcategories.'
      )
    ) {
      const deleteFromTree = (cats: Category[]): Category[] => {
        return cats
          .filter((cat) => cat.id !== categoryId)
          .map((cat) => ({
            ...cat,
            subCategories: deleteFromTree(cat.subCategories),
          }));
      };

      setCategories(deleteFromTree(categories));
    }
  };

  const handleSubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      // Edit existing category
      const updateInTree = (cats: Category[]): Category[] => {
        return cats.map((cat) => {
          if (cat.id === editingCategory.id) {
            return {
              ...cat,
              name: data.name,
              description: data.description,
              isActive: data.isActive,
            };
          }
          return {
            ...cat,
            subCategories: updateInTree(cat.subCategories),
          };
        });
      };

      setCategories(updateInTree(categories));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        imageUrl: data.imageFile
          ? URL.createObjectURL(data.imageFile)
          : undefined,
        parentCategoryId: data.parentCategoryId,
        isActive: data.isActive,
        subCategories: [],
      };

      if (parentCategoryForAdd) {
        // Add as subcategory
        const addToTree = (cats: Category[]): Category[] => {
          return cats.map((cat) => {
            if (cat.id === parentCategoryForAdd.id) {
              return {
                ...cat,
                subCategories: [...cat.subCategories, newCategory],
              };
            }
            return {
              ...cat,
              subCategories: addToTree(cat.subCategories),
            };
          });
        };

        setCategories(addToTree(categories));
      } else {
        // Add as top-level category
        setCategories([...categories, newCategory]);
      }
    }
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary-50 rounded-lg'>
            <RectangleGroupIcon className='h-6 w-6 text-primary-600' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-neutral-900'>Categories</h1>
            <p className='text-sm text-neutral-600'>
              Manage product categories and their hierarchy
            </p>
          </div>
        </div>
        <button
          onClick={handleAddTopLevel}
          className='flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium'
        >
          <PlusIcon className='h-5 w-5' />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Total Categories</p>
          <p className='text-3xl font-bold text-neutral-900'>
            {categories.length}
          </p>
        </div>
        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Active Categories</p>
          <p className='text-3xl font-bold text-neutral-900'>
            {categories.filter((c) => c.isActive).length}
          </p>
        </div>
        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Total Subcategories</p>
          <p className='text-3xl font-bold text-neutral-900'>
            {categories.reduce((sum, c) => sum + c.subCategories.length, 0)}
          </p>
        </div>
      </div>

      {/* Category Tree */}
      <CategoryTree
        categories={categories}
        onAddSubcategory={handleAddSubcategory}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add/Edit Modal */}
      <AddEditCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        parentCategory={parentCategoryForAdd}
        editingCategory={editingCategory}
      />
    </div>
  );
};
