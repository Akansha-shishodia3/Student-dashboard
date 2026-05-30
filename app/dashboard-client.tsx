"use client";

// next/dynamic with ssr:false MUST live inside a Client Component.
// This wrapper is intentionally minimal — it only owns the dynamic import.
// Data is fetched on the server (page.tsx) and passed in as props.
import dynamic from "next/dynamic";
import type { Course } from "@/lib/types";

const StudentDashboard = dynamic(
  () =>
    import("@/components/dashboard/student-dashboard").then(
      (m) => m.StudentDashboard
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard…</p>
        </div>
      </div>
    ),
  }
);

export function DashboardClient({ initialCourses }: { initialCourses: Course[] }) {
  return <StudentDashboard initialCourses={initialCourses} />;
}
