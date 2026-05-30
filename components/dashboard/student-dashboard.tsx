"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { HeroGreeting } from "@/components/dashboard/hero-greeting";
import { ActivityGraph } from "@/components/dashboard/activity-graph";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { AchievementsBadge } from "@/components/dashboard/achievements-badge";
import { CourseBoard } from "@/components/course-board";
import { StatsOverview } from "@/components/stats-overview";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { BookOpen, GraduationCap, Clock, Award, Search, Bell, Menu } from "lucide-react";
import type { Course } from "@/lib/types";

interface StudentDashboardProps {
  /** Courses pre-fetched from Supabase on the server side. */
  initialCourses: Course[];
}


export function StudentDashboard({ initialCourses }: StudentDashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  // ── Derived stats from live Supabase data ──────────────────────────────
  const totalCourses = initialCourses.length;
  const completedCourses = initialCourses.filter((c) => c.progress >= 100).length;
  const avgProgress =
    totalCourses === 0
      ? 0
      : Math.round(
          initialCourses.reduce((sum, c) => sum + c.progress, 0) / totalCourses
        );

  // Calculate dynamic study hours based on progress (e.g. baseline 40h + progress hours)
  const totalProgressSum = initialCourses.reduce((sum, c) => sum + c.progress, 0);
  const studyHours = totalCourses > 0 ? 40 + Math.round(totalProgressSum * 1.2 / 100) : 0;

  // Calculate achievements unlocked dynamic count
  const achievementsCount =
    (totalCourses >= 1 ? 1 : 0) +
    (completedCourses >= 1 ? 1 : 0) +
    (avgProgress >= 80 && totalCourses >= 1 ? 1 : 0) +
    (completedCourses >= 3 ? 1 : 0);

  // ── Stats cards — derived dynamically ───────
  const stats = [
    {
      title: "Courses Enrolled",
      value: String(totalCourses),
      change: totalCourses > 0 ? `${completedCourses} completed` : "Add your first course",
      changeType: (totalCourses > 0 ? "positive" : "neutral") as "positive" | "neutral",
      icon: BookOpen,
      color: "primary" as const,
    },
    {
      title: "Certifications",
      value: String(completedCourses),
      change: completedCourses > 0 ? `${completedCourses} earned` : "Complete a course",
      changeType: (completedCourses > 0 ? "positive" : "neutral") as "positive" | "neutral",
      icon: GraduationCap,
      color: "chart-2" as const,
    },
    {
      title: "Study Hours",
      value: `${studyHours}h`,
      change: totalCourses > 0 ? `+2.5h this week` : "No hours recorded yet",
      changeType: (totalCourses > 0 ? "positive" : "neutral") as "positive" | "neutral",
      icon: Clock,
      color: "chart-3" as const,
    },
    {
      title: "Achievements",
      value: `${achievementsCount}`,
      change: `${achievementsCount}/4 unlocked`,
      changeType: (achievementsCount > 0 ? "positive" : "neutral") as "positive" | "neutral",
      icon: Award,
      color: "chart-4" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-secondary/50"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <span className="font-semibold text-foreground">EduPulse</span>
          <button className="p-2 rounded-lg hover:bg-secondary/50 relative" aria-label="Notifications">
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 z-50"
            >
              <Sidebar isCollapsed={false} onToggle={() => setMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
  animate={{
    marginLeft: isMobile ? 0 : sidebarCollapsed ? 80 : 260,
  }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
  className="min-h-screen pt-4 pb-8 px-4 lg:px-8 lg:pt-4 mt-16 lg:mt-0"
>
        <div className="lg:transition-[margin] lg:duration-300">
          {/* Top Bar */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses, lessons, instructors..."
                className="w-full lg:w-96 h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors" aria-label="Notifications" onClick={() => {
                alert(`This action triggered! (Integrating soon)`);
              }
            } >
              
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="flex flex-col gap-12">
            {/* Hero Greeting — passes live course count and avg progress */}
            <section id="dashboard">
            <HeroGreeting courseCount={totalCourses} avgProgress={avgProgress} />
            </section>

            {/* Stats Cards — all derived from live Supabase data */}
            <section id="state-card">
            {stats.map((stat, index) => (
              <StatsCard key={stat.title} {...stat} index={index} />
            ))}
            </section>

            {/* Activity Graph */}
            <section id="activity">
            <ActivityGraph />
            </section>

            {/* Quick Actions */}
            <section id="quick-action">
            <QuickActions onAddCourseClick={() => setAddCourseOpen(true)} />
            </section>  

            {/* Achievements */}
            <section id="achievement" >
            <AchievementsBadge 
              completedCourses={completedCourses} 
              avgProgress={avgProgress} 
              totalCourses={totalCourses} 
            />
            </section>


            {/* ── My Courses Header ───────────────────────── */}
            <section id="courses">
            <div className="col-span-full flex items-center justify-between mt-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">My Courses</h2>
                <p className="text-sm text-muted-foreground">
                  Track and manage your learning journey
                </p>
              </div>
              <AddCourseDialog open={addCourseOpen} onOpenChange={setAddCourseOpen} />
            </div>

            {/* Live summary stats */}
            <div className="col-span-full">
              <StatsOverview courses={initialCourses} />
            </div>

            {/* Course board with full CRUD */}
            <div className="col-span-full">
              <CourseBoard courses={initialCourses} />
            </div>
            </section>

            {/* Upcoming Tasks — uses real courses */}
            
            <div className="col-span-full lg:col-span-2">
            <section id="schedule" className="py-6">
              <UpcomingTasks courses={initialCourses} />
              </section>
            </div> 
           
          </div>
        </div>
      </motion.main>
    </div>
  );
}
