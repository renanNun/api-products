import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1646849374701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        isNullable: false,
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: "category_id",
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ProductCategory',
                        columnNames: ['category_id'],
                        referencedTableName: 'categories',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ]
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
