"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: Home, label: "Dashboard", href: "#dashboard", active: true },
  { icon: BookOpen, label: "Courses", href: "#courses" },
  { icon: Calendar, label: "Schedule", href: "#schedule" },
  { icon: BarChart3, label: "Analytics", href: "#activity" },
  { icon: MessageSquare, label: "Achievements", href: "#achievement" },
  // { icon: Bell, label: "Notifications", href: "#", badge: 5 },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "#" },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen glass-card border-r border-border/50 flex flex-col"
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/30">
        <motion.div
          initial={false}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-border">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-md -z-10" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-semibold text-lg text-foreground"
              >
                EduPulse
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
            if (item.label === "Notifications") {
                alert(`Notifications action triggered! (Integrating soon)`);
              }
            }}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              item.active
                ? "bg-primary/15 text-primary glow-border"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0",
              item.active && "drop-shadow-[0_0_8px_var(--primary)]"
            )} />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {/* {item.badge && !isCollapsed && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => {
          
                  alert(`Notifications action triggered! (Integrating soon)`);
                
              }}
                className="ml-auto px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full"
              >
                {item.badge}
              </motion.span>
            )}
            {item.badge && isCollapsed && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            )} */}
          </motion.a>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-border/30">
        {/* {bottomItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
          
                alert(`Settings action triggered! (Integrating soon)`);
              
            }}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all duration-200"
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        ))} */}

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
              AK
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">Akansha</p>
                <p className="text-xs text-muted-foreground truncate">Computer Science</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.aside>
  );
}
