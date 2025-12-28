import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  removePaymentMethod,
} from '../services/paymentMethodService';
import type { AddPaymentMethodDto } from '../types/models/paymentMethod';

export const usePaymentMethods = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['paymentMethods'],
    queryFn: getPaymentMethods,
  });

  const addPaymentMethodMutation = useMutation({
    mutationFn: addPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: setDefaultPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });

  const removePaymentMethodMutation = useMutation({
    mutationFn: removePaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
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
