import jwt from 'jsonwebtoken'

// ── protect ──────────────────────────────────────────────────
// Checks JWT, attaches req.studentId and req.role to every request.
function protect(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized. No token provided.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.studentId = decoded.id       // always set
    req.role      = decoded.role ?? 'student'   // ← role now available in every route

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized. Token is invalid.' })
  }
}

// ── adminOnly ─────────────────────────────────────────────────
// Use after protect to restrict a route to admins only.
// Example: router.get('/admin/stats', protect, adminOnly, handler)
function adminOnly(req, res, next) {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only.' })
  }
  next()
}

export { protect, adminOnly }
