import React ,{useEffect,useState,useRef}from 'react'
import useAuthContext from "../hooks/useAuthContext";
import '../style/live.css'
import LiveCardAdmin from '../compo/LiveCardAdmin'
import 'firebase/storage';
import {ref, getDownloadURL, uploadBytesResumable, deleteObject} from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';



function LiveVideoManagement() {


  const [filePath, setFilePath] = useState(null);
  const fileInputRef = useRef();
  const {auth} = useAuthContext();
    let logedUserName = auth.user?.username;
    let logedUserPwd = auth.user?.password;

    const [data, setData] = useState([]); 
    const [LinkVideo, setLinkVideo] =useState(''); 

    const[title,setTitle] = useState('');
    const[description,setDescription] = useState('')

    const handleVideoDelete = async () => {
      if(!filePath) return;

      try {
          deleteObject(ref(storage, filePath))
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

    const getALlVideos = () =>{
      fetch('http://localhost:8083/api/v1/admins/getAllVideos',
        {
          method :'GET',
          header:{'Accept': 'application/json','Content-Type':'application/json'},
          headers :{
                    'Content-Type': 'application/json'  
                    }
        }
      )
      .then(resp => {
        console.log(resp);
            if(resp.ok){
        resp.json().then(data => {
                setData(data.data);
                    data.data.forEach(row => {
                    setTitle(row.title);
                    setDescription(row.description);
                    console.log(row.id);
                    console.log(row.title);
                    console.log(row.description);
                    console.log(row.status);
                    console.log(row.filePath);
                    console.log(row.videoLink);
                  }
                )
              }
            );           
          }
        }
      )
      .catch(error => {
        }
    ); 
    }
      useEffect(() => {
        getALlVideos();
    }, []);


    const deleteVideoByID = (videoID) =>{
        fetch('http://localhost:8083/api/v1/admins/deleteVideoByID?videoID='+videoID,
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
    <div className='Live_main_container'>
        <div className="live_title_container">
            <h1>Live streams</h1>
        </div>
        <div className="admin_live_video_container">
           
        {data.map(item => (<LiveCardAdmin 
        LinkVideo = {item.videoLink}
        title={item.title}
        description={item.description}
        filePath = {item.filePath}
        id={item.id}
        />))}
           
        </div>
    </div>
  )
}

export default LiveVideoManagement