import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';

function ForgotPassword() {
    let [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { message } = await AxiosService.post(ApiRoutes.FORGOT_PASSWORD.path, { email }, { authenticate: ApiRoutes.FORGOT_PASSWORD.auth })
            console.log(message)
            toast.success(message)
        } catch (error) {
            toast.error(message)
        }
    }

    return <>
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Forgot Password
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
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default ForgotPassword