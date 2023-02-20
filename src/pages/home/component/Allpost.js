import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'

const Allpost = () => {
    const [allPost, setallPost] = useState([])
    useEffect(() => {
      axios.get(`http://localhost:5000/sidepost`)
      .then(res =>{
        setallPost(res.data)
      })
      .catch((e)=> console.log(e))
    }, [])

    console.log(allPost);
    
    return (
        <>
        
        {
          allPost.length &&
          allPost.map(post => <div key={post._id} className="side_post mb-2 content">
          <p className='author_info my-2'> By {post.name} | {post.date} </p>
          <div className=" flex">
          <div className="mr-2 img_sidediv">
              <img className='imge_sidepost' src={post.thumbnail} alt="" />
              </div> 
        
          <Link className='side_title'> {post.title}</Link>
          </div>
      </div>)
        }
        
        </>
    );
};

export default Allpost;