import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mycontext } from '../../../contextApi/AuthContext';
import { AiFillClockCircle } from 'react-icons/ai';
import '../Home.css'

const Allpost = () => {
  const {Loading} = useContext(mycontext)
    const [allPost, setallPost] = useState([])
    useEffect(() => {
      axios.get(`https://tech-blog-server-jade.vercel.app/sidepost`)
      .then(res =>{
        setallPost(res.data)
      })
      .catch((e)=> console.log(e))
    }, [])

    if(Loading){
      return <p>Loadding...</p>
    }
    
    return (
        <>
        
        {
          allPost.length &&
          allPost.map(post => <div key={post._id} className="side_post mb-2 content">
          <p className='author_info my-2 flex items-center'> <span className='mr-1 text-[#ccd4d2]'><AiFillClockCircle/></span>  {post.date} </p>
          <div className=" flex">
          <div className="mr-2 img_sidediv">
              <img className='imge_sidepost md:w-[220px] lg:w-[220px] w-[100px] sm:w-[100px]' src={post.thumbnail} alt="" />
              </div> 
        
          <Link to = {`/blogpost/${post._id}`} className='side_title sm:text-[14px] font-semibold text-[14px] lg:text-[18px] md:text-[18px]'> {post.title}</Link>
          </div>
      </div>) 
        }
        
        </>
    );
};

export default Allpost;