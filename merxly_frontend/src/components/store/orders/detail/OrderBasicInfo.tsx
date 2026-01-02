import {
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

interface OrderBasicInfoProps {
  subOrderNumber: string;
  totalItems: number;
  createdAt: string;
}

export const OrderBasicInfo = ({
  subOrderNumber,
  totalItems,
  createdAt,
}: OrderBasicInfoProps) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const { date, time } = formatDateTime(createdAt);

  return (
    <div className='flex flex-wrap items-center gap-6'>
      <div className='flex items-center gap-2'>
        <ClipboardDocumentListIcon className='h-5 w-5 text-neutral-400' />
        <span className='font-medium text-neutral-900'>{subOrderNumber}</span>
      </div>
      <div className='flex items-center gap-2'>
        <ShoppingCartIcon className='h-5 w-5 text-neutral-400' />
        <span className='text-neutral-600'>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <CalendarDaysIcon className='h-5 w-5 text-neutral-400' />
        <span className='text-neutral-600'>
          {date} at {time}
        </span>
      </div>
    </div>
  );
};
