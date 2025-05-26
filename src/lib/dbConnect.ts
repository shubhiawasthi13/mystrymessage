
import mongoose, { connection } from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const Connection :ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(Connection.isConnected){
        console.log("Already Connected to database")
        return
    }
    try{
     const db =  await mongoose.connect(process.env.DATABASE_URI || '',{})
     Connection.isConnected = db.connections[0].readyState 
     console.log("db connected successfully")
    }
    catch(error){
        console.log("db connection failed", error)
        process.exit(1)
    }
}
export default dbConnect;