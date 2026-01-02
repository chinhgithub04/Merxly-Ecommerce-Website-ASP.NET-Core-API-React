import { MapPinIcon } from '@heroicons/react/24/outline';

interface OrderCustomerAddressProps {
  fullAddress: string;
  postalCode: string;
}

export const OrderCustomerAddress = ({
  fullAddress,
  postalCode,
}: OrderCustomerAddressProps) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-neutral-900'>
        Shipping Address
      </h3>
      <div className='flex items-start gap-3'>
        <div className='p-2 bg-neutral-100 rounded-lg'>
          <MapPinIcon className='h-5 w-5 text-neutral-600' />
        </div>
        <div>
          <p className='font-medium text-neutral-900'>{fullAddress}</p>
          <p className='text-sm text-neutral-500'>Postal Code: {postalCode}</p>
        </div>
      </div>
    </div>
  );
};
