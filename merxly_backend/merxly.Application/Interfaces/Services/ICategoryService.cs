using merxly.Application.DTOs.Category;
using merxly.Application.DTOs.Common;

namespace merxly.Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<PaginatedResultDto<ParentCategoryDto>> GetParentCategoriesAsync(PaginationQuery paginationQuery, CancellationToken cancellationToken);
        Task<PaginatedResultDto<CategoryDto>> GetCategoryTreeAsync(PaginationQuery paginationQuery, CancellationToken cancellationToken);
        Task<PaginatedResultDto<AdminCategoryDto>> GetAdminCategoryTreeAsync(PaginationQuery paginationQuery, CancellationToken cancellationToken);
        Task<DetailCategoryDto> GetCategoryByIdAsync(Guid categoryId, CancellationToken cancellationToken);
        Task<DetailCategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto, CancellationToken cancellationToken);
        Task<DetailCategoryDto> UpdateCategoryAsync(Guid categoryId, UpdateCategoryDto updateCategoryDto, CancellationToken cancellationToken);
        Task DeleteCategoryAsync(Guid categoryId, CancellationToken cancellationToken);
    }
}
