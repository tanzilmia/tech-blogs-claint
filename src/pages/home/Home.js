import React from 'react';
import Allpost from './component/Allpost';
import FeaturedPost from './component/FeaturedPost';
import './Home.css'
const Home = () => {
   
    return (
        <section className='w-11/12 mx-auto'>
           {/* featured and all posts */}
           <div className='flex my-5'>
            <div className="featured_post md:w-7/12 lg:w-7/12 md:mr-5 lg:mr-5">
                <FeaturedPost/>
            </div>
            <div className="side_allpost md:w-5/12 lg:w-5/12">
                <Allpost/>
            </div>
           </div>

           {/* unique posts */}
           
           <div>
            {/* post who will mapping */}
            <div className="container">
                <div className="content_img">
                  <img src="https://www.filmibeat.com/wimgm/1366x70/desktop/2019/08/shahrukh-khan_9.jpg" alt="" />
                </div>
                <div className="content_article">
                    <p>StartUp</p>
                    <h2>Design tips for designers that cover everything you need</h2>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                    <button className='btn btn-sm'>View Details</button>
                </div>
            </div>
           </div>

        </section>
    );
};

export default Home;