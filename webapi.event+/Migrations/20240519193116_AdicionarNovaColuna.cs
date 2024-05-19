using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.event_.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarNovaColuna : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                table: "Usuario",
                type: "VARCHAR(60)",
                maxLength: 60,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "VARCHAR(60)",
                oldMaxLength: 60);

            migrationBuilder.AddColumn<string>(
                name: "GoogleIdAccount",
                table: "Usuario",
                type: "VARCHAR(100)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CNPJ",
                table: "Instituicao",
                type: "CHAR(14)",
                maxLength: 14,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(14)",
                oldMaxLength: 14);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoogleIdAccount",
                table: "Usuario");

            migrationBuilder.AlterColumn<string>(
                name: "Senha",
                table: "Usuario",
                type: "VARCHAR(60)",
                maxLength: 60,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "VARCHAR(60)",
                oldMaxLength: 60,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CNPJ",
                table: "Instituicao",
                type: "VARCHAR(14)",
                maxLength: 14,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "CHAR(14)",
                oldMaxLength: 14);
        }
    }
}
