import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategoryProducts1646849617022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categories_categories_products',
                columns: [
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['category_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'categories',
                    },
                    {
                        columnNames: ['product_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'products',
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories_categories_products');
    }

}
