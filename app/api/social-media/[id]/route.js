import dbConnect from "@/app/lib/db";
import SocialMedia from "@/app/lib/models/socialMedia";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  try {
    await dbConnect();
     const params = await context.params;
    const id = params.id;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Social media ID is required" }, { status: 400 });
    }

    // Only update allowed fields
    const allowedFields = [
      "itemname",
      "childmenu",
    ];

    const updateObj = {};
    allowedFields.forEach((key) => {
      if (body[key] !== undefined) {
        updateObj[key] = body[key];
      }
    });

    const updatedMenu = await SocialMedia.findByIdAndUpdate(
      id,
      { $set: updateObj },
      { new: true }
    );

    if (!updatedMenu) {
      return NextResponse.json({ error: "Social media not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMenu);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to Social media update menu" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
    const { id } = await context.params;

  try {
    await dbConnect();
    const deleted = await SocialMedia.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Social media not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Social media deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete Social media" }, { status: 500 });
  }
}