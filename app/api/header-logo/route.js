import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { protect } from "@/app/middleware/authMiddleware";
import streamifier from "streamifier";
import HeaderLogo from "@/app/lib/models/headerlogo.js";
const cloudinary = require("../../middleware/cloudinary.js");

// Upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export async function POST(req) {
  try {
    await dbConnect();

    // Authenticate user
    const user = await protect(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse FormData
    const formData = await req.formData();
    const filefirst = formData.get("filefirst"); 
    const logolink = formData.get("logolink"); 
    const title = formData.get("title");
    if (!filefirst) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Convert file to buffer
    const bufferFirst = Buffer.from(await filefirst.arrayBuffer());

    // Optional: save to public/uploads
    // const uploadDir = path.join(process.cwd(), "public/uploads");
    // await mkdir(uploadDir, { recursive: true });
    // const fileFirstName = `${uuidv4()}-${filefirst.name}`;
    // const fileFirstPath = path.join(uploadDir, fileFirstName);
    // await writeFile(fileFirstPath, bufferFirst);

    // Upload to Cloudinary
    const cloudResult = await uploadToCloudinary(bufferFirst);

    // Save Story to DB
    const headerLogo = new HeaderLogo({
      logolink,
      title,
      filefirst: {
        filename: cloudResult.public_id,
        path: cloudResult.secure_url,
        size: bufferFirst.length,
        mimetype: filefirst.type,
      },
      createdBy: user._id,
    });
    await headerLogo.save();
    return NextResponse.json(
      { message: "Header Logo created successfully", headerLogo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Header Logo upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    await dbConnect();
    const headerlogo = await HeaderLogo.find();
    return NextResponse.json({ success: true, count: headerlogo.length, headerlogo });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

