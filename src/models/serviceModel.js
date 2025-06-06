import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    name: { type: String, required: true },
    image: {
      type: String,
    },
    time: { type: Number, required: true },
  },
  { timestamps: true }
);

// Indexes
serviceSchema.index({ name: 1 });

serviceSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
