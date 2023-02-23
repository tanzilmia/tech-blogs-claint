import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import NavTow from '../../shearedcomp/Navbar/NavTow';
import { FaUserCircle } from "react-icons/fa";
import './Category.css'
import { useContext } from 'react';
import { mycontext } from '../../contextApi/AuthContext';
import Loadding from '../../shearedcomp/Loadding/Loadding';
const Category = () => {
    const {Loading} = useContext(mycontext)
    const Posts = useLoaderData()

  if(Loading){
    return <Loadding/>
  }
    return (
        <>
        <NavTow/>
        <section className="w-11/12 mx-auto">
      {/* posts */}

      <div>
        <h2 className="text-3xl text-center py-10 font-bold text-gray-600">
          {Posts[0]?.category} News
        </h2>

        {/* post who will mapping */}
        {Posts?.length &&
          Posts?.map((post) => (
            <div key ={post._id} className="container mb-3 content md:flex lg:flex">
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
                <Link to = {`/blogpost/${post._id}`} className="article_title sm:text-[20px] text-[20px] md:text-[30px] lg:text-[30px]">
                  {post.title}
                </Link>
                <p className="article_text mb-5">
                  {post?.article?.split(" ").slice(0, 35).join(" ")} ...
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* next and previeous pages */}

      {/* <div className="text-center">
        <div className="btn-group">
          <button
            onClick={previousePage}
            disabled={currentPage === 1}
            className="btn btn-active"
          >
            Previous
          </button>
          <button onClick={homePage} className="btn">
            Home
          </button>
          <button onClick={nextPage} className="btn">
            Next
          </button>
        </div>
      </div> */}
    </section>
        
        </>
    );
};

export default Category;