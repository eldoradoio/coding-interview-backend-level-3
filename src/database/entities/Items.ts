import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {iItem} from "../interface/Items.interface";


/**
 * Item Entity
 * @class
 * @property {number} id - El ID del ítem.
 * @property {string} name - El nombre del ítem.
 * @property {number} price - El precio del ítem.
 */
@Entity()
export class Item implements iItem {
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