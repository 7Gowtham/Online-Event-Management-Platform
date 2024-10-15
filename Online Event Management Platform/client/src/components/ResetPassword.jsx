import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

function ResetPassword() {
  let [password, setPassword] = useState("")
  let [cpassword, setCpassword] = useState("")
  let {token} = useParams()

  let navigate = useNavigate()

  const handleResetPassword = async(e)=>{
    e.preventDefault();
    if(password != cpassword){
      toast.error("Passwords do not match")
      return;
    }
    try {
      let {message} = await AxiosService.post(`${ApiRoutes.RESET_PASSWORD.path}/${token}`, {password, cpassword}, {authenticate: ApiRoutes.RESET_PASSWORD.auth})
      toast.success(message)
      navigate('/login')
    } catch (error) {
      toast.error(message)
    }
  }

  return <>
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Password
        </h2>
        <form>
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cpassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cpassword"
              type="cpassword"
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="***********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default ResetPassword