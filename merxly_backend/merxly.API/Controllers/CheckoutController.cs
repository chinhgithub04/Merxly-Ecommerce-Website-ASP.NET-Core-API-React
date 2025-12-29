using merxly.Application.DTOs.Checkout;
using merxly.Application.DTOs.Common;
using merxly.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace merxly.API.Controllers
{
    [Route("api/checkout")]
    [Authorize]
    public class CheckoutController : BaseApiController
    {
        private readonly ICheckoutService _checkoutService;
        private readonly ILogger<CheckoutController> _logger;

        public CheckoutController(
            ICheckoutService checkoutService,
            ILogger<CheckoutController> logger)
        {
            _checkoutService = checkoutService;
            _logger = logger;
        }

        /// <summary>
        /// Process checkout for customer
        /// </summary>
        /// <param name="request">Checkout request with items and shipping address</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Order details and Stripe client secret for payment confirmation</returns>
        [HttpPost]
        public async Task<ActionResult<ResponseDto<CheckoutResponseDto>>> ProcessCheckout(
            [FromBody] CheckoutRequestDto request,
            CancellationToken cancellationToken)
        {
            try
            {
                var userId = GetUserIdFromClaims();

                _logger.LogInformation("Checkout request received from user {UserId}", userId);

                var result = await _checkoutService.ProcessCheckoutAsync(userId, request, cancellationToken);

                return OkResponse(result, "Checkout completed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing checkout");
                throw;
            }
        }
    }
}
