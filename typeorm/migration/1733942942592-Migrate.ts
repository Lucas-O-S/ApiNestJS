import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1733942942592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            },
            {
                name: "name",
                type: "varchar",
                length: "127"
            },
            {
                name: "email",
                type: "varchar",
                length: "127",
                isUnique: true
            },
            {
                name: "password",
                type: "varchar",
                length: "127"
            },
            {
                name: "role",
                type: "int",
                default: "1"
            },
            {
                name: "Created_at",
                type: "timestamp",
                length: "CURRET_TIMESTAMP()"
            },
            {
                name: "update_at",
                type: "timestamp",
                length: "CURRET_TIMESTAMP()"
            },
        ],
            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    
    }

}
