const aws = require('aws-sdk')

module.exports = {

    Mutation: {
        signS3: async (root, args, ctx) => {

            const {filename, filetype} = args;

            console.log("file", filetype)

            const s3 = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                signatureVersion: 'v4',
                region: 'us-west-1',
            })

            const s3Params = {
                Bucket: process.env.S3_BUCKET,
                Key: filename,
                Expires: 60,
                ContentType: filetype,
                ACL: 'public-read'
            }

            const signedRequest = await s3.getSignedUrl('putObject', s3Params);
            console.log(signedRequest)
            const url = `https://musicmap.s3.amazonaws.com/${filename}`;
            console.log(url)

            return {
                signedRequest,
                url
            }
        }
    }
};