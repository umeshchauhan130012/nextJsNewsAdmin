import jwt from "jsonwebtoken";
import User from "../lib/models/user";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function protect(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Not authorized, no token");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Not authorized, token failed");
  }
}
