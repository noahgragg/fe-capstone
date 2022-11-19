import React ,{useState, useRef} from 'react';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import profile_img from './css/profile_img.jpg';

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: 'fe-capstone-bucket'},
    region: 'us-east-2',
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
            Bucket: 'fe-capstone-bucket',
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
    fetch(process.env.DATA_URL + '/api/data/photo', 
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
          profilePhoto = process.env.BUCKET_URL + fileName})
        .then(() => {
            return setNewPhoto(newPhoto => !newPhoto)
        })
}}
export default UploadPhoto;