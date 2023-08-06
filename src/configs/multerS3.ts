import * as multerS3 from 'multer-s3';
import {S3} from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

const s3StorageConfig = multerS3({
    s3: new S3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req: any, file: any, callback: any) => {
        callback(null, Date.now().toString());
    }
})

export default s3StorageConfig;