"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import BasicDetails from "@/components/UserProfile/BasicDetails";
import Bio from "@/components/UserProfile/Bio";
import SocialLinks from "@/components/UserProfile/SocialLinks";
import SocialStats from "@/components/UserProfile/SocialStats";
import Activity from "@/components/UserProfile/Activity";
import Interests from "@/components/UserProfile/Interests";
import QuestionsAndAnswers from "@/components/UserProfile/QuestionsAndAnswers";

import Spinner from "@/components/Others/Spinner";
import ErrorComponent from "@/components/Others/ErrorComponent";

const UserProfile = () => {
  let { userId } = useParams();
  userId = Number(userId);

  const [profile, setProfile] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const [profileRes, latestPostRes, latestEventRes] =
        await Promise.allSettled([
          axios.get(
            `http://192.168.1.33:8000/api/users/web/${userId}/profile/`
          ),
          axios.get(`http://192.168.1.33:8000/api/posts/latest/${userId}/`),
          axios.get(`http://192.168.1.33:8000/api/events/latest/${userId}/`),
        ]);

      // Handle profile response
      if (profileRes.status === "fulfilled") {
        // console.log("Profile data: ", profileRes.value.data);
        setProfile(profileRes.value.data);
      } else {
        console.error("Error fetching profile:", profileRes.reason);
        setError(
          profileRes.reason.response?.data?.detail || "Failed to load profile"
        );
      }

      // Handle latest post response
      if (latestPostRes.status === "fulfilled") {
        // console.log("Latest Post: ", latestPostRes.value.data);
        setLatestPost(latestPostRes.value.data);
      } else if (latestPostRes.reason.response?.status === 404) {
        console.warn("No posts found");
        setLatestPost(null); // Handle no post scenario
      } else {
        console.error("Error fetching latest post:", latestPostRes.reason);
        setError(
          latestPostRes.reason.response?.data?.detail || "Failed to load post"
        );
      }

      // Handle latest event response
      if (latestEventRes.status === "fulfilled") {
        // console.log("Latest Event: ", latestEventRes.value.data);
        setLatestEvent(latestEventRes.value.data);
      } else if (latestEventRes.reason.response?.status === 404) {
        console.warn("No events found");
        setLatestEvent(null); // Handle no event scenario
      } else {
        console.error("Error fetching latest event:", latestEventRes.reason);
        setError(
          latestEventRes.reason.response?.data?.detail || "Failed to load event"
        );
      }
    } catch (err) {
      console.error("Unexpected error fetching data:", err);
      setError(err.response?.data?.detail || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleRetry = () => {
    if (userId) {
      fetchData();
    }
  };
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    // console.log("Error:", error);
    return <ErrorComponent onRetry={handleRetry} />;
  }
  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-6 w-full max-w-[1100px]">
        {/* Left Spacer or Future Sidebar */}

        {/* Main Content (center) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col items-center mt-6">
          <BasicDetails profile={profile} />
          <Bio profile={profile} />
          <Interests profile={profile} />
          <SocialStats />
          <Activity
            profile={profile}
            latestPost={latestPost}
            latestEvent={latestEvent}
          />
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 flex flex-col items-center mt-6">
          <SocialLinks profile={profile} />
          {profile?.questions_and_answers?.length > 0 && (
            <QuestionsAndAnswers profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
