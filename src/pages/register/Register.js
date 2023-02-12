import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { mycontext } from "../../contextApi/AuthContext";

const Register = () => {
  const neviget = useNavigate()
  const {setLoading} = useContext(mycontext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerError, setregisterError] = useState("");

  const handleRegister = (data) => {
    setLoading(true)
    const name = data.name;
    const email = data.email;
    const password = data.password;
    
    const userinfos = {
      name,
      email,
      password
    }

    axios.post(`http://localhost:5000/authentication`,userinfos)
    .then(res =>{
      if(res.data.message === "Register SuccessFull"){
        neviget("/login")
      }
    })
    .catch(error => console.log(error))



    

  };

  return (
    <div className="w-full h-[100vh] login_page flex items-center justify-center text-white">
      <div className="login_div p-10 lg:w-[479px] md:w-[479px] md:h-[497px] lg:h-[497px] w-11/12 h-full">
        <h2 className="text-3xl text-center">Register Now</h2>
        <hr className=" my-5" />
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              placeholder="Enter Your Name"
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              placeholder="Enter Your Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full py-2 px-4 my-2 rounded-lg"
            />
            <label className="label"> </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className=" bg-[#A5D9D0] hover:cursor-pointer hover:bg-[#11c7a8] text-white py-2 px-4 mt-5 font-bold text-xl w-full rounded-lg"
            value="Register"
            type="submit"
          />
          <div>
            {registerError && <p className="text-red-600">{registerError}</p>}
          </div>
        </form>
        <p className="my-1">Already Have an account ? <Link to = '/login' className="font-bold text-blue-400">Login Now</Link> </p>
      </div>
    </div>
  );
};

export default Register;
