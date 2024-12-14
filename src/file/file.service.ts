import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";


@Injectable()
export class FileService{
    
    CreatePath(name : string){
        const folder: string = `${process.env.PHOTO_PATH}`;
        console.log(process.env.PHOTO_PATH)
        return join(__dirname, folder, name);
    }
    async Upload(photo: Express.Multer.File, name: string ){
        const result = await writeFile(this.CreatePath(name), photo.buffer );

    }
}