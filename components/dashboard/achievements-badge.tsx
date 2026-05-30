"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Target, Award } from "lucide-react";

interface AchievementsBadgeProps {
  completedCourses: number;
  avgProgress: number;
  totalCourses: number;
}

export function AchievementsBadge({ completedCourses, avgProgress, totalCourses }: AchievementsBadgeProps) {
  const achievements = [
    { icon: Trophy, label: "First Course", unlocked: totalCourses >= 1 },
    { icon: Star, label: "Course Finisher", unlocked: completedCourses >= 1 },
    { icon: Target, label: "High Achiever", unlocked: avgProgress >= 80 && totalCourses >= 1 },
    { icon: Award, label: "Elite Scholar", unlocked: completedCourses >= 3 },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-chart-5/20">
            <Trophy className="w-5 h-5 text-chart-5" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
        </div>
        <span className="text-sm text-muted-foreground">{unlockedCount}/4</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${
              achievement.unlocked
                ? "bg-chart-5/10 border border-chart-5/30"
                : "bg-secondary/30 opacity-50"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                achievement.unlocked ? "bg-chart-5/20" : "bg-secondary"
              }`}
            >
              <achievement.icon
                className={`w-5 h-5 ${
                  achievement.unlocked ? "text-chart-5" : "text-muted-foreground"
                }`}
              />
            </div>
            <span className="text-xs text-center text-muted-foreground">
              {achievement.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
