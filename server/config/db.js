import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const connectdb= async()=>{
    try {
        const connectInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Connected to database ${connectInstances.connection.host}`);
    } catch (error) {
        console.log("Error connecting to database",error);
        process.exit(1);
    }
}