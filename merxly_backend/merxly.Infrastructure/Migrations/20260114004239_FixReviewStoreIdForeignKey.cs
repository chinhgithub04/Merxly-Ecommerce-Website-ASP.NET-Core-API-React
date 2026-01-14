using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace merxly.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixReviewStoreIdForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop the incorrect foreign key constraint that links StoreId to Orders table
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Orders_OrderId",
                table: "Reviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Recreate the old incorrect foreign key (for rollback purposes)
            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Orders_OrderId",
                table: "Reviews",
                column: "StoreId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
