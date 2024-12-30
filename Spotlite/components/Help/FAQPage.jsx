import React, { Children, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const generalQuestions = [
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
];

const profileAndAccountQuestions = [
  {
    id: 1,
    question: "How do I create an account on Spotlite?",
    answer: "You can create an account by signing up with your valid email ID.",
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
];

const contentAndInteractionQuestions = [
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
];

const privacyAndSecurityQuestions = [
  {
    id: 1,
    question: " How is my data protected on Spotlite?",
    answer:
      "Spotlite takes your privacy seriously. We use advanced security measures to protect your data and never share it without your consent.",
  },
];

const technicalIssuesQuestions = [
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
];

const communityAndSupportQuestions = [
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
];

const AccordionItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleItem = () => {
    setExpanded(!expanded);
  };

  const body = (
    <Text className="text-sm p-3 bg-gray-50 rounded-lg">{answer}</Text>
  );

  return (
    <View className="p-1">
      <TouchableOpacity
        className="flex flex-row items-center justify-between bg-sky-50 p-3 rounded-lg mb-2"
        onPress={toggleItem}
      >
        <Text className="text-[16px] font-semibold text-sky-600 mr-2">
          {question}
        </Text>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          size={12}
          color="#0284c7"
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
};

const FAQsPage = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-2">
      <Text className="text-2xl mt-2 mb-6 text-sky-800 font-bold self-center">
        Frequently asked questions
      </Text>

      <View className="mb-4">
        <Text className="text-lg mb-2 text-sky-700 font-bold">General</Text>
        {generalQuestions.map((generalQuestion) => (
          <AccordionItem
            key={generalQuestion.id}
            question={generalQuestion.question}
            answer={generalQuestion.answer}
          />
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 text-sky-700 font-bold">
          Profile and Account
        </Text>
        {profileAndAccountQuestions.map((profileAndAccountQuestion) => (
          <AccordionItem
            key={profileAndAccountQuestion.id}
            question={profileAndAccountQuestion.question}
            answer={profileAndAccountQuestion.answer}
          />
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 text-sky-700 font-bold">
          Content and Interaction
        </Text>
        {contentAndInteractionQuestions.map((contentAndInteractionQuestion) => (
          <AccordionItem
            key={contentAndInteractionQuestion.id}
            question={contentAndInteractionQuestion.question}
            answer={contentAndInteractionQuestion.answer}
          />
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 text-sky-700 font-bold">
          Privacy and Security
        </Text>
        {privacyAndSecurityQuestions.map((privacyAndSecurityQuestion) => (
          <AccordionItem
            key={privacyAndSecurityQuestion.id}
            question={privacyAndSecurityQuestion.question}
            answer={privacyAndSecurityQuestion.answer}
          />
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 text-sky-700 font-bold">
          Technical Issues
        </Text>
        {technicalIssuesQuestions.map((technicalIssuesQuestion) => (
          <AccordionItem
            key={technicalIssuesQuestion.id}
            question={technicalIssuesQuestion.question}
            answer={technicalIssuesQuestion.answer}
          />
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-lg mb-2 text-sky-700 font-bold">
          Community and Support
        </Text>
        {communityAndSupportQuestions.map((communityAndSupportQuestion) => (
          <AccordionItem
            key={communityAndSupportQuestion.id}
            question={communityAndSupportQuestion.question}
            answer={communityAndSupportQuestion.answer}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default FAQsPage;
