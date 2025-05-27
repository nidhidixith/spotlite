import React from "react";
import {
  LucideSparkles,
  LucideUsers,
  LucideCalendar,
  LucideCamera,
} from "lucide-react";

const features = [
  {
    title: "Create Posts & Events",
    description:
      "Share your content, thoughts, or upcoming shows with the world.",
    icon: <LucideCamera size={32} />,
  },
  {
    title: "Follow and Connect",
    description:
      "Build your network by following creators and engaging with their content.",
    icon: <LucideUsers size={32} />,
  },
  {
    title: "Showcase Talents",
    description:
      "Display your interests, portfolio, and unique flair in one place.",
    icon: <LucideSparkles size={32} />,
  },
  {
    title: "Attend & Host Events",
    description: "Be part of live experiences—online or offline.",
    icon: <LucideCalendar size={32} />,
  },
];

export default function HomePage() {
  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="bg-white text-center py-20 px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
          Welcome to <span className="text-indigo-600">Spotlite</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          A platform for creators, influencers, and artists to showcase their
          passion.
        </p>
        <div className="space-x-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700">
            Get Started
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-xl text-gray-700 hover:bg-gray-100">
            Explore Creators
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm">
              <div className="text-indigo-600 mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to shine?</h2>
        <p className="mb-6">
          Join thousands of creators sharing their talent on Spotlite.
        </p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold">
          Create Your Profile
        </button>
      </section>
    </main>
  );
}
