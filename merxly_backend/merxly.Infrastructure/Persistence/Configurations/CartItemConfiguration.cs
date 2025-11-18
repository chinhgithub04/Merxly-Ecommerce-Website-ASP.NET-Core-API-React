using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.ToTable("CartItems");

            builder.HasKey(ci => ci.Id);

            // Properties
            builder.Property(ci => ci.Quantity)
                .IsRequired()
                .HasDefaultValue(1);

            builder.Property(ci => ci.PriceAtAdd)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(ci => ci.CreatedAt)
                .IsRequired();

            // Relationship
            builder.HasOne(ci => ci.ProductVariant)
                   .WithMany()
                   .HasForeignKey(ci => ci.ProductVariantId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            builder.HasIndex(ci => new { ci.CartId, ci.ProductVariantId })
                .IsUnique(); //Không cho phép 1 giỏ hàng (CartId) có cùng sản phẩm có cùng biến thể (ProductVariantId)
        }
    }
}
