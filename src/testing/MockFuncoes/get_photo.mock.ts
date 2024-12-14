import { join, resolve } from "path"
import { getFileToBuffer } from "./get_file_buffer"

export const getPhoto = async ()=>{
   
    const path = resolve(__dirname, "../../../storage/photo/photo-5-0.jpg");
    const {buffer,stream} = await getFileToBuffer(path)  
    const photo : Express.Multer.File = {
                      
        fieldname: "file",
        
        originalname: "photo-5-0.jpg",

        encoding: "7bit",

        mimetype: "image/jpeg",

        size: 1024*1000*10,

        stream,

        destination: "",

        filename: "file-name",

        path: "file-path",

        buffer,
    }
    return photo;
}