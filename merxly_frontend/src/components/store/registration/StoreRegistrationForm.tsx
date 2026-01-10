import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  PhotoIcon,
  XMarkIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import type { CreateStoreDto } from '../../../types/models/store';
import { uploadImage } from '../../../services/uploadService';

interface StoreRegistrationFormProps {
  onSubmit: (data: CreateStoreDto) => Promise<void>;
}

interface FormData extends CreateStoreDto {
  logoFile?: File;
  bannerFile?: File;
  identityCardFrontFile?: File;
  identityCardBackFile?: File;
  bussinessLicenseFile?: File;
}

export const StoreRegistrationForm = ({
  onSubmit,
}: StoreRegistrationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      storeName: '',
      description: '',
      email: '',
      phoneNumber: '',
      website: '',
      taxCode: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhoneNumber: '',
      logoImagePublicId: '',
      bannerImagePublicId: '',
      identityCardFrontPublicId: '',
      identityCardBackPublicId: '',
      bussinessLicensePublicId: '',
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);

  const handleFileUpload = async (
    file: File,
    fieldName: keyof FormData,
    setPreview: (url: string | null) => void,
    imageType: number = 0
  ) => {
    try {
      setUploadingFile(fieldName);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const response = await uploadImage(file, 'store-registration', imageType);

      if (response.isSuccess && response.data) {
        setValue(fieldName as any, response.data.publicId);
      }
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Failed to upload file. Please try again.');
      setPreview(null);
    } finally {
      setUploadingFile(null);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'logoImagePublicId', setLogoPreview, 0);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'bannerImagePublicId', setBannerPreview, 0);
    }
  };

  const handleIdFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'identityCardFrontPublicId', setIdFrontPreview, 0);
    }
  };

  const handleIdBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'identityCardBackPublicId', setIdBackPreview, 0);
    }
  };

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'bussinessLicensePublicId', setLicensePreview, 0);
    }
  };

  const handleRemoveFile = (
    fieldName: keyof FormData,
    setPreview: (url: string | null) => void
  ) => {
    setPreview(null);
    setValue(fieldName as any, '');
  };

  const onFormSubmit = async (data: FormData) => {
    const createStoreDto: CreateStoreDto = {
      storeName: data.storeName,
      description: data.description || null,
      logoImagePublicId: data.logoImagePublicId || null,
      bannerImagePublicId: data.bannerImagePublicId || null,
      identityCardFrontPublicId: data.identityCardFrontPublicId,
      identityCardBackPublicId: data.identityCardBackPublicId,
      bussinessLicensePublicId: data.bussinessLicensePublicId,
      taxCode: data.taxCode,
      email: data.email,
      phoneNumber: data.phoneNumber,
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPhoneNumber: data.ownerPhoneNumber || null,
      website: data.website || null,
    };

    await onSubmit(createStoreDto);
  };

  const handleFinalSubmit = () => {
    // Validate required documents before submitting
    if (!idFrontPreview || !idBackPreview || !licensePreview) {
      alert(
        'Please upload all required documents (Identity Card Front/Back and Business License)'
      );
      return;
    }

    // Trigger form submission using react-hook-form
    handleSubmit(onFormSubmit)();
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='space-y-8'>
      {/* Progress Steps */}
      <div className='flex items-center justify-center'>
        <div className='flex items-center gap-4'>
          {[1, 2, 3].map((step) => (
            <div key={step} className='flex items-center'>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                  step === currentStep
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : step < currentStep
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-neutral-300 bg-white text-neutral-500'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 h-0.5 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-neutral-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Store Information */}
      {currentStep === 1 && (
        <div className='space-y-6'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-neutral-900'>
              Store Information
            </h2>
            <p className='text-neutral-600 mt-1'>Tell us about your store</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-2'>
              Store Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...register('storeName', { required: 'Store name is required' })}
              placeholder='Enter your store name'
              className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
            />
            {errors.storeName && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.storeName.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-2'>
              Description
            </label>
            <textarea
              {...register('description')}
              placeholder='Describe your store and what you sell'
              rows={4}
              className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-2'>
              Tax Code <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...register('taxCode', { required: 'Tax code is required' })}
              placeholder='Enter your business tax code'
              className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
            />
            {errors.taxCode && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.taxCode.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-neutral-700 mb-2'>
                Store Email <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder='store@example.com'
                className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-neutral-700 mb-2'>
                Store Phone Number <span className='text-red-500'>*</span>
              </label>
              <input
                type='tel'
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                })}
                placeholder='0912345678'
                className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              />
              {errors.phoneNumber && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-2'>
              Website
            </label>
            <input
              type='url'
              {...register('website')}
              placeholder='https://www.yourstore.com'
              className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
            />
          </div>
        </div>
      )}

      {/* Step 2: Owner Information */}
      {currentStep === 2 && (
        <div className='space-y-6'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-neutral-900'>
              Owner Information
            </h2>
            <p className='text-neutral-600 mt-1'>
              Tell us about the store owner
            </p>
          </div>

          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-2'>
              Owner Full Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...register('ownerName', {
                required: 'Owner name is required',
              })}
              placeholder='Enter owner full name'
              className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
            />
            {errors.ownerName && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.ownerName.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-neutral-700 mb-2'>
                Owner Email <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                {...register('ownerEmail', {
                  required: 'Owner email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder='owner@example.com'
                className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              />
              {errors.ownerEmail && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.ownerEmail.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-neutral-700 mb-2'>
                Owner Phone Number
              </label>
              <input
                type='tel'
                {...register('ownerPhoneNumber')}
                placeholder='0912345678'
                className='w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Images & Documents */}
      {currentStep === 3 && (
        <div className='space-y-6'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-neutral-900'>
              Store Images & Documents
            </h2>
            <p className='text-neutral-600 mt-1'>
              Upload your store images and required business documents
            </p>
          </div>

          {/* Required Documents Section */}
          <div className='p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6'>
            <h3 className='text-sm font-semibold text-amber-900 mb-1'>
              Required Documents
            </h3>
            <p className='text-sm text-amber-800'>
              Please upload clear images of your Citizen Identity Card (both
              sides) and Business License
            </p>
          </div>

          {/* Identity Cards (Side by Side) */}
          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-3'>
              Citizen Identity Card (Căn cước công dân){' '}
              <span className='text-red-500'>*</span>
            </label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Front Side */}
              <div>
                <p className='text-xs text-neutral-600 mb-2 font-medium'>
                  Front Side
                </p>
                <div className='space-y-3'>
                  {idFrontPreview ? (
                    <div className='relative'>
                      <img
                        src={idFrontPreview}
                        alt='ID front preview'
                        className='w-full h-40 object-contain rounded-lg border border-neutral-200 bg-neutral-50'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          handleRemoveFile(
                            'identityCardFrontPublicId',
                            setIdFrontPreview
                          )
                        }
                        className='cursor-pointer absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'
                      >
                        <XMarkIcon className='h-4 w-4' />
                      </button>
                    </div>
                  ) : (
                    <div className='w-full h-40 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50'>
                      <div className='text-center'>
                        <DocumentIcon className='h-10 w-10 text-neutral-400 mx-auto mb-2' />
                        <p className='text-xs text-neutral-600'>
                          No image uploaded
                        </p>
                      </div>
                    </div>
                  )}

                  <label
                    htmlFor='id-front-upload'
                    className='inline-flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer'
                  >
                    <ArrowUpTrayIcon className='h-4 w-4' />
                    {uploadingFile === 'identityCardFrontPublicId'
                      ? 'Uploading...'
                      : idFrontPreview
                      ? 'Change'
                      : 'Upload'}
                  </label>
                  <input
                    id='id-front-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleIdFrontChange}
                    disabled={uploadingFile === 'identityCardFrontPublicId'}
                    className='hidden'
                  />
                </div>
              </div>

              {/* Back Side */}
              <div>
                <p className='text-xs text-neutral-600 mb-2 font-medium'>
                  Back Side
                </p>
                <div className='space-y-3'>
                  {idBackPreview ? (
                    <div className='relative'>
                      <img
                        src={idBackPreview}
                        alt='ID back preview'
                        className='w-full h-40 object-contain rounded-lg border border-neutral-200 bg-neutral-50'
                      />
                      <button
                        type='button'
                        onClick={() =>
                          handleRemoveFile(
                            'identityCardBackPublicId',
                            setIdBackPreview
                          )
                        }
                        className='cursor-pointer absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'
                      >
                        <XMarkIcon className='h-4 w-4' />
                      </button>
                    </div>
                  ) : (
                    <div className='w-full h-40 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50'>
                      <div className='text-center'>
                        <DocumentIcon className='h-10 w-10 text-neutral-400 mx-auto mb-2' />
                        <p className='text-xs text-neutral-600'>
                          No image uploaded
                        </p>
                      </div>
                    </div>
                  )}

                  <label
                    htmlFor='id-back-upload'
                    className='inline-flex items-center gap-2 px-3 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer'
                  >
                    <ArrowUpTrayIcon className='h-4 w-4' />
                    {uploadingFile === 'identityCardBackPublicId'
                      ? 'Uploading...'
                      : idBackPreview
                      ? 'Change'
                      : 'Upload'}
                  </label>
                  <input
                    id='id-back-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleIdBackChange}
                    disabled={uploadingFile === 'identityCardBackPublicId'}
                    className='hidden'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business License */}
          <div>
            <label className='block text-sm font-medium text-neutral-700 mb-3'>
              Business License <span className='text-red-500'>*</span>
            </label>
            <div className='space-y-4'>
              {licensePreview ? (
                <div className='relative max-w-lg mx-auto'>
                  <img
                    src={licensePreview}
                    alt='License preview'
                    className='w-full h-72 object-contain rounded-lg border border-neutral-200 bg-neutral-50'
                  />
                  <button
                    type='button'
                    onClick={() =>
                      handleRemoveFile(
                        'bussinessLicensePublicId',
                        setLicensePreview
                      )
                    }
                    className='cursor-pointer absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'
                  >
                    <XMarkIcon className='h-4 w-4' />
                  </button>
                </div>
              ) : (
                <div className='max-w-lg w-full h-72 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50'>
                  <div className='text-center'>
                    <DocumentIcon className='h-12 w-12 text-neutral-400 mx-auto mb-2' />
                    <p className='text-sm text-neutral-600'>
                      No image uploaded
                    </p>
                  </div>
                </div>
              )}

              <div className=''>
                <label
                  htmlFor='license-upload'
                  className='inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer'
                >
                  <ArrowUpTrayIcon className='h-5 w-5' />
                  {uploadingFile === 'bussinessLicensePublicId'
                    ? 'Uploading...'
                    : licensePreview
                    ? 'Change'
                    : 'Upload'}
                </label>
                <input
                  id='license-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleLicenseChange}
                  disabled={uploadingFile === 'bussinessLicensePublicId'}
                  className='hidden'
                />
              </div>
            </div>
          </div>

          {/* Optional Images Section */}
          <div className='pt-6 border-t border-neutral-200'>
            <h3 className='text-lg font-semibold text-neutral-900 mb-4'>
              Store Images (Optional)
            </h3>

            {/* Logo */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-neutral-700 mb-3'>
                Store Logo
              </label>
              <div className='flex gap-4'>
                {logoPreview ? (
                  <div className='relative'>
                    <img
                      src={logoPreview}
                      alt='Store logo preview'
                      className='w-32 h-32 object-cover rounded-lg border border-neutral-200'
                    />
                    <button
                      type='button'
                      onClick={() =>
                        handleRemoveFile('logoImagePublicId', setLogoPreview)
                      }
                      className='cursor-pointer absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'
                    >
                      <XMarkIcon className='h-4 w-4' />
                    </button>
                  </div>
                ) : (
                  <div className='w-32 h-32 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50'>
                    <PhotoIcon className='h-12 w-12 text-neutral-400' />
                  </div>
                )}

                <div className='flex-1'>
                  <label
                    htmlFor='logo-upload'
                    className='inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer'
                  >
                    <ArrowUpTrayIcon className='h-5 w-5' />
                    {uploadingFile === 'logoImagePublicId'
                      ? 'Uploading...'
                      : logoPreview
                      ? 'Change Logo'
                      : 'Upload Logo'}
                  </label>
                  <input
                    id='logo-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleLogoChange}
                    disabled={uploadingFile === 'logoImagePublicId'}
                    className='hidden'
                  />
                  <p className='text-xs text-neutral-500 mt-2'>
                    Recommended: Square image, at least 200x200px
                  </p>
                </div>
              </div>
            </div>

            {/* Banner */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-neutral-700 mb-3'>
                Store Banner
              </label>
              <div className='space-y-4'>
                {bannerPreview ? (
                  <div className='relative'>
                    <img
                      src={bannerPreview}
                      alt='Store banner preview'
                      className='w-full h-48 object-cover rounded-lg border border-neutral-200'
                    />
                    <button
                      type='button'
                      onClick={() =>
                        handleRemoveFile(
                          'bannerImagePublicId',
                          setBannerPreview
                        )
                      }
                      className='cursor-pointer absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors'
                    >
                      <XMarkIcon className='h-4 w-4' />
                    </button>
                  </div>
                ) : (
                  <div className='w-full h-48 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50'>
                    <div className='text-center'>
                      <PhotoIcon className='h-12 w-12 text-neutral-400 mx-auto mb-2' />
                      <p className='text-sm text-neutral-600'>
                        No banner image
                      </p>
                    </div>
                  </div>
                )}

                <label
                  htmlFor='banner-upload'
                  className='inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer'
                >
                  <ArrowUpTrayIcon className='h-5 w-5' />
                  {uploadingFile === 'bannerImagePublicId'
                    ? 'Uploading...'
                    : bannerPreview
                    ? 'Change Banner'
                    : 'Upload Banner'}
                </label>
                <input
                  id='banner-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleBannerChange}
                  disabled={uploadingFile === 'bannerImagePublicId'}
                  className='hidden'
                />
                <p className='text-xs text-neutral-500 mt-2'>
                  Recommended: Wide image, at least 1200x400px
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className='flex justify-between pt-6 border-t border-neutral-200'>
        {currentStep > 1 ? (
          <button
            type='button'
            onClick={prevStep}
            disabled={isSubmitting}
            className='cursor-pointer px-6 py-3 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 transition-colors font-medium disabled:opacity-50'
          >
            Previous
          </button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <button
            type='button'
            onClick={nextStep}
            className='cursor-pointer px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium'
          >
            Next
          </button>
        ) : (
          <button
            type='button'
            onClick={handleFinalSubmit}
            disabled={isSubmitting || uploadingFile !== null}
            className='cursor-pointer px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors font-medium disabled:opacity-50'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        )}
      </div>
    </form>
  );
};
