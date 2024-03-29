"use server"

import { auth } from "@clerk/nextjs"
import { getUserProgress } from "../../db/query"
import db from "../../db/drizzle"
import { eq, and } from "drizzle-orm"
import { challengeProgress, challenges, userProgress } from "../../db/schema"
import { revalidatePath } from "next/cache"
import { ERRORS } from "@/constants/error-code"


export const upsertChallengeProgress = async (challengeId: number) => {
  // check existing user
  const { userId } = auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }

  // check user progress
  const foundUserProgress = await getUserProgress();
  if (!foundUserProgress) {
    throw new Error("User progress not found")
  }

  // find the challenge with challenge id 
  const foundChallenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId)
  })
  if (!foundChallenge) {
    throw new Error("Challenge not found")
  }

  // 
  const lessonId = foundChallenge.lessonId

  // Decide whether the user is doning the challenge again
  const foundChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    )
  })
  const isPractice = !!foundChallengeProgress;

  // decide heart logics if user is not proactice
  if (foundUserProgress.hearts === 0 && !isPractice) {
    return {
      error: ERRORS.HEARTS
    }
  }

  // handle only practice
  if (isPractice) {
    await db.update(challengeProgress)
      .set({
        completed: true
      })
      .where(
        eq(challengeProgress.id, foundChallengeProgress.id)
      );

    await db.update(userProgress).set({
      hearts: Math.min(foundUserProgress.hearts + 1, 5),
      points: foundUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));

    // refresh cache for pages
    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)

    return
  }

  // update challenge
  await db.insert(challengeProgress)
    .values({
      challengeId,
      userId,
      completed: true
    })

  await db.update(userProgress).set({
    points: foundUserProgress.points + 10,
  }).where(eq(userProgress.userId, userId))
  revalidatePath("/learn")
  revalidatePath("/lesson")
  revalidatePath("/quests")
  revalidatePath("/leaderboard")
  revalidatePath(`/lesson/${lessonId}`)


}



