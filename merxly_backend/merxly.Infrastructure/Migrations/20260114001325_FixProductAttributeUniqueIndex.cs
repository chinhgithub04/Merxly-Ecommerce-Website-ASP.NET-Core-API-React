using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace merxly.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixProductAttributeUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop the old unique index on Name only
            migrationBuilder.DropIndex(
                name: "IX_ProductAttributes_Name",
                table: "ProductAttributes");

            // Create new unique index on (ProductId, Name)
            migrationBuilder.CreateIndex(
                name: "IX_ProductAttributes_ProductId_Name",
                table: "ProductAttributes",
                columns: new[] { "ProductId", "Name" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop the composite unique index
            migrationBuilder.DropIndex(
                name: "IX_ProductAttributes_ProductId_Name",
                table: "ProductAttributes");

            // Recreate the old unique index on Name only
            migrationBuilder.CreateIndex(
                name: "IX_ProductAttributes_Name",
                table: "ProductAttributes",
                column: "Name",
                unique: true);
        }
    }
}
