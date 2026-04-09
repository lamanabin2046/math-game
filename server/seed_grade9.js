import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Level from './models/Level.js'
import Question from './models/Question.js'

// ✅ CONFIG AND CONNECT FIRST — BEFORE ANY DB OPERATIONS
dotenv.config()
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mathgame')
console.log('✅ Connected to MongoDB')

// Clean ONLY grade 9 data
await Level.deleteMany({ grade: 9 })
await Question.deleteMany({ grade: 9 })
console.log('🧹 Cleared existing Grade 9 data\n')

// Get next available level number (continues from grade 6)
const maxLevel = await Level.findOne().sort({ levelNumber: -1 })
let currentLevelNumber = (maxLevel?.levelNumber || 0) + 1
console.log(`📌 Starting levelNumber from: ${currentLevelNumber}\n`)


const seed_grade9 = [
  // ── 9A: REAL NUMBER SYSTEM ────────────────────────────────────────
  {
    sheet: '9A', topic: 'Real Number System', grade: 9,
    questions: [
      { question: 'Which of the following is an irrational number?', options: ['√2', '√4', '0.5', '2/3'], correctAnswer: '√2' },
      { question: 'The set of natural numbers (N) starts from:', options: ['1', '0', '-1', 'None'], correctAnswer: '1' },
      { question: 'Is the number 0.333... (recurring) rational?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Which is a terminating decimal?', options: ['1/4', '1/3', '1/7', '1/9'], correctAnswer: '1/4' },
      { question: 'The additive inverse of -10 is:', options: ['10', '-10', '0', '1'], correctAnswer: '10' },
      { question: 'The multiplicative inverse of 2/3 is:', options: ['3/2', '-2/3', '1', '0'], correctAnswer: '3/2' },
      { question: 'Every integer is also a rational number.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Smallest prime number is:', options: ['2', '1', '3', '0'], correctAnswer: '2' },
      { question: 'Value of |-5| is:', options: ['5', '-5', '0', '1'], correctAnswer: '5' },
      { question: 'Which is a whole number but not a natural number?', options: ['0', '1', '2', '5'], correctAnswer: '0' },
      { question: 'Sum of two rational numbers is always rational.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'The square root of a non-perfect square is:', options: ['Irrational', 'Rational', 'Integer', 'Zero'], correctAnswer: 'Irrational' },
      { question: 'π (Pi) is a/an ___ number.', options: ['Irrational', 'Rational', 'Whole', 'Natural'], correctAnswer: 'Irrational' },
      { question: 'Decimal form of 1/5 is:', options: ['0.2', '0.5', '0.1', '0.25'], correctAnswer: '0.2' },
      { question: 'Is √9 rational or irrational?', options: ['Rational', 'Irrational'], correctAnswer: 'Rational' },
      { question: 'Which number is neither positive nor negative?', options: ['0', '1', '-1', 'None'], correctAnswer: '0' },
      { question: 'Product of a rational (non-zero) and irrational number is:', options: ['Irrational', 'Rational', 'Zero', 'One'], correctAnswer: 'Irrational' },
      { question: 'The value of √-16 in the real number system is:', options: ['Undefined', '4', '-4', '0'], correctAnswer: 'Undefined' },
      { question: 'Irrational numbers cannot be written as p/q.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Common denominator of 1/2 and 1/3 is:', options: ['6', '5', '1', '2'], correctAnswer: '6' }
    ]
  },

  // ── 9B: INDICES — LAWS ─────────────────────────────────────────────
  {
    sheet: '9B', topic: 'Indices Laws', grade: 9,
    questions: [
      { question: 'aᵐ × aⁿ = ?', options: ['aᵐ⁺ⁿ', 'aᵐⁿ', 'aᵐ⁻ⁿ', '2a'], correctAnswer: 'aᵐ⁺ⁿ' },
      { question: 'aᵐ ÷ aⁿ = ?', options: ['aᵐ⁻ⁿ', 'aᵐ⁺ⁿ', 'aᵐⁿ', '1'], correctAnswer: 'aᵐ⁻ⁿ' },
      { question: '(aᵐ)ⁿ = ?', options: ['aᵐⁿ', 'aᵐ⁺ⁿ', 'aᵐ/ⁿ', 'a'], correctAnswer: 'aᵐⁿ' },
      { question: 'a⁰ (where a≠0) = ?', options: ['1', '0', 'a', 'undefined'], correctAnswer: '1' },
      { question: 'a⁻ᵐ = ?', options: ['1/aᵐ', '-aᵐ', 'm/a', '0'], correctAnswer: '1/aᵐ' },
      { question: 'Value of 2³?', options: ['8', '6', '4', '16'], correctAnswer: '8' },
      { question: 'Value of 10⁻¹?', options: ['0.1', '10', '1', '-10'], correctAnswer: '0.1' },
      { question: 'Value of (2²)³?', options: ['64', '32', '16', '12'], correctAnswer: '64' },
      { question: 'Simplify: x⁵ ÷ x²', options: ['x³', 'x⁷', 'x¹⁰', 'x'], correctAnswer: 'x³' },
      { question: 'Value of 100⁰ + 5⁰?', options: ['2', '1', '105', '0'], correctAnswer: '2' },
      { question: 'If 2ˣ = 16, then x = ?', options: ['4', '3', '5', '8'], correctAnswer: '4' },
      { question: 'Value of (1/3)⁻²?', options: ['9', '3', '1/9', '6'], correctAnswer: '9' },
      { question: 'Simplify: (ab)³', options: ['a³b³', 'ab³', 'a³b', '3ab'], correctAnswer: 'a³b³' },
      { question: 'Value of 8^(1/3)?', options: ['2', '4', '8', '1'], correctAnswer: '2' },
      { question: 'Value of 25^(1/2)?', options: ['5', '12.5', '50', '1'], correctAnswer: '5' },
      { question: 'Simplify: (x²)⁰', options: ['1', 'x²', '0', '2x'], correctAnswer: '1' },
      { question: 'Value of 2⁻³?', options: ['1/8', '8', '1/6', '-8'], correctAnswer: '1/8' },
      { question: 'Simplify: 3² × 3⁻²', options: ['1', '9', '0', '81'], correctAnswer: '1' },
      { question: 'If 3ˣ = 27, x is:', options: ['3', '9', '2', '4'], correctAnswer: '3' },
      { question: 'Simplify: (2x)⁰ + 2x⁰', options: ['3', '1', '2', '4'], correctAnswer: '3' }
    ]
  },

  // ── 9C: SURDS — SIMPLIFICATION ────────────────────────────────────
  {
    sheet: '9C', topic: 'Surds Simplification', grade: 9,
    questions: [
      { question: 'Simplify √18:', options: ['3√2', '2√3', '9', '6'], correctAnswer: '3√2' },
      { question: 'Pure surd form of 2√3:', options: ['√12', '√6', '√18', '√36'], correctAnswer: '√12' },
      { question: 'Simplify √50:', options: ['5√2', '2√5', '25√2', '10'], correctAnswer: '5√2' },
      { question: 'Order of the surd ∛5:', options: ['3', '2', '5', '1'], correctAnswer: '3' },
      { question: 'Which is a pure surd?', options: ['√15', '2√5', '3√2', '10√3'], correctAnswer: '√15' },
      { question: 'Simplify √75:', options: ['5√3', '3√5', '15', '25'], correctAnswer: '5√3' },
      { question: 'Mixed surd form of √8:', options: ['2√2', '4√2', '2', '8'], correctAnswer: '2√2' },
      { question: 'Is √16 a surd?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Simplify √12:', options: ['2√3', '3√2', '4√3', '6'], correctAnswer: '2√3' },
      { question: 'Order of √x:', options: ['2', '1', '0', 'x'], correctAnswer: '2' },
      { question: 'Simplify √20:', options: ['2√5', '5√2', '4√5', '10'], correctAnswer: '2√5' },
      { question: 'Simplify ∛54:', options: ['3∛2', '2∛3', '6', '9'], correctAnswer: '3∛2' },
      { question: 'Value of (√7)²?', options: ['7', '49', '√14', '1'], correctAnswer: '7' },
      { question: 'Pure surd of 3√2:', options: ['√18', '√12', '√6', '√36'], correctAnswer: '√18' },
      { question: 'Simplify √200:', options: ['10√2', '20', '2√10', '100'], correctAnswer: '10√2' },
      { question: 'Simplify √45:', options: ['3√5', '5√3', '9√5', '15'], correctAnswer: '3√5' },
      { question: 'Which index represents a square root?', options: ['1/2', '2', '1/3', '1'], correctAnswer: '1/2' },
      { question: 'Simplify ∛128:', options: ['4∛2', '2∛4', '8', '16'], correctAnswer: '4∛2' },
      { question: 'Simplify √27:', options: ['3√3', '9', '√9', '3'], correctAnswer: '3√3' },
      { question: 'Is √2 + √3 = √5?', options: ['No', 'Yes'], correctAnswer: 'No' }
    ]
  },

  // ── 9D: SURDS — OPERATIONS ────────────────────────────────────────
  {
    sheet: '9D', topic: 'Surds Operations', grade: 9,
    questions: [
      { question: '3√2 + 5√2 = ?', options: ['8√2', '15√2', '8', '15'], correctAnswer: '8√2' },
      { question: '√2 × √3 = ?', options: ['√6', '√5', '6', '5'], correctAnswer: '√6' },
      { question: 'Rationalize 1/√2:', options: ['√2/2', '2', '√2', '1'], correctAnswer: '√2/2' },
      { question: 'Simplify: (√5 + √2)(√5 - √2)', options: ['3', '7', '√3', '10'], correctAnswer: '3' },
      { question: '10√3 - 4√3 = ?', options: ['6√3', '14√3', '6', '14'], correctAnswer: '6√3' },
      { question: '√10 ÷ √2 = ?', options: ['√5', '5', '√8', '√20'], correctAnswer: '√5' },
      { question: '2√3 × 3√2 = ?', options: ['6√6', '5√5', '6√5', '36'], correctAnswer: '6√6' },
      { question: 'Rationalizing factor of √3 + 1 is:', options: ['√3 - 1', '√3 + 1', '1', '√3'], correctAnswer: '√3 - 1' },
      { question: 'Simplify: √12 + √3', options: ['3√3', '√15', '2√3', '5'], correctAnswer: '3√3' },
      { question: 'Value of (2√5)²?', options: ['20', '10', '100', '25'], correctAnswer: '20' },
      { question: 'Simplify: √50 - √18', options: ['2√2', '8√2', '√32', '4'], correctAnswer: '2√2' },
      { question: 'Value of 1/(√3 - √2) after rationalizing:', options: ['√3 + √2', '√3 - √2', '1', '5'], correctAnswer: '√3 + √2' },
      { question: 'Simplify: ∛2 × ∛4', options: ['2', '8', '∛6', '4'], correctAnswer: '2' },
      { question: 'Can we add √2 and ∛2?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Simplify: 4√5 ÷ 2√5', options: ['2', '2√5', '8', '1'], correctAnswer: '2' },
      { question: 'Value of (√3 + 1)²:', options: ['4 + 2√3', '4', '3', '2√3'], correctAnswer: '4 + 2√3' },
      { question: 'Simplify: √2(√3 + √2)', options: ['√6 + 2', '√5 + 2', '√6 + √2', '6'], correctAnswer: '√6 + 2' },
      { question: 'Like surds have same ___ and same radicand.', options: ['Order', 'Coefficient', 'Power', 'Sign'], correctAnswer: 'Order' },
      { question: 'Simplify: 3√20 - 2√45', options: ['0', '√5', '5√5', '1'], correctAnswer: '0' },
      { question: 'Rationalize 3/√3:', options: ['√3', '3', '1', '3√3'], correctAnswer: '√3' }
    ]
  },

  // ── 9E: ALGEBRAIC EXPRESSIONS — ADVANCED ──────────────────────────
  {
    sheet: '9E', topic: 'Algebraic Expressions', grade: 9,
    questions: [
      { question: 'Expand: (a + b)³', options: ['a³+3a²b+3ab²+b³', 'a³+b³', 'a³+3ab+b³', 'a²+2ab+b²'], correctAnswer: 'a³+3a²b+3ab²+b³' },
      { question: 'Expand: (a - b)³', options: ['a³-3a²b+3ab²-b³', 'a³-b³', 'a³-3ab+b³', 'a³-3a²b-3ab²-b³'], correctAnswer: 'a³-3a²b+3ab²-b³' },
      { question: 'If x + 1/x = 4, then x² + 1/x² = ?', options: ['14', '16', '18', '12'], correctAnswer: '14' },
      { question: 'Expand: (x + y + z)²', options: ['x²+y²+z²+2xy+2yz+2zx', 'x²+y²+z²', 'x²+y²+z²+xy+yz+zx', 'None'], correctAnswer: 'x²+y²+z²+2xy+2yz+2zx' },
      { question: 'Value of (101)² using algebra?', options: ['10201', '10101', '10001', '10200'], correctAnswer: '10201' },
      { question: 'Simplify: (x+y)(x-y)(x²+y²)', options: ['x⁴-y⁴', 'x⁴+y⁴', 'x²-y²', '(x-y)⁴'], correctAnswer: 'x⁴-y⁴' },
      { question: 'If a+b=5 and ab=6, find a²+b².', options: ['13', '25', '19', '7'], correctAnswer: '13' },
      { question: 'Expand: (2x + 3)²', options: ['4x²+12x+9', '4x²+9', '4x²+6x+9', '2x²+12x+6'], correctAnswer: '4x²+12x+9' },
      { question: 'Factor form of a³ - b³:', options: ['(a-b)(a²+ab+b²)', '(a-b)³', '(a+b)(a²-ab+b²)', 'None'], correctAnswer: '(a-b)(a²+ab+b²)' },
      { question: 'Factor form of a³ + b³:', options: ['(a+b)(a²-ab+b²)', '(a+b)³', '(a-b)(a²+ab+b²)', 'None'], correctAnswer: '(a+b)(a²-ab+b²)' },
      { question: 'If x - 1/x = 3, then x² + 1/x² = ?', options: ['11', '9', '7', '13'], correctAnswer: '11' },
      { question: 'Simplify: (a+b)² - (a-b)²', options: ['4ab', '2a²+2b²', '0', '2ab'], correctAnswer: '4ab' },
      { question: 'Simplify: (a+b)² + (a-b)²', options: ['2(a²+b²)', '4ab', '0', '2ab'], correctAnswer: '2(a²+b²)' },
      { question: 'Find value of 99²:', options: ['9801', '9901', '9701', '10000'], correctAnswer: '9801' },
      { question: 'If a+b+c=0, then a³+b³+c³ = ?', options: ['3abc', '0', 'abc', 'None'], correctAnswer: '3abc' },
      { question: 'Expand: (x - 2y)³', options: ['x³-6x²y+12xy²-8y³', 'x³-8y³', 'x³-6xy+8y³', 'None'], correctAnswer: 'x³-6x²y+12xy²-8y³' },
      { question: 'Simplify: (x+1/x)³', options: ['x³+1/x³+3(x+1/x)', 'x³+1/x³', 'x³+3x+1/x³', 'None'], correctAnswer: 'x³+1/x³+3(x+1/x)' },
      { question: 'Value of (50)² - (49)²:', options: ['99', '1', '100', '49'], correctAnswer: '99' },
      { question: 'Coefficient of x in (x+3)²:', options: ['6', '3', '9', '1'], correctAnswer: '6' },
      { question: 'Is (a+b)² = a² + b²?', options: ['No', 'Yes'], correctAnswer: 'No' }
    ]
  },

  // ── 9F: FACTORIZATION — ADVANCED ──────────────────────────────────
  {
    sheet: '9F', topic: 'Factorization', grade: 9,
    questions: [
      { question: 'Factorize x² - 16:', options: ['(x-4)(x+4)', '(x-4)²', '(x+4)²', 'x(x-16)'], correctAnswer: '(x-4)(x+4)' },
      { question: 'Factorize x² + 5x + 6:', options: ['(x+2)(x+3)', '(x-2)(x-3)', '(x+1)(x+6)', '(x+5)(x+1)'], correctAnswer: '(x+2)(x+3)' },
      { question: 'Factorize x³ - 8:', options: ['(x-2)(x²+2x+4)', '(x-2)³', '(x+2)(x²-2x+4)', '(x-8)(x+1)'], correctAnswer: '(x-2)(x²+2x+4)' },
      { question: 'Factorize a⁴ + a²b² + b⁴:', options: ['(a²+ab+b²)(a²-ab+b²)', '(a²+b²)²', '(a²-b²)²', 'None'], correctAnswer: '(a²+ab+b²)(a²-ab+b²)' },
      { question: 'Factorize x² - 10x + 25:', options: ['(x-5)²', '(x+5)²', '(x-5)(x+5)', 'x(x-10)'], correctAnswer: '(x-5)²' },
      { question: 'Common factor in 4x²y and 6xy²?', options: ['2xy', 'xy', '4xy', '2x²y²'], correctAnswer: '2xy' },
      { question: 'Factorize x⁴ + 4:', options: ['(x²+2+2x)(x²+2-2x)', '(x²+2)²', '(x²-2)²', 'None'], correctAnswer: '(x²+2+2x)(x²+2-2x)' },
      { question: 'Factorize 2x² - 18:', options: ['2(x-3)(x+3)', '2(x-9)', '(2x-6)(x+3)', 'None'], correctAnswer: '2(x-3)(x+3)' },
      { question: 'Factorize x³ + 1:', options: ['(x+1)(x²-x+1)', '(x+1)³', '(x-1)(x²+x+1)', '(x+1)(x²-1)'], correctAnswer: '(x+1)(x²-x+1)' },
      { question: 'Factorize x² - x - 12:', options: ['(x-4)(x+3)', '(x+4)(x-3)', '(x-6)(x+2)', 'None'], correctAnswer: '(x-4)(x+3)' },
      { question: 'Factorize a² - b² - 2bc - c²:', options: ['(a-b-c)(a+b+c)', '(a+b+c)(a-b+c)', 'None', 'Both'], correctAnswer: '(a-b-c)(a+b+c)' },
      { question: 'Factorize x² + 2xy + y² - 9:', options: ['(x+y-3)(x+y+3)', '(x+y+3)²', '(x-y-3)(x-y+3)', 'None'], correctAnswer: '(x+y-3)(x+y+3)' },
      { question: 'Factorize 8x³ - 27:', options: ['(2x-3)(4x²+6x+9)', '(2x+3)(4x²-6x+9)', '(2x-3)³', 'None'], correctAnswer: '(2x-3)(4x²+6x+9)' },
      { question: 'Factorize m² - n² - m + n:', options: ['(m-n)(m+n-1)', '(m-n)(m+n+1)', '(m+n)(m-n)', 'None'], correctAnswer: '(m-n)(m+n-1)' },
      { question: 'Factorize x⁴ + x²y² + y⁴:', options: ['(x²+xy+y²)(x²-xy+y²)', '(x²+y²)²', 'None', 'Both'], correctAnswer: '(x²+xy+y²)(x²-xy+y²)' },
      { question: 'Factorize x² + 7x + 10:', options: ['(x+2)(x+5)', '(x-2)(x-5)', '(x+1)(x+10)', 'None'], correctAnswer: '(x+2)(x+5)' },
      { question: 'Factorize 1 - 64a³:', options: ['(1-4a)(1+4a+16a²)', '(1-4a)³', '(1+4a)³', 'None'], correctAnswer: '(1-4a)(1+4a+16a²)' },
      { question: 'Factorize p² - q² + 2p + 1:', options: ['(p+1-q)(p+1+q)', '(p-1+q)(p-1-q)', 'None', 'Both'], correctAnswer: '(p+1-q)(p+1+q)' },
      { question: 'Factorize a³ + 125:', options: ['(a+5)(a²-5a+25)', '(a-5)(a²+5a+25)', '(a+5)³', 'None'], correctAnswer: '(a+5)(a²-5a+25)' },
      { question: 'Factorize x² - y²:', options: ['(x-y)(x+y)', '(x-y)²', '(x+y)²', 'x²-y²'], correctAnswer: '(x-y)(x+y)' }
    ]
  },

  // ── 9G: QUADRATIC EQUATIONS — FACTORIZATION ───────────────────────
  {
    sheet: '9G', topic: 'Quadratic Factorization', grade: 9,
    questions: [
      { question: 'Solve x² - 5x + 6 = 0:', options: ['2, 3', '-2, -3', '1, 6', '5, 6'], correctAnswer: '2, 3' },
      { question: 'Solve x² - 9 = 0:', options: ['3, -3', '9, -9', '0, 3', '3, 3'], correctAnswer: '3, -3' },
      { question: 'Solve x² + 4x = 0:', options: ['0, -4', '0, 4', '4, -4', 'None'], correctAnswer: '0, -4' },
      { question: 'Solve x² + 7x + 10 = 0:', options: ['-2, -5', '2, 5', '-7, 10', '0, 0'], correctAnswer: '-2, -5' },
      { question: 'If (x-5)(x+2) = 0, roots are:', options: ['5, -2', '-5, 2', '5, 2', '0, 0'], correctAnswer: '5, -2' },
      { question: 'Solve x² - x - 6 = 0:', options: ['3, -2', '-3, 2', '1, 6', 'None'], correctAnswer: '3, -2' },
      { question: 'Solve x² - 16 = 0:', options: ['4, -4', '8, -8', '0, 16', '4, 4'], correctAnswer: '4, -4' },
      { question: 'Solve x² + 6x + 9 = 0:', options: ['-3, -3', '3, 3', '0, 9', '-3, 3'], correctAnswer: '-3, -3' },
      { question: 'Solve x² - 10x + 21 = 0:', options: ['3, 7', '-3, -7', '1, 21', 'None'], correctAnswer: '3, 7' },
      { question: 'Roots of x(x-3) = 0 are:', options: ['0, 3', '0, -3', '3, 3', 'None'], correctAnswer: '0, 3' },
      { question: 'Solve x² - 2x + 1 = 0:', options: ['1, 1', '-1, -1', '0, 1', 'None'], correctAnswer: '1, 1' },
      { question: 'Solve x² - 8x + 15 = 0:', options: ['3, 5', '-3, -5', '1, 15', 'None'], correctAnswer: '3, 5' },
      { question: 'Solve x² + 5x + 4 = 0:', options: ['-1, -4', '1, 4', '0, 5', 'None'], correctAnswer: '-1, -4' },
      { question: 'Solve 2x² - 8 = 0:', options: ['2, -2', '4, -4', '0, 4', 'None'], correctAnswer: '2, -2' },
      { question: 'Solve x² - 11x + 30 = 0:', options: ['5, 6', '-5, -6', '1, 30', 'None'], correctAnswer: '5, 6' },
      { question: 'Solve x² + x - 12 = 0:', options: ['3, -4', '-3, 4', '2, 6', 'None'], correctAnswer: '3, -4' },
      { question: 'Solve x² - 49 = 0:', options: ['7, -7', '0, 49', '7, 7', 'None'], correctAnswer: '7, -7' },
      { question: 'Solve x² - 12x + 36 = 0:', options: ['6, 6', '-6, -6', '0, 12', 'None'], correctAnswer: '6, 6' },
      { question: 'Solve x² + 3x = 0:', options: ['0, -3', '0, 3', '3, -3', 'None'], correctAnswer: '0, -3' },
      { question: 'Solve x² - 20x + 100 = 0:', options: ['10, 10', '-10, -10', '0, 20', 'None'], correctAnswer: '10, 10' }
    ]
  },

  // ── 9H: QUADRATIC EQUATIONS — FORMULA METHOD ──────────────────────
  {
    sheet: '9H', topic: 'Formula Method', grade: 9,
    questions: [
      { question: 'Standard form: ax² + bx + c = 0. What is x?', options: ['[-b ± √(b²-4ac)] / 2a', '[-b ± √(b²+4ac)] / 2a', 'b/2a', 'None'], correctAnswer: '[-b ± √(b²-4ac)] / 2a' },
      { question: 'The term b² - 4ac is called:', options: ['Discriminant', 'Determinant', 'Derivative', 'Degree'], correctAnswer: 'Discriminant' },
      { question: 'If b² - 4ac > 0, the roots are:', options: ['Real and Unequal', 'Real and Equal', 'Imaginary', 'Zero'], correctAnswer: 'Real and Unequal' },
      { question: 'If b² - 4ac = 0, the roots are:', options: ['Real and Equal', 'Real and Unequal', 'Imaginary', 'None'], correctAnswer: 'Real and Equal' },
      { question: 'If b² - 4ac < 0, the roots are:', options: ['Imaginary', 'Real', 'Equal', 'Positive'], correctAnswer: 'Imaginary' },
      { question: 'In 2x² - 4x + 1 = 0, what is "a"?', options: ['2', '-4', '1', 'x'], correctAnswer: '2' },
      { question: 'In x² - 5x + 6 = 0, what is "b"?', options: ['-5', '1', '6', '5'], correctAnswer: '-5' },
      { question: 'Value of discriminant for x² - 4x + 4 = 0?', options: ['0', '16', '-16', '8'], correctAnswer: '0' },
      { question: 'Value of discriminant for x² + x + 1 = 0?', options: ['-3', '1', '5', '0'], correctAnswer: '-3' },
      { question: 'Sum of roots of ax² + bx + c = 0 is:', options: ['-b/a', 'c/a', 'b/a', 'a/c'], correctAnswer: '-b/a' },
      { question: 'Product of roots of ax² + bx + c = 0 is:', options: ['c/a', '-b/a', 'a/c', '1'], correctAnswer: 'c/a' },
      { question: 'Solve x² - 3x + 2 = 0 using formula.', options: ['1, 2', '-1, -2', '0, 3', 'None'], correctAnswer: '1, 2' },
      { question: 'A quadratic equation has exactly ___ roots.', options: ['2', '1', '3', 'Infinite'], correctAnswer: '2' },
      { question: 'If discriminant is a perfect square, roots are:', options: ['Rational', 'Irrational', 'Imaginary', 'Equal'], correctAnswer: 'Rational' },
      { question: 'Solve x² - 6x + 9 = 0 using formula.', options: ['3, 3', '-3, -3', '0, 6', 'None'], correctAnswer: '3, 3' },
      { question: 'In 3x² - 5 = 0, what is "b"?', options: ['0', '3', '-5', 'x'], correctAnswer: '0' },
      { question: 'Nature of roots of x² - 5x + 7 = 0:', options: ['Imaginary', 'Real/Equal', 'Real/Unequal', 'None'], correctAnswer: 'Imaginary' },
      { question: 'If roots are 2 and 3, equation is:', options: ['x²-5x+6=0', 'x²+5x+6=0', 'x²-6x+5=0', 'None'], correctAnswer: 'x²-5x+6=0' },
      { question: 'Solve x² + 2x - 8 = 0 using formula.', options: ['2, -4', '-2, 4', '2, 4', 'None'], correctAnswer: '2, -4' },
      { question: 'Maximum degree of quadratic equation is:', options: ['2', '1', '3', '0'], correctAnswer: '2' }
    ]
  },

  // ── 9I: QUADRATIC EQUATIONS — COMPLETING SQUARE ───────────────────
  {
    sheet: '9I', topic: 'Completing Square', grade: 9,
    questions: [
      { question: 'To complete square for x² + 6x, you must add:', options: ['9', '3', '36', '6'], correctAnswer: '9' },
      { question: 'x² + 4x + 4 is a perfect square of:', options: ['(x+2)²', '(x+4)²', '(x-2)²', 'None'], correctAnswer: '(x+2)Normalized' },
      { question: 'To complete square for x² - 10x, add:', options: ['25', '10', '100', '5'], correctAnswer: '25' },
      { question: 'The first step in completing square for ax²+bx+c=0 is:', options: ['Divide by a', 'Add c', 'Multiply by b', 'None'], correctAnswer: 'Divide by a' },
      { question: 'Value to add to x² + 8x:', options: ['16', '8', '64', '4'], correctAnswer: '16' },
      { question: 'x² + 12x + 36 = ?', options: ['(x+6)²', '(x+12)²', '(x-6)²', 'None'], correctAnswer: '(x+6)²' },
      { question: 'Solve x² + 4x - 5 = 0 by completing square.', options: ['1, -5', '-1, 5', '1, 5', 'None'], correctAnswer: '1, -5' },
      { question: 'Value to add to x² - x:', options: ['1/4', '1/2', '1', '2'], correctAnswer: '1/4' },
      { question: 'x² - 2x + 1 is:', options: ['(x-1)²', '(x+1)²', 'x²', '1'], correctAnswer: '(x-1)²' },
      { question: 'Completing square is used to derive:', options: ['Quadratic formula', 'Pythagoras thm', 'Mean', 'None'], correctAnswer: 'Quadratic formula' },
      { question: 'To solve x² + 6x = 7, add 9 to both sides.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'x² + px + (p/2)² = ?', options: ['(x + p/2)²', '(x+p)²', 'p²', 'None'], correctAnswer: '(x + p/2)²' },
      { question: 'Solve x² - 2x - 3 = 0.', options: ['3, -1', '-3, 1', '3, 1', 'None'], correctAnswer: '3, -1' },
      { question: 'If we have x² + 20x, we add:', options: ['100', '20', '400', '10'], correctAnswer: '100' },
      { question: 'The method makes the LHS a:', options: ['Perfect Square', 'Cube', 'Linear eq', 'None'], correctAnswer: 'Perfect Square' },
      { question: 'Solve x² + 2x = 0 by completing square.', options: ['0, -2', '0, 2', '2, -2', 'None'], correctAnswer: '0, -2' },
      { question: 'Value to add for x² + 3x:', options: ['9/4', '3/2', '9', '3'], correctAnswer: '9/4' },
      { question: 'x² + 10x + 25 = 0 means x =:', options: ['-5', '5', '0', 'None'], correctAnswer: '-5' },
      { question: 'Is x² + 4 a perfect square?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Can all quadratic equations be solved this way?', options: ['Yes', 'No'], correctAnswer: 'Yes' }
    ]
  },

  // ── 9J: PROFIT, LOSS, COMMISSION — ADVANCED ───────────────────────
  {
    sheet: '9J', topic: 'Profit Loss Commission', grade: 9,
    questions: [
      { question: 'Profit = ?', options: ['SP - CP', 'CP - SP', 'MP - SP', 'None'], correctAnswer: 'SP - CP' },
      { question: 'Loss % = ?', options: ['(Loss/CP)×100', '(Loss/SP)×100', 'CP-SP', 'None'], correctAnswer: '(Loss/CP)×100' },
      { question: 'Discount = ?', options: ['MP - SP', 'SP - CP', 'CP - MP', 'None'], correctAnswer: 'MP - SP' },
      { question: 'Selling Price (SP) = MP - ?', options: ['Discount', 'Profit', 'Loss', 'VAT'], correctAnswer: 'Discount' },
      { question: 'Commission is usually a percentage of:', options: ['Sales Amount', 'Net Profit', 'Cost Price', 'Tax'], correctAnswer: 'Sales Amount' },
      { question: 'If CP=100 and Profit=20%, SP is:', options: ['120', '80', '100', '113'], correctAnswer: '120' },
      { question: 'If SP=90 and CP=100, Loss% is:', options: ['10%', '9%', '11%', '20%'], correctAnswer: '10%' },
      { question: 'Marked Price (MP) is also called:', options: ['List Price', 'Cost Price', 'Profit', 'Net Price'], correctAnswer: 'List Price' },
      { question: 'Net SP = SP after ___', options: ['Discount', 'VAT', 'Profit', 'None'], correctAnswer: 'Discount' },
      { question: 'An agent who sells goods for commission is a/an:', options: ['Broker', 'Buyer', 'Owner', 'Tax officer'], correctAnswer: 'Broker' },
      { question: 'If MP=500 and Discount=10%, SP is:', options: ['450', '490', '510', '500'], correctAnswer: '450' },
      { question: 'Profit % is always calculated on:', options: ['Cost Price', 'Selling Price', 'Marked Price', 'Discount'], correctAnswer: 'Cost Price' },
      { question: 'If SP=110, Profit=10, CP=?', options: ['100', '120', '110', '90'], correctAnswer: '100' },
      { question: 'If CP=SP, there is:', options: ['No profit/loss', 'Profit', 'Loss', 'Discount'], correctAnswer: 'No profit/loss' },
      { question: 'Commission amount = % of Sales. If Sales=1000, Comm=5%, amount?', options: ['50', '5', '500', '10'], correctAnswer: '50' },
      { question: 'Bonus is usually an extra payment.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Is Discount calculated on CP?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'If a man buys for 50 and sells for 60, Profit% is:', options: ['20%', '10%', '15%', '25%'], correctAnswer: '20%' },
      { question: 'SP = CP + ___', options: ['Profit', 'Loss', 'Discount', 'VAT'], correctAnswer: 'Profit' },
      { question: 'Loss happens when:', options: ['CP > SP', 'SP > CP', 'CP = SP', 'None'], correctAnswer: 'CP > SP' }
    ]
  },

  // ── 9K: TAXATION — INCOME TAX NEPAL (करको हिसाब) ──────────────────
  {
    sheet: '9K', topic: 'Taxation Nepal', grade: 9,
    questions: [
      { question: 'What is the current standard VAT rate in Nepal?', options: ['13%', '10%', '15%', '1%'], correctAnswer: '13%' },
      { question: 'Social Security Tax rate on first slab (Nepal)?', options: ['1%', '5%', '10%', '0%'], correctAnswer: '1%' },
      { question: 'PAN stands for:', options: ['Permanent Account Number', 'Personal Access Number', 'Private Account', 'None'], correctAnswer: 'Permanent Account Number' },
      { question: 'Income tax is a/an ___ tax.', options: ['Direct', 'Indirect', 'VAT', 'Customs'], correctAnswer: 'Direct' },
      { question: 'Taxable Income = Gross Income - ___', options: ['Allowed Deductions', 'Total Spending', 'VAT', 'Profit'], correctAnswer: 'Allowed Deductions' },
      { question: 'Which department handles tax in Nepal?', options: ['Inland Revenue Dept (IRD)', 'Nepal Bank', 'Police', 'Court'], correctAnswer: 'Inland Revenue Dept (IRD)' },
      { question: 'CIT stands for:', options: ['Citizen Investment Trust', 'Central Income Tax', 'City Investment', 'None'], correctAnswer: 'Citizen Investment Trust' },
      { question: 'Tax free limit is decided in the annual:', options: ['Budget', 'Calendar', 'Magazine', 'Meeting'], correctAnswer: 'Budget' },
      { question: 'If income is below limit, tax is usually (for salary):', options: ['1% (Social Security)', '10%', '13%', '0%'], correctAnswer: '1% (Social Security)' },
      { question: 'Is VAT paid by the final consumer?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Net Income = Gross Income - Income Tax.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Tax on interest from bank deposits (Nepal) is usually:', options: ['5%', '13%', '1%', '10%'], correctAnswer: '5%' },
      { question: 'Married couples often have a ___ tax-free limit than individuals.', options: ['Higher', 'Lower', 'Same', 'Zero'], correctAnswer: 'Higher' },
      { question: 'Fiscal year in Nepal starts in which month?', options: ['Shrawan', 'Baishakh', 'January', 'Asar'], correctAnswer: 'Shrawan' },
      { question: 'Monthly salary 50k. Annual income?', options: ['6,00,000', '5,00,000', '50,000', '5,50,000'], correctAnswer: '6,00,000' },
      { question: 'Tax slabs are usually:', options: ['Progressive', 'Fixed', 'Decreasing', 'None'], correctAnswer: 'Progressive' },
      { question: 'Is PF (Provident Fund) deduction tax-exempt?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Rebate means a ___ in tax.', options: ['Reduction', 'Increase', 'Penalty', 'None'], correctAnswer: 'Reduction' },
      { question: 'Tax paid on imported goods is:', options: ['Customs Duty', 'Income Tax', 'VAT', 'None'], correctAnswer: 'Customs Duty' },
      { question: 'Taxable income is calculated annually.', options: ['True', 'False'], correctAnswer: 'True' }
    ]
  },

  // ── 9L: TRIGONOMETRY — SIN, COS, TAN RATIOS ───────────────────────
  {
    sheet: '9L', topic: 'Trig Ratios', grade: 9,
    questions: [
      { question: 'In a right triangle, sin θ = ?', options: ['p/h', 'b/h', 'p/b', 'h/p'], correctAnswer: 'p/h' },
      { question: 'In a right triangle, cos θ = ?', options: ['b/h', 'p/h', 'p/b', 'h/b'], correctAnswer: 'b/h' },
      { question: 'In a right triangle, tan θ = ?', options: ['p/b', 'b/p', 'p/h', 'h/p'], correctAnswer: 'p/b' },
      { question: 'Reciprocal of sin θ is:', options: ['cosec θ', 'sec θ', 'cot θ', 'cos θ'], correctAnswer: 'cosec θ' },
      { question: 'Reciprocal of cos θ is:', options: ['sec θ', 'cosec θ', 'cot θ', 'sin θ'], correctAnswer: 'sec θ' },
      { question: 'Reciprocal of tan θ is:', options: ['cot θ', 'sec θ', 'cosec θ', 'cos θ'], correctAnswer: 'cot θ' },
      { question: 'Pythagoras Theorem: h² = ?', options: ['p² + b²', 'p² - b²', 'p + b', 'None'], correctAnswer: 'p² + b²' },
      { question: 'If p=3, b=4, then h=?', options: ['5', '7', '1', '25'], correctAnswer: '5' },
      { question: 'tan θ is also equal to:', options: ['sin θ / cos θ', 'cos θ / sin θ', '1/sin θ', 'None'], correctAnswer: 'sin θ / cos θ' },
      { question: 'sin²θ + cos²θ = ?', options: ['1', '0', '2', 'None'], correctAnswer: '1' },
      { question: 'If sin θ = 3/5, then cosec θ = ?', options: ['5/3', '4/5', '3/4', '1'], correctAnswer: '5/3' },
      { question: 'In a right triangle, the longest side is:', options: ['Hypotenuse', 'Perpendicular', 'Base', 'Median'], correctAnswer: 'Hypotenuse' },
      { question: 'If p=b, then tan θ = ?', options: ['1', '0', 'Undefined', '0.5'], correctAnswer: '1' },
      { question: 'Maximum value of sin θ (for acute angle) is:', options: ['1', '0', 'Infinite', 'None'], correctAnswer: '1' },
      { question: 'Minimum value of sin θ (for acute angle) is:', options: ['0', '1', '-1', 'None'], correctAnswer: '0' },
      { question: 'cos θ / sin θ = ?', options: ['cot θ', 'tan θ', 'sec θ', 'None'], correctAnswer: 'cot θ' },
      { question: 'sec²θ - tan²θ = ?', options: ['1', '0', '-1', '2'], correctAnswer: '1' },
      { question: 'cosec²θ - cot²θ = ?', options: ['1', '0', '2', '-1'], correctAnswer: '1' },
      { question: 'If cos θ = 4/5, then b=4 and h=5. Find p.', options: ['3', '4', '1', '√41'], correctAnswer: '3' },
      { question: 'Is sin θ = h/p?', options: ['No', 'Yes'], correctAnswer: 'No' }
    ]
  },

  // ── 9M: TRIGONOMETRY — STANDARD ANGLES TABLE ──────────────────────
  {
    sheet: '9M', topic: 'Trig Table', grade: 9,
    questions: [
      { question: 'Value of sin 30°?', options: ['1/2', '√3/2', '1/√2', '1'], correctAnswer: '1/2' },
      { question: 'Value of cos 60°?', options: ['1/2', '√3/2', '1/√2', '0'], correctAnswer: '1/2' },
      { question: 'Value of tan 45°?', options: ['1', '0', '√3', 'Undefined'], correctAnswer: '1' },
      { question: 'Value of sin 90°?', options: ['1', '0', '1/2', 'Undefined'], correctAnswer: '1' },
      { question: 'Value of cos 0°?', options: ['1', '0', '1/2', 'Undefined'], correctAnswer: '1' },
      { question: 'Value of tan 30°?', options: ['1/√3', '√3', '1', '0'], correctAnswer: '1/√3' },
      { question: 'Value of sin 45°?', options: ['1/√2', '1/2', '√3/2', '1'], correctAnswer: '1/√2' },
      { question: 'Value of cos 30°?', options: ['√3/2', '1/2', '1/√2', '0'], correctAnswer: '√3/2' },
      { question: 'Value of tan 60°?', options: ['√3', '1/√3', '1', 'Undefined'], correctAnswer: '√3' },
      { question: 'Value of sin 0°?', options: ['0', '1', '1/2', 'Undefined'], correctAnswer: '0' },
      { question: 'Value of cos 90°?', options: ['0', '1', '1/2', 'Undefined'], correctAnswer: '0' },
      { question: 'Value of tan 90°?', options: ['Undefined', '0', '1', 'Infinite'], correctAnswer: 'Undefined' },
      { question: 'Value of cosec 30°?', options: ['2', '1/2', '√3', '1'], correctAnswer: '2' },
      { question: 'Value of sec 45°?', options: ['√2', '2', '1', '0'], correctAnswer: '√2' },
      { question: 'Value of cot 45°?', options: ['1', '0', '√3', 'None'], correctAnswer: '1' },
      { question: 'Which is greater: sin 30° or sin 60°?', options: ['sin 60°', 'sin 30°', 'Both equal', 'None'], correctAnswer: 'sin 60°' },
      { question: 'Which is greater: cos 30° or cos 60°?', options: ['cos 30°', 'cos 60°', 'Both equal', 'None'], correctAnswer: 'cos 30°' },
      { question: 'sin 30° + cos 60° = ?', options: ['1', '1/2', '√3', '0'], correctAnswer: '1' },
      { question: 'tan 45° - sin 90° = ?', options: ['0', '1', '-1', '2'], correctAnswer: '0' },
      { question: 'Is sin 60° = cos 30°?', options: ['Yes', 'No'], correctAnswer: 'Yes' }
    ]
  },

  // ── 9N: TRIGONOMETRY — IDENTITIES ─────────────────────────────────
  {
    sheet: '9N', topic: 'Trig Identities', grade: 9,
    questions: [
      { question: 'sin²θ + cos²θ = ?', options: ['1', '0', '2', '-1'], correctAnswer: '1' },
      { question: '1 + tan²θ = ?', options: ['sec²θ', 'cosec²θ', 'sin²θ', '1'], correctAnswer: 'sec²θ' },
      { question: '1 + cot²θ = ?', options: ['cosec²θ', 'sec²θ', 'tan²θ', '1'], correctAnswer: 'cosec²θ' },
      { question: 'sin θ · cosec θ = ?', options: ['1', '0', 'sin²θ', 'None'], correctAnswer: '1' },
      { question: 'cos θ · sec θ = ?', options: ['1', '0', 'cos²θ', 'None'], correctAnswer: '1' },
      { question: 'tan θ · cot θ = ?', options: ['1', '0', 'tan²θ', 'None'], correctAnswer: '1' },
      { question: '√(1 - cos²θ) = ?', options: ['sin θ', 'cos θ', 'tan θ', '1'], correctAnswer: 'sin θ' },
      { question: 'sec²θ - 1 = ?', options: ['tan²θ', 'cot²θ', '1', '0'], correctAnswer: 'tan²θ' },
      { question: 'cosec²θ - 1 = ?', options: ['cot²θ', 'tan²θ', '1', '0'], correctAnswer: 'cot²θ' },
      { question: 'sin θ / √(1-sin²θ) = ?', options: ['tan θ', 'cot θ', '1', 'sin θ'], correctAnswer: 'tan θ' },
      { question: 'Simplify: (1-cos²θ)cosec²θ', options: ['1', '0', 'sin²θ', 'None'], correctAnswer: '1' },
      { question: 'Simplify: (1+tan²θ)cos²θ', options: ['1', '0', 'sec²θ', 'None'], correctAnswer: '1' },
      { question: 'sin(90-θ) = ?', options: ['cos θ', 'sin θ', '-cos θ', 'tan θ'], correctAnswer: 'cos θ' },
      { question: 'cos(90-θ) = ?', options: ['sin θ', 'cos θ', '-sin θ', 'cot θ'], correctAnswer: 'sin θ' },
      { question: 'tan(90-θ) = ?', options: ['cot θ', 'tan θ', 'sec θ', 'None'], correctAnswer: 'cot θ' },
      { question: 'Is sin²θ = (sin θ)²?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'sec²θ - tan²θ = ?', options: ['1', '0', '2', '-1'], correctAnswer: '1' },
      { question: 'cosec²θ - cot²θ = ?', options: ['1', '0', '-1', 'None'], correctAnswer: '1' },
      { question: 'Simplify: sin θ cot θ', options: ['cos θ', 'tan θ', '1', 'sec θ'], correctAnswer: 'cos θ' },
      { question: 'Simplify: cos θ tan θ', options: ['sin θ', 'cot θ', '1', 'cosec θ'], correctAnswer: 'sin θ' }
    ]
  },

  // ── 9O: HEIGHTS AND DISTANCES (उचाई र दूरी) ───────────────────────
  {
    sheet: '9O', topic: 'Heights and Distances', grade: 9,
    questions: [
      { question: 'The angle between horizontal line and line of sight looking up:', options: ['Angle of Elevation', 'Angle of Depression', 'Right Angle', 'None'], correctAnswer: 'Angle of Elevation' },
      { question: 'The angle between horizontal line and line of sight looking down:', options: ['Angle of Depression', 'Angle of Elevation', 'Obtuse Angle', 'None'], correctAnswer: 'Angle of Depression' },
      { question: 'Which trig ratio is most used for Height and Base?', options: ['tan θ', 'sin θ', 'cos θ', 'cosec θ'], correctAnswer: 'tan θ' },
      { question: 'If angle of elevation is 45°, then Height = ?', options: ['Base', '2 × Base', 'Base / 2', 'None'], correctAnswer: 'Base' },
      { question: 'A pole 10m high casts a 10m shadow. Angle of elevation?', options: ['45°', '30°', '60°', '90°'], correctAnswer: '45°' },
      { question: 'If height = 10m and angle = 30°, base = ?', options: ['10√3 m', '10/√3 m', '20 m', '5 m'], correctAnswer: '10√3 m' },
      { question: 'If base = 20m and angle = 60°, height = ?', options: ['20√3 m', '20/√3 m', '40 m', '10 m'], correctAnswer: '20√3 m' },
      { question: 'Angle of elevation and depression (alternate) are:', options: ['Equal', '90° sum', '180° sum', 'None'], correctAnswer: 'Equal' },
      { question: 'A ladder 10m reaches a 5m high window. Angle with ground?', options: ['30°', '45°', '60°', '90°'], correctAnswer: '30°' },
      { question: 'As you move away from a tower, the angle of elevation:', options: ['Decreases', 'Increases', 'Stays same', 'None'], correctAnswer: 'Decreases' },
      { question: 'Shadow of a tree is √3 times its height. Angle of elevation?', options: ['30°', '60°', '45°', '90°'], correctAnswer: '30°' },
      { question: 'A person 1.5m tall stands 28.5m from a 30m tower. Angle?', options: ['45°', '30°', '60°', '15°'], correctAnswer: '45°' },
      { question: 'The line of sight is from the eye to the object.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'If angle = 60°, p=h, b=d, then h/d = ?', options: ['√3', '1/√3', '1', '2'], correctAnswer: '√3' },
      { question: 'If d=10 and h=10√3, angle = ?', options: ['60°', '30°', '45°', '90°'], correctAnswer: '60°' },
      { question: 'Trigonometry used in heights and distances is based on:', options: ['Right triangles', 'Squares', 'Circles', 'None'], correctAnswer: 'Right triangles' },
      { question: 'Value of tan 30°?', options: ['1/√3', '√3', '1', '0'], correctAnswer: '1/√3' },
      { question: 'Value of tan 60°?', options: ['√3', '1/√3', '1', '2'], correctAnswer: '√3' },
      { question: 'If angle is 0, height is 0.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Angle of depression is measured from the horizontal.', options: ['True', 'False'], correctAnswer: 'True' }
    ]
  },

  // ── 9P: COORDINATE GEOMETRY — DISTANCE FORMULA ───────────────────
  {
    sheet: '9P', topic: 'Distance Formula', grade: 9,
    questions: [
      { question: 'Distance formula: d = ?', options: ['√[(x₂-x₁)²+(y₂-y₁)²]', '(x₂-x₁)+(y₂-y₁)', 'x₂+y₂', 'None'], correctAnswer: '√[(x₂-x₁)²+(y₂-y₁)²]' },
      { question: 'Distance of (3, 4) from origin (0,0)?', options: ['5', '7', '1', '25'], correctAnswer: '5' },
      { question: 'Distance between (1, 2) and (4, 6)?', options: ['5', '7', '3', '4'], correctAnswer: '5' },
      { question: 'Distance between (0, 0) and (0, 5)?', options: ['5', '0', '25', '√5'], correctAnswer: '5' },
      { question: 'Distance between (2, 3) and (2, 10)?', options: ['7', '5', '13', '2'], correctAnswer: '7' },
      { question: 'Distance between (-1, -1) and (2, 3)?', options: ['5', '√7', '√5', '4'], correctAnswer: '5' },
      { question: 'Is distance ever negative?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Distance of (-6, 8) from origin?', options: ['10', '2', '14', '100'], correctAnswer: '10' },
      { question: 'Distance between (5, 0) and (0, 5)?', options: ['5√2', '10', '5', '50'], correctAnswer: '5√2' },
      { question: 'Distance between (a, b) and (a, b)?', options: ['0', 'a', 'b', '1'], correctAnswer: '0' },
      { question: 'Distance between (2, 5) and (-3, 5)?', options: ['5', '0', '10', '1'], correctAnswer: '5' },
      { question: 'The x-coordinate is also called:', options: ['Abscissa', 'Ordinate', 'Origin', 'None'], correctAnswer: 'Abscissa' },
      { question: 'The y-coordinate is also called:', options: ['Ordinate', 'Abscissa', 'Origin', 'None'], correctAnswer: 'Ordinate' },
      { question: 'Origin coordinates are:', options: ['(0, 0)', '(1, 1)', '(x, y)', 'None'], correctAnswer: '(0, 0)' },
      { question: 'Distance of (x, y) from x-axis is:', options: ['|y|', '|x|', '√(x²+y²)', '0'], correctAnswer: '|y|' },
      { question: 'Distance of (x, y) from y-axis is:', options: ['|x|', '|y|', '√(x²+y²)', '0'], correctAnswer: '|x|' },
      { question: 'Distance between (4, 0) and (0, 3)?', options: ['5', '7', '1', '12'], correctAnswer: '5' },
      { question: 'If distance from (0,0) to (x,0) is 5, x is:', options: ['±5', '5', '25', '0'], correctAnswer: '±5' },
      { question: 'Point (3, -4) lies in quadrant:', options: ['IV', 'I', 'II', 'III'], correctAnswer: 'IV' },
      { question: 'Point (-2, -3) lies in quadrant:', options: ['III', 'I', 'II', 'IV'], correctAnswer: 'III' }
    ]
  },

  // ── 9Q: COORDINATE GEOMETRY — MIDPOINT FORMULA ───────────────────
  {
    sheet: '9Q', topic: 'Midpoint Formula', grade: 9,
    questions: [
      { question: 'Midpoint formula: M = ?', options: ['((x₁+x₂)/2, (y₁+y₂)/2)', '(x₁-x₂, y₁-y₂)', '(x₁x₂, y₁y₂)', 'None'], correctAnswer: '((x₁+x₂)/2, (y₁+y₂)/2)' },
      { question: 'Midpoint of (2, 4) and (4, 6)?', options: ['(3, 5)', '(6, 10)', '(1, 1)', '(2, 2)'], correctAnswer: '(3, 5)' },
      { question: 'Midpoint of (0, 0) and (10, 10)?', options: ['(5, 5)', '(0, 0)', '(10, 10)', '(2, 2)'], correctAnswer: '(5, 5)' },
      { question: 'Midpoint of (-2, -2) and (2, 2)?', options: ['(0, 0)', '(4, 4)', '(1, 1)', '(-1, -1)'], correctAnswer: '(0, 0)' },
      { question: 'If one end is (0,0) and midpoint is (2,3), other end is:', options: ['(4, 6)', '(1, 1.5)', '(2, 3)', 'None'], correctAnswer: '(4, 6)' },
      { question: 'Midpoint of (5, 7) and (5, 11)?', options: ['(5, 9)', '(5, 18)', '(10, 18)', '(0, 4)'], correctAnswer: '(5, 9)' },
      { question: 'Midpoint of (1, 2) and (3, 4)?', options: ['(2, 3)', '(1, 1)', '(4, 6)', 'None'], correctAnswer: '(2, 3)' },
      { question: 'X-coordinate of midpoint is (x₁+x₂)/2.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Y-coordinate of midpoint is (y₁+y₂)/2.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Midpoint of (x, y) and (x, y) is:', options: ['(x, y)', '(2x, 2y)', '(0, 0)', 'None'], correctAnswer: '(x, y)' },
      { question: 'Midpoint of (a, 0) and (0, b)?', options: ['(a/2, b/2)', '(a, b)', '(0, 0)', 'None'], correctAnswer: '(a/2, b/2)' },
      { question: 'Midpoint of (10, 20) and (20, 40)?', options: ['(15, 30)', '(30, 60)', '(5, 10)', 'None'], correctAnswer: '(15, 30)' },
      { question: 'Midpoint of (-5, 5) and (5, -5)?', options: ['(0, 0)', '(5, 5)', '(-5, -5)', 'None'], correctAnswer: '(0, 0)' },
      { question: 'Midpoint of (8, 4) and (0, 0)?', options: ['(4, 2)', '(8, 4)', '(0, 0)', 'None'], correctAnswer: '(4, 2)' },
      { question: 'Does midpoint lie on the line segment?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Midpoint of (100, 200) and (0, 0)?', options: ['(50, 100)', '(100, 200)', '(0, 0)', 'None'], correctAnswer: '(50, 100)' },
      { question: 'If midpoint is origin and one point is (x, y), other is:', options: ['(-x, -y)', '(x, y)', '(0, 0)', 'None'], correctAnswer: '(-x, -y)' },
      { question: 'Midpoint of (1, 1) and (1, 5)?', options: ['(1, 3)', '(1, 6)', '(2, 6)', 'None'], correctAnswer: '(1, 3)' },
      { question: 'Midpoint of (2, 8) and (6, 8)?', options: ['(4, 8)', '(8, 16)', '(4, 4)', 'None'], correctAnswer: '(4, 8)' },
      { question: 'Coordinates of a point on x-axis are:', options: ['(x, 0)', '(0, y)', '(x, y)', 'None'], correctAnswer: '(x, 0)' }
    ]
  },

  // ── 9R: STATISTICS — STANDARD DEVIATION ───────────────────────────
  {
    sheet: '9R', topic: 'Statistics', grade: 9,
    questions: [
      { question: 'Mean is calculated by:', options: ['Σx / N', 'Σf / N', 'Maximum - Minimum', 'None'], correctAnswer: 'Σx / N' },
      { question: 'Mean of 2, 4, 6 is:', options: ['4', '12', '6', '2'], correctAnswer: '4' },
      { question: 'Standard Deviation is the square root of:', options: ['Variance', 'Mean', 'Range', 'Mode'], correctAnswer: 'Variance' },
      { question: 'The symbol σ (sigma) denotes:', options: ['Standard Deviation', 'Mean', 'Sum', 'None'], correctAnswer: 'Standard Deviation' },
      { question: 'Variance is SD squared (σ²).', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Which shows data dispersion?', options: ['Standard Deviation', 'Mean', 'Median', 'Mode'], correctAnswer: 'Standard Deviation' },
      { question: 'Range = Maximum value - ___', options: ['Minimum value', 'Mean', '0', 'Mode'], correctAnswer: 'Minimum value' },
      { question: 'Mean of first 5 natural numbers?', options: ['3', '2', '5', '15'], correctAnswer: '3' },
      { question: 'If all values are same, SD is:', options: ['0', '1', 'Mean', 'None'], correctAnswer: '0' },
      { question: 'Which is not a measure of central tendency?', options: ['Standard Deviation', 'Mean', 'Median', 'Mode'], correctAnswer: 'Standard Deviation' },
      { question: 'Median of 1, 3, 5, 7, 9 is:', options: ['5', '3', '7', '1'], correctAnswer: '5' },
      { question: 'Mode is the value that occurs:', options: ['Most frequently', 'Least frequently', 'In middle', 'None'], correctAnswer: 'Most frequently' },
      { question: 'Σ (sigma) means:', options: ['Summation', 'Average', 'Subtract', 'None'], correctAnswer: 'Summation' },
      { question: 'If SD = 4, Variance = ?', options: ['16', '2', '4', '8'], correctAnswer: '16' },
      { question: 'If Variance = 25, SD = ?', options: ['5', '625', '25', '10'], correctAnswer: '5' },
      { question: 'Mean of 10, 20, 30?', options: ['20', '10', '30', '60'], correctAnswer: '20' },
      { question: 'Is SD affected by change of origin?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Mean is also called Average.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'N represents the total number of items.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'A higher SD means data is more ___', options: ['Spread out', 'Clustered', 'Accurate', 'Small'], correctAnswer: 'Spread out' }
    ]
  },

  // ── 9S: PROBABILITY — BASIC TO ADVANCED ───────────────────────────
  {
    sheet: '9S', topic: 'Probability', grade: 9,
    questions: [
      { question: 'Probability of a certain event is:', options: ['1', '0', '0.5', 'None'], correctAnswer: '1' },
      { question: 'Probability of an impossible event is:', options: ['0', '1', '0.5', '-1'], correctAnswer: '0' },
      { question: 'P(E) = ?', options: ['n(E)/n(S)', 'n(S)/n(E)', 'n(E)+n(S)', 'None'], correctAnswer: 'n(E)/n(S)' },
      { question: 'A coin is tossed. P(Head) = ?', options: ['1/2', '1', '0', '1/4'], correctAnswer: '1/2' },
      { question: 'A die is rolled. P(getting 6) = ?', options: ['1/6', '1/2', '1', '0'], correctAnswer: '1/6' },
      { question: 'Range of probability P(A) is:', options: ['0 to 1', '> 1', '< 0', 'Any number'], correctAnswer: '0 to 1' },
      { question: 'P(Event) + P(Not Event) = ?', options: ['1', '0', '0.5', '2'], correctAnswer: '1' },
      { question: 'Total outcomes when tossing 2 coins?', options: ['4', '2', '8', '6'], correctAnswer: '4' },
      { question: 'A card is drawn from 52. P(Ace) = ?', options: ['4/52', '1/52', '1/4', 'None'], correctAnswer: '4/52' },
      { question: 'P(Even number) on a die roll?', options: ['1/2', '1/3', '1/6', '3/6'], correctAnswer: '1/2' },
      { question: 'If P(E) = 0.7, then P(Not E) = ?', options: ['0.3', '0.7', '1', '0'], correctAnswer: '0.3' },
      { question: 'Total outcomes when rolling 2 dice?', options: ['36', '12', '6', '24'], correctAnswer: '36' },
      { question: 'Bag with 3 Red, 2 Blue balls. P(Red) = ?', options: ['3/5', '2/5', '1/2', '3/2'], correctAnswer: '3/5' },
      { question: 'Probability can never be negative.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Number of face cards in a deck?', options: ['12', '4', '16', '3'], correctAnswer: '12' },
      { question: 'P(Prime number) on a die roll?', options: ['1/2', '1/3', '2/3', 'None'], correctAnswer: '1/2' },
      { question: 'In a non-leap year, P(53 Tuesdays) = ?', options: ['1/7', '2/7', '0', 'None'], correctAnswer: '1/7' },
      { question: 'P(Getting 7 on a die)?', options: ['0', '1/7', '1/6', 'None'], correctAnswer: '0' },
      { question: 'Sample space is the set of all outcomes.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'P(Getting a King or Queen from 52 cards)?', options: ['8/52', '4/52', '2/52', 'None'], correctAnswer: '8/52' }
    ]
  },

  // ── 9T: MENSURATION — ADVANCED AREA/VOLUME ────────────────────────
  {
    sheet: '9T', topic: 'Mensuration', grade: 9,
    questions: [
      { question: 'Area of a triangle (Heron\'s formula) = ?', options: ['√[s(s-a)(s-b)(s-c)]', '1/2 b×h', 'a+b+c', 'None'], correctAnswer: '√[s(s-a)(s-b)(s-c)]' },
      { question: 'Volume of a cylinder = ?', options: ['πr²h', '2πrh', '1/3 πr²h', '4/3 πr³'], correctAnswer: 'πr²h' },
      { question: 'Total Surface Area of a cube (side l) = ?', options: ['6l²', 'l³', '4l²', 'None'], correctAnswer: '6l²' },
      { question: 'Volume of a sphere = ?', options: ['4/3 πr³', 'πr²h', '4πr²', 'None'], correctAnswer: '4/3 πr³' },
      { question: 'Area of a circle = ?', options: ['πr²', '2πr', 'πd', 'None'], correctAnswer: 'πr²' },
      { question: 'Perimeter (Circumference) of a circle = ?', options: ['2πr', 'πr²', 'πd²', 'None'], correctAnswer: '2πr' },
      { question: 'Volume of a cone = ?', options: ['1/3 πr²h', 'πr²h', '2πrh', 'None'], correctAnswer: '1/3 πr²h' },
      { question: 'Area of a rectangle = ?', options: ['l × b', '2(l+b)', 'l²', 'None'], correctAnswer: 'l × b' },
      { question: 'Surface Area of a sphere = ?', options: ['4πr²', '2πr²', 'πr²', 'None'], correctAnswer: '4πr²' },
      { question: 'Lateral Surface Area of a cylinder = ?', options: ['2πrh', 'πr²h', '2πr(r+h)', 'None'], correctAnswer: '2πrh' },
      { question: 'Volume of a cuboid = ?', options: ['l × b × h', '2(lb+bh+hl)', 'l+b+h', 'None'], correctAnswer: 'l × b × h' },
      { question: 'Semi-perimeter (s) of triangle = ?', options: ['(a+b+c)/2', 'a+b+c', 'abc/2', 'None'], correctAnswer: '(a+b+c)/2' },
      { question: 'Area of a square = ?', options: ['side²', '4 × side', '2 × side', 'None'], correctAnswer: 'side²' },
      { question: 'Curved Surface Area of a cone = ?', options: ['πrl', 'πr²h', '2πrh', 'None'], correctAnswer: 'πrl' },
      { question: 'Volume of a hemisphere = ?', options: ['2/3 πr³', '4/3 πr³', 'πr³', 'None'], correctAnswer: '2/3 πr³' },
      { question: '1 liter = ___ cm³?', options: ['1000', '100', '10', '10000'], correctAnswer: '1000' },
      { question: 'Area of four walls of a room = ?', options: ['2h(l+b)', 'lbh', '2(lb+bh)', 'None'], correctAnswer: '2h(l+b)' },
      { question: 'Diagonal of a square (side a) = ?', options: ['a√2', 'a²', '2a', 'None'], correctAnswer: 'a√2' },
      { question: 'Base area of a cylinder is a circle.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Total Surface Area of a cylinder = ?', options: ['2πr(r+h)', '2πrh', 'πr²h', 'None'], correctAnswer: '2πr(r+h)' }
    ]
  }
];


// Seeding loop
let totalQ = 0

for (const levelData of seed_grade9) {
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