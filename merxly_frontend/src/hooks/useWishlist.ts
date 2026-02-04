import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWishlist,
  addToWishlist,
  removeWishlistItem,
  clearWishlist,
} from '../services/wishlistService';
import { toast } from 'react-toastify';

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
    onError: (err: Error) => {
      toast.error(`Failed to add item to wishlist: ${err.message}`);
    },
  });

  const removeWishlistItemMutation = useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (err: Error) => {
      toast.error(`Failed to remove item from wishlist: ${err.message}`);
    },
  });

  const clearWishlistMutation = useMutation({
    mutationFn: clearWishlist,
    onSuccess: () => {
      toast.success('Wishlist cleared successfully');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (err: Error) => {
      toast.error(`Failed to clear wishlist: ${err.message}`);
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
