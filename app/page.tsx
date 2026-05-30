import { getCourses } from "@/app/actions";
import { DashboardClient } from "@/app/dashboard-client";

// Server Component: fetches data from Supabase, then passes it to
// DashboardClient which holds the dynamic(..., { ssr: false }) import.
export default async function Page() {
  const initialCourses = await getCourses();
  return <DashboardClient initialCourses={initialCourses} />;
}

