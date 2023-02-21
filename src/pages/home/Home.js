import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Allpost from "./component/Allpost";
import FeaturedPost from "./component/FeaturedPost";
import "./Home.css";
const Home = () => {
  const [Posts, setPosts] = useState([]);
  const [Authors, setAuthors] = useState([]);
  // get Unique post 
  useEffect(() => {
    axios
      .get(`http://localhost:5000/unique-posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  // get all authors
  useEffect(() => {
    axios
      .get(`http://localhost:5000/all-author`)
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((e) => console.log(e.message));
  }, []);



  return (
    <section className="w-11/12 mx-auto">
      {/* featured and all posts */}

      <div className="md:flex lg:flex my-5">
        <div className="md:w-7/12 lg:w-7/12 md:mr-5 lg:mr-5">
          <h2 className="text-2xl pb-4 font-semibold md:text-left lg:text-left text-center my-2 lg:my-0 md:my-0 sm:my-2">
            Featured Post
          </h2>
          <div className="featured_post">
            <FeaturedPost />
          </div>
        </div>
        <div className="side_allpost md:w-5/12 lg:w-5/12">
          <h2 className="text-2xl pb-4 font-semibold md:text-left lg:text-left text-center my-2 lg:my-0 md:my-0 sm:my-2">
            Recent Posts
          </h2>
          <Allpost />
        </div>
      </div>

      {/* unique posts */}

      <div>
        <h2 className="text-3xl text-center py-10 font-bold text-gray-600">
          Popular On Category
        </h2>

        {/* post who will mapping */}
        {Posts.length &&
          Posts.map((post) => (
            <div className="container mb-3 content md:flex lg:flex">
              <div className="content_img md:w-4/12 lg:w-4/12 lg:mr-5 md:mr-5">
                <img src={post.thumbnail} alt="" />
              </div>
              <div className="content_article md:w-8/12 lg:w-8/12 w-full">
                <p className="category_name my-2 ">{post.category}</p>
                <h2 className="article_title sm:text-[20px] text-[20px] md:text-[30px] lg:text-[30px]">
                  {post.title}
                </h2>
                <p className="article_text mb-5">
                  {post?.article?.split(" ").slice(0, 35).join(" ")} ...
                </p>
                <div className="my-3">
                  <Link to={`/blogpost/${post._id}`} className="common_btn">
                    VIEW FULL
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      <h2 className="text-3xl text-center py-10 font-bold text-gray-600">
        Our Author
      </h2>

      {/* authors */}

   <div className="authors w-8/12 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">

    {/* author map */}

    {
      Authors.length && 
      Authors.map((author)=> <div className="auhtor_card bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <div className="auhor_img mx-auto mb-4">
        <img
          src={author?.porfilepic}
          alt=""
          className="rounded-full w-32 h-32 object-cover object-center"
        />
      </div>
      <div className="author_info text-center">
        <h2 className="text-lg font-medium"> {author.name} </h2>
        <p>Content Writer @Company</p>
      </div>
    </div>)
    }

 
  
</div>

    </section>
  );
};

export default Home;
