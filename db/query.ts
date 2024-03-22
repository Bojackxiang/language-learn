import { cache } from "react";
import db from "./drizzle";
import { auth, useAuth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "./schema";

export const getCourses = cache(async () => {
  return db.query.courses.findMany()
})

export const getUserProgress = cache(async () => {
  const { userId } = auth()

  if (!userId) {
    return null;
  }

  return db.query.userProgress.findFirst(
    {
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true
      }
    }
  )
}
)

export const getCourseById = async (courseId: number) => {

  const data = db.query.courses.findFirst({
    where: eq(courses.id, courseId,)
  })

  return data;
}