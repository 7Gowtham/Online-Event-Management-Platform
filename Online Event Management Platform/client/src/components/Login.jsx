import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import toast from 'react-hot-toast';
import useLogout from "../hooks/useLogout.jsx"
import { jwtDecode } from "jwt-decode";
import authImage from '../assets/auth.jpg'

function Login() {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  let navigate = useNavigate();
  let logout = useLogout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { message, token, role } = await AxiosService.post(ApiRoutes.LOGIN.path, { email, password }, { authenticate: ApiRoutes.LOGIN.auth })

      const decodedToken = jwtDecode(token)
      const name = decodedToken.name

      sessionStorage.setItem('token', token)
      sessionStorage.setItem('role', role)
      sessionStorage.setItem('name', name)
      toast.success(message)
      navigate('/home')
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Internal Server Error')
    }
  }

  useEffect(() => {
    logout();
  }, [])

  return <>
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${authImage})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form>
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/forgot-password"
              className="text-blue-500 hover:text-blue-700 text-sm font-bold"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to="/signup"
              className="text-blue-500 hover:text-blue-700 text-sm font-bold"
            >
              Not Yet Registered?
            </Link>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Login