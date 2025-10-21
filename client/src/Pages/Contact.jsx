
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
export default function Contact() {

    const ContactForm = () => {
        return (
            <div
                className="px-6 md:px-12 h-screen py-16 text-cente gap-6  flex flex-col items-center justify-center" style={{padding:8}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
                    Get in Touch 💬
                </h2>

                <form

                    onSubmit={sendEmail}
                    className="w-full max-w-lg  p-6 md:p-10 rounded-2xl shadow-lg border border-blue-500/30"
                >
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Your Name"
                            required
                            className="p-3 bg-transparent border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-400"
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Your Email"
                            required
                            className="p-3 bg-transparent border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-400"
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            required
                            className="p-3 bg-transparent border border-blue-500/30 rounded-lg  focus:outline-none focus:border-blue-400"
                        ></textarea>
                        <button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all  h-12"
                        >
                            Send Message ✉️
                        </button>
                    </div>
                </form>

                {/* SOCIAL LINKS */}
                <div className="flex gap-6 mt-10">
                    <a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href="https://wa.me/923130695289" // 🔹 Replace with your WhatsApp number
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-500 text-3xl hover:text-green-400 transition-all"
                    >
                        <FaWhatsapp />
                    </a>

                    <a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href="https://instagram.com/msinfinitech" // 🔹 Replace with your Insta
                        target="_blank"
                        rel="noreferrer"
                        className="text-pink-500 text-3xl hover:text-pink-400 transition-all"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href="https://www.facebook.com/profile.php?id=61582499220594" // 🔹 Replace with your FB Page
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 text-3xl hover:text-blue-400 transition-all"
                    >
                        <FaFacebookF />
                    </a>
                </div>
            </div>
        )
    }

    const sendEmail = (e) => {
        e.preventDefault();


    };

    return (
        <div className="flex flex-col" >

            <div>
                <Navbar />
            </div>
            
            <div className="min-h-screen">
                <ContactForm />
            </div>


            <div>
                <Footer />
            </div>
        </div>
    );
}
