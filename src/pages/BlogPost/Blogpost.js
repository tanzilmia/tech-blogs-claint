import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import NavTow from "../../shearedcomp/Navbar/NavTow";
import "./Blogpost.css";
import axios from "axios";
import { useContext } from "react";
import { mycontext } from "../../contextApi/AuthContext";
import Loadding from "../../shearedcomp/Loadding/Loadding";

const Blogpost = () => {
  const Post = useLoaderData();
  const {Loading} = useContext(mycontext)
  const { name, title, article, date, category, thumbnail } = Post;
  const [RelatedPost, setRelatedPost] = useState([]);
  useEffect(() => {
    axios
      .get(`https://blog-server-tau.vercel.app/related-post?category=${category}`)
      .then((res) => {
        setRelatedPost(res.data);
      })
      .catch((e) => console.log(e.message));
  }, [category]);

  if(Loading){
    return <Loadding/>
  }
  return (
    <>
      <NavTow />
      <section className="w-11/12 mx-auto">
        <div className="text-[#61618a] my-2">
          <div className="author_profile mx-auto md:mt-20 lg:mt-20 mt-10 md:w-8/12 lg:w-8/12 w-11/12 flex items-center">
            <span className="mr-1">
              {" "}
              {Post?.authorPic ? (
                <img
                  className="md:w-[60px] lg:w-[60px] w-[30px] rounded-full"
                  src={Post?.authorPic}
                  alt=""
                />
              ) : (
                <div className="lg:text-[60px] md:text-[60px] text-[30px]">
                  <FaUserCircle />
                </div>
              )}{" "}
            </span>

            <div className="md:text-[15px] lg:text-[15px] text-[13px] ml-3">
              <p>Author : {name}</p>
              <p> Published : {date}</p>
            </div>
          </div>

          <div className="author_profile mx-auto my-5 md:w-8/12 lg:w-8/12 w-11/12">
            <h2 className="article_title sm:text-[20px] text-[20px] md:text-[30px] lg:text-[30px]">
              {title}
            </h2>
            <div className="text-[#f6eb54] article_title sm:text-[20px] text-[20px] md:text-[30px] lg:text-[30px] flex items-center mt-10">
              {" "}
              <span className="mr-2 text-[#6a94ae]">
                <BsFillBookmarkHeartFill />
              </span>{" "}
              <h2 className="text-[#f5f0a9]">{category}</h2>
            </div>
          </div>

          {/* img div */}

          <div className="md:w-8/12 lg:w-8/12 w-11/12 mx-auto">
            <img className="w-full" src={thumbnail} alt="" />
            <p className="md:text-[18px] lg:text-[18px] sm:text-[15px] text-[14px] font-[400] mt-10">{article}</p>
          </div>
        </div>
        <h2 className="text-xl text-center md:text-2xl lg:text-2xl md:my-20 lg:my-20 sm:my-10 my-10">Related Posts</h2>
        <div class="related_posts grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">

                

          {/* <!-- mapping post   */}
          {
            RelatedPost.length &&
            RelatedPost.map((post)=><Link to = {`/blogpost/${post._id}`} key={post._id} class="content_cart bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="img_div">
              <img
                class="w-full md:h-[200px] lg:h-[200px] h-[100px]"
                src= {post.thumbnail}
                alt=""
              />
            </div>
            <div class="content_post p-4">
              <p class="author_info text-gray-600  mb-2 text-xs md:flex lg:flex justify-between">
                
                <span> post by : {post.name} </span>  <span>{post.date}</span>
              </p>
              <div class="article">
                <h2 class="text-sm font-semibold mb-2">
                  {post.title}
                </h2>
                <p class="text-gray-500 text-sm md:block lg:block hidden">
                {post?.article?.split(" ").slice(0, 20).join(" ")}
                </p>
              </div>
            </div>
          </Link>)
          }
          
        </div>
      </section>
    </>
  );
};

export default Blogpost;
