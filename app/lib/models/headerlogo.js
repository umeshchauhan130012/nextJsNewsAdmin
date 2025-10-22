import mongoose from "mongoose";

const headerLogoSchema = new mongoose.Schema({
    logolink: {
        type: String,
    },
    title: {
        type: String,
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

const HeaderLogo = mongoose.models.HeaderLogo || mongoose.model("HeaderLogo", headerLogoSchema);
export default HeaderLogo;