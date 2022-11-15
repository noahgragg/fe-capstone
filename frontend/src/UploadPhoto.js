import React ,{useState} from 'react';
import AWS from 'aws-sdk'
const config = require('./awsConfig')

const S3_BUCKET = config.bucket;
const REGION = config.region;


AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadPhoto = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        uploadFile(e.target.files[0]);
    }
    const uploadFile = (file) => {
        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }
    return (
    <div>
        <div>Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        {/* <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button> */}
    </div>
    )
}

export default UploadPhoto;