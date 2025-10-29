import dbConnect from "@/app/lib/db";
import Copyright from "@/app/lib/models/copyright";
import { NextResponse } from "next/server";

// POST → create new tag
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const copyrt = new Copyright(body);
    await copyrt.save();
    return NextResponse.json({ message: "Copyright created", copyrt }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const copyrt = await Copyright.find();
    return NextResponse.json({ success: true, count: copyrt.length, copyrt });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
