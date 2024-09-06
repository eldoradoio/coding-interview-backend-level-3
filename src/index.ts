import { startServer } from "./server";

const start = async () => {
  await startServer();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start();
