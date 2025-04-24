import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img');
    },
    filename: function(req, file, cb){
        const type = file.originalname.split('.').pop();
        const r = `${Date.now()}.${type}`;
        cb(null, r);
    }
})

export default storage;