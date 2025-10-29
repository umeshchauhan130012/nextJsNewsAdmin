const mongoose = require("mongoose"); 
const footerCatSchema = new mongoose.Schema ({ 
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
    uploadDate: { 
        type: Date, 
        default: Date.now 
    } }) 
delete mongoose.models.FooterCat;
const FooterCat = mongoose.model("FooterCat", footerCatSchema);
export default FooterCat;