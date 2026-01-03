import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyStore, updateMyStore } from '../services/storeService';
import type { UpdateStoreDto } from '../types/models/store';

export const useStore = () => {
  return useQuery({
    queryKey: ['store'],
    queryFn: getMyStore,
    staleTime: 30000, // 30 seconds
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateStoreDto) => updateMyStore(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store'] });
    },
  });
};
