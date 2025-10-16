import React from 'react'

const SignupPage = () => {
  return (
<div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{ padding: '20px' }}
    >

        <form>
            <div style={{ marginBottom: '16px' }}>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                style={{ padding: '10px 12px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                style={{ padding: '10px 12px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                style={{ padding: '10px 12px' }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md hover:bg-blue-700"
              style={{ padding: '10px 12px', marginTop: '8px' }}
            >
              Register
            </button>
          </form>

       <div
        className="bg-white rounded-lg shadow-md w-full max-w-md"
        style={{ padding: '32px', margin: '16px' }}
      >
            
        </div>
     
        <div className="text-center text-sm" style={{ marginTop: '24px' }}>
        "Already have an account?
            <button
                type="button"   

                className="text-blue-600 hover:underline"
                style={{ marginLeft: '4px' }}
                >   
            Login here
            </button>
        </div>
 </div>
  )
}

export default SignupPage