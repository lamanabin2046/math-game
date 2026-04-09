import Level from '../models/Level.js'

// ── GET /api/levels ──
// Returns all levels
export async function getAllLevels(req, res) {
  try {
    const levels = await Level.find().sort({ levelNumber: 1 })
    res.json(levels)
  } catch (error) {
    console.error('Get levels error:', error)
    res.status(500).json({ message: 'Could not fetch levels.' })
  }
}

// ── GET /api/levels/:id ──
// Returns a single level
export async function getLevelById(req, res) {
  try {
    const level = await Level.findById(req.params.id)

    if (!level) {
      return res.status(404).json({ message: 'Level not found.' })
    }

    res.json(level)
  } catch (error) {
    console.error('Get level error:', error)
    res.status(500).json({ message: 'Could not fetch level.' })
  }
}