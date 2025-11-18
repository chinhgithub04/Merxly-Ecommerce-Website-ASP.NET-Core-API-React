using merxly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace merxly.Infrastructure.Persistence.Configurations
{
    public class ReviewConfiguration : IEntityTypeConfiguration<Review>
    {
        public void Configure(EntityTypeBuilder<Review> builder)
        {
            builder.ToTable("Reviews");

            builder.HasKey(r => r.Id);

            // Properties
            builder.Property(r => r.Rating)
                .IsRequired();

            builder.Property(r => r.Title)
                .HasMaxLength(200);

            builder.Property(r => r.Comment)
                .HasMaxLength(2000);

            builder.Property(r => r.CreatedAt)
                .IsRequired();

            // Relationships
            builder.HasOne(r => r.Order)
                .WithMany()
                .HasForeignKey(r => r.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(r => r.Medias)
                .WithOne(ri => ri.Review)
                .HasForeignKey(ri => ri.ReviewId)
                .OnDelete(DeleteBehavior.Cascade);

            // Indexes
            builder.HasIndex(r => new { r.ProductId, r.Rating });
            builder.HasIndex(r => new { r.UserId, r.ProductId, r.OrderId })
                .IsUnique();
            builder.HasIndex(r => r.CreatedAt);

            // Check constraint for rating (1-5)
            builder.ToTable(t => t.HasCheckConstraint("CK_Review_Rating", "`Rating` >= 1 AND `Rating` <= 5"));
        }
    }
}
