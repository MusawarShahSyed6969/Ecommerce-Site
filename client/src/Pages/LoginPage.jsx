import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const LoginPage = () => {

   const navigate = useNavigate();





 const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{ padding: '20px' }}
    >
      <div
        className="bg-white rounded-lg shadow-md w-full max-w-md"
        style={{ padding: '32px', margin: '16px' }}
      >
        <h2
          className="text-2xl font-semibold text-center"
          style={{ marginBottom: '24px' }}
        >
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {isLogin ? (
          // ------------------- LOGIN FORM -------------------
          <form>
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
              Login
            </button>
          </form>
        ) : (
          // ------------------- REGISTER FORM -------------------
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
        )}

        {/* ------------------- SWITCH BUTTON ------------------- */}
        <p className="text-center text-sm" style={{ marginTop: '24px' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
            style={{ marginLeft: '4px' }}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};


  return (
    <div >
        <Navbar/>
       <AuthPage/>
       <Footer/>
    </div>
  )
}

export default LoginPage