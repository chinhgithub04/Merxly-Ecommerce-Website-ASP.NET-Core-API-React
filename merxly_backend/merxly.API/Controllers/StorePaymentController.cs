using merxly.Application.DTOs.Common;
using merxly.Application.DTOs.StorePayment;
using merxly.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace merxly.API.Controllers
{
    [Route("api/store/payment")]
    [ApiController]
    [Authorize]
    public class StorePaymentController : BaseApiController
    {
        private readonly IStorePaymentService _storePaymentService;

        public StorePaymentController(IStorePaymentService storePaymentService)
        {
            _storePaymentService = storePaymentService;
        }

        /// <summary>
        /// Get the store's payment account information
        /// </summary>
        [HttpGet("account")]
        public async Task<ActionResult<ResponseDto<StorePaymentAccountDto>>> GetPaymentAccount(CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _storePaymentService.GetStorePaymentAccountAsync(userId, cancellationToken);
            return OkResponse(result, "Store payment account retrieved successfully");
        }

        /// <summary>
        /// Create a Stripe Connect account for the store
        /// </summary>
        [HttpPost("account")]
        public async Task<ActionResult<ResponseDto<StorePaymentAccountDto>>> CreateConnectAccount(
            [FromBody] CreateConnectAccountDto dto,
            CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _storePaymentService.CreateConnectAccountAsync(userId, dto, cancellationToken);
            return OkResponse(result, "Stripe Connect account created successfully");
        }

        /// <summary>
        /// Create an account link for Stripe Connect onboarding or updates
        /// </summary>
        [HttpPost("account/link")]
        public async Task<ActionResult<ResponseDto<ConnectAccountLinkDto>>> CreateAccountLink(
            [FromBody] CreateAccountLinkRequestDto dto,
            CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _storePaymentService.CreateAccountLinkAsync(userId, dto, cancellationToken);
            return OkResponse(result, "Account link created successfully");
        }

        /// <summary>
        /// Get the current status of the store's Stripe Connect account
        /// </summary>
        [HttpGet("account/status")]
        public async Task<ActionResult<ResponseDto<ConnectAccountStatusDto>>> GetAccountStatus(CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _storePaymentService.GetConnectAccountStatusAsync(userId, cancellationToken);
            return OkResponse(result, "Account status retrieved successfully");
        }

        /// <summary>
        /// Refresh the store's Stripe Connect account status from Stripe
        /// </summary>
        [HttpPost("account/status/refresh")]
        public async Task<ActionResult<ResponseDto<ConnectAccountStatusDto>>> RefreshAccountStatus(CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            var result = await _storePaymentService.RefreshConnectAccountStatusAsync(userId, cancellationToken);
            return OkResponse(result, "Account status refreshed successfully");
        }

        /// <summary>
        /// Disconnect (delete) the store's Stripe Connect account
        /// </summary>
        [HttpDelete("account")]
        public async Task<ActionResult> DisconnectAccount(CancellationToken cancellationToken = default)
        {
            var userId = GetUserIdFromClaims();
            await _storePaymentService.DisconnectConnectAccountAsync(userId, cancellationToken);
            return NoContent();
        }
    }
}
