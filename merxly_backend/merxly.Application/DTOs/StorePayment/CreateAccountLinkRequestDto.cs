namespace merxly.Application.DTOs.StorePayment
{
    public class CreateAccountLinkRequestDto
    {
        public string ReturnUrl { get; set; }
        public string RefreshUrl { get; set; }
        public string Type { get; set; } = "account_onboarding";
    }
}
