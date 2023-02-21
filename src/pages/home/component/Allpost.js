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
              <img className='imge_sidepost md:w-[220px] lg:w-[220px] w-[100px] sm:w-[100px]' src={post.thumbnail} alt="" />
              </div> 
        
          <Link to = {`/blogpost/${post._id}`} className='side_title sm:text-[14px] text-[14px] lg:text-[18px] md:text-[18px]'> {post.title}</Link>
          </div>
      </div>) 
        }
        
        </>
    );
};

export default Allpost;