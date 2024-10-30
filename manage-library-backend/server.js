require("dotenv").config()
const app = require('./app')
const mongoose = require('mongoose')
const http = require('http')
const io = require('./src/socket/index')

const server = http.createServer(app)

// io(server)

const PORT = process.env.PORT;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB successfully');
    } catch(err) {
        console.error(err);
        process.exit()
    }

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer()