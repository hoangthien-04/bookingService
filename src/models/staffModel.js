import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sex: { type: String, enum: ["male", "female", "other"] },
    image: {
      type: String,
    },
    address: {
      country: { type: String },
      city: { type: String },
      district: { type: String },
      specifict: { type: String },
    },
    phone: { type: String, required: true },
    services: [
      {
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        experience: { type: Number },
      },
    ],
    favoriteCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes
staffSchema.index({ "services.serviceId": 1 });
staffSchema.index({ "location.locationId": 1 });

staffSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
