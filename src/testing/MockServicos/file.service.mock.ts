import { join } from "path";
import { FileService } from "../../file/file.service";


export const FileServiceMock = {
    provide: FileService,

    useValue:{
        CreatePath: jest.fn().mockReturnValue(join(__dirname, "../storage/photos/photo-5.jpg")),

        Upload: jest.fn()
    }



}