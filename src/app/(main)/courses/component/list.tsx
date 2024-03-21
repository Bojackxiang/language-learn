'use client'

import React from 'react'
import { courses } from '../../../../../db/schema'
import { Card } from './card'

interface Props {
  courses: typeof courses.$inferSelect[]
  activeCourseId: number
}

const List = ({ courses, activeCourseId }: Props) => {

  const onCardClick = (courseId: number) => { }

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