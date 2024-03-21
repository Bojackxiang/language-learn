import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/sticky-wrapper'
import React from 'react'
import Header from './(component)/header'
import UserProgress from './(component)/user-progress'
import { getUserProgress } from '../../../../db/query'
import { redirect } from 'next/navigation'




const LearnPage = async () => {
  const userProgress = await getUserProgress();

  if (!userProgress) {
    // 学生还没有选择 课程
    redirect("/courses")
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            title: "chinese",
            imageSrc: "/es.svg"
          }}
          hearts={0}
          points={20}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title='hello' />
      </FeedWrapper>
    </div>
  )
}

export default LearnPage