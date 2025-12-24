import { useState } from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import {
  StoreApplicationCard,
  type StoreApplication,
} from '../../components/admin/store-verification/StoreApplicationCard';
import { ReviewApplicationModal } from '../../components/admin/store-verification/ReviewApplicationModal';

// Mock data for store applications
const mockApplications: StoreApplication[] = [
  {
    id: '1',
    storeName: 'TechHub Electronics',
    ownerName: 'John Smith',
    email: 'john.smith@techhub.com',
    phoneNumber: '+1 (555) 123-4567',
    description:
      'Premium electronics store specializing in latest smartphones, laptops, and accessories. We offer competitive prices and excellent customer service.',
    website: 'https://techhub-electronics.com',
    logoImageUrl: 'https://placehold.co/200',
    bannerImageUrl: 'https://placehold.co/800x200',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'United States',
    },
    submittedAt: '2025-12-20T10:30:00Z',
    status: 'pending',
  },
  {
    id: '2',
    storeName: 'Fashion Forward Boutique',
    ownerName: 'Sarah Johnson',
    email: 'sarah@fashionforward.com',
    phoneNumber: '+1 (555) 234-5678',
    description:
      'Trendy fashion boutique offering the latest styles in clothing, shoes, and accessories for men and women.',
    website: 'https://fashionforward.com',
    logoImageUrl: 'https://placehold.co/200',
    address: {
      street: '456 Fashion Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    submittedAt: '2025-12-21T14:15:00Z',
    status: 'pending',
  },
  {
    id: '3',
    storeName: 'Green Garden Supplies',
    ownerName: 'Michael Brown',
    email: 'michael@greengarden.com',
    phoneNumber: '+1 (555) 345-6789',
    description:
      'Your one-stop shop for all gardening needs. From seeds to tools, we have everything to make your garden flourish.',
    logoImageUrl: 'https://placehold.co/200',
    bannerImageUrl: 'https://placehold.co/800x200',
    address: {
      street: '789 Garden Lane',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'United States',
    },
    submittedAt: '2025-12-22T09:00:00Z',
    status: 'pending',
  },
  {
    id: '4',
    storeName: 'Fitness Pro Store',
    ownerName: 'Emily Davis',
    email: 'emily@fitnesspro.com',
    phoneNumber: '+1 (555) 456-7890',
    description:
      'Professional fitness equipment and supplements for athletes and fitness enthusiasts.',
    address: {
      street: '321 Fitness Blvd',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'United States',
    },
    submittedAt: '2025-12-18T16:45:00Z',
    status: 'approved',
  },
  {
    id: '5',
    storeName: 'BookWorm Paradise',
    ownerName: 'David Wilson',
    email: 'david@bookworm.com',
    phoneNumber: '+1 (555) 567-8901',
    description: 'Incomplete application - missing required information.',
    address: {
      street: '654 Reading Road',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States',
    },
    submittedAt: '2025-12-19T11:20:00Z',
    status: 'rejected',
  },
];

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

export const AdminStoreVerificationPage = () => {
  const [applications, setApplications] =
    useState<StoreApplication[]>(mockApplications);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedApplication, setSelectedApplication] =
    useState<StoreApplication | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleReview = (application: StoreApplication) => {
    setSelectedApplication(application);
    setIsReviewModalOpen(true);
  };

  const handleApprove = (applicationId: string, commissionRate: number) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: 'approved' } : app
      )
    );
    console.log(
      `Approved application ${applicationId} with commission rate ${commissionRate}%`
    );
  };

  const handleReject = (applicationId: string, reason: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      )
    );
    console.log(`Rejected application ${applicationId}. Reason: ${reason}`);
  };

  const filteredApplications =
    filterStatus === 'all'
      ? applications
      : applications.filter((app) => app.status === filterStatus);

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === 'pending').length,
    approved: applications.filter((app) => app.status === 'approved').length,
    rejected: applications.filter((app) => app.status === 'rejected').length,
  };

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-primary-50 rounded-lg'>
          <CheckBadgeIcon className='h-6 w-6 text-primary-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-neutral-900'>
            Store Verification
          </h1>
          <p className='text-sm text-neutral-600'>
            Review and approve new store registration applications
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Total Applications</p>
          <p className='text-3xl font-bold text-neutral-900'>{stats.total}</p>
        </div>
        <div className='bg-white rounded-lg border border-warning-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Pending Review</p>
          <p className='text-3xl font-bold text-warning-600'>{stats.pending}</p>
        </div>
        <div className='bg-white rounded-lg border border-success-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Approved</p>
          <p className='text-3xl font-bold text-success-600'>
            {stats.approved}
          </p>
        </div>
        <div className='bg-white rounded-lg border border-error-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Rejected</p>
          <p className='text-3xl font-bold text-error-600'>{stats.rejected}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className='bg-white rounded-lg border border-neutral-200 p-1 inline-flex'>
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            filterStatus === 'all'
              ? 'bg-primary-50 text-primary-700'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            filterStatus === 'pending'
              ? 'bg-warning-50 text-warning-700'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Pending ({stats.pending})
        </button>
        <button
          onClick={() => setFilterStatus('approved')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            filterStatus === 'approved'
              ? 'bg-success-50 text-success-700'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Approved ({stats.approved})
        </button>
        <button
          onClick={() => setFilterStatus('rejected')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            filterStatus === 'rejected'
              ? 'bg-error-50 text-error-700'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Rejected ({stats.rejected})
        </button>
      </div>

      {/* Applications List */}
      <div className='space-y-4'>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <StoreApplicationCard
              key={application.id}
              application={application}
              onReview={handleReview}
            />
          ))
        ) : (
          <div className='bg-white rounded-lg border border-neutral-200 p-12 text-center'>
            <CheckBadgeIcon className='h-12 w-12 text-neutral-300 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-neutral-900 mb-2'>
              No Applications Found
            </h3>
            <p className='text-neutral-600'>
              There are no {filterStatus === 'all' ? '' : filterStatus}{' '}
              applications to display.
            </p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewApplicationModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        application={selectedApplication}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};
