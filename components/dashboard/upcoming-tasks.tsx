"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/types";

interface UpcomingTasksProps {
  courses: Course[];
}

const priorityColors = {
  high: "bg-destructive/20 text-destructive border-destructive/30",
  medium: "bg-chart-5/20 text-chart-5 border-chart-5/30",
  low: "bg-chart-3/20 text-chart-3 border-chart-3/30",
};

export function UpcomingTasks({ courses }: UpcomingTasksProps) {
  // Generate dynamic tasks based on courses
  let derivedTasks: any[] = [];
  if (!courses || courses.length === 0) {
    derivedTasks = [
      {
        id: "welcome-1",
        title: "Add your first course to begin learning",
        course: "EduPulse Tutorial",
        dueDate: "Immediate",
        priority: "high",
        completed: false,
      },
    ];
  } else {
    // Create some realistic tasks based on the user's courses
    courses.forEach((course, idx) => {
      if (course.progress < 100) {
        // Task 1: Lecture/Study
        derivedTasks.push({
          id: `lecture-${course.id}`,
          title: course.progress === 0 
            ? `Start introductory lesson`
            : `Watch next video lecture`,
          course: course.title,
          dueDate: idx === 0 ? "Today, 11:59 PM" : idx === 1 ? "Tomorrow, 6:00 PM" : "In 3 days",
          priority: course.progress < 40 ? "high" : "medium",
          completed: false,
        });
        
        // Task 2: Quiz/Review
        if (course.progress > 0 && course.progress < 90) {
          derivedTasks.push({
            id: `quiz-${course.id}`,
            title: `Complete practice exercise`,
            course: course.title,
            dueDate: idx === 0 ? "Tomorrow, 4:00 PM" : "In 4 days",
            priority: "low",
            completed: false,
          });
        }
      } else {
        // Completed Course Tasks
        derivedTasks.push({
          id: `complete-${course.id}`,
          title: `Download course certificate`,
          course: course.title,
          dueDate: "Completed",
          priority: "low",
          completed: true,
        });
      }
    });
  }

  // Limit to maximum 4 tasks to keep it looking clean and aligned with original design, sort incomplete first
  const sortedTasks = [...derivedTasks]
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
    .slice(0, 4);

  const pendingCount = sortedTasks.filter(t => !t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-chart-5/20">
            <Calendar className="w-5 h-5 text-chart-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upcoming Tasks</h3>
            <p className="text-sm text-muted-foreground">{pendingCount} task{pendingCount !== 1 && "s"} pending</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 4 }}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group",
              task.completed && "opacity-60"
            )}
          >
            <button className="mt-0.5 shrink-0" aria-label={task.completed ? "Task completed" : "Mark task completed"}>
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-chart-3" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-medium text-foreground mb-1",
                  task.completed && "line-through"
                )}
              >
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground mb-2">{task.course}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{task.dueDate}</span>
                </div>
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full border",
                    priorityColors[task.priority as keyof typeof priorityColors]
                  )}
                >
                  {task.priority}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
