import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete"; 
const { Schema } = mongoose;

const favoriteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    subType: { type: String, required: true, enum: ["staff", "location"] },
    subId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

// Indexes
favoriteSchema.index({ userId: 1 });
favoriteSchema.index({ subId: 1 });

favoriteSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
