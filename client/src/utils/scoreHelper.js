/**
 * Calculate how many stars (1–3) a student earned.
 * Based on percentage of correct answers.
 */
export function calculateStars(correct, total) {
  const percentage = (correct / total) * 100

  if (percentage === 100) return 3  // Perfect score
  if (percentage >= 70)  return 2  // Good score
  return 1                          // Passed minimum
}

/**
 * Calculate points earned for a level.
 */
export function calculateScore(correct, stars) {
  const BASE_POINTS_PER_CORRECT = 10
  const STAR_BONUS = [0, 0, 50, 150] // index = stars earned

  return (correct * BASE_POINTS_PER_CORRECT) + STAR_BONUS[stars]
}

/**
 * Check if the student passed the level.
 * Must get at least 60% correct to pass.
 */
export function hasPassed(correct, total) {
  return (correct / total) >= 0.6
}