import NewStory from "../models/newStoryModele.js";

export const createStory = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user._id;

    // image upload logic ------
    const newStory = new NewStory({
      user: userId,
      title,
      content,
      tags,
      // image:imageUrl,
    });
    await newStory.save();
    res.status(201).json({ msg: "Story created successfully", newStory });
  } catch (error) {
    res.status(400).json({ msg: "Error creating story", error });
  }
};
