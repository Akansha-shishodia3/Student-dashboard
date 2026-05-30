"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import type { Course } from "@/lib/types"

// Pull every course back, newest first. Used by the dashboard on load.
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.log("[v0] getCourses failed:", error.message)
    return []
  }

  return data ?? []
}

// Add a brand new course to the board.
export async function addCourse(input: {
  title: string
  progress: number
  icon_name: string
}) {
  const supabase = await createClient()

  // Keep things sane regardless of what the form hands us.
  const title = input.title.trim()
  const progress = Math.min(100, Math.max(0, Math.round(input.progress)))

  if (!title) {
    return { error: "Please give the course a title." }
  }

  const { error } = await supabase.from("courses").insert({
    title,
    progress,
    icon_name: input.icon_name || "book-open",
  })

  if (error) {
    console.log("[v0] addCourse failed:", error.message)
    return { error: "Something went wrong while saving the course." }
  }

  revalidatePath("/")
  return { error: null }
}

// Bump a course's progress (used by the quick +/- controls on each card).
export async function updateProgress(id: string, progress: number) {
  const supabase = await createClient()
  const clamped = Math.min(100, Math.max(0, Math.round(progress)))

  const { error } = await supabase
    .from("courses")
    .update({ progress: clamped })
    .eq("id", id)

  if (error) {
    console.log("[v0] updateProgress failed:", error.message)
    return { error: "Could not update progress." }
  }

  revalidatePath("/")
  return { error: null }
}

// Remove a course from the board for good.
export async function deleteCourse(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("courses").delete().eq("id", id)

  if (error) {
    console.log("[v0] deleteCourse failed:", error.message)
    return { error: "Could not delete the course." }
  }

  revalidatePath("/")
  return { error: null }
}
