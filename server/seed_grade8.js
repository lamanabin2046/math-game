import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Level from './models/Level.js'
import Question from './models/Question.js'

// ✅ CONFIG AND CONNECT FIRST — BEFORE ANY DB OPERATIONS
dotenv.config()
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mathgame')
console.log('✅ Connected to MongoDB')

// Clean ONLY grade 8 data
await Level.deleteMany({ grade: 8 })
await Question.deleteMany({ grade: 8 })
console.log('🧹 Cleared existing Grade 8 data\n')

// Get next available level number (continues from grade 6)
const maxLevel = await Level.findOne().sort({ levelNumber: -1 })
let levelNumber = (maxLevel?.levelNumber || 0) + 1
console.log(`📌 Starting levelNumber from: ${levelNumber}\n`)

const grade8 = [
  // ── 8A: Square roots — perfect squares (वर्गमूल) ─────────────────────────
  {
    sheet: '8A', topic: 'Square Roots - Perfect Squares', grade: 8,
    questions: [
      { question: '√64 = ?', options: ['6', '7', '8', '9'], correctAnswer: '8', explanation: '8 × 8 = 64' },
      { question: '√144 = ?', options: ['10', '11', '12', '13'], correctAnswer: '12', explanation: '12 × 12 = 144' },
      { question: '√225 = ?', options: ['13', '14', '15', '16'], correctAnswer: '15', explanation: '15 × 15 = 225' },
      { question: '√400 = ?', options: ['18', '19', '20', '21'], correctAnswer: '20', explanation: '20 × 20 = 400' },
      { question: '√625 = ?', options: ['23', '24', '25', '26'], correctAnswer: '25', explanation: '25 × 25 = 625' },
      { question: '√900 = ?', options: ['28', '29', '30', '31'], correctAnswer: '30', explanation: '30 × 30 = 900' },
      { question: '√1600 = ?', options: ['38', '39', '40', '41'], correctAnswer: '40', explanation: '40 × 40 = 1600' },
      { question: '√2500 = ?', options: ['48', '49', '50', '51'], correctAnswer: '50', explanation: '50 × 50 = 2500' },
      { question: '√3600 = ?', options: ['58', '59', '60', '61'], correctAnswer: '60', explanation: '60 × 60 = 3600' },
      { question: '√10000 = ?', options: ['90', '95', '100', '105'], correctAnswer: '100', explanation: '100 × 100 = 10000' },
      { question: '√(169) = ?', options: ['11', '12', '13', '14'], correctAnswer: '13', explanation: '13 × 13 = 169' },
      { question: '√(196) = ?', options: ['12', '13', '14', '15'], correctAnswer: '14', explanation: '14 × 14 = 196' },
      { question: '√(289) = ?', options: ['15', '16', '17', '18'], correctAnswer: '17', explanation: '17 × 17 = 289' },
      { question: '√(441) = ?', options: ['19', '20', '21', '22'], correctAnswer: '21', explanation: '21 × 21 = 441' },
      { question: '√(576) = ?', options: ['22', '23', '24', '25'], correctAnswer: '24', explanation: '24 × 24 = 576' },
      { question: '√(729) = ?', options: ['25', '26', '27', '28'], correctAnswer: '27', explanation: '27 × 27 = 729' },
      { question: '√(1024) = ?', options: ['30', '31', '32', '33'], correctAnswer: '32', explanation: '32 × 32 = 1024' },
      { question: '√(1296) = ?', options: ['34', '35', '36', '37'], correctAnswer: '36', explanation: '36 × 36 = 1296' },
      { question: '√(0.09) = ?', options: ['0.3', '0.03', '3', '0.9'], correctAnswer: '0.3', explanation: '0.3 × 0.3 = 0.09' },
      { question: '√(1.44) = ?', options: ['1.1', '1.2', '1.3', '1.4'], correctAnswer: '1.2', explanation: '1.2 × 1.2 = 1.44' },
    ]
  },

  // ── 8B: Cube roots — perfect cubes (घनमूल) ───────────────────────────────
  {
    sheet: '8B', topic: 'Cube Roots - Perfect Cubes', grade: 8,
    questions: [
      { question: '∛8 = ?', options: ['2', '3', '4', '5'], correctAnswer: '2', explanation: '2 × 2 × 2 = 8' },
      { question: '∛27 = ?', options: ['2', '3', '4', '5'], correctAnswer: '3', explanation: '3 × 3 × 3 = 27' },
      { question: '∛64 = ?', options: ['3', '4', '5', '6'], correctAnswer: '4', explanation: '4 × 4 × 4 = 64' },
      { question: '∛125 = ?', options: ['4', '5', '6', '7'], correctAnswer: '5', explanation: '5 × 5 × 5 = 125' },
      { question: '∛216 = ?', options: ['5', '6', '7', '8'], correctAnswer: '6', explanation: '6 × 6 × 6 = 216' },
      { question: '∛343 = ?', options: ['6', '7', '8', '9'], correctAnswer: '7', explanation: '7 × 7 × 7 = 343' },
      { question: '∛512 = ?', options: ['7', '8', '9', '10'], correctAnswer: '8', explanation: '8 × 8 × 8 = 512' },
      { question: '∛729 = ?', options: ['8', '9', '10', '11'], correctAnswer: '9', explanation: '9 × 9 × 9 = 729' },
      { question: '∛1000 = ?', options: ['8', '9', '10', '11'], correctAnswer: '10', explanation: '10 × 10 × 10 = 1000' },
      { question: '∛1331 = ?', options: ['10', '11', '12', '13'], correctAnswer: '11', explanation: '11 × 11 × 11 = 1331' },
      { question: '∛1728 = ?', options: ['10', '11', '12', '13'], correctAnswer: '12', explanation: '12 × 12 × 12 = 1728' },
      { question: '∛2197 = ?', options: ['11', '12', '13', '14'], correctAnswer: '13', explanation: '13 × 13 × 13 = 2197' },
      { question: '∛2744 = ?', options: ['12', '13', '14', '15'], correctAnswer: '14', explanation: '14 × 14 × 14 = 2744' },
      { question: '∛3375 = ?', options: ['13', '14', '15', '16'], correctAnswer: '15', explanation: '15 × 15 × 15 = 3375' },
      { question: '∛4096 = ?', options: ['14', '15', '16', '17'], correctAnswer: '16', explanation: '16 × 16 × 16 = 4096' },
      { question: '∛4913 = ?', options: ['15', '16', '17', '18'], correctAnswer: '17', explanation: '17 × 17 × 17 = 4913' },
      { question: '∛5832 = ?', options: ['16', '17', '18', '19'], correctAnswer: '18', explanation: '18 × 18 × 18 = 5832' },
      { question: '∛6859 = ?', options: ['17', '18', '19', '20'], correctAnswer: '19', explanation: '19 × 19 × 19 = 6859' },
      { question: '∛0.008 = ?', options: ['0.2', '0.02', '2', '0.002'], correctAnswer: '0.2', explanation: '0.2³ = 0.008' },
      { question: '∛0.027 = ?', options: ['0.3', '0.03', '3', '0.003'], correctAnswer: '0.3', explanation: '0.3³ = 0.027' },
    ]
  },

  // ── 8C: Factorization — common factors ──────────────────────────────────
  {
    sheet: '8C', topic: 'Factorization - Common Factors', grade: 8,
    questions: [
      { question: 'Factorize: 2x + 4', options: ['2(x+2)', '2(x+4)', '4(x+1)', 'x(2+4)'], correctAnswer: '2(x+2)', explanation: 'HCF is 2' },
      { question: 'Factorize: 3y - 9', options: ['3(y-3)', '3(y-9)', '9(y-1)', 'y(3-9)'], correctAnswer: '3(y-3)', explanation: 'HCF is 3' },
      { question: 'Factorize: 5a + 15b', options: ['5(a+3b)', '5(a+15b)', '15(a+b)', '5a(1+3b)'], correctAnswer: '5(a+3b)', explanation: 'HCF is 5' },
      { question: 'Factorize: x² + x', options: ['x(x+1)', 'x(x+x)', 'x²(1+1)', 'x(1+1)'], correctAnswer: 'x(x+1)', explanation: 'HCF is x' },
      { question: 'Factorize: 4m² - 6m', options: ['2m(2m-3)', '2(2m²-3m)', 'm(4m-6)', '4m(m-1.5)'], correctAnswer: '2m(2m-3)', explanation: 'HCF is 2m' },
      { question: 'Factorize: 8ab + 12ac', options: ['4a(2b+3c)', '2a(4b+6c)', '4(2ab+3ac)', 'a(8b+12c)'], correctAnswer: '4a(2b+3c)', explanation: 'HCF is 4a' },
      { question: 'Factorize: 7p²q - 14pq²', options: ['7pq(p-2q)', '7p(pq-2q²)', '7q(p²-2pq)', 'pq(7p-14q)'], correctAnswer: '7pq(p-2q)', explanation: 'HCF is 7pq' },
      { question: 'Factorize: 3x³ + 6x²', options: ['3x²(x+2)', '3x(x²+2x)', 'x²(3x+6)', '3(x³+2x²)'], correctAnswer: '3x²(x+2)', explanation: 'HCF is 3x²' },
      { question: 'Factorize: 10y⁴ - 15y³', options: ['5y³(2y-3)', '5y²(2y²-3y)', '10y³(y-1.5)', '5(2y⁴-3y³)'], correctAnswer: '5y³(2y-3)', explanation: 'HCF is 5y³' },
      { question: 'Factorize: a²b + ab²', options: ['ab(a+b)', 'a(ab+b²)', 'b(a²+ab)', 'ab(1+1)'], correctAnswer: 'ab(a+b)', explanation: 'HCF is ab' },
      { question: 'Factorize: 6x²y + 9xy²', options: ['3xy(2x+3y)', '3xy(x+y)', '6xy(x+1.5y)', 'xy(6x+9y)'], correctAnswer: '3xy(2x+3y)', explanation: 'HCF is 3xy' },
      { question: 'Factorize: 12m²n² - 18mn', options: ['6mn(2mn-3)', '6mn(2m-3n)', '3mn(4mn-6)', 'mn(12mn-18)'], correctAnswer: '6mn(2mn-3)', explanation: 'HCF is 6mn' },
      { question: 'Factorize: 4x(a+b) + y(a+b)', options: ['(a+b)(4x+y)', '(a+b)(4x-y)', '(a-b)(4x+y)', '4xy(a+b)'], correctAnswer: '(a+b)(4x+y)', explanation: 'Common binomial is (a+b)' },
      { question: 'Factorize: m(x-y) - n(x-y)', options: ['(x-y)(m-n)', '(x-y)(m+n)', '(x+y)(m-n)', 'mn(x-y)'], correctAnswer: '(x-y)(m-n)', explanation: 'Common binomial is (x-y)' },
      { question: 'Factorize: 2a² - 4ab + 6ac', options: ['2a(a-2b+3c)', '2(a²-2ab+3ac)', 'a(2a-4b+6c)', '2a(a+2b+3c)'], correctAnswer: '2a(a-2b+3c)', explanation: 'HCF is 2a' },
      { question: 'Factorize: 5x³ - 10x² + 15x', options: ['5x(x²-2x+3)', '5(x³-2x²+3x)', 'x(5x²-10x+15)', '5x(x²+2x+3)'], correctAnswer: '5x(x²-2x+3)', explanation: 'HCF is 5x' },
      { question: 'Factorize: pqr + pq', options: ['pq(r+1)', 'pq(r+0)', 'p(qr+q)', 'q(pr+p)'], correctAnswer: 'pq(r+1)', explanation: 'HCF is pq' },
      { question: 'Factorize: 8x²y - 12xy² + 4xy', options: ['4xy(2x-3y+1)', '4xy(2x-3y)', '2xy(4x-6y+2)', '4(2x²y-3xy²+xy)'], correctAnswer: '4xy(2x-3y+1)', explanation: 'HCF is 4xy' },
      { question: 'Factorize: a(x+2) + (x+2)', options: ['(x+2)(a+1)', '(x+2)(a+0)', '(x+2)(a)', 'a(x+2)'], correctAnswer: '(x+2)(a+1)', explanation: 'Common factor is (x+2)' },
      { question: 'Factorize: 3x²(y-1) - 6x(y-1)', options: ['3x(y-1)(x-2)', '3x(y-1)(x+2)', '3(y-1)(x²-2x)', 'x(y-1)(3x-6)'], correctAnswer: '3x(y-1)(x-2)', explanation: 'HCF is 3x(y-1)' },
    ]
  },

  // ── 8D: Factorization — difference of squares ───────────────────────────
  {
    sheet: '8D', topic: 'Factorization - Difference of Squares', grade: 8,
    questions: [
      { question: 'Factorize: x² - 9', options: ['(x-3)(x+3)', '(x-3)²', '(x+3)²', '(x-9)(x+1)'], correctAnswer: '(x-3)(x+3)', explanation: 'a² - b² = (a-b)(a+b)' },
      { question: 'Factorize: y² - 25', options: ['(y-5)(y+5)', '(y-5)²', '(y+5)²', '(y-25)(y+1)'], correctAnswer: '(y-5)(y+5)', explanation: 'y² - 5²' },
      { question: 'Factorize: 4a² - 1', options: ['(2a-1)(2a+1)', '(2a-1)²', '(4a-1)(a+1)', '(2a+1)²'], correctAnswer: '(2a-1)(2a+1)', explanation: '(2a)² - 1²' },
      { question: 'Factorize: 9m² - 16', options: ['(3m-4)(3m+4)', '(3m-4)²', '(9m-4)(m+4)', '(3m+4)²'], correctAnswer: '(3m-4)(3m+4)', explanation: '(3m)² - 4²' },
      { question: 'Factorize: 25 - x²', options: ['(5-x)(5+x)', '(x-5)(x+5)', '(5-x)²', '(5+x)²'], correctAnswer: '(5-x)(5+x)', explanation: '5² - x²' },
      { question: 'Factorize: 36p² - 49q²', options: ['(6p-7q)(6p+7q)', '(6p-7q)²', '(36p-49q)(p+q)', '(6p+7q)²'], correctAnswer: '(6p-7q)(6p+7q)', explanation: '(6p)² - (7q)²' },
      { question: 'Factorize: x² - 100', options: ['(x-10)(x+10)', '(x-10)²', '(x+10)²', '(x-50)(x+2)'], correctAnswer: '(x-10)(x+10)', explanation: 'x² - 10²' },
      { question: 'Factorize: 1 - 64b²', options: ['(1-8b)(1+8b)', '(1-8b)²', '(1+8b)²', '(1-64b)(1+b)'], correctAnswer: '(1-8b)(1+8b)', explanation: '1² - (8b)²' },
      { question: 'Factorize: 81x² - 121y²', options: ['(9x-11y)(9x+11y)', '(9x-11y)²', '(9x+11y)²', '(81x-121y)(x+y)'], correctAnswer: '(9x-11y)(9x+11y)', explanation: '(9x)² - (11y)²' },
      { question: 'Factorize: 2x² - 18', options: ['2(x-3)(x+3)', '2(x-9)', '(2x-6)(x+3)', '(x-3)(2x+6)'], correctAnswer: '2(x-3)(x+3)', explanation: 'Common 2 first: 2(x²-9)' },
      { question: 'Factorize: 5a² - 20', options: ['5(a-2)(a+2)', '5(a-4)', '(5a-10)(a+2)', '5(a+2)²'], correctAnswer: '5(a-2)(a+2)', explanation: '5(a²-4)' },
      { question: 'Factorize: x³ - x', options: ['x(x-1)(x+1)', 'x(x²-1)', 'x(x-1)²', '(x²-x)(x+1)'], correctAnswer: 'x(x-1)(x+1)', explanation: 'x(x²-1) = x(x-1)(x+1)' },
      { question: 'Factorize: m⁴ - n⁴', options: ['(m²+n²)(m-n)(m+n)', '(m²-n²)²', '(m-n)⁴', '(m²+n²)(m²-n²)'], correctAnswer: '(m²+n²)(m-n)(m+n)', explanation: '(m²)² - (n²)²' },
      { question: 'Factorize: 16y² - 81', options: ['(4y-9)(4y+9)', '(4y-9)²', '(8y-9)(2y+9)', '(4y+9)²'], correctAnswer: '(4y-9)(4y+9)', explanation: '(4y)² - 9²' },
      { question: 'Factorize: a²b² - 1', options: ['(ab-1)(ab+1)', '(ab-1)²', '(a-b)(a+b)', '(ab+1)²'], correctAnswer: '(ab-1)(ab+1)', explanation: '(ab)² - 1²' },
      { question: 'Factorize: 100x² - 144y²', options: ['4(5x-6y)(5x+6y)', '(10x-12y)(10x+12y)', '4(25x²-36y²)', '2(50x²-72y²)'], correctAnswer: '4(5x-6y)(5x+6y)', explanation: 'HCF 4 first, then diff of squares' },
      { question: 'Factorize: 1/4 - x²', options: ['(1/2-x)(1/2+x)', '(1/4-x)(1/4+x)', '(1/2-x)²', '(x-1/2)(x+1/2)'], correctAnswer: '(1/2-x)(1/2+x)', explanation: '(1/2)² - x²' },
      { question: 'Factorize: (x+y)² - z²', options: ['(x+y-z)(x+y+z)', '(x+y-z)²', '(x+y+z)(x-y-z)', '(x+y)²-z²'], correctAnswer: '(x+y-z)(x+y+z)', explanation: 'a=(x+y), b=z' },
      { question: 'Factorize: 49 - (a-b)²', options: ['(7-a+b)(7+a-b)', '(7-a-b)(7+a+b)', '(7-a+b)²', '(49-a+b)(1+a-b)'], correctAnswer: '(7-a+b)(7+a-b)', explanation: '7² - (a-b)²' },
      { question: 'Factorize: x⁴ - 1', options: ['(x²+1)(x-1)(x+1)', '(x²-1)²', '(x-1)⁴', '(x²+1)(x²-1)'], correctAnswer: '(x²+1)(x-1)(x+1)', explanation: '(x²)² - 1²' },
    ]
  },

  // ── 8E: Factorization — trinomials ──────────────────────────────────────
  {
    sheet: '8E', topic: 'Factorization - Trinomials', grade: 8,
    questions: [
      { question: 'Factorize: x² + 5x + 6', options: ['(x+2)(x+3)', '(x+1)(x+6)', '(x+5)(x+1)', '(x-2)(x-3)'], correctAnswer: '(x+2)(x+3)', explanation: '2+3=5, 2×3=6' },
      { question: 'Factorize: x² + 7x + 10', options: ['(x+2)(x+5)', '(x+1)(x+10)', '(x+3)(x+4)', '(x-2)(x-5)'], correctAnswer: '(x+2)(x+5)', explanation: '2+5=7, 2×5=10' },
      { question: 'Factorize: x² + 3x + 2', options: ['(x+1)(x+2)', '(x+3)(x+1)', '(x-1)(x-2)', '(x+0)(x+3)'], correctAnswer: '(x+1)(x+2)', explanation: '1+2=3, 1×2=2' },
      { question: 'Factorize: x² + 8x + 12', options: ['(x+6)(x+2)', '(x+4)(x+3)', '(x+8)(x+1)', '(x-6)(x-2)'], correctAnswer: '(x+6)(x+2)', explanation: '6+2=8, 6×2=12' },
      { question: 'Factorize: x² + 9x + 20', options: ['(x+4)(x+5)', '(x+2)(x+10)', '(x+1)(x+20)', '(x-4)(x-5)'], correctAnswer: '(x+4)(x+5)', explanation: '4+5=9, 4×5=20' },
      { question: 'Factorize: x² - 5x + 6', options: ['(x-2)(x-3)', '(x-1)(x-6)', '(x+2)(x+3)', '(x-5)(x+1)'], correctAnswer: '(x-2)(x-3)', explanation: '-2-3=-5, -2×-3=6' },
      { question: 'Factorize: x² - 7x + 12', options: ['(x-3)(x-4)', '(x-2)(x-6)', '(x+3)(x+4)', '(x-7)(x+1)'], correctAnswer: '(x-3)(x-4)', explanation: '-3-4=-7, -3×-4=12' },
      { question: 'Factorize: x² - 9x + 14', options: ['(x-2)(x-7)', '(x-3)(x-6)', '(x+2)(x+7)', '(x-9)(x+1)'], correctAnswer: '(x-2)(x-7)', explanation: '-2-7=-9, -2×-7=14' },
      { question: 'Factorize: x² - 10x + 21', options: ['(x-3)(x-7)', '(x-2)(x-8)', '(x+3)(x+7)', '(x-10)(x+1)'], correctAnswer: '(x-3)(x-7)', explanation: '-3-7=-10, -3×-7=21' },
      { question: 'Factorize: x² + x - 6', options: ['(x+3)(x-2)', '(x-3)(x+2)', '(x+6)(x-1)', '(x-6)(x+1)'], correctAnswer: '(x+3)(x-2)', explanation: '3-2=1, 3×-2=-6' },
      { question: 'Factorize: x² + 2x - 8', options: ['(x+4)(x-2)', '(x-4)(x+2)', '(x+8)(x-1)', '(x-8)(x+1)'], correctAnswer: '(x+4)(x-2)', explanation: '4-2=2, 4×-2=-8' },
      { question: 'Factorize: x² + 3x - 10', options: ['(x+5)(x-2)', '(x-5)(x+2)', '(x+10)(x-1)', '(x-10)(x+1)'], correctAnswer: '(x+5)(x-2)', explanation: '5-2=3, 5×-2=-10' },
      { question: 'Factorize: x² - x - 12', options: ['(x-4)(x+3)', '(x+4)(x-3)', '(x-6)(x+2)', '(x-12)(x+1)'], correctAnswer: '(x-4)(x+3)', explanation: '-4+3=-1, -4×3=-12' },
      { question: 'Factorize: x² - 2x - 15', options: ['(x-5)(x+3)', '(x+5)(x-3)', '(x-15)(x+1)', '(x+2)(x-7)'], correctAnswer: '(x-5)(x+3)', explanation: '-5+3=-2, -5×3=-15' },
      { question: 'Factorize: 2x² + 5x + 2', options: ['(2x+1)(x+2)', '(2x+2)(x+1)', '(x+1)(x+4)', '(2x-1)(x-2)'], correctAnswer: '(2x+1)(x+2)', explanation: 'Mid-term splitting: 2x²+4x+x+2' },
      { question: 'Factorize: 3x² + 7x + 2', options: ['(3x+1)(x+2)', '(3x+2)(x+1)', '(x+1)(x+6)', '(3x-1)(x-2)'], correctAnswer: '(3x+1)(x+2)', explanation: '3x²+6x+x+2' },
      { question: 'Factorize: 2x² + 7x + 3', options: ['(2x+1)(x+3)', '(2x+3)(x+1)', '(x+1)(x+6)', '(2x-1)(x-3)'], correctAnswer: '(2x+1)(x+3)', explanation: '2x²+6x+x+3' },
      { question: 'Factorize: 5x² - 7x + 2', options: ['(5x-2)(x-1)', '(5x-1)(x-2)', '(5x+2)(x+1)', '(x-1)(x-6)'], correctAnswer: '(5x-2)(x-1)', explanation: '5x²-5x-2x+2' },
      { question: 'Factorize: 3x² - 5x - 2', options: ['(3x+1)(x-2)', '(3x-1)(x+2)', '(3x-2)(x+1)', '(x-1)(x+6)'], correctAnswer: '(3x+1)(x-2)', explanation: '3x²-6x+x-2' },
      { question: 'Factorize: 6x² + x - 1', options: ['(3x-1)(2x+1)', '(3x+1)(2x-1)', '(6x+1)(x-1)', '(2x-1)(3x-1)'], correctAnswer: '(3x-1)(2x+1)', explanation: '6x²+3x-2x-1' },
    ]
  },

  // ── 8F: HCF of algebraic expressions (म.स.) ─────────────────────────────
  {
    sheet: '8F', topic: 'HCF of Algebraic Expressions', grade: 8,
    questions: [
      { question: 'HCF of 4x and 8x²', options: ['4x', '8x', 'x', '4'], correctAnswer: '4x', explanation: 'Common: 4 and x' },
      { question: 'HCF of 3a²b and 6ab²', options: ['3ab', '6ab', '3a²b²', 'ab'], correctAnswer: '3ab', explanation: 'Common: 3, a, and b' },
      { question: 'HCF of 10x²y³ and 15x³y²', options: ['5x²y²', '5x³y³', '30x³y³', '5xy'], correctAnswer: '5x²y²', explanation: 'Lowest powers: x² and y², HCF(10,15)=5' },
      { question: 'HCF of (x+1) and (x+1)²', options: ['x+1', '(x+1)²', '1', 'x'], correctAnswer: 'x+1', explanation: 'Lowest power is 1' },
      { question: 'HCF of 2(x-y) and 4(x-y)', options: ['2(x-y)', '4(x-y)', '2', 'x-y'], correctAnswer: '2(x-y)', explanation: 'HCF of coefficients is 2' },
      { question: 'HCF of x²-4 and x-2', options: ['x-2', 'x+2', 'x²-4', '1'], correctAnswer: 'x-2', explanation: 'x²-4 = (x-2)(x+2)' },
      { question: 'HCF of x²-9 and x²+3x', options: ['x+3', 'x-3', 'x', '1'], correctAnswer: 'x+3', explanation: '(x-3)(x+3) and x(x+3)' },
      { question: 'HCF of a²+ab and ab+b²', options: ['a+b', 'a', 'b', 'ab'], correctAnswer: 'a+b', explanation: 'a(a+b) and b(a+b)' },
      { question: 'HCF of 3x-6 and 5x-10', options: ['x-2', '3', '5', '15'], correctAnswer: 'x-2', explanation: '3(x-2) and 5(x-2)' },
      { question: 'HCF of x²+5x+6 and x²+3x+2', options: ['x+2', 'x+3', 'x+1', '1'], correctAnswer: 'x+2', explanation: '(x+2)(x+3) and (x+2)(x+1)' },
      { question: 'HCF of m²-n² and (m-n)²', options: ['m-n', 'm+n', 'm²-n²', '1'], correctAnswer: 'm-n', explanation: '(m-n)(m+n) and (m-n)(m-n)' },
      { question: 'HCF of 8x³ and 12x²', options: ['4x²', '8x²', '24x³', '4x'], correctAnswer: '4x²', explanation: 'HCF(8,12)=4, lowest power x²' },
      { question: 'HCF of a(x+y) and b(x+y)', options: ['x+y', 'a', 'b', 'ab'], correctAnswer: 'x+y', explanation: 'Common term is (x+y)' },
      { question: 'HCF of x²-1 and x²+2x+1', options: ['x+1', 'x-1', '(x+1)²', '1'], correctAnswer: 'x+1', explanation: '(x-1)(x+1) and (x+1)²' },
      { question: 'HCF of 15p²q and 20pq²', options: ['5pq', '5p²q²', '60p²q²', 'pq'], correctAnswer: '5pq', explanation: 'HCF(15,20)=5' },
      { question: 'HCF of x²-x and x²-1', options: ['x-1', 'x', 'x+1', '1'], correctAnswer: 'x-1', explanation: 'x(x-1) and (x-1)(x+1)' },
      { question: 'HCF of 4x+4 and 6x+6', options: ['2(x+1)', 'x+1', '2', '24(x+1)'], correctAnswer: '2(x+1)', explanation: '4(x+1) and 6(x+1), HCF(4,6)=2' },
      { question: 'HCF of x²+2x and x²+4x+4', options: ['x+2', 'x', '(x+2)²', '1'], correctAnswer: 'x+2', explanation: 'x(x+2) and (x+2)²' },
      { question: 'HCF of abc and bcd', options: ['bc', 'a', 'd', 'abcd'], correctAnswer: 'bc', explanation: 'Common letters are b and c' },
      { question: 'HCF of 7x² and 14x', options: ['7x', '14x²', 'x', '7'], correctAnswer: '7x', explanation: 'HCF(7,14)=7' },
    ]
  },

  // ── 8G: LCM of algebraic expressions (ल.स.) ─────────────────────────────
  {
    sheet: '8G', topic: 'LCM of Algebraic Expressions', grade: 8,
    questions: [
      { question: 'LCM of 4x and 8x²', options: ['8x²', '4x', '32x³', '8x'], correctAnswer: '8x²', explanation: 'Highest power and LCM of coefficients' },
      { question: 'LCM of 3a²b and 6ab²', options: ['6a²b²', '3ab', '18a³b³', '6ab'], correctAnswer: '6a²b²', explanation: 'LCM(3,6)=6, highest powers a², b²' },
      { question: 'LCM of 10x and 15y', options: ['30xy', '150xy', '5', '10x15y'], correctAnswer: '30xy', explanation: 'LCM(10,15)=30' },
      { question: 'LCM of (x+1) and (x+1)²', options: ['(x+1)²', 'x+1', '(x+1)³', '1'], correctAnswer: '(x+1)²', explanation: 'Highest power' },
      { question: 'LCM of x-2 and x+2', options: ['(x-2)(x+2)', 'x²-2', 'x-2', '1'], correctAnswer: '(x-2)(x+2)', explanation: 'No common factors, so product' },
      { question: 'LCM of 2x and 3x', options: ['6x', '5x', '6x²', 'x'], correctAnswer: '6x', explanation: 'LCM(2,3)=6, common x' },
      { question: 'LCM of x²-4 and x-2', options: ['x²-4', 'x-2', '(x-2)²(x+2)', 'x+2'], correctAnswer: 'x²-4', explanation: '(x-2)(x+2) includes x-2' },
      { question: 'LCM of a²+ab and b²+ab', options: ['ab(a+b)', 'a+b', 'a²b²', 'ab'], correctAnswer: 'ab(a+b)', explanation: 'a(a+b) and b(a+b)' },
      { question: 'LCM of 4(a+b) and 6(a+b)', options: ['12(a+b)', '24(a+b)', '2(a+b)', 'a+b'], correctAnswer: '12(a+b)', explanation: 'LCM(4,6)=12' },
      { question: 'LCM of x²-1 and x+1', options: ['x²-1', 'x+1', '(x-1)(x+1)²', 'x-1'], correctAnswer: 'x²-1', explanation: '(x-1)(x+1) contains x+1' },
      { question: 'LCM of 5x² and 10x³', options: ['10x³', '50x⁵', '5x²', '10x²'], correctAnswer: '10x³', explanation: 'Highest power' },
      { question: 'LCM of x and x+1', options: ['x(x+1)', 'x+1', '2x+1', '1'], correctAnswer: 'x(x+1)', explanation: 'Product of coprime terms' },
      { question: 'LCM of 8a² and 12a', options: ['24a²', '8a²', '12a²', '96a³'], correctAnswer: '24a²', explanation: 'LCM(8,12)=24' },
      { question: 'LCM of x-y and y-x', options: ['x-y', '-(x-y)', '(x-y)(y-x)', 'x+y'], correctAnswer: 'x-y', explanation: 'y-x = -(x-y), magnitude is same' },
      { question: 'LCM of 3, x, and x²', options: ['3x²', '3x', 'x²', '3x³'], correctAnswer: '3x²', explanation: 'Product of constants and highest power' },
      { question: 'LCM of (x+2) and (x+3)', options: ['(x+2)(x+3)', 'x²+5x+6', 'Both A and B', 'x+5'], correctAnswer: 'Both A and B', explanation: 'They are the same expression' },
      { question: 'LCM of ab and bc', options: ['abc', 'ab²c', 'a', 'c'], correctAnswer: 'abc', explanation: 'Common b, distinct a and c' },
      { question: 'LCM of 2x²y and 4xy²', options: ['4x²y²', '8x²y²', '2xy', '4xy'], correctAnswer: '4x²y²', explanation: 'Highest powers' },
      { question: 'LCM of x²-9 and x+3', options: ['x²-9', 'x+3', 'x-3', '(x-9)(x+3)'], correctAnswer: 'x²-9', explanation: '(x-3)(x+3) contains x+3' },
      { question: 'LCM of 15 and 5x', options: ['15x', '75x', '5x', '15'], correctAnswer: '15x', explanation: 'LCM(15,5)=15, include x' },
    ]
  },

  // ── 8H: Linear Equations — two variables (graphical) ───────────────────
  {
    sheet: '8H', topic: 'Linear Equations - Graphical', grade: 8,
    questions: [
      { question: 'The graph of a linear equation in two variables is a:', options: ['Straight line', 'Circle', 'Curve', 'Point'], correctAnswer: 'Straight line', explanation: 'Linear = line' },
      { question: 'At the origin, the coordinates are:', options: ['(0,0)', '(1,1)', '(0,1)', '(1,0)'], correctAnswer: '(0,0)', explanation: 'Starting point of graph' },
      { question: 'The x-axis is the line where:', options: ['y = 0', 'x = 0', 'y = x', 'x = 1'], correctAnswer: 'y = 0', explanation: 'Height is zero on x-axis' },
      { question: 'The y-axis is the line where:', options: ['x = 0', 'y = 0', 'x = y', 'y = 1'], correctAnswer: 'x = 0', explanation: 'Distance from center is zero on y-axis' },
      { question: 'The point (2,3) lies in which quadrant?', options: ['1st', '2nd', '3rd', '4th'], correctAnswer: '1st', explanation: 'Both x and y are positive' },
      { question: 'The point (-2, 5) lies in which quadrant?', options: ['2nd', '1st', '3rd', '4th'], correctAnswer: '2nd', explanation: 'x is negative, y is positive' },
      { question: 'If x + y = 5, what is y when x = 2?', options: ['3', '5', '7', '2'], correctAnswer: '3', explanation: '2 + y = 5 → y = 3' },
      { question: 'The line x = 4 is parallel to the:', options: ['y-axis', 'x-axis', 'Origin', 'None'], correctAnswer: 'y-axis', explanation: 'Vertical line' },
      { question: 'The line y = -2 is parallel to the:', options: ['x-axis', 'y-axis', 'Origin', 'None'], correctAnswer: 'x-axis', explanation: 'Horizontal line' },
      { question: 'Where do the lines x=2 and y=3 intersect?', options: ['(2,3)', '(3,2)', '(0,0)', '(2,0)'], correctAnswer: '(2,3)', explanation: 'Intersection is the point (x,y)' },
      { question: 'Does (1,1) satisfy the equation 2x + 3y = 5?', options: ['Yes', 'No', 'Maybe', 'Only if x=0'], correctAnswer: 'Yes', explanation: '2(1) + 3(1) = 5' },
      { question: 'What is the y-intercept of y = 2x + 1?', options: ['1', '2', '0', '-1'], correctAnswer: '1', explanation: 'The constant term' },
      { question: 'Slope of the line y = 3x - 5 is:', options: ['3', '-5', '5', '0'], correctAnswer: '3', explanation: 'Coefficient of x' },
      { question: 'If a line passes through (0,0), its equation is of form:', options: ['y = mx', 'y = mx + c', 'x = c', 'y = c'], correctAnswer: 'y = mx', explanation: 'No constant term (intercept is 0)' },
      { question: 'Which point lies on x - y = 0?', options: ['(2,2)', '(2,3)', '(1,0)', '(0,1)'], correctAnswer: '(2,2)', explanation: 'x must equal y' },
      { question: 'A horizontal line has a slope of:', options: ['0', '1', 'Infinite', '-1'], correctAnswer: '0', explanation: 'No steepness' },
      { question: 'A vertical line has a slope of:', options: ['Undefined', '0', '1', '100'], correctAnswer: 'Undefined', explanation: 'Steepness is infinite' },
      { question: 'In y = mx + c, "c" represents:', options: ['y-intercept', 'Slope', 'x-intercept', 'Variable'], correctAnswer: 'y-intercept', explanation: 'Where it hits y-axis' },
      { question: 'Two parallel lines have the same:', options: ['Slope', 'Intercept', 'Equation', 'Length'], correctAnswer: 'Slope', explanation: 'Parallel lines have equal steepness' },
      { question: 'The solution to a system of equations is their point of:', options: ['Intersection', 'Origin', 'Rotation', 'None'], correctAnswer: 'Intersection', explanation: 'Where lines cross' },
    ]
  },

  // ── 8I: Linear Equations — substitution method ─────────────────────────
  {
    sheet: '8I', topic: 'Linear Equations - Substitution', grade: 8,
    questions: [
      { question: 'In x + y = 5, what is x in terms of y?', options: ['x = 5 - y', 'x = y - 5', 'x = 5 + y', 'x = 5y'], correctAnswer: 'x = 5 - y', explanation: 'Move y to other side' },
      { question: 'Solve x = 2y and x + y = 9. Find y.', options: ['3', '6', '9', '2'], correctAnswer: '3', explanation: '2y + y = 9 → 3y = 9 → y = 3' },
      { question: 'Solve y = x + 1 and x + y = 7. Find x.', options: ['3', '4', '7', '1'], correctAnswer: '3', explanation: 'x + (x+1) = 7 → 2x = 6 → x = 3' },
      { question: 'If x = 3, solve 2x + y = 10 for y.', options: ['4', '6', '10', '3'], correctAnswer: '4', explanation: '2(3) + y = 10 → 6 + y = 10' },
      { question: 'Solve x = y and 2x + y = 6.', options: ['(2,2)', '(3,3)', '(1,1)', '(0,0)'], correctAnswer: '(2,2)', explanation: '2y + y = 6 → 3y = 6 → y=2, x=2' },
      { question: 'Solve y = 2 and 3x + y = 11.', options: ['x = 3', 'x = 2', 'x = 5', 'x = 1'], correctAnswer: 'x = 3', explanation: '3x + 2 = 11 → 3x = 9' },
      { question: 'Substitution method is best when one variable has coefficient:', options: ['1', '5', '10', '0'], correctAnswer: '1', explanation: 'Easy to isolate' },
      { question: 'Solve x = 2y - 1 and x + y = 5.', options: ['(3,2)', '(2,3)', '(1,2)', '(4,1)'], correctAnswer: '(3,2)', explanation: '(2y-1) + y = 5 → 3y = 6 → y=2' },
      { question: 'Solve y = 3x and x + y = 12.', options: ['(3,9)', '(9,3)', '(4,8)', '(2,10)'], correctAnswer: '(3,9)', explanation: 'x + 3x = 12 → 4x = 12 → x=3' },
      { question: 'Solve x = 5 and y = x - 2.', options: ['(5,3)', '(3,5)', '(5,7)', '(2,5)'], correctAnswer: '(5,3)', explanation: 'y = 5 - 2 = 3' },
      { question: 'If 2x = y, then 3x + y = 10 becomes:', options: ['5x = 10', '4x = 10', '3x = 10', 'x = 10'], correctAnswer: '5x = 10', explanation: '3x + 2x = 5x' },
      { question: 'Solve y = x and x - y = 0.', options: ['Infinite solutions', 'No solution', '(1,1)', '(0,0)'], correctAnswer: 'Infinite solutions', explanation: 'They are the same line' },
      { question: 'Solve x + y = 10 and x = y + 2.', options: ['(6,4)', '(4,6)', '(5,5)', '(7,3)'], correctAnswer: '(6,4)', explanation: '(y+2) + y = 10 → 2y=8' },
      { question: 'Solve y = -x and 2x + y = 5.', options: ['x = 5', 'x = 0', 'x = 2.5', 'x = -5'], correctAnswer: 'x = 5', explanation: '2x + (-x) = 5 → x = 5' },
      { question: 'Solve x = 0 and 5x + 3y = 9.', options: ['y = 3', 'y = 0', 'y = 9', 'x = 3'], correctAnswer: 'y = 3', explanation: '0 + 3y = 9' },
      { question: 'Solve y = x + 5 and y = 2x.', options: ['(5,10)', '(10,5)', '(5,5)', '(0,5)'], correctAnswer: '(5,10)', explanation: '2x = x + 5 → x = 5' },
      { question: 'Solve x = y/2 and x + y = 6.', options: ['(2,4)', '(4,2)', '(3,3)', '(1,5)'], correctAnswer: '(2,4)', explanation: 'y/2 + y = 6 → 1.5y = 6 → y=4' },
      { question: 'If x + y = 4 and x - y = 2, find x by substitution.', options: ['3', '1', '2', '4'], correctAnswer: '3', explanation: 'x = y+2 → (y+2)+y = 4 → 2y=2 → y=1, x=3' },
      { question: 'Solve y = 4x - 1 and x = 1.', options: ['(1,3)', '(1,4)', '(1,5)', '(1,1)'], correctAnswer: '(1,3)', explanation: 'y = 4(1) - 1 = 3' },
      { question: 'The first step in substitution is to ___ one variable.', options: ['Isolate', 'Delete', 'Add', 'Multiply'], correctAnswer: 'Isolate', explanation: 'Get it by itself' },
    ]
  },

  // ── 8J: Linear Equations — elimination method ───────────────────────────
  {
    sheet: '8J', topic: 'Linear Equations - Elimination', grade: 8,
    questions: [
      { question: 'Solve x + y = 10 and x - y = 4. Find x.', options: ['7', '3', '10', '4'], correctAnswer: '7', explanation: 'Add equations: 2x = 14' },
      { question: 'Solve x + y = 8 and x - y = 2. Find y.', options: ['3', '5', '8', '2'], correctAnswer: '3', explanation: 'Subtract equations: 2y = 6' },
      { question: 'In 2x + y = 5 and x - y = 1, adding gives:', options: ['3x = 6', 'x = 4', '3x = 4', 'y = 6'], correctAnswer: '3x = 6', explanation: 'y and -y cancel out' },
      { question: 'To eliminate x in x + y = 5 and 2x + y = 8, multiply first eq by:', options: ['2', '5', '8', '-1'], correctAnswer: '2', explanation: 'To match the 2x' },
      { question: 'Solve 3x + 2y = 12 and 3x - 2y = 0. Find x.', options: ['2', '3', '4', '0'], correctAnswer: '2', explanation: 'Add: 6x = 12' },
      { question: 'Solve x + 2y = 10 and x + y = 7. Find y.', options: ['3', '4', '7', '10'], correctAnswer: '3', explanation: 'Subtract: y = 3' },
      { question: 'Solve 2x + 3y = 13 and 2x + y = 7. Find y.', options: ['3', '2', '1', '5'], correctAnswer: '3', explanation: 'Subtract: 2y = 6' },
      { question: 'Solve x + y = 5 and 2x + 2y = 10.', options: ['Infinite', 'None', '(1,4)', '(2,3)'], correctAnswer: 'Infinite', explanation: 'Same line' },
      { question: 'Solve x + y = 5 and x + y = 7.', options: ['No solution', 'Infinite', '(0,0)', '(6,1)'], correctAnswer: 'No solution', explanation: 'Parallel lines' },
      { question: 'To eliminate y in x + 3y = 10 and x + y = 4, multiply second by:', options: ['3', '10', '4', '1'], correctAnswer: '3', explanation: 'To match 3y' },
      { question: 'Solve 5x + y = 11 and 3x - y = 5.', options: ['(2,1)', '(1,2)', '(3,4)', '(0,11)'], correctAnswer: '(2,1)', explanation: 'Add: 8x = 16 → x=2' },
      { question: 'Solve x - y = 0 and x + y = 10.', options: ['(5,5)', '(10,0)', '(0,10)', '(4,6)'], correctAnswer: '(5,5)', explanation: 'Add: 2x = 10' },
      { question: 'Solve 4x + 3y = 24 and 4x - 3y = 0.', options: ['(3,4)', '(4,3)', '(6,0)', '(0,8)'], correctAnswer: '(3,4)', explanation: 'Add: 8x = 24 → x=3' },
      { question: 'Elimination is also known as the ___ method.', options: ['Addition', 'Graphing', 'Square', 'Division'], correctAnswer: 'Addition', explanation: 'Or subtraction method' },
      { question: 'Solve 2x + y = 7 and x + y = 4.', options: ['(3,1)', '(1,3)', '(2,2)', '(4,0)'], correctAnswer: '(3,1)', explanation: 'Subtract: x = 3' },
      { question: 'Solve 3x + y = 10 and x + y = 4.', options: ['(3,1)', '(1,3)', '(2,2)', '(4,0)'], correctAnswer: '(3,1)', explanation: 'Subtract: 2x = 6 → x=3' },
      { question: 'Solve x + 4y = 18 and x + y = 9.', options: ['(6,3)', '(3,6)', '(9,0)', '(2,4)'], correctAnswer: '(6,3)', explanation: 'Subtract: 3y = 9 → y=3' },
      { question: 'Solve 2x + 2y = 20 and x - y = 0.', options: ['(5,5)', '(10,10)', '(0,0)', '(8,8)'], correctAnswer: '(5,5)', explanation: 'Divide first by 2: x+y=10, then add' },
      { question: 'Solve x + y = 1 and x - y = 1.', options: ['(1,0)', '(0,1)', '(1,1)', '(0,0)'], correctAnswer: '(1,0)', explanation: 'Add: 2x = 2 → x=1' },
      { question: 'If you get 0 = 0 after eliminating, there are ___ solutions.', options: ['Infinite', 'No', 'One', 'Two'], correctAnswer: 'Infinite', explanation: 'Identity means coincident lines' },
    ]
  },

  // ── 8K: Quadrilaterals — properties and area ────────────────────────────
  {
    sheet: '8K', topic: 'Quadrilaterals', grade: 8,
    questions: [
      { question: 'Sum of interior angles of a quadrilateral?', options: ['360°', '180°', '540°', '90°'], correctAnswer: '360°', explanation: 'Square/Rectangle 90×4=360' },
      { question: 'Area of a parallelogram formula?', options: ['Base × Height', '1/2 × b × h', 'Side²', 'Length × Width'], correctAnswer: 'Base × Height', explanation: 'Standard formula' },
      { question: 'Area of a rhombus using diagonals?', options: ['1/2 × d1 × d2', 'd1 × d2', 'Base × Height', 'Side²'], correctAnswer: '1/2 × d1 × d2', explanation: 'Rhombus formula' },
      { question: 'Area of a square with side 6cm?', options: ['36 cm²', '24 cm²', '12 cm²', '18 cm²'], correctAnswer: '36 cm²', explanation: '6 × 6 = 36' },
      { question: 'Area of a rectangle: length 8cm, width 5cm?', options: ['40 cm²', '26 cm²', '13 cm²', '20 cm²'], correctAnswer: '40 cm²', explanation: '8 × 5 = 40' },
      { question: 'A quadrilateral with only one pair of parallel sides?', options: ['Trapezium', 'Parallelogram', 'Rhombus', 'Square'], correctAnswer: 'Trapezium', explanation: 'Definition of trapezium' },
      { question: 'Area of a trapezium formula?', options: ['1/2 × h(a+b)', 'Base × Height', 'Length × Breadth', '1/2 × d1 × d2'], correctAnswer: '1/2 × h(a+b)', explanation: 'Sum of parallel sides' },
      { question: 'If diagonals of a quadrilateral bisect at 90°, it is a:', options: ['Rhombus', 'Rectangle', 'Parallelogram', 'Trapezium'], correctAnswer: 'Rhombus', explanation: 'Property of rhombus/square' },
      { question: 'Area of a square is 64 cm². Find perimeter.', options: ['32 cm', '16 cm', '64 cm', '8 cm'], correctAnswer: '32 cm', explanation: 'Side=8, Perimeter=8×4=32' },
      { question: 'In a parallelogram, opposite angles are:', options: ['Equal', '90°', 'Supplementary', '180°'], correctAnswer: 'Equal', explanation: 'Property of parallelogram' },
      { question: 'Adjacent angles in a parallelogram sum to:', options: ['180°', '360°', '90°', '0°'], correctAnswer: '180°', explanation: 'Co-interior angles' },
      { question: 'Area of triangle is ___ of a parallelogram on same base/height.', options: ['Half', 'Double', 'Equal', 'One-third'], correctAnswer: 'Half', explanation: '1/2 × b × h vs b × h' },
      { question: 'A rectangle is a parallelogram with each angle:', options: ['90°', '60°', '180°', '45°'], correctAnswer: '90°', explanation: 'Definition of rectangle' },
      { question: 'Find area of parallelogram: base=12cm, height=5cm.', options: ['60 cm²', '30 cm²', '17 cm²', '24 cm²'], correctAnswer: '60 cm²', explanation: '12 × 5 = 60' },
      { question: 'Find area of rhombus: d1=10cm, d2=8cm.', options: ['40 cm²', '80 cm²', '18 cm²', '20 cm²'], correctAnswer: '40 cm²', explanation: '1/2 × 10 × 8 = 40' },
      { question: 'A square has perimeter 20cm. Find area.', options: ['25 cm²', '20 cm²', '100 cm²', '16 cm²'], correctAnswer: '25 cm²', explanation: 'Side=5, Area=25' },
      { question: 'How many diagonals does a quadrilateral have?', options: ['2', '4', '1', '0'], correctAnswer: '2', explanation: 'Connects opposite vertices' },
      { question: 'Area of trapezium: h=4, parallel sides=5 and 7.', options: ['24', '48', '12', '35'], correctAnswer: '24', explanation: '1/2 × 4 × (5+7) = 2 × 12 = 24' },
      { question: 'A parallelogram with all sides equal is a:', options: ['Rhombus', 'Rectangle', 'Trapezium', 'Kite'], correctAnswer: 'Rhombus', explanation: 'Rhombus definition' },
      { question: 'Total degrees in 2 quadrilaterals?', options: ['720°', '360°', '180°', '540°'], correctAnswer: '720°', explanation: '360 × 2 = 720' },
    ]
  },

  // ── 8L: Profit, Loss, Discount — detailed (नाफा नोक्सान) ─────────────────
  {
    sheet: '8L', topic: 'Profit, Loss, and Discount', grade: 8,
    questions: [
      { question: 'Profit = ?', options: ['SP - CP', 'CP - SP', 'MP - SP', 'SP + CP'], correctAnswer: 'SP - CP', explanation: 'Selling Price - Cost Price' },
      { question: 'Loss = ?', options: ['CP - SP', 'SP - CP', 'MP - CP', 'CP + SP'], correctAnswer: 'CP - SP', explanation: 'Cost Price - Selling Price' },
      { question: 'CP = 500, SP = 600. Profit?', options: ['100', '1100', '50', '200'], correctAnswer: '100', explanation: '600 - 500 = 100' },
      { question: 'Profit % formula?', options: ['(Profit/CP)×100', '(Profit/SP)×100', '(Loss/CP)×100', 'Profit×100'], correctAnswer: '(Profit/CP)×100', explanation: 'Calculated on Cost Price' },
      { question: 'CP = 200, SP = 150. Loss %?', options: ['25%', '50%', '20%', '10%'], correctAnswer: '25%', explanation: 'Loss=50. (50/200)×100 = 25%' },
      { question: 'Discount = ?', options: ['MP - SP', 'SP - CP', 'CP - SP', 'MP + SP'], correctAnswer: 'MP - SP', explanation: 'Marked Price - Selling Price' },
      { question: 'MP = 1000, Discount = 10%. SP?', options: ['900', '1100', '990', '800'], correctAnswer: '900', explanation: '10% of 1000 is 100. 1000-100=900' },
      { question: 'SP = 450, Profit = 50. CP?', options: ['400', '500', '450', '350'], correctAnswer: '400', explanation: '450 - 50 = 400' },
      { question: 'If SP > CP, there is a:', options: ['Profit', 'Loss', 'Discount', 'Tax'], correctAnswer: 'Profit', explanation: 'Gaining money' },
      { question: 'Discount is always calculated on:', options: ['MP', 'CP', 'SP', 'VAT'], correctAnswer: 'MP', explanation: 'Marked Price' },
      { question: 'MP = 1200, SP = 1000. Discount %?', options: ['16.67%', '20%', '15%', '10%'], correctAnswer: '16.67%', explanation: '(200/1200)×100' },
      { question: 'Buy for 80, sell for 100. Profit %?', options: ['25%', '20%', '10%', '15%'], correctAnswer: '25%', explanation: '(20/80)×100 = 25%' },
      { question: 'CP = 1000, Loss = 10%. SP?', options: ['900', '1100', '950', '1000'], correctAnswer: '900', explanation: '1000 - 100 = 900' },
      { question: 'Marked Price is also called:', options: ['List Price', 'Cost Price', 'Selling Price', 'Net Price'], correctAnswer: 'List Price', explanation: 'Price on the tag' },
      { question: 'SP = CP + ___', options: ['Profit', 'Loss', 'Discount', 'VAT'], correctAnswer: 'Profit', explanation: 'Standard formula' },
      { question: 'Loss % is 10%, CP is 500. Loss amount?', options: ['50', '10', '5', '100'], correctAnswer: '50', explanation: '10% of 500' },
      { question: 'Discount % = (Discount/___) × 100', options: ['MP', 'SP', 'CP', '100'], correctAnswer: 'MP', explanation: 'Based on Marked Price' },
      { question: 'Net SP = SP - ___', options: ['Wait, SP is Net', 'VAT', 'Discount', 'Profit'], correctAnswer: 'Wait, SP is Net', explanation: 'Usually SP after discount is Net SP' },
      { question: 'CP = 400, SP = 400. Profit?', options: ['0', '400', '100', '1'], correctAnswer: '0', explanation: 'No gain, no loss' },
      { question: 'A shopkeeper gives 20% discount on Rs. 500. SP?', options: ['400', '480', '300', '420'], correctAnswer: '400', explanation: '500 - 100 = 400' },
    ]
  },

  // ── 8M: VAT and Tax calculations (भ्याट) ────────────────────────────────
  {
    sheet: '8M', topic: 'VAT and Tax Calculations', grade: 8,
    questions: [
      { question: 'VAT stands for:', options: ['Value Added Tax', 'Value After Tax', 'Variable Amount Tax', 'Valid Added Tax'], correctAnswer: 'Value Added Tax', explanation: 'Economic term' },
      { question: 'VAT is calculated on:', options: ['SP', 'CP', 'Profit', 'Discount'], correctAnswer: 'SP', explanation: 'Selling Price' },
      { question: 'If SP = 1000 and VAT = 13%, Total?', options: ['1130', '1013', '1300', '1000'], correctAnswer: '1130', explanation: '1000 + 130 = 1130' },
      { question: 'VAT Amount = ___ % of SP', options: ['VAT Rate', '100', 'Profit', '13'], correctAnswer: 'VAT Rate', explanation: 'Standard formula' },
      { question: 'SP with VAT = 226, VAT rate = 13%. SP?', options: ['200', '213', '100', '226'], correctAnswer: '200', explanation: 'X + 0.13X = 226 → 1.13X = 226' },
      { question: 'In Nepal, standard VAT rate is usually:', options: ['13%', '10%', '15%', '5%'], correctAnswer: '13%', explanation: 'Government regulation' },
      { question: 'VAT is a type of ___ tax.', options: ['Indirect', 'Direct', 'Income', 'Property'], correctAnswer: 'Indirect', explanation: 'Paid by consumer via seller' },
      { question: 'Price = 5000, VAT = 13%. VAT amount?', options: ['650', '500', '130', '513'], correctAnswer: '650', explanation: '5000 × 0.13 = 650' },
      { question: 'If total price is 113, SP is 100, VAT is:', options: ['13', '13%', 'Both A and B', '0'], correctAnswer: 'Both A and B', explanation: '13 is the amount, 13% is the rate' },
      { question: 'VAT makes the product ___ for consumers.', options: ['Dearer', 'Cheaper', 'Same price', 'Free'], correctAnswer: 'Dearer', explanation: 'Increases final price' },
      { question: 'VAT is always ___ to the Selling Price.', options: ['Added', 'Subtracted', 'Multiplied', 'Divided'], correctAnswer: 'Added', explanation: 'Final price = SP + VAT' },
      { question: 'SP = 800, VAT = 10%. Total?', options: ['880', '810', '900', '808'], correctAnswer: '880', explanation: '800 + 80 = 880' },
      { question: 'Income tax is paid on:', options: ['Earnings', 'Shopping', 'Selling', 'Marked Price'], correctAnswer: 'Earnings', explanation: 'Based on salary/profit' },
      { question: 'Taxable amount is SP after ___', options: ['Discount', 'VAT', 'Profit', 'Loss'], correctAnswer: 'Discount', explanation: 'VAT is applied after discount' },
      { question: 'Price before VAT = Total / (1 + Rate)', options: ['True', 'False', 'Sometimes', 'Never'], correctAnswer: 'True', explanation: 'Reverse calculation formula' },
      { question: 'If VAT is 260 at 13%, SP is:', options: ['2000', '2600', '1300', '1000'], correctAnswer: '2000', explanation: '260 / 0.13 = 2000' },
      { question: 'Total Price = SP × (100 + VAT%)/100', options: ['True', 'False', 'Maybe', 'Only if SP=100'], correctAnswer: 'True', explanation: 'Standard multiplier' },
      { question: 'Does everyone pay VAT on taxable goods?', options: ['Yes', 'No', 'Only rich', 'Only poor'], correctAnswer: 'Yes', explanation: 'Consumers pay at purchase' },
      { question: 'If SP is 400 and VAT is 52, rate is:', options: ['13%', '10%', '12%', '15%'], correctAnswer: '13%', explanation: '(52/400)×100 = 13%' },
      { question: 'Tax on imported goods is called:', options: ['Customs Duty', 'VAT', 'Income Tax', 'Service Tax'], correctAnswer: 'Customs Duty', explanation: 'Border tax' },
    ]
  },

  // ── 8N: Simple and Compound Interest ────────────────────────────────────
  {
    sheet: '8N', topic: 'Simple and Compound Interest', grade: 8,
    questions: [
      { question: 'Simple Interest (I) formula?', options: ['PTR/100', 'P(1+R/100)', 'PR/100', 'PT/100'], correctAnswer: 'PTR/100', explanation: 'Principal × Time × Rate / 100' },
      { question: 'P=1000, T=2, R=5. Interest?', options: ['100', '10', '50', '200'], correctAnswer: '100', explanation: '1000×2×5 / 100 = 100' },
      { question: 'Total Amount (A) = ?', options: ['P + I', 'P - I', 'P × I', 'I - P'], correctAnswer: 'P + I', explanation: 'Principal plus interest' },
      { question: 'In interest formulas, Time (T) is usually in:', options: ['Years', 'Months', 'Days', 'Weeks'], correctAnswer: 'Years', explanation: 'Standard unit' },
      { question: 'If R is 10% per annum, what is R for 6 months?', options: ['5%', '10%', '20%', '1%'], correctAnswer: '5%', explanation: 'Half a year' },
      { question: 'Compound interest is interest on:', options: ['P and accrued I', 'Only P', 'Only I', 'Fixed amount'], correctAnswer: 'P and accrued I', explanation: 'Interest compounds' },
      { question: 'P=500, I=50. Find Amount.', options: ['550', '450', '500', '100'], correctAnswer: '550', explanation: '500 + 50 = 550' },
      { question: 'Simple interest remains ___ every year.', options: ['Same', 'Increases', 'Decreases', 'Doubles'], correctAnswer: 'Same', explanation: 'Calculated only on initial Principal' },
      { question: 'A = 1200, P = 1000. Interest?', options: ['200', '2200', '100', '1200'], correctAnswer: '200', explanation: '1200 - 1000 = 200' },
      { question: 'Compound interest is ___ than simple interest (for T > 1).', options: ['Greater', 'Smaller', 'Equal', 'Zero'], correctAnswer: 'Greater', explanation: 'Due to compounding' },
      { question: 'P=2000, T=1, R=10. SI?', options: ['200', '20', '100', '2100'], correctAnswer: '200', explanation: '2000×1×10 / 100' },
      { question: 'Find P if I=100, T=2, R=10.', options: ['500', '1000', '200', '2000'], correctAnswer: '500', explanation: 'P = (100×100)/(2×10) = 500' },
      { question: 'Rate (R) is always a ___', options: ['Percentage', 'Whole number', 'Fraction', 'Negative'], correctAnswer: 'Percentage', explanation: 'Usually per annum' },
      { question: 'If interest is compounded annually, T is power in formula.', options: ['True', 'False', 'Maybe', 'Never'], correctAnswer: 'True', explanation: 'A = P(1+R/100)^T' },
      { question: 'SI for Rs 100 at 1% for 1 year?', options: ['1', '10', '100', '0.1'], correctAnswer: '1', explanation: '100×1×1 / 100 = 1' },
      { question: 'If P doubles in 10 years, SI rate is:', options: ['10%', '5%', '20%', '100%'], correctAnswer: '10%', explanation: 'I=P, so P = P×10×R/100' },
      { question: 'Time for P=1000 to become 1200 at 10% SI?', options: ['2 years', '1 year', '3 years', '5 years'], correctAnswer: '2 years', explanation: 'I=200. 200 = 1000×T×10/100' },
      { question: 'Quarterly compounding means ___ times a year.', options: ['4', '3', '2', '12'], correctAnswer: '4', explanation: 'Every 3 months' },
      { question: 'Principal is the ___ money.', options: ['Borrowed/Lent', 'Total', 'Extra', 'Taxed'], correctAnswer: 'Borrowed/Lent', explanation: 'Initial amount' },
      { question: 'Interest is the ___ for using money.', options: ['Cost', 'Gift', 'Tax', 'Principal'], correctAnswer: 'Cost', explanation: 'Rental for money' },
    ]
  },

  // ── 8O: Pythagoras Theorem (पाइथागोरस प्रमेय) ──────────────────────────
  {
    sheet: '8O', topic: 'Pythagoras Theorem', grade: 8,
    questions: [
      { question: 'Pythagoras theorem applies only to ___ triangles.', options: ['Right-angled', 'Equilateral', 'Isosceles', 'Scalene'], correctAnswer: 'Right-angled', explanation: 'Fundamental property' },
      { question: 'Formula: h² = ?', options: ['p² + b²', 'p² - b²', 'p + b', '2p + 2b'], correctAnswer: 'p² + b²', explanation: 'Hypotenuse square = sum of squares of other sides' },
      { question: 'Longest side of right triangle?', options: ['Hypotenuse', 'Base', 'Perpendicular', 'Height'], correctAnswer: 'Hypotenuse', explanation: 'Side opposite to 90°' },
      { question: 'If p=3, b=4, then h=?', options: ['5', '7', '1', '25'], correctAnswer: '5', explanation: '3² + 4² = 9 + 16 = 25. √25 = 5' },
      { question: 'If h=10, b=6, then p=?', options: ['8', '4', '16', '64'], correctAnswer: '8', explanation: '10² - 6² = 100 - 36 = 64. √64 = 8' },
      { question: 'Which is a Pythagorean triple?', options: ['3, 4, 5', '1, 2, 3', '5, 10, 15', '2, 2, 4'], correctAnswer: '3, 4, 5', explanation: '3²+4²=5²' },
      { question: 'In triangle, side opposite to angle θ is:', options: ['Perpendicular', 'Base', 'Hypotenuse', 'Adjacent'], correctAnswer: 'Perpendicular', explanation: 'Basic trigonometry' },
      { question: 'Side adjacent to angle θ (not h) is:', options: ['Base', 'Perpendicular', 'Hypotenuse', 'Opposite'], correctAnswer: 'Base', explanation: 'Definition' },
      { question: 'If h=13, p=5, find b.', options: ['12', '8', '18', '144'], correctAnswer: '12', explanation: '169 - 25 = 144. √144 = 12' },
      { question: 'Can sides 2, 3, 4 form a right triangle?', options: ['No', 'Yes', 'Only if 2 is base', 'Maybe'], correctAnswer: 'No', explanation: '2²+3²=13, not 4²(16)' },
      { question: 'Area of right triangle is 1/2 × ___', options: ['p × b', 'p × h', 'b × h', 'p + b'], correctAnswer: 'p × b', explanation: '1/2 × base × height' },
      { question: 'If p=b=1, then h=?', options: ['√2', '2', '1', '0'], correctAnswer: '√2', explanation: '1² + 1² = 2' },
      { question: 'Diagonal of a rectangle with sides 8 and 6?', options: ['10', '14', '2', '48'], correctAnswer: '10', explanation: 'Forms right triangle' },
      { question: 'Pythagoras was a mathematician from:', options: ['Greece', 'India', 'China', 'Egypt'], correctAnswer: 'Greece', explanation: 'Historical fact' },
      { question: 'If p=8, h=17, find b.', options: ['15', '9', '25', '10'], correctAnswer: '15', explanation: '289 - 64 = 225. √225 = 15' },
      { question: 'The square on the hypotenuse is equal to ___ of squares on other sides.', options: ['Sum', 'Difference', 'Product', 'Ratio'], correctAnswer: 'Sum', explanation: 'The theorem statement' },
      { question: 'Is 6, 8, 10 a right triangle?', options: ['Yes', 'No', 'Sometimes', 'Never'], correctAnswer: 'Yes', explanation: '36 + 64 = 100' },
      { question: 'The angle opposite the hypotenuse is always:', options: ['90°', '45°', '180°', '0°'], correctAnswer: '90°', explanation: 'By definition' },
      { question: 'If h=25, b=7, find p.', options: ['24', '18', '32', '20'], correctAnswer: '24', explanation: '625 - 49 = 576. √576 = 24' },
      { question: 'Pythagoras theorem is used in:', options: ['Navigation', 'Construction', 'Both A and B', 'Cooking'], correctAnswer: 'Both A and B', explanation: 'Wide real-world use' },
    ]
  },

  // ── 8P: Set Theory — Venn diagrams (समुह) ───────────────────────────────
  {
    sheet: '8P', topic: 'Set Theory - Venn Diagrams', grade: 8,
    questions: [
      { question: 'A set is a collection of ___ objects.', options: ['Well-defined', 'Any', 'Numbers only', 'Letters only'], correctAnswer: 'Well-defined', explanation: 'Definition of set' },
      { question: 'U represents the ___ set.', options: ['Universal', 'Union', 'Unit', 'Unknown'], correctAnswer: 'Universal', explanation: 'Contains everything' },
      { question: 'n(A) = 5 means set A has:', options: ['5 elements', 'Element 5', '5 subsets', 'No elements'], correctAnswer: '5 elements', explanation: 'Cardinality' },
      { question: 'A ∪ B includes elements in:', options: ['A or B or both', 'Only A', 'Only B', 'Common only'], correctAnswer: 'A or B or both', explanation: 'Union' },
      { question: 'A ∩ B includes elements in:', options: ['Both A and B', 'Either A or B', 'A only', 'Not in B'], correctAnswer: 'Both A and B', explanation: 'Intersection' },
      { question: 'If A ∩ B = Φ, sets are:', options: ['Disjoint', 'Overlapping', 'Equal', 'Universal'], correctAnswer: 'Disjoint', explanation: 'No common elements' },
      { question: 'n(A ∪ B) = n(A) + n(B) - ___', options: ['n(A ∩ B)', 'n(U)', 'n(A)', '0'], correctAnswer: 'n(A ∩ B)', explanation: 'Inclusion-Exclusion' },
      { question: 'A - B means elements in:', options: ['A but not B', 'B but not A', 'Both', 'Neither'], correctAnswer: 'A but not B', explanation: 'Difference of sets' },
      { question: 'A\' (complement) means elements:', options: ['In U but not A', 'In A but not U', 'Common to both', 'Outside U'], correctAnswer: 'In U but not A', explanation: 'Everything else in U' },
      { question: 'Empty set symbol?', options: ['Φ', 'U', '∩', '∈'], correctAnswer: 'Φ', explanation: 'Null set' },
      { question: 'If n(U)=20, n(A)=12, find n(A\').', options: ['8', '12', '20', '32'], correctAnswer: '8', explanation: '20 - 12 = 8' },
      { question: 'In Venn diagram, U is represented by a:', options: ['Rectangle', 'Circle', 'Triangle', 'Line'], correctAnswer: 'Rectangle', explanation: 'Standard convention' },
      { question: 'In Venn diagram, sets A and B are usually:', options: ['Circles', 'Rectangles', 'Points', 'Squares'], correctAnswer: 'Circles', explanation: 'Standard convention' },
      { question: 'n(A)=10, n(B)=15, n(A∩B)=5. n(A∪B)?', options: ['20', '25', '30', '15'], correctAnswer: '20', explanation: '10+15-5 = 20' },
      { question: 'Only A is represented as:', options: ['n(A) - n(A∩B)', 'n(A)', 'n(A∪B)', 'n(A\')'], correctAnswer: 'n(A) - n(A∩B)', explanation: 'Removes the common part' },
      { question: 'If A = {1, 2} and B = {2, 3}, A ∩ B = ?', options: ['{2}', '{1, 2, 3}', '{1, 3}', 'Φ'], correctAnswer: '{2}', explanation: 'Common element' },
      { question: 'If A = {1, 2}, A ∪ B = {1, 2, 3}, what could B be?', options: ['{3}', '{2, 3}', '{1, 2, 3}', 'All of these'], correctAnswer: 'All of these', explanation: 'All include the missing 3' },
      { question: 'n(A∪B) is maximum when sets are:', options: ['Disjoint', 'Equal', 'Overlapping', 'Subsets'], correctAnswer: 'Disjoint', explanation: 'No intersection to subtract' },
      { question: 'n(U) = n(A ∪ B) + ___', options: ['n(A ∪ B)\'', 'n(A ∩ B)', 'n(A)', 'n(B)'], correctAnswer: 'n(A ∪ B)\'', explanation: 'Everything inside + outside union' },
      { question: 'A ∩ A\' is always:', options: ['Φ', 'A', 'U', 'A\''], correctAnswer: 'Φ', explanation: 'Nothing is in A and not in A' },
    ]
  },

  // ── 8Q: Statistics — mean from grouped data ─────────────────────────────
  {
    sheet: '8Q', topic: 'Statistics - Mean', grade: 8,
    questions: [
      { question: 'Mean is also known as:', options: ['Average', 'Median', 'Mode', 'Range'], correctAnswer: 'Average', explanation: 'Common term' },
      { question: 'Formula for individual Mean (X̄)?', options: ['Σx/N', 'Σfx/N', 'N/2', 'Max-Min'], correctAnswer: 'Σx/N', explanation: 'Sum of values / Number of values' },
      { question: 'Formula for discrete/grouped Mean?', options: ['Σfx/N', 'Σx/N', 'Σf/N', 'N/Σx'], correctAnswer: 'Σfx/N', explanation: 'Sum of (freq × value) / Total freq' },
      { question: 'What does Σ mean?', options: ['Summation', 'Subtract', 'Multiply', 'Standard'], correctAnswer: 'Summation', explanation: 'Adding everything up' },
      { question: 'Mean of 2, 4, 6?', options: ['4', '12', '6', '2'], correctAnswer: '4', explanation: '12 / 3 = 4' },
      { question: 'Mean of first 5 natural numbers?', options: ['3', '2.5', '5', '15'], correctAnswer: '3', explanation: '(1+2+3+4+5)/5 = 3' },
      { question: 'If Σfx = 100 and N = 10, mean = ?', options: ['10', '100', '1', '1000'], correctAnswer: '10', explanation: '100 / 10 = 10' },
      { question: 'In grouped data, "x" for a class (0-10) is:', options: ['Mid-point (5)', 'Lower limit (0)', 'Upper limit (10)', 'Width (10)'], correctAnswer: 'Mid-point (5)', explanation: '(0+10)/2' },
      { question: 'Total frequency is denoted by:', options: ['N or Σf', 'X', 'M', 'Σx'], correctAnswer: 'N or Σf', explanation: 'Count of all data points' },
      { question: 'If mean of 3, 5, x is 5, find x.', options: ['7', '5', '15', '2'], correctAnswer: '7', explanation: '(3+5+x)/3 = 5 → 8+x=15' },
      { question: 'Mean of 10, 10, 10, 10?', options: ['10', '40', '4', '0'], correctAnswer: '10', explanation: 'No variation' },
      { question: 'Mean of 0 and 100?', options: ['50', '100', '0', '25'], correctAnswer: '50', explanation: '100 / 2 = 50' },
      { question: 'Mean is affected by every value in data.', options: ['True', 'False', 'Sometimes', 'Never'], correctAnswer: 'True', explanation: 'Changes if any x changes' },
      { question: 'Σf = 20, Mean = 5. Find Σfx.', options: ['100', '4', '25', '15'], correctAnswer: '100', explanation: 'Σfx = Mean × N' },
      { question: 'Mean of -5, 0, 5?', options: ['0', '5', '-5', '10'], correctAnswer: '0', explanation: 'Sum is 0' },
      { question: 'Mid-value of class 20-30?', options: ['25', '20', '30', '50'], correctAnswer: '25', explanation: '(20+30)/2' },
      { question: 'If each value is increased by 2, the mean:', options: ['Increases by 2', 'Stays same', 'Doubles', 'Increases by N'], correctAnswer: 'Increases by 2', explanation: 'Property of mean' },
      { question: 'Mean is a measure of central ___', options: ['Tendency', 'Dispersion', 'Position', 'Frequency'], correctAnswer: 'Tendency', explanation: 'Center of data' },
      { question: 'Can Mean be a decimal?', options: ['Yes', 'No', 'Only if N is odd', 'Only if N is even'], correctAnswer: 'Yes', explanation: 'e.g. (1+2)/2 = 1.5' },
      { question: 'Mean of 1/2 and 1/4?', options: ['3/8', '3/4', '1/8', '1/3'], correctAnswer: '3/8', explanation: '(0.5+0.25)/2 = 0.375' },
    ]
  }
];

// Seeding loop
let totalQ = 0

for (const levelData of grade8) {
  const firstHalf  = levelData.questions.slice(0, 10)
  const secondHalf = levelData.questions.slice(10, 20)

  const level1 = await Level.create({
    levelNumber:    levelNumber++,
    title:          `${levelData.topic} (Part 1)`,
    grade:          levelData.grade,
    sheet:          `${levelData.sheet}-1`,
    topic:          levelData.topic,
    passingScore:   6,
    questionConfig: { totalQuestions: 10 },
  })
  await Question.insertMany(firstHalf.map(q => ({
    levelId: level1._id, topic: levelData.topic,
    difficulty: levelData.grade, question: q.question,
    options: q.options.map(String), correctAnswer: String(q.correctAnswer),
    explanation: q.explanation || '',
  })))
  totalQ += firstHalf.length
  console.log(`  ✅ ${levelData.sheet}-1: ${firstHalf.length} questions`)

  const level2 = await Level.create({
    levelNumber:    levelNumber++,
    title:          `${levelData.topic} (Part 2)`,
    grade:          levelData.grade,
    sheet:          `${levelData.sheet}-2`,
    topic:          levelData.topic,
    passingScore:   6,
    questionConfig: { totalQuestions: 10 },
  })
  await Question.insertMany(secondHalf.map(q => ({
    levelId: level2._id, topic: levelData.topic,
    difficulty: levelData.grade, question: q.question,
    options: q.options.map(String), correctAnswer: String(q.correctAnswer),
    explanation: q.explanation || '',
  })))
  totalQ += secondHalf.length
  console.log(`  ✅ ${levelData.sheet}-2: ${secondHalf.length} questions`)
}

console.log(`\n🎉 Done! Total questions added: ${totalQ}`)
await mongoose.disconnect()
