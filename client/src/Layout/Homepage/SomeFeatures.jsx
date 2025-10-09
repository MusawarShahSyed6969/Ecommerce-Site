import React from 'react'
import { RiSecurePaymentFill,RiCustomerService2Line } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";

const Card = ({ icon: Icon, title, para }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 p-4 w-56">
      <div className="bg-btn-primary rounded-full w-16 h-16 flex items-center justify-center">
        {Icon && <Icon className="w-8 h-8 invert" />}      {/* controlled size */}
      </div>

      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600">{para}</p>
    </div>
  );
};

export default Card;


export const SomeFeatures = () => {
  return (
    <div style={{paddingTop:23,paddingBottom:23}}  className="w-screen min-h-96 h-auto gap-6 bg-bg-secondary flex flex-col justify-evenly items-center text-black border-b-2 border-gray-50 md:flex-row">

      <Card icon={RiSecurePaymentFill} title="Best Service" para="Lorem ipsum" />
      <Card icon={FaShippingFast} title="Free Shipment" para="Lorem ipsum" />
      <Card icon={AiFillDollarCircle} title="Best Price" para="Lorem ipsum" />
      <Card icon={RiCustomerService2Line} title="24/7 Support" para="Lorem ipsum" />

      </div>

  )
}
