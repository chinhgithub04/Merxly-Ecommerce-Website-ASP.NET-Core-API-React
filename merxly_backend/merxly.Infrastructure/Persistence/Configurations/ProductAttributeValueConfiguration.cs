using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class ProductAttributeValueConfiguration : IEntityTypeConfiguration<ProductAttributeValue>
    {
        public void Configure(EntityTypeBuilder<ProductAttributeValue> builder)
        {
            builder.ToTable("ProductAttributeValues");

            builder.HasKey(pav => pav.Id);

            builder.Property(pav => pav.DisplayOrder)
                .IsRequired()
                .HasDefaultValue(0);

            // Properties
            builder.Property(pav => pav.Value)
                .IsRequired()
                .HasMaxLength(200);

            // Relationships
            builder.HasMany(pav => pav.VariantAttributeValues)
                .WithOne(pvav => pvav.ProductAttributeValue)
                .HasForeignKey(pvav => pvav.ProductAttributeValueId)
                .OnDelete(DeleteBehavior.Cascade);

            // Indexes
            builder.HasIndex(pav => new { pav.ProductAttributeId, pav.Value })
                .IsUnique();
        }
    }
}
