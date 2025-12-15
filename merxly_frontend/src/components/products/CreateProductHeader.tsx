import { Button } from '../ui/Button';

interface CreateProductHeaderProps {
  productName: string;
  onDiscard: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export const CreateProductHeader = ({
  productName,
  onDiscard,
  onSave,
  isSaving,
}: CreateProductHeaderProps) => {
  return (
    <div className='h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <button
          onClick={onDiscard}
          className='cursor-pointer text-neutral-600 hover:text-neutral-900'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M15 19l-7-7 7-7'></path>
          </svg>
        </button>
        <h1 className='text-lg font-semibold text-neutral-900'>
          {productName || 'Unsaved product'}
        </h1>
      </div>

      <div className='flex items-center gap-3'>
        <Button variant='outline' onClick={onDiscard}>
          Discard
        </Button>
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};
