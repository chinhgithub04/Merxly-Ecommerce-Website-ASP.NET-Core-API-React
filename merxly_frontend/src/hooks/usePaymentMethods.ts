import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  removePaymentMethod,
} from '../services/paymentMethodService';
import type { AddPaymentMethodDto } from '../types/models/paymentMethod';
import { toast } from 'react-toastify';

export const usePaymentMethods = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: getPaymentMethods,
  });

  const addPaymentMethodMutation = useMutation({
    mutationFn: addPaymentMethod,
    onSuccess: () => {
      toast.success('Payment method added successfully');
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to add payment method: ${error.message}`);
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: setDefaultPaymentMethod,
    onSuccess: () => {
      toast.success('Default payment method updated successfully');
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to set default payment method: ${error.message}`);
    },
  });

  const removePaymentMethodMutation = useMutation({
    mutationFn: removePaymentMethod,
    onSuccess: () => {
      toast.success('Payment method removed successfully');
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove payment method: ${error.message}`);
    },
  });

  return {
    paymentMethods: data?.data || [],
    isLoading,
    error,
    addPaymentMethod: (dto: AddPaymentMethodDto) =>
      addPaymentMethodMutation.mutateAsync(dto),
    setDefaultPaymentMethod: (paymentMethodId: string) =>
      setDefaultMutation.mutateAsync(paymentMethodId),
    removePaymentMethod: (paymentMethodId: string) =>
      removePaymentMethodMutation.mutateAsync(paymentMethodId),
    isAddingPaymentMethod: addPaymentMethodMutation.isPending,
    isSettingDefault: setDefaultMutation.isPending,
    isRemovingPaymentMethod: removePaymentMethodMutation.isPending,
  };
};
