const mongoose = require("mongoose"); 
const networkMenuSchema = new mongoose.Schema ({ 
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
delete mongoose.models.NetworkMenu;
const NetworkMenu = mongoose.model("NetworkMenu", networkMenuSchema);
export default NetworkMenu;