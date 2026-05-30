import {
  Atom,
  Server,
  Braces,
  WandSparkles,
  BookOpen,
  Code2,
  Database,
  Palette,
  Brain,
  Globe,
  type LucideIcon,
} from "lucide-react"

// Every icon a course can use. The keys are stored in the DB as `icon_name`.
export const COURSE_ICONS: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  atom: Atom,
  server: Server,
  braces: Braces,
  "wand-sparkles": WandSparkles,
  code: Code2,
  database: Database,
  palette: Palette,
  brain: Brain,
  globe: Globe,
}

// The subset we surface in the "add course" picker.
export const ICON_OPTIONS = Object.keys(COURSE_ICONS)

// Safe lookup so an unknown name never crashes a card.
export function getCourseIcon(name: string): LucideIcon {
  return COURSE_ICONS[name] ?? BookOpen
}
