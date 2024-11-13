import User from "../models/User.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB...");

    // Clear existing users
    await User.deleteMany({});
    console.log("Cleared existing users...");

    // Create admin user
    const adminPassword = bcrypt.hashSync("admin123", bcrypt.genSaltSync(10));
    const admin = new User({
      username: "Admin",
      email: "admin@gmail.com",
      password: adminPassword,
      role: "admin"
    });

    // Create regular user
    const userPassword = bcrypt.hashSync("user123", bcrypt.genSaltSync(10));
    const regularUser = new User({
      username: "User",
      email: "user@gmail.com",
      password: userPassword,
      role: "user"
    });

    await admin.save();
    await regularUser.save();

    console.log("Sample users created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();