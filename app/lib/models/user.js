import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: {
    type: String,
    enum: ["Administrator", "Admin", "User"],
    default: "User",    
  },
  permissions: {
    canModifyUsers: { type: Boolean, default: false },
    canModifyChildLabels: { type: Boolean, default: false },
  },
}, { timestamps: true });

// Pre-save hook for permissions and password hashing
UserSchema.pre("save", async function(next) {
  // Set permissions based on role
  if (this.role === "Administrator") {
    this.permissions = { canModifyUsers: true, canModifyChildLabels: true };
  } else if (this.role === "Admin") {
    this.permissions = { canModifyUsers: true, canModifyChildLabels: false };
  } else {
    this.permissions = { canModifyUsers: false, canModifyChildLabels: false };
  }

  // Hash password if it is new or modified
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Optional: Method to compare password during login
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
