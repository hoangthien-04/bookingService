import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    rate: { type: Number, min: 1, max: 5, required: true },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subType: { type: String, required: true },
    subId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

// Indexes
reviewSchema.index({ appointmentId: 1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ subType: 1 });

reviewSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
