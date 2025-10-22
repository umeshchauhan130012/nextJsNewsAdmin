import dbConnect from "@/app/lib/db";
import { protect } from "@/app/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const user = await protect(req);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 401 });
  }
}
