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
      price: [
        {
          "value": {
            type: Number,
            required: true,
          },
          "symbol": {
            type: String,
            required: true,
          },
          "isDefault": {
            type: Number,
            required: false,
          }
        },
      ],
    },
  ],
},
{
  timestamps: true,
});

export default mongoose.model('Order', OrderSchema);
