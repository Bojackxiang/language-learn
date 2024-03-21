import React from 'react'
import { courses } from '../../../../db/query'
import List from './component/list'


interface Props {

}

const CoursesPage = async ({ }: Props) => {
  const courseData = await courses()
  return (
    <div className="w-full">
      <h1></h1>
      <List
        courses={courseData}
        activeCourseId={1} />
    </div>

  )
}

export default CoursesPage