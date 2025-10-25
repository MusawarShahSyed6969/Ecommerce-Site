import React from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

import Musawar_NoBG from "../images/musawar_nobg.png"

const AboutusPage = () => {

    const features = [
        {
            icon: <FaLightbulb className="text-btn-primary w-10 h-10 mb-4" />,
            title: "Innovative Solutions",
            description: "We create cutting-edge tech solutions that solve real-world problems and empower businesses."
        },
        {
            icon: <FaUsers className="text-btn-primary w-10 h-10 mb-4" />,
            title: "Dedicated Team",
            description: "Our team brings creativity, expertise, and dedication to every project."
        },
        {
            icon: <FaRocket className="text-btn-primary w-10 h-10 mb-4" />,
            title: "Fast Delivery",
            description: "We prioritize efficiency without compromising quality, delivering products on time."
        }
    ];

    const team = [
        { name: "Musawar Shah", role: "CEO & Founder", img: "https://msinfinitech.netlify.app/assets/musawar2-CIEc6C8l.jpeg" },
        { name: "Saeed", role: "Lead Developer", img: "https://msinfinitech.netlify.app/assets/musawar2-CIEc6C8l.jpeg" },
        { name: "Nomi", role: "UI/UX Designer", img: "https://msinfinitech.netlify.app/assets/musawar2-CIEc6C8l.jpeg" },
    ];

    return (
        <div className="flex flex-col bg-gradient-to-b  text-gray-900">
            <Navbar />

            {/* Hero Section */}
            <section
                style={{ padding: '80px 20px' }}
                className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20"
            >
                <div className="md:w-1/3">
                    <img
                        src={Musawar_NoBG}
                        alt="About Hero"
                        className="rounded-2xl shadow-lg w-full"
                    />

                </div>
                <div className="md:w-1/2 flex flex-col gap-6">
                    <h1 className="text-5xl md:text-6xl font-bold text-btn-primary">About MS InfiniTech</h1>
                    <p className="text-gray-700 text-lg md:text-xl">
                        We are passionate about delivering innovative technology solutions that empower businesses and individuals. Our goal is to transform ideas into reality with cutting-edge software and creative design.
                    </p>
                    <p className="text-gray-700 text-lg md:text-xl">
                        Founded with a vision to innovate, MS InfiniTech continues to grow with a team committed to excellence and customer satisfaction.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section
                style={{ padding: '80px 20px' }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-btn-primary" style={{ marginBottom: '48px' }}>Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            style={{ padding: '32px' }}
                            className="bg-bg-secondary rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all text-center"
                        >
                            {feature.icon}
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Image Gallery Section */}
            <section
                style={{ padding: '80px 20px' }}
                className="flex flex-col gap-8"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-btn-primary" style={{ marginBottom: '48px' }}>Our Journey in Pictures</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <img src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="Gallery 1" className="bg-bg-secondary rounded-2xl shadow-lg" />
                    <img src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="Gallery 2" className="bg-bg-secondary rounded-2xl shadow-lg" />
                    <img src="https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp" alt="Gallery 3" className="bg-bg-secondary rounded-2xl shadow-lg" />
                </div>
            </section>

            {/* Team Section */}
            <section
                style={{ padding: '80px 20px' }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-btn-primary" style={{ marginBottom: '48px' }}>Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, i) => (
                        <div
                            key={i}
                            style={{ padding: '24px' }}
                            className="bg-bg-secondary rounded-2xl flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all"
                        >
                            <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mb-4 object-cover" />
                            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                            <p className="text-gray-700">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Google Map Section */}
            <section
                style={{ padding: '80px 20px' }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-btn-primary" style={{ marginBottom: '48px' }}>Our Location</h2>
                <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456!2d-46.633308!3d-23.550520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8e8f1ebff%3A0x1234567890abcdef!2sYour+Company+Address!5e0!3m2!1sen!2s!4v1698371212345!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Our Location"
                    ></iframe>
                </div>
            </section>

            {/* Social Links */}
            <section
                style={{ padding: '80px 20px' }}
                className="text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-btn-primary" style={{ marginBottom: '32px' }}>Connect With Us</h2>
                <div className="flex gap-6 justify-center text-4xl">
                    <a href="https://wa.me/923130695289" target="_blank" rel="noreferrer" className="text-btn-primary hover:text-btn-primary-hover transition-all"><FaWhatsapp /></a>
                    <a href="https://instagram.com/msinfinitech" target="_blank" rel="noreferrer" className="text-btn-primary hover:text-btn-primary-hover transition-all"><FaInstagram /></a>
                    <a href="https://www.facebook.com/profile.php?id=61582499220594" target="_blank" rel="noreferrer" className="text-btn-primary hover:text-btn-primary-hover transition-all"><FaFacebookF /></a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default AboutusPage;
