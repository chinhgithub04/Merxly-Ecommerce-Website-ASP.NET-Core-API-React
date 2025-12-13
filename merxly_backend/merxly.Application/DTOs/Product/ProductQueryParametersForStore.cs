using merxly.Application.DTOs.Common;
using merxly.Domain.Enums;

namespace merxly.Application.DTOs.Product
{
    public record ProductQueryParametersForStore : PaginationQuery
    {
        public bool? IsStoreFeatured { get; init; }
        public bool? IsActive { get; init; }
        public Guid? CategoryId { get; init; }
        public string? SearchTerm { get; init; }
        
        public StoreProductSortBy SortBy { get; init; } = StoreProductSortBy.CreatedAt;
        public StoreProductSortOrder SortOrder { get; init; } = StoreProductSortOrder.Descending;
    }
}