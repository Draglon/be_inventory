import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  isNew: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  specification: {
    type: String,
    required: false,
  },
  guarantee: {
    start: {
      type: Date,
      required: false,
    },
    end: {
      type: Date,
      required: false,
    }
  },
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
  date: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
});

export default mongoose.model('Product', ProductSchema);
