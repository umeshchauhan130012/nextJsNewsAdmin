import dbConnect from "@/app/lib/db";
import FooterMenu from "@/app/lib/models/footerMenu";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await dbConnect();
    const menus = await FooterMenu.find().sort({ uploadDate: -1 });
    return NextResponse.json(menus);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch menus" }, { status: 500 });
  }
}

// ✅ POST a new parent menu
export async function POST(req) {
  try {
    await dbConnect();
    const { itemname, slug, childmenu, isActive, isExternal, orderNum } = await req.json();

    if (!itemname || !slug) {
      return NextResponse.json(
        { error: "Item name and slug are required" },
        { status: 400 }
      );
    }

    const newMenu = new FooterMenu({
      itemname,
      slug,
      isActive,
      isExternal,
      orderNum,
      childmenu: childmenu || [],
    });

    await newMenu.save();
    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create menu" }, { status: 500 });
  }
}