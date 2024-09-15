import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


/**
 * Item Entity
 * @class
 * @property {number} id - El ID del ítem.
 * @property {string} name - El nombre del ítem.
 * @property {number} price - El precio del ítem.
 */
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal", { 
    transformer: { 
      to: (value: number) => 
        value, from: (value: string) => 
          parseFloat(value) } })
  price: number;
};