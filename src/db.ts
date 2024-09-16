import { MongoClient, Db } from "mongodb";

let dbA: Db;
let dbB: Db;

export interface ItemDocument {
  _id: number;
  id: number;
  name: string;
  price: number;
  [key: string]: any;
}

export const connectToDatabases = async () => {
  const clientA = await MongoClient.connect("mongodb://localhost:27017/dbA");
  const clientB = await MongoClient.connect("mongodb://localhost:27018/dbB");

  dbA = clientA.db();
  dbB = clientB.db();

  console.log("Connected to both databases");
};

export const getDatabase = (isEven: boolean): Db => {
  return isEven ? dbA : dbB;
};

export const getAllItems = async () => {
  const itemsA = await dbA
    .collection("items")
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const itemsB = await dbB
    .collection("items")
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return [...itemsA, ...itemsB];
};

export const getItem = async (id: number) => {
  const db = getDatabase(id % 2 === 0);
  return await db
    .collection<ItemDocument>("items")
    .findOne({ _id: id }, { projection: { _id: 0 } });
};

export const saveItem = async (item: {
  id: number;
  name: string;
  price: number;
}) => {
  const db = getDatabase(item.id % 2 === 0);
  const itemWithCustomId: ItemDocument = { ...item, _id: item.id };
  await db.collection<ItemDocument>("items").insertOne(itemWithCustomId);
};
