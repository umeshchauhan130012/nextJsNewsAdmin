import mongoose from "mongoose";

const footerLogoSchema = new mongoose.Schema({
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

const FooterLogo = mongoose.models.FooterLogo || mongoose.model("FooterLogo", footerLogoSchema);
export default FooterLogo;