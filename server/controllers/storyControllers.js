export const createStory = async (req, res) => {
  const { title, content } = req.body;
  try {
    const story = await NewStory.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json(story);

  } catch (error) {
    res.status(400).json({msg: "Error creating story", error});
  }
};
