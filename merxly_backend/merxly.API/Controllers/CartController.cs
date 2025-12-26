using merxly.Application.DTOs.Cart;
using merxly.Application.DTOs.Common;
using merxly.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace merxly.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : BaseApiController
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseDto<CartDto>>> GetCart(CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _cartService.GetCartAsync(userId, cancellationToken);
            return OkResponse(result, "Cart retrieved successfully");
        }

        [HttpPost("items")]
        public async Task<ActionResult<ResponseDto<CartDto>>> AddToCart([FromBody] AddToCartDto dto, CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _cartService.AddToCartAsync(userId, dto, cancellationToken);
            return OkResponse(result, "Item added to cart successfully");
        }

        [HttpPatch("items/{id}")]
        public async Task<ActionResult<ResponseDto<CartDto>>> UpdateCartItem(Guid id, [FromBody] UpdateCartItemDto dto, CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _cartService.UpdateCartItemAsync(userId, id, dto, cancellationToken);
            return OkResponse(result, "Cart item updated successfully");
        }

        [HttpDelete("items/{id}")]
        public async Task<ActionResult> RemoveCartItem(Guid id, CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            await _cartService.RemoveCartItemAsync(userId, id, cancellationToken);
            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> ClearCart(CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            await _cartService.ClearCartAsync(userId, cancellationToken);
            return NoContent();
        }
    }
}
