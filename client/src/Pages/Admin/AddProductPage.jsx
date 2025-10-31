import React from "react";
import { Navigate } from "react-router";
import AddProductForm from "../../components/admin/AddProductForm";


const AddProductPage = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
