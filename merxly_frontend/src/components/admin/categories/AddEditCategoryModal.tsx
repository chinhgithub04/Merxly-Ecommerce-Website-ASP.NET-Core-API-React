import { useState } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { type Category } from './CategoryNode';

interface AddEditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
  parentCategory?: Category;
  editingCategory?: Category;
}

export interface CategoryFormData {
  name: string;
  description: string;
  isActive: boolean;
  imageFile?: File;
  parentCategoryId?: string;
}

export const AddEditCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  parentCategory,
  editingCategory,
}: AddEditCategoryModalProps) => {
  const isEdit = !!editingCategory;
  const isSubcategory = !!parentCategory && !editingCategory;
  const isParentCategory = !parentCategory && !editingCategory;

  const [formData, setFormData] = useState<CategoryFormData>({
    name: editingCategory?.name || '',
    description: editingCategory?.description || '',
    isActive: editingCategory?.isActive ?? true,
    parentCategoryId: parentCategory?.id || editingCategory?.parentCategoryId,
  });

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    editingCategory?.imageUrl
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, imageFile: file }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(undefined);
    setFormData((prev) => ({ ...prev, imageFile: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-neutral-900'>
              {isEdit
                ? 'Edit Category'
                : isSubcategory
                ? `Add Subcategory to "${parentCategory.name}"`
                : 'Add New Category'}
            </h2>
            {isSubcategory && (
              <p className='text-sm text-neutral-600 mt-1'>
                This category will be a child of{' '}
                <span className='font-medium'>{parentCategory.name}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-neutral-100 rounded-lg transition-colors'
          >
            <XMarkIcon className='h-6 w-6 text-neutral-600' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Category Name */}
          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-2'>
              Category Name <span className='text-error-600'>*</span>
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='e.g., Electronics, Smartphones'
              required
              className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-2'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Brief description of this category'
              rows={3}
              className='w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none'
            />
          </div>

          {/* Category Image (Parent categories only) */}
          {isParentCategory && (
            <div>
              <label className='block text-sm font-medium text-neutral-700 mb-3'>
                Category Image
              </label>
              <div className='flex items-center gap-4'>
                {imagePreview ? (
                  <div className='relative'>
                    <img
                      src={imagePreview}
                      alt='Category preview'
                      className='w-24 h-24 object-cover rounded-lg border border-neutral-200'
                    />
                    <button
                      type='button'
                      onClick={handleRemoveImage}
                      className='absolute -top-2 -right-2 p-1 bg-error-600 text-white rounded-full hover:bg-error-700 transition-colors'
                    >
                      <XMarkIcon className='h-4 w-4' />
                    </button>
                  </div>
                ) : (
                  <div className='w-24 h-24 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50'>
                    <PhotoIcon className='h-10 w-10 text-neutral-400' />
                  </div>
                )}

                <div className='flex-1'>
                  <label
                    htmlFor='image-upload'
                    className='inline-block px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer'
                  >
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                  </label>
                  <input
                    id='image-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                  <p className='text-xs text-neutral-500 mt-2'>
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Is Active */}
          <div className='flex items-center'>
            <input
              type='checkbox'
              name='isActive'
              id='isActive'
              checked={formData.isActive}
              onChange={handleChange}
              className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded'
            />
            <label
              htmlFor='isActive'
              className='ml-2 block text-sm text-neutral-700'
            >
              Active (visible to customers)
            </label>
          </div>

          {/* Info Note */}
          {isSubcategory && (
            <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-sm text-blue-800'>
                <span className='font-semibold'>Note:</span> Subcategories
                inherit visibility from their parent category and do not have
                their own images.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className='flex justify-end gap-3 pt-4 border-t border-neutral-200'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'
            >
              {isEdit ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
