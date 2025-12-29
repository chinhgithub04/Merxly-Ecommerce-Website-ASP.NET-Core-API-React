using merxly.Domain.Enums;

namespace merxly.Application.DTOs.Order
{
    public class PaymentDto
    {
        public Guid Id { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public decimal TotalCommission { get; set; }
        public PaymentStatus Status { get; set; }
        public string? ClientSecret { get; set; } // For frontend to confirm payment
        public string? ReceiptUrl { get; set; }
        public string? FailureMessage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? PaidAt { get; set; }
    }
}
