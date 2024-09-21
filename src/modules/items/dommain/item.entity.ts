import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'items' })
export class Item {
    @PrimaryGeneratedColumn()
    id!: number; //podriamos agregar un valor por defecto pero sabemos que esta propiedad como las de abajo van a ser inicializadas por TYPEORM

    @Column()
    name!: string;

    @Column('decimal', { transformer: { from: (value: string) => parseFloat(value), to: (value: number) => value } })
    price!: number;
}
