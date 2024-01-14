import React,{useEffect,useState,useRef} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import 'firebase/storage';
import {ref, getDownloadURL, uploadBytesResumable, deleteObject} from 'firebase/storage';
import { storage } from '../config/firebase';
import useAuthContext from "../hooks/useAuthContext";

export default function LiveCardAdmin(props) {

  const [filePath, setFilePath] = useState('');
  const fileInputRef = useRef();
  const {auth} = useAuthContext();
    let logedUserName = auth.user?.username;
    let logedUserPwd = auth.user?.password;


    const [data, setData] = useState([]); 
   const [VideoID, setVideoID] =useState(''); 

   console.log(filePath);
   console.log(VideoID);

    const handleVideoDelete = async () => {
      if(!props.filePath) return;

      try {
          deleteObject(ref(storage, props.filePath))
              .then(() => {
                  // File deleted successfully
                  console.log('file deleted');
              }).catch((error) => {
                  // Uh-oh, an error occurred!
                  console.log(error);
              });
      } catch(err) {

      }

    }
    const [cardVisible,setCardVisible] = useState(true);
    const disableItem = () => 
    {
        setCardVisible(false);
    }

    // const getALlVideos = () =>{
    //   fetch('http://localhost:8083/api/v1/admins/getAllVideos',
    //     {
    //       method :'GET',
    //       header:{'Accept': 'application/json','Content-Type':'application/json'},
    //       headers :{
    //                 'Content-Type': 'application/json'  
    //                 }
    //     }
    //   )
    //   .then(resp => {
    //     console.log(resp);
    //         if(resp.ok){
    //     resp.json().then(data => {
    //             setData(data.data);
    //                 data.data.forEach(row => {
    //                 console.log(row.id);
    //                 console.log(row.title);
    //                 console.log(row.description);
    //                 console.log(row.status);
    //                 console.log(row.filePath);
    //                 console.log(row.videoLink);
    //               }
    //             )
    //           }
    //         );           
    //       }
    //     }
    //   )
    //   .catch(error => {
    //     }
    // ); 
    // }
    //     useEffect(() => {
    //     getALlVideos();
    // }, []);

    const deleteVideoByID = () =>{
      fetch('http://localhost:8083/api/v1/admins/deleteVideoByID?videoID='+props.id,
        {
          method :'DELETE',
          header:{'Accept': 'application/json','Content-Type':'application/json'},
          headers :{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(logedUserName + ':' + logedUserPwd)
                    }
        }
      )
      .then(resp => {
        console.log(resp);
          if(resp.ok){
              resp.json().then(data => {
              console.log(data.data.title);
              console.log(data.data.videoLink);
              handleVideoDelete(data.data.videoLink);
              handleVideoDelete();
              disableItem();
              }
              )
          }
          if(resp.status === 404){
            console.log("video not in database.");
          }       
        }
      )
      .catch(error => {
        }
    ); 
    }

    
  return (
    
    <div>
        {cardVisible && (<Card sx={{Height:550, maxWidth: 245,margin: '5px 5px' }}>
      <CardActionArea sx={{Height:550}}>
        <CardMedia
           component="a"
           height="140"
           href={props.LinkVideo}
           rel="noopener noreferrer"
           target="_blank"
        >
          <video
        src={props.LinkVideo}
        controls
        width="100%"
        height="200"
      />
          </CardMedia>
        {/* <img src={props.imagepath} alt='item-image' height= '150'/> */}
        <CardContent sx={{height:'80px'}}>
          <Typography gutterBottom variant="h5" component="div"  sx={{marginTop: "10px"}}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary"  sx={{marginTop: "15px"}}>
            {props.description}
          </Typography>
        </CardContent>
        
      </CardActionArea>
      <CardActions sx={{display: 'flex',alignItems: 'center', justifyContent: 'flex-end',margin: '15px 10px'}}>
          <Button onClick={deleteVideoByID} size="small" variant="outlined" color='error' endIcon={<DeleteIcon fontSize="small"/>}>
            Delete
          </Button>
        </CardActions>
    </Card>)}
    </div>
  )
}
