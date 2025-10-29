import dbConnect from "@/app/lib/db";
import NetworkMenu from "@/app/lib/models/networkmenu";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await dbConnect();
    const menus = await NetworkMenu.find().sort({ uploadDate: -1 });
    return NextResponse.json(menus);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch network menus" }, { status: 500 });
  }
}

// ✅ POST a new parent menu
export async function POST(req) {
  try {
    await dbConnect();
    const { itemname, slug, isActive, isExternal, orderNum } = await req.json();

    if (!itemname || !slug) {
      return NextResponse.json(
        { error: "Item name and slug are required" },
        { status: 400 }
      );
    }

    const newMenu = new NetworkMenu({
      itemname,
      slug,
      isActive,
      isExternal,
      orderNum,
    });
    await newMenu.save();
    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create network menu" }, { status: 500 });
  }
}