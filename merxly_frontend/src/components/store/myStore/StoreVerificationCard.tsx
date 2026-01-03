import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Modal } from '../../ui/Modal';

interface StoreVerificationCardProps {
  isVerified: boolean;
  isActive: boolean;
  onToggleActive: (isActive: boolean) => void;
}

export const StoreVerificationCard = ({
  isVerified,
  isActive,
  onToggleActive,
}: StoreVerificationCardProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleToggleClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    onToggleActive(!isActive);
    setIsConfirmModalOpen(false);
  };
  return (
    <div className='bg-white rounded-lg border border-neutral-200'>
      <div className='p-6 border-b border-neutral-200'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary-50 rounded-lg'>
            <ShieldCheckIcon className='h-6 w-6 text-primary-600' />
          </div>
          <div>
            <h2 className='text-lg font-semibold text-neutral-900'>
              Store Status & Verification
            </h2>
            <p className='text-sm text-neutral-600'>
              Your store's operational status
            </p>
          </div>
        </div>
      </div>

      <div className='p-6 space-y-6'>
        {/* Store Active Status */}
        <div className='flex items-start gap-4 p-4 bg-neutral-50 rounded-lg'>
          <div>
            {isActive ? (
              <div className='p-2 bg-success-100 rounded-full'>
                <CheckCircleIcon className='h-6 w-6 text-success-600' />
              </div>
            ) : (
              <div className='p-2 bg-error-100 rounded-full'>
                <ExclamationTriangleIcon className='h-6 w-6 text-error-600' />
              </div>
            )}
          </div>
          <div className='flex-1'>
            <h3 className='text-base font-semibold text-neutral-900 mb-1'>
              Store Status: {isActive ? 'Active' : 'Inactive'}
            </h3>
            {isActive ? (
              <p className='text-sm text-neutral-600 mb-3'>
                Your store is currently active and visible to customers. You can
                receive orders and process sales.
              </p>
            ) : (
              <p className='text-sm text-neutral-600 mb-3'>
                Your store is currently inactive. Customers cannot see your
                store or place orders. Activate your store to start selling.
              </p>
            )}
            <button
              onClick={handleToggleClick}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-error-600 text-white hover:bg-error-700'
                  : 'bg-success-600 text-white hover:bg-success-700'
              }`}
            >
              {isActive ? 'Deactivate Store' : 'Activate Store'}
            </button>
          </div>
        </div>

        {/* Verification Status */}
        <div className='flex items-start gap-4 p-4 bg-neutral-50 rounded-lg'>
          <div>
            {isVerified ? (
              <div className='p-2 bg-success-100 rounded-full'>
                <CheckCircleIcon className='h-6 w-6 text-success-600' />
              </div>
            ) : (
              <div className='p-2 bg-yellow-100 rounded-full'>
                <ClockIcon className='h-6 w-6 text-yellow-600' />
              </div>
            )}
          </div>
          <div className='flex-1'>
            <h3 className='text-base font-semibold text-neutral-900 mb-1'>
              Verification: {isVerified ? 'Verified' : 'Pending'}
            </h3>
            {isVerified ? (
              <div>
                <p className='text-sm text-neutral-600 mb-2'>
                  Your store has been verified by our team. Verified stores
                  enjoy:
                </p>
                <ul className='text-sm text-neutral-600 space-y-1 ml-4 list-disc'>
                  <li>Verified badge on store page</li>
                  <li>Higher visibility in search results</li>
                  <li>Increased customer trust</li>
                  <li>Access to premium features</li>
                </ul>
              </div>
            ) : (
              <div>
                <p className='text-sm text-neutral-600 mb-3'>
                  Your store verification is currently pending review. Our team
                  is reviewing your store information and will notify you once
                  approved.
                </p>
                <div className='p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
                  <p className='text-sm text-yellow-800'>
                    <span className='font-semibold'>
                      Required for verification:
                    </span>
                  </p>
                  <ul className='text-sm text-yellow-700 mt-2 space-y-1 ml-4 list-disc'>
                    <li>Complete store information</li>
                    <li>Valid business documentation</li>
                    <li>Connected payment account</li>
                    <li>Store address verification</li>
                  </ul>
                </div>
                <button className='cursor-pointer mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium'>
                  Request Verification
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <p className='text-sm text-blue-800'>
            <span className='font-semibold'>Need help?</span> If you have
            questions about store status or verification, please contact our
            support team.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onDone={handleConfirm}
        title={isActive ? 'Deactivate Store' : 'Activate Store'}
        doneLabel='Confirm'
        cancelLabel='Cancel'
      >
        <div className='space-y-4'>
          {isActive ? (
            <>
              <p className='text-neutral-700'>
                Are you sure you want to deactivate your store? When
                deactivated:
              </p>
              <ul className='list-disc list-inside text-sm text-neutral-600 space-y-2 ml-2'>
                <li>Your store will not be visible to customers</li>
                <li>Customers cannot place new orders</li>
                <li>Existing orders will remain active</li>
                <li>You can reactivate your store at any time</li>
              </ul>
              <div className='p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-4'>
                <p className='text-sm text-yellow-800'>
                  <span className='font-semibold'>Note:</span> This action will
                  temporarily suspend your store's operations.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className='text-neutral-700'>
                Are you sure you want to activate your store? When activated:
              </p>
              <ul className='list-disc list-inside text-sm text-neutral-600 space-y-2 ml-2'>
                <li>Your store will be visible to customers</li>
                <li>Customers can browse your products</li>
                <li>You can receive and process orders</li>
                <li>Your store will appear in search results</li>
              </ul>
              <div className='p-3 bg-green-50 border border-green-200 rounded-lg mt-4'>
                <p className='text-sm text-green-800'>
                  <span className='font-semibold'>Ready to sell:</span> Make
                  sure your store information and products are up to date.
                </p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
