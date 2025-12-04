using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class ProductVariantAttributeValueConfiguration : IEntityTypeConfiguration<ProductVariantAttributeValue>
    {
        public void Configure(EntityTypeBuilder<ProductVariantAttributeValue> builder)
        {
            builder.ToTable("ProductVariantAttributeValues");

            // Indexes
            builder.HasKey(pvav => new { pvav.ProductVariantId, pvav.ProductAttributeValueId });
        }
    }
}
