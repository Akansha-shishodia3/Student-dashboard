// Shape of a single course row as it lives in Supabase.
// `icon_name` maps to a Lucide icon we render on the client.
export type Course = {
  id: string
  title: string
  progress: number
  icon_name: string
  created_at: string
}

// What the "add course" form sends back to the server.
export type NewCourse = {
  title: string
  progress: number
  icon_name: string
}
