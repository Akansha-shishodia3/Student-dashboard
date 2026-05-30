"use client"

import { motion } from "framer-motion"
import { Layers, TrendingUp, Trophy } from "lucide-react"
import type { Course } from "@/lib/types"

function StatCard({
  label,
  value,
  icon: Icon,
  delay,
}: {
  label: string
  value: string
  icon: typeof Layers
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tabular-nums text-card-foreground">{value}</p>
      </div>
    </motion.div>
  )
}

export function StatsOverview({ courses }: { courses: Course[] }) {
  const total = courses.length
  const completed = courses.filter((c) => c.progress >= 100).length
  const avg = total === 0 ? 0 : Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / total)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard label="Active courses" value={String(total)} icon={Layers} delay={0} />
      <StatCard label="Average progress" value={`${avg}%`} icon={TrendingUp} delay={0.08} />
      <StatCard label="Completed" value={String(completed)} icon={Trophy} delay={0.16} />
    </div>
  )
}
