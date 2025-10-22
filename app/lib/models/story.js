const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    subheadline: {
        type: String,
    },
    slug: {
        type: String,
        required: true
    },
    slugtext: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    summary: {
        type: String,
    },
    bodytext: {
        type: String,
    },
    liveblog: {
        type: Boolean, 
        required: true,
        default: false,
    },
    liveupdate: [
        {
        title: String,
        content: String,
        date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    pagetitle: {
        type: String,
    },
    metatitle: {
        type: String,
    },
    metakeyword: {
        type: String,
    },
    metadescription: {
        type: String,
    },
    storystatus: { 
        type: String, 
        required: true 
    },
    filefirst: {
        filename: String,
        path: String,
        size: Number,
        mimetype: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
})

const Story = mongoose.models.Story || mongoose.model("Story", storySchema);
export default Story;