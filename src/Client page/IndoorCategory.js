import React,{useEffect,useState} from 'react'
import '../style/catgoryItem.css'
import Icards from '../compo/Icards'

function IndoorCategory() {
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
    <div className="category_item_main_div">
        <div className="category_first_poster_div">
            <div className="Indoor_image_layer"></div>
            <div className="category_gradient_layer"></div>
            <div className="Indoor_details_div">
                <p>Game on, let's play</p>
                <h4>Indoor activities</h4>
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquam impedit! 
                    Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquamaliquam impedit! 
                    Quam optio consequuntur cumque eum.Lorem adipisicing elit. Impedit odit voluptatibus nulla omnis sint nesciunt nisi, maiores praesentium voluptate possimus, 
                    consectetur exercitationem? Pariatur, aliquam</h6>
            </div>
        </div>
        <div className="category_second_video_div">
            <div className="Indoor_video_title">
                <p>Latest Videos</p>
            </div>
            <div className="video_Indoor_div">
            {data.map(item => (<Icards 
                    key = {item.id}
                    LinkOfVideo={item.videoLink}
                    title={item.title}
                    description= {item.description}
                />
                ))}
            </div>
        </div>
    </div>
  )
}

export default IndoorCategory