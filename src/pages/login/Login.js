import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mycontext } from "../../contextApi/AuthContext";
import "./Login.css";
const Login = () => {
  const { setisLogedind, setLoading } = useContext(mycontext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState("");
  const neviget = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handlLogin = (data) => {
    setLoading(true);
    const email = data.email;
    const password = data.password;

    const userinfo = {
      email,
      password,
    };
    axios
      .post(`http://localhost:5000/authentication/login`, userinfo)
      .then((res) => {
        if (res.data.message === "Login Successful") {
          const token = res.data.data;
          localStorage.setItem("accessToken", token);
          neviget(from, { replace: true });
          setisLogedind(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full h-[100vh] login_page flex items-center justify-center text-white">
      <div className="login_div p-10 lg:w-[479px] md:w-[479px] md:h-[497px] lg:h-[497px] w-11/12 h-full">
        <h2 className="text-3xl">Login Now</h2>
        <hr className="w-[150px] my-2" />
        <h3 className="mb-5">WellCome Tanzil's Blogs</h3>
        <form onSubmit={handleSubmit(handlLogin)}>
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
            value="Login"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p className="my-1">
          New To Tanzil's Blog ?{" "}
          <Link to="/register" className="font-bold text-blue-400">
            Register Now
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
