import Category from "@modules/category/entities/Category";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}