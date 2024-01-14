import React,{useEffect,useState}from 'react'
import Icards from '../compo/Icards'
import '../style/live.css'

function Live() {

  const [data, setData] = useState([]);   


  const [LinkVideo, setLinkVideo] =useState(''); 
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
                  console.log(row.id);
                  console.log(row.title);
                  console.log(row.description);

                  setLinkVideo(row.videoLink);
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
  return (
    <div className='Live_main_container'>
        <div className="live_title_container">
            <h1>Live streams</h1>
        </div>
        <div className="live_video_container">
        {data.map(item => (<Icards 
            key = {item.id}
            LinkOfVideo={item.videoLink}
            title={item.title}
            description= {item.description}
            />
            ))}
        </div>
    </div>
  )
}

export default Live