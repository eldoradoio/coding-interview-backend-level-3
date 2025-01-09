import type { Sequelize } from "sequelize";
import { item as _item } from "./item";
import type { itemAttributes, itemCreationAttributes } from "./item";

export {
  _item as item,
};

export type {
  itemAttributes,
  itemCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const item = _item.initModel(sequelize);


  return {
    item: item,
  };
}
