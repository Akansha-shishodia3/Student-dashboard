"use client";

import { motion } from "framer-motion";
import { Clock, Users, Play, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  students: number;
  category: string;
  color: "primary" | "chart-2" | "chart-3" | "chart-4";
  index: number;
}

const colorVariants = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    glow: "shadow-[0_0_20px_oklch(0.7_0.18_180_/_0.2)]",
    progress: "bg-primary",
  },
  "chart-2": {
    bg: "bg-chart-2/10",
    border: "border-chart-2/30",
    text: "text-chart-2",
    glow: "shadow-[0_0_20px_oklch(0.65_0.16_280_/_0.2)]",
    progress: "bg-chart-2",
  },
  "chart-3": {
    bg: "bg-chart-3/10",
    border: "border-chart-3/30",
    text: "text-chart-3",
    glow: "shadow-[0_0_20px_oklch(0.75_0.15_140_/_0.2)]",
    progress: "bg-chart-3",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    border: "border-chart-4/30",
    text: "text-chart-4",
    glow: "shadow-[0_0_20px_oklch(0.7_0.2_320_/_0.2)]",
    progress: "bg-chart-4",
  },
};

export function CourseCard({
  title,
  instructor,
  progress,
  totalLessons,
  completedLessons,
  duration,
  students,
  category,
  color,
  index,
}: CourseCardProps) {
  const variant = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card rounded-2xl p-5 cursor-pointer group transition-shadow duration-300",
        "hover:" + variant.glow
      )}
    >
      {/* Category Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          variant.bg,
          variant.text
        )}>
          {category}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "p-2 rounded-full transition-colors",
            variant.bg,
            "group-hover:" + variant.glow
          )}
        >
          <Play className={cn("w-4 h-4", variant.text)} />
        </motion.button>
      </div>

      {/* Course Info */}
      <h4 className="text-foreground font-semibold text-lg mb-1 line-clamp-2">
        {title}
      </h4>
      <p className="text-muted-foreground text-sm mb-4">{instructor}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            {completedLessons}/{totalLessons} lessons
          </span>
          <span className={cn("text-xs font-medium", variant.text)}>
            {progress}%
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.2 * index }}
            className={cn("h-full rounded-full", variant.progress)}
          />
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{students.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{totalLessons} lessons</span>
        </div>
      </div>
    </motion.div>
  );
}
