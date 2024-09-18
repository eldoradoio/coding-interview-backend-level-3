import { initializeServer, startServer } from "./server"

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})

const start = async() => {
    try {
        await startServer()
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

start()