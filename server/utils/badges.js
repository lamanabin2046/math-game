// ── All badge definitions ──
export const BADGES = {
  FIRST_STEPS: {
    id:          'FIRST_STEPS',
    name:        'First Steps',
    emoji:       '🌟',
    description: 'Completed your first level',
  },
  PERFECT_SCORE: {
    id:          'PERFECT_SCORE',
    name:        'Perfect Score',
    emoji:       '⭐',
    description: 'Got 100% on a level',
  },
  ON_FIRE: {
    id:          'ON_FIRE',
    name:        'On Fire',
    emoji:       '🔥',
    description: '3 day login streak',
  },
  DEDICATED: {
    id:          'DEDICATED',
    name:        'Dedicated',
    emoji:       '💎',
    description: '7 day login streak',
  },
  SPEED_DEMON: {
    id:          'SPEED_DEMON',
    name:        'Speed Demon',
    emoji:       '⚡',
    description: 'Finished a test level with 10+ seconds to spare',
  },
  GRADE6_MASTER: {
    id:          'GRADE6_MASTER',
    name:        'Grade 6 Master',
    emoji:       '🏅',
    description: 'Completed all Grade 6 levels',
  },
  GRADE7_MASTER: {
    id:          'GRADE7_MASTER',
    name:        'Grade 7 Master',
    emoji:       '🏅',
    description: 'Completed all Grade 7 levels',
  },
  GRADE8_MASTER: {
    id:          'GRADE8_MASTER',
    name:        'Grade 8 Master',
    emoji:       '🏅',
    description: 'Completed all Grade 8 levels',
  },
  GRADE9_MASTER: {
    id:          'GRADE9_MASTER',
    name:        'Grade 9 Master',
    emoji:       '🏅',
    description: 'Completed all Grade 9 levels',
  },
  GRADE10_MASTER: {
    id:          'GRADE10_MASTER',
    name:        'Grade 10 Master',
    emoji:       '🏅',
    description: 'Completed all Grade 10 levels',
  },
  MATH_CHAMPION: {
    id:          'MATH_CHAMPION',
    name:        'Math Champion',
    emoji:       '🏆',
    description: 'Completed ALL levels',
  },
}

// ── Award a badge if student doesn't already have it ──
export function awardBadge(student, badgeId) {
  const badge = BADGES[badgeId]
  if (!badge) return false
  const already = student.badges.some(b => b.id === badgeId)
  if (already) return false
  student.badges.push({ ...badge, earnedAt: new Date() })
  return true // new badge awarded
}
