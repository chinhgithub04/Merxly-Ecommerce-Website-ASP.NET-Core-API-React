import { useCreateProduct } from '../../hooks/useCreateProduct';
import { CreateProductHeader } from '../../components/products/CreateProductHeader';
import { ProductBasicInfo } from '../../components/products/ProductBasicInfo';
import { ProductVariantsSection } from '../../components/products/ProductVariantsSection';
import { ProductStatusSection } from '../../components/products/ProductStatusSection';
import { ProductFeaturedSection } from '../../components/products/ProductFeaturedSection';

export const CreateProductPage = () => {
  const {
    productName,
    description,
    categoryId,
    isActive,
    isStoreFeatured,
    attributes,
    variants,
    groupBy,
    errors,
    setProductName,
    setDescription,
    setCategoryId,
    setIsActive,
    setIsStoreFeatured,
    setAttributes,
    setVariants,
    setGroupBy,
    handleSubmit,
    handleDiscard,
    isSubmitting,
  } = useCreateProduct();

  return (
    <div className='h-screen flex flex-col bg-neutral-50'>
      {/* Custom Header */}
      <CreateProductHeader
        productName={productName}
        onDiscard={handleDiscard}
        onSave={handleSubmit}
        isSaving={isSubmitting}
      />

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <div className='max-w-7xl mx-auto p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Left Column - Main Content (2/3) */}
            <div className='lg:col-span-2 space-y-6'>
              <ProductBasicInfo
                productName={productName}
                description={description}
                categoryId={categoryId}
                onProductNameChange={setProductName}
                onDescriptionChange={setDescription}
                onCategoryChange={setCategoryId}
              />

              {errors.productName && (
                <p className='text-sm text-red-600'>{errors.productName}</p>
              )}
              {errors.categoryId && (
                <p className='text-sm text-red-600'>{errors.categoryId}</p>
              )}

              <ProductVariantsSection
                attributes={attributes}
                variants={variants}
                groupBy={groupBy}
                onAttributesChange={setAttributes}
                onVariantsChange={setVariants}
                onGroupByChange={setGroupBy}
              />

              {errors.variants && (
                <p className='text-sm text-red-600'>{errors.variants}</p>
              )}
            </div>

            {/* Right Column - Sidebar (1/3) */}
            <div className='space-y-6'>
              <ProductStatusSection
                isActive={isActive}
                onStatusChange={setIsActive}
              />

              <ProductFeaturedSection
                isStoreFeatured={isStoreFeatured}
                onFeaturedChange={setIsStoreFeatured}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
