import {
  FontAwesome,
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

export const links = {
  instagram: {
    platform: "instagram",
    backendName: "instagram_link",
    icon: (
      // <FontAwesome
      //   name="instagram"
      //   size={18}
      //   color="#E4405F"
      //   style={{ marginRight: 8 }}
      // />
      <Ionicons
        name="logo-instagram"
        size={18}
        color="#E4405F"
        // color="#4b5563"
        marginRight={8}
      />
    ),
  },
  facebook: {
    platform: "facebook",
    backendName: "facebook_link",
    icon: (
      // <AntDesign
      //   name="facebook-square"
      //   size={18}
      //   color="#3b5998"
      //   style={{ marginRight: 8 }}
      // />
      <Ionicons
        name="logo-facebook"
        size={18}
        color="#3b5998"
        marginRight={8}
      />
    ),
  },
  youtube: {
    platform: "youtube",
    backendName: "youtube_link",
    icon: (
      // <AntDesign name="youtube" size={18} color="#FF0000" marginRight={8} />
      <Ionicons name="logo-youtube" size={18} color="#FF0000" marginRight={8} />
    ),
  },
  tiktok: {
    platform: "tiktok",
    backendName: "tiktok_link",
    icon: (
      // <FontAwesome6 name="tiktok" size={16} color="#010101" marginRight={8} />
      <Ionicons name="logo-tiktok" size={18} color="#010101" marginRight={8} />
    ),
  },
  pinterest: {
    platform: "pinterest",
    backendName: "pinterest_link",
    icon: (
      // <FontAwesome name="pinterest" size={18} color="#E60023" marginRight={8} />
      <Ionicons
        name="logo-pinterest"
        size={18}
        color="#E60023"
        marginRight={8}
      />
    ),
  },
  twitter: {
    platform: "twitter",
    backendName: "twitter_link",
    icon: (
      // <FontAwesome name="twitter" size={18} color="#1DA1F2" marginRight={8} />
      <Ionicons name="logo-twitter" size={18} color="#1DA1F2" marginRight={8} />
    ),
  },
  threads: {
    platform: "threads",
    backendName: "threads_link",
    icon: (
      <FontAwesome6 name="threads" size={18} color="#4b5563" marginRight={8} />
    ),
  },
  linkedin: {
    platform: "linkedin",
    backendName: "linkedin_link",
    icon: (
      // <AntDesign
      //   name="linkedin-square"
      //   size={18}
      //   color="#0077b5"
      //   marginRight={8}
      // />
      <Ionicons
        name="logo-linkedin"
        size={18}
        color="#0077b5"
        marginRight={8}
      />
    ),
  },
  portfolio: {
    platform: "portfolio",
    backendName: "portfolio_link",
    icon: (
      // <AntDesign name="profile" size={18} color="#4CAF50" marginRight={8} />
      <Ionicons name="folder" size={18} color="#4CAF50" marginRight={8} />
    ),
  },
};
