import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {iItem} from "../interface/Items.interface";


/**
 * Entidad Item
 * 
 * Esta clase representa la entidad de un ítem en la base de datos.
 * 
 * @class Item
 * @implements {iItem}
 * @property {number} id - Identificador único del ítem, generado automáticamente.
 * @property {string} name - Nombre del ítem.
 * @property {number} price - Precio del ítem, almacenado como decimal en la base de datos.
 */
@Entity()
export class Item implements iItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal", { 
    transformer: { 
      to: (value: number) => value, 
      from: (value: string) => parseFloat(value) 
    } 
  })
  price: number;
};