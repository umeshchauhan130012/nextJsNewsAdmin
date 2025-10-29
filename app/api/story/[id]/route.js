import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Story from "@/app/lib/models/story";
import { protect } from "@/app/middleware/authMiddleware";
import streamifier from "streamifier";
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
    const story = await Story.findById(id);
    if (!story) return NextResponse.json({ success: false, error: "story not found" }, { status: 404 });
    return NextResponse.json({ success: true, story });
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
    const story = await Story.findById(id);
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }
    // Parse FormData
    const formData = await req.formData();
    const filefirst = formData.get("filefirst"); // optional new file
    const fields = [
      "headline",
      "subheadline",
      "slugtext",
      "slug",
      "category",
      "tags",
      "summary",
      "bodytext",
      "pagetitle",
      "metatitle",
      "metakeyword",
      "metadescription",
      "storystatus",
    ];
    // Update metadata if provided
    fields.forEach((field) => {
      const value = formData.get(field);
      if (value) story[field] = value;
    });
    // Update liveupdate array if provided
    const liveupdateJSON = formData.get("liveupdate");
    if (liveupdateJSON) {
      try {
        story.liveupdate = JSON.parse(liveupdateJSON);
      } catch (err) {
        return NextResponse.json({ error: "Invalid liveupdate format" }, { status: 400 });
      }
    }
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
      story.filefirst = {
        filename: cloudResult.public_id,
        path: cloudResult.secure_url,
        size: bufferFirst.length,
        mimetype: filefirst.type,
      };
    }
    await story.save();
    return NextResponse.json({ success: true, message: "Story updated successfully", story }, { status: 200 });
  } catch (error) {
    console.error("Story update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// delete
export async function DELETE(req, context) {
  try {
    await dbConnect();

    // Authenticate user
    const user = await protect(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

     if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }

    // const storyId = params.id;

    // Delete story
    const deletedStory = await Story.findByIdAndDelete(id);

    if (!deletedStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Story deleted successfully", deletedStory }, { status: 200 });
  } catch (err) {
    console.error("Story delete error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}