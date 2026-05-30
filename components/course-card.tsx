"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getCourseIcon } from "@/lib/course-icons"
import { deleteCourse, updateProgress } from "@/app/actions"
import type { Course } from "@/lib/types"
import { cn } from "@/lib/utils"

export function CourseCard({ course }: { course: Course }) {
  const Icon = getCourseIcon(course.icon_name)
  const [isPending, startTransition] = useTransition()

  // Track progress locally so the bar feels instant, then sync to the server.
  const [progress, setProgress] = useState(course.progress)
  const isComplete = progress >= 100

  function nudge(amount: number) {
    const next = Math.min(100, Math.max(0, progress + amount))
    if (next === progress) return
    setProgress(next)
    startTransition(async () => {
      await updateProgress(course.id, next)
    })
  }

  function remove() {
    startTransition(async () => {
      await deleteCourse(course.id)
    })
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary text-primary transition-colors",
              isComplete && "bg-primary/15",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold leading-tight text-card-foreground">{course.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {isComplete ? "Completed" : "In progress"}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={remove}
          disabled={isPending}
          aria-label={`Delete ${course.title}`}
          className="h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="flex items-center gap-1 font-medium tabular-nums text-card-foreground">
            {isComplete && <CheckCircle2 className="h-4 w-4 text-primary" />}
            {progress}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => nudge(-10)}
          disabled={isPending || progress === 0}
          className="flex-1"
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">10%</span>
        </Button>
        <Button
          size="sm"
          onClick={() => nudge(10)}
          disabled={isPending || progress === 100}
          className="flex-1"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">10%</span>
        </Button>
      </div>
    </motion.article>
  )
}
