export const TAG_COLORS: Record<string, string> = {
  'Announcement':  'bg-red-500/15 text-red-300 border-red-400/40',
  'Deep Dive':     'bg-blue-500/15 text-blue-300 border-blue-400/40',
  'Partnership':   'bg-purple-500/15 text-purple-300 border-purple-400/40',
  'Release Notes': 'bg-yellow-500/15 text-yellow-300 border-yellow-400/40',
}

export const TAG_COLOR_DEFAULT = 'bg-white/10 text-gray-300 border-white/20'

export function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? TAG_COLOR_DEFAULT
}
