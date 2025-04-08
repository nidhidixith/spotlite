import React from "react";
import Head from "next/head";

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Spotlite</title>
      </Head>
      <div className="min-h-screen bg-white px-4 py-8 sm:px-8 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Effective Date: April 8, 2025
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. User Eligibility
              </h2>
              <p>
                To use Spotlite, you must be at least 13 years old. By using the
                app, you confirm that you meet this requirement and that the
                information you provide is accurate and complete.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. User Accounts
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities under your account.
                You agree to notify us immediately of any unauthorized access or
                use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                3. Content Ownership and Usage
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  You retain ownership of the content you post, such as images,
                  videos, and text.
                </li>
                <li>
                  By posting content, you grant Spotlite a worldwide,
                  non-exclusive, royalty-free license to use, reproduce, modify,
                  and display the content within the app for the purpose of
                  providing and improving our services.
                </li>
                <li>
                  You agree not to post content that is illegal, offensive, or
                  violates the rights of others.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                4. Acceptable Use
              </h2>
              <p className="mb-1">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use the app for unlawful purposes</li>
                <li>Harass, bully, or threaten others</li>
                <li>Impersonate someone else</li>
                <li>
                  Upload or share harmful or malicious content (e.g., malware,
                  spam)
                </li>
                <li>
                  Attempt to gain unauthorized access to other user accounts or
                  our systems
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                5. Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your account at any
                time, without notice, for conduct that violates these Terms or
                is harmful to other users or Spotlite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                6. Limitation of Liability
              </h2>
              <p className="mb-1">
                Spotlite is provided "as is" and "as available." We are not
                liable for:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Any loss or damage resulting from your use of the app</li>
                <li>User-generated content or interactions with other users</li>
                <li>Temporary interruptions or errors in service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                7. Modifications to Terms
              </h2>
              <p>
                We may update these Terms from time to time. When we do, we will
                revise the "Effective Date" above. Continued use of the app
                after changes means you accept the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                8. Privacy
              </h2>
              <p>
                Please review our{" "}
                <a href="/privacy" className="text-blue-600 underline">
                  Privacy Policy
                </a>{" "}
                to understand how we collect and use your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                9. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, feel free to
                contact us at:{" "}
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

export default Terms;
