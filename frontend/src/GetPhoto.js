import AWS from 'aws-sdk'

const config = require('./awsConfig')
const s3 = new AWS.S3({
    accessKeyId: config.accessKeyId, 
    secretAccessKey: config.secretAccessKey, 
    signatureVersion: 'v4', 
    region: 'us-east-2'
})

async function awsGet(user){
    const url = s3.getSignedUrl('getObject', {
        Bucket: 'fe-capstone-bucket',
        Key: `${user}`,
        Expires: 60
    })
    console.log(url)
}

export default awsGet