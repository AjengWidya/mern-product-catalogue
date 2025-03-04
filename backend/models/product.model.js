import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true // it gives us the createdAt and updatedAt field
});

/**
 * The first argument is singular and capitalize
 * because mongoose will convert it as 'products'
 * when creating a collection
 */
const Product = mongoose.model("Product", productSchema);

export default Product;