# 🧠 MS InfiniTech — MERN E-Commerce Platform

A **modern, full-stack e-commerce web application** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It offers a smooth shopping experience with **secure authentication, dynamic cart management, Stripe payment integration**, and a **personalized user dashboard**.

---

## 🚀 Tech Stack

| Layer | Technologies Used |
|-------|-------------------|
| **Frontend** | React.js, Redux Toolkit, React Router DOM, Tailwind CSS |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose) |
| **Authentication** | JWT (JSON Web Token) + LocalStorage persistence |
| **Payments** | Stripe Checkout Integration |
| **Deployment** | Netlify (Frontend) + Render / Vercel (Backend) |

---

## ✨ Features

### 👤 User System
- Secure **login & signup** using JWT authentication  
- Persistent session stored in localStorage  
- **Protected routes** — only logged-in users can access dashboard & checkout  
- Profile and password management  
- Logout system with state cleanup  

### 🛍️ Storefront
- Beautiful product grid with images, titles, and prices  
- Responsive UI with Tailwind CSS  
- Search and filter functionality  
- Dynamic product details pages  

### 🛒 Cart & Checkout
- Add / remove / update cart items in real time  
- Auto calculation of cart totals  
- **Stripe payment** integration for secure checkout  
- Auto order creation after payment confirmation  

### 📦 Orders & Dashboard
- Personalized **user dashboard** with multiple sections:
  - 🧾 **Orders:** View all your previous orders (fetched from backend via Redux thunk)  
  - 👤 **Profile:** Update user details  
  - 🔐 **Security:** Change password securely  
  - 💳 **Billing:** Placeholder for future payment history  
  - 💖 **Wishlist:** Future expansion area  
  - 🧰 **Support:** Contact & help options  

### 💳 Stripe Integration
- Backend creates a **Stripe checkout session**  
- Secure redirection to payment  
- Stripe webhook support (for order confirmation & logging)  
- Real-time payment status handling  

### ⚙️ Admin (Future Enhancement)
- Manage users, orders, and products  
- Sales analytics dashboard  
- Product management interface  

---




## 🔐 Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:5173



