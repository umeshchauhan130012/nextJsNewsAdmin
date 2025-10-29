const mongoose = require("mongoose"); 
const headerMenuSchema = new mongoose.Schema ({ 
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
    isStatus: {
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
delete mongoose.models.HeaderMenu;
const HeaderMenu = mongoose.model("HeaderMenu", headerMenuSchema);
export default HeaderMenu;