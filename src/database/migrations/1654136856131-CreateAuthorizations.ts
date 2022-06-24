import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuthorizations1654136856131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "authorization_safeweb",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: "created_at", type: "datetime", default: "GETDATE()" },
                    { name: "identifierCA", type: "varchar", isNullable: true, default: null },
                    { name: "state", type: "varchar", isNullable: true, default: null },
                    { name: "expirationDate", type: "varchar", isNullable: true, default: null },
                    { name: "serialNumber", type: "varchar", isNullable: true, default: null },
                    { name: "dta_cri_token", type: "datetime", isNullable: true, default: null },
                    { name: "access_token", type: "varchar", isNullable: true, default: null },
                    { name: "expires_in", type: "INT", isNullable: true, default: null },
                    { name: "slot_alias", type: "varchar", isNullable: true, default: null },
                    { name: "error", type: "varchar", isNullable: true, default: null },
                    { name: "status", type: "BIT", default: 1 },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("authorization_safeweb");
    }

}
