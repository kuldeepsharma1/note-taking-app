import mongoose from 'mongoose';

export const connect = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.DB_URI)
        console.log(`Connection is established to ${connection.connection.host}`);
    } catch (error) {
        console.error('Connection is not established', error);
    }
}

