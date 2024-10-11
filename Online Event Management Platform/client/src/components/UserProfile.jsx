import React, { useEffect, useState } from 'react'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'

function UserProfile() {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")

    const fetchData = async()=>{
        try {
            let {user} = await AxiosService.get(ApiRoutes.GET_PROFILE.path, {authenticate:ApiRoutes.GET_PROFILE.auth})
            console.log(user.name, user.email)
            setName(user.name)
            setEmail(user.email)
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Failed to fetch user details');
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
   
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            let {message} = await AxiosService.put(ApiRoutes.UPDATE_PROFILE.path, {name, email}, {authenticate:ApiRoutes.UPDATE_PROFILE.auth})
            toast.success(message)

        } catch (error) {
            toast.error(error.message || 'Failed to update profile')
        }
    }

    return <>
        <>
            <div className="bg-gray-100 flex justify-center items-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Edit Profile
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                                Full Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fullname"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    </>
}

export default UserProfile