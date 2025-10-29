import React from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center p-5" style={{padding:6}}>
      <MdCancel className="text-red-500 text-8xl mb-5 animate-pulse" />
      <h1 className="text-4xl font-extrabold text-red-600 mb-3">
        Payment Cancelled
      </h1>
      <p className="text-gray-700 " style={{marginBottom:6}}>
        It seems you cancelled your payment. No worries — you can try again anytime.
      </p>
      <button
        onClick={() => navigate("/cartcheckout")}
        className="bg-red-600 hover:bg-red-700 text-white rounded-3xl px-8 py-3 transition-all duration-200"
        style={{padding:5}}
      >
        Back to Cart
      </button>
    </div>
  );
};

export default Cancel;
