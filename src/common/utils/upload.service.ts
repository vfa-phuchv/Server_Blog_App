import {Injectable} from '@nestjs/common'
import * as AWS from 'aws-sdk'
import * as dotenv from 'dotenv'
dotenv.config()

const AWS_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_TIME_EXPIRES = parseInt(process.env.AWS_TIME_EXPIRES);

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: String(process.env.AWS_REGION),
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
}
 