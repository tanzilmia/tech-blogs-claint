import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mycontext } from '../../contextApi/AuthContext';
import { FaUserCircle } from "react-icons/fa";

const SearchPost = () => {
    const [Posts, setPosts] = useState([])
    const {searchtext} = useContext(mycontext)
    useEffect(() => {
        axios.get(`http://localhost:5000/search-items?searchtext=${searchtext}`)
        .then(res =>{
            setPosts(res.data);
        })
        .catch((e)=> console.log(e.message))
    }, [searchtext])
    console.log(Posts);
    return (
        <>
        {
            Posts.length> 0 ?
            <section className="w-11/12 mx-auto">
      {/* posts */}

      <div>
        <h2 className="text-3xl text-center py-10 font-bold text-gray-600">
          Posts
        </h2>

        {/* post who will mapping */}
        {Posts.length &&
          Posts.map((post) => (
            <Link to = {`/blogpost/${post._id}`} key ={post._id} className="container mb-3 content md:flex lg:flex">
              <div className="content_img md:w-4/12 lg:w-4/12 lg:mr-5 md:mr-5">
                <img src={post.thumbnail} alt="" />
              </div>
              <div className="content_article md:w-8/12 lg:w-8/12 w-full">
                <div className="text-[#61618a] my-2">
                  <div className="author_profile flex items-center">
                    <span className="mr-1"> {post?.authorPic ? <img className="w-[20px] rounded-full" src= {post?.authorPic} alt="" /> : <FaUserCircle/> }  </span>
                    <span>Author : {post.name}</span>
                  </div>
                  <div className="flex items-center text-[12px]">
                    
                    {post.date}
                  </div>
                </div>
                <h2 className="article_title sm:text-[20px] text-[20px] md:text-[30px] lg:text-[30px]">
                  {post.title}
                </h2>
                <p className="article_text mb-5">
                  {post?.article?.split(" ").slice(0, 35).join(" ")} ...
                </p>
              </div>
            </Link>
          ))}
      </div>

      {/* next and previeous pages */}

      
    </section>
            :
           <div className='h-[100vh] flex items-center justify-center'>
             <h2 className='text-2xl text-[#e64d4d]'>No Search Result Abut "{searchtext}" </h2>
           </div>
        }
        </>
    );
};

export default SearchPost;