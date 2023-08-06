import {Injectable} from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { randomInt } from 'crypto';
import * as dotenv from 'dotenv'
dotenv.config()
import base64Img from 'base64-img'
import * as fs from 'fs'

const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_TIME_EXPIRES = parseInt(process.env.AWS_TIME_EXPIRES);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-1',
    signatureVersion: 'v4'
});

@Injectable()
export class S3Service {
    async getImage(key: string) {
        const getPresignedURL = s3.getSignedUrl('getObject', {
            Bucket: AWS_BUCKET_NAME,
            Key: key,
            Expires: AWS_TIME_EXPIRES
        })
        return getPresignedURL;
    }

    async uploadImage (key: string) {
        const putPresignedURL = s3.getSignedUrl('putObject', {
            Bucket: AWS_BUCKET_NAME,
            Key: key,
            Expires: AWS_TIME_EXPIRES,
        })
        return putPresignedURL;
    }

    async uploadImageBase64 (imgBase64: string) {
        const generateImgKey = () => String(randomInt(1000) + new Date().getTime());
        const imgBuffer = Buffer.from(imgBase64, 'base64');

        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: generateImgKey(),
            ACL: 'public-read',
            Body: imgBuffer
        }

        const data = new Promise((resolve, reject) => {
            s3.putObject(params, (err, data) => {
                if(err){
                    console.log(err);
                }
                return resolve(data);
            })
        })

        console.log(data);
        return 'string';
    }
}
 