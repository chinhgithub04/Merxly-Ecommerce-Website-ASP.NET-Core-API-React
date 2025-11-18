using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class RefundConfiguration : IEntityTypeConfiguration<Refund>
    {
        public void Configure(EntityTypeBuilder<Refund> builder)
        {
            builder.ToTable("Refunds");

            builder.HasKey(r => r.Id);

            // Properties
            builder.Property(r => r.RefundId)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(r => r.Amount)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(r => r.Reason)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(r => r.Notes)
                .HasMaxLength(1000);

            builder.Property(r => r.Status)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(r => r.CreatedAt)
                .IsRequired();

            // Indexes
            builder.HasIndex(r => r.RefundId)
                .IsUnique();

            builder.HasIndex(r => r.CreatedAt);
        }
    }
}
