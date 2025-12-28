import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { XMarkIcon } from '@heroicons/react/24/outline';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
);

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentMethodId: string) => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
};

const PaymentMethodForm = ({
  onSuccess,
  onClose,
}: {
  onSuccess: (paymentMethodId: string) => void;
  onClose: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

      if (stripeError) {
        setError(stripeError.message || 'An error occurred');
        setIsProcessing(false);
        return;
      }

      if (paymentMethod) {
        onSuccess(paymentMethod.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label className='block text-sm font-medium text-neutral-700 mb-2'>
          Card Information
        </label>
        <div className='border border-neutral-300 rounded-lg p-4 bg-white'>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      )}

      <div className='flex items-center justify-end gap-3 pt-4 border-t border-neutral-200'>
        <button
          type='button'
          onClick={onClose}
          className='cursor-pointer px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={!stripe || isProcessing}
          className='cursor-pointer px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isProcessing ? 'Processing...' : 'Add Payment Method'}
        </button>
      </div>
    </form>
  );
};

export const AddPaymentMethodModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddPaymentMethodModalProps) => {
  const handleSuccess = (paymentMethodId: string) => {
    onSuccess(paymentMethodId);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className='fixed inset-0 z-50 bg-black/50 transition-opacity'
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
        <div
          className='bg-white rounded-lg shadow-xl max-w-md w-full pointer-events-auto'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-200'>
            <h2 className='text-lg font-semibold text-neutral-900'>
              Add Payment Method
            </h2>
            <button
              type='button'
              onClick={onClose}
              className='cursor-pointer p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors'
            >
              <XMarkIcon className='w-5 h-5' />
            </button>
          </div>

          {/* Body */}
          <div className='px-6 py-4'>
            <Elements stripe={stripePromise}>
              <PaymentMethodForm onSuccess={handleSuccess} onClose={onClose} />
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};
