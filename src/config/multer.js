import multer from "multer";
import storage from "./cloundinary"

const imageFilter = (file, cb ) => {
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/webp"
    ){
        cb(null, true);
    } else{
        cb({message: "Unsupported Format"}, false);
    }
};

const upload = multer({
    storage,
    imageFilter
});

export default upload