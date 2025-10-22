import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Story from "@/app/lib/models/story";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { protect } from "@/app/middleware/authMiddleware";
import { writeFile, mkdir } from "fs/promises";
import streamifier from "streamifier";
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
    const filefirst = formData.get("filefirst"); // File object
    const headline = formData.get("headline"); 
    const subheadline = formData.get("subheadline");
    const slugtext = formData.get("slugtext");
    const slug = formData.get("slug");
    const category = formData.get("category");
    const tags = formData.get("tags");
    const summary = formData.get("summary");
    const bodytext = formData.get("bodytext");
    const pagetitle = formData.get("pagetitle");
    const metatitle = formData.get("metatitle");
    const metakeyword = formData.get("metakeyword");
    const metadescription = formData.get("metadescription");
    const storystatus = formData.get("storystatus");
    const liveblog = formData.get("liveblog");
    const liveupdateJSON = formData.get("liveupdate");
    let liveupdate = [];
    if (liveupdateJSON) {
    try {
        liveupdate = JSON.parse(liveupdateJSON); // converts string to array
    } catch (err) {
        return NextResponse.json({ error: "Invalid liveupdate format" }, { status: 400 });
    }
    }

    if (!filefirst) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Convert file to buffer
    const bufferFirst = Buffer.from(await filefirst.arrayBuffer());

    // Optional: save to public/uploads
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });
    const fileFirstName = `${uuidv4()}-${filefirst.name}`;
    const fileFirstPath = path.join(uploadDir, fileFirstName);
    await writeFile(fileFirstPath, bufferFirst);

    // Upload to Cloudinary
    const cloudResult = await uploadToCloudinary(bufferFirst);

    // Save Story to DB
    const story = new Story({
      headline,
      subheadline,
      slugtext,
      slug,
      category,
      tags,
      summary,
      bodytext,
      pagetitle,
      metatitle,
      metakeyword,
      metadescription,
      storystatus,
      liveblog,
      liveupdate,
      filefirst: {
        filename: cloudResult.public_id,
        path: cloudResult.secure_url,
        size: bufferFirst.length,
        mimetype: filefirst.type,
      },
      createdBy: user._id,
    });

    await story.save();

    return NextResponse.json(
      { message: "Story created successfully", story },
      { status: 201 }
    );
  } catch (error) {
    console.error("Story upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    await dbConnect();
    const story = await Story.find();
    return NextResponse.json({ success: true, count: story.length, story });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

