"user client"

import React from 'react'
import { challengeOptions, challenges, userSubscription } from '../../../../db/schema';
import Header from './header';

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
  return (
    <>
      <Header
        hearts={initialHearts}
        percentage={initialPercentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  )
}

export default Quiz