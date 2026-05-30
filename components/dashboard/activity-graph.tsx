"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", hours: 2.5, assignments: 3 },
  { day: "Tue", hours: 4, assignments: 5 },
  { day: "Wed", hours: 3, assignments: 2 },
  { day: "Thu", hours: 5, assignments: 7 },
  { day: "Fri", hours: 3.5, assignments: 4 },
  { day: "Sat", hours: 6, assignments: 6 },
  { day: "Sun", hours: 4.5, assignments: 5 },
];

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-border/50">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            {entry.dataKey === "hours" ? "Study Hours" : "Assignments"}:{" "}
            <span className="text-foreground font-medium">
              {entry.value}
              {entry.dataKey === "hours" ? "h" : ""}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function ActivityGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="col-span-full lg:col-span-2 glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
          <p className="text-sm text-muted-foreground">Your learning progress this week</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-xs text-muted-foreground">Study Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">Assignments</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.18 180)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="oklch(0.7 0.18 180)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAssignments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.16 280)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="oklch(0.65 0.16 280)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="oklch(0.7 0.18 180)"
              strokeWidth={2}
              fill="url(#colorHours)"
            />
            <Area
              type="monotone"
              dataKey="assignments"
              stroke="oklch(0.65 0.16 280)"
              strokeWidth={2}
              fill="url(#colorAssignments)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
