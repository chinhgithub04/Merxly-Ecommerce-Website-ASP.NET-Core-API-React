using merxly.Domain.Enums;

namespace merxly.Application.DTOs.Order
{
    public record UpdateSubOrderStatusDto
    {
        public OrderStatus Status { get; init; }
        public string? Notes { get; init; } // Only displayed when updating to 'Cancelled' status
        public string? Carrier { get; init; } // Ignore this field
        public string? TrackingNumber { get; init; } // Ignore this field
    }
}
