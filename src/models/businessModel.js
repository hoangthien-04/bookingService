import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const businessSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
    },
    location: [],
  },
  { timestamps: true }
);

// Indexes
businessSchema.index({ name: 1 });
businessSchema.index({ email: 1 });

const Business = mongoose.model("Business", businessSchema);

export default Business;
