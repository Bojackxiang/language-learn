"use client"

import React, { useState, useTransition } from 'react'
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

import Header from './header';
import QuestionBubble from './question-bubble';
import Challenge from './challenge';
import Footer from './Footer';

import { upsertChallengeProgress } from '@/actions/challenge-progress';

import { challengeOptions, challenges, userSubscription } from '../../../../db/schema';
import { ERRORS } from '@/constants/error-code';


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
    if (initialPercentage > 0.001) {
      return initialPercentage
    }
    return 0.001
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
  const router = useRouter()


  const title = challenge?.type === "ASSIST"
    ? "Select the correct meaning"
    : challenge.question;

  const onHandleAnswerSelected = (id: number) => {
    setSelectedOption(id)
  }

  const onNext = () => {
    if (activeIndex + 1 >= challenges.length) {
      router.push('/learn')
    } else {
      setActiveIndex((current) => current + 1);
    }
  }

  const onContinue = () => {

    if (!selectedOption) return;

    // handle if option is already already picked - wrong
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    // handle if option is already already picked - correct
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }


    // find the coprrect option from the response
    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;

    // hadle correct option
    if (correctOption.id === selectedOption) {
      startTransition(() => {
        // return;
        upsertChallengeProgress(challenge.id)
          .then(response => {
            if (response?.error === ERRORS.HEARTS) {
              return;
            }

            // update ui state
            setStatus("correct")
            setPercentage((prev) => prev + 1 / challenges.length);
            if (percentage === 100) {
              setHearts(prev => Math.min(prev + 1, 5))
            }

          })
          .catch(e => toast.error(ERRORS.SOMETHING_IS_WRONG))

      });
    } else {
      // TODO: WHEN USER PICKED WRONG OPTION FOR THE CHALLENGE
    }
  }

  return (
    <div className='h-full flex flex-col'>
      <Header
        hearts={initialHearts}
        percentage={percentage * 100}
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
        status={status} // none, correct, wrong
        onCheck={onContinue}
        lessonId={lessonId}
      />
    </div>
  )
}

export default Quiz