import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { protect } from "@/app/middleware/authMiddleware";
import streamifier from "streamifier";
import FooterLogo from "@/app/lib/models/footerlogo.js";
const cloudinary = require("../../../middleware/cloudinary.js");

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
//get api
export async function GET(req, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const footlogo = await FooterLogo.findById(id);
    if (!footlogo) return NextResponse.json({ success: false, error: "logo not found" }, { status: 404 });
    return NextResponse.json({ success: true, footlogo });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
//patch api
export async function PUT(req, context) {
  try {
    await dbConnect();
    // Authenticate user
    const user = await protect(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {id} = await context.params;
    const footlogo = await FooterLogo.findById(id);
    if (!footlogo) {
      return NextResponse.json({ error: "logo not found" }, { status: 404 });
    }
    // Parse FormData
    const formData = await req.formData();
    const filefirst = formData.get("filefirst"); // optional new file
    const fields = [
      "logolink",
      "title",
    ];
    // Update metadata if provided
    fields.forEach((field) => {
      const value = formData.get(field);
      if (value) footlogo[field] = value;
    });
    // Handle new file upload
    if (filefirst && filefirst.size > 0) {
      const bufferFirst = Buffer.from(await filefirst.arrayBuffer());
      // Optional: save locally
      // const uploadDir = path.join(process.cwd(), "public/uploads");
      // await mkdir(uploadDir, { recursive: true });
      // const fileFirstName = `${uuidv4()}-${filefirst.name}`;
      // const fileFirstPath = path.join(uploadDir, fileFirstName);
      // await writeFile(fileFirstPath, bufferFirst);
      // Upload to Cloudinary
      const cloudResult = await uploadToCloudinary(bufferFirst);
      // Update story file info
      footlogo.filefirst = {
        filename: cloudResult.public_id,
        path: cloudResult.secure_url,
        size: bufferFirst.length,
        mimetype: filefirst.type,
      };
    }
    await footlogo.save();
    return NextResponse.json({ success: true, message: "logo updated successfully", footlogo }, { status: 200 });
  } catch (error) {
    console.error("logo update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// delete
export async function DELETE(req, context) {
  try {
    await dbConnect();
    const user = await protect(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params;
     if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }
    // Delete story
    const footlogo = await FooterLogo.findByIdAndDelete(id);
    if (!footlogo) {
      return NextResponse.json({ error: "Logo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "logo deleted successfully", footlogo }, { status: 200 });
  } catch (err) {
    console.error("logo delete error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}