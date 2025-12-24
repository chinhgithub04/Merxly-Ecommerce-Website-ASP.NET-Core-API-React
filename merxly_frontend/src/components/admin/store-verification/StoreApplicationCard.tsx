import {
  BuildingStorefrontIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export interface StoreApplication {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  description?: string;
  website?: string;
  logoImageUrl?: string;
  bannerImageUrl?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface StoreApplicationCardProps {
  application: StoreApplication;
  onReview: (application: StoreApplication) => void;
}

export const StoreApplicationCard = ({
  application,
  onReview,
}: StoreApplicationCardProps) => {
  const getStatusBadge = () => {
    switch (application.status) {
      case 'pending':
        return (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800'>
            <ClockIcon className='h-3 w-3 mr-1' />
            Pending Review
          </span>
        );
      case 'approved':
        return (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800'>
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800'>
            Rejected
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow'>
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-start gap-4'>
          {/* Logo */}
          {application.logoImageUrl ? (
            <img
              src={application.logoImageUrl}
              alt={application.storeName}
              className='h-16 w-16 rounded-lg object-cover border border-neutral-200'
            />
          ) : (
            <div className='h-16 w-16 rounded-lg bg-neutral-100 flex items-center justify-center border border-neutral-200'>
              <BuildingStorefrontIcon className='h-8 w-8 text-neutral-400' />
            </div>
          )}

          {/* Store Info */}
          <div>
            <h3 className='text-lg font-semibold text-neutral-900 mb-1'>
              {application.storeName}
            </h3>
            <p className='text-sm text-neutral-600 mb-2'>
              Owner: {application.ownerName}
            </p>
            {getStatusBadge()}
          </div>
        </div>

        {/* Action Button */}
        {application.status === 'pending' && (
          <button
            onClick={() => onReview(application)}
            className='px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors'
          >
            Review Application
          </button>
        )}
      </div>

      {/* Description */}
      {application.description && (
        <p className='text-sm text-neutral-600 mb-4 line-clamp-2'>
          {application.description}
        </p>
      )}

      {/* Contact Details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-4'>
        <div className='flex items-center gap-2 text-sm text-neutral-600'>
          <EnvelopeIcon className='h-4 w-4 text-neutral-400' />
          {application.email}
        </div>
        <div className='flex items-center gap-2 text-sm text-neutral-600'>
          <PhoneIcon className='h-4 w-4 text-neutral-400' />
          {application.phoneNumber}
        </div>
        <div className='flex items-center gap-2 text-sm text-neutral-600'>
          <MapPinIcon className='h-4 w-4 text-neutral-400' />
          {application.address.city}, {application.address.state}
        </div>
        <div className='flex items-center gap-2 text-sm text-neutral-600'>
          <CalendarIcon className='h-4 w-4 text-neutral-400' />
          Submitted {formatDate(application.submittedAt)}
        </div>
      </div>

      {/* Website */}
      {application.website && (
        <a
          href={application.website}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-primary-600 hover:text-primary-700 hover:underline'
        >
          {application.website}
        </a>
      )}
    </div>
  );
};
