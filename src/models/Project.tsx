import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
      required: [true, "Project must have a title!"],
    },
    type: {
      type: [String],
      required: [true, "Project must have a type"],
      enum: [
        "MERN Application",
        "Landing Page",
        "CMS Development",
        "PSD to HTML",
        "SEO",
      ],
      default: "Landing Page",
    },
    desc: {
      type: String,
      required: [true, "Project must have a description!"],
    },
    postedAt: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    screens: {
      type: [String],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
