import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Level from './models/Level.js'
import Question from './models/Question.js'

// ✅ CONFIG AND CONNECT FIRST — BEFORE ANY DB OPERATIONS
dotenv.config()
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mathgame')
console.log('✅ Connected to MongoDB')

// Clean ONLY grade 10 data
await Level.deleteMany({ grade: 10 })
await Question.deleteMany({ grade: 10 })
console.log('🧹 Cleared existing Grade 10 data\n')

// Get next available level number (continues from grade 6)
const maxLevel = await Level.findOne().sort({ levelNumber: -1 })
let levelNumber = (maxLevel?.levelNumber || 0) + 1
console.log(`📌 Starting levelNumber from: ${levelNumber}\n`)


const seed_grade10 = [
  // ── 10A: SETS — OPERATIONS ────────────────────────────────────────
  {
    sheet: '10A', topic: 'Sets Operations', grade: 10,
    questions: [
      { question: 'n(A ∪ B) = n(A) + n(B) - ?', options: ['n(A ∩ B)', 'n(U)', 'n(A-B)', '0'], correctAnswer: 'n(A ∩ B)' },
      { question: 'If A ⊂ B, then n(A ∩ B) is equal to:', options: ['n(A)', 'n(B)', 'n(U)', '0'], correctAnswer: 'n(A)' },
      { question: 'The set of elements in the Universal set but not in A is:', options: ['A complement', 'A union', 'A intersection', 'A minus B'], correctAnswer: 'A complement' },
      { question: 'n(U) = 100, n(A) = 60, find n(A\'):', options: ['40', '60', '100', '160'], correctAnswer: '40' },
      { question: 'A ∩ B represents elements that are in:', options: ['Both A and B', 'A only', 'B only', 'Neither'], correctAnswer: 'Both A and B' },
      { question: 'If A and B are disjoint, n(A ∩ B) = ?', options: ['0', 'n(A)', 'n(B)', 'n(U)'], correctAnswer: '0' },
      { question: 'n(o)(A) means:', options: ['Elements in A only', 'Elements in both', 'Total A', 'Empty A'], correctAnswer: 'Elements in A only' },
      { question: 'n(A) = 25, n(A ∩ B) = 5, find n(o)(A):', options: ['20', '30', '5', '25'], correctAnswer: '20' },
      { question: 'De Morgan\'s Law: (A ∪ B)\' = ?', options: ['A\' ∩ B\'', 'A\' ∪ B\'', 'A ∩ B', 'U'], correctAnswer: 'A\' ∩ B\'' },
      { question: 'n(A ∪ B) is 50, n(A) is 30, n(B) is 25. Find intersection:', options: ['5', '10', '15', '0'], correctAnswer: '5' },
      { question: 'If A = {1, 2} and B = {3, 4}, they are ___ sets.', options: ['Disjoint', 'Overlapping', 'Equal', 'Infinite'], correctAnswer: 'Disjoint' },
      { question: 'n(A-B) + n(B-A) + n(A ∩ B) = ?', options: ['n(A ∪ B)', 'n(U)', 'n(A)', 'n(B)'], correctAnswer: 'n(A ∪ B)' },
      { question: 'Symmetric difference (A Δ B) is:', options: ['(A-B) ∪ (B-A)', 'A ∩ B', 'A ∪ B', 'U'], correctAnswer: '(A-B) ∪ (B-A)' },
      { question: 'If n(U)=80, n(A ∪ B)=70, find n(A ∪ B)\':', options: ['10', '70', '150', '0'], correctAnswer: '10' },
      { question: 'In a Venn diagram, U is represented by a:', options: ['Rectangle', 'Circle', 'Triangle', 'Line'], correctAnswer: 'Rectangle' },
      { question: 'If A = B, then A - B is:', options: ['Empty set', 'Universal set', 'A', 'B'], correctAnswer: 'Empty set' },
      { question: 'n(o)(A) + n(o)(B) is same as:', options: ['n(A Δ B)', 'n(A ∪ B)', 'n(A ∩ B)', 'n(U)'], correctAnswer: 'n(A Δ B)' },
      { question: 'Can n(A ∪ B) be greater than n(U)?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Intersection of A and A\' is:', options: ['∅', 'U', 'A', 'A\''], correctAnswer: '∅' },
      { question: 'Union of A and A\' is:', options: ['U', '∅', 'A', 'A\''], correctAnswer: 'U' }
    ]
  },

  // ── 10B: SETS — VENN DIAGRAM WORD PROBLEMS ────────────────────────
  {
    sheet: '10B', topic: 'Venn Diagram Problems', grade: 10,
    questions: [
      { question: 'In a group of 100, 60 like Apple, 50 like Orange. If everyone likes at least one, how many like both?', options: ['10', '20', '30', '40'], correctAnswer: '10' },
      { question: 'In a class of 40, 25 like Math, 20 like Science. 5 like neither. How many like both?', options: ['10', '5', '15', '20'], correctAnswer: '10' },
      { question: 'Out of 50 students, 30 drink milk, 20 drink tea. 10 drink both. How many drink neither?', options: ['10', '5', '15', '0'], correctAnswer: '10' },
      { question: 'In a survey of 200, 120 play football, 90 play cricket. How many play only football if 40 play both?', options: ['80', '120', '50', '40'], correctAnswer: '80' },
      { question: '60% like Coke, 50% like Pepsi, 20% like both. What % like neither?', options: ['10%', '20%', '30%', '0%'], correctAnswer: '10%' },
      { question: 'In a village of 500, 300 have cows, 250 have goats. 100 have both. How many have no animals?', options: ['50', '100', '150', '0'], correctAnswer: '50' },
      { question: 'If n(o)(A) = 15, n(o)(B) = 10, and n(A ∩ B) = 5, find n(A ∪ B):', options: ['30', '25', '20', '35'], correctAnswer: '30' },
      { question: 'n(U)=100, n(A)=40, n(B)=50, n(neither)=20. Find both.', options: ['10', '20', '30', '40'], correctAnswer: '10' },
      { question: 'A group has 80 people. 45 like music, 40 like dance. 10 like neither. How many like only music?', options: ['30', '15', '45', '10'], correctAnswer: '30' },
      { question: 'In a school, 70% passed Math, 60% passed English. 10% failed both. What % passed both?', options: ['40%', '30%', '50%', '20%'], correctAnswer: '40%' },
      { question: 'Of 30 friends, 20 like Pizza, 15 like Burger. Everyone likes at least one. How many like Burger only?', options: ['10', '5', '15', '20'], correctAnswer: '10' },
      { question: 'If n(o)(A) = 40 and n(A) = 50, then n(A ∩ B) is:', options: ['10', '40', '50', '0'], correctAnswer: '10' },
      { question: 'Total students 100. 40 like Red, 30 like Blue, 10 like both. How many like Blue only?', options: ['20', '30', '10', '40'], correctAnswer: '20' },
      { question: 'In a set of 60 people, 35 speak Nepali, 25 speak English. 10 speak none. Find both.', options: ['10', '15', '20', '5'], correctAnswer: '10' },
      { question: 'If n(A-B) = 12 and n(B-A) = 8, and n(A ∪ B) = 25, find n(A ∩ B):', options: ['5', '20', '4', '10'], correctAnswer: '5' },
      { question: 'In a party, 80% had sweets, 50% had snacks. Everyone had something. What % had both?', options: ['30%', '20%', '40%', '50%'], correctAnswer: '30%' },
      { question: 'Find n(o)(B) if n(B)=30 and n(A ∩ B)=12:', options: ['18', '42', '12', '30'], correctAnswer: '18' },
      { question: 'n(U)=150, n(A ∪ B)=130. Find n(A ∪ B)\':', options: ['20', '130', '280', '0'], correctAnswer: '20' },
      { question: 'If n(A)=n(B) and n(A ∪ B)=40, n(A ∩ B)=10, find n(A):', options: ['25', '30', '20', '15'], correctAnswer: '25' },
      { question: 'The sum of n(o)(A), n(o)(B), n(A ∩ B), and n(A ∪ B)\' is:', options: ['n(U)', 'n(A ∪ B)', '100', '0'], correctAnswer: 'n(U)' }
    ]
  },

  // ── 10C: REAL NUMBERS — ADVANCED ──────────────────────────────────
  {
    sheet: '10C', topic: 'Advanced Real Numbers', grade: 10,
    questions: [
      { question: 'Is the square root of every prime number irrational?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'The product of two irrational numbers is:', options: ['Sometimes rational', 'Always irrational', 'Always rational', 'Integer'], correctAnswer: 'Sometimes rational' },
      { question: 'Which is a non-terminating, non-recurring decimal?', options: ['Irrational number', 'Rational number', 'Integer', 'Fraction'], correctAnswer: 'Irrational number' },
      { question: 'Value of π is:', options: ['Irrational', 'Rational', '3.14 (exactly)', '22/7 (exactly)'], correctAnswer: 'Irrational' },
      { question: 'Every real number is either rational or ___:', options: ['Irrational', 'Complex', 'Integer', 'Imaginary'], correctAnswer: 'Irrational' },
      { question: 'The decimal expansion of 1/3 is:', options: ['Recurring', 'Terminating', 'Non-recurring', 'None'], correctAnswer: 'Recurring' },
      { question: 'Between two rational numbers, there are ___ rational numbers.', options: ['Infinitely many', 'Zero', 'One', 'Ten'], correctAnswer: 'Infinitely many' },
      { question: 'Is 0.101001000... irrational?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'The absolute value of |-15| is:', options: ['15', '-15', '0', '1'], correctAnswer: '15' },
      { question: 'Which is the multiplicative identity?', options: ['1', '0', '-1', 'None'], correctAnswer: '1' },
      { question: 'Which is the additive identity?', options: ['0', '1', '-1', 'None'], correctAnswer: '0' },
      { question: 'Square root of 2 is approximately:', options: ['1.414', '1.732', '2.236', '3.14'], correctAnswer: '1.414' },
      { question: 'Is √25 a rational number?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'The set of Real numbers is denoted by:', options: ['R', 'Q', 'N', 'Z'], correctAnswer: 'R' },
      { question: 'The set of Integers is denoted by:', options: ['Z', 'I', 'R', 'N'], correctAnswer: 'Z' },
      { question: 'Which is greater: √2 or 1.4?', options: ['√2', '1.4', 'Both equal', 'None'], correctAnswer: '√2' },
      { question: 'Reciprocal of zero is:', options: ['Undefined', '0', '1', 'Infinity'], correctAnswer: 'Undefined' },
      { question: 'Is 2 + √3 rational or irrational?', options: ['Irrational', 'Rational'], correctAnswer: 'Irrational' },
      { question: 'Can we represent √2 on a number line?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'The square of any real number is:', options: ['Non-negative', 'Negative', 'Positive only', 'Zero only'], correctAnswer: 'Non-negative' }
    ]
  },

  // ── 10D: SEQUENCE — ARITHMETIC PROGRESSION (AP) ───────────────────
  {
    sheet: '10D', topic: 'Arithmetic Progression', grade: 10,
    questions: [
      { question: 'Formula for nth term (tn) of AP:', options: ['a+(n-1)d', 'a+nd', 'arn⁻¹', 'n/2(a+l)'], correctAnswer: 'a+(n-1)d' },
      { question: 'Common difference (d) is calculated as:', options: ['t2 - t1', 't1 - t2', 't2 / t1', 't1 + t2'], correctAnswer: 't2 - t1' },
      { question: 'Arithmetic Mean (AM) between a and b is:', options: ['(a+b)/2', '√(ab)', 'a-b', '2ab'], correctAnswer: '(a+b)/2' },
      { question: 'Find d for: 5, 9, 13, 17...', options: ['4', '5', '3', '2'], correctAnswer: '4' },
      { question: 'If a=2, d=3, find 10th term:', options: ['29', '30', '32', '27'], correctAnswer: '29' },
      { question: 'First n natural numbers sum (Sn):', options: ['n(n+1)/2', 'n²', 'n(n-1)/2', '2n'], correctAnswer: 'n(n+1)/2' },
      { question: 'Find 5th term of 10, 7, 4...:', options: ['-2', '1', '-1', '0'], correctAnswer: '-2' },
      { question: 'Sum of first 10 terms of 2, 4, 6...:', options: ['110', '100', '120', '90'], correctAnswer: '110' },
      { question: 'If 3, x, 9 are in AP, find x:', options: ['6', '5', '7', '4.5'], correctAnswer: '6' },
      { question: 'Formula for Sn using first and last term:', options: ['n/2(a+l)', 'n(a+l)', 'a+l', 'n/2(a-l)'], correctAnswer: 'n/2(a+l)' },
      { question: 'If tn=25, a=5, d=2, find n:', options: ['11', '10', '12', '9'], correctAnswer: '11' },
      { question: 'Is 2, 4, 8, 16 an AP?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Find AM of 15 and 25:', options: ['20', '15', '25', '40'], correctAnswer: '20' },
      { question: 'If first term is 10 and common diff is -2, find t3:', options: ['6', '8', '4', '12'], correctAnswer: '6' },
      { question: 'What is "a" in 1, 4, 7...?', options: ['1', '4', '7', '3'], correctAnswer: '1' },
      { question: 'A sequence with constant difference is:', options: ['AP', 'GP', 'HP', 'None'], correctAnswer: 'AP' },
      { question: 'Find 100th term of 1, 2, 3...:', options: ['100', '99', '101', '50'], correctAnswer: '100' },
      { question: 'If AM between 10 and y is 15, y = ?', options: ['20', '25', '15', '30'], correctAnswer: '20' },
      { question: 'Sum of first n odd numbers is:', options: ['n²', '2n', 'n(n+1)', 'None'], correctAnswer: 'n²' },
      { question: 'Common difference of 5, 5, 5... is:', options: ['0', '5', '1', 'None'], correctAnswer: '0' }
    ]
  },

  // ── 10E: SEQUENCE — GEOMETRIC PROGRESSION (GP) ────────────────────
  {
    sheet: '10E', topic: 'Geometric Progression', grade: 10,
    questions: [
      { question: 'Formula for nth term (tn) of GP:', options: ['arn⁻¹', 'arⁿ', 'a+(n-1)d', 'a/r'], correctAnswer: 'arn⁻¹' },
      { question: 'Common ratio (r) is:', options: ['t2 / t1', 't2 - t1', 't1 / t2', 't1 + t2'], correctAnswer: 't2 / t1' },
      { question: 'Geometric Mean (GM) between a and b is:', options: ['√(ab)', '(a+b)/2', 'ab', 'a/b'], correctAnswer: '√(ab)' },
      { question: 'Find r for: 2, 4, 8, 16...', options: ['2', '4', '0.5', '1'], correctAnswer: '2' },
      { question: 'If a=3, r=2, find 4th term:', options: ['24', '18', '12', '48'], correctAnswer: '24' },
      { question: 'Sum of n terms (Sn) of GP if r > 1:', options: ['a(rⁿ-1)/(r-1)', 'a(1-rⁿ)/(1-r)', 'arn⁻¹', 'None'], correctAnswer: 'a(rⁿ-1)/(r-1)' },
      { question: 'Find GM of 4 and 9:', options: ['6', '6.5', '5', '36'], correctAnswer: '6' },
      { question: 'If 2, x, 8 are in GP, find x:', options: ['4', '5', '6', '10'], correctAnswer: '4' },
      { question: 'Find 5th term of 81, 27, 9...:', options: ['1', '3', '0', '1/3'], correctAnswer: '1' },
      { question: 'Is 5, 10, 15, 20 a GP?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Find r for: 10, 5, 2.5...:', options: ['0.5', '2', '5', '-5'], correctAnswer: '0.5' },
      { question: 'What is a in 7, 14, 28...?', options: ['7', '14', '2', '28'], correctAnswer: '7' },
      { question: 'If first term is 5 and r is 3, find t2:', options: ['15', '8', '5', '2'], correctAnswer: '15' },
      { question: 'A sequence with constant ratio is:', options: ['GP', 'AP', 'HP', 'None'], correctAnswer: 'GP' },
      { question: 'Sum of infinite GP if |r| < 1:', options: ['a / (1-r)', 'a / (r-1)', '0', 'Infinity'], correctAnswer: 'a / (1-r)' },
      { question: 'If GM between 2 and y is 6, y = ?', options: ['18', '12', '36', '4'], correctAnswer: '18' },
      { question: 'Find 3rd term of 1, -2, 4...:', options: ['4', '-4', '8', '-8'], correctAnswer: '4' },
      { question: 'If r = 1, all terms in GP are:', options: ['Same', 'Increasing', 'Zero', 'None'], correctAnswer: 'Same' },
      { question: 'Can r be negative?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'If a=1, r=1/2, find t4:', options: ['1/8', '1/4', '1/16', '1/2'], correctAnswer: '1/8' }
    ]
  },

  // ── 10F: FUNCTIONS — TYPES AND NOTATION ───────────────────────────
  {
    sheet: '10F', topic: 'Functions', grade: 10,
    questions: [
      { question: 'If f(x) = 2x + 1, find f(3):', options: ['7', '6', '5', '8'], correctAnswer: '7' },
      { question: 'Composite function f(g(x)) is denoted as:', options: ['fog(x)', 'gof(x)', 'f+g', 'f/g'], correctAnswer: 'fog(x)' },
      { question: 'Inverse of f(x) = x + 5 is:', options: ['x - 5', '5 - x', '1/x', 'x/5'], correctAnswer: 'x - 5' },
      { question: 'If f(x) = x², find f(-2):', options: ['4', '-4', '2', '-2'], correctAnswer: '4' },
      { question: 'A function where every x has one y is:', options: ['One-to-one', 'Many-to-one', 'Onto', 'Into'], correctAnswer: 'One-to-one' },
      { question: 'Domain is the set of ___ values.', options: ['Input (x)', 'Output (y)', 'Both', 'None'], correctAnswer: 'Input (x)' },
      { question: 'Range is the set of ___ values.', options: ['Output (y)', 'Input (x)', 'Both', 'None'], correctAnswer: 'Output (y)' },
      { question: 'If f(x) = 3x, find f⁻¹(x):', options: ['x/3', '3/x', 'x-3', 'x+3'], correctAnswer: 'x/3' },
      { question: 'f(x) = 5 is a ___ function.', options: ['Constant', 'Linear', 'Quadratic', 'Identity'], correctAnswer: 'Constant' },
      { question: 'f(x) = x is a ___ function.', options: ['Identity', 'Constant', 'Linear', 'None'], correctAnswer: 'Identity' },
      { question: 'Find fog(x) if f(x)=x+1, g(x)=2x:', options: ['2x+1', '2x+2', 'x+2', '2x'], correctAnswer: '2x+1' },
      { question: 'Find gof(x) if f(x)=x+1, g(x)=2x:', options: ['2x+2', '2x+1', 'x+2', '2x'], correctAnswer: '2x+2' },
      { question: 'If f(x) = 1/x, find f(f(x)):', options: ['x', '1/x', '1', 'x²'], correctAnswer: 'x' },
      { question: 'A function is onto if Range = ___:', options: ['Codomain', 'Domain', '0', 'None'], correctAnswer: 'Codomain' },
      { question: 'Inverse exists only for ___ functions.', options: ['Bijective', 'Injective', 'Surjective', 'Any'], correctAnswer: 'Bijective' },
      { question: 'If f: A → B, A is the:', options: ['Domain', 'Codomain', 'Range', 'Image'], correctAnswer: 'Domain' },
      { question: 'The set B is called the:', options: ['Codomain', 'Domain', 'Range', 'Image'], correctAnswer: 'Codomain' },
      { question: 'If f(x)=2x-3, find f(0):', options: ['-3', '3', '0', '2'], correctAnswer: '-3' },
      { question: 'Is f(x) = √x defined for x = -1?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Vertical line test checks for a ___:', options: ['Function', 'Domain', 'Inverse', 'Range'], correctAnswer: 'Function' }
    ]
  },

  // ── 10G: POLYNOMIALS — ADVANCED FACTORIZATION ─────────────────────
  {
    sheet: '10G', topic: 'Polynomials', grade: 10,
    questions: [
      { question: 'Remainder Theorem: Remainder of f(x) ÷ (x-a) is:', options: ['f(a)', 'f(-a)', '0', '1'], correctAnswer: 'f(a)' },
      { question: 'Factor Theorem: (x-a) is a factor if f(a) = ?', options: ['0', '1', 'a', '-a'], correctAnswer: '0' },
      { question: 'Factorize: x³ - 8', options: ['(x-2)(x²+2x+4)', '(x-2)³', '(x+2)(x²-2x+4)', 'None'], correctAnswer: '(x-2)(x²+2x+4)' },
      { question: 'Find remainder when x²-5x+6 is divided by (x-1):', options: ['2', '0', '1', '6'], correctAnswer: '2' },
      { question: 'Highest power of a polynomial is its:', options: ['Degree', 'Order', 'Root', 'Factor'], correctAnswer: 'Degree' },
      { question: 'A polynomial of degree 3 is called:', options: ['Cubic', 'Quadratic', 'Linear', 'Bi-quadratic'], correctAnswer: 'Cubic' },
      { question: 'Factorize: a³ + b³', options: ['(a+b)(a²-ab+b²)', '(a+b)³', '(a-b)(a²+ab+b²)', 'None'], correctAnswer: '(a+b)(a²-ab+b²)' },
      { question: 'If (x-2) is a factor of x²-kx+4, find k:', options: ['4', '2', '0', '8'], correctAnswer: '4' },
      { question: 'Synthetic division is used for ___:', options: ['Dividing polynomials', 'Adding', 'Multiplying', 'None'], correctAnswer: 'Dividing polynomials' },
      { question: 'Is x² + 1/x a polynomial?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Degree of a constant polynomial is:', options: ['0', '1', 'Undefined', 'None'], correctAnswer: '0' },
      { question: 'Factorize: x⁴ - 16', options: ['(x²+4)(x+2)(x-2)', '(x²-4)²', '(x+2)⁴', 'None'], correctAnswer: '(x²+4)(x+2)(x-2)' },
      { question: 'Number of roots of a cubic polynomial is:', options: ['3', '2', '1', 'None'], correctAnswer: '3' },
      { question: 'The value of x that makes f(x)=0 is a ___:', options: ['Root/Zero', 'Factor', 'Degree', 'Coefficient'], correctAnswer: 'Root/Zero' },
      { question: 'Coefficient of x in 3x² - 5x + 2 is:', options: ['-5', '3', '2', '5'], correctAnswer: '-5' },
      { question: 'Remainder when f(x) is divided by (x+a) is:', options: ['f(-a)', 'f(a)', '0', 'None'], correctAnswer: 'f(-a)' },
      { question: 'Factorize x² - y²:', options: ['(x+y)(x-y)', '(x-y)²', 'x+y', 'x-y'], correctAnswer: '(x+y)(x-y)' },
      { question: 'Is (x-1) a factor of x³-1?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Expand: (x+y)³', options: ['x³+3x²y+3xy²+y³', 'x³+y³', 'x²+y²', 'None'], correctAnswer: 'x³+3x²y+3xy²+y³' },
      { question: 'If f(x) = x - 5, find the zero of the function:', options: ['5', '-5', '0', '1'], correctAnswer: '5' }
    ]
  },

  // ── 10H: QUADRATIC EQUATIONS — ALL METHODS ────────────────────────
  {
    sheet: '10H', topic: 'Quadratic Equations', grade: 10,
    questions: [
      { question: 'Standard form: ax² + bx + c = 0. x = ?', options: ['(-b±√b²-4ac)/2a', '(-b±√b²+4ac)/2a', 'b/2a', 'None'], correctAnswer: '(-b±√b²-4ac)/2a' },
      { question: 'Discriminant (D) = ?', options: ['b²-4ac', 'b²-ac', '√b²-4ac', '4ac'], correctAnswer: 'b²-4ac' },
      { question: 'Nature of roots if D = 0:', options: ['Real and Equal', 'Real and Distinct', 'Imaginary', 'Irrational'], correctAnswer: 'Real and Equal' },
      { question: 'Solve x² - 5x + 6 = 0:', options: ['2, 3', '-2, -3', '1, 6', '0, 5'], correctAnswer: '2, 3' },
      { question: 'Sum of roots (α + β) = ?', options: ['-b/a', 'c/a', 'b/a', '1'], correctAnswer: '-b/a' },
      { question: 'Product of roots (αβ) = ?', options: ['c/a', '-b/a', 'a/c', '0'], correctAnswer: 'c/a' },
      { question: 'If roots are 4 and 5, the equation is:', options: ['x²-9x+20=0', 'x²+9x+20=0', 'x²-x+20=0', 'None'], correctAnswer: 'x²-9x+20=0' },
      { question: 'If D < 0, roots are:', options: ['Imaginary', 'Real', 'Equal', 'Distinct'], correctAnswer: 'Imaginary' },
      { question: 'Maximum power of a quadratic equation is:', options: ['2', '1', '3', '0'], correctAnswer: '2' },
      { question: 'Solve x² - 9 = 0:', options: ['±3', '3', '9', '0'], correctAnswer: '±3' },
      { question: 'If α=2, β=3, find α+β:', options: ['5', '6', '1', '0'], correctAnswer: '5' },
      { question: 'Find D for x² + 4x + 4 = 0:', options: ['0', '16', '8', '4'], correctAnswer: '0' },
      { question: 'If D is a perfect square, roots are:', options: ['Rational', 'Irrational', 'Imaginary', 'Equal'], correctAnswer: 'Rational' },
      { question: 'Solve x² = 16:', options: ['±4', '4', '16', '8'], correctAnswer: '±4' },
      { question: 'A quadratic equation has exactly ___ roots.', options: ['2', '1', '3', 'None'], correctAnswer: '2' },
      { question: 'Roots of (x-1)(x-2)=0 are:', options: ['1, 2', '-1, -2', '0, 0', '1, -2'], correctAnswer: '1, 2' },
      { question: 'Sum of roots of 2x²-8x+6=0:', options: ['4', '-4', '3', '2'], correctAnswer: '4' },
      { question: 'Product of roots of 2x²-8x+6=0:', options: ['3', '4', '6', '2'], correctAnswer: '3' },
      { question: 'If b=0, roots are equal and ___:', options: ['Opposite in sign', 'Zero', 'Imaginary', 'None'], correctAnswer: 'Opposite in sign' },
      { question: 'If a=0, is the equation quadratic?', options: ['No', 'Yes'], correctAnswer: 'No' }
    ]
  },

  // ── 10I: LINEAR PROGRAMMING ───────────────────────────────────────
  {
    sheet: '10I', topic: 'Linear Programming', grade: 10,
    questions: [
      { question: 'A linear inequality represents a:', options: ['Half-plane', 'Straight line', 'Point', 'Circle'], correctAnswer: 'Half-plane' },
      { question: 'The point (0,0) is often used as a ___ point.', options: ['Test', 'Origin', 'Maximum', 'Minimum'], correctAnswer: 'Test' },
      { question: 'Is (2,3) a solution to x + y < 10?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Graph of x ≥ 0 is on the ___ of Y-axis.', options: ['Right', 'Left', 'Above', 'Below'], correctAnswer: 'Right' },
      { question: 'Graph of y ≤ 0 is ___ X-axis.', options: ['Below', 'Above', 'Left', 'Right'], correctAnswer: 'Below' },
      { question: 'Solid line is used for inequalities with:', options: ['≤ or ≥', '< or >', '=', 'None'], correctAnswer: '≤ or ≥' },
      { question: 'Dashed line is used for inequalities with:', options: ['< or >', '≤ or ≥', '=', 'None'], correctAnswer: '< or >' },
      { question: 'Intersection of all constraints is called ___ region.', options: ['Feasible', 'Optimal', 'Solution', 'Empty'], correctAnswer: 'Feasible' },
      { question: 'Objective function is used to find ___ values.', options: ['Max or Min', 'Mean', 'Total', 'None'], correctAnswer: 'Max or Min' },
      { question: 'A feasible region must be:', options: ['Bound or Unbound', 'Only Square', 'Only Circle', 'None'], correctAnswer: 'Bound or Unbound' },
      { question: 'The vertices of feasible region are called:', options: ['Corner points', 'Origins', 'Midpoints', 'None'], correctAnswer: 'Corner points' },
      { question: 'If x + y = 5, find x if y = 0:', options: ['5', '0', '-5', '1'], correctAnswer: '5' },
      { question: 'Is (5,5) a solution for x < 5?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Horizontal line equation is usually:', options: ['y = k', 'x = k', 'y = x', 'None'], correctAnswer: 'y = k' },
      { question: 'Vertical line equation is usually:', options: ['x = k', 'y = k', 'y = x', 'None'], correctAnswer: 'x = k' },
      { question: 'Optimization means finding ___ values.', options: ['Best (Max/Min)', 'Average', 'Zero', 'None'], correctAnswer: 'Best (Max/Min)' },
      { question: 'Points inside feasible region satisfy ___ constraints.', options: ['All', 'Some', 'None', 'One'], correctAnswer: 'All' },
      { question: 'The inequality y > 2 shades ___ the line.', options: ['Above', 'Below', 'Left', 'Right'], correctAnswer: 'Above' },
      { question: 'The inequality x < 3 shades ___ the line.', options: ['Left', 'Right', 'Above', 'Below'], correctAnswer: 'Left' },
      { question: 'Is x + y > 0 satisfied by (1,1)?', options: ['Yes', 'No'], correctAnswer: 'Yes' }
    ]
  },

  // ── 10J: MATRIX — ADDITION AND SUBTRACTION ────────────────────────
  {
    sheet: '10J', topic: 'Matrix Operations', grade: 10,
    questions: [
      { question: 'Addition requires matrices to have the same:', options: ['Order', 'Determinant', 'Elements', 'Inverse'], correctAnswer: 'Order' },
      { question: 'If A is 2x2 and B is 2x2, A+B is:', options: ['2x2', '2x1', '4x4', 'Impossible'], correctAnswer: '2x2' },
      { question: 'Matrix with all zeros is called:', options: ['Null/Zero matrix', 'Identity', 'Unit', 'Square'], correctAnswer: 'Null/Zero matrix' },
      { question: 'If A = [1 2], then A is a ___ matrix.', options: ['Row', 'Column', 'Square', 'Null'], correctAnswer: 'Row' },
      { question: 'Find [1 2] + [3 4]:', options: ['[4 6]', '[3 8]', '[2 2]', 'None'], correctAnswer: '[4 6]' },
      { question: 'Find [5 10] - [2 3]:', options: ['[3 7]', '[7 13]', '[10 30]', 'None'], correctAnswer: '[3 7]' },
      { question: 'Order of matrix with 3 rows, 2 columns:', options: ['3x2', '2x3', '6', '5'], correctAnswer: '3x2' },
      { question: 'Is A + B = B + A?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'If A + X = 0, then X is the ___ of A.', options: ['Additive Inverse', 'Transpose', 'Identity', 'None'], correctAnswer: 'Additive Inverse' },
      { question: 'A square matrix has rows ___ columns.', options: ['Equal to', 'More than', 'Less than', 'None'], correctAnswer: 'Equal to' },
      { question: 'Scalar multiplication kA multiplies ___ elements.', options: ['All', 'Only first', 'Only diagonal', 'None'], correctAnswer: 'All' },
      { question: 'If A=[2 4], then 2A = ?', options: ['[4 8]', '[2 4]', '[4 4]', '[2 8]'], correctAnswer: '[4 8]' },
      { question: 'Identity matrix (I) for addition is:', options: ['Zero matrix', 'Unit matrix', 'Row matrix', 'None'], correctAnswer: 'Zero matrix' },
      { question: 'Can we add a 2x2 and a 3x3 matrix?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Find [10] + [5]:', options: ['[15]', '[5]', '[50]', 'None'], correctAnswer: '[15]' },
      { question: 'Is A - B = B - A?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'The negative of A is denoted as:', options: ['-A', 'A\'', '1/A', 'A-'], correctAnswer: '-A' },
      { question: 'Subtract [0 0] from [1 2]:', options: ['[1 2]', '[0 0]', '[-1 -2]', 'None'], correctAnswer: '[1 2]' },
      { question: 'If order is 1x3, number of elements is:', options: ['3', '1', '4', '0'], correctAnswer: '3' },
      { question: 'Horizontal arrangement of elements is:', options: ['Row', 'Column', 'Diagonal', 'Order'], correctAnswer: 'Row' }
    ]
  },

  // ── 10K: MATRIX — MULTIPLICATION AND TRANSPOSE ────────────────────
  {
    sheet: '10K', topic: 'Matrix Multiplication', grade: 10,
    questions: [
      { question: 'Multiplication AB is possible if columns of A = ___ of B.', options: ['Rows', 'Columns', 'Elements', 'Order'], correctAnswer: 'Rows' },
      { question: 'If A is 2x3 and B is 3x4, AB is:', options: ['2x4', '3x3', '4x2', 'Impossible'], correctAnswer: '2x4' },
      { question: 'The transpose (A\') swaps rows and:', options: ['Columns', 'Diagonals', 'Signs', 'None'], correctAnswer: 'Columns' },
      { question: 'Identity matrix for multiplication (I) has:', options: ['Diagonal 1s', 'All 1s', 'All 0s', 'Diagonal 0s'], correctAnswer: 'Diagonal 1s' },
      { question: 'A * I = ?', options: ['A', 'I', '0', '1'], correctAnswer: 'A' },
      { question: 'Is AB = BA usually?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Determinant of [a b; c d] is:', options: ['ad - bc', 'ab - cd', 'ac - bd', 'None'], correctAnswer: 'ad - bc' },
      { question: 'Find det of [2 3; 1 4]:', options: ['5', '8', '11', '2'], correctAnswer: '5' },
      { question: 'Transpose of a row matrix is a:', options: ['Column matrix', 'Row matrix', 'Square matrix', 'None'], correctAnswer: 'Column matrix' },
      { question: 'If det(A) = 0, the matrix is:', options: ['Singular', 'Non-singular', 'Identity', 'Square'], correctAnswer: 'Singular' },
      { question: 'Transpose of transpose (A\')\' = ?', options: ['A', 'A\'', '0', 'I'], correctAnswer: 'A' },
      { question: 'If A is 2x2, I is:', options: ['[1 0; 0 1]', '[0 1; 1 0]', '[1 1; 1 1]', 'None'], correctAnswer: '[1 0; 0 1]' },
      { question: 'A matrix with det ≠ 0 is:', options: ['Non-singular', 'Singular', 'Null', 'None'], correctAnswer: 'Non-singular' },
      { question: 'Multiplication of [1 2] and [3; 4] is:', options: ['[11]', '[3 8]', 'Impossible', 'None'], correctAnswer: '[11]' },
      { question: 'In AB, if A is mxn and B is nxp, the result is:', options: ['mxp', 'nxn', 'pxm', 'None'], correctAnswer: 'mxp' },
      { question: 'If Aᵀ = A, the matrix is:', options: ['Symmetric', 'Skew-symmetric', 'Identity', 'None'], correctAnswer: 'Symmetric' },
      { question: 'Product of [2] and [3] is:', options: ['[6]', '[5]', '[23]', 'None'], correctAnswer: '[6]' },
      { question: 'Order of [1 2; 3 4] is:', options: ['2x2', '4', '2', 'None'], correctAnswer: '2x2' },
      { question: 'Cramer\'s Rule uses ___ to solve equations.', options: ['Determinants', 'Inverse', 'Addition', 'None'], correctAnswer: 'Determinants' },
      { question: 'In Cramer\'s Rule, x = ?', options: ['Dx / D', 'D / Dx', 'Dx + D', 'None'], correctAnswer: 'Dx / D' }
    ]
  },

  // ── 10L: TRIGONOMETRY — ALL 6 RATIOS ──────────────────────────────
  {
    sheet: '10L', topic: 'Trig Ratios', grade: 10,
    questions: [
      { question: 'sin θ = ?', options: ['p/h', 'b/h', 'p/b', 'h/p'], correctAnswer: 'p/h' },
      { question: 'cos θ = ?', options: ['b/h', 'p/h', 'p/b', 'h/b'], correctAnswer: 'b/h' },
      { question: 'tan θ = ?', options: ['p/b', 'b/p', 'p/h', 'h/p'], correctAnswer: 'p/b' },
      { question: 'Reciprocal of sin θ is:', options: ['cosec θ', 'sec θ', 'cot θ', 'cos θ'], correctAnswer: 'cosec θ' },
      { question: 'Reciprocal of cos θ is:', options: ['sec θ', 'cosec θ', 'cot θ', 'sin θ'], correctAnswer: 'sec θ' },
      { question: 'Reciprocal of tan θ is:', options: ['cot θ', 'sec θ', 'cosec θ', 'cos θ'], correctAnswer: 'cot θ' },
      { question: 'Value of sin 30°:', options: ['1/2', '√3/2', '1/√2', '1'], correctAnswer: '1/2' },
      { question: 'Value of cos 60°:', options: ['1/2', '√3/2', '1/√2', '0'], correctAnswer: '1/2' },
      { question: 'Value of tan 45°:', options: ['1', '0', '√3', 'None'], correctAnswer: '1' },
      { question: 'h² = p² + b² is ___ Theorem.', options: ['Pythagoras', 'Euler', 'Newton', 'None'], correctAnswer: 'Pythagoras' },
      { question: 'If p=3, b=4, then h=?', options: ['5', '7', '1', '25'], correctAnswer: '5' },
      { question: 'Value of sin 90°:', options: ['1', '0', '1/2', 'None'], correctAnswer: '1' },
      { question: 'Value of cos 0°:', options: ['1', '0', '1/2', 'None'], correctAnswer: '1' },
      { question: 'cosec θ = ?', options: ['h/p', 'p/h', 'h/b', 'b/p'], correctAnswer: 'h/p' },
      { question: 'sec θ = ?', options: ['h/b', 'b/h', 'h/p', 'p/b'], correctAnswer: 'h/b' },
      { question: 'cot θ = ?', options: ['b/p', 'p/b', 'h/b', 'b/h'], correctAnswer: 'b/p' },
      { question: 'sin θ / cos θ = ?', options: ['tan θ', 'cot θ', '1', 'sec θ'], correctAnswer: 'tan θ' },
      { question: 'Value of tan 60°:', options: ['√3', '1/√3', '1', 'None'], correctAnswer: '√3' },
      { question: 'Value of sin 45°:', options: ['1/√2', '√3/2', '1/2', '1'], correctAnswer: '1/√2' },
      { question: 'Longest side in right triangle is:', options: ['Hypotenuse', 'Perpendicular', 'Base', 'None'], correctAnswer: 'Hypotenuse' }
    ]
  },

  // ── 10M: TRIGONOMETRY — IDENTITIES AND PROOF ──────────────────────
  {
    sheet: '10M', topic: 'Trig Identities', grade: 10,
    questions: [
      { question: 'sin²θ + cos²θ = ?', options: ['1', '0', '2', '-1'], correctAnswer: '1' },
      { question: '1 + tan²θ = ?', options: ['sec²θ', 'cosec²θ', 'sin²θ', 'None'], correctAnswer: 'sec²θ' },
      { question: '1 + cot²θ = ?', options: ['cosec²θ', 'sec²θ', 'tan²θ', 'None'], correctAnswer: 'cosec²θ' },
      { question: 'sin(2θ) = ?', options: ['2sinθcosθ', 'cos²θ-sin²θ', '2tanθ', 'None'], correctAnswer: '2sinθcosθ' },
      { question: 'cos(2θ) = ?', options: ['cos²θ-sin²θ', '1-2sin²θ', '2cos²θ-1', 'All of above'], correctAnswer: 'All of above' },
      { question: 'sin(A+B) = ?', options: ['sinAcosB + cosAsinB', 'sinAcosB - cosAsinB', 'cosAcosB', 'None'], correctAnswer: 'sinAcosB + cosAsinB' },
      { question: 'tan(A-B) = ?', options: ['(tanA-tanB)/(1+tanAtanB)', 'tanA-tanB', '1', 'None'], correctAnswer: '(tanA-tanB)/(1+tanAtanB)' },
      { question: 'sin(3θ) = ?', options: ['3sinθ - 4sin³θ', '4sin³θ - 3sinθ', '3sinθ', 'None'], correctAnswer: '3sinθ - 4sin³θ' },
      { question: '1 - cos(2θ) = ?', options: ['2sin²θ', '2cos²θ', 'sin²θ', 'None'], correctAnswer: '2sin²θ' },
      { question: '1 + cos(2θ) = ?', options: ['2cos²θ', '2sin²θ', 'cos²θ', 'None'], correctAnswer: '2cos²θ' },
      { question: 'sin(A-B) = ?', options: ['sinAcosB - cosAsinB', 'sinAcosB + cosAsinB', 'None', '1'], correctAnswer: 'sinAcosB - cosAsinB' },
      { question: 'cos(A+B) = ?', options: ['cosAcosB - sinAsinB', 'cosAcosB + sinAsinB', 'sinAcosB', 'None'], correctAnswer: 'cosAcosB - sinAsinB' },
      { question: 'tan(2θ) = ?', options: ['2tanθ / (1-tan²θ)', '2tanθ / (1+tan²θ)', 'tan²θ', 'None'], correctAnswer: '2tanθ / (1-tan²θ)' },
      { question: 'Value of sin 15°:', options: ['(√3-1)/2√2', '(√3+1)/2√2', '1/2', 'None'], correctAnswer: '(√3-1)/2√2' },
      { question: 'sinθ cosecθ = ?', options: ['1', '0', 'sin²θ', 'None'], correctAnswer: '1' },
      { question: 'cosθ secθ = ?', options: ['1', '0', 'cos²θ', 'None'], correctAnswer: '1' },
      { question: 'tanθ cotθ = ?', options: ['1', '0', 'tan²θ', 'None'], correctAnswer: '1' },
      { question: 'sec²θ - tan²θ = ?', options: ['1', '0', '-1', 'None'], correctAnswer: '1' },
      { question: 'cosec²θ - cot²θ = ?', options: ['1', '0', '-1', 'None'], correctAnswer: '1' },
      { question: 'Value of cos(2θ) in terms of tan:', options: ['(1-tan²θ)/(1+tan²θ)', '2tanθ/(1-tan²θ)', '1', 'None'], correctAnswer: '(1-tan²θ)/(1+tan²θ)' }
    ]
  },

  // ── 10N: TRIGONOMETRY — HEIGHTS AND DISTANCES ─────────────────────
  {
    sheet: '10N', topic: 'Heights and Distances', grade: 10,
    questions: [
      { question: 'Angle of elevation is measured looking ___:', options: ['Upward', 'Downward', 'Straight', 'None'], correctAnswer: 'Upward' },
      { question: 'Angle of depression is measured looking ___:', options: ['Downward', 'Upward', 'Straight', 'None'], correctAnswer: 'Downward' },
      { question: 'If angle of elevation is 45°, then Height = ?', options: ['Base', '2 * Base', 'Base / 2', 'None'], correctAnswer: 'Base' },
      { question: 'A pole 10m high casts a shadow of 10m. Angle of elevation?', options: ['45°', '30°', '60°', '90°'], correctAnswer: '45°' },
      { question: 'If height = 10m and angle = 30°, base = ?', options: ['10√3 m', '10/√3 m', '20 m', '5 m'], correctAnswer: '10√3 m' },
      { question: 'Which ratio is most used for height and distance?', options: ['tan θ', 'sin θ', 'cos θ', 'cosec θ'], correctAnswer: 'tan θ' },
      { question: 'Shadow of a tower 100m high if angle is 60°:', options: ['100/√3 m', '100√3 m', '200 m', '50 m'], correctAnswer: '100/√3 m' },
      { question: 'Horizontal line and line of sight make the ___:', options: ['Angle', 'Height', 'Distance', 'None'], correctAnswer: 'Angle' },
      { question: 'If base = 20m and angle = 60°, height = ?', options: ['20√3 m', '20/√3 m', '40 m', '10 m'], correctAnswer: '20√3 m' },
      { question: 'As you move away from a building, angle of elevation ___:', options: ['Decreases', 'Increases', 'Stays same', 'None'], correctAnswer: 'Decreases' },
      { question: 'Angle of elevation and depression are ___ angles.', options: ['Alternate', 'Corresponding', 'Vertical', 'None'], correctAnswer: 'Alternate' },
      { question: 'A 1.5m tall boy looks at a 31.5m tower. Elevation height used?', options: ['30m', '31.5m', '1.5m', '33m'], correctAnswer: '30m' },
      { question: 'If tan θ = 1, θ = ?', options: ['45°', '30°', '60°', '0°'], correctAnswer: '45°' },
      { question: 'Value of tan 30°:', options: ['1/√3', '√3', '1', 'None'], correctAnswer: '1/√3' },
      { question: 'Value of tan 60°:', options: ['√3', '1/√3', '1', 'None'], correctAnswer: '√3' },
      { question: 'If a ladder 10m makes 60° with wall, height reached?', options: ['5m', '5√3m', '10m', 'None'], correctAnswer: '5m' },
      { question: 'If d=20, h=20, then elevation angle is:', options: ['45°', '30°', '60°', '90°'], correctAnswer: '45°' },
      { question: 'Height of a tower if shadow is zero:', options: ['0 (Sun at Zenith)', 'Infinity', 'Same', 'None'], correctAnswer: '0 (Sun at Zenith)' },
      { question: 'Is elevation angle ever greater than 90°?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Line of sight is the line from eye to ___:', options: ['Object', 'Ground', 'Sun', 'None'], correctAnswer: 'Object' }
    ]
  },

  // ── 10O: VECTORS — ADDITION, SUBTRACTION ──────────────────────────
  {
    sheet: '10O', topic: 'Vector Operations', grade: 10,
    questions: [
      { question: 'Vector has both magnitude and ___:', options: ['Direction', 'Speed', 'Weight', 'Time'], correctAnswer: 'Direction' },
      { question: 'Addition of (2, 3) and (4, 1) is:', options: ['(6, 4)', '(2, 2)', '(8, 3)', 'None'], correctAnswer: '(6, 4)' },
      { question: 'Subtraction of (5, 5) and (2, 3) is:', options: ['(3, 2)', '(7, 8)', '(10, 15)', 'None'], correctAnswer: '(3, 2)' },
      { question: 'Scalar multiplication 3 * (1, 2) is:', options: ['(3, 6)', '(1, 2)', '(4, 5)', 'None'], correctAnswer: '(3, 6)' },
      { question: 'A vector starting from origin is a ___ vector.', options: ['Position', 'Unit', 'Zero', 'Free'], correctAnswer: 'Position' },
      { question: 'Magnitude of (3, 4) is:', options: ['5', '7', '1', '25'], correctAnswer: '5' },
      { question: 'Is a + b = b + a in vectors?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Negative of vector (x, y) is:', options: ['(-x, -y)', ( 'x, y'), '(y, x)', '(0, 0)'], correctAnswer: '(-x, -y)' },
      { question: 'Direction of (1, 1) with x-axis:', options: ['45°', '30°', '60°', '90°'], correctAnswer: '45°' },
      { question: 'A vector with zero magnitude is:', options: ['Zero vector', 'Unit vector', 'Row vector', 'None'], correctAnswer: 'Zero vector' },
      { question: 'Symbol for vector AB is:', options: ['→AB', 'AB', '|AB|', 'None'], correctAnswer: '→AB' },
      { question: 'Find (10, 0) + (0, 10):', options: ['(10, 10)', '(0, 0)', '(20, 20)', 'None'], correctAnswer: '(10, 10)' },
      { question: 'Triangle law of addition: AB + BC = ?', options: ['AC', 'BA', 'CA', 'None'], correctAnswer: 'AC' },
      { question: 'Unit vector in x-direction is:', options: ['i', 'j', 'k', '0'], correctAnswer: 'i' },
      { question: 'Unit vector in y-direction is:', options: ['j', 'i', 'k', '0'], correctAnswer: 'j' },
      { question: 'Find 2 * (5, -2):', options: ['(10, -4)', '(7, 0)', '(10, -2)', 'None'], correctAnswer: '(10, -4)' },
      { question: 'Is vector subtraction commutative?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'Magnitude is also called ___:', options: ['Length', 'Direction', 'Slope', 'None'], correctAnswer: 'Length' },
      { question: 'Vector (0, 1) is a ___ vector.', options: ['Unit', 'Zero', 'Row', 'None'], correctAnswer: 'Unit' },
      { question: 'Resultant of two opposite equal vectors is:', options: ['Zero vector', 'Unit vector', 'Infinite', 'None'], correctAnswer: 'Zero vector' }
    ]
  },

  // ── 10P: VECTORS — MAGNITUDE, DOT PRODUCT ─────────────────────────
  {
    sheet: '10P', topic: 'Dot Product', grade: 10,
    questions: [
      { question: 'Dot product a·b = ?', options: ['|a||b|cosθ', '|a||b|sinθ', 'ab', 'None'], correctAnswer: '|a||b|cosθ' },
      { question: 'If a=(x1, y1) and b=(x2, y2), a·b = ?', options: ['x1x2 + y1y2', 'x1x2 - y1y2', 'x1y2 + x2y1', 'None'], correctAnswer: 'x1x2 + y1y2' },
      { question: 'If a·b = 0, vectors are:', options: ['Perpendicular', 'Parallel', 'Equal', 'None'], correctAnswer: 'Perpendicular' },
      { question: 'Magnitude of vector (x, y) is:', options: ['√(x²+y²)', 'x²+y²', 'x+y', 'None'], correctAnswer: '√(x²+y²)' },
      { question: 'Find dot product of (1, 2) and (3, 4):', options: ['11', '10', '7', '14'], correctAnswer: '11' },
      { question: 'Angle θ if a·b = |a||b|:', options: ['0°', '90°', '180°', '45°'], correctAnswer: '0°' },
      { question: 'Angle θ if a·b = -|a||b|:', options: ['180°', '90°', '0°', 'None'], correctAnswer: '180°' },
      { question: 'Dot product is a ___ quantity.', options: ['Scalar', 'Vector', 'Matrix', 'None'], correctAnswer: 'Scalar' },
      { question: 'Find magnitude of (6, 8):', options: ['10', '14', '2', '100'], correctAnswer: '10' },
      { question: 'Is a·b = b·a?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'i·i = ?', options: ['1', '0', 'i²', 'None'], correctAnswer: '1' },
      { question: 'i·j = ?', options: ['0', '1', 'ij', 'None'], correctAnswer: '0' },
      { question: 'Find dot product: (2, -1)·(3, 4)', options: ['2', '10', '-2', '5'], correctAnswer: '2' },
      { question: 'If vectors are parallel, angle is 0 or ___:', options: ['180°', '90°', '45°', 'None'], correctAnswer: '180°' },
      { question: 'Unit vector magnitude is always:', options: ['1', '0', 'Any', 'None'], correctAnswer: '1' },
      { question: 'a·a = ?', options: ['|a|²', 'a', '1', '0'], correctAnswer: '|a|²' },
      { question: 'Dot product of (1, 0) and (0, 1):', options: ['0', '1', '2', 'None'], correctAnswer: '0' },
      { question: 'Cosine of angle between (3,0) and (0,4):', options: ['0', '1', '0.5', 'None'], correctAnswer: '0' },
      { question: 'Magnitude of (1, 1) is:', options: ['√2', '1', '2', '0'], correctAnswer: '√2' },
      { question: 'A vector divided by its magnitude is a ___ vector.', options: ['Unit', 'Zero', 'Free', 'None'], correctAnswer: 'Unit' }
    ]
  },

  // ── 10Q: TRANSFORMATION — REFLECTION, ROTATION ────────────────────
  {
    sheet: '10Q', topic: 'Transformation', grade: 10,
    questions: [
      { question: 'Reflection of (x, y) in x-axis:', options: ['(x, -y)', '(-x, y)', '(-x, -y)', '(y, x)'], correctAnswer: '(x, -y)' },
      { question: 'Reflection of (x, y) in y-axis:', options: ['(-x, y)', '(x, -y)', '(-x, -y)', '(y, x)'], correctAnswer: '(-x, y)' },
      { question: 'Reflection of (x, y) in y = x:', options: ['(y, x)', '(-x, -y)', '(-y, -x)', '(x, y)'], correctAnswer: '(y, x)' },
      { question: 'Reflection of (x, y) in origin:', options: ['(-x, -y)', '(x, y)', '(y, x)', '(-y, -x)'], correctAnswer: '(-x, -y)' },
      { question: 'Rotation of (x, y) by +90° about origin:', options: ['(-y, x)', '(y, -x)', '(x, -y)', '(-x, y)'], correctAnswer: '(-y, x)' },
      { question: 'Rotation of (x, y) by -90° (270°) about origin:', options: ['(y, -x)', '(-y, x)', '(-x, -y)', '(x, y)'], correctAnswer: '(y, -x)' },
      { question: 'Rotation of (x, y) by 180° about origin:', options: ['(-x, -y)', '(y, x)', '(x, y)', '(-y, -x)'], correctAnswer: '(-x, -y)' },
      { question: 'Image of (2, 3) reflected in x-axis:', options: ['(2, -3)', '(-2, 3)', '(3, 2)', 'None'], correctAnswer: '(2, -3)' },
      { question: 'Image of (4, 5) reflected in y-axis:', options: ['(-4, 5)', '(4, -5)', '(-4, -5)', 'None'], correctAnswer: '(-4, 5)' },
      { question: 'Transformation that flips a figure is:', options: ['Reflection', 'Rotation', 'Translation', 'Enlargement'], correctAnswer: 'Reflection' },
      { question: 'Image of (1, 2) rotated 90° clockwise:', options: ['(2, -1)', '(-2, 1)', '(-1, -2)', 'None'], correctAnswer: '(2, -1)' },
      { question: 'Image of (0, 5) reflected in y=x:', options: ['(5, 0)', '(0, -5)', '(-5, 0)', 'None'], correctAnswer: '(5, 0)' },
      { question: 'Is reflection an isometric transformation?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Is rotation an isometric transformation?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'Reflection in y = -x transforms (x, y) to:', options: ['(-y, -x)', '(y, x)', '(-x, -y)', 'None'], correctAnswer: '(-y, -x)' },
      { question: 'Rotation of 360° results in ___ image.', options: ['Same', 'Inverted', 'Flipped', 'None'], correctAnswer: 'Same' },
      { question: 'Image of (3, -4) reflected in origin:', options: ['(-3, 4)', '(3, 4)', '(-3, -4)', 'None'], correctAnswer: '(-3, 4)' },
      { question: 'Point that doesn\'t move during transformation is ___:', options: ['Invariant', 'Origin', 'Center', 'None'], correctAnswer: 'Invariant' },
      { question: 'A rotation is determined by center and ___:', options: ['Angle', 'Scale', 'Vector', 'None'], correctAnswer: 'Angle' },
      { question: 'Image of (1, 1) reflected in x=2:', options: ['(3, 1)', '(2, 1)', '(1, 3)', 'None'], correctAnswer: '(3, 1)' }
    ]
  },

  // ── 10R: TRANSFORMATION — TRANSLATION, ENLARGEMENT ────────────────
  {
    sheet: '10R', topic: 'Translation/Enlargement', grade: 10,
    questions: [
      { question: 'Translation of (x, y) by vector (a, b):', options: ['(x+a, y+b)', '(x-a, y-b)', '(ax, by)', 'None'], correctAnswer: '(x+a, y+b)' },
      { question: 'Enlargement of (x, y) with center origin and scale k:', options: ['(kx, ky)', '(x+k, y+k)', '(x/k, y/k)', 'None'], correctAnswer: '(kx, ky)' },
      { question: 'If k > 1, the enlargement is an ___:', options: ['Expansion', 'Reduction', 'Inversion', 'None'], correctAnswer: 'Expansion' },
      { question: 'If 0 < k < 1, the enlargement is a ___:', options: ['Reduction', 'Expansion', 'Inversion', 'None'], correctAnswer: 'Reduction' },
      { question: 'Translation vector for (2, 3) to (5, 7):', options: ['(3, 4)', '(7, 10)', '(1, 1)', 'None'], correctAnswer: '(3, 4)' },
      { question: 'Image of (1, 2) enlarged by scale 3 from origin:', options: ['(3, 6)', '(4, 5)', '(1/3, 2/3)', 'None'], correctAnswer: '(3, 6)' },
      { question: 'Translation is an isometric transformation.', options: ['True', 'False'], correctAnswer: 'True' },
      { question: 'Enlargement is an isometric transformation.', options: ['False', 'True'], correctAnswer: 'False' },
      { question: 'If k = -1, enlargement from origin is same as ___:', options: ['180° rotation', 'Reflection', 'Translation', 'None'], correctAnswer: '180° rotation' },
      { question: 'Scale factor k = Image distance / ___ distance.', options: ['Object', 'Center', 'Origin', 'None'], correctAnswer: 'Object' },
      { question: 'Image of (4, 4) with scale factor 0.5 from origin:', options: ['(2, 2)', '(8, 8)', '(4, 4)', 'None'], correctAnswer: '(2, 2)' },
      { question: 'Translate (0, 0) by vector (-1, 5):', options: ['(-1, 5)', '(1, -5)', '(0, 0)', 'None'], correctAnswer: '(-1, 5)' },
      { question: 'In enlargement, shape remains ___ but size changes.', options: ['Similar', 'Congruent', 'Equal', 'None'], correctAnswer: 'Similar' },
      { question: 'Transformation that moves every point same distance/direction:', options: ['Translation', 'Rotation', 'Reflection', 'None'], correctAnswer: 'Translation' },
      { question: 'Find k if (2, 2) becomes (6, 6) from origin:', options: ['3', '4', '2', '6'], correctAnswer: '3' },
      { question: 'Translate (5, 5) by (2, 2) then again by (1, 1):', options: ['(8, 8)', '(7, 7)', '(10, 10)', 'None'], correctAnswer: '(8, 8)' },
      { question: 'Image of origin (0, 0) under enlargement from origin:', options: ['(0, 0)', '(k, k)', 'Undefined', 'None'], correctAnswer: '(0, 0)' },
      { question: 'If area of object is 4 and k=2, area of image is:', options: ['16 (k²*A)', '8', '4', '12'], correctAnswer: '16 (k²*A)' },
      { question: 'Scale factor for "Congruent" enlargement is:', options: ['±1', '0', '2', 'Any'], correctAnswer: '±1' },
      { question: 'Can k be zero?', options: ['No (Shape disappears)', 'Yes'], correctAnswer: 'No (Shape disappears)' }
    ]
  },

  // ── 10S: STATISTICS — COMPLETE ────────────────────────────────────
  {
    sheet: '10S', topic: 'Complete Statistics', grade: 10,
    questions: [
      { question: 'Mean of grouped data (x̄) = ?', options: ['Σfx / N', 'Σf / N', 'Σx / N', 'None'], correctAnswer: 'Σfx / N' },
      { question: 'Median of grouped data: L + [(N/2 - cf)/f] * i. What is L?', options: ['Lower limit of class', 'Length of class', 'Last value', 'None'], correctAnswer: 'Lower limit of class' },
      { question: 'The value with highest frequency is:', options: ['Mode', 'Mean', 'Median', 'Range'], correctAnswer: 'Mode' },
      { question: 'First Quartile (Q1) position for N items:', options: ['(N+1)/4', 'N/2', '3(N+1)/4', 'None'], correctAnswer: '(N+1)/4' },
      { question: 'Third Quartile (Q3) position for N items:', options: ['3(N+1)/4', 'N/4', 'N/2', 'None'], correctAnswer: '3(N+1)/4' },
      { question: 'Standard Deviation is square root of:', options: ['Variance', 'Mean', 'Range', 'Mode'], correctAnswer: 'Variance' },
      { question: 'Range = Maximum - ___:', options: ['Minimum', 'Mean', 'Median', '0'], correctAnswer: 'Minimum' },
      { question: 'The middle value of an ordered set is:', options: ['Median', 'Mean', 'Mode', 'Range'], correctAnswer: 'Median' },
      { question: 'Find mean of 2, 4, 6, 8, 10:', options: ['6', '5', '8', '4'], correctAnswer: '6' },
      { question: 'Find median of 1, 3, 5, 7, 9:', options: ['5', '3', '7', '1'], correctAnswer: '5' },
      { question: 'Formula for Variance (σ²):', options: ['Σ(x-x̄)²/N', 'Σx/N', 'Σf/N', 'None'], correctAnswer: 'Σ(x-x̄)²/N' },
      { question: 'Continuous data is organized into ___:', options: ['Class Intervals', 'Points', 'Rows', 'None'], correctAnswer: 'Class Intervals' },
      { question: 'Cumulative frequency (cf) is used for ___:', options: ['Median/Quartiles', 'Mean', 'Mode', 'Range'], correctAnswer: 'Median/Quartiles' },
      { question: 'If N=20, Q2 (Median) position is:', options: ['10.5', '5', '15', '20'], correctAnswer: '10.5' },
      { question: 'Inter-quartile range = ?', options: ['Q3 - Q1', 'Q3 + Q1', 'Q2 - Q1', 'None'], correctAnswer: 'Q3 - Q1' },
      { question: 'Coefficient of variation (CV) = ?', options: ['(σ/x̄)*100', 'σ/x̄', 'x̄/σ', 'None'], correctAnswer: '(σ/x̄)*100' },
      { question: 'Mean of first 5 natural numbers:', options: ['3', '2.5', '5', '15'], correctAnswer: '3' },
      { question: 'If every value is increased by 5, mean increases by:', options: ['5', '0', '10', 'None'], correctAnswer: '5' },
      { question: 'Is SD affected by change of origin?', options: ['No', 'Yes'], correctAnswer: 'No' },
      { question: 'The width of class (10-20) is:', options: ['10', '20', '15', '30'], correctAnswer: '10' }
    ]
  },

  // ── 10T: PROBABILITY — ADVANCED PROBLEMS ───────────────────────────
  {
    sheet: '10T', topic: 'Advanced Probability', grade: 10,
    questions: [
      { question: 'Probability P(A) ranges from:', options: ['0 to 1', '-1 to 1', '0 to 100', 'None'], correctAnswer: '0 to 1' },
      { question: 'P(Certain Event) = ?', options: ['1', '0', '0.5', 'None'], correctAnswer: '1' },
      { question: 'P(Impossible Event) = ?', options: ['0', '1', '-1', 'None'], correctAnswer: '0' },
      { question: 'If P(A)=0.3, then P(A\') = ?', options: ['0.7', '0.3', '1', '0'], correctAnswer: '0.7' },
      { question: 'Mutually exclusive events: P(A ∪ B) = ?', options: ['P(A) + P(B)', 'P(A) * P(B)', '0', '1'], correctAnswer: 'P(A) + P(B)' },
      { question: 'Independent events: P(A ∩ B) = ?', options: ['P(A) * P(B)', 'P(A) + P(B)', 'P(A) / P(B)', 'None'], correctAnswer: 'P(A) * P(B)' },
      { question: 'Sample space of tossing 3 coins:', options: ['8', '6', '4', '2'], correctAnswer: '8' },
      { question: 'P(King) from a deck of 52 cards:', options: ['4/52', '1/52', '1/13', 'Both A and C'], correctAnswer: 'Both A and C' },
      { question: 'P(getting sum 7) when rolling two dice:', options: ['6/36', '1/36', '5/36', 'None'], correctAnswer: '6/36' },
      { question: 'Tree diagram is used for ___ events.', options: ['Combined/Sequential', 'Simple', 'Impossible', 'None'], correctAnswer: 'Combined/Sequential' },
      { question: 'A card is drawn from 52. P(Red or Ace):', options: ['28/52', '26/52', '30/52', 'None'], correctAnswer: '28/52' },
      { question: 'P(Leap year has 53 Mondays):', options: ['2/7', '1/7', '0', 'None'], correctAnswer: '2/7' },
      { question: 'Bag has 5 red, 3 blue. P(Blue) = ?', options: ['3/8', '5/8', '1/2', 'None'], correctAnswer: '3/8' },
      { question: 'Two cards are drawn without replacement. These are ___ events.', options: ['Dependent', 'Independent', 'Mutually exclusive', 'None'], correctAnswer: 'Dependent' },
      { question: 'P(even number) on a single die roll:', options: ['1/2', '1/3', '1/6', 'None'], correctAnswer: '1/2' },
      { question: 'Is P(A ∪ B) = P(A) + P(B) - P(A ∩ B)?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'P(getting a 7 on a die roll):', options: ['0', '1/7', '1/6', 'None'], correctAnswer: '0' },
      { question: 'Number of face cards in a deck:', options: ['12', '4', '16', '13'], correctAnswer: '12' },
      { question: 'Probability of a girl in a family of 2 children:', options: ['3/4', '1/2', '1/4', 'None'], correctAnswer: '3/4' },
      { question: 'Sample space is the set of all ___ outcomes.', options: ['Possible', 'Successful', 'Impossible', 'None'], correctAnswer: 'Possible' }
    ]
  },

  // ── 10U: MENSURATION — ADVANCED 3D SHAPES ──────────────────────────
  {
    sheet: '10U', topic: 'Advanced Mensuration', grade: 10,
    questions: [
      { question: 'Total Surface Area (TSA) of a cylinder:', options: ['2πr(r+h)', '2πrh', 'πr²h', 'None'], correctAnswer: '2πr(r+h)' },
      { question: 'Volume of a sphere:', options: ['4/3 πr³', '4πr²', 'πr³', 'None'], correctAnswer: '4/3 πr³' },
      { question: 'Surface Area of a sphere:', options: ['4πr²', '2πr²', '4/3 πr³', 'None'], correctAnswer: '4πr²' },
      { question: 'TSA of a hemisphere (solid):', options: ['3πr²', '2πr²', 'πr²', 'None'], correctAnswer: '3πr²' },
      { question: 'Volume of a cone:', options: ['1/3 πr²h', 'πr²h', 'πrl', 'None'], correctAnswer: '1/3 πr²h' },
      { question: 'Curved Surface Area (CSA) of a cone:', options: ['πrl', 'πr²h', '2πrh', 'None'], correctAnswer: 'πrl' },
      { question: 'Volume of a pyramid:', options: ['1/3 Area of Base * h', 'Base * h', '1/2 Base * h', 'None'], correctAnswer: '1/3 Area of Base * h' },
      { question: 'Volume of a prism:', options: ['Base Area * l', '1/2 Base * h', 'Base * l', 'None'], correctAnswer: 'Base Area * l' },
      { question: 'TSA of a cube (side a):', options: ['6a²', 'a³', '4a²', 'None'], correctAnswer: '6a²' },
      { question: 'Volume of a cuboid:', options: ['l * b * h', '2(lb+bh+hl)', 'l+b+h', 'None'], correctAnswer: 'l * b * h' },
      { question: 'CSA of a cylinder:', options: ['2πrh', '2πr(r+h)', 'πr²h', 'None'], correctAnswer: '2πrh' },
      { question: 'Slant height (l) of a cone:', options: ['√(r²+h²)', 'r+h', '√(r²-h²)', 'None'], correctAnswer: '√(r²+h²)' },
      { question: '1 liter is equal to ___ cm³:', options: ['1000', '100', '10', '10000'], correctAnswer: '1000' },
      { question: 'Area of cross-section of a cylinder is:', options: ['πr²', '2πr', 'πdh', 'None'], correctAnswer: 'πr²' },
      { question: 'Diagonal of a cuboid:', options: ['√(l²+b²+h²)', 'l+b+h', 'lbh', 'None'], correctAnswer: '√(l²+b²+h²)' },
      { question: 'If r=7, area of circle is:', options: ['154', '44', '49', 'None'], correctAnswer: '154' },
      { question: 'If r=7, h=10, volume of cylinder:', options: ['1540', '154', '70', 'None'], correctAnswer: '1540' },
      { question: 'CSA of a hemisphere:', options: ['2πr²', '3πr²', '4πr²', 'None'], correctAnswer: '2πr²' },
      { question: 'TSA of a prism is 2*Base Area + ___:', options: ['Perimeter * l', 'Volume', 'Base Area', 'None'], correctAnswer: 'Perimeter * l' },
      { question: 'Ratio of volumes of cone and cylinder with same r, h:', options: ['1:3', '3:1', '1:1', 'None'], correctAnswer: '1:3' }
    ]
  },

  // ── 10V: SEE MODEL PAPER — FULL EXAM STYLE ────────────────────────
  {
    sheet: '10V', topic: 'SEE Model Paper', grade: 10,
    questions: [
      { question: 'In a group of 50, 20 like only Tea. 15 like only Coffee. 10 like neither. How many like both?', options: ['5', '10', '15', '0'], correctAnswer: '5' },
      { question: 'Find AM between (x-y) and (x+y):', options: ['x', 'y', '2x', '0'], correctAnswer: 'x' },
      { question: 'The value of cos 60° + sin 30° is:', options: ['1', '1/2', '√3', '0'], correctAnswer: '1' },
      { question: 'If f(x)=3x-2, f⁻¹(4) is:', options: ['2', '4', '10', 'None'], correctAnswer: '2' },
      { question: 'Discriminant of 2x² - 5x + 3 = 0:', options: ['1', '25', '49', '0'], correctAnswer: '1' },
      { question: 'The dot product of (2,3) and (-3,2) is:', options: ['0', '12', '1', 'None'], correctAnswer: '0' },
      { question: 'Volume of sphere with radius 3cm:', options: ['36π', '12π', '9π', 'None'], correctAnswer: '36π' },
      { question: 'The mean of 10 items is 50. Sum of items is:', options: ['500', '50', '5', 'None'], correctAnswer: '500' },
      { question: 'P(getting a head and a 6) from coin and die:', options: ['1/12', '1/2', '1/6', 'None'], correctAnswer: '1/12' },
      { question: 'Image of (1,1) after 180° rotation:', options: ['(-1,-1)', '(1,1)', '(-1,1)', '(1,-1)'], correctAnswer: '(-1,-1)' },
      { question: 'A matrix A is singular if det(A) = ?', options: ['0', '1', '-1', 'None'], correctAnswer: '0' },
      { question: 'Standard VAT rate in Nepal is:', options: ['13%', '10%', '15%', '1%'], correctAnswer: '13%' },
      { question: 'Heron\'s formula for area of triangle:', options: ['√s(s-a)(s-b)(s-c)', '1/2bh', 's/2', 'None'], correctAnswer: '√s(s-a)(s-b)(s-c)' },
      { question: 'If r=1, Sn of GP is:', options: ['na', 'a', '0', 'None'], correctAnswer: 'na' },
      { question: 'Reflection of (2,3) in y-axis:', options: ['(-2,3)', '(2,-3)', '(-2,-3)', 'None'], correctAnswer: '(-2,3)' },
      { question: 'The value of tan 45° + cot 45°:', options: ['2', '1', '0', 'None'], correctAnswer: '2' },
      { question: 'Midpoint of (2,4) and (6,8):', options: ['(4,6)', '(8,12)', '(2,2)', 'None'], correctAnswer: '(4,6)' },
      { question: 'In Pythagoras theorem, side "p" is:', options: ['√(h²-b²)', '√(h²+b²)', 'h-b', 'None'], correctAnswer: '√(h²-b²)' },
      { question: 'Probability of a composite number on a die roll:', options: ['2/6', '3/6', '1/6', 'None'], correctAnswer: '2/6' },
      { question: 'The area of a circle with diameter 14cm:', options: ['154', '616', '44', 'None'], correctAnswer: '154' }
    ]
  },

  // ── 10W: SEE PRACTICE SET 1 — 75 MARKS FORMAT ─────────────────────
  {
    sheet: '10W', topic: 'SEE Practice Set', grade: 10,
    questions: [
      { question: 'If n(U)=60, n(A)=35, n(B)=25, n(A∩B)=10, find n(A∪B)\':', options: ['10', '50', '60', '0'], correctAnswer: '10' },
      { question: 'If f(x)=x+2 and g(x)=x², find fog(2):', options: ['6', '16', '8', '4'], correctAnswer: '6' },
      { question: 'Find r if 5, 10, 20... is a GP:', options: ['2', '5', '1', '0.5'], correctAnswer: '2' },
      { question: 'Value of x if 2, x, 18 are in GP:', options: ['6', '10', '8', '9'], correctAnswer: '6' },
      { question: 'Find the remainder: x² - 4 divided by (x-2):', options: ['0', '4', '-4', '2'], correctAnswer: '0' },
      { question: 'The product of roots of x² - 7x + 12 = 0:', options: ['12', '7', '-7', '1'], correctAnswer: '12' },
      { question: 'Evaluate: det [1 2; 3 4]:', options: ['-2', '2', '10', 'None'], correctAnswer: '-2' },
      { question: 'Image of (3,4) translated by (1, -1):', options: ['(4,3)', '(2,5)', '(3,3)', 'None'], correctAnswer: '(4,3)' },
      { question: 'Area of 4 walls of a room (l,b,h):', options: ['2h(l+b)', '2(lb+bh+hl)', 'lbh', 'None'], correctAnswer: '2h(l+b)' },
      { question: 'The probability of a prime number on a die:', options: ['1/2', '1/3', '2/3', 'None'], correctAnswer: '1/2' },
      { question: 'What is the sum of first 50 natural numbers?', options: ['1275', '2500', '5050', '1000'], correctAnswer: '1275' },
      { question: 'tan θ * cot θ is always:', options: ['1', '0', 'tan²θ', 'None'], correctAnswer: '1' },
      { question: 'A matrix with order 2x3 has ___ elements.', options: ['6', '5', '1', 'None'], correctAnswer: '6' },
      { question: 'If k=2, an object of 5cm length becomes:', options: ['10cm', '5cm', '2.5cm', 'None'], correctAnswer: '10cm' },
      { question: 'The range of 10, 20, 30, 40, 50 is:', options: ['40', '50', '10', '30'], correctAnswer: '40' },
      { question: 'n(A-B) is equal to n(A) - ___:', options: ['n(A ∩ B)', 'n(B)', 'n(U)', 'None'], correctAnswer: 'n(A ∩ B)' },
      { question: 'If r=7, the circumference of a circle is:', options: ['44', '154', '14', 'None'], correctAnswer: '44' },
      { question: 'Is (x-3) a factor of x²-9?', options: ['Yes', 'No'], correctAnswer: 'Yes' },
      { question: 'The point where X and Y axes meet is:', options: ['Origin', 'Vertex', 'Intercept', 'None'], correctAnswer: 'Origin' },
      { question: 'In a right triangle, sin²θ + cos²θ = ?', options: ['1', '0', 'h²', 'None'], correctAnswer: '1' }
    ]
  }
];


// Seeding loop
let totalQ = 0

for (const levelData of seed_grade10) {
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
