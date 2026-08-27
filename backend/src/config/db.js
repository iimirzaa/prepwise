import mongoose  from "mongoose";
import Logger from "../utils/logger.js";
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI,{
            maxPoolSize:10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        Logger.debug("Database Connected")

    }catch(e){
        Logger.error("Database Connection failed",e);
        console.log(e);
        process.exit(1);
        
    }
}
export default connectDB;