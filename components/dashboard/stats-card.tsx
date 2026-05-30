"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  color: "primary" | "chart-2" | "chart-3" | "chart-4";
  index: number;
}

const colorVariants = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    iconBg: "bg-primary/20",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.7_0.18_180_/_0.3)]",
  },
  "chart-2": {
    bg: "bg-chart-2/10",
    text: "text-chart-2",
    iconBg: "bg-chart-2/20",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.65_0.16_280_/_0.3)]",
  },
  "chart-3": {
    bg: "bg-chart-3/10",
    text: "text-chart-3",
    iconBg: "bg-chart-3/20",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.75_0.15_140_/_0.3)]",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    text: "text-chart-4",
    iconBg: "bg-chart-4/20",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.7_0.2_320_/_0.3)]",
  },
};

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  index,
}: StatsCardProps) {
  const variant = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileHover={{ y: -2 }}
      className={cn(
        "glass-card rounded-2xl p-5 cursor-pointer group transition-shadow duration-300",
        variant.glow
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", variant.iconBg)}>
          <Icon className={cn("w-5 h-5", variant.text)} />
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            changeType === "positive" && "bg-chart-3/20 text-chart-3",
            changeType === "negative" && "bg-destructive/20 text-destructive",
            changeType === "neutral" && "bg-secondary text-muted-foreground"
          )}
        >
          {change}
        </span>
      </div>

      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + 0.1 * index }}
          className="text-2xl font-bold text-foreground mb-1"
        >
          {value}
        </motion.p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      {/* Subtle glow effect */}
      
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10",
          variant.bg
        )}
      />
      
    </motion.div>
  );
}
