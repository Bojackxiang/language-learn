import React from 'react'
import { getLesson, getUserProgress } from '../../../../db/query'
import { redirect } from 'next/navigation';
import Quiz from './quiz';


const LessonPage = async () => {
  // get current lesson data 
  const currentLession = await getLesson()

  // get user progress data 
  const userProgress = await getUserProgress()

  // if no lesson or user progress existed, 
  //    redirect to learn page
  if (!currentLession || !userProgress) {
    redirect("/learn")
  }

  // calculate the challenge percentage 
  const challengeCompletedPercentage = currentLession.challenges.filter((challenge) => {
    return challenge.completed
  }).length / currentLession.challenges.length


  return (

    <Quiz initialHearts={userProgress.hearts}
      initialPercentage={challengeCompletedPercentage}
      initialLessonId={currentLession.id}
      initialLessonChallenges={currentLession.challenges}
      userSubscription={null} />

  )
}

export default LessonPage