import multer from "multer";
import storage from "./cloundinary"

const imageFilter = (file, cb ) => {
    if(
        file.minetype === "image/jpeg" ||
        file.minetype === "image/png" ||
        file.minetype === "image/webp"
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