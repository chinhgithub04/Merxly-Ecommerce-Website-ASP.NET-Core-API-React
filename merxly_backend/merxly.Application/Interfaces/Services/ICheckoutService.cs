using merxly.Application.DTOs.Checkout;

namespace merxly.Application.Interfaces.Services
{
    public interface ICheckoutService
    {
        /// <summary>
        /// Processes checkout for a single normalized checkout request
        /// Handles both cart-based and direct product checkout scenarios
        /// </summary>
        Task<CheckoutResponseDto> ProcessCheckoutAsync(string userId, CheckoutRequestDto request, CancellationToken cancellationToken = default);
    }
}
