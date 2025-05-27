import React from "react";
import Head from "next/head";

const SocialStatsInfo = () => {
  return (
    <>
      <Head>
        <title>About Social Stats | Spotlite</title>
      </Head>
      <main className="max-w-3xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Understanding Social Stats</h1>
        <p className="mb-4">
          Spotlite’s <strong>Social Stats</strong> feature lets you connect your
          social media accounts and fetch your follower count directly from
          platforms like Instagram, Facebook, Twitter, and YouTube —{" "}
          <strong>with your permission</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">What We Fetch</h2>
        <p className="mb-4">
          We securely access only the **public follower counts** from the
          platforms you connect. This data helps show your influence and
          credibility (your clout!) directly on your Spotlite profile.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Privacy & Safety</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            We use industry-standard <strong>OAuth login</strong> for
            authentication.
          </li>
          <li>
            Your credentials are <strong>never stored</strong> or accessed by
            us.
          </li>
          <li>Only the follower count is retrieved.</li>
          <li>
            All data is fetched <strong>with your permission</strong>.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Why It Matters</h2>
        <p className="mb-4">
          Showing your social stats on Spotlite enhances your profile by:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Displaying your social presence in one place</li>
          <li>Boosting credibility when others view your profile</li>
          <li>
            Helping event organizers and collaborators understand your reach
          </li>
        </ul>

        <p className="mt-6 text-sm text-gray-600">
          You can revoke access at any time from your social media account
          settings.
        </p>
      </main>
    </>
  );
};

export default SocialStatsInfo;
