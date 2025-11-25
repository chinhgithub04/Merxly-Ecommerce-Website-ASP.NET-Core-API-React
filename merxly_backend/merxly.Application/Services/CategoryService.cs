using AutoMapper;
using merxly.Application.DTOs.Category;
using merxly.Application.DTOs.Common;
using merxly.Application.Interfaces;
using merxly.Application.Interfaces.Services;
using merxly.Domain.Entities;
using merxly.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace merxly.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;
        private readonly IMapper _mapper;
        private readonly ILogger<CategoryService> _logger;

        public CategoryService(IUnitOfWork unitOfWork, IFileStorageService fileStorageService, IMapper mapper, ILogger<CategoryService> logger)
        {
            _unitOfWork = unitOfWork;
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _logger = logger;
        }

        /// <summary>
        /// Retrieves the category tree with subcategories.
        /// This method currently only loads one level of subcategories.
        /// </summary>
        public async Task<PaginatedResultDto<CategoryDto>> GetCategoryTreeAsync(PaginationQuery paginationQuery, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Retrieving category tree. PageNumber: {PageNumber}, PageSize: {PageSize}", paginationQuery.PageNumber, paginationQuery.PageSize);

            var paginatedCategories = await _unitOfWork.Category.GetPagedAsync(
                paginationQuery,
                c => c.IsActive && c.ParentCategoryId == null,
                cancellationToken,
                c => c.SubCategories
            );

            var paginatedResult = _mapper.Map<PaginatedResultDto<CategoryDto>>(paginatedCategories);

            _logger.LogInformation("Successfully retrieved {Count} categories with hierarchy.", paginatedResult.Items.Count);

            return paginatedResult;
        }

        public async Task<PaginatedResultDto<ParentCategoryDto>> GetParentCategoriesAsync(PaginationQuery paginationQuery, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Retrieving parent categories. PageNumber: {PageNumber}, PageSize: {PageSize}", paginationQuery.PageNumber, paginationQuery.PageSize);
            
            var paginatedCategories = await _unitOfWork.Category.GetPagedAsync(
                paginationQuery,
                c => c.IsActive && c.ParentCategoryId == null,
                cancellationToken
            );

            var paginatedResult = _mapper.Map<PaginatedResultDto<ParentCategoryDto>>(paginatedCategories);
            _logger.LogInformation("Successfully retrieved {Count} parent categories.", paginatedResult.Items.Count);

            return paginatedResult;
        }

        public async Task<DetailCategoryDto> GetCategoryByIdAsync(Guid categoryId, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Retrieving category by ID: {CategoryId}", categoryId);
            var category = await _unitOfWork.Category.GetByIdAsync(
                categoryId,
                cancellationToken,
                c => c.Products
            );

            if (category == null || !category.IsActive)
            {
                _logger.LogWarning("Category with ID: {CategoryId} not found or inactive.", categoryId);
                throw new NotFoundException($"Category with ID: {categoryId} not found.");
            }

            _logger.LogInformation("Successfully retrieved category with ID: {CategoryId}", categoryId);
            return _mapper.Map<DetailCategoryDto>(category);
        }

        public async Task<DetailCategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Creating new category with name: {CategoryName}", createCategoryDto.Name);

            if (createCategoryDto.ParentCategoryId.HasValue){
                if (!await _unitOfWork.Category.AnyAsync(c => c.Id == createCategoryDto.ParentCategoryId.Value, cancellationToken))
                {
                    _logger.LogWarning("Parent category with ID: {ParentCategoryId} not found.", createCategoryDto.ParentCategoryId.Value);
                    throw new NotFoundException($"Parent category with ID: {createCategoryDto.ParentCategoryId.Value} not found.");
                }
            }

            var category = _mapper.Map<Category>(createCategoryDto);
            category.IsActive = true;

            await _unitOfWork.Category.AddAsync(category, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("{CategoryName} created successfully with ID: {CategoryId}", category.Name, category.Id);
            return _mapper.Map<DetailCategoryDto>(category);
        }

        public async Task<DetailCategoryDto> UpdateCategoryAsync(Guid categoryId, UpdateCategoryDto updateCategoryDto, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Updating category with ID: {CategoryId}", categoryId);

            var category = await _unitOfWork.Category.GetByIdAsync(categoryId, cancellationToken);

            if (category == null)
            {
                _logger.LogWarning("Category with ID: {CategoryId} not found.", categoryId);
                throw new NotFoundException($"Category with ID: {categoryId} not found.");
            }

            if (updateCategoryDto.ParentCategoryId.HasValue){
                if (updateCategoryDto.ParentCategoryId.Value == categoryId)
                {
                    _logger.LogWarning("Category with ID: {CategoryId} cannot be its own parent.", categoryId);
                    throw new InvalidOperationException("A category cannot be its own parent.");
                }

                if (!await _unitOfWork.Category.AnyAsync(c => c.Id == updateCategoryDto.ParentCategoryId.Value, cancellationToken))
                {
                    _logger.LogWarning("Parent category with ID: {ParentCategoryId} not found.", updateCategoryDto.ParentCategoryId.Value);
                    throw new NotFoundException($"Parent category with ID: {updateCategoryDto.ParentCategoryId.Value} not found.");
                }
            }

            if (!string.IsNullOrEmpty(updateCategoryDto.ImagePublicId) 
                && updateCategoryDto.ImagePublicId != category.ImagePublicId
                && category.ImagePublicId != null)
            {
                _logger.LogInformation("Deleting old image with Public ID: {ImagePublicId} for category ID: {CategoryId}", category.ImagePublicId, categoryId);
                await _fileStorageService.DeleteFileAsync(category.ImagePublicId);
            }

            _mapper.Map(updateCategoryDto, category);

            _unitOfWork.Category.Update(category);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Category with ID: {CategoryId} updated successfully.", categoryId);
            return _mapper.Map<DetailCategoryDto>(category);

        }

        public async Task DeleteCategoryAsync(Guid categoryId, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Deleting category with ID: {CategoryId}", categoryId);

            var category = await _unitOfWork.Category.GetByIdAsync(categoryId, cancellationToken);

            if (category == null)
            {
                _logger.LogWarning("Category with ID: {CategoryId} not found.", categoryId);
                throw new NotFoundException($"Category with ID: {categoryId} not found.");
            }

            _unitOfWork.Category.Remove(category);
            var rows = await _unitOfWork.SaveChangesAsync(cancellationToken);
            _logger.LogInformation("Category with ID: {CategoryId} deleted successfully.", categoryId);

            if (rows > 0 && !string.IsNullOrEmpty(category.ImagePublicId))
            {
                _logger.LogInformation("Deleting image with Public ID: {ImagePublicId} for deleted category ID: {CategoryId}", category.ImagePublicId, categoryId);
                await _fileStorageService.DeleteFileAsync(category.ImagePublicId);
            }
        }
    }
}
