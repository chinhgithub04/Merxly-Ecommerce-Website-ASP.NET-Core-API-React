using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class StoreAddressConfiguration : IEntityTypeConfiguration<StoreAddress>
    {
        public void Configure(EntityTypeBuilder<StoreAddress> builder)
        {
            builder.ToTable("StoreAddresses");

            builder.HasKey(sa => sa.Id);

            // Properties
            builder.Property(sa => sa.AddressLine1)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(sa => sa.AddressLine2)
                .HasMaxLength(200);

            builder.Property(sa => sa.City)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(sa => sa.StateProvince)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(sa => sa.PostalCode)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(sa => sa.CreatedAt)
                .IsRequired();

            // Indexes
            builder.HasIndex(sa => sa.StoreId)
                .IsUnique();
        }
    }
}
