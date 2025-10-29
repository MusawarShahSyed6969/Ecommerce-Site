import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeFromCart,clearCart } from "../../redux/slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SNRtZAOvmXjsa9OyAPc7tGCWSRyVXMD1ZQyPp4EICMU8iAIbJextc4lV0pAB7QwOeqJb2QI6q7bLLunmkYGWWtY00voLG8v2k"); // ⚡ replace with your Stripe public key

const CartCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, subtotal } = useSelector((state) => state.cart);
  const [Total, setTotal] = useState();

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  // ⚡ Handle Stripe Checkout
  const [clientSecret, setClientSecret] = useState("");

  // Fetch session from backend
  const startCheckout = async () => {
    navigate("/orderpage")
    // try {
    //   const response = await fetch("http://localhost:4000/api/payment/create-checkout-session", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ items: cartItems }),
    //   });

    //   const data = await response.json();

    //   if (data.url) {
       
    //     window.location.href = data.url; // ✅ Redirect to Stripe
    //   } else {
    //     alert("Something went wrong!");
    //   }
    // } catch (error) {
    //   console.error("Checkout error:", error);
    // }
  };
  

  const CardComponent = ({ name, price, quantity, subtotal, _id }) => (
    <div className='flex justify-between border-b-2 border-gray-300 p-3'>
      <div className='flex justify-center items-center gap-4'>
        <div className='cursor-pointer' onClick={() => dispatch(removeFromCart(_id))}>
          <IoIosCloseCircleOutline className='text-gray-700 text-xl' />
        </div>
        <img
          className='w-12 h-12 rounded-full'
          src='https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp'
          alt='PS5'
        />
      </div>

      <div className='flex flex-col text-right'>
        <p className='text-btn-primary font-semibold'>{name}</p>
        <p>${price}</p>
        <p>Qty: {quantity}</p>
        <p className='font-semibold'>${subtotal}</p>
      </div>
    </div>
  );

  const GridCardComponent = ({ name, price, quantity, subtotal, _id }) => (
    <div className='w-full grid grid-cols-5 items-center border-b border-gray-300 py-3'>
      <div className='flex items-center justify-center gap-3'>
        <div className='cursor-pointer' onClick={() => dispatch(removeFromCart(_id))}>
          <IoIosCloseCircleOutline className='md:w-6 md:h-6 w-5 h-5' />
        </div>
        <img
          className='w-12 h-12 rounded-full'
          src='https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp'
          alt='PS5'
        />
      </div>
      <p className='text-btn-primary font-semibold'>{name}</p>
      <p>${price}</p>
      <p>{quantity}</p>
      <p className='font-semibold'>${subtotal}</p>
    </div>
  );

  return (
    <div className='flex flex-col gap-5'>
      <div className='block md:hidden flex-col gap-6'>
        {cartItems.map((cart) => (
          <CardComponent
            key={cart._id}
            _id={cart._id}
            name={cart.name}
            price={cart.price}
            quantity={cart.quantity}
            subtotal={cart.price * cart.quantity}
          />
        ))}
      </div>

      <div className='hidden md:block flex-col gap-6'>
        {cartItems.map((cart) => (
          <GridCardComponent
            key={cart._id}
            _id={cart._id}
            name={cart.name}
            price={cart.price}
            quantity={cart.quantity}
            subtotal={cart.price * cart.quantity}
          />
        ))}
      </div>

      <div className='flex justify-between flex-col items-center md:flex-row' style={{ padding: 24 }}>
        <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
          <input type="text" placeholder='Enter Coupon here' style={{ padding: 4 }} />
          <button className='bg-btn-primary rounded-3xl text-white w-32 h-12 outline-1'>Apply Coupon</button>
        </div>
        <button className='bg-btn-primary rounded-3xl text-white w-32 h-12 border-2 '>Update Cart</button>
      </div>

      <div className='flex flex-col gap-5 border-t-2 border-gray-400'>
        <h1 className='text-3xl font-extrabold'>Cart totals</h1>

        <div className='flex justify-between border-2 border-gray-200' style={{ padding: 14 }}>
          <div>
            <p>Subtotal</p>
            <p>Price</p>
          </div>
          <div>
            <p>190$</p>
            <p>{Total}$</p>
          </div>
        </div>

        <div className='w-full flex justify-center flex-col gap-4'>
  {!clientSecret ? (
    <button
      onClick={startCheckout}
      className='bg-btn-primary hover:bg-btn-primary-hover w-full rounded-3xl text-white h-12 outline-1'
    >
      Proceed to Checkout
    </button>
  ) : (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )}
</div>

      </div>
    </div>
  );
};

export default CartCard;
