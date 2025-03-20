import mongoose from "mongoose";
import 'dotenv/config';


 export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on("connected", () => {
            console.log("Connected to DB");
        })
    } catch(err) {
        console.error("Error connecting to DB", err);
    }
};
