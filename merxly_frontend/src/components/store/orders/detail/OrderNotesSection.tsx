import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface OrderNotesSectionProps {
  notes?: string;
}

export const OrderNotesSection = ({ notes }: OrderNotesSectionProps) => {
  if (!notes) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-neutral-900'>Order Notes</h3>
      <div className='flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg'>
        <ChatBubbleLeftRightIcon className='h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5' />
        <p className='text-neutral-700'>{notes}</p>
      </div>
    </div>
  );
};
