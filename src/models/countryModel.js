import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const countrySchema = new Schema(
  {
    countryName: {
      type: String,
      required: true
    },
    countryCode: {
      type: String,
      required: true
    },
    cities: [
      {
        cityName: { type: String, required: true },
        cityCode: { type: String, required: true },
      },
    ],
    images: [String]
  },
  { timestamps: true }
);

countrySchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
