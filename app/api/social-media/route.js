import dbConnect from "@/app/lib/db";
import SocialMedia from "@/app/lib/models/socialMedia";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await dbConnect();
    const menus = await SocialMedia.find().sort({ uploadDate: -1 });
    return NextResponse.json(menus);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to getting social" }, { status: 500 });
  }
}

// ✅ POST a new parent menu
export async function POST(req) {
  try {
    await dbConnect();
    const { itemname, childmenu } = await req.json();

    if (!itemname) {
      return NextResponse.json(
        { error: "Item name and slug are required" },
        { status: 400 }
      );
    }

    const newMenu = new SocialMedia({
      itemname,
      childmenu: childmenu || [],
    });

    await newMenu.save();
    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create social media" }, { status: 500 });
  }
}