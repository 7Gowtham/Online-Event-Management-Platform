import React, { useState } from "react";
import AxiosService from '../utils/AxiosService';
import ApiRoutes from "../utils/ApiRoutes"
import toast from 'react-hot-toast'
import {Link, useNavigate} from "react-router-dom"
import authImage from '../assets/auth.jpg'

function Signup() {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let {message} = await AxiosService.post(ApiRoutes.SIGNUP.path,{name, email, password}, {authenticate:ApiRoutes.SIGNUP.auth})
      console.log(message)
      toast.success(message)
      navigate('/login')
    } catch (error) {
        console.log(error)
        toast.error(error.message || 'Internal Server Error')
    }
  }

  return <>
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col justify-center items-center"
    style={{ backgroundImage: `url(${authImage})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Register
            </button>
            <div className="mt-4 text-center">
            <Link to="/login"
              className="text-blue-500 hover:text-blue-700 text-sm font-bold"
            >
              Login?
            </Link>
          </div>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Signup