import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuthorizations1654136856131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "authorization_safeweb",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: "identifierCA", type: "varchar" },
                    { name: "state", type: "varchar" },
                    { name: "expirationDate", type: "Date" },
                    { name: "serialNumber", type: "varchar" },
                    { name: "status", type: "BIT", default: 1 },
                    { name: "created_at", type: "datetime", default: "GETDATE()" },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("authorization_safeweb");
    }

}
