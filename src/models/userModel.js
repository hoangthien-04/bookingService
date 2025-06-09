import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true, maxlength: 100 },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    phone: { type: String, required: true, maxlength: 20 },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dv9yzzjgg/image/upload/v1749205277/logo_default_mzji5s.png",
    },
    dob: { type: Date },
    address: {
      country: String,
      city: String,
      district: String,
      specifict: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const User = mongoose.model("User", userSchema);

export default User;
