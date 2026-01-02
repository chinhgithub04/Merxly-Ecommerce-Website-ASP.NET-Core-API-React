import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface OrderCustomerInfoProps {
  fullName: string;
  email: string;
  phoneNumber?: string;
}

export const OrderCustomerInfo = ({
  fullName,
  email,
  phoneNumber,
}: OrderCustomerInfoProps) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-neutral-900'>
        Customer Information
      </h3>
      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-neutral-100 rounded-lg'>
            <UserIcon className='h-5 w-5 text-neutral-600' />
          </div>
          <div>
            <p className='text-sm text-neutral-500'>Name</p>
            <p className='font-medium text-neutral-900'>{fullName}</p>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-neutral-100 rounded-lg'>
            <EnvelopeIcon className='h-5 w-5 text-neutral-600' />
          </div>
          <div>
            <p className='text-sm text-neutral-500'>Email</p>
            <p className='font-medium text-neutral-900'>{email}</p>
          </div>
        </div>
        {phoneNumber && (
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-neutral-100 rounded-lg'>
              <PhoneIcon className='h-5 w-5 text-neutral-600' />
            </div>
            <div>
              <p className='text-sm text-neutral-500'>Phone</p>
              <p className='font-medium text-neutral-900'>{phoneNumber}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
