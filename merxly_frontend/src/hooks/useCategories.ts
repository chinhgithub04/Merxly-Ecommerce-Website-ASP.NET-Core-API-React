import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as categoryService from '../services/categoryService';
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../types/models/category';

// Query Keys
export const categoryKeys = {
  all: ['categories'] as const,
  tree: (pageNumber = 1, pageSize = 100) =>
    [...categoryKeys.all, 'tree', { pageNumber, pageSize }] as const,
  adminTree: (pageNumber = 1, pageSize = 100) =>
    [...categoryKeys.all, 'adminTree', { pageNumber, pageSize }] as const,
  parents: (pageNumber = 1, pageSize = 100) =>
    [...categoryKeys.all, 'parents', { pageNumber, pageSize }] as const,
  detail: (id: string) => [...categoryKeys.all, 'detail', id] as const,
};

// Get Category Tree
export const useCategoryTree = (pageNumber = 1, pageSize = 100) => {
  return useQuery({
    queryKey: categoryKeys.tree(pageNumber, pageSize),
    queryFn: () => categoryService.getCategoryTree(pageNumber, pageSize),
  });
};

// Get Admin Category Tree (with full details)
export const useAdminCategoryTree = (pageNumber = 1, pageSize = 100) => {
  return useQuery({
    queryKey: categoryKeys.adminTree(pageNumber, pageSize),
    queryFn: () => categoryService.getAdminCategoryTree(pageNumber, pageSize),
  });
};

// Get Parent Categories
export const useParentCategories = (pageNumber = 1, pageSize = 100) => {
  return useQuery({
    queryKey: categoryKeys.parents(pageNumber, pageSize),
    queryFn: () => categoryService.getParentCategories(pageNumber, pageSize),
  });
};

// Get Category By Id
export const useCategoryById = (id: string | null) => {
  return useQuery({
    queryKey: categoryKeys.detail(id!),
    queryFn: () => categoryService.getCategoryById(id!),
    enabled: !!id,
  });
};

// Create Category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) =>
      categoryService.createCategory(data),
    onSuccess: () => {
      // Invalidate category queries to refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

// Update Category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoryService.updateCategory(id, data),
    onSuccess: () => {
      // Invalidate category queries to refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

// Delete Category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      // Invalidate category queries to refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};
