import { downloadSocket } from "../controllers/socketConn"



const socketControllers = async (socket: any, io: any) => {

    await downloadSocket(socket, io)

}


export {socketControllers}