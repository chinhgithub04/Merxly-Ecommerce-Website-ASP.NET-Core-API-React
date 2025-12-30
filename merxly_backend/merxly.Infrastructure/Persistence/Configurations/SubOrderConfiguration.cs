using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class SubOrderConfiguration : IEntityTypeConfiguration<SubOrder>
    {
        public void Configure(EntityTypeBuilder<SubOrder> builder)
        {
            builder.ToTable("SubOrders");

            builder.HasKey(so => so.Id);

            // Properties
            builder.Property(so => so.SubOrderNumber)
                .IsRequired()
                .HasMaxLength(60);

            builder.Property(so => so.Status)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(so => so.SubTotal)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(so => so.Tax)
                .HasPrecision(18, 2);

            builder.Property(so => so.ShippingCost)
                .HasPrecision(18, 2);

            builder.Property(so => so.TotalAmount)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(so => so.Carrier)
                .HasMaxLength(100);

            builder.Property(so => so.TrackingNumber)
                .HasMaxLength(100);

            builder.Property(so => so.Notes)
                .HasMaxLength(1000);

            builder.Property(so => so.CreatedAt)
                .IsRequired();

            // Relationships
            builder.HasOne(so => so.Order)
                .WithMany(o => o.SubOrders)
                .HasForeignKey(so => so.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(so => so.Store)
                .WithMany(s => s.SubOrders)
                .HasForeignKey(so => so.StoreId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(so => so.OrderItems)
                .WithOne(oi => oi.SubOrder)
                .HasForeignKey(oi => oi.SubOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(so => so.StatusHistory)
                .WithOne(sh => sh.SubOrder)
                .HasForeignKey(sh => sh.SubOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(so => so.StoreTransfers)
                .WithOne(st => st.SubOrder)
                .HasForeignKey(st => st.SubOrderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            builder.HasIndex(so => so.SubOrderNumber)
                .IsUnique();

            builder.HasIndex(so => so.OrderId);
            builder.HasIndex(so => so.StoreId);
            builder.HasIndex(so => so.CreatedAt);
        }
    }
}
