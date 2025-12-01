import mongoose from "mongoose";

export const connectDB = async () => {
     await mongoose.connect('mongodb+srv://AlienceTech:Sandippandit@cluster0.czwvp.mongodb.net/FOOD').then(()=>console.log("DB Connected"));
}