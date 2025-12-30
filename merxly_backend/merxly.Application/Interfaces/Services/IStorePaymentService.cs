using merxly.Application.DTOs.StorePayment;

namespace merxly.Application.Interfaces.Services
{
    public interface IStorePaymentService
    {
        /// <summary>
        /// Gets the payment account information for the current user's store
        /// </summary>
        Task<StorePaymentAccountDto> GetStorePaymentAccountAsync(string userId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a Stripe Connect account for the current user's store
        /// </summary>
        Task<StorePaymentAccountDto> CreateConnectAccountAsync(string userId, CreateConnectAccountDto dto, CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates an account link for onboarding or updating the store's Stripe Connect account
        /// </summary>
        Task<ConnectAccountLinkDto> CreateAccountLinkAsync(string userId, CreateAccountLinkRequestDto dto, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets the current status of the store's Stripe Connect account
        /// </summary>
        Task<ConnectAccountStatusDto> GetConnectAccountStatusAsync(string userId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Refreshes the store's Stripe Connect account status from Stripe
        /// </summary>
        Task<ConnectAccountStatusDto> RefreshConnectAccountStatusAsync(string userId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Disconnects (deletes) the store's Stripe Connect account
        /// </summary>
        Task DisconnectConnectAccountAsync(string userId, CancellationToken cancellationToken = default);
    }
}
