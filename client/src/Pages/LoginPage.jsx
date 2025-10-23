import React, { useState } from 'react'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../redux/slices/authSlice'
import { PacmanLoader } from "react-spinners";
import { toast } from 'react-toastify';


const LoginPage = () => {

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  // ✅ handle login submit
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        console.log('Login success!')
        toast.success("Login sucessfull")
      })
      .catch((err) => {
       console.log(err);
         toast.error(err)
       
      })

  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        console.log('register success!')
         toast.success("Register sucessfull")
      })
      .catch((err) => {
        console.error('Login error:', err)
         toast.error(err)
      })
  }

  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
          <PacmanLoader color="cyan" size={60} />
        </div>
      ) :

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
              // ---------------- LOGIN FORM ----------------
              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label className="block mb-1 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    style={{ padding: '10px 12px' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="block mb-1 text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              // ---------------- REGISTER FORM ----------------
              <form onSubmit={handleRegisterSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label className="block mb-1 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    style={{ padding: '10px 12px' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="block mb-1 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    style={{ padding: '10px 12px' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="block mb-1 text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            {/* ---------------- Switch Button ---------------- */}
            <p
              className="text-center text-sm"
              style={{ marginTop: '24px' }}
            >
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
      }
      <Footer />
    </div>
  )
}

export default LoginPage
