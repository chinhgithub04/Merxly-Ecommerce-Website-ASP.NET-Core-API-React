using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class WishlistItemConfiguration : IEntityTypeConfiguration<WishlistItem>
    {
        public void Configure(EntityTypeBuilder<WishlistItem> builder)
        {
            builder.ToTable("WishlistItems");

            builder.HasKey(wi => wi.Id);

            // Properties
            builder.Property(wi => wi.CreatedAt)
                .IsRequired();

            // Relationships
            builder.HasOne(wi => wi.Product)
                .WithMany()
                .HasForeignKey(wi => wi.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(wi => wi.ProductVariant)
               .WithMany()
               .HasForeignKey(wi => wi.ProductVariantId)
               .OnDelete(DeleteBehavior.Cascade);

            // Indexes
            builder.HasIndex(wi => new { wi.WishlistId, wi.ProductId, wi.ProductVariantId })
                .IsUnique();
        }
    }
}
