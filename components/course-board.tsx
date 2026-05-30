"use client"

import { AnimatePresence } from "framer-motion"
import { BookOpen } from "lucide-react"
import { CourseCard } from "@/components/course-card"
import { AddCourseDialog } from "@/components/add-course-dialog"
import type { Course } from "@/lib/types"

export function CourseBoard({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary">
          <BookOpen className="h-6 w-6" />
        </span>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-card-foreground">No courses yet</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Add your first course to start tracking how your learning is going.
          </p>
        </div>
        <AddCourseDialog />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </AnimatePresence>
    </div>
  )
}
