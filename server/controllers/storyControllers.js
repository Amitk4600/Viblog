import NewStory from "../models/newStoryModele.js";

export const createStory = async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;
    const userId = req.user._id;

    if (!title || !content || !tags) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    if (!image) {
      delete requestBody.image;
    }
    // image upload logic ------
    const newStory = new NewStory({
      user: userId,
      title,
      content,
      tags,
      image:image || "",
    });
    await newStory.save();
    res.status(201).json({ msg: "Story created successfully", newStory });
  } catch (error) {
    res.status(400).json({ msg: "Error creating story", error });
  }
};
