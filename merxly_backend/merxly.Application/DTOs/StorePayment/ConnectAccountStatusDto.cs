namespace merxly.Application.DTOs.StorePayment
{
    public class ConnectAccountStatusDto
    {
        public string StripeAccountId { get; set; }
        public string Status { get; set; } // complete, pending, restricted
        public bool ChargesEnabled { get; set; }
        public bool PayoutsEnabled { get; set; }
        public bool DetailsSubmitted { get; set; }
        public List<string> Requirements { get; set; } = new();
        public List<string> PendingVerification { get; set; } = new();
        public List<string> Errors { get; set; } = new();
    }
}
