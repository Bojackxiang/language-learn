"use client"

import React, { useState, useTransition } from 'react'
import { challengeOptions, challenges, userSubscription } from '../../../../db/schema';
import Header from './header';
import QuestionBubble from './question-bubble';
import Challenge from './challenge';
import Footer from './Footer';

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
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")
  const [pending, startTransition] = useTransition()

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];


  const title = challenge.type === "ASSIST"
    ? "Select the correct meaning"
    : challenge.question;

  const onHandleAnswerSelected = (id: number) => {
    setSelectedOption(id)
  }

  const onContinue = () => {
    console.log("button clicked")

    console.log("selected id", selectedOption)



  }

  return (
    <div className='h-full flex flex-col'>
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
                onSelect={onHandleAnswerSelected}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={"none"} // none, correct, wrong
        onCheck={onContinue}
        lessonId={lessonId}
      />
    </div>
  )
}

export default Quiz