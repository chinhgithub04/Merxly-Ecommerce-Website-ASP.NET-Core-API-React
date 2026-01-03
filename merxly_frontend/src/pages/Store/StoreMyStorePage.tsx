import { useState } from 'react';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { StoreInfoCard } from '../../components/store/myStore/StoreInfoCard';
import { EditStoreModal } from '../../components/store/myStore/EditStoreModal';
import { StoreImagesCard } from '../../components/store/myStore/StoreImagesCard';
import { StoreVerificationCard } from '../../components/store/myStore/StoreVerificationCard';
import { useStore, useUpdateStore } from '../../hooks/useStore';
import { getProductImageUrl } from '../../utils/cloudinaryHelpers';
import { uploadImage } from '../../services/uploadService';
import { ImageType } from '../../types/enums/ImageType';
import type { UpdateStoreDto } from '../../types/models/store';

export const StoreMyStorePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const { data: storeResponse, isLoading, isError, error } = useStore();
  const updateStoreMutation = useUpdateStore();

  const storeData = storeResponse?.data;

  const handleEditStore = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveStore = async (formData: {
    storeName: string;
    description: string;
    email: string;
    phoneNumber: string;
    website: string;
  }) => {
    const updateDto: UpdateStoreDto = {
      storeName: formData.storeName,
      description: formData.description,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      website: formData.website,
    };

    try {
      await updateStoreMutation.mutateAsync(updateDto);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update store:', error);
    }
  };

  const handleUpdateLogo = async (file: File) => {
    setIsUploadingLogo(true);
    try {
      const response = await uploadImage(file, 'stores', ImageType.Logo);
      if (response.isSuccess && response.data) {
        await updateStoreMutation.mutateAsync({
          logoImagePublicId: response.data.publicId,
        });
      }
    } catch (error) {
      console.error('Failed to upload logo:', error);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleUpdateBanner = async (file: File) => {
    setIsUploadingBanner(true);
    try {
      const response = await uploadImage(file, 'stores', ImageType.Banner);
      if (response.isSuccess && response.data) {
        await updateStoreMutation.mutateAsync({
          bannerImagePublicId: response.data.publicId,
        });
      }
    } catch (error) {
      console.error('Failed to upload banner:', error);
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleRemoveLogo = async () => {
    try {
      await updateStoreMutation.mutateAsync({
        logoImagePublicId: '',
      });
    } catch (error) {
      console.error('Failed to remove logo:', error);
    }
  };

  const handleRemoveBanner = async () => {
    try {
      await updateStoreMutation.mutateAsync({
        bannerImagePublicId: '',
      });
    } catch (error) {
      console.error('Failed to remove banner:', error);
    }
  };

  const handleToggleActive = async (isActive: boolean) => {
    try {
      await updateStoreMutation.mutateAsync({
        isActive,
      });
    } catch (error) {
      console.error('Failed to update store status:', error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4'></div>
          <p className='text-neutral-600'>Loading store information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !storeData) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <div className='p-4 bg-red-50 rounded-lg mb-4'>
            <p className='text-red-800'>
              {error instanceof Error
                ? error.message
                : 'Failed to load store information'}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className='cursor-pointer px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Generate image URLs from Cloudinary public IDs
  const logoImageUrl = storeData.logoImagePublicId
    ? getProductImageUrl(storeData.logoImagePublicId, 'logo')
    : undefined;
  const bannerImageUrl = storeData.bannerImagePublicId
    ? getProductImageUrl(storeData.bannerImagePublicId, 'banner')
    : undefined;

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-primary-50 rounded-lg'>
          <BuildingStorefrontIcon className='h-6 w-6 text-primary-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-neutral-900'>My Store</h1>
          <p className='text-sm text-neutral-600'>
            Manage your store information and settings
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <div className='shrink-0'>
            <svg
              className='h-5 w-5 text-blue-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <div>
            <h3 className='text-sm font-semibold text-blue-900 mb-1'>
              Keep Your Store Information Up to Date
            </h3>
            <p className='text-sm text-blue-800'>
              Accurate store information helps customers find and trust your
              business. Make sure your contact details and description are
              current.
            </p>
          </div>
        </div>
      </div>

      {/* Store Information Card */}
      <StoreInfoCard
        storeName={storeData.storeName}
        description={storeData.description || ''}
        email={storeData.email}
        phoneNumber={storeData.phoneNumber}
        website={storeData.website || ''}
        isActive={storeData.isActive}
        isVerified={storeData.isVerified}
        commissionRate={storeData.commissionRate}
        onEdit={handleEditStore}
      />

      {/* Store Images Card */}
      <StoreImagesCard
        logoImageUrl={logoImageUrl}
        bannerImageUrl={bannerImageUrl}
        onUpdateLogo={handleUpdateLogo}
        onUpdateBanner={handleUpdateBanner}
        isUploadingLogo={isUploadingLogo}
        isUploadingBanner={isUploadingBanner}
        onRemoveLogo={handleRemoveLogo}
        onRemoveBanner={handleRemoveBanner}
      />

      {/* Store Verification Card */}
      <StoreVerificationCard
        isVerified={storeData.isVerified}
        isActive={storeData.isActive}
        onToggleActive={handleToggleActive}
      />

      {/* Edit Store Modal */}
      <EditStoreModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveStore}
        initialData={{
          storeName: storeData.storeName,
          description: storeData.description || '',
          email: storeData.email,
          phoneNumber: storeData.phoneNumber,
          website: storeData.website || '',
        }}
      />
    </div>
  );
};
