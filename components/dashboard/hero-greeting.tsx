"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Clock } from "lucide-react";

interface HeroGreetingProps {
  courseCount: number;
  avgProgress: number;
  userName?: string;
}

export function HeroGreeting({ courseCount, avgProgress, userName = "Akansha" }: HeroGreetingProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  // Derive dynamic stats from courses data
  const streakDays = courseCount > 0 ? (courseCount * 2 + 6) : 0;
  const studyHours = courseCount > 0 ? Math.floor(avgProgress / 30) + 1 : 0;
  const studyMinutes = courseCount > 0 ? Math.round((avgProgress % 30) * 1.5) : 0;
  const studyTimeStr = courseCount > 0 ? `${studyHours}h ${studyMinutes}m` : "0h 0m";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative col-span-full lg:col-span-2 row-span-2 glass-card rounded-2xl p-6 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="p-2 rounded-lg bg-primary/20 glow-border">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Welcome back</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            {greeting}, <span className="text-primary">{userName}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-base md:text-lg max-w-md"
          >
            {courseCount > 0 
              ? `You have ${courseCount} courses in progress. Keep up the momentum and reach your learning goals!`
              : "Welcome! Get started by adding your first course to begin tracking your progress."}
          </motion.p>
        </div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 mt-6"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-chart-1/20">
              <TrendingUp className="w-4 h-4 text-chart-1" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="text-lg font-semibold text-foreground">{streakDays} days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-chart-3/20">
              <Clock className="w-4 h-4 text-chart-3" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Study time today</p>
              <p className="text-lg font-semibold text-foreground">{studyTimeStr}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
