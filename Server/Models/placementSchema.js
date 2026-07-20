import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    jobRole: {
      type: String,
      required: true,
    },

    package: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    placementDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Selected",
        "Joined",
        "Rejected",
      ],
      default: "Selected",
    },
  },
  {
    timestamps: true,
  }
);

const Placement = mongoose.model(
  "Placement",
  placementSchema
);

export default Placement;