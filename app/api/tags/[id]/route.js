import dbConnect from "@/app/lib/db";
import Tag from "@/app/lib/models/tag";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const tag = await Tag.findById(id);
    if (!tag) return NextResponse.json({ success: false, error: "Tag not found" }, { status: 404 });
    return NextResponse.json({ success: true, tag });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT (update)
export async function PUT(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const body = await req.json();
    const updated = await Tag.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Updated successfully", tag: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await dbConnect();

    // ✅ Await params because in your Next.js version they are async
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deleted = await Tag.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /tags/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}