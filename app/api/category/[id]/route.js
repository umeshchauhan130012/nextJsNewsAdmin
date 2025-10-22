import dbConnect from "@/app/lib/db";
import Category from "@/app/lib/models/category";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const category = await Category.findById(id);
    if (!category) return NextResponse.json({ success: false, error: "category not found" }, { status: 404 });
    return NextResponse.json({ success: true, category });
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
    const updated = await Category.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Updated successfully", category: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /category/:id error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}