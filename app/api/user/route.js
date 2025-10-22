import dbConnect from "@/app/lib/db";
import User from "@/app/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.password || !data.role) {
      return NextResponse.json(
        { success: false, error: "Name, email, password, and role are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered." },
        { status: 409 }
      );
    }

    // Hash password
    const newUser = await User.create(data);

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}



export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);

    // Requester's email (mandatory)
    const requesterEmail = searchParams.get("email");
    if (!requesterEmail) {
      return NextResponse.json(
        { success: false, error: "Requester email is required in query params." },
        { status: 400 }
      );
    }

    // Fetch requester from DB
    const requester = await User.findOne({ email: requesterEmail }).select("role");
    if (!requester) {
      return NextResponse.json(
        { success: false, error: "Requester not found." },
        { status: 404 }
      );
    }

    const actualRole = requester.role;

    // Optional filters
    const filterRole = searchParams.get("filterRole"); // Admin, User
    const filterName = searchParams.get("filterName");
    const filterEmail = searchParams.get("filterEmail");

    let query = {};

    // Role-based access control
    if (actualRole === "Administrator") {
      // Admin sees all by default
      if (!filterRole || filterRole === "Administrator") {
        query.role = { $in: ["Admin", "User"] }; // Administrator filter → Admin + User
      } else if (filterRole === "Admin") {
        query.role = "Admin";
      } else if (filterRole === "User") {
        query.role = "User";
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid filterRole specified." },
          { status: 400 }
        );
      }
    } else if (actualRole === "Admin") {
      // Admin can see Users only
      query.role = "User";
    } else if (actualRole === "User") {
      // User can see only themselves
      query.email = requesterEmail;
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid requester role." },
        { status: 400 }
      );
    }

    // Apply optional name/email filters
    if (filterName) query.name = { $regex: new RegExp(filterName, "i") };
    if (filterEmail) query.email = filterEmail;

    // Fetch users
    let users = await User.find(query).select("name email role").lean();

    // Ensure role is always present
    users = users.map(u => ({ ...u, role: u.role || "User" }));

    return NextResponse.json({ success: true, count: users.length, users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const requesterRole = searchParams.get("role"); 
    const requesterEmail = searchParams.get("email");
    const data = await req.json();

    if (!requesterRole || !requesterEmail) {
      return NextResponse.json(
        { success: false, error: "Requester role and email are required in query params." },
        { status: 400 }
      );
    }

    const { targetEmail, update } = data; 
    if (!targetEmail || !update) {
      return NextResponse.json(
        { success: false, error: "Target email and update object are required." },
        { status: 400 }
      );
    }

    const targetUser = await User.findOne({ email: targetEmail });
    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "Target user not found." },
        { status: 404 }
      );
    }

    // Role-based permissions
    if (requesterRole === "Administrator") {
      // Can update Admins and Users, but not other Administrators
      if (targetUser.role === "Administrator") {
        return NextResponse.json(
          { success: false, error: "Administrator cannot modify another Administrator." },
          { status: 403 }
        );
      }
    } else if (requesterRole === "Admin") {
      // Can only update Users
      if (targetUser.role !== "User") {
        return NextResponse.json(
          { success: false, error: "Admin can modify only User accounts." },
          { status: 403 }
        );
      }
    } else {
      // Users cannot modify anyone
      return NextResponse.json(
        { success: false, error: "You do not have permission to modify any users." },
        { status: 403 }
      );
    }

    // Perform the update
    const updatedUser = await User.findOneAndUpdate(
      { email: targetEmail },
      { $set: update },
      { new: true }
    );

    return NextResponse.json({ success: true, updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}