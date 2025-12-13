using merxly.Application.DTOs.Common;
using merxly.Application.DTOs.Product;
using merxly.Application.DTOs.Product.Update;
using merxly.Application.Interfaces.Repositories;
using merxly.Application.Interfaces.Services;
using merxly.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace merxly.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.StoreOwner)]

    public class StoreProductsController : BaseApiController
    {
        private readonly IProductService _productService;
        private readonly IStoreRepository _storeRepository;
        public StoreProductsController(IProductService productService, IStoreRepository storeRepository)
        {
            _productService = productService;
            _storeRepository = storeRepository;
        }

        #region 1. Product CRUD (Basic)
        [HttpGet]
        public async Task<ActionResult<ResponseDto<PaginatedResultDto<ProductForStoreDto>>>> GetAllProducts([FromQuery] ProductQueryParametersForStore parameters, CancellationToken cancellationToken)
        {
            var storeId = await GetStoreIdForCurrentUserAsync(_storeRepository, cancellationToken);
            var result = await _productService.GetAllProductsForStoreAsync(storeId.Value, parameters, cancellationToken);

            return OkResponse(result, "Products retrieved successfully.");
        }

        [HttpPost]
        public async Task<ActionResult<ResponseDto<StoreDetailProductDto>>> CreateProduct([FromBody] CreateProductDto createProductDto, CancellationToken cancellationToken)
        {
            var storeId = await GetStoreIdForCurrentUserAsync(_storeRepository, cancellationToken);
            var result = await _productService.CreateProductAsync(createProductDto, storeId.Value, cancellationToken);

            var response = new ResponseDto<StoreDetailProductDto>
            {
                Data = result,
                IsSuccess = true,
                Message = "Product created successfully.",
                StatusCode = 201
            };

            return CreatedAtAction(nameof(GetProductById), new { productId = result.Id }, response);
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<ResponseDto<StoreDetailProductDto>>> GetProductById(Guid productId, CancellationToken cancellationToken)
        {
            var storeId = await GetStoreIdForCurrentUserAsync(_storeRepository, cancellationToken);
            var result = await _productService.GetProductByIdForStoreAsync(productId, storeId.Value, cancellationToken);

            return OkResponse(result, "Product detail retrieved successfully.");
        }

        [HttpPatch("{productId}")]
        public async Task<ActionResult<ResponseDto<ResponseUpdateProductDto>>> UpdateProduct(Guid productId, [FromBody] UpdateProductDto updateProductDto, CancellationToken cancellationToken)
        {
            var storeId = await GetStoreIdForCurrentUserAsync(_storeRepository, cancellationToken);
            var result = await _productService.UpdateProductAsync(productId, updateProductDto, storeId.Value, cancellationToken);

            return OkResponse(result, "Product updated successfully.");
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteProduct(Guid productId, CancellationToken cancellationToken)
        {
            var storeId = await GetStoreIdForCurrentUserAsync(_storeRepository, cancellationToken);
            await _productService.DeleteProductAsync(productId, storeId.Value, cancellationToken);

            return NoContent();
        }
        #endregion
    }
}