"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GetAppModal from "../Others/GetAppModal";

const features = [
  {
    title: "Create & Share",
    desc: "Post your content and shine in the spotlight.",
    icon: "📸",
  },
  {
    title: "Showcase Your Social Presence",
    desc: "Share your social links and connect across platforms.",
    icon: "✨",
  },
  {
    title: "Build Your Profile",
    desc: "Add a bio, showcase your interests, and share your profile anywhere.",
    icon: "👤",
  },

  {
    title: "Follow & Stay Updated",
    desc: "Follow creators to see their latest posts and activities in your feed.",
    icon: "📢",
  },
  {
    title: "Events & Networking",
    desc: "Find and join exciting events to grow your network.",
    icon: "🎭",
  },
  {
    title: "Engage & Connect",
    desc: "Like, comment, and interact with like-minded creators.",
    icon: "💬",
  },
];

const testimonials = [
  {
    name: "Alex T.",
    text: "Spotlite changed the way I showcase my work!",
  },
  {
    name: "Jordan P.",
    text: "Finally, a platform that helps creators connect!",
  },
];

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-10 px-6">
        <h1 className="text-4xl font-bold">
          Spotlite - Shine Bright, Connect & Inspire
        </h1>
        <p className="mt-4 text-lg">
          Empowering creators to share, engage, and grow their audience.
        </p>

        <button
          className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-full font-medium shadow-lg hover:bg-gray-200 transition"
          onClick={toggleModal}
        >
          Join the Community
        </button>
      </section>

      <section className="py-10 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">What is Spotlite?</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Spotlite is the ultimate platform for artists, content creators, and
          influencers to shine. Spotlite is designed to celebrate you—your art,
          your passion, and your journey—by showcasing what truly defines you.
          Here, you can craft a profile that highlights who you are, your
          interests, creative works, and links to your other social platforms.
        </p>
        <p className="mt-2 max-w-3xl mx-auto text-gray-700">
          At Spotlite, we believe in empowering creators to take center stage
          because your art deserves to be seen , your voice deserves to be
          heard, and your journey deserves to be celebrated.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-10 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Spotlite Offers
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us / Mission Section */}
      <section className="bg-gray-200 py-10 px-6 text-center">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-700">
          Spotlite is built for creators who want to share their passion,
          connect with their audience, and grow their brand. We provide a
          platform where talent meets opportunity.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">“{testimonial.text}”</p>
              <h3 className="mt-4 font-semibold">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Social Links */}
      <footer className="bg-gray-900 text-white p-6 text-center">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="mt-2">
          Have questions? Email us at{" "}
          <a href="mailto:support@spotlite.com" className="underline">
            support@spotlite.com
          </a>
        </p>

        {/* FAQ + Legal Links */}
        <div className="mt-4 space-y-1">
          <Link
            href="/faqs"
            className="text-blue-400 underline hover:text-blue-300 block"
          >
            Read our FAQs
          </Link>
          <Link
            href="/terms"
            className="text-blue-400 underline hover:text-blue-300 block"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="text-blue-400 underline hover:text-blue-300 block"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="#">
            <span className="text-xl">🌍</span>
          </Link>
          <Link href="#">
            <span className="text-xl">📷</span>
          </Link>
          <Link href="#">
            <span className="text-xl">🐦</span>
          </Link>
        </div>
      </footer>
      <GetAppModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default About;
