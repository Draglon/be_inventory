import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
		{
      type: String,
      required: false,
    },
  ],
},
{
  timestamps: true,
});

export default mongoose.model('Order', OrderSchema);
