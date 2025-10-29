import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { protect } from "@/app/middleware/authMiddleware";
import streamifier from "streamifier";
import HeaderLogo from "@/app/lib/models/headerlogo.js";
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
    const headlogo = await HeaderLogo.findById(id);
    if (!headlogo) return NextResponse.json({ success: false, error: "logo not found" }, { status: 404 });
    return NextResponse.json({ success: true, headlogo });
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
    const headlogo = await HeaderLogo.findById(id);
    if (!headlogo) {
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
      if (value) headlogo[field] = value;
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
      headlogo.filefirst = {
        filename: cloudResult.public_id,
        path: cloudResult.secure_url,
        size: bufferFirst.length,
        mimetype: filefirst.type,
      };
    }
    await headlogo.save();
    return NextResponse.json({ success: true, message: "logo updated successfully", headlogo }, { status: 200 });
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
    const headlogo = await HeaderLogo.findByIdAndDelete(id);
    if (!headlogo) {
      return NextResponse.json({ error: "Logo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "logo deleted successfully", headlogo }, { status: 200 });
  } catch (err) {
    console.error("logo delete error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}