namespace merxly.Application.DTOs.StorePayment
{
    public class StorePaymentAccountDto
    {
        public Guid StoreId { get; set; }
        public string StoreName { get; set; }
        public string? StripeConnectAccountId { get; set; }
        public bool IsPayoutEnabled { get; set; }
        public string? StripeAccountStatus { get; set; }
        public decimal CommissionRate { get; set; }
    }
}
