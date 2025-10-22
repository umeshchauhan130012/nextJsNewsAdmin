import dbConnect from "@/app/lib/db";
import Category from "@/app/lib/models/category";
import { NextResponse } from "next/server";

// POST → create new tag
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const category = new Category(body);
    await category.save();
    return NextResponse.json({ message: "category created", category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const category = await Category.find();
    return NextResponse.json({ success: true, count: category.length, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
