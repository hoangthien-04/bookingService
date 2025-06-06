import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";  
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceLocationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes
appointmentSchema.index({ staffId: 1 });
appointmentSchema.index({ userId: 1 });
appointmentSchema.index({ serviceLocationId: 1 });

appointmentSchema.plugin(mongoose_delete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: "all",
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
