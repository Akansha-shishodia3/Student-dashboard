import { GraduationCap } from "lucide-react"
import { AddCourseDialog } from "@/components/add-course-dialog"

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-xl font-semibold leading-tight text-foreground">Your learning, in orbit</h1>
        </div>
      </div>
      <AddCourseDialog />
    </header>
  )
}
