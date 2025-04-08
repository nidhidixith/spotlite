import React from "react";

const QuestionsAndAnswers = ({ profile }) => {
  return (
    <div className="bg-white px-4 py-3 mb-4 shadow-md rounded-lg w-full">
      <p className="text-gray-800 font-bold text-base mb-3">
        More about {profile?.display_name}
      </p>

      {profile?.questions_and_answers &&
      profile.questions_and_answers.length > 0 ? (
        profile.questions_and_answers.map((q_and_a, index) => (
          <div key={index} className="flex flex-row items-start mb-3">
            {/* <p className="text-xl text-gray-800 mr-2">•</p> */}
            <p className="font-semibold text-sm text-gray-800 mr-2">
              {index + 1}.
            </p>
            <div>
              <p className="font-semibold text-sm text-gray-800 mb-1">
                {q_and_a.question_text}
              </p>
              <p className="text-sm text-gray-800">{q_and_a.answer_text}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600 self-center">No Q&As added</p>
      )}
    </div>
  );
};

export default QuestionsAndAnswers;
