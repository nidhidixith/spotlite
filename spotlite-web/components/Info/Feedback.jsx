"use client";
import { useState } from "react";
import React from "react";

const Feedback = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus("submitting");

  //   try {
  //     await new Promise((res) => setTimeout(res, 1000)); // Simulate backend
  //     setStatus("success");
  //     setType("");
  //     setName("");
  //     setMessage("");
  //   } catch (err) {
  //     setStatus("error");
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 border rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold mb-2">
        We’d love to hear from you
      </h1>
      <p className="text-gray-500 mb-6">
        Choose how you'd like to reach us — whatever’s easiest for you!
      </p>

      <div className="flex flex-col gap-6">
        <a
          href="mailto:support@yourapp.com"
          className="text-blue-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-3 rounded-lg text-center font-medium transition"
        >
          📧 Email us at support@yourapp.com
        </a>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="font-medium cursor-pointer">
            📝 Or submit a quick feedback form
          </summary>
          <form
            // onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-4"
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="p-2 border rounded"
            >
              <option value="">Choose type</option>
              <option value="bug">Bug</option>
              <option value="suggestion">Suggestion</option>
              <option value="feedback">General Feedback</option>
            </select>

            <input
              type="text"
              placeholder="Your Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
            />

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="p-2 border rounded min-h-[100px]"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {status === "submitting" ? "Sending..." : "Send"}
            </button>

            {status === "success" && (
              <p className="text-green-600">
                Thanks! We received your message.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600">Oops! Something went wrong.</p>
            )}
          </form>
        </details>
      </div>
    </div>
  );
};

export default Feedback;
