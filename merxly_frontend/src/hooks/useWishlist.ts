import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWishlist,
  addToWishlist,
  removeWishlistItem,
  clearWishlist,
} from '../services/wishlistService';

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const {
    data: wishlistData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const removeWishlistItemMutation = useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const clearWishlistMutation = useMutation({
    mutationFn: clearWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return {
    wishlist: wishlistData?.data,
    isLoading,
    error,
    addToWishlist: addToWishlistMutation.mutateAsync,
    removeWishlistItem: removeWishlistItemMutation.mutateAsync,
    clearWishlist: clearWishlistMutation.mutateAsync,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingWishlistItem: removeWishlistItemMutation.isPending,
    isClearingWishlist: clearWishlistMutation.isPending,
  };
};
