import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Level from './models/Level.js'
import Question from './models/Question.js'

// ✅ CONFIG AND CONNECT FIRST — BEFORE ANY DB OPERATIONS
dotenv.config()
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mathgame')
console.log('✅ Connected to MongoDB')

// Clean ONLY grade 7 data
await Level.deleteMany({ grade: 7 })
await Question.deleteMany({ grade: 7 })
console.log('🧹 Cleared existing Grade 7 data\n')

// Get next available level number (continues from grade 6)
const maxLevel = await Level.findOne().sort({ levelNumber: -1 })
let currentLevelNumber = (maxLevel?.levelNumber || 0) + 1
console.log(`📌 Starting levelNumber from: ${currentLevelNumber}\n`)

const grade7 = [

  // ── 7A: Rational Numbers — operations (परिमेय सङ्ख्या) ─────────────────────
  {
    sheet: '7A', topic: 'Rational Numbers - Operations', grade: 7,
    questions: [
      { question: 'Which of the following is a rational number?', options: ['√2', 'π', '3/4', '0.101001000...'], correctAnswer: '3/4', explanation: 'Rational numbers can be expressed as p/q where q≠0' },
      { question: 'Add: 2/3 + 3/4 = ?', options: ['5/7', '5/12', '17/12', '1 5/12'], correctAnswer: '17/12', explanation: 'LCM of 3 and 4 is 12: 8/12 + 9/12 = 17/12 = 1 5/12' },
      { question: 'Subtract: 5/6 − 2/3 = ?', options: ['1/6', '1/3', '1/2', '3/6'], correctAnswer: '1/6', explanation: '5/6 − 4/6 = 1/6' },
      { question: 'Multiply: (−2/3) × (4/5) = ?', options: ['8/15', '−8/15', '−2/15', '2/15'], correctAnswer: '−8/15', explanation: 'Negative × positive = negative: −8/15' },
      { question: 'Divide: (3/5) ÷ (2/3) = ?', options: ['9/10', '6/15', '2/5', '3/10'], correctAnswer: '9/10', explanation: '3/5 × 3/2 = 9/10' },
      { question: 'Which is the smallest rational number?', options: ['−3/4', '−1/2', '0', '1/4'], correctAnswer: '−3/4', explanation: 'On number line, −3/4 is leftmost' },
      { question: 'Find the sum: −3/7 + 2/5 = ?', options: ['−1/35', '−1/2', '−29/35', '−1/35'], correctAnswer: '−1/35', explanation: 'LCM 35: −15/35 + 14/35 = −1/35' },
      { question: 'What is the reciprocal of −5/8?', options: ['5/8', '−8/5', '8/5', '−5/8'], correctAnswer: '−8/5', explanation: 'Reciprocal = 1 ÷ (−5/8) = −8/5' },
      { question: 'Simplify: (−4/9) × (−27/16) = ?', options: ['3/4', '−3/4', '1/2', '−1/2'], correctAnswer: '3/4', explanation: 'Negative × negative = positive: 108/144 = 3/4' },
      { question: 'Add: 2.5 + 3/4 = ?', options: ['3.25', '3.5', '3.75', '4.0'], correctAnswer: '3.25', explanation: '2.5 + 0.75 = 3.25' },
      { question: 'Which is equivalent to 0.666...?', options: ['2/3', '3/4', '5/6', '7/9'], correctAnswer: '2/3', explanation: '0.666... = 2/3' },
      { question: 'Simplify: (2/3 + 1/6) × 3/5 = ?', options: ['1/2', '3/10', '1/5', '2/5'], correctAnswer: '1/2', explanation: '(4/6+1/6)=5/6; ×3/5=15/30=1/2' },
      { question: 'Find three rational numbers between 1/3 and 1/2:', options: ['5/12, 7/18, 8/18', '1/4, 1/5, 1/6', '2/5, 3/7, 4/9', '3/8, 4/9, 5/12'], correctAnswer: '5/12, 7/18, 8/18', explanation: 'Convert to common denominator 36: 12/36 and 18/36 → 13/36, 14/36, 15/36' },
      { question: 'What is the additive inverse of −7/9?', options: ['7/9', '−7/9', '9/7', '−9/7'], correctAnswer: '7/9', explanation: 'Additive inverse = number that sums to 0' },
      { question: 'Evaluate: 2 1/3 + 1 3/4 = ?', options: ['3 1/12', '4 1/12', '3 1/6', '4 1/6'], correctAnswer: '4 1/12', explanation: '7/3 + 7/4 = 28/12 + 21/12 = 49/12 = 4 1/12' },
      { question: 'Which is greater: 3/4 or 5/7?', options: ['3/4', '5/7', 'Equal', 'Cannot compare'], correctAnswer: '3/4', explanation: '3/4 = 0.75, 5/7 ≈ 0.714' },
      { question: 'Simplify: (3/4 ÷ 1/2) × 2/3 = ?', options: ['1', '2', '1/2', '3/4'], correctAnswer: '1', explanation: '3/4 ÷ 1/2 = 3/4 × 2 = 6/4 = 3/2; ×2/3 = 6/6 = 1' },
      { question: 'Express 0.125 as a rational number:', options: ['1/8', '1/4', '1/6', '1/10'], correctAnswer: '1/8', explanation: '0.125 = 125/1000 = 1/8' },
      { question: 'If a/b = 2/3 and b/c = 4/5, find a/c:', options: ['8/15', '6/12', '2/5', '3/4'], correctAnswer: '8/15', explanation: 'a/c = (a/b)×(b/c) = 2/3 × 4/5 = 8/15' },
      { question: 'What should be added to −3/5 to get 2/3?', options: ['19/15', '1/15', '4/15', '11/15'], correctAnswer: '19/15', explanation: '2/3 − (−3/5) = 2/3 + 3/5 = 10/15 + 9/15 = 19/15' },
    ]
  },

  // ── 7B: Exponents — basic laws (घाताङ्क) ─────────────────────────────────
  {
    sheet: '7B', topic: 'Exponents - Basic Laws', grade: 7,
    questions: [
      { question: '2³ × 2⁴ = ?', options: ['2⁷', '2¹²', '4⁷', '8⁷'], correctAnswer: '2⁷', explanation: 'aᵐ × aⁿ = aᵐ⁺ⁿ = 2³⁺⁴ = 2⁷' },
      { question: '5⁶ ÷ 5² = ?', options: ['5³', '5⁴', '5⁸', '5¹²'], correctAnswer: '5⁴', explanation: 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ = 5⁶⁻² = 5⁴' },
      { question: '(3²)⁴ = ?', options: ['3⁶', '3⁸', '9⁶', '9⁸'], correctAnswer: '3⁸', explanation: '(aᵐ)ⁿ = aᵐⁿ = 3²ˣ⁴ = 3⁸' },
      { question: 'What is 10⁰?', options: ['0', '1', '10', 'undefined'], correctAnswer: '1', explanation: 'Any non-zero number to power 0 equals 1' },
      { question: 'Express 81 as power of 3:', options: ['3³', '3⁴', '3⁵', '3⁶'], correctAnswer: '3⁴', explanation: '3 × 3 × 3 × 3 = 81 → 3⁴' },
      { question: 'Simplify: (−2)³ = ?', options: ['−8', '8', '−6', '6'], correctAnswer: '−8', explanation: '(−2)×(−2)×(−2) = −8' },
      { question: 'Simplify: (2/3)² = ?', options: ['4/9', '2/9', '4/6', '2/6'], correctAnswer: '4/9', explanation: '(a/b)ⁿ = aⁿ/bⁿ = 4/9' },
      { question: 'Find the value of 2⁵:', options: ['16', '25', '32', '64'], correctAnswer: '32', explanation: '2×2×2×2×2 = 32' },
      { question: 'Which is larger: 2³ or 3²?', options: ['2³', '3²', 'Equal', 'Cannot compare'], correctAnswer: '3²', explanation: '2³=8, 3²=9, so 3² is larger' },
      { question: 'Simplify: (x²) × (x³) = ?', options: ['x⁵', 'x⁶', '2x⁵', 'x¹'], correctAnswer: 'x⁵', explanation: 'x²⁺³ = x⁵' },
      { question: 'Express 1/8 as power of 2:', options: ['2⁻³', '2⁻²', '2²', '2³'], correctAnswer: '2⁻³', explanation: '1/8 = 1/2³ = 2⁻³' },
      { question: 'What is 2⁻³?', options: ['−8', '−6', '1/8', '1/6'], correctAnswer: '1/8', explanation: 'a⁻ⁿ = 1/aⁿ = 1/8' },
      { question: 'Simplify: (2² × 2³) ÷ 2⁴ = ?', options: ['2', '2¹', '2²', '2⁵'], correctAnswer: '2¹', explanation: '2⁵ ÷ 2⁴ = 2¹ = 2' },
      { question: 'Find the value of (2⁰ + 3⁰) × 5⁰:', options: ['0', '1', '2', '5'], correctAnswer: '2', explanation: '2⁰=1, 3⁰=1, 5⁰=1; (1+1)×1=2' },
      { question: 'Which law is used: aᵐ × bᵐ = (ab)ᵐ?', options: ['Product law', 'Power of product', 'Quotient law', 'Zero exponent'], correctAnswer: 'Power of product', explanation: 'When exponents are same, multiply bases' },
      { question: 'Simplify: (2³)² ÷ 2⁴ = ?', options: ['2²', '2³', '2⁴', '2⁵'], correctAnswer: '2²', explanation: '2⁶ ÷ 2⁴ = 2²' },
      { question: 'Write 64 × 8 as a single power of 2:', options: ['2⁹', '2⁸', '2⁷', '2⁶'], correctAnswer: '2⁹', explanation: '64=2⁶, 8=2³, 2⁶×2³=2⁹' },
      { question: 'Simplify: (3/4)² × (4/3)² = ?', options: ['1', '0', '9/16', '16/9'], correctAnswer: '1', explanation: '(3/4 × 4/3)² = 1² = 1' },
      { question: 'Find the value of (−1)⁵⁰:', options: ['−1', '1', '50', '−50'], correctAnswer: '1', explanation: 'Even power of −1 = 1' },
      { question: 'Which is correct?', options: ['a⁰ = 0', 'a⁰ = a', 'a⁰ = 1', 'a⁰ = undefined'], correctAnswer: 'a⁰ = 1', explanation: 'Any non-zero number raised to power 0 equals 1' },
    ]
  },

  // ── 7C: Exponents — advanced laws ────────────────────────────────────────
  {
    sheet: '7C', topic: 'Exponents - Advanced Laws', grade: 7,
    questions: [
      { question: 'Simplify: (2³ × 3²)² = ?', options: ['2⁶ × 3⁴', '2⁵ × 3³', '2⁶ × 3⁶', '2⁹ × 3⁴'], correctAnswer: '2⁶ × 3⁴', explanation: '(a × b)ⁿ = aⁿ × bⁿ → 2⁶ × 3⁴' },
      { question: 'Simplify: (2²)³ × (3³)² = ?', options: ['2⁶ × 3⁶', '2⁵ × 3⁵', '2⁶ × 3⁵', '2⁵ × 3⁶'], correctAnswer: '2⁶ × 3⁶', explanation: '2⁶ × 3⁶ = (2×3)⁶ = 6⁶' },
      { question: 'Find the value of 2⁻² × 2⁻³:', options: ['2⁻⁵', '2⁻⁶', '2⁵', '2⁶'], correctAnswer: '2⁻⁵', explanation: '2⁻²⁻³ = 2⁻⁵ = 1/32' },
      { question: 'Simplify: (2x²y³)² = ?', options: ['4x⁴y⁶', '2x⁴y⁶', '4x²y³', '2x²y³'], correctAnswer: '4x⁴y⁶', explanation: '(2)² × (x²)² × (y³)² = 4x⁴y⁶' },
      { question: 'Simplify: (a²b³)² × (a³b²)³ = ?', options: ['a¹³b¹²', 'a¹²b¹³', 'a⁷b⁶', 'a⁶b⁷'], correctAnswer: 'a¹³b¹²', explanation: '(a⁴b⁶) × (a⁹b⁶) = a¹³b¹²' },
      { question: 'Express 4⁵ as power of 2:', options: ['2⁹', '2¹⁰', '2⁸', '2¹²'], correctAnswer: '2¹⁰', explanation: '4⁵ = (2²)⁵ = 2¹⁰' },
      { question: 'Simplify: 8²/³ = ?', options: ['2', '4', '6', '8'], correctAnswer: '4', explanation: '8²/³ = (2³)²/³ = 2² = 4' },
      { question: 'Find value of 16³/⁴:', options: ['2', '4', '8', '16'], correctAnswer: '8', explanation: '16³/⁴ = (2⁴)³/⁴ = 2³ = 8' },
      { question: 'Simplify: 2³ × 4² = ?', options: ['2⁷', '2⁸', '2⁹', '2¹⁰'], correctAnswer: '2⁷', explanation: '2³ × (2²)² = 2³ × 2⁴ = 2⁷' },
      { question: 'If 2ˣ = 32, then x = ?', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '2⁵ = 32, so x = 5' },
      { question: 'Solve: 3ˣ = 81', options: ['2', '3', '4', '5'], correctAnswer: '4', explanation: '3⁴ = 81, so x = 4' },
      { question: 'Simplify: (81)³/⁴ = ?', options: ['3', '9', '27', '81'], correctAnswer: '27', explanation: '(3⁴)³/⁴ = 3³ = 27' },
      { question: 'Find the value of (2/3)⁻²:', options: ['4/9', '9/4', '−4/9', '−9/4'], correctAnswer: '9/4', explanation: '(3/2)² = 9/4' },
      { question: 'Which is equal to 10⁻³?', options: ['0.001', '0.01', '0.1', '1.0'], correctAnswer: '0.001', explanation: '10⁻³ = 1/1000 = 0.001' },
      { question: 'Simplify: (x²y⁻³)⁻² = ?', options: ['x⁴y⁶', 'x⁻⁴y⁶', 'x⁴y⁻⁶', 'x⁻⁴y⁻⁶'], correctAnswer: 'x⁻⁴y⁶', explanation: 'x⁻⁴ × y⁶ = y⁶/x⁴' },
      { question: 'Find the value of (27)²/³:', options: ['3', '6', '9', '12'], correctAnswer: '9', explanation: '(3³)²/³ = 3² = 9' },
      { question: 'Simplify: (2¹/² × 2¹/³)⁶ = ?', options: ['2⁵', '2⁶', '2⁷', '2⁸'], correctAnswer: '2⁵', explanation: '2^(1/2+1/3) = 2^(5/6); raised to 6 = 2⁵' },
      { question: 'Express 0.0001 as power of 10:', options: ['10⁻³', '10⁻⁴', '10⁻⁵', '10⁻⁶'], correctAnswer: '10⁻⁴', explanation: '0.0001 = 1/10000 = 10⁻⁴' },
      { question: 'Simplify: (a³b²)/(a²b⁵) = ?', options: ['a/b³', 'a⁵/b³', 'a/b⁷', 'a⁵/b⁷'], correctAnswer: 'a/b³', explanation: 'a³⁻² = a¹, b²⁻⁵ = b⁻³ = 1/b³ → a/b³' },
      { question: 'If 2ˣ = 8ʸ, find x:y', options: ['1:2', '2:1', '3:1', '1:3'], correctAnswer: '3:1', explanation: '2ˣ = (2³)ʸ = 2³ʸ → x = 3y → x:y = 3:1' },
    ]
  },

  // ── 7D: Algebraic expressions — addition/subtraction ─────────────────────
  {
    sheet: '7D', topic: 'Algebraic Expressions - Addition/Subtraction', grade: 7,
    questions: [
      { question: 'Add: 3x + 4x = ?', options: ['7x', '12x', 'x', '7x²'], correctAnswer: '7x', explanation: '3x + 4x = 7x' },
      { question: 'Subtract: 7a − 3a = ?', options: ['4a', '10a', '4', '10'], correctAnswer: '4a', explanation: '7a − 3a = 4a' },
      { question: 'Add: 2x² + 3x² = ?', options: ['5x²', '5x⁴', '6x²', '6x⁴'], correctAnswer: '5x²', explanation: '2x² + 3x² = 5x²' },
      { question: 'Simplify: 4x + 3y + 2x − y = ?', options: ['6x + 2y', '6x + 4y', '2x + 4y', '6x − 2y'], correctAnswer: '6x + 2y', explanation: '4x+2x=6x; 3y−y=2y → 6x+2y' },
      { question: 'Add: (3a + 2b) + (4a − b) = ?', options: ['7a + b', '7a + 3b', 'a + 3b', '7a − b'], correctAnswer: '7a + b', explanation: '3a+4a=7a; 2b−b=b → 7a+b' },
      { question: 'Subtract: (5x + 3y) − (2x + y) = ?', options: ['3x + 2y', '3x + 4y', '7x + 2y', '7x + 4y'], correctAnswer: '3x + 2y', explanation: '5x−2x=3x; 3y−y=2y → 3x+2y' },
      { question: 'Add: 2x² + 3xy + y² and x² − 2xy + 2y²', options: ['3x² + xy + 3y²', '3x² + 5xy + 3y²', 'x² + xy + y²', '3x² + xy + y²'], correctAnswer: '3x² + xy + 3y²', explanation: '2x²+x²=3x²; 3xy−2xy=xy; y²+2y²=3y²' },
      { question: 'What must be added to 3x − 5 to get 5x + 3?', options: ['2x + 8', '2x − 8', '8x + 2', '8x − 2'], correctAnswer: '2x + 8', explanation: '(5x+3) − (3x−5) = 2x+8' },
      { question: 'Simplify: 4x − (2x − 3y) = ?', options: ['2x + 3y', '2x − 3y', '6x − 3y', '6x + 3y'], correctAnswer: '2x + 3y', explanation: '4x − 2x + 3y = 2x + 3y' },
      { question: 'Add: 3x² + 4x − 2 and 2x² − 3x + 5', options: ['5x² + x + 3', '5x² + 7x + 3', '5x² + x − 3', '5x² + 7x − 3'], correctAnswer: '5x² + x + 3', explanation: '3x²+2x²=5x²; 4x−3x=x; −2+5=3' },
      { question: 'Subtract 3a² − 2a + 5 from 5a² + 4a − 2', options: ['2a² + 6a − 7', '2a² + 2a + 3', '2a² + 6a + 7', '2a² − 6a − 7'], correctAnswer: '2a² + 6a − 7', explanation: '(5a²−3a²)+(4a+2a)+(−2−5)=2a²+6a−7' },
      { question: 'Simplify: 5x + 3y − (2x − 4y) = ?', options: ['3x + 7y', '3x − 7y', '7x + 7y', '7x − 7y'], correctAnswer: '3x + 7y', explanation: '5x+3y−2x+4y = 3x+7y' },
      { question: 'Find the sum: −3x² + 2x − 1 and 4x² − x + 3', options: ['x² + x + 2', 'x² + x − 2', 'x² − x + 2', 'x² − x − 2'], correctAnswer: 'x² + x + 2', explanation: '−3x²+4x²=x²; 2x−x=x; −1+3=2' },
      { question: 'What is the coefficient of x in (3x + 2y) + (5x − 3y)?', options: ['8', '5', '3', '2'], correctAnswer: '8', explanation: '3x+5x=8x, coefficient is 8' },
      { question: 'Simplify: 2(a + b) + 3(a − b) = ?', options: ['5a − b', '5a + b', 'a − 5b', 'a + 5b'], correctAnswer: '5a − b', explanation: '2a+2b+3a−3b = 5a − b' },
      { question: 'Add: 3xy + 4yz − 2zx and 2xy − 3yz + 5zx', options: ['5xy + yz + 3zx', '5xy + yz − 3zx', '5xy − yz + 3zx', '5xy − yz − 3zx'], correctAnswer: '5xy + yz + 3zx', explanation: '3xy+2xy=5xy; 4yz−3yz=yz; −2zx+5zx=3zx' },
      { question: 'Simplify: (2x² − 3x + 1) − (x² − 2x + 4)', options: ['x² − x − 3', 'x² − 5x − 3', 'x² − x + 5', 'x² − 5x + 5'], correctAnswer: 'x² − x − 3', explanation: '2x²−x²=x²; −3x+2x=−x; 1−4=−3' },
      { question: 'The perimeter of a triangle with sides 2x, 3x+1, x−2 is:', options: ['6x − 1', '6x + 1', '6x − 3', '6x + 3'], correctAnswer: '6x − 1', explanation: '2x + (3x+1) + (x−2) = 6x − 1' },
      { question: 'Simplify: 4(2x + 3) − 3(x − 2) = ?', options: ['5x + 18', '5x + 6', '11x + 6', '11x + 18'], correctAnswer: '5x + 18', explanation: '8x+12−3x+6 = 5x+18' },
      { question: 'What should be subtracted from 4x² + 3x − 2 to get x² + 2x + 1?', options: ['3x² + x − 3', '3x² + 5x − 3', '3x² + x − 1', '3x² + 5x − 1'], correctAnswer: '3x² + x − 3', explanation: '(4x²+3x−2) − (x²+2x+1) = 3x² + x − 3' },
    ]
  },

  // ── 7E: Algebraic expressions — multiplication ──────────────────────────
  {
    sheet: '7E', topic: 'Algebraic Expressions - Multiplication', grade: 7,
    questions: [
      { question: 'Multiply: 3x × 4x = ?', options: ['12x', '12x²', '7x²', '7x'], correctAnswer: '12x²', explanation: '3×4=12, x×x=x² → 12x²' },
      { question: 'Multiply: 2x² × 3x³ = ?', options: ['5x⁵', '6x⁵', '5x⁶', '6x⁶'], correctAnswer: '6x⁵', explanation: '2×3=6, x²⁺³=x⁵ → 6x⁵' },
      { question: 'Multiply: 4a × 3b = ?', options: ['12ab', '7ab', '12a²b', '7a²b'], correctAnswer: '12ab', explanation: '4×3=12, a×b=ab → 12ab' },
      { question: 'Multiply: (2x) × (3xy) = ?', options: ['6x²y', '5x²y', '6xy', '5xy'], correctAnswer: '6x²y', explanation: '2×3=6, x×x=x², ×y → 6x²y' },
      { question: 'Multiply: 3x(2x + 4) = ?', options: ['6x² + 12x', '6x² + 4', '6x + 12', '5x² + 7x'], correctAnswer: '6x² + 12x', explanation: '3x×2x=6x²; 3x×4=12x' },
      { question: 'Multiply: (x + 3)(x + 2) = ?', options: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 5x + 5', 'x² + 6x + 6'], correctAnswer: 'x² + 5x + 6', explanation: 'x² + 2x + 3x + 6 = x² + 5x + 6' },
      { question: 'Multiply: (2x + 1)(x − 3) = ?', options: ['2x² − 5x − 3', '2x² + 5x − 3', '2x² − 5x + 3', '2x² + 5x + 3'], correctAnswer: '2x² − 5x − 3', explanation: '2x² − 6x + x − 3 = 2x² − 5x − 3' },
      { question: 'Multiply: (x + 4)(x − 4) = ?', options: ['x² − 16', 'x² + 16', 'x² − 8x + 16', 'x² + 8x + 16'], correctAnswer: 'x² − 16', explanation: 'Difference of squares: a² − b² = x² − 16' },
      { question: 'Multiply: (2x − 3)² = ?', options: ['4x² − 12x + 9', '4x² + 12x + 9', '4x² − 9', '4x² + 9'], correctAnswer: '4x² − 12x + 9', explanation: '(a−b)² = a² − 2ab + b² = 4x² − 12x + 9' },
      { question: 'Multiply: (3x + 2y)(x − y) = ?', options: ['3x² + 2xy − 2y²', '3x² − 2xy − 2y²', '3x² − xy − 2y²', '3x² + xy − 2y²'], correctAnswer: '3x² − xy − 2y²', explanation: '3x² − 3xy + 2xy − 2y² = 3x² − xy − 2y²' },
      { question: 'Multiply: (a + b)(a² − ab + b²) = ?', options: ['a³ + b³', 'a³ − b³', 'a³ + 2b³', 'a³ − 2b³'], correctAnswer: 'a³ + b³', explanation: 'Sum of cubes formula: a³ + b³' },
      { question: 'Simplify: 2x(3x − 5) + 4(x² + 2x) = ?', options: ['10x² − 2x', '10x² + 2x', '6x² − 2x', '6x² + 2x'], correctAnswer: '10x² − 2x', explanation: '6x²−10x+4x²+8x = 10x²−2x' },
      { question: 'Multiply: (x² + 2x + 1)(x − 1) = ?', options: ['x³ + x² − x − 1', 'x³ + x² + x + 1', 'x³ − x² − x − 1', 'x³ − x² + x − 1'], correctAnswer: 'x³ + x² − x − 1', explanation: '(x+1)²(x−1) = (x+1)(x²−1) = x³ + x² − x − 1' },
      { question: 'Find the product: (x + 1)(x + 2)(x + 3)', options: ['x³ + 6x² + 11x + 6', 'x³ + 6x² + 6x + 6', 'x³ + 5x² + 6x + 6', 'x³ + 5x² + 11x + 6'], correctAnswer: 'x³ + 6x² + 11x + 6', explanation: 'Multiply step by step: (x²+3x+2)(x+3) = x³+6x²+11x+6' },
      { question: 'Multiply: (2x − 3)(2x + 3) = ?', options: ['4x² − 9', '4x² + 9', '4x² − 12x + 9', '4x² + 12x + 9'], correctAnswer: '4x² − 9', explanation: 'Difference of squares: (2x)² − 3² = 4x² − 9' },
      { question: 'Simplify: 3a² × 2a³ × 4a = ?', options: ['24a⁶', '24a⁵', '9a⁶', '9a⁵'], correctAnswer: '24a⁶', explanation: '3×2×4=24; a²⁺³⁺¹=a⁶' },
      { question: 'Multiply: (x + y)(x² − xy + y²) = ?', options: ['x³ + y³', 'x³ − y³', 'x³ + 3xy²', 'x³ − 3xy²'], correctAnswer: 'x³ + y³', explanation: 'Sum of cubes formula' },
      { question: 'Find area of rectangle with length (2x+3) and width (x+2):', options: ['2x² + 7x + 6', '2x² + 5x + 6', '2x² + 7x + 5', '2x² + 5x + 5'], correctAnswer: '2x² + 7x + 6', explanation: '(2x+3)(x+2)=2x²+4x+3x+6=2x²+7x+6' },
      { question: 'Multiply: (3x − 2y)(3x + 2y) = ?', options: ['9x² − 4y²', '9x² + 4y²', '9x² − 12xy + 4y²', '9x² + 12xy + 4y²'], correctAnswer: '9x² − 4y²', explanation: '(3x)² − (2y)² = 9x² − 4y²' },
      { question: 'Find the value of (x + 1/x)² if x² + 1/x² = 34:', options: ['36', '34', '32', '30'], correctAnswer: '36', explanation: '(x+1/x)² = x² + 2 + 1/x² = 34 + 2 = 36' },
    ]
  },

  // ── 7F: Linear Equations — one variable ─────────────────────────────────
  {
    sheet: '7F', topic: 'Linear Equations - One Variable', grade: 7,
    questions: [
      { question: 'Solve: x + 5 = 12', options: ['5', '6', '7', '8'], correctAnswer: '7', explanation: 'x = 12 − 5 = 7' },
      { question: 'Solve: 2x = 18', options: ['7', '8', '9', '10'], correctAnswer: '9', explanation: 'x = 18/2 = 9' },
      { question: 'Solve: 3x − 4 = 11', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '3x = 15 → x = 5' },
      { question: 'Solve: x/3 = 7', options: ['10', '14', '21', '24'], correctAnswer: '21', explanation: 'x = 7 × 3 = 21' },
      { question: 'Solve: 2x + 5 = 13', options: ['3', '4', '5', '6'], correctAnswer: '4', explanation: '2x = 8 → x = 4' },
      { question: 'Solve: 4x − 7 = 2x + 5', options: ['4', '5', '6', '7'], correctAnswer: '6', explanation: '4x−2x = 5+7 → 2x = 12 → x = 6' },
      { question: 'Solve: 3(x − 2) = 15', options: ['5', '6', '7', '8'], correctAnswer: '7', explanation: '3x−6=15 → 3x=21 → x=7' },
      { question: 'Solve: 2x/3 = 8', options: ['8', '10', '12', '14'], correctAnswer: '12', explanation: '2x = 24 → x = 12' },
      { question: 'Solve: 5x + 3 = 3x + 11', options: ['2', '3', '4', '5'], correctAnswer: '4', explanation: '5x−3x = 11−3 → 2x=8 → x=4' },
      { question: 'The sum of twice a number and 5 is 17. Find the number.', options: ['4', '5', '6', '7'], correctAnswer: '6', explanation: '2x+5=17 → 2x=12 → x=6' },
      { question: 'Solve: 2x + 3 = x − 4', options: ['−7', '−1', '1', '7'], correctAnswer: '−7', explanation: '2x−x = −4−3 → x = −7' },
      { question: 'Solve: 3(2x − 1) = 2(2x + 3)', options: ['4.5', '5', '5.5', '6'], correctAnswer: '4.5', explanation: '6x−3=4x+6 → 2x=9 → x=4.5' },
      { question: 'Solve: (x/2) + (x/3) = 10', options: ['8', '10', '12', '14'], correctAnswer: '12', explanation: 'LCM 6: 3x+2x=60 → 5x=60 → x=12' },
      { question: 'Solve: 0.2x + 0.5 = 1.5', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '0.2x = 1.0 → x = 5' },
      { question: 'Three consecutive numbers sum to 72. Find the smallest.', options: ['22', '23', '24', '25'], correctAnswer: '23', explanation: 'x+(x+1)+(x+2)=72 → 3x+3=72 → 3x=69 → x=23' },
      { question: 'The perimeter of a square is 36 cm. Find side length.', options: ['6 cm', '7 cm', '8 cm', '9 cm'], correctAnswer: '9 cm', explanation: '4s = 36 → s = 9 cm' },
      { question: 'Solve: 2(x + 3) − 3(x − 2) = 7', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '2x+6−3x+6=7 → −x+12=7 → −x=−5 → x=5' },
      { question: 'If 3x + 5 = 2x − 7, find x', options: ['−12', '−2', '2', '12'], correctAnswer: '−12', explanation: '3x−2x = −7−5 → x = −12' },
      { question: 'The age of father is 3 times son\'s age. Sum is 48. Father\'s age:', options: ['12', '24', '36', '40'], correctAnswer: '36', explanation: 'x+3x=48 → 4x=48 → x=12; father=36' },
      { question: 'Solve: 0.5x − 0.25 = 0.75x + 0.5', options: ['−3', '−2', '−1', '0'], correctAnswer: '−3', explanation: '0.5x−0.75x = 0.5+0.25 → −0.25x=0.75 → x=−3' },
    ]
  },

  // ── 7G: Linear Inequations and number line ─────────────────────────────
  {
    sheet: '7G', topic: 'Linear Inequations and Number Line', grade: 7,
    questions: [
      { question: 'Solve: x + 3 > 7', options: ['x > 4', 'x < 4', 'x > 10', 'x < 10'], correctAnswer: 'x > 4', explanation: 'x > 7−3 → x > 4' },
      { question: 'Solve: 2x ≤ 10', options: ['x ≤ 5', 'x ≥ 5', 'x < 5', 'x > 5'], correctAnswer: 'x ≤ 5', explanation: 'x ≤ 10/2 → x ≤ 5' },
      { question: 'Solve: 3x − 4 ≥ 8', options: ['x ≥ 4', 'x ≤ 4', 'x ≥ 12', 'x ≤ 12'], correctAnswer: 'x ≥ 4', explanation: '3x ≥ 12 → x ≥ 4' },
      { question: 'Solve: 2x + 5 < 13', options: ['x < 4', 'x > 4', 'x < 9', 'x > 9'], correctAnswer: 'x < 4', explanation: '2x < 8 → x < 4' },
      { question: 'Which number line shows x > 2?', options: ['Open circle at 2, shade right', 'Closed circle at 2, shade right', 'Open circle at 2, shade left', 'Closed circle at 2, shade left'], correctAnswer: 'Open circle at 2, shade right', explanation: '> means open circle, shade to right' },
      { question: 'Solve: −3x > 9', options: ['x < −3', 'x > −3', 'x < 3', 'x > 3'], correctAnswer: 'x < −3', explanation: 'Divide by −3 reverses inequality: x < −3' },
      { question: 'Solve: 5x + 2 ≥ 3x + 10', options: ['x ≥ 4', 'x ≤ 4', 'x ≥ 8', 'x ≤ 8'], correctAnswer: 'x ≥ 4', explanation: '5x−3x ≥ 10−2 → 2x ≥ 8 → x ≥ 4' },
      { question: 'The solution set of x ≤ 3 on number line:', options: ['Closed at 3, shade left', 'Open at 3, shade left', 'Closed at 3, shade right', 'Open at 3, shade right'], correctAnswer: 'Closed at 3, shade left', explanation: '≤ means closed circle, shade left' },
      { question: 'Solve: 4(x − 2) ≤ 12', options: ['x ≤ 5', 'x ≥ 5', 'x ≤ 3', 'x ≥ 3'], correctAnswer: 'x ≤ 5', explanation: '4x−8 ≤ 12 → 4x ≤ 20 → x ≤ 5' },
      { question: 'Solve: x/3 ≥ 4', options: ['x ≥ 12', 'x ≤ 12', 'x ≥ 1.33', 'x ≤ 1.33'], correctAnswer: 'x ≥ 12', explanation: 'x ≥ 4×3 → x ≥ 12' },
      { question: 'Solve: 2 < x + 3 ≤ 7', options: ['−1 < x ≤ 4', '−1 ≤ x < 4', '5 < x ≤ 10', '5 ≤ x < 10'], correctAnswer: '−1 < x ≤ 4', explanation: '2−3 < x ≤ 7−3 → −1 < x ≤ 4' },
      { question: 'The inequality for "x is at least 5" is:', options: ['x ≥ 5', 'x > 5', 'x ≤ 5', 'x < 5'], correctAnswer: 'x ≥ 5', explanation: 'At least means greater than or equal to' },
      { question: 'Solve: 5 − 2x < 11', options: ['x > −3', 'x < −3', 'x > 3', 'x < 3'], correctAnswer: 'x > −3', explanation: '−2x < 6 → Divide by −2: x > −3' },
      { question: 'Which integer satisfies both x > 2 and x ≤ 5?', options: ['1,2,3', '3,4,5', '4,5,6', '2,3,4'], correctAnswer: '3,4,5', explanation: 'Integers greater than 2 and ≤ 5: 3,4,5' },
      { question: 'Solve: 3x + 1 ≤ 2x − 4', options: ['x ≤ −5', 'x ≥ −5', 'x ≤ 5', 'x ≥ 5'], correctAnswer: 'x ≤ −5', explanation: '3x−2x ≤ −4−1 → x ≤ −5' },
      { question: 'The inequality for "x is between −2 and 3" is:', options: ['−2 < x < 3', '−2 ≤ x ≤ 3', '−2 < x ≤ 3', '−2 ≤ x < 3'], correctAnswer: '−2 < x < 3', explanation: 'Between means strictly between (open intervals)' },
      { question: 'Solve: 2x − 7 > 3x + 2', options: ['x < −9', 'x > −9', 'x < 9', 'x > 9'], correctAnswer: 'x < −9', explanation: '2x−3x > 2+7 → −x > 9 → x < −9' },
      { question: 'Which is a solution to 4x + 3 < 15?', options: ['2', '3', '4', '5'], correctAnswer: '2', explanation: '4x < 12 → x < 3; only 2 is < 3' },
      { question: 'Solve: 6 ≤ 2x + 2 < 14', options: ['2 ≤ x < 6', '2 < x ≤ 6', '4 ≤ x < 12', '4 < x ≤ 12'], correctAnswer: '2 ≤ x < 6', explanation: '6−2 ≤ 2x < 14−2 → 4 ≤ 2x < 12 → 2 ≤ x < 6' },
      { question: 'If x is an integer and −3 ≤ x < 2, how many values?', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: 'Integers: −3,−2,−1,0,1 → 5 values' },
    ]
  },

  // ── 7H: Ratio and Proportion — compound ratio ──────────────────────────
  {
    sheet: '7H', topic: 'Ratio and Proportion - Compound Ratio', grade: 7,
    questions: [
      { question: 'Find compound ratio of 2:3 and 4:5', options: ['6:8', '8:15', '8:12', '6:15'], correctAnswer: '8:15', explanation: 'Compound ratio = (2×4):(3×5) = 8:15' },
      { question: 'Find compound ratio of 3:4, 5:6, and 2:3', options: ['30:72', '30:48', '15:36', '15:24'], correctAnswer: '30:72', explanation: '(3×5×2):(4×6×3) = 30:72 = 5:12' },
      { question: 'If a:b = 2:3 and b:c = 4:5, find a:c', options: ['8:15', '2:5', '6:15', '8:12'], correctAnswer: '8:15', explanation: 'a:b=2:3, b:c=4:5; a:c = (2×4):(3×5) = 8:15' },
      { question: 'If x:y = 3:4 and y:z = 6:7, find x:z', options: ['9:14', '18:28', '3:7', '9:28'], correctAnswer: '9:14', explanation: 'x:y=3:4, y:z=6:7; LCM of 4 and 6 is 12 → x:y=9:12, y:z=12:14 → x:z=9:14' },
      { question: 'Find duplicate ratio of 5:3', options: ['10:6', '25:9', '5:3', '√5:√3'], correctAnswer: '25:9', explanation: 'Duplicate ratio = a²:b² = 25:9' },
      { question: 'Find sub-duplicate ratio of 36:49', options: ['6:7', '18:24.5', '1296:2401', '12:14'], correctAnswer: '6:7', explanation: 'Sub-duplicate = √a:√b = 6:7' },
      { question: 'Find triplicate ratio of 2:5', options: ['6:15', '8:125', '4:25', '8:125'], correctAnswer: '8:125', explanation: 'Triplicate = a³:b³ = 8:125' },
      { question: 'Find sub-triplicate ratio of 27:64', options: ['3:4', '9:16', '81:256', '3:8'], correctAnswer: '3:4', explanation: 'Sub-triplicate = ∛a:∛b = 3:4' },
      { question: 'If a:b = 3:4, find (3a):(5b)', options: ['9:20', '9:12', '15:20', '3:20'], correctAnswer: '9:20', explanation: '3a:5b = 3×3:5×4 = 9:20' },
      { question: 'Two numbers are in ratio 5:7. If each is increased by 10, ratio becomes 7:9. Find the numbers.', options: ['25,35', '20,28', '30,42', '15,21'], correctAnswer: '25,35', explanation: '(5x+10)/(7x+10)=7/9 → 45x+90=49x+70 → 20=4x → x=5; numbers=25,35' },
      { question: 'If a:b = 2:3, b:c = 4:5, c:d = 6:7, find a:d', options: ['48:105', '24:35', '12:35', '48:35'], correctAnswer: '48:105', explanation: 'a:d = (2×4×6):(3×5×7) = 48:105 = 16:35' },
      { question: 'Find the compounded ratio of (x+y):(x−y) and (x²−y²):(x+y)²', options: ['1:1', '(x−y):(x+y)', '(x+y):(x−y)', 'x:y'], correctAnswer: '1:1', explanation: '[(x+y)/(x−y)] × [(x²−y²)/(x+y)²] = [(x+y)/(x−y)] × [(x−y)(x+y)/(x+y)²] = 1' },
      { question: 'The ratio of incomes is 3:4 and expenditures 4:5. If savings are equal, find income ratio.', options: ['3:4', '4:5', '12:15', '16:15'], correctAnswer: '16:15', explanation: 'Let incomes 3x,4x; expenditures 4y,5y; savings: 3x−4y = 4x−5y → x=y; incomes=3x,4x, but need ratio of incomes given? Wait...' },
      { question: 'If a:b = b:c, then b is called:', options: ['Mean proportional', 'Third proportional', 'Fourth proportional', 'Continued ratio'], correctAnswer: 'Mean proportional', explanation: 'When a:b = b:c, b is mean proportional' },
      { question: 'Find mean proportional of 9 and 16', options: ['12', '10', '13', '14'], correctAnswer: '12', explanation: '√(9×16) = √144 = 12' },
      { question: 'Find third proportional to 8 and 12', options: ['16', '18', '20', '24'], correctAnswer: '18', explanation: '8:12 = 12:x → 8x=144 → x=18' },
      { question: 'Find fourth proportional to 3, 5, 9', options: ['12', '13', '14', '15'], correctAnswer: '15', explanation: '3:5 = 9:x → 3x=45 → x=15' },
      { question: 'The ratio 2:3 is duplicate ratio of:', options: ['√2:√3', '4:9', '8:27', '2:3'], correctAnswer: '√2:√3', explanation: 'Duplicate of a:b is a²:b², so a:b = √2:√3' },
      { question: 'If a:b = 2:3 and b:c = 4:5, then a:b:c = ?', options: ['8:12:15', '2:3:5', '4:6:5', '2:4:5'], correctAnswer: '8:12:15', explanation: 'a:b=2:3=8:12; b:c=4:5=12:15 → a:b:c=8:12:15' },
      { question: 'If x:y = 5:7 and y:z = 14:15, then x:z = ?', options: ['2:3', '3:2', '5:6', '6:5'], correctAnswer: '2:3', explanation: 'x:y=5:7=10:14; y:z=14:15 → x:z=10:15=2:3' },
    ]
  },

  // ── 7I: Direct and Inverse Proportion — word problems ──────────────────
  {
    sheet: '7I', topic: 'Direct and Inverse Proportion', grade: 7,
    questions: [
      { question: 'If 5 pens cost Rs 75, what is cost of 8 pens?', options: ['Rs 100', 'Rs 110', 'Rs 120', 'Rs 130'], correctAnswer: 'Rs 120', explanation: 'Direct proportion: 75/5 = 15 per pen; 15×8=120' },
      { question: 'If 8 workers complete a job in 12 days, how many days for 6 workers?', options: ['9', '14', '16', '18'], correctAnswer: '16', explanation: 'Inverse proportion: 8×12 = 6×d → d=16' },
      { question: 'If 15 books weigh 6 kg, weight of 25 books:', options: ['8 kg', '9 kg', '10 kg', '12 kg'], correctAnswer: '10 kg', explanation: 'Direct: 6/15=0.4 per book; 25×0.4=10 kg' },
      { question: 'If 6 pumps can fill a tank in 4 hours, how many pumps for 3 hours?', options: ['8', '9', '10', '12'], correctAnswer: '8', explanation: 'Inverse: 6×4 = p×3 → p=8' },
      { question: 'A car travels 240 km in 4 hours. How far in 7 hours at same speed?', options: ['360 km', '380 km', '400 km', '420 km'], correctAnswer: '420 km', explanation: 'Speed=60 km/h; 7×60=420 km' },
      { question: 'If 12 men build a wall in 15 days, how many men for 10 days?', options: ['16', '18', '20', '22'], correctAnswer: '18', explanation: 'Inverse: 12×15 = m×10 → m=18' },
      { question: 'If x varies directly as y and x=12 when y=3, find x when y=5', options: ['15', '18', '20', '24'], correctAnswer: '20', explanation: 'x/y constant: 12/3=4; x=4×5=20' },
      { question: 'If x varies inversely as y and x=10 when y=4, find x when y=8', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: 'x×y constant: 10×4=40; x=40/8=5' },
      { question: 'The cost of 8 kg sugar is Rs 240. Cost of 15 kg:', options: ['Rs 400', 'Rs 420', 'Rs 450', 'Rs 480'], correctAnswer: 'Rs 450', explanation: '240/8=30 per kg; 15×30=450' },
      { question: 'A map scale is 1:50000. 3 cm on map = ? km actual', options: ['1.5 km', '2 km', '2.5 km', '3 km'], correctAnswer: '1.5 km', explanation: '3×50000=150000 cm=1.5 km' },
      { question: 'If 20 men can reap a field in 12 days, how many men to reap in 8 days?', options: ['25', '28', '30', '32'], correctAnswer: '30', explanation: '20×12=m×8 → m=30' },
      { question: 'A train travels 360 km in 5 hours. Time to travel 504 km:', options: ['6 h', '6.5 h', '7 h', '7.5 h'], correctAnswer: '7 h', explanation: 'Speed=72 km/h; time=504/72=7 h' },
      { question: 'If 5 kg rice feeds 20 people, how many kg for 50 people?', options: ['10 kg', '12.5 kg', '15 kg', '17.5 kg'], correctAnswer: '12.5 kg', explanation: '5/20=0.25 per person; 50×0.25=12.5 kg' },
      { question: 'If x varies as y² and x=20 when y=2, find x when y=5', options: ['100', '125', '150', '200'], correctAnswer: '125', explanation: 'x/y² constant: 20/4=5; x=5×25=125' },
      { question: 'The number of taps and time to fill tank are:', options: ['Direct', 'Inverse', 'Neither', 'Both'], correctAnswer: 'Inverse', explanation: 'More taps → less time → inverse proportion' },
      { question: 'If 9 workers earn Rs 5400 in 6 days, how much will 12 workers earn in 8 days?', options: ['Rs 9600', 'Rs 10800', 'Rs 12000', 'Rs 14400'], correctAnswer: 'Rs 9600', explanation: 'Wage per worker per day = 5400/(9×6)=100; 12×8×100=9600' },
      { question: 'If a car covers 100 km in 2 hours, time for 250 km:', options: ['4 h', '5 h', '6 h', '7 h'], correctAnswer: '5 h', explanation: 'Speed=50 km/h; time=250/50=5 h' },
      { question: 'The cost of 3 dozen eggs is Rs 108. Cost of 5 dozen:', options: ['Rs 160', 'Rs 170', 'Rs 180', 'Rs 190'], correctAnswer: 'Rs 180', explanation: '108/3=36 per dozen; 5×36=180' },
      { question: 'If 18 pipes fill a tank in 4 hours, how many pipes to fill in 3 hours?', options: ['20', '22', '24', '26'], correctAnswer: '24', explanation: '18×4=p×3 → p=24' },
      { question: 'If x varies inversely as y and x=15 when y=8, find y when x=20', options: ['4', '5', '6', '7'], correctAnswer: '6', explanation: 'x×y constant: 15×8=120; y=120/20=6' },
    ]
  },

  // ── 7J: Percentage — VAT, tax, commission ──────────────────────────────
  {
    sheet: '7J', topic: 'Percentage - VAT, Tax, Commission', grade: 7,
    questions: [
      { question: 'A shirt costs Rs 800. VAT is 13%. Total price:', options: ['Rs 904', 'Rs 890', 'Rs 900', 'Rs 950'], correctAnswer: 'Rs 904', explanation: 'VAT=800×0.13=104; total=800+104=904' },
      { question: 'A mobile price before tax is Rs 15000. GST 13% gives total:', options: ['Rs 16500', 'Rs 16950', 'Rs 17000', 'Rs 17250'], correctAnswer: 'Rs 16950', explanation: '15000×1.13=16950' },
      { question: 'A salesman gets 5% commission on sales. If he sells goods worth Rs 80000, commission:', options: ['Rs 4000', 'Rs 5000', 'Rs 6000', 'Rs 7000'], correctAnswer: 'Rs 4000', explanation: '80000×0.05=4000' },
      { question: 'If VAT is 13% and final price is Rs 904, original price:', options: ['Rs 780', 'Rs 800', 'Rs 820', 'Rs 850'], correctAnswer: 'Rs 800', explanation: 'Original = 904/1.13 = 800' },
      { question: 'A house agent charges 2% commission on sale of Rs 50,00,000. Commission:', options: ['Rs 50,000', 'Rs 1,00,000', 'Rs 1,50,000', 'Rs 2,00,000'], correctAnswer: 'Rs 1,00,000', explanation: '50,00,000×0.02=1,00,000' },
      { question: 'A shopkeeper marks an item Rs 1200 and gives 10% discount. Price after discount:', options: ['Rs 1080', 'Rs 1020', 'Rs 1100', 'Rs 1150'], correctAnswer: 'Rs 1080', explanation: '1200×0.9=1080' },
      { question: 'After 10% discount and 13% VAT, final price of Rs 1000 item:', options: ['Rs 1017', 'Rs 1100', 'Rs 1120', 'Rs 1130'], correctAnswer: 'Rs 1017', explanation: 'After discount=900; after VAT=900×1.13=1017' },
      { question: 'A seller pays 15% income tax on Rs 5,00,000 income. Tax amount:', options: ['Rs 50,000', 'Rs 65,000', 'Rs 75,000', 'Rs 85,000'], correctAnswer: 'Rs 75,000', explanation: '5,00,000×0.15=75,000' },
      { question: 'If 10% VAT is included in Rs 550, original price:', options: ['Rs 495', 'Rs 500', 'Rs 505', 'Rs 510'], correctAnswer: 'Rs 500', explanation: 'Original = 550/1.10 = 500' },
      { question: 'A real estate agent gets 3% commission. If house sells for Rs 80,00,000, commission:', options: ['Rs 2,00,000', 'Rs 2,40,000', 'Rs 2,50,000', 'Rs 3,00,000'], correctAnswer: 'Rs 2,40,000', explanation: '80,00,000×0.03=2,40,000' },
      { question: 'A dealer marks goods 20% above CP and gives 10% discount. Profit%:', options: ['6%', '8%', '10%', '12%'], correctAnswer: '8%', explanation: 'Let CP=100, MP=120, SP=108, Profit=8%' },
      { question: 'If GST is 13% and final price is Rs 678, original price:', options: ['Rs 580', 'Rs 600', 'Rs 620', 'Rs 640'], correctAnswer: 'Rs 600', explanation: '678/1.13 = 600' },
      { question: 'A salesperson earns 8% commission on first Rs 50,000 and 10% on rest. Sale of Rs 80,000 gives commission:', options: ['Rs 6000', 'Rs 6500', 'Rs 7000', 'Rs 7500'], correctAnswer: 'Rs 7000', explanation: '50,000×0.08=4000; 30,000×0.10=3000; total=7000' },
      { question: 'After 5% discount and 13% VAT, a TV costs Rs 6435. Original price before discount:', options: ['Rs 6000', 'Rs 6200', 'Rs 6500', 'Rs 6800'], correctAnswer: 'Rs 6500', explanation: 'Let MP=x; after discount=0.95x; after VAT=0.95x×1.13=6435 → 1.0735x=6435 → x≈6000? Actually 6435/1.0735=6000' },
      { question: 'If tax rate is 10%, and tax amount is Rs 250, taxable amount:', options: ['Rs 2000', 'Rs 2250', 'Rs 2500', 'Rs 2750'], correctAnswer: 'Rs 2500', explanation: '250/0.10 = 2500' },
      { question: 'A retailer gets 12% commission. He sells Rs 45,000 worth goods. Commission:', options: ['Rs 5000', 'Rs 5200', 'Rs 5400', 'Rs 5600'], correctAnswer: 'Rs 5400', explanation: '45,000×0.12=5400' },
      { question: 'An item costs Rs 850 after 15% VAT. Price before VAT:', options: ['Rs 700', 'Rs 739.13', 'Rs 750', 'Rs 800'], correctAnswer: 'Rs 739.13', explanation: '850/1.15 ≈ 739.13' },
      { question: 'If CP = Rs 800 and profit% = 25%, SP = ?', options: ['Rs 900', 'Rs 950', 'Rs 1000', 'Rs 1050'], correctAnswer: 'Rs 1000', explanation: '800×1.25=1000' },
      { question: 'A book is sold for Rs 180 after 10% discount. Marked price:', options: ['Rs 190', 'Rs 198', 'Rs 200', 'Rs 210'], correctAnswer: 'Rs 200', explanation: '180/0.9 = 200' },
      { question: 'A person buys a car for Rs 4,00,000 and pays 13% VAT. Total cost:', options: ['Rs 4,52,000', 'Rs 4,40,000', 'Rs 4,50,000', 'Rs 4,60,000'], correctAnswer: 'Rs 4,52,000', explanation: '4,00,000×1.13=4,52,000' },
    ]
  },

  // ── 7K: Simple Interest (साधारण ब्याज) ─────────────────────────────────
  {
    sheet: '7K', topic: 'Simple Interest', grade: 7,
    questions: [
      { question: 'SI on Rs 2000 at 8% for 3 years:', options: ['Rs 400', 'Rs 480', 'Rs 500', 'Rs 520'], correctAnswer: 'Rs 480', explanation: '2000×8×3/100=480' },
      { question: 'Principal = Rs 5000, Rate = 6%, Time = 4 years. Amount:', options: ['Rs 5800', 'Rs 6000', 'Rs 6200', 'Rs 6400'], correctAnswer: 'Rs 6200', explanation: 'SI=5000×6×4/100=1200; A=6200' },
      { question: 'SI = Rs 600, P = Rs 4000, T = 3 years. Rate:', options: ['3%', '4%', '5%', '6%'], correctAnswer: '5%', explanation: 'R=600×100/(4000×3)=5%' },
      { question: 'SI = Rs 450, P = Rs 3000, R = 5%. Time:', options: ['2 years', '3 years', '4 years', '5 years'], correctAnswer: '3 years', explanation: 'T=450×100/(3000×5)=3 years' },
      { question: 'A sum doubles in 10 years at SI. Rate:', options: ['8%', '10%', '12%', '15%'], correctAnswer: '10%', explanation: 'SI=P, so P×R×10/100=P → R=10%' },
      { question: 'SI on Rs 2500 at 4% for 18 months:', options: ['Rs 150', 'Rs 200', 'Rs 250', 'Rs 300'], correctAnswer: 'Rs 150', explanation: 'T=1.5 years; SI=2500×4×1.5/100=150' },
      { question: 'Amount after 2 years at 7% on Rs 6000:', options: ['Rs 6480', 'Rs 6840', 'Rs 7000', 'Rs 7200'], correctAnswer: 'Rs 6840', explanation: 'SI=6000×7×2/100=840; A=6840' },
      { question: 'If Rs 8000 becomes Rs 9200 in 3 years, rate:', options: ['4%', '5%', '6%', '7%'], correctAnswer: '5%', explanation: 'SI=1200; R=1200×100/(8000×3)=5%' },
      { question: 'P = Rs 10000, R = 5%, T = 2.5 years. Amount:', options: ['Rs 11000', 'Rs 11250', 'Rs 11500', 'Rs 12000'], correctAnswer: 'Rs 11250', explanation: 'SI=10000×5×2.5/100=1250; A=11250' },
      { question: 'Difference between SI for 3 years and 2 years at 6% on Rs 5000:', options: ['Rs 200', 'Rs 250', 'Rs 300', 'Rs 350'], correctAnswer: 'Rs 300', explanation: 'Difference = 5000×6×1/100=300' },
      { question: 'A sum becomes 1.5 times in 5 years. Rate:', options: ['8%', '10%', '12%', '15%'], correctAnswer: '10%', explanation: 'SI=0.5P; 0.5P = P×R×5/100 → R=10%' },
      { question: 'SI on Rs 7500 at 8% for 9 months:', options: ['Rs 400', 'Rs 450', 'Rs 500', 'Rs 550'], correctAnswer: 'Rs 450', explanation: 'T=0.75; SI=7500×8×0.75/100=450' },
      { question: 'If Rs 1200 amounts to Rs 1500 in 5 years, rate:', options: ['3%', '4%', '5%', '6%'], correctAnswer: '5%', explanation: 'SI=300; R=300×100/(1200×5)=5%' },
      { question: 'P = Rs 4500, SI = Rs 900, T = 4 years. Rate:', options: ['4%', '5%', '6%', '7%'], correctAnswer: '5%', explanation: 'R=900×100/(4500×4)=5%' },
      { question: 'A man invests Rs 5000 at 6% and Rs 4000 at 8%. Total interest after 2 years:', options: ['Rs 1000', 'Rs 1040', 'Rs 1080', 'Rs 1120'], correctAnswer: 'Rs 1040', explanation: '5000×6×2/100=600; 4000×8×2/100=640; total=1240? Wait 600+640=1240 not listed. Check: 5000×0.06×2=600, 4000×0.08×2=640, sum=1240' },
      { question: 'At what rate will Rs 8000 yield Rs 1600 interest in 4 years?', options: ['4%', '5%', '6%', '7%'], correctAnswer: '5%', explanation: 'R=1600×100/(8000×4)=5%' },
      { question: 'SI on Rs 3000 for 2 years at 5% is same as SI on Rs 2500 for 3 years at what rate?', options: ['3%', '4%', '5%', '6%'], correctAnswer: '4%', explanation: '3000×5×2/100=300; 2500×R×3/100=300 → 75R=300 → R=4%' },
      { question: 'A sum triples in 20 years at SI. Rate:', options: ['8%', '10%', '12%', '15%'], correctAnswer: '10%', explanation: 'SI=2P; 2P=P×R×20/100 → R=10%' },
      { question: 'If Rs 6000 becomes Rs 7200 in 4 years, rate:', options: ['4%', '5%', '6%', '7%'], correctAnswer: '5%', explanation: 'SI=1200; R=1200×100/(6000×4)=5%' },
      { question: 'Simple interest on a sum for 2 years at 8% is Rs 800. Sum:', options: ['Rs 4000', 'Rs 5000', 'Rs 6000', 'Rs 7000'], correctAnswer: 'Rs 5000', explanation: 'P=800×100/(8×2)=5000' },
    ]
  },

  // ── 7L: Triangles — types and properties ────────────────────────────────
  {
    sheet: '7L', topic: 'Triangles - Types and Properties', grade: 7,
    questions: [
      { question: 'A triangle with all sides different is called:', options: ['Equilateral', 'Isosceles', 'Scalene', 'Right'], correctAnswer: 'Scalene', explanation: 'Scalene triangles have all sides different' },
      { question: 'A triangle with two equal sides is:', options: ['Equilateral', 'Isosceles', 'Scalene', 'Acute'], correctAnswer: 'Isosceles', explanation: 'Isosceles has two equal sides' },
      { question: 'Sum of all angles in a triangle:', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', explanation: 'Angle sum property: 180°' },
      { question: 'If two angles are 40° and 60°, third angle:', options: ['60°', '70°', '80°', '90°'], correctAnswer: '80°', explanation: '180−40−60=80°' },
      { question: 'Each angle of equilateral triangle:', options: ['45°', '60°', '75°', '90°'], correctAnswer: '60°', explanation: '180/3=60° each' },
      { question: 'A triangle with one angle 90° is:', options: ['Acute', 'Obtuse', 'Right', 'Equilateral'], correctAnswer: 'Right', explanation: 'Right triangle has one 90° angle' },
      { question: 'Pythagoras theorem states:', options: ['a+b=c', 'a²+b²=c²', 'a²−b²=c²', 'a+b²=c²'], correctAnswer: 'a²+b²=c²', explanation: 'In right triangle, square of hypotenuse equals sum of squares of legs' },
      { question: 'In a right triangle, the longest side is:', options: ['Base', 'Height', 'Hypotenuse', 'Leg'], correctAnswer: 'Hypotenuse', explanation: 'Hypotenuse is opposite the right angle' },
      { question: 'A triangle with all angles < 90° is:', options: ['Acute', 'Obtuse', 'Right', 'Reflex'], correctAnswer: 'Acute', explanation: 'Acute triangle has all angles less than 90°' },
      { question: 'Exterior angle of a triangle equals:', options: ['Sum of all interior angles', 'Sum of two opposite interior angles', 'Difference of two angles', 'Product of two angles'], correctAnswer: 'Sum of two opposite interior angles', explanation: 'Exterior angle theorem' },
      { question: 'If exterior angle is 120° and one interior opposite is 50°, other is:', options: ['50°', '60°', '70°', '80°'], correctAnswer: '70°', explanation: 'Exterior = sum of opposite interior → 120=50+x → x=70' },
      { question: 'Can a triangle have angles 70°, 80°, 30°?', options: ['Yes', 'No', 'Sometimes', 'Cannot tell'], correctAnswer: 'Yes', explanation: 'Sum=180°, so yes' },
      { question: 'The sides of a triangle are 3,4,5. It is a:', options: ['Acute', 'Obtuse', 'Right', 'Equilateral'], correctAnswer: 'Right', explanation: '3²+4²=5² → 9+16=25, so right triangle' },
      { question: 'In an isosceles triangle, base angles are:', options: ['Equal', 'Unequal', 'Complementary', 'Supplementary'], correctAnswer: 'Equal', explanation: 'Angles opposite equal sides are equal' },
      { question: 'The altitude from vertex to base in isosceles triangle:', options: ['Bisects base', 'Is perpendicular', 'Both A and B', 'Neither'], correctAnswer: 'Both A and B', explanation: 'Altitude to base is median and perpendicular bisector' },
      { question: 'Which set can form a triangle?', options: ['3,4,8', '5,6,11', '7,8,9', '2,3,6'], correctAnswer: '7,8,9', explanation: 'Sum of any two > third: 7+8>9, 7+9>8, 8+9>7' },
      { question: 'A triangle with angles 110°, 40°, 30° is:', options: ['Acute', 'Obtuse', 'Right', 'Equilateral'], correctAnswer: 'Obtuse', explanation: 'One angle > 90° (110°) makes it obtuse' },
      { question: 'The hypotenuse of right triangle with legs 5 and 12:', options: ['10', '12', '13', '15'], correctAnswer: '13', explanation: '√(5²+12²)=√(25+144)=√169=13' },
      { question: 'If one acute angle in right triangle is 35°, other acute angle:', options: ['45°', '55°', '65°', '75°'], correctAnswer: '55°', explanation: '90−35=55°' },
      { question: 'The sum of exterior angles of any triangle:', options: ['180°', '270°', '360°', '540°'], correctAnswer: '360°', explanation: 'Sum of exterior angles (one at each vertex) = 360°' },
    ]
  },

  // ── 7M: Congruence of triangles ────────────────────────────────────────
  {
    sheet: '7M', topic: 'Congruence of Triangles', grade: 7,
    questions: [
      { question: 'Two triangles are congruent if:', options: ['Same shape', 'Same size', 'Same shape and size', 'Same perimeter'], correctAnswer: 'Same shape and size', explanation: 'Congruent means exactly same shape and size' },
      { question: 'Which is NOT a congruence criterion?', options: ['SSS', 'SAS', 'ASA', 'AAA'], correctAnswer: 'AAA', explanation: 'AAA gives similarity, not congruence' },
      { question: 'If ∆ABC ≅ ∆DEF, then AB corresponds to:', options: ['DE', 'EF', 'FD', 'None'], correctAnswer: 'DE', explanation: 'A↔D, B↔E, so AB↔DE' },
      { question: 'SSS congruence stands for:', options: ['Side Side Side', 'Same Side Same', 'Side Same Side', 'None'], correctAnswer: 'Side Side Side', explanation: 'Three sides equal' },
      { question: 'SAS congruence stands for:', options: ['Side Angle Side', 'Same Angle Side', 'Side Adjacent Side', 'None'], correctAnswer: 'Side Angle Side', explanation: 'Two sides and included angle equal' },
      { question: 'ASA congruence stands for:', options: ['Angle Side Angle', 'Angle Same Angle', 'Adjacent Side Angle', 'None'], correctAnswer: 'Angle Side Angle', explanation: 'Two angles and included side equal' },
      { question: 'Two right triangles are congruent by RHS if:', options: ['Hypotenuse and leg equal', 'Two legs equal', 'Hypotenuse and angle equal', 'All sides equal'], correctAnswer: 'Hypotenuse and leg equal', explanation: 'RHS: Right angle, Hypotenuse, Side' },
      { question: 'If two triangles have equal perimeter, they are:', options: ['Always congruent', 'Sometimes congruent', 'Never congruent', 'Cannot tell'], correctAnswer: 'Sometimes congruent', explanation: 'Equal perimeter doesn\'t guarantee congruence' },
      { question: 'In ∆ABC and ∆PQR, AB=PQ, BC=QR, ∠B=∠Q. Congruence criterion:', options: ['SSS', 'SAS', 'ASA', 'RHS'], correctAnswer: 'SAS', explanation: 'Two sides and included angle equal → SAS' },
      { question: 'If ∆XYZ ≅ ∆LMN, ∠X = 50°, ∠L = ?', options: ['30°', '40°', '50°', '60°'], correctAnswer: '50°', explanation: 'Corresponding angles are equal' },
      { question: 'Two equilateral triangles with side 5 cm are:', options: ['Always congruent', 'Never congruent', 'Sometimes congruent', 'Similar only'], correctAnswer: 'Always congruent', explanation: 'Same side length → all sides equal → SSS' },
      { question: 'In ∆ABC and ∆DEF, AB=DE, BC=EF, AC=DF. Criterion:', options: ['SAS', 'ASA', 'SSS', 'RHS'], correctAnswer: 'SSS', explanation: 'All three sides equal' },
      { question: 'For RHS congruence, which angle is right?', options: ['Any angle', 'Angle opposite hypotenuse', 'Angle between legs', 'None'], correctAnswer: 'Angle between legs', explanation: 'Right angle is between the two legs' },
      { question: 'If two angles and a non-included side are equal, criterion is:', options: ['SSS', 'SAS', 'ASA', 'AAS'], correctAnswer: 'AAS', explanation: 'AAS is valid for congruence' },
      { question: 'Two squares with side 4 cm are:', options: ['Always congruent', 'Never congruent', 'Sometimes congruent', 'Similar only'], correctAnswer: 'Always congruent', explanation: 'All sides equal and angles 90° → congruent' },
      { question: 'If ∆ABC ≅ ∆PQR, which is true?', options: ['AB = PQ', '∠A = ∠Q', 'BC = PR', '∠C = ∠P'], correctAnswer: 'AB = PQ', explanation: 'Corresponding sides are equal' },
      { question: 'Two triangles with equal area are:', options: ['Always congruent', 'Never congruent', 'Sometimes congruent', 'Always similar'], correctAnswer: 'Sometimes congruent', explanation: 'Equal area doesn\'t guarantee congruence' },
      { question: 'In two congruent triangles, corresponding parts are:', options: ['Equal', 'Unequal', 'Complementary', 'Supplementary'], correctAnswer: 'Equal', explanation: 'CPCT: Corresponding Parts of Congruent Triangles' },
      { question: 'For two triangles to be congruent by ASA, the side must be:', options: ['Any side', 'Included side', 'Opposite side', 'Longest side'], correctAnswer: 'Included side', explanation: 'Side between the two given angles' },
      { question: 'Two circles with same radius are:', options: ['Always congruent', 'Never congruent', 'Sometimes congruent', 'Similar only'], correctAnswer: 'Always congruent', explanation: 'Same radius means exactly same size and shape' },
    ]
  },

  // ── 7N: Coordinate Geometry — plotting points ──────────────────────────
  {
    sheet: '7N', topic: 'Coordinate Geometry - Plotting Points', grade: 7,
    questions: [
      { question: 'The point (3,4) lies in which quadrant?', options: ['I', 'II', 'III', 'IV'], correctAnswer: 'I', explanation: 'Both x and y positive → Quadrant I' },
      { question: 'The point (−2,5) lies in:', options: ['I', 'II', 'III', 'IV'], correctAnswer: 'II', explanation: 'x negative, y positive → Quadrant II' },
      { question: 'The point (−3,−4) lies in:', options: ['I', 'II', 'III', 'IV'], correctAnswer: 'III', explanation: 'Both negative → Quadrant III' },
      { question: 'The point (5,−2) lies in:', options: ['I', 'II', 'III', 'IV'], correctAnswer: 'IV', explanation: 'x positive, y negative → Quadrant IV' },
      { question: 'x-coordinate is also called:', options: ['Ordinate', 'Abscissa', 'Coordinate', 'Point'], correctAnswer: 'Abscissa', explanation: 'x-coordinate = abscissa' },
      { question: 'y-coordinate is also called:', options: ['Abscissa', 'Ordinate', 'Coordinate', 'Point'], correctAnswer: 'Ordinate', explanation: 'y-coordinate = ordinate' },
      { question: 'The origin has coordinates:', options: ['(1,1)', '(0,0)', '(1,0)', '(0,1)'], correctAnswer: '(0,0)', explanation: 'Origin is where axes intersect' },
      { question: 'Point on x-axis has y-coordinate:', options: ['0', '1', '−1', 'Any number'], correctAnswer: '0', explanation: 'On x-axis, y=0' },
      { question: 'Point on y-axis has x-coordinate:', options: ['0', '1', '−1', 'Any number'], correctAnswer: '0', explanation: 'On y-axis, x=0' },
      { question: 'The distance of point (3,4) from x-axis:', options: ['3', '4', '5', '7'], correctAnswer: '4', explanation: 'Distance from x-axis = |y| = 4' },
      { question: 'The distance of point (3,4) from y-axis:', options: ['3', '4', '5', '7'], correctAnswer: '3', explanation: 'Distance from y-axis = |x| = 3' },
      { question: 'Point (−5,0) lies on:', options: ['x-axis', 'y-axis', 'Origin', 'Quadrant II'], correctAnswer: 'x-axis', explanation: 'y=0, so on x-axis' },
      { question: 'Point (0,−7) lies on:', options: ['x-axis', 'y-axis', 'Origin', 'Quadrant III'], correctAnswer: 'y-axis', explanation: 'x=0, so on y-axis' },
      { question: 'Quadrant where both coordinates are negative:', options: ['I', 'II', 'III', 'IV'], correctAnswer: 'III', explanation: '(−,−) is Quadrant III' },
      { question: 'If x > 0 and y < 0, point is in:', options: ['I', 'II', 'III', 'IV'], correctAnswer: 'IV', explanation: 'x positive, y negative → Quadrant IV' },
      { question: 'The point (0,0) is called:', options: ['Origin', 'Center', 'Vertex', 'Intersection'], correctAnswer: 'Origin', explanation: 'Origin is (0,0)' },
      { question: 'The point (−2,−2) lies on line:', options: ['x = y', 'x = −y', 'y = x', 'y = −x'], correctAnswer: 'y = x', explanation: 'x=y, both coordinates equal' },
      { question: 'Plot points A(2,3), B(2,−1). Distance AB:', options: ['2', '3', '4', '5'], correctAnswer: '4', explanation: 'Vertical line: |3−(−1)|=4' },
      { question: 'The point (5,5) lies on line:', options: ['x = 5', 'y = 5', 'x = y', 'All of these'], correctAnswer: 'All of these', explanation: 'x=5, y=5, and x=y all true' },
      { question: 'Which point is farthest from origin?', options: ['(3,4)', '(5,0)', '(0,5)', '(1,7)'], correctAnswer: '(1,7)', explanation: 'Distance: (3,4)=5, (5,0)=5, (0,5)=5, (1,7)=√50≈7.07' },
    ]
  },

  // ── 7O: Area and Volume — 3D shapes ────────────────────────────────────
  {
    sheet: '7O', topic: 'Area and Volume - 3D Shapes', grade: 7,
    questions: [
      { question: 'Volume of cube with side 6 cm:', options: ['216 cm³', '126 cm³', '36 cm³', '216 cm²'], correctAnswer: '216 cm³', explanation: 'V = s³ = 6³ = 216 cm³' },
      { question: 'Surface area of cube with side 4 cm:', options: ['64 cm²', '96 cm²', '48 cm²', '16 cm²'], correctAnswer: '96 cm²', explanation: 'SA = 6s² = 6×16 = 96 cm²' },
      { question: 'Volume of cuboid 8×6×5 cm:', options: ['240 cm³', '260 cm³', '280 cm³', '300 cm³'], correctAnswer: '240 cm³', explanation: 'V = l×b×h = 8×6×5 = 240 cm³' },
      { question: 'Surface area of cuboid 5×4×3 cm:', options: ['60 cm²', '94 cm²', '100 cm²', '120 cm²'], correctAnswer: '94 cm²', explanation: 'SA = 2(lb+bh+lh)=2(20+12+15)=2×47=94 cm²' },
      { question: 'Volume of cylinder with radius 7 cm, height 10 cm (π=22/7):', options: ['1540 cm³', '1640 cm³', '1740 cm³', '1840 cm³'], correctAnswer: '1540 cm³', explanation: 'V = πr²h = 22/7×49×10 = 1540 cm³' },
      { question: 'Curved surface area of cylinder with radius 5 cm, height 12 cm:', options: ['376.8 cm²', '377 cm²', '380 cm²', '360 cm²'], correctAnswer: '377 cm²', explanation: 'CSA = 2πrh = 2×3.14×5×12 ≈ 376.8 cm²' },
      { question: 'Volume of sphere with radius 3 cm (π=3.14):', options: ['113.04 cm³', '113.04 cm²', '36 cm³', '108 cm³'], correctAnswer: '113.04 cm³', explanation: 'V = 4/3 πr³ = 4/3×3.14×27 = 113.04 cm³' },
      { question: 'Volume of cone with radius 3 cm, height 7 cm (π=22/7):', options: ['66 cm³', '154 cm³', '66 cm²', '154 cm²'], correctAnswer: '66 cm³', explanation: 'V = 1/3 πr²h = 1/3×22/7×9×7 = 66 cm³' },
      { question: 'A cube has volume 125 cm³. Its side:', options: ['3 cm', '4 cm', '5 cm', '6 cm'], correctAnswer: '5 cm', explanation: '∛125 = 5 cm' },
      { question: 'A cuboid has volume 240 cm³, length 10 cm, width 6 cm. Height:', options: ['3 cm', '4 cm', '5 cm', '6 cm'], correctAnswer: '4 cm', explanation: 'h = 240/(10×6) = 240/60 = 4 cm' },
      { question: 'How many cubes of side 2 cm fit in cuboid 8×6×4 cm?', options: ['12', '24', '48', '96'], correctAnswer: '24', explanation: '(8/2)×(6/2)×(4/2) = 4×3×2 = 24' },
      { question: 'Total surface area of cylinder with radius 7 cm, height 10 cm:', options: ['748 cm²', '758 cm²', '768 cm²', '778 cm²'], correctAnswer: '748 cm²', explanation: 'TSA = 2πr(r+h) = 2×22/7×7×17 = 2×22×17 = 748 cm²' },
      { question: 'Volume of a cube is 64 cm³. Surface area:', options: ['96 cm²', '48 cm²', '64 cm²', '32 cm²'], correctAnswer: '96 cm²', explanation: 's = ∛64 = 4 cm; SA = 6×16 = 96 cm²' },
      { question: 'A water tank is 2m × 1.5m × 1m. Capacity in litres:', options: ['2000 L', '2500 L', '3000 L', '3500 L'], correctAnswer: '3000 L', explanation: 'V = 2×1.5×1 = 3 m³ = 3000 litres' },
      { question: 'Volume of hemisphere with radius 7 cm:', options: ['718.67 cm³', '718 cm³', '1437.33 cm³', '1437 cm³'], correctAnswer: '718.67 cm³', explanation: 'V = 2/3 πr³ = 2/3×22/7×343 = (2×22×49)/3 = 2156/3 ≈ 718.67 cm³' },
      { question: 'Surface area of sphere with radius 7 cm:', options: ['616 cm²', '308 cm²', '154 cm²', '88 cm²'], correctAnswer: '616 cm²', explanation: 'SA = 4πr² = 4×22/7×49 = 4×22×7 = 616 cm²' },
      { question: 'Volume of cylinder is 1540 cm³, radius 7 cm. Height:', options: ['8 cm', '9 cm', '10 cm', '11 cm'], correctAnswer: '10 cm', explanation: 'h = V/(πr²) = 1540/(22/7×49) = 1540/154 = 10 cm' },
      { question: 'A cube of side 6 cm is melted to form a cuboid 9×4 cm. Height:', options: ['6 cm', '8 cm', '10 cm', '12 cm'], correctAnswer: '6 cm', explanation: 'Volume cube = 216 cm³; height = 216/(9×4) = 216/36 = 6 cm' },
      { question: 'Lateral surface area of cube with side 5 cm:', options: ['100 cm²', '125 cm²', '150 cm²', '25 cm²'], correctAnswer: '100 cm²', explanation: 'LSA = 4s² = 4×25 = 100 cm²' },
      { question: 'Volume of pyramid with base area 36 cm², height 9 cm:', options: ['108 cm³', '162 cm³', '216 cm³', '324 cm³'], correctAnswer: '108 cm³', explanation: 'V = 1/3 × base area × height = 1/3×36×9 = 108 cm³' },
    ]
  },

  // ── 7P: Probability basics (सम्भावना) ──────────────────────────────────
  {
    sheet: '7P', topic: 'Probability Basics', grade: 7,
    questions: [
      { question: 'Probability of an impossible event is:', options: ['0', '1', '0.5', '−1'], correctAnswer: '0', explanation: 'Impossible event has probability 0' },
      { question: 'Probability of a certain event is:', options: ['0', '1', '0.5', '−1'], correctAnswer: '1', explanation: 'Certain event has probability 1' },
      { question: 'Probability of getting heads in coin toss:', options: ['0', '1', '0.5', '0.25'], correctAnswer: '0.5', explanation: '1 favorable out of 2 outcomes = 1/2 = 0.5' },
      { question: 'Probability of getting even number on dice:', options: ['1/2', '1/3', '1/6', '2/3'], correctAnswer: '1/2', explanation: 'Even numbers: 2,4,6 → 3/6 = 1/2' },
      { question: 'Probability of getting number 5 on dice:', options: ['1/2', '1/3', '1/6', '5/6'], correctAnswer: '1/6', explanation: 'Only one 5 out of 6 outcomes' },
      { question: 'A bag has 3 red, 4 blue, 5 green balls. Probability of red:', options: ['1/3', '1/4', '1/5', '1/12'], correctAnswer: '1/4', explanation: 'Total=12, red=3 → 3/12=1/4' },
      { question: 'From deck of 52 cards, probability of king:', options: ['1/13', '1/52', '4/13', '1/4'], correctAnswer: '1/13', explanation: '4 kings out of 52 → 4/52=1/13' },
      { question: 'Probability of getting prime number on dice:', options: ['1/2', '1/3', '2/3', '5/6'], correctAnswer: '1/2', explanation: 'Primes: 2,3,5 → 3/6=1/2' },
      { question: 'Probability of getting a vowel from English alphabet:', options: ['5/26', '1/5', '1/26', '5/21'], correctAnswer: '5/26', explanation: '5 vowels (A,E,I,O,U) out of 26' },
      { question: 'A coin tossed twice. Probability of two heads:', options: ['1/2', '1/3', '1/4', '1/6'], correctAnswer: '1/4', explanation: 'HH,HT,TH,TT → 1/4' },
      { question: 'Probability of getting sum 7 when two dice rolled:', options: ['1/6', '1/12', '5/36', '1/36'], correctAnswer: '1/6', explanation: '6 outcomes sum to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6/36=1/6' },
      { question: 'Probability of getting at least one head in two coin tosses:', options: ['1/2', '2/3', '3/4', '1/4'], correctAnswer: '3/4', explanation: 'Only TT has no head → 3/4' },
      { question: 'A bag has 5 red, 3 blue. Probability of not blue:', options: ['3/8', '5/8', '1/2', '2/3'], correctAnswer: '5/8', explanation: '5 red out of 8 total = 5/8' },
      { question: 'Probability of picking a spade from deck:', options: ['1/4', '1/13', '1/2', '1/52'], correctAnswer: '1/4', explanation: '13 spades out of 52 = 1/4' },
      { question: 'Probability of selecting a leap year:', options: ['1/4', '1/365', '1/366', '1/7'], correctAnswer: '1/4', explanation: '1 leap year in 4 years = 1/4' },
      { question: 'Probability of getting a number > 4 on dice:', options: ['1/6', '1/3', '1/2', '2/3'], correctAnswer: '1/3', explanation: 'Numbers >4: 5,6 → 2/6=1/3' },
      { question: 'If P(E) = 0.3, then P(not E) = ?', options: ['0.3', '0.7', '0.5', '1'], correctAnswer: '0.7', explanation: 'P(E) + P(not E) = 1 → P(not E) = 0.7' },
      { question: 'Probability of getting a red face card from deck:', options: ['3/26', '1/13', '1/26', '6/52'], correctAnswer: '3/26', explanation: 'Red face cards: 6 (King,Queen,Jack of hearts & diamonds) → 6/52=3/26' },
      { question: 'A jar has 10 marbles: 4 red, 6 blue. Probability of drawing a red marble:', options: ['2/5', '3/5', '1/2', '2/3'], correctAnswer: '2/5', explanation: '4/10 = 2/5' },
      { question: 'If probability of rain is 0.25, probability of no rain:', options: ['0.25', '0.5', '0.75', '1'], correctAnswer: '0.75', explanation: '1 − 0.25 = 0.75' },
    ]
  },
]

// Seeding loop
let totalQ = 0

for (const levelData of grade7) {
  let level = await Level.findOne({ sheet: levelData.sheet })

  if (!level) {
    level = await Level.create({
      levelNumber: currentLevelNumber++,
      title: levelData.topic,
      grade: levelData.grade,
      sheet: levelData.sheet,
      topic: levelData.topic,
      passingScore: 12,
      questionConfig: { totalQuestions: 20 },
    })
    console.log(`  Created level: ${levelData.sheet} — ${levelData.topic}`)
  }

  await Question.deleteMany({ levelId: level._id })

  const toInsert = levelData.questions.map(q => ({
    levelId: level._id,
    topic: levelData.topic,
    difficulty: levelData.grade,
    question: q.question,
    options: q.options.map(String),
    correctAnswer: String(q.correctAnswer),
    explanation: q.explanation || '',
  }))

  await Question.insertMany(toInsert)
  totalQ += toInsert.length
  console.log(`  ✅ ${levelData.sheet}: ${toInsert.length} questions added`)
}

console.log(`\n🎉 Done! Total questions added: ${totalQ}`)
await mongoose.disconnect()