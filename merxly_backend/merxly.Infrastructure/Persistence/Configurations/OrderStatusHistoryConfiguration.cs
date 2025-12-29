using merxly.Domain.Entities;
using merxly.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class OrderStatusHistoryConfiguration : IEntityTypeConfiguration<OrderStatusHistory>
    {
        public void Configure(EntityTypeBuilder<OrderStatusHistory> builder)
        {
            builder.ToTable("OrderStatusHistory");

            builder.HasKey(osh => osh.Id);

            // Properties
            builder.Property(osh => osh.Status)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(osh => osh.Notes)
                .HasMaxLength(1000);

            builder.Property(osh => osh.CreatedAt)
                .IsRequired();

            // Relationships
            builder.HasOne(osh => osh.SubOrder)
                .WithMany(so => so.StatusHistory)
                .HasForeignKey(osh => osh.SubOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(osh => osh.UpdatedByUser)
                .WithMany()
                .HasForeignKey(osh => osh.UpdatedByUserId)
                .OnDelete(DeleteBehavior.SetNull);

            // Indexes
            builder.HasIndex(osh => new { osh.SubOrderId, osh.CreatedAt });
        }
    }
}
