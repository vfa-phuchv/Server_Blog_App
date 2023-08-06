import {Injectable} from '@nestjs/common'
import {v2 as cloudinary} from 'cloudinary'
import * as dotenv from 'dotenv'
dotenv.config()

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: process.env.FOLDER_NAME,
  };

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRECT,
    secure: true,
});

@Injectable()
export class CloudinaryService {
    storeImg(imageBase64: string):Promise<any> {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(imageBase64, options, (error, result) => {
            if (result) {
              return resolve(result);
            }
            console.log(error);
            reject(error);
          });
        });
      };

    removeImg = (imageUrl: string) => {
    return new Promise(async (resolve, reject) => {
        //* detach and get publicId in url of image
        const publicId = imageUrl.split('/').pop().split('.')[0];
        //* cat full publicId of image
        const fullPublicId = `${options.folder}/${publicId}`;
        //* destroy image in cloud strore
        try {
        const result = await cloudinary.uploader.destroy(fullPublicId);
        return resolve(result);
        } catch (error) {
        return reject(error);
        }
    });
    };
}
