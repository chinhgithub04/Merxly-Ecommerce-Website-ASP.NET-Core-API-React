using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace merxly.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangStoreDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BussinessLicensePublicId",
                table: "Stores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "IdentityCardBackPublicId",
                table: "Stores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "IdentityCardFrontPublicId",
                table: "Stores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "OwnerEmail",
                table: "Stores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "OwnerName",
                table: "Stores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "OwnerPhoneNumber",
                table: "Stores",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "RejectionReason",
                table: "Stores",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "TaxCode",
                table: "Stores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BussinessLicensePublicId",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "IdentityCardBackPublicId",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "IdentityCardFrontPublicId",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "OwnerEmail",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "OwnerName",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "OwnerPhoneNumber",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "RejectionReason",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "TaxCode",
                table: "Stores");
        }
    }
}
