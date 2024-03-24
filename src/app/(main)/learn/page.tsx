import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/sticky-wrapper'
import React from 'react'
import Header from './(component)/header'
import UserProgress from './(component)/user-progress'
import { getCourseProgress, getLessionPercentage, getUnits, getUserProgress } from '../../../../db/query'
import { redirect } from 'next/navigation'
import Unit from './(component)/unit'
import { lessons as LessionSchema, units as unitsSchema } from '../../../../db/schema'


const LearnPage = async () => {
  const userProgress = await getUserProgress();
  const courseProgress = await getCourseProgress();
  const lessonPercentage = await getLessionPercentage();

  if (!userProgress || !userProgress.activeCourseId || !userProgress.activeCourse) {
    // 学生还没有选择 课程
    redirect("/courses")
  }

  const units = await getUnits()


  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={true}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress?.activeLesson as typeof LessionSchema.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage