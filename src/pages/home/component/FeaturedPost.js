import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'

const FeaturedPost = () => {
const [featuresPost, setfeaturesPost] = useState({})
    useEffect(() => {
     axios.get(`http://localhost:5000/featured-posts`)
     .then(res =>{
        setfeaturesPost(res.data)
     })
    }, [])

    const {name,title,article,thumbnail,date, _id } = featuresPost
    const truncatedArticle = article?.split(" ").slice(0, 70).join(" ")

    return (
        <>
         <img className='featured_thumb' src= {thumbnail} alt="" />
            <article className='py-3'>
               <div> <p> Post By__ <span className="text-blue-600 font-semibold">{name}</span>  <span> {date}</span></p></div>
                <div className="post_info">
                    <h2 className="title sm:text-[20px] text-[20px] md:text-[28px] lg:text-[28px] py-3"> {title} </h2>
                    <p> {truncatedArticle}  </p>
                    <div className='my-5'><Link to = {`/blogpost/${_id}`} className='common_btn'> See More </Link></div>
                    
                </div>
            </article>
        </>
    );
};

export default FeaturedPost;