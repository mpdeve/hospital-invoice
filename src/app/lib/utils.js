import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://mj:3cFkNjVNnNleAIc0@cluster0.mprful2.mongodb.net/hosinvoice?retryWrites=true&w=majority";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => {
                return mongoose;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;
