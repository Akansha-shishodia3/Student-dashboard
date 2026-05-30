"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ICON_OPTIONS, getCourseIcon } from "@/lib/course-icons"
import { addCourse } from "@/app/actions"
import { cn } from "@/lib/utils"

interface AddCourseDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AddCourseDialog({ open: controlledOpen, onOpenChange: controlledOnOpenChange }: AddCourseDialogProps = {}) {
  const [localOpen, setLocalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : localOpen
  const setOpen = controlledOnOpenChange !== undefined ? controlledOnOpenChange : setLocalOpen

  const [title, setTitle] = useState("")
  const [progress, setProgress] = useState(0)
  const [iconName, setIconName] = useState(ICON_OPTIONS[0])
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function reset() {
    setTitle("")
    setProgress(0)
    setIconName(ICON_OPTIONS[0])
    setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await addCourse({ title, progress, icon_name: iconName })
      if (result?.error) {
        setError(result.error)
        return
      }
      reset()
      setOpen(false)
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Add course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new course</DialogTitle>
          <DialogDescription>Drop in something you&apos;re learning and set where you are with it.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Course title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Designing with Motion"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <Label>Icon</Label>
            <div className="grid grid-cols-5 gap-2">
              {ICON_OPTIONS.map((name) => {
                const Icon = getCourseIcon(name)
                const active = name === iconName
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setIconName(name)}
                    aria-label={`Use ${name} icon`}
                    aria-pressed={active}
                    className={cn(
                      "grid aspect-square place-items-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground",
                      active && "border-primary bg-primary/15 text-primary",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="progress">Starting progress</Label>
              <span className="text-sm font-medium tabular-nums text-foreground">{progress}%</span>
            </div>
            <Slider
              id="progress"
              value={[progress]}
              onValueChange={(v) => setProgress(v[0])}
              min={0}
              max={100}
              step={5}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? "Saving..." : "Add course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
