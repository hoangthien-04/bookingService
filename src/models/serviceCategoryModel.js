import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const { Schema } = mongoose;

const serviceCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: [ String ],
    services: [
        {
            serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }
        }
    ]
  },
  { timestamps: true }
);

// Indexes
serviceCategorySchema.index({ name: 1 });
serviceCategorySchema.index({ "services.serviceId": 1 });

serviceCategorySchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

const ServiceCategory = mongoose.model("ServiceCategory", serviceCategorySchema);

export default ServiceCategory;
