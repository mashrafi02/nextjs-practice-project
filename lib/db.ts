import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;


if (!MONGODB_URI){
    throw new Error('Please define mongo db connection uri first in env variables');
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn : null, promise: null}
}


export async function connectToDatabase() {
    if (cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false, // Don't buffer - fail fast instead
          };
          
        mongoose.connect(MONGODB_URI, opts)
                .then( () => mongoose.connection)
    }

    try{
        cached.conn = await cached.promise
    }
    catch(err){
        cached.promise = null;
        throw err
    }

    return cached.conn
}