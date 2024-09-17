import { startServer } from "./server"

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})

const run = async () => {
    try {
        await startServer();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
