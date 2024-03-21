'use client'

import React, { useTransition } from 'react'
import { courses, userProgress } from '../../../../db/schema'
import { Card } from './card'
import { useRouter } from 'next/navigation'
import { upsertUserProgress } from '@/actions/user-progress'


interface Props {
  courses: typeof courses.$inferSelect[]
  activeCourseId: typeof userProgress.$inferInsert.activeCourseId
}

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition()


  const onCardClick = (courseId: number) => {
    if (pending) {
      return;
    }

    if (courseId === activeCourseId) {
      router.push("/learn")
      return;
    }

    startTransition(() => {
      upsertUserProgress(courseId)
    })
  }

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => onCardClick(course?.id)}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}

export default List