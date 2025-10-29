import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../redux/slices/cartSlice";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 🧹 Clear cart when payment succeeds
    dispatch(clearCart());

    // Optionally redirect after few seconds
    const timer = setTimeout(() => navigate("/"), 4000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center " style={{padding:5}}>
      <FaCheckCircle className="text-green-500 text-8xl  animate-bounce" style={{marginBottom:5}}/>
      <h1 className="text-4xl font-extrabold text-green-600 " style={{marginBottom:3}}>
        Payment Successful!
      </h1>
      <p className="text-gray-700 " style={{marginBottom:6}}>
        Thank you for your purchase 🎉. Your order has been placed successfully.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 hover:bg-green-700 text-white rounded-3xl py-3 transition-all duration-200" 
        style={{padding:6}}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;
