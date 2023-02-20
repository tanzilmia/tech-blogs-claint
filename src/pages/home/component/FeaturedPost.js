import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Home.css'

const FeaturedPost = () => {
const [featuresPost, setfeaturesPost] = useState({})
    useEffect(() => {
     axios.get(`http://localhost:5000/featured-posts`)
     .then(res =>{
        setfeaturesPost(res.data)
     })
    }, [])

    const {name, email,title,article,category,thumbnail,date, _id } = featuresPost
    const truncatedArticle = article?.split(" ").slice(0, 70).join(" ")

    return (
        <>
         <img className='featured_thumb' src= {thumbnail} alt="" />
            <article className='py-3'>
               <div> <p> Post By__ <span className="text-blue-600 font-semibold">{name}</span>  <span> {date}</span></p></div>
                <div className="post_info">
                    <h2 className="title"> {title} </h2>
                    <p> {truncatedArticle}  </p>
                    <button className='btn btn-sm mt-2'> See More </button>
                    
                </div>
            </article>
        </>
    );
};

export default FeaturedPost;