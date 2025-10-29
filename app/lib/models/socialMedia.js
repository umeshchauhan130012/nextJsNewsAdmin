const mongoose = require("mongoose"); 
const socialMediaSchema = new mongoose.Schema ({ 
    itemname: {
         type: String, 
         required: true 
    },
    childmenu: [ 
        {
            title: { type: String },
            link: { type: String },
            isActive: { type: Boolean, default: false },
            linkType: { type: Boolean, default: false },
            indexNum: { type: String },
            date: { type: Date, default: Date.now },
        },
    ], 
    uploadDate: { 
        type: Date, 
        default: Date.now 
    } }) 
delete mongoose.models.SocialMedia;
const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
export default SocialMedia;