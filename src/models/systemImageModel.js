import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const systemImageSchema = new Schema(
  {
    country: {type: String, required: true},
    images: [String]
  },
  { timestamps: true }
);

// Indexes
systemImageSchema.index({ "country": 1 });

systemImageSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const SystemImage = mongoose.model('SystemImage', systemImageSchema);

export default SystemImage;
