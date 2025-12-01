import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, reqired: true },
  description: { type: String, reqired: true },
  price: { type: Number, reqired: true },
  image: { type: String, reqired: true },
  category: { type: String, reqired: true },
});

const foodModel = mongoose.model.food || mongoose.model("food", foodSchema);

export default foodModel;