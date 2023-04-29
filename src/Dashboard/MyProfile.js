import React from 'react';

import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import { useContext } from 'react';
import { mycontext } from '../contextApi/AuthContext';
import { FaUserAlt } from 'react-icons/fa';
import { BsFillCameraFill } from 'react-icons/bs';

import './styles/Myporfile.css';
import toast from 'react-hot-toast';
const MyProfile = () => {
  const {user,setuser} = useContext(mycontext)
  const imgkey = process.env.REACT_APP_IMAGE_SEC
  const {name, email} = user
  

    const { getRootProps, getInputProps} = useDropzone({
            // Note how this callback is never invoked if drop occurs on the inner dropzone
            onDrop: files => {
              files.forEach(file => {
                const formData = new FormData();
                formData.append('image', file);
                axios.post(`https://api.imgbb.com/1/upload?key=${imgkey}`, formData)
                .then(res => {
                  
                  if(res.data.success){
                    
                    const profile = res?.data?.data?.url
                    axios.put(`https://tech-blog-server-jade.vercel.app/authentication/upload-profile?id=${user?._id}`, { profile })
                      .then(res =>{
                        if(res?.data?.message === "update complete"){
                          setuser(res?.data?.data)
                          toast.success("Upload Successfull")
                        }
                        
                      })
                      .catch((e)=> console.log(e))
                  }
                })
                .catch((e)=> console.log(e))
              
              })
            }
            
        });

    return (
        <div>
      
      <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className="profile_img">{user.porfilepic === "null" ?  <span className='user_icon'> <FaUserAlt/> </span>
                            :
                            <img src={user.porfilepic} alt="" />
                        } </div>
        <div className="upload_btn">{ user.porfilepic === "null" ? <BsFillCameraFill/> : <BsFillCameraFill/> }</div>
      </div>

{/* details profiles */}

 
 <div className='user_details my-5'>
  <h2> Name:  {name} </h2>
  <h2> Email:  {email} </h2>
 </div>

  
    </section>

        </div>
    );
};

export default MyProfile;