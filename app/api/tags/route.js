import dbConnect from "@/app/lib/db";
import Tag from "@/app/lib/models/tag";
import { NextResponse } from "next/server";

// POST → create new tag
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const tag = new Tag(body);
    await tag.save();
    return NextResponse.json({ message: "Tag created", tag }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const tags = await Tag.find();
    return NextResponse.json({ success: true, count: tags.length, tags });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
