import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdImages } from "react-icons/io";
import { mycontext } from "../../contextApi/AuthContext";
import "../styles/createpost.css";

const EditePost = () => {
  const { user, header } = useContext(mycontext);
  const [thumbnail, setThumbnail] = useState("");
  const [categories, setCategories] = useState([]);
  const neviget = useNavigate()
  const imgkey = process.env.REACT_APP_IMAGE_SEC;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const EditeData = useLoaderData();
  console.log(EditeData);

  const {
    title : oldTititle,
    article: oldArticle,
    _id
  } = EditeData?.posts
  const now = moment();
  const date = now.format("MM/DD/YY hh:mm a");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  // select Upload Image


  const { getRootProps, getInputProps } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: (files) => {
      files.forEach((file) => {
        const formData = new FormData();
        formData.append("image", file);
        axios
          .post(`https://api.imgbb.com/1/upload?key=${imgkey}`, formData)
          .then((res) => {
            if (res.data.success) {
              setThumbnail(res.data.data.medium.url);
            }
          })
          .catch((e) => console.log(e));
      });
    },
  });

 

  // create post function

  const handleCreatepost = (data) => {
    const title = data.title;
    const article = data.article;
    const category = data.category;

    // make post
    const Updatepost = {
      title,
      article,
      date,
      category,
      thumbnail,
      _id

    };

    axios.put(`http://localhost:5000/author/edite-post?email=${user?.email}`, Updatepost, header)
    .then(res => {
      if(res.data.message === "Update Complete"){
        toast.success("Update Complete")
        if(user.role === "admin"){
            neviget("/dashboard/all-post")
            console.log("working")
        }
        else{
            neviget("/authorPannel/all-post")
        }
        
      }
    })
    .catch((e)=> console.log(e))

  };

  return (
    <div>
      <h2>Create Post</h2>

      <div>
        <div>
          <form onSubmit={handleSubmit(handleCreatepost)}>
            <div className="post_wrapping">
              <div {...getRootProps({ className: "uploadPhoto" })}>
                <input {...getInputProps()} />
                <div className="upload_div">
                  UpLoad Photo{" "}
                  <span className="upload_icon">
                    <IoMdImages />
                  </span>{" "}
                </div>
              </div>

              <div className="form-control w-full">
                <select
                  className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
                  {...register("category", {
                    required: "category is Required",
                  })}
                  id=""
                >
                  {categories?.map((category) => (
                    <option key={category._id} value={category.category}>
                      {" "}
                      {category.category}{" "}
                    </option>
                  ))}
                </select>
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
              </div>
              <div className="form-control w-full">
                <input
                  defaultValue={oldTititle}
                  type="text"
                  {...register("title", {
                    required: "title is required",
                  })}
                  className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
              </div>

              <div className="form-control w-full">
                <textarea
                  
                  defaultValue={oldArticle}
                  type="text"
                  {...register("article", {
                    required: "title is required",
                  })}
                  className="input input-bordered h-[250px] w-full py-2 px-4 my-2 rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email?.message}</p>
                )}
              </div>
            </div>
            

            {/* btn create */}
            <input
              className=" bg-[#A5D9D0] hover:cursor-pointer hover:bg-[#11c7a8] text-white py-2 px-4 mt-5 font-bold text-xl w-full rounded-lg"
              value="Create"
              type="submit"
            />
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditePost;
