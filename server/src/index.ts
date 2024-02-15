import { createServer } from "http";
import { Server } from "socket.io";
import express, { Express } from "express";
import cors from 'cors';
import { socketControllers } from "./routes/socketRoutes";

const app: Express = express();

const corsOrigin = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOrigin))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});


io.on("connection", (socket) => {
    socketControllers(socket, io)
});


const PORT: string | number = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log("server started at ", PORT))
