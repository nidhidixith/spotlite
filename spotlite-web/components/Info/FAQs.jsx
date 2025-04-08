"use client";
import React, { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const faqCategories = [
  {
    title: "General",
    questions: [
      {
        id: 1,
        question: "What is Spotlite?",
        answer:
          "Spotlite is a platform designed to celebrate creativity and originality by allowing users to showcase their unique journeys, connect with others, and share their work.",
      },
      {
        id: 2,
        question: "Who can use Spotlite?",
        answer:
          "Spotlite is for anyone who wants to express themselves authentically, connect with like-minded individuals, and share their passion with a supportive community.",
      },
      {
        id: 3,
        question: "Is Spotlite free to use?",
        answer: "Yes, Spotlite is completely free to use.",
      },
    ],
  },
  {
    title: "Profile and Account",
    questions: [
      {
        id: 1,
        question: "How do I create an account on Spotlite?",
        answer:
          "You can create an account by signing up with your valid email ID.",
      },
      {
        id: 2,
        question: "Can I edit my profile information later?",
        answer:
          "Yes, you can update your profile details anytime by clicking on 'Edit Profile' on your profile page.",
      },
      {
        id: 3,
        question: "How can I delete my account?",
        answer:
          "You can delete your account by going to the settings page in the menu and selecting the 'Delete Account' option",
      },
    ],
  },
  {
    title: "Content and Interaction",
    questions: [
      {
        id: 1,
        question: "What types of content can I share on Spotlite?",
        answer:
          "You can share posts, events, and more that represent your creativity and interests.",
      },
      {
        id: 2,
        question: "How do I connect with other users?",
        answer:
          "You can follow other users, comment on their posts, and engage with their content to build connections.",
      },
      {
        id: 3,
        question: "Are there any guidelines for posting content?",
        answer:
          "Yes, Spotlite encourages authentic, original content and prohibits any offensive, plagiarized, or harmful material.",
      },
    ],
  },
  {
    title: "Privacy and Security",
    questions: [
      {
        id: 1,
        question: "How is my data protected on Spotlite?",
        answer:
          "Spotlite takes your privacy seriously. We use advanced security measures to protect your data and never share it without your consent.",
      },
    ],
  },
  {
    title: "Technical Issues",
    questions: [
      {
        id: 1,
        question: "I’m having trouble logging in. What should I do?",
        answer:
          "Ensure your email ID and password are correct. If the problem persists, try resetting your password or contact our support team.",
      },
      {
        id: 2,
        question: "Why isn’t my content uploading?",
        answer:
          "Check your internet connection and ensure your content meets our upload requirements. If the issue continues, contact support.",
      },
      {
        id: 3,
        question: "How do I report a bug or suggest a feature?",
        answer:
          "You can report bugs or share suggestions through the feedback section in the app settings.",
      },
    ],
  },
  {
    title: "Community and Support",
    questions: [
      {
        id: 1,
        question: "How do I report inappropriate content or behavior?",
        answer:
          "You can report content or users directly from their profile or post. Our team will review and take appropriate action.",
      },
      {
        id: 2,
        question: "How can I contact customer support?",
        answer:
          "You can reach us through the 'Contact Us' section in the app or email us at support@spotlite.com.",
      },
    ],
  },
];

const AccordionItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-md transition-all">
      <button
        className="flex items-center justify-between w-full text-left px-4 py-3 hover:bg-gray-50 transition-all"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <p className="text-sm md:text-base text-gray-900 font-medium">
          {question}
        </p>
        {expanded ? (
          <IoChevronUp size={18} className="text-sky-600" />
        ) : (
          <IoChevronDown size={18} className="text-sky-600" />
        )}
      </button>
      {expanded && (
        <div className="py-3 px-4  text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-200">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-sky-600 mb-6">
        Frequently Asked Questions
      </h1>
      {faqCategories.map((category) => (
        <div key={category.title} className="mb-6">
          <h2 className="text-lg md:text-xl text-sky-600 font-semibold mb-4">
            {category.title}
          </h2>
          <div className="space-y-4">
            {category.questions.map((q) => (
              <AccordionItem
                key={q.id}
                question={q.question}
                answer={q.answer}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
