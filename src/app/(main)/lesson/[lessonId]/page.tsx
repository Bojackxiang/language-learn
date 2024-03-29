import React from 'react'
import { redirect } from 'next/navigation';
import { getLesson, getUserProgress } from '../../../../../db/query';
import Quiz from '../quiz';



const LessonPage = async () => {
  // get current lesson data 
  const currentLesson = await getLesson()

  // get user progress data 
  const userProgress = await getUserProgress()


  if (!currentLesson || !userProgress) {
    console.warn("not currentLession or userProgress, redirecting ...")
    redirect("/learn")
  }

  // calculate the challenge percentage
  const challengeCompletedPercentage = currentLesson.challenges.filter((challenge) => {
    return challenge.completed
  }).length / currentLesson.challenges.length


  return (
    <Quiz initialHearts={userProgress.hearts}
      initialPercentage={challengeCompletedPercentage}
      initialLessonId={currentLesson.id}
      initialLessonChallenges={currentLesson.challenges}
      userSubscription={null} />
  )
}

export default LessonPage