using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.ToTable("OrderItems");

            builder.HasKey(oi => oi.Id);

            // Properties
            builder.Property(oi => oi.Quantity)
                .IsRequired();

            builder.Property(oi => oi.UnitPrice)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(oi => oi.TotalPrice)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(oi => oi.CreatedAt)
                .IsRequired();

            // Relationships
            builder.HasOne(oi => oi.SubOrder)
                .WithMany(so => so.OrderItems)
                .HasForeignKey(oi => oi.SubOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(oi => oi.ProductVariant)
                   .WithMany()
                   .HasForeignKey(oi => oi.ProductVariantId)
                   .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            builder.HasIndex(oi => oi.SubOrderId);
        }
    }
}
