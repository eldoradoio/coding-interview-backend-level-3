import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface itemAttributes {
  id: number;
  name?: string;
  price?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type itemPk = "id";
export type itemId = item[itemPk];
export type itemOptionalAttributes = "id" | "name" | "price" | "created_at" | "updated_at" | "deleted_at";
export type itemCreationAttributes = Optional<itemAttributes, itemOptionalAttributes>;

export class item extends Model<itemAttributes, itemCreationAttributes> implements itemAttributes {
  id!: number;
  name?: string;
  price?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof item {
    return sequelize.define('item', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: 'item',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof item;
  }
}
