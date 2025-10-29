import dbConnect from "@/app/lib/db";
import FooterMenu from "@/app/lib/models/footerMenu";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  try {
    await dbConnect();
     const params = await context.params;
    const id = params.id;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Menu ID is required" }, { status: 400 });
    }

    // Only update allowed fields
    const allowedFields = [
      "itemname",
      "slug",
      "isActive",
      "isExternal",
      "orderNum",
      "childmenu",
    ];

    const updateObj = {};
    allowedFields.forEach((key) => {
      if (body[key] !== undefined) {
        updateObj[key] = body[key];
      }
    });

    const updatedMenu = await FooterMenu.findByIdAndUpdate(
      id,
      { $set: updateObj },
      { new: true }
    );

    if (!updatedMenu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMenu);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update menu" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
    const { id } = await context.params;

  try {
    await dbConnect();
    const deleted = await FooterMenu.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 });
  }
}