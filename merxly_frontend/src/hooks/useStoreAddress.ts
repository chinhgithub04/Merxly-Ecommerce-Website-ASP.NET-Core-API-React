import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStoreAddress,
  createStoreAddress,
  updateStoreAddress,
} from '../services/storeAddressService';
import type {
  CreateStoreAddressDto,
  UpdateStoreAddressDto,
} from '../types/models/storeAddress';
import { toast } from 'react-toastify';

export const useStoreAddress = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['storeAddress'],
    queryFn: getStoreAddress,
  });

  const createAddressMutation = useMutation({
    mutationFn: createStoreAddress,
    onSuccess: () => {
      toast.success('Adress created successfully.');
      queryClient.invalidateQueries({ queryKey: ['storeAddress'] });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: updateStoreAddress,
    onSuccess: () => {
      toast.success('Adress updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['storeAddress'] });
    },
  });

  return {
    storeAddress: data?.data || null,
    isLoading,
    error,
    createAddress: (dto: CreateStoreAddressDto) =>
      createAddressMutation.mutateAsync(dto),
    updateAddress: (dto: UpdateStoreAddressDto) =>
      updateAddressMutation.mutateAsync(dto),
    isCreatingAddress: createAddressMutation.isPending,
    isUpdatingAddress: updateAddressMutation.isPending,
  };
};
