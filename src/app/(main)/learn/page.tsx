import FeedWrapper from '@/components/feed-wrapper'
import StickyWrapper from '@/components/sticky-wrapper'
import React from 'react'
import Header from './(component)/header'
import UserProgress from './(component)/user-progress'



const LearnPage = () => {
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