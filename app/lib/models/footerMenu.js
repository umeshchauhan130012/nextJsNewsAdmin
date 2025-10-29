const mongoose = require("mongoose"); 
const footerMenuSchema = new mongoose.Schema ({ 
    itemname: {
         type: String, 
         required: true 
    }, 
    slug: { 
        type: String, 
        required: true 
    }, 
    isActive: {
         type: Boolean, 
         default: false
    },
    isExternal: {
         type: Boolean, 
         default: false
    },
    orderNum: { 
        type: String, 
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
delete mongoose.models.FooterMenu;
const FooterMenu = mongoose.model("FooterMenu", footerMenuSchema);
export default FooterMenu;