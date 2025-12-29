using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace merxly.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSubOrderEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Conditionally drop foreign keys if they exist
            migrationBuilder.Sql(@"
                SET @exist := (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS 
                    WHERE CONSTRAINT_SCHEMA = DATABASE() 
                    AND TABLE_NAME = 'OrderItems' 
                    AND CONSTRAINT_NAME = 'FK_OrderItems_Orders_OrderId' 
                    AND CONSTRAINT_TYPE = 'FOREIGN KEY');
                SET @sqlstmt := IF(@exist > 0, 'ALTER TABLE `OrderItems` DROP FOREIGN KEY `FK_OrderItems_Orders_OrderId`', 'SELECT ''Foreign key does not exist.''');
                PREPARE stmt FROM @sqlstmt;
                EXECUTE stmt;
            ");

            migrationBuilder.Sql(@"
                SET @exist := (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS 
                    WHERE CONSTRAINT_SCHEMA = DATABASE() 
                    AND TABLE_NAME = 'OrderStatusHistory' 
                    AND CONSTRAINT_NAME = 'FK_OrderStatusHistory_Orders_OrderId' 
                    AND CONSTRAINT_TYPE = 'FOREIGN KEY');
                SET @sqlstmt := IF(@exist > 0, 'ALTER TABLE `OrderStatusHistory` DROP FOREIGN KEY `FK_OrderStatusHistory_Orders_OrderId`', 'SELECT ''Foreign key does not exist.''');
                PREPARE stmt FROM @sqlstmt;
                EXECUTE stmt;
            ");

            // Drop FK constraint on StoreTransfers before dropping the index
            migrationBuilder.Sql(@"
                SET @exist := (SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS 
                    WHERE CONSTRAINT_SCHEMA = DATABASE() 
                    AND TABLE_NAME = 'StoreTransfers' 
                    AND CONSTRAINT_NAME = 'FK_StoreTransfers_Payments_PaymentId' 
                    AND CONSTRAINT_TYPE = 'FOREIGN KEY');
                SET @sqlstmt := IF(@exist > 0, 'ALTER TABLE `StoreTransfers` DROP FOREIGN KEY `FK_StoreTransfers_Payments_PaymentId`', 'SELECT ''Foreign key does not exist.''');
                PREPARE stmt FROM @sqlstmt;
                EXECUTE stmt;
            ");

            migrationBuilder.DropIndex(
                name: "IX_StoreTransfers_PaymentId_StoreId",
                table: "StoreTransfers");

            migrationBuilder.DropColumn(
                name: "Carrier",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CompletedAt",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingCost",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SubTotal",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Tax",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "OrderStatusHistory",
                newName: "SubOrderId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderStatusHistory_OrderId_CreatedAt",
                table: "OrderStatusHistory",
                newName: "IX_OrderStatusHistory_SubOrderId_CreatedAt");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "OrderItems",
                newName: "SubOrderId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                newName: "IX_OrderItems_SubOrderId");

            migrationBuilder.AddColumn<Guid>(
                name: "SubOrderId",
                table: "StoreTransfers",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "SubOrders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    SubOrderNumber = table.Column<string>(type: "varchar(60)", maxLength: 60, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SubTotal = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Tax = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    ShippingCost = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Carrier = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TrackingNumber = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    OrderId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    StoreId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubOrders_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubOrders_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_StoreTransfers_PaymentId_SubOrderId",
                table: "StoreTransfers",
                columns: new[] { "PaymentId", "SubOrderId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StoreTransfers_SubOrderId",
                table: "StoreTransfers",
                column: "SubOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_SubOrders_CreatedAt",
                table: "SubOrders",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_SubOrders_OrderId",
                table: "SubOrders",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_SubOrders_StoreId",
                table: "SubOrders",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_SubOrders_SubOrderNumber",
                table: "SubOrders",
                column: "SubOrderNumber",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_SubOrders_SubOrderId",
                table: "OrderItems",
                column: "SubOrderId",
                principalTable: "SubOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_SubOrders_SubOrderId",
                table: "OrderStatusHistory",
                column: "SubOrderId",
                principalTable: "SubOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StoreTransfers_SubOrders_SubOrderId",
                table: "StoreTransfers",
                column: "SubOrderId",
                principalTable: "SubOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            // Re-add FK constraint for PaymentId
            migrationBuilder.AddForeignKey(
                name: "FK_StoreTransfers_Payments_PaymentId",
                table: "StoreTransfers",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_SubOrders_SubOrderId",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderStatusHistory_SubOrders_SubOrderId",
                table: "OrderStatusHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreTransfers_SubOrders_SubOrderId",
                table: "StoreTransfers");

            migrationBuilder.DropTable(
                name: "SubOrders");

            migrationBuilder.DropIndex(
                name: "IX_StoreTransfers_PaymentId_SubOrderId",
                table: "StoreTransfers");

            migrationBuilder.DropIndex(
                name: "IX_StoreTransfers_SubOrderId",
                table: "StoreTransfers");

            migrationBuilder.DropColumn(
                name: "SubOrderId",
                table: "StoreTransfers");

            migrationBuilder.RenameColumn(
                name: "SubOrderId",
                table: "OrderStatusHistory",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderStatusHistory_SubOrderId_CreatedAt",
                table: "OrderStatusHistory",
                newName: "IX_OrderStatusHistory_OrderId_CreatedAt");

            migrationBuilder.RenameColumn(
                name: "SubOrderId",
                table: "OrderItems",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_SubOrderId",
                table: "OrderItems",
                newName: "IX_OrderItems_OrderId");

            migrationBuilder.AddColumn<string>(
                name: "Carrier",
                table: "Orders",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedAt",
                table: "Orders",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ShippingCost",
                table: "Orders",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Orders",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "SubTotal",
                table: "Orders",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Tax",
                table: "Orders",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StoreTransfers_PaymentId_StoreId",
                table: "StoreTransfers",
                columns: new[] { "PaymentId", "StoreId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderId",
                table: "OrderItems",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderStatusHistory_Orders_OrderId",
                table: "OrderStatusHistory",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
