import { useState } from 'react';
import {
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  BuildingStorefrontIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import type { StoreApplication } from './StoreApplicationCard';

interface ReviewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: StoreApplication | null;
  onApprove: (applicationId: string, commissionRate: number) => void;
  onReject: (applicationId: string, reason: string) => void;
}

export const ReviewApplicationModal = ({
  isOpen,
  onClose,
  application,
  onApprove,
  onReject,
}: ReviewApplicationModalProps) => {
  const [commissionRate, setCommissionRate] = useState('15');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  if (!isOpen || !application) return null;

  const handleApprove = () => {
    const rate = parseFloat(commissionRate);
    if (rate < 0 || rate > 100) {
      alert('Commission rate must be between 0 and 100');
      return;
    }
    onApprove(application.id, rate);
    handleClose();
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    onReject(application.id, rejectionReason);
    handleClose();
  };

  const handleClose = () => {
    setShowApproveConfirm(false);
    setShowRejectConfirm(false);
    setCommissionRate('15');
    setRejectionReason('');
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-neutral-200'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary-50 rounded-lg'>
              <BuildingStorefrontIcon className='h-6 w-6 text-primary-600' />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-neutral-900'>
                Review Store Application
              </h2>
              <p className='text-sm text-neutral-600'>
                {application.storeName}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className='text-neutral-400 hover:text-neutral-600'
          >
            <XMarkIcon className='h-6 w-6' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Store Images */}
          {(application.logoImageUrl || application.bannerImageUrl) && (
            <div>
              <h3 className='text-sm font-medium text-neutral-900 mb-3'>
                Store Images
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {application.logoImageUrl && (
                  <div>
                    <p className='text-xs text-neutral-600 mb-2'>Logo</p>
                    <img
                      src={application.logoImageUrl}
                      alt='Store logo'
                      className='w-full h-48 object-cover rounded-lg border border-neutral-200'
                    />
                  </div>
                )}
                {application.bannerImageUrl && (
                  <div>
                    <p className='text-xs text-neutral-600 mb-2'>Banner</p>
                    <img
                      src={application.bannerImageUrl}
                      alt='Store banner'
                      className='w-full h-48 object-cover rounded-lg border border-neutral-200'
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Store Information */}
          <div>
            <h3 className='text-sm font-medium text-neutral-900 mb-3'>
              Store Information
            </h3>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <BuildingStorefrontIcon className='h-5 w-5 text-neutral-400 mt-0.5' />
                <div>
                  <p className='text-xs text-neutral-600'>Store Name</p>
                  <p className='text-sm text-neutral-900 font-medium'>
                    {application.storeName}
                  </p>
                </div>
              </div>

              {application.description && (
                <div className='flex items-start gap-3'>
                  <PhotoIcon className='h-5 w-5 text-neutral-400 mt-0.5' />
                  <div>
                    <p className='text-xs text-neutral-600'>Description</p>
                    <p className='text-sm text-neutral-900'>
                      {application.description}
                    </p>
                  </div>
                </div>
              )}

              {application.website && (
                <div className='flex items-start gap-3'>
                  <GlobeAltIcon className='h-5 w-5 text-neutral-400 mt-0.5' />
                  <div>
                    <p className='text-xs text-neutral-600'>Website</p>
                    <a
                      href={application.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-primary-600 hover:text-primary-700 hover:underline'
                    >
                      {application.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Owner Information */}
          <div>
            <h3 className='text-sm font-medium text-neutral-900 mb-3'>
              Owner Information
            </h3>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <BuildingStorefrontIcon className='h-5 w-5 text-neutral-400 mt-0.5' />
                <div>
                  <p className='text-xs text-neutral-600'>Owner Name</p>
                  <p className='text-sm text-neutral-900 font-medium'>
                    {application.ownerName}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <EnvelopeIcon className='h-5 w-5 text-neutral-400 mt-0.5' />
                <div>
                  <p className='text-xs text-neutral-600'>Email</p>
                  <p className='text-sm text-neutral-900'>
                    {application.email}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <PhoneIcon className='h-5 w-5 text-neutral-400 mt-0.5' />
                <div>
                  <p className='text-xs text-neutral-600'>Phone Number</p>
                  <p className='text-sm text-neutral-900'>
                    {application.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className='text-sm font-medium text-neutral-900 mb-3'>
              Store Address
            </h3>
            <div className='flex items-start gap-3'>
              <MapPinIcon className='h-5 w-5 text-neutral-400 mt-0.5' />
              <div>
                <p className='text-sm text-neutral-900'>
                  {application.address.street}
                </p>
                <p className='text-sm text-neutral-900'>
                  {application.address.city}, {application.address.state}{' '}
                  {application.address.postalCode}
                </p>
                <p className='text-sm text-neutral-900'>
                  {application.address.country}
                </p>
              </div>
            </div>
          </div>

          {/* Approve Section */}
          {!showRejectConfirm && (
            <div className='border border-success-200 rounded-lg p-4 bg-success-50'>
              <h3 className='text-sm font-medium text-success-900 mb-3'>
                Approve Application
              </h3>
              {!showApproveConfirm ? (
                <div>
                  <label className='block text-sm text-neutral-700 mb-2'>
                    Commission Rate (%)
                  </label>
                  <input
                    type='number'
                    min='0'
                    max='100'
                    step='0.5'
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className='w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3'
                    placeholder='15.0'
                  />
                  <p className='text-xs text-neutral-600 mb-3'>
                    The store will pay this percentage on each sale as a
                    platform commission.
                  </p>
                  <button
                    onClick={() => setShowApproveConfirm(true)}
                    className='flex items-center gap-2 px-4 py-2 bg-success-600 text-white text-sm font-medium rounded-lg hover:bg-success-700 transition-colors'
                  >
                    <CheckCircleIcon className='h-5 w-5' />
                    Approve Store
                  </button>
                </div>
              ) : (
                <div>
                  <p className='text-sm text-success-900 mb-3'>
                    Are you sure you want to approve this store with a{' '}
                    {commissionRate}% commission rate?
                  </p>
                  <div className='flex gap-3'>
                    <button
                      onClick={handleApprove}
                      className='px-4 py-2 bg-success-600 text-white text-sm font-medium rounded-lg hover:bg-success-700 transition-colors'
                    >
                      Confirm Approval
                    </button>
                    <button
                      onClick={() => setShowApproveConfirm(false)}
                      className='px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reject Section */}
          {!showApproveConfirm && (
            <div className='border border-error-200 rounded-lg p-4 bg-error-50'>
              <h3 className='text-sm font-medium text-error-900 mb-3'>
                Reject Application
              </h3>
              {!showRejectConfirm ? (
                <div>
                  <label className='block text-sm text-neutral-700 mb-2'>
                    Reason for Rejection
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                    className='w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3'
                    placeholder='Explain why this application is being rejected...'
                  />
                  <button
                    onClick={() => setShowRejectConfirm(true)}
                    className='flex items-center gap-2 px-4 py-2 bg-error-600 text-white text-sm font-medium rounded-lg hover:bg-error-700 transition-colors'
                  >
                    <XCircleIcon className='h-5 w-5' />
                    Reject Store
                  </button>
                </div>
              ) : (
                <div>
                  <p className='text-sm text-error-900 mb-3'>
                    Are you sure you want to reject this application? The store
                    owner will be notified.
                  </p>
                  <div className='flex gap-3'>
                    <button
                      onClick={handleReject}
                      className='px-4 py-2 bg-error-600 text-white text-sm font-medium rounded-lg hover:bg-error-700 transition-colors'
                    >
                      Confirm Rejection
                    </button>
                    <button
                      onClick={() => setShowRejectConfirm(false)}
                      className='px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
