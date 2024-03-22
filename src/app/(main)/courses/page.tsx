import React, { useTransition } from 'react'
import List from './list'
import { getCourses, getUserProgress } from '../../../../db/query'


interface Props {

}

const CoursesPage = async ({ }: Props) => {
  const courseData = await getCourses()
  const userProgressData = await getUserProgress()

  return (
    <div className="w-full">
      <List
        courses={courseData}
        activeCourseId={userProgressData?.activeCourseId} />
    </div>

  )
}

export default CoursesPage