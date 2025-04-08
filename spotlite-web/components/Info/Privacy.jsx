import React from "react";
import Head from "next/head";

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Spotlite</title>
      </Head>
      <div className="min-h-screen bg-white px-4 py-8 sm:px-8 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Effective Date: April 8, 2025
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Introduction
              </h2>
              <p>
                At Spotlite, we value your privacy. This Privacy Policy outlines
                how we collect, use, and protect your personal information when
                you use our mobile application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Information We Collect
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Personal Information: Name, email address, profile photo, date
                  of birth, etc.
                </li>
                <li>Usage Data: App activity, device info, log data</li>
                <li>Media Content: Photos, videos, and posts you upload</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To provide and improve our services</li>
                <li>To personalize your experience</li>
                <li>To communicate updates, offers, or support</li>
                <li>To analyze usage trends and enhance security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Sharing Your Information
              </h2>
              <p className="mb-1">
                We do not sell your personal information. We may share it with:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Service providers who help operate our platform</li>
                <li>Authorities if required by law or for safety</li>
                <li>Other users, when you choose to post publicly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Data Security
              </h2>
              <p>
                We implement security measures to protect your information.
                However, no system is completely secure, and we cannot guarantee
                absolute protection.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. Your Rights
              </h2>
              <p className="mb-1">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Access or update your personal data</li>
                <li>Request deletion of your account and data</li>
                <li>Withdraw consent for data use (where applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                7. Children's Privacy
              </h2>
              <p>
                Spotlite is not intended for users under the age of 13. We do
                not knowingly collect data from children under 13 years of age.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this policy from time to time. We will notify
                users of significant changes and update the “Effective Date” at
                the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                9. Contact Us
              </h2>
              <p>
                For any questions or concerns regarding this Privacy Policy,
                contact us at:
                <br />
                📧{" "}
                <a
                  href="mailto:support@spotliteapp.com"
                  className="text-blue-600 underline"
                >
                  support@spotliteapp.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
