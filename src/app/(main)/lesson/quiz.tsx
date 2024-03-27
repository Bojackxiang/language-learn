"use client"

import React, { useState } from 'react'
import { challengeOptions, challenges, userSubscription } from '../../../../db/schema';
import Header from './header';
import QuestionBubble from './question-bubble';
import Challenge from './challenge';

interface Props {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
  userSubscription: typeof userSubscription.$inferSelect & {
    isActive: boolean;
  } | null;
}

const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription
}: Props) => {

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];


  const title = challenge.type === "ASSIST"
    ? "Select the correct meaning"
    : challenge.question;

  return (
    <>
      <Header
        hearts={initialHearts}
        percentage={initialPercentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "SELECT" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={() => { }}
                status={"none"}
                selectedOption={1}
                disabled={false}
                type={challenge.type}
              />
              {/* <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      /> */}
    </>
  )
}

export default Quiz