"use client";

import { motion } from "framer-motion";
import { Plus, Video, FileText, MessageSquare, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: Video,
    label: "Join Class",
    color: "primary",
    bgColor: "bg-primary/20",
    textColor: "text-primary",
  },
  {
    icon: FileText,
    label: "New Note",
    color: "chart-2",
    bgColor: "bg-chart-2/20",
    textColor: "text-chart-2",
  },
  {
    icon: MessageSquare,
    label: "Ask Tutor",
    color: "chart-3",
    bgColor: "bg-chart-3/20",
    textColor: "text-chart-3",
  },
  {
    icon: Plus,
    label: "Add Course",
    color: "chart-4",
    bgColor: "bg-chart-4/20",
    textColor: "text-chart-4",
  },
];

interface QuickActionsProps {
  onAddCourseClick?: () => void;
}

export function QuickActions({ onAddCourseClick }: QuickActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-primary/20">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (action.label === "Add Course") {
                onAddCourseClick?.();
              } else {
                alert(`${action.label} action triggered! (Integrating soon)`);
              }
            }}
            className={cn(
              "flex flex-col items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 group"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-xl transition-transform group-hover:scale-110",
                action.bgColor
              )}
            >
              <action.icon className={cn("w-5 h-5", action.textColor)} />
            </div>
            <span className="text-sm font-medium text-foreground">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
