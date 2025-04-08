import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaTwitter,
  // FaThreads,
  FaLink,
  FaLinkedin,
  FaFolder,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export const links = {
  instagram: {
    platform: "instagram",
    backendName: "instagram_link",
    icon: <FaInstagram size={16} color="#E4405F" style={{ marginRight: 8 }} />,
  },
  facebook: {
    platform: "facebook",
    backendName: "facebook_link",
    icon: <FaFacebook size={16} color="#3b5998" style={{ marginRight: 8 }} />,
  },
  youtube: {
    platform: "youtube",
    backendName: "youtube_link",
    icon: <FaYoutube size={16} color="#FF0000" style={{ marginRight: 8 }} />,
  },
  tiktok: {
    platform: "tiktok",
    backendName: "tiktok_link",
    icon: <FaTiktok size={16} color="#010101" style={{ marginRight: 8 }} />,
  },
  pinterest: {
    platform: "pinterest",
    backendName: "pinterest_link",
    icon: <FaPinterest size={16} color="#E60023" style={{ marginRight: 8 }} />,
  },
  twitter: {
    platform: "twitter",
    backendName: "twitter_link",
    icon: <FaTwitter size={16} color="#1DA1F2" style={{ marginRight: 8 }} />,
  },
  threads: {
    platform: "threads",
    backendName: "threads_link",
    icon: <FaThreads size={16} color="#4b5563" style={{ marginRight: 8 }} />,
  },
  linkedin: {
    platform: "linkedin",
    backendName: "linkedin_link",
    icon: <FaLinkedin size={16} color="#0077b5" style={{ marginRight: 8 }} />,
  },
  portfolio: {
    platform: "portfolio",
    backendName: "portfolio_link",
    icon: <FaFolder size={16} color="#4CAF50" style={{ marginRight: 8 }} />,
  },
};
