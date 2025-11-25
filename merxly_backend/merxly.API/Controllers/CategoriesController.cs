using merxly.Application.DTOs.Category;
using merxly.Application.DTOs.Common;
using merxly.Application.Interfaces.Services;
using merxly.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace merxly.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : BaseApiController
    {
        private readonly ICategoryService _categoryService;
        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("tree")]
        public async Task<ActionResult<ResponseDto<PaginatedResultDto<CategoryDto>>>> GetCategoryTree([FromQuery] PaginationQuery paginationQuery, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.GetCategoryTreeAsync(paginationQuery, cancellationToken);
            return OkResponse(result, "Category tree retrieved successfully");
        }

        [HttpGet("parents")]
        public async Task<ActionResult<ResponseDto<PaginatedResultDto<ParentCategoryDto>>>> GetParentCategories([FromQuery] PaginationQuery paginationQuery, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.GetParentCategoriesAsync(paginationQuery, cancellationToken);
            return OkResponse(result, "Parent categories retrieved successfully");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponseDto<DetailCategoryDto>>> GetCategoryById(Guid id, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.GetCategoryByIdAsync(id, cancellationToken);
            return OkResponse(result, "Category details retrieved successfully");
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<ResponseDto<DetailCategoryDto>>> CreateCategory([FromBody] CreateCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.CreateCategoryAsync(dto, cancellationToken);
            return OkResponse(result, "Category created successfully");
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<ResponseDto<DetailCategoryDto>>> UpdateCategory(Guid id, [FromBody] UpdateCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var result = await _categoryService.UpdateCategoryAsync(id, dto, cancellationToken);
            return OkResponse(result, "Category updated successfully");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult> DeleteCategory(Guid id, CancellationToken cancellationToken = default)
        {
            await _categoryService.DeleteCategoryAsync(id, cancellationToken);
            return NoContent();
        }
    }
}
