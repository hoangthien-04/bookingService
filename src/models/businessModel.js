import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const businessSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: {
      type: String,
      default: "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
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

businessSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Business = mongoose.model("Business", businessSchema);

export default Business;
