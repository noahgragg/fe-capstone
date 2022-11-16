import React ,{useState, useRef} from 'react';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import profile_img from './css/profile_img.jpg';
const config = require('./awsConfig')

const S3_BUCKET = config.bucket;
const REGION = config.region;


AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
})

const myBucket = new AWS.S3({
    params: { Bucket: config.bucket},
    region: config.region,
})
var profilePhoto = ''
const UploadPhoto = (props) => {
    var propsPhoto = props.props.profile_image
    const inputFile = useRef(null)
    const [newPhoto, setNewPhoto] = useState(false)

    const handleFileInput = (e) => {
        uploadFile(e.target.files[0]);
    }
    const uploadFile = (file) => {
        console.log(file.name)
        const params = {
            Body: file,
            Bucket: config.bucket,
            Key: file.name
        };
        myBucket.putObject(params)
            .send((err) => {
                if (err) console.log(err)
            })
        uploadFilePath(file.name, props.props.username)
        //return () => setNewPhoto(newPhoto => !newPhoto)
    }
    const onImgClick = () => {
       inputFile.current.click();
      };
    return (
    <div>
        <img src={profilePhoto != '' ? profilePhoto : (propsPhoto != 'No Image' ? propsPhoto : profile_img)} onClick={onImgClick}width='200px'/>
        <input type="file" onChange={handleFileInput} ref={inputFile} style={{display: 'none'}}/>
    </div>
    )

function uploadFilePath(fileName, userName){
    fetch('http://localhost:8000/api/data/photo', 
    {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({image: fileName, username: userName}),
      })
      .then(res => console.log(res))
      .then(() => {
          profilePhoto = config.bucketURL + fileName})
        .then(() => {
            return setNewPhoto(newPhoto => !newPhoto)
        })
}}
export default UploadPhoto;