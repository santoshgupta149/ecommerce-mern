import mongoose from "mongoose";
import color  from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongo database ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in mongo ${error}`.bgRed.white);
    }
}

export default connectDB;