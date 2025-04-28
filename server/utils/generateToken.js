import jwt from "jsonwebtoken";

export const generateToken = (res, user, msg) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  console.log("Token generated:", token); // Debugging line
  console.log("User ID:", user._id); // Debugging line
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ success: true, msg, user, token });
};
