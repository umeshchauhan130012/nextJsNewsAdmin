import dbConnect from "@/app/lib/db";
import Copyright from "@/app/lib/models/copyright";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const copyrt = await Copyright.findById(id);
    if (!copyrt) return NextResponse.json({ success: false, error: "Copyright not found" }, { status: 404 });
    return NextResponse.json({ success: true, copyrt });
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
    const updated = await Copyright.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Updated successfully", copyright: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
