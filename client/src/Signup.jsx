import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toaster, { toast } from "./Toaster";
import instance from "./axios";

function Signup() {
  const [password, setPassword] = useState();
  const [username, setUserName] = useState();
  const [confimPassword, setConfirmPassword] = useState();
  const navigate=useNavigate()

  const handleChange = (e) => {
    e.preventDefault();
    if(password!==confimPassword){
        toast.showToast("Password is not same","red")
    }else{
        instance.post("/signup",{username,password}).then(()=>{
            navigate("/",{replace:true})
        }).catch(()=>{
            toast.showToast("username already exist","red")
        })
    }
  };
  return (
    <section className=" bg-gray-900">
        <Toaster/>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleChange}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setUserName(e.target.value)}
                  id="email"
                  className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Create an account
              </button>
              <p className="text-sm font-light  text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/"}
                  className="font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
