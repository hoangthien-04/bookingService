import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 20,
    },
    name: { type: String, required: true },
    address: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      cityCode: {
        type: String,
      },
      district: {
        type: String,
      },
      specifict: {
        type: String,
      },
    },
    services: [
      {
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        price: { type: Number, required: true },
      },
    ],
    favoriteCount: { type: Number, default: 0 },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes
locationSchema.index({ "services.serviceId": 1 });
locationSchema.index({ businessId: 1 });

locationSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
