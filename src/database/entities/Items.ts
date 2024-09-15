import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}