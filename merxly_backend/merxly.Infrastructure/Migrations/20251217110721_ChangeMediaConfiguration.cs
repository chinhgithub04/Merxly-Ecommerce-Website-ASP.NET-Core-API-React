using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace merxly.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMediaConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductVariantMedia_ProductVariantId",
                table: "ProductVariantMedia");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariantMedia_ProductVariantId_IsMain",
                table: "ProductVariantMedia",
                columns: new[] { "ProductVariantId", "IsMain" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductVariantMedia_ProductVariantId_IsMain",
                table: "ProductVariantMedia");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariantMedia_ProductVariantId",
                table: "ProductVariantMedia",
                column: "ProductVariantId",
                unique: true,
                filter: "`IsMain` = 1");
        }
    }
}
