import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const staffLocationSchema = new Schema(
  {
    workdays: [Date],
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true  },
  },
  { timestamps: true }
);

// Indexes
staffLocationSchema.index({ "staffId": 1 });
staffLocationSchema.index({ "locationId": 1 });

staffLocationSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const StaffLocation = mongoose.model('StaffLocation', staffLocationSchema);

export default StaffLocation;
