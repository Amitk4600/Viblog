import mongoose from "mongoose";

const NewStorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength:[5, "Title must be at least 5 characters"],
  },
  content: {
    type: String,
    required: true,
  },  
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v)&& v.length > 0;
        },
        message: "Tags must be an array with at least one element",
      }
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
});

export const NewStory = mongoose.model("NewStory", NewStorySchema);
export default NewStory;
