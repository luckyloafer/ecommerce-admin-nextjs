import mongoose from "mongoose";

let isConnected:boolean = false;

export const connectToDB = async (): Promise<void>=>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log("mongoDB is already connected");
        return
    }
    
    try {
    
        await mongoose.connect(process.env.MONGODB_URL||"",{
            dbName: "Borcelle_Admin"
        })
    
        isConnected = true;
        console.log('MongoDB is connected');
        
    } catch (error) {
        console.log("connection error in mongodb",error)
    }
}

