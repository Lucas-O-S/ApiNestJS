import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth_login.dto";
import { AuthRegisterDto } from "./dto/auth_register.dto";
import { AuthForgetDto } from "./dto/auth_forget.dto";
import { UserService } from "src/user/user.service";
import { AuthService as AuthService } from "./auth.service";
import { AuthResetDto } from "./dto/auth_reset.dto";
import { AuthGuard } from "src/Guards/auth.guard";
import { User } from "src/decorators/param_user.decorator";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join } from "path";
import { count } from "console";
import { FileService } from "src/file/file.service";



@Controller('auth')
export class AuthController{

    constructor(
        private readonly userService: UserService,
        private readonly authService:AuthService,
        private readonly fileService: FileService
    ){}

    @Post("login")
    async Login(@Body() body : AuthLoginDto){
        return this.authService.Login(body.email,body.password)
    }

    
    @Post("register")
    async Register(@Body() body : AuthRegisterDto){
        return this.authService.Register(body);
    }
    @Post("forget")
    async Forget(@Body() body : AuthForgetDto){
        return this.authService.Forget(body.email);
    }

    @Post("reset")
    async Reset(@Body() body : AuthResetDto){
        return this.authService.Reset(body.password, body.token);

    }

    @UseInterceptors(FileInterceptor("file"))
    @UseGuards(AuthGuard)
    @Post("photo")
    async UploadPhoto(
        @User() user, 
        
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: /(image\/jpeg|image\/png)/}),
                new MaxFileSizeValidator({maxSize: 1024*1000*10})

            ]
        })) photo : Express.Multer.File)
        {
        const name: string = `photo-${user.id}.jpg`;  
        try{
            await this.fileService.Upload(photo, name);
            return {sucess:true}
        }
        catch(ex){
            throw new BadRequestException(ex)
        }

    }

    @UseInterceptors(FilesInterceptor("file"))
    @UseGuards(AuthGuard)
    @Post("photos")
    async UploadPhotoMany(@User() user,        
    @UploadedFiles(new ParseFilePipe({
        validators: [
            new FileTypeValidator({fileType: /(image\/jpeg|image\/png)/}),
            new MaxFileSizeValidator({maxSize: 1024*1000*10})

        ]
    })) photos: Express.Multer.File[])
    {
       
        try{
            for(let i = 0; i < photos.length; i++){
                const name: string = `photo-${user.id}-${i}.jpg`;  
                await this.fileService.Upload(photos[i], name);

            }
            return {sucess:true}
        }
        catch(ex){
            console.log("Erro de upload")
            throw new BadRequestException(ex)
        }

    }

}