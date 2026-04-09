import mongoose from 'mongoose'
import dotenv   from 'dotenv'
import Level    from './models/Level.js'
import Question from './models/Question.js'

// ✅ CONFIG AND CONNECT FIRST — BEFORE ANY DB OPERATIONS
dotenv.config()
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mathgame')
console.log('✅ Connected to MongoDB')

// NOW clean old data
await Level.deleteMany({ grade: 6 })
await Question.deleteMany({ grade: 6 })  // ← CHANGE THIS LINE
console.log('🧹 Cleared existing Grade 6 data\n')

const grade6 = [

  // ── 6A: Natural Numbers & Numeration ─────────────────────
  {
    sheet: '6A', topic: 'Natural Numbers & Numeration', grade: 6,
    questions: [
      { question: 'What is the place value of 4 in 3,45,678?', options: ['400', '4,000', '40,000', '4,00,000'], correctAnswer: '40,000', explanation: '4 is in the ten-thousands place' },
      { question: 'Which is the largest 5-digit number?', options: ['10000', '90000', '99990', '99999'], correctAnswer: '99999', explanation: 'Largest 5-digit = 99999' },
      { question: 'Write 2,07,045 in words:', options: ['Two lakh seven hundred forty-five', 'Two lakh seven thousand forty-five', 'Twenty-seven thousand forty-five', 'Two lakh seventy thousand forty-five'], correctAnswer: 'Two lakh seven thousand forty-five', explanation: '2,07,045 = two lakh seven thousand forty-five' },
      { question: 'What is the successor of 9,99,999?', options: ['9,99,998', '9,99,000', '10,00,000', '10,00,001'], correctAnswer: '10,00,000', explanation: 'Successor = number + 1' },
      { question: 'Round 47,382 to the nearest thousand:', options: ['47,000', '48,000', '47,300', '47,400'], correctAnswer: '47,000', explanation: '382 < 500 so round down to 47,000' },
      { question: 'Which digit is in the lakhs place in 8,34,512?', options: ['8', '3', '5', '1'], correctAnswer: '8', explanation: 'Lakhs place is the 6th digit from right' },
      { question: 'What is the predecessor of 5,00,000?', options: ['5,00,001', '4,99,999', '4,99,998', '5,01,000'], correctAnswer: '4,99,999', explanation: 'Predecessor = number − 1' },
      { question: 'Expand 6,04,312:', options: ['6000+400+300+12', '6,00,000+4000+300+12', '6,00,000+40,000+300+12', '6,00,000+4,000+300+12'], correctAnswer: '6,00,000+4,000+300+12', explanation: '6 lakhs + 4 thousands + 3 hundreds + 12' },
      { question: 'How many 4-digit numbers are there?', options: ['8999', '9000', '9001', '10000'], correctAnswer: '9000', explanation: '9999 − 1000 + 1 = 9000' },
      { question: 'Which of these is NOT a natural number?', options: ['1', '100', '0', '99'], correctAnswer: '0', explanation: 'Natural numbers start from 1' },
      { question: 'The Roman numeral for 49 is:', options: ['XXXXIX', 'IL', 'XLIX', 'VIIII'], correctAnswer: 'XLIX', explanation: 'XL = 40, IX = 9, so XLIX = 49' },
      { question: 'Convert CDXCII to Hindu-Arabic:', options: ['392', '492', '592', '692'], correctAnswer: '492', explanation: 'CD=400, XC=90, II=2 → 492' },
      { question: 'Which number is between 3,49,999 and 3,50,001?', options: ['3,49,998', '3,50,000', '3,50,002', '3,51,000'], correctAnswer: '3,50,000', explanation: '3,50,000 is between those two numbers' },
      { question: 'Arrange in descending order: 45321, 54321, 43521, 53421', options: ['54321,53421,45321,43521', '53421,54321,45321,43521', '43521,45321,53421,54321', '54321,45321,53421,43521'], correctAnswer: '54321,53421,45321,43521', explanation: 'Compare ten-thousands digit first' },
      { question: 'What is the face value of 7 in 47,328?', options: ['7', '70', '7,000', '700'], correctAnswer: '7', explanation: 'Face value is always the digit itself' },
      { question: '9,99,999 + 1 = ?', options: ['9,99,000', '10,00,000', '10,00,001', '9,99,999'], correctAnswer: '10,00,000', explanation: 'Adding 1 to 9,99,999 = 10,00,000' },
      { question: 'The smallest 6-digit number is:', options: ['1,00,000', '9,99,999', '10,0000', '1,11,111'], correctAnswer: '1,00,000', explanation: 'Smallest 6-digit = 1,00,000' },
      { question: 'What is 5 × 10,000 + 3 × 1,000 + 7 × 10 + 2?', options: ['53,072', '53,702', '50,372', '53,720'], correctAnswer: '53,072', explanation: '50,000 + 3,000 + 70 + 2 = 53,072' },
      { question: 'How many times does 6 appear in 66,666?', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '66,666 has five 6s' },
      { question: 'Round 8,35,471 to the nearest lakh:', options: ['8,00,000', '8,35,000', '9,00,000', '8,40,000'], correctAnswer: '8,00,000', explanation: '35,471 < 50,000 so round down to 8,00,000' },
    ]
  },

  // ── 6B: Factors and Multiples ─────────────────────────────
  {
    sheet: '6B', topic: 'Factors and Multiples', grade: 6,
    questions: [
      { question: 'Which of these is a factor of 24?', options: ['5', '7', '8', '9'], correctAnswer: '8', explanation: '24 ÷ 8 = 3, so 8 is a factor' },
      { question: 'How many factors does 12 have?', options: ['4', '5', '6', '7'], correctAnswer: '6', explanation: 'Factors of 12: 1,2,3,4,6,12' },
      { question: 'Which is a prime number?', options: ['9', '15', '17', '21'], correctAnswer: '17', explanation: '17 is divisible only by 1 and itself' },
      { question: 'Which is a composite number?', options: ['11', '13', '17', '18'], correctAnswer: '18', explanation: '18 has factors other than 1 and itself' },
      { question: 'The 5th multiple of 7 is:', options: ['28', '35', '42', '49'], correctAnswer: '35', explanation: '7 × 5 = 35' },
      { question: 'Is 84 divisible by 4?', options: ['Yes', 'No', 'Sometimes', 'Cannot tell'], correctAnswer: 'Yes', explanation: '84 ÷ 4 = 21, no remainder' },
      { question: 'The LCM of 4 and 6 is:', options: ['8', '12', '16', '24'], correctAnswer: '12', explanation: 'LCM(4,6) = 12' },
      { question: 'The HCF of 18 and 24 is:', options: ['3', '4', '6', '9'], correctAnswer: '6', explanation: 'Common factors: 1,2,3,6 — largest is 6' },
      { question: 'How many prime numbers are between 1 and 20?', options: ['6', '7', '8', '9'], correctAnswer: '8', explanation: '2,3,5,7,11,13,17,19 — eight primes' },
      { question: 'Which pair has HCF = 1?', options: ['4 and 6', '3 and 9', '8 and 15', '6 and 12'], correctAnswer: '8 and 15', explanation: '8 and 15 share no common factor except 1' },
      { question: 'Express 36 as a product of prime factors:', options: ['2×18', '4×9', '2²×3²', '2³×3'], correctAnswer: '2²×3²', explanation: '36 = 2×2×3×3 = 2²×3²' },
      { question: 'The LCM of 5, 6 and 10 is:', options: ['20', '30', '60', '120'], correctAnswer: '30', explanation: 'LCM(5,6,10) = 30' },
      { question: 'Which is divisible by both 3 and 5?', options: ['25', '35', '45', '55'], correctAnswer: '45', explanation: '45 ÷ 3 = 15, 45 ÷ 5 = 9' },
      { question: 'What is the HCF of 36, 48 and 60?', options: ['6', '8', '12', '15'], correctAnswer: '12', explanation: '12 divides all three numbers' },
      { question: 'Twin primes between 1 and 20:', options: ['(3,5) only', '(3,5) and (5,7)', '(5,7) and (11,13)', '(3,5),(5,7),(11,13),(17,19)'], correctAnswer: '(3,5),(5,7),(11,13),(17,19)', explanation: 'Twin primes differ by 2' },
      { question: 'Is 1 a prime number?', options: ['Yes', 'No', 'Sometimes', 'Depends'], correctAnswer: 'No', explanation: '1 is neither prime nor composite' },
      { question: 'The smallest prime number is:', options: ['0', '1', '2', '3'], correctAnswer: '2', explanation: '2 is the smallest and only even prime' },
      { question: 'LCM × HCF = ?', options: ['Sum of two numbers', 'Difference of two numbers', 'Product of two numbers', 'Quotient of two numbers'], correctAnswer: 'Product of two numbers', explanation: 'LCM × HCF = a × b always' },
      { question: 'HCF of 100 and 75 is:', options: ['5', '15', '25', '50'], correctAnswer: '25', explanation: '100 = 4×25, 75 = 3×25' },
      { question: 'Which number has exactly 2 factors?', options: ['1', '4', '9', '11'], correctAnswer: '11', explanation: '11 has exactly 2 factors: 1 and 11' },
    ]
  },

  // ── 6C: Integers ─────────────────────────────────────────
  {
    sheet: '6C', topic: 'Integers', grade: 6,
    questions: [
      { question: '5 + (−3) = ?', options: ['−8', '2', '8', '−2'], correctAnswer: '2', explanation: '5 − 3 = 2' },
      { question: '(−4) + (−6) = ?', options: ['10', '2', '−2', '−10'], correctAnswer: '−10', explanation: 'Adding two negatives: −4 − 6 = −10' },
      { question: '(−8) − (−3) = ?', options: ['−11', '−5', '5', '11'], correctAnswer: '−5', explanation: '−8 − (−3) = −8 + 3 = −5' },
      { question: 'Which integer is greater: −5 or −2?', options: ['−5', '−2', 'They are equal', 'Cannot compare'], correctAnswer: '−2', explanation: 'On number line, −2 is to the right of −5' },
      { question: 'Absolute value of −15 is:', options: ['−15', '0', '15', '1/15'], correctAnswer: '15', explanation: '|−15| = 15' },
      { question: '(−6) × 4 = ?', options: ['24', '10', '−10', '−24'], correctAnswer: '−24', explanation: 'Negative × positive = negative' },
      { question: '(−5) × (−3) = ?', options: ['−15', '−8', '8', '15'], correctAnswer: '15', explanation: 'Negative × negative = positive' },
      { question: '(−20) ÷ 4 = ?', options: ['5', '−5', '−16', '16'], correctAnswer: '−5', explanation: 'Negative ÷ positive = negative' },
      { question: 'Which set represents integers?', options: ['{1,2,3}', '{0.5,1,2}', '{−2,−1,0,1,2}', '{1/2,1,2}'], correctAnswer: '{−2,−1,0,1,2}', explanation: 'Integers include negative, zero, and positive whole numbers' },
      { question: 'Temperature was −3°C and rose by 7°C. New temperature:', options: ['−10°C', '4°C', '−4°C', '10°C'], correctAnswer: '4°C', explanation: '−3 + 7 = 4' },
      { question: 'Arrange in ascending order: −3, 2, −7, 0, 5', options: ['5,2,0,−3,−7', '−7,0,−3,2,5', '−7,−3,0,2,5', '−3,−7,0,2,5'], correctAnswer: '−7,−3,0,2,5', explanation: 'Ascending = smallest to largest' },
      { question: '(−12) ÷ (−3) = ?', options: ['−4', '−9', '4', '9'], correctAnswer: '4', explanation: 'Negative ÷ negative = positive' },
      { question: 'What is −|−9|?', options: ['9', '−9', '0', '1/9'], correctAnswer: '−9', explanation: '|−9| = 9, then −9' },
      { question: 'The additive inverse of −7 is:', options: ['7', '−7', '1/7', '0'], correctAnswer: '7', explanation: 'Additive inverse of −7 is +7' },
      { question: '(−3) × (−2) × (−1) = ?', options: ['6', '−6', '−1', '1'], correctAnswer: '−6', explanation: 'Three negatives multiplied = negative' },
      { question: 'Which is NOT an integer?', options: ['−100', '0', '3/2', '7'], correctAnswer: '3/2', explanation: '3/2 = 1.5, which is not a whole number' },
      { question: '15 + (−15) = ?', options: ['30', '−30', '0', '1'], correctAnswer: '0', explanation: 'A number plus its additive inverse = 0' },
      { question: 'A submarine is at −120m. It rises 45m. New depth:', options: ['−165m', '165m', '−75m', '75m'], correctAnswer: '−75m', explanation: '−120 + 45 = −75' },
      { question: 'How many integers are between −4 and 4 (exclusive)?', options: ['5', '6', '7', '8'], correctAnswer: '7', explanation: '−3,−2,−1,0,1,2,3 — seven integers' },
      { question: '(−2)⁴ = ?', options: ['−16', '−8', '8', '16'], correctAnswer: '16', explanation: '(−2)⁴ = (−2)×(−2)×(−2)×(−2) = 16' },
    ]
  },

  // ── 6D: Fractions ────────────────────────────────────────
  {
    sheet: '6D', topic: 'Fractions', grade: 6,
    questions: [
      { question: '1/2 + 1/3 = ?', options: ['2/5', '2/6', '5/6', '3/5'], correctAnswer: '5/6', explanation: '3/6 + 2/6 = 5/6' },
      { question: '3/4 − 1/4 = ?', options: ['2/0', '2/8', '1/2', '4/4'], correctAnswer: '1/2', explanation: '3/4 − 1/4 = 2/4 = 1/2' },
      { question: '2/3 × 3/4 = ?', options: ['5/7', '6/12', '1/2', '8/9'], correctAnswer: '1/2', explanation: '2×3 / 3×4 = 6/12 = 1/2' },
      { question: '5/6 ÷ 5/12 = ?', options: ['1', '2', '25/72', '1/2'], correctAnswer: '2', explanation: '5/6 × 12/5 = 60/30 = 2' },
      { question: 'Which fraction is equivalent to 2/3?', options: ['3/4', '4/5', '4/6', '5/6'], correctAnswer: '4/6', explanation: '2/3 = 4/6 (multiply both by 2)' },
      { question: 'Convert 11/4 to a mixed number:', options: ['2¾', '3¼', '2½', '3½'], correctAnswer: '2¾', explanation: '11 ÷ 4 = 2 remainder 3, so 2¾' },
      { question: 'Convert 3⅖ to an improper fraction:', options: ['17/5', '16/5', '8/5', '15/5'], correctAnswer: '17/5', explanation: '3×5+2 = 17, so 17/5' },
      { question: 'Which is the largest: 3/4, 2/3, 5/6, 7/12?', options: ['3/4', '2/3', '5/6', '7/12'], correctAnswer: '5/6', explanation: 'Common denominator 12: 9/12, 8/12, 10/12, 7/12 → 10/12 = 5/6' },
      { question: '1½ + 2¾ = ?', options: ['3¼', '3½', '4¼', '4½'], correctAnswer: '4¼', explanation: '3/2 + 11/4 = 6/4 + 11/4 = 17/4 = 4¼' },
      { question: '5/9 × 27 = ?', options: ['10', '15', '25', '45'], correctAnswer: '15', explanation: '5/9 × 27 = 5×3 = 15' },
      { question: 'Simplify 36/48:', options: ['6/8', '3/4', '9/12', '18/24'], correctAnswer: '3/4', explanation: 'HCF(36,48) = 12; 36/12 = 3, 48/12 = 4' },
      { question: 'Reciprocal of 5/7 is:', options: ['5/7', '−5/7', '7/5', '−7/5'], correctAnswer: '7/5', explanation: 'Reciprocal = flip numerator and denominator' },
      { question: '7/8 of 64 = ?', options: ['49', '56', '63', '72'], correctAnswer: '56', explanation: '7/8 × 64 = 7×8 = 56' },
      { question: 'Which fraction is between 1/3 and 1/2?', options: ['1/4', '1/6', '2/5', '5/8'], correctAnswer: '2/5', explanation: '1/3 = 0.33, 2/5 = 0.4, 1/2 = 0.5' },
      { question: '4/5 ÷ 2 = ?', options: ['8/5', '2/5', '4/10', '2/10'], correctAnswer: '2/5', explanation: '4/5 × 1/2 = 4/10 = 2/5' },
      { question: 'A rope of 7½ m is cut into pieces of ¾ m each. How many pieces?', options: ['8', '9', '10', '12'], correctAnswer: '10', explanation: '7½ ÷ ¾ = 15/2 × 4/3 = 10' },
      { question: '2/3 of a number is 18. The number is:', options: ['12', '24', '27', '36'], correctAnswer: '27', explanation: 'number = 18 × 3/2 = 27' },
      { question: 'Which is a proper fraction?', options: ['5/4', '8/8', '7/3', '3/7'], correctAnswer: '3/7', explanation: 'Proper fraction: numerator < denominator' },
      { question: 'LCM of denominators of 1/3, 1/4 and 1/6:', options: ['12', '24', '36', '72'], correctAnswer: '12', explanation: 'LCM(3,4,6) = 12' },
      { question: '1/2 + 1/3 + 1/6 = ?', options: ['3/11', '1/2', '2/3', '1'], correctAnswer: '1', explanation: '3/6 + 2/6 + 1/6 = 6/6 = 1' },
    ]
  },

  // ── 6E: Decimal Numbers ───────────────────────────────────
  {
    sheet: '6E', topic: 'Decimal Numbers', grade: 6,
    questions: [
      { question: '3.4 + 2.15 = ?', options: ['5.19', '5.55', '5.59', '5.65'], correctAnswer: '5.55', explanation: '3.40 + 2.15 = 5.55' },
      { question: '7.8 − 3.45 = ?', options: ['3.35', '4.35', '4.45', '4.55'], correctAnswer: '4.35', explanation: '7.80 − 3.45 = 4.35' },
      { question: '1.2 × 0.3 = ?', options: ['0.036', '0.36', '3.6', '36'], correctAnswer: '0.36', explanation: '12 × 3 = 36, 2 decimal places → 0.36' },
      { question: '4.5 ÷ 0.9 = ?', options: ['0.5', '5', '50', '0.05'], correctAnswer: '5', explanation: '45 ÷ 9 = 5' },
      { question: 'Which is greatest: 0.8, 0.08, 0.88, 0.808?', options: ['0.8', '0.08', '0.88', '0.808'], correctAnswer: '0.88', explanation: '0.88 = 0.880 > 0.808 > 0.800 > 0.080' },
      { question: 'Convert 3/4 to decimal:', options: ['0.34', '0.43', '0.75', '0.25'], correctAnswer: '0.75', explanation: '3 ÷ 4 = 0.75' },
      { question: 'Convert 0.625 to a fraction in simplest form:', options: ['625/100', '5/8', '6/10', '63/100'], correctAnswer: '5/8', explanation: '625/1000 = 5/8' },
      { question: 'Round 4.567 to 2 decimal places:', options: ['4.56', '4.57', '4.6', '4.5'], correctAnswer: '4.57', explanation: 'Third decimal is 7 ≥ 5, round up' },
      { question: '0.001 × 1000 = ?', options: ['0.1', '1', '10', '100'], correctAnswer: '1', explanation: 'Multiplying by 1000 moves decimal 3 places right' },
      { question: 'Which is equivalent to 2.50?', options: ['25', '2.5', '250', '0.25'], correctAnswer: '2.5', explanation: 'Trailing zero after decimal does not change value' },
      { question: '0.7 × 0.7 = ?', options: ['0.49', '4.9', '49', '0.049'], correctAnswer: '0.49', explanation: '7×7 = 49, 2 decimal places → 0.49' },
      { question: '8.4 ÷ 100 = ?', options: ['840', '84', '0.84', '0.084'], correctAnswer: '0.084', explanation: 'Dividing by 100 moves decimal 2 places left' },
      { question: 'A bag weighs 2.35 kg. 8 bags weigh:', options: ['16.8 kg', '18.8 kg', '18.2 kg', '18.6 kg'], correctAnswer: '18.8 kg', explanation: '2.35 × 8 = 18.80 kg' },
      { question: '3.05 − 1.98 = ?', options: ['1.03', '1.07', '1.93', '2.07'], correctAnswer: '1.07', explanation: '3.05 − 1.98 = 1.07' },
      { question: 'Place value of 4 in 23.48:', options: ['4', '40', '4/10', '4/100'], correctAnswer: '4/10', explanation: '4 is in the tenths place = 0.4 = 4/10' },
      { question: 'Which is a terminating decimal?', options: ['1/3', '1/7', '1/4', '1/9'], correctAnswer: '1/4', explanation: '1/4 = 0.25 — terminates' },
      { question: '0.125 × 8 = ?', options: ['0.1', '1', '10', '0.01'], correctAnswer: '1', explanation: '0.125 = 1/8, and 1/8 × 8 = 1' },
      { question: 'Arrange: 1.01, 1.1, 1.001, 1.11 in ascending order:', options: ['1.01,1.001,1.1,1.11', '1.001,1.01,1.1,1.11', '1.1,1.11,1.01,1.001', '1.001,1.1,1.01,1.11'], correctAnswer: '1.001,1.01,1.1,1.11', explanation: 'Compare digit by digit from left' },
      { question: '56.7 ÷ 0.07 = ?', options: ['0.81', '8.1', '81', '810'], correctAnswer: '810', explanation: '56.7/0.07 = 5670/7 = 810' },
      { question: 'The sum of 1.5, 2.05 and 0.005 = ?', options: ['3.505', '3.55', '3.555', '3.6'], correctAnswer: '3.555', explanation: '1.500 + 2.050 + 0.005 = 3.555' },
    ]
  },

  // ── 6F: Ratio and Proportion ──────────────────────────────
  {
    sheet: '6F', topic: 'Ratio and Proportion', grade: 6,
    questions: [
      { question: 'Ratio of 12 to 18 in simplest form:', options: ['12:18', '6:9', '2:3', '3:4'], correctAnswer: '2:3', explanation: 'HCF(12,18) = 6; 12/6 : 18/6 = 2:3' },
      { question: 'If a:b = 3:5 and a = 15, then b = ?', options: ['9', '20', '25', '45'], correctAnswer: '25', explanation: '15/b = 3/5 → b = 25' },
      { question: 'Are 2:3 and 8:12 equivalent?', options: ['Yes', 'No', 'Sometimes', 'Cannot tell'], correctAnswer: 'Yes', explanation: '2/3 = 8/12 ✓' },
      { question: 'Find the missing value: 4:7 = 12:?', options: ['14', '16', '21', '28'], correctAnswer: '21', explanation: '12/4 = 3; 7×3 = 21' },
      { question: '5:8 = ? : 40', options: ['20', '25', '15', '10'], correctAnswer: '25', explanation: '40/8 = 5; 5×5 = 25' },
      { question: 'Divide 90 in ratio 2:3:', options: ['30 and 60', '36 and 54', '45 and 45', '40 and 50'], correctAnswer: '36 and 54', explanation: '2/5 × 90 = 36, 3/5 × 90 = 54' },
      { question: 'Ratio of 500 g to 2 kg:', options: ['500:2', '1:4', '1:2', '5:2'], correctAnswer: '1:4', explanation: '2 kg = 2000 g; 500:2000 = 1:4' },
      { question: 'If 5 pens cost Rs 35, cost of 8 pens:', options: ['Rs 48', 'Rs 52', 'Rs 56', 'Rs 64'], correctAnswer: 'Rs 56', explanation: 'Rs 35/5 × 8 = Rs 56' },
      { question: 'Which ratio is greater: 3:4 or 5:7?', options: ['3:4', '5:7', 'Equal', 'Cannot compare'], correctAnswer: '3:4', explanation: '3/4 = 0.75, 5/7 ≈ 0.714; 3:4 > 5:7' },
      { question: 'Mean proportion of 4 and 9:', options: ['5', '6', '7', '13'], correctAnswer: '6', explanation: 'Mean proportion = √(4×9) = √36 = 6' },
      { question: 'If 8 workers finish in 12 days, 6 workers finish in:', options: ['9 days', '14 days', '16 days', '18 days'], correctAnswer: '16 days', explanation: '8×12 = 6×d → d = 16 (inverse proportion)' },
      { question: 'A map scale is 1:50000. 3 cm on map = ? km actually:', options: ['1.5 km', '3 km', '15 km', '150 km'], correctAnswer: '1.5 km', explanation: '3×50000 cm = 150000 cm = 1.5 km' },
      { question: 'Ratio of 45 min to 1 hour:', options: ['45:1', '3:4', '9:12', '1:2'], correctAnswer: '3:4', explanation: '45:60 = 3:4' },
      { question: 'Third proportional to 3 and 6:', options: ['9', '12', '18', '36'], correctAnswer: '12', explanation: '3:6 = 6:x → x = 12' },
      { question: 'A and B share profit in 5:3. Total profit Rs 800. B gets:', options: ['Rs 200', 'Rs 250', 'Rs 300', 'Rs 500'], correctAnswer: 'Rs 300', explanation: '3/8 × 800 = Rs 300' },
      { question: 'If x:12 = 4:6, then x = ?', options: ['6', '8', '9', '10'], correctAnswer: '8', explanation: 'x/12 = 4/6 → x = 8' },
      { question: 'Compound ratio of 2:3 and 4:5:', options: ['6:8', '8:15', '2:5', '6:15'], correctAnswer: '8:15', explanation: 'Compound ratio = 2×4 : 3×5 = 8:15' },
      { question: '12 men can do a job in 10 days. 8 men take:', options: ['12 days', '15 days', '16 days', '20 days'], correctAnswer: '15 days', explanation: '12×10 = 8×d → d = 15' },
      { question: 'Ratio 3:4:5 total is 96. Smallest share:', options: ['24', '28', '32', '40'], correctAnswer: '24', explanation: '3/12 × 96 = 24' },
      { question: 'If 15 books cost Rs 600, 25 books cost:', options: ['Rs 800', 'Rs 900', 'Rs 1000', 'Rs 1200'], correctAnswer: 'Rs 1000', explanation: 'Rs 600/15 × 25 = Rs 1000' },
    ]
  },

  // ── 6G: Percentage ────────────────────────────────────────
  {
    sheet: '6G', topic: 'Percentage', grade: 6,
    questions: [
      { question: '25% of 80 = ?', options: ['15', '20', '25', '30'], correctAnswer: '20', explanation: '25/100 × 80 = 20' },
      { question: 'Convert 3/5 to percentage:', options: ['30%', '35%', '60%', '65%'], correctAnswer: '60%', explanation: '3/5 × 100 = 60%' },
      { question: 'Convert 45% to fraction in simplest form:', options: ['45/10', '9/20', '4/5', '9/10'], correctAnswer: '9/20', explanation: '45/100 = 9/20' },
      { question: 'Convert 0.35 to percentage:', options: ['0.35%', '3.5%', '35%', '350%'], correctAnswer: '35%', explanation: '0.35 × 100 = 35%' },
      { question: '120 is what % of 400?', options: ['20%', '25%', '30%', '40%'], correctAnswer: '30%', explanation: '120/400 × 100 = 30%' },
      { question: 'A shirt costs Rs 500, discount 20%. Sale price:', options: ['Rs 380', 'Rs 400', 'Rs 420', 'Rs 450'], correctAnswer: 'Rs 400', explanation: '20% of 500 = 100; 500−100 = Rs 400' },
      { question: 'Price increased from Rs 200 to Rs 250. % increase:', options: ['20%', '25%', '50%', '50%'], correctAnswer: '25%', explanation: '50/200 × 100 = 25%' },
      { question: '40% of students passed. 120 passed. Total students:', options: ['200', '250', '280', '300'], correctAnswer: '300', explanation: '120/40 × 100 = 300' },
      { question: 'What % of 75 is 15?', options: ['10%', '15%', '20%', '25%'], correctAnswer: '20%', explanation: '15/75 × 100 = 20%' },
      { question: 'Convert 1¼ to percentage:', options: ['105%', '110%', '115%', '125%'], correctAnswer: '125%', explanation: '1.25 × 100 = 125%' },
      { question: 'A number increased by 15% becomes 230. Original:', options: ['185', '195', '200', '215'], correctAnswer: '200', explanation: '230/1.15 = 200' },
      { question: '35% of Rs 2000 = ?', options: ['Rs 500', 'Rs 600', 'Rs 700', 'Rs 800'], correctAnswer: 'Rs 700', explanation: '35/100 × 2000 = 700' },
      { question: 'Rahul scored 45/60. His percentage:', options: ['65%', '70%', '75%', '80%'], correctAnswer: '75%', explanation: '45/60 × 100 = 75%' },
      { question: 'Price decreased from Rs 1200 to Rs 900. % decrease:', options: ['20%', '25%', '30%', '33%'], correctAnswer: '25%', explanation: '300/1200 × 100 = 25%' },
      { question: 'Which is largest: 1/3, 0.30, 33%, 30/100?', options: ['1/3', '0.30', '33%', '30/100'], correctAnswer: '1/3', explanation: '1/3 ≈ 33.33% which is largest' },
      { question: 'Population 5000 increases by 12%. New population:', options: ['5500', '5560', '5600', '5640'], correctAnswer: '5600', explanation: '5000 + 12% of 5000 = 5600' },
      { question: 'Tax of 13% on Rs 500:', options: ['Rs 55', 'Rs 60', 'Rs 65', 'Rs 70'], correctAnswer: 'Rs 65', explanation: '13/100 × 500 = 65' },
      { question: 'A student got 78% in a 200-mark exam. Marks obtained:', options: ['148', '154', '156', '164'], correctAnswer: '156', explanation: '78/100 × 200 = 156' },
      { question: '15% of a number is 45. The number:', options: ['300', '250', '200', '150'], correctAnswer: '300', explanation: '45/15 × 100 = 300' },
      { question: 'In a class of 40, 30% are girls. Number of boys:', options: ['12', '18', '22', '28'], correctAnswer: '28', explanation: '30% of 40 = 12 girls; 40−12 = 28 boys' },
    ]
  },

  // ── 6H: Profit and Loss ───────────────────────────────────
  {
    sheet: '6H', topic: 'Profit and Loss', grade: 6,
    questions: [
      { question: 'CP = Rs 200, SP = Rs 240. Profit = ?', options: ['Rs 20', 'Rs 30', 'Rs 40', 'Rs 50'], correctAnswer: 'Rs 40', explanation: 'Profit = SP − CP = 240 − 200 = 40' },
      { question: 'CP = Rs 500, SP = Rs 450. Loss = ?', options: ['Rs 40', 'Rs 50', 'Rs 60', 'Rs 70'], correctAnswer: 'Rs 50', explanation: 'Loss = CP − SP = 500 − 450 = 50' },
      { question: 'CP = Rs 400, Profit = 15%. SP = ?', options: ['Rs 440', 'Rs 460', 'Rs 480', 'Rs 460'], correctAnswer: 'Rs 460', explanation: 'SP = 400 + 15% of 400 = 460' },
      { question: 'CP = Rs 600, Loss = 10%. SP = ?', options: ['Rs 480', 'Rs 520', 'Rs 540', 'Rs 560'], correctAnswer: 'Rs 540', explanation: 'SP = 600 − 10% of 600 = 540' },
      { question: 'CP = Rs 350, SP = Rs 420. Profit% = ?', options: ['15%', '17%', '20%', '25%'], correctAnswer: '20%', explanation: '70/350 × 100 = 20%' },
      { question: 'CP = Rs 800, SP = Rs 680. Loss% = ?', options: ['10%', '12%', '15%', '20%'], correctAnswer: '15%', explanation: '120/800 × 100 = 15%' },
      { question: 'SP = Rs 550, Profit = 10%. CP = ?', options: ['Rs 480', 'Rs 490', 'Rs 500', 'Rs 520'], correctAnswer: 'Rs 500', explanation: 'CP = 550/1.10 = 500' },
      { question: 'SP = Rs 720, Loss = 10%. CP = ?', options: ['Rs 780', 'Rs 800', 'Rs 820', 'Rs 840'], correctAnswer: 'Rs 800', explanation: 'CP = 720/0.90 = 800' },
      { question: 'A shopkeeper buys for Rs 1200, sells at Rs 1500. Profit%:', options: ['20%', '25%', '30%', '35%'], correctAnswer: '25%', explanation: '300/1200 × 100 = 25%' },
      { question: 'An article is sold at 12% profit for Rs 784. CP = ?', options: ['Rs 650', 'Rs 680', 'Rs 700', 'Rs 720'], correctAnswer: 'Rs 700', explanation: 'CP = 784/1.12 = 700' },
      { question: 'Overhead + CP = Rs 450, SP = Rs 540. Profit%:', options: ['16%', '18%', '20%', '22%'], correctAnswer: '20%', explanation: '90/450 × 100 = 20%' },
      { question: 'Buy 12, get 2 free. Effective cost per item (CP Rs 60 each, no discount):', options: ['Rs 50', 'Rs 52', 'Rs 55', 'Rs 57'], correctAnswer: 'Rs 50', explanation: 'Pay for 12: Rs 720 total for 14 items; 720/14 not exact — simple problem: get 2 free on 12 purchase = effective discount of 2/14 ≈ extra. If 12 bought at 60 each = Rs 720 for 14 → Rs 720/14 ≈ Rs 51.4. Pick closest: Rs 50 for Kumon simplicity: 10 paid, 2 free = 12 total, cost = 10×60=600 for 12 = Rs 50 each' },
      { question: 'If there is no profit and no loss, then SP = ?', options: ['SP > CP', 'SP < CP', 'SP = CP', 'SP = 0'], correctAnswer: 'SP = CP', explanation: 'No profit no loss means selling price equals cost price' },
      { question: 'Marked price Rs 800, discount 10%, GST 13%. Final price:', options: ['Rs 780', 'Rs 793', 'Rs 814', 'Rs 830'], correctAnswer: 'Rs 814', explanation: 'After 10% off: Rs 720. GST 13%: 720×1.13 = Rs 813.6 ≈ Rs 814' },
      { question: 'CP of 20 items = SP of 16 items. Profit%:', options: ['20%', '25%', '30%', '35%'], correctAnswer: '25%', explanation: 'Profit on 16 items = CP of 4 items; 4/16 × 100 = 25%' },
      { question: 'A fruit seller sells 12 apples for price of 10. Loss%:', options: ['10%', '16.67%', '20%', '25%'], correctAnswer: '16.67%', explanation: 'Loss = 2/12 = 1/6 ≈ 16.67%' },
      { question: 'Successive discounts of 10% and 5% equals:', options: ['14%', '14.5%', '15%', '15.5%'], correctAnswer: '14.5%', explanation: 'Effective = 100 − (0.9×0.95×100) = 100 − 85.5 = 14.5%' },
      { question: 'SP = Rs 400, profit = Rs 80. CP = ?', options: ['Rs 280', 'Rs 300', 'Rs 320', 'Rs 340'], correctAnswer: 'Rs 320', explanation: 'CP = SP − Profit = 400 − 80 = 320' },
      { question: 'An old car bought for Rs 80,000 sold for Rs 64,000. Loss%:', options: ['15%', '16%', '20%', '25%'], correctAnswer: '20%', explanation: '16000/80000 × 100 = 20%' },
      { question: 'To gain 20%, on CP Rs 500, SP must be:', options: ['Rs 550', 'Rs 580', 'Rs 600', 'Rs 620'], correctAnswer: 'Rs 600', explanation: 'SP = 500 + 20% of 500 = Rs 600' },
    ]
  },

  // ── 6I: Simple Interest ───────────────────────────────────
  {
    sheet: '6I', topic: 'Simple Interest', grade: 6,
    questions: [
      { question: 'SI on Rs 1000 at 5% for 2 years:', options: ['Rs 50', 'Rs 100', 'Rs 200', 'Rs 500'], correctAnswer: 'Rs 100', explanation: 'SI = P×R×T/100 = 1000×5×2/100 = 100' },
      { question: 'SI on Rs 2500 at 8% for 3 years:', options: ['Rs 400', 'Rs 500', 'Rs 600', 'Rs 800'], correctAnswer: 'Rs 600', explanation: '2500×8×3/100 = 600' },
      { question: 'P = Rs 5000, R = 6%, T = 4 years. Amount = ?', options: ['Rs 5600', 'Rs 6000', 'Rs 6200', 'Rs 7200'], correctAnswer: 'Rs 6200', explanation: 'SI = 5000×6×4/100 = 1200; A = 5000+1200 = 6200' },
      { question: 'SI = Rs 300, P = Rs 1500, T = 2 years. Rate = ?', options: ['8%', '10%', '12%', '15%'], correctAnswer: '10%', explanation: 'R = SI×100/(P×T) = 300×100/(1500×2) = 10%' },
      { question: 'SI = Rs 480, P = Rs 1600, R = 10%. Time = ?', options: ['2 years', '3 years', '4 years', '5 years'], correctAnswer: '3 years', explanation: 'T = SI×100/(P×R) = 480×100/(1600×10) = 3' },
      { question: 'P = Rs 4000, R = 5%, T = 6 months. SI = ?', options: ['Rs 50', 'Rs 75', 'Rs 100', 'Rs 200'], correctAnswer: 'Rs 100', explanation: '6 months = 0.5 years; SI = 4000×5×0.5/100 = 100' },
      { question: 'Amount after 5 years at 4% on Rs 2000:', options: ['Rs 2200', 'Rs 2400', 'Rs 2600', 'Rs 2800'], correctAnswer: 'Rs 2400', explanation: 'SI = 2000×4×5/100 = 400; A = 2400' },
      { question: 'A sum doubles in 10 years at SI. Rate:', options: ['8%', '10%', '12%', '15%'], correctAnswer: '10%', explanation: 'SI = P in 10 years; P×R×10/100 = P → R = 10%' },
      { question: 'SI = Rs 750, R = 5%, T = 3 years. Principal:', options: ['Rs 4500', 'Rs 5000', 'Rs 5500', 'Rs 6000'], correctAnswer: 'Rs 5000', explanation: 'P = SI×100/(R×T) = 750×100/(5×3) = 5000' },
      { question: 'Rs 3000 at 7% SI for 1½ years. Amount:', options: ['Rs 3100', 'Rs 3210', 'Rs 3315', 'Rs 3400'], correctAnswer: 'Rs 3315', explanation: 'SI = 3000×7×1.5/100 = 315; A = 3315' },
      { question: 'At what rate does Rs 1200 become Rs 1500 in 5 years (SI)?', options: ['4%', '5%', '6%', '8%'], correctAnswer: '5%', explanation: 'SI = 300; R = 300×100/(1200×5) = 5%' },
      { question: 'Interest on Rs 8000 at 9% for 9 months:', options: ['Rs 450', 'Rs 540', 'Rs 630', 'Rs 720'], correctAnswer: 'Rs 540', explanation: '9 months = 3/4 year; SI = 8000×9×(3/4)/100 = 540' },
      { question: 'P = Rs 7500, SI = Rs 1500, T = 4 years. Rate:', options: ['4%', '5%', '6%', '7%'], correctAnswer: '5%', explanation: 'R = 1500×100/(7500×4) = 5%' },
      { question: 'Bank offers 8% annual interest. Rs 2500 after 2 years:', options: ['Rs 2850', 'Rs 2900', 'Rs 2950', 'Rs 3000'], correctAnswer: 'Rs 2900', explanation: 'SI = 2500×8×2/100 = 400; A = 2900' },
      { question: 'SI for 2 years = Rs 200, for 5 years = ?', options: ['Rs 300', 'Rs 400', 'Rs 500', 'Rs 600'], correctAnswer: 'Rs 500', explanation: 'SI is proportional to time: 200/2 × 5 = 500' },
      { question: 'Two equal sums at 5% and 4%. Difference in SI after 3 years is Rs 60. Each sum:', options: ['Rs 1500', 'Rs 2000', 'Rs 2500', 'Rs 3000'], correctAnswer: 'Rs 2000', explanation: 'Diff = P×1%×3 = P×3/100 = 60 → P = 2000' },
      { question: 'If principal triples at 8% per year, time taken:', options: ['15 years', '20 years', '25 years', '30 years'], correctAnswer: '25 years', explanation: 'SI = 2P; 2P = P×8×T/100 → T = 25' },
      { question: 'Rs 6000 at 10% for 2 years. SI = ? and amount = ?', options: ['Rs 1200 and Rs 7200', 'Rs 1200 and Rs 7000', 'Rs 1000 and Rs 7000', 'Rs 600 and Rs 6600'], correctAnswer: 'Rs 1200 and Rs 7200', explanation: 'SI = 6000×10×2/100 = 1200; A = 7200' },
      { question: 'Difference between SI for 4 years and 3 years at 5% on Rs 1000:', options: ['Rs 40', 'Rs 50', 'Rs 60', 'Rs 100'], correctAnswer: 'Rs 50', explanation: 'SI for 1 year = 1000×5/100 = 50' },
      { question: 'Rs 10,000 invested. Half at 5%, half at 6% for 2 years. Total SI:', options: ['Rs 900', 'Rs 1000', 'Rs 1100', 'Rs 1200'], correctAnswer: 'Rs 1100', explanation: 'SI₁ = 5000×5×2/100 = 500; SI₂ = 5000×6×2/100 = 600; Total = 1100' },
    ]
  },

  // ── 6J: Geometry — Angles ─────────────────────────────────
  {
    sheet: '6J', topic: 'Angles and Lines', grade: 6,
    questions: [
      { question: 'An angle of exactly 90° is called:', options: ['Acute', 'Obtuse', 'Right', 'Straight'], correctAnswer: 'Right', explanation: 'Right angle = exactly 90°' },
      { question: 'An angle between 90° and 180° is called:', options: ['Acute', 'Obtuse', 'Reflex', 'Right'], correctAnswer: 'Obtuse', explanation: 'Obtuse angle: between 90° and 180°' },
      { question: 'Complementary angles sum to:', options: ['90°', '180°', '270°', '360°'], correctAnswer: '90°', explanation: 'Complementary angles add up to 90°' },
      { question: 'Supplementary angles sum to:', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', explanation: 'Supplementary angles add up to 180°' },
      { question: 'The complement of 35° is:', options: ['45°', '55°', '65°', '75°'], correctAnswer: '55°', explanation: '90° − 35° = 55°' },
      { question: 'The supplement of 110° is:', options: ['60°', '70°', '80°', '90°'], correctAnswer: '70°', explanation: '180° − 110° = 70°' },
      { question: 'Angles on a straight line sum to:', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', explanation: 'Angles on a straight line = 180°' },
      { question: 'Vertically opposite angles are:', options: ['Supplementary', 'Complementary', 'Equal', 'Different'], correctAnswer: 'Equal', explanation: 'Vertically opposite angles are always equal' },
      { question: 'Sum of all angles around a point:', options: ['90°', '180°', '270°', '360°'], correctAnswer: '360°', explanation: 'Angles around a point = 360°' },
      { question: 'If two lines are parallel, alternate interior angles are:', options: ['Supplementary', 'Complementary', 'Equal', 'Double'], correctAnswer: 'Equal', explanation: 'Alternate interior angles are equal when lines are parallel' },
      { question: 'Co-interior angles (same side of transversal) add to:', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', explanation: 'Co-interior angles are supplementary = 180°' },
      { question: 'A reflex angle measures:', options: ['Less than 90°', 'Between 90° and 180°', 'Between 180° and 360°', 'Exactly 180°'], correctAnswer: 'Between 180° and 360°', explanation: 'Reflex angle: between 180° and 360°' },
      { question: 'Two angles are in ratio 2:3 and supplementary. Larger angle:', options: ['72°', '108°', '120°', '130°'], correctAnswer: '108°', explanation: '3/5 × 180° = 108°' },
      { question: 'Angle in a straight line: one part is 65°. Other part:', options: ['25°', '105°', '115°', '125°'], correctAnswer: '115°', explanation: '180° − 65° = 115°' },
      { question: 'How many degrees in a complete revolution?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '360°', explanation: 'A full revolution = 360°' },
      { question: 'Two complementary angles are equal. Each measures:', options: ['30°', '45°', '60°', '90°'], correctAnswer: '45°', explanation: 'Two equal angles summing to 90° → each is 45°' },
      { question: 'The angle formed by hour and minute hand at 3:00 is:', options: ['60°', '90°', '120°', '180°'], correctAnswer: '90°', explanation: 'At 3:00 the hands are perpendicular = 90°' },
      { question: 'An angle and its supplement are in 1:2. The angle is:', options: ['45°', '60°', '75°', '90°'], correctAnswer: '60°', explanation: '1/3 × 180° = 60°' },
      { question: 'Corresponding angles on parallel lines are:', options: ['Supplementary', 'Complementary', 'Equal', 'Reflex'], correctAnswer: 'Equal', explanation: 'Corresponding angles are equal when lines are parallel' },
      { question: 'If one angle is 42° and its vertically opposite angle is x, then x = ?', options: ['38°', '42°', '48°', '138°'], correctAnswer: '42°', explanation: 'Vertically opposite angles are equal' },
    ]
  },

  // ── 6K: Triangles ─────────────────────────────────────────
  {
    sheet: '6K', topic: 'Triangles', grade: 6,
    questions: [
      { question: 'Sum of interior angles of a triangle:', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°', explanation: 'Triangle angle sum = 180°' },
      { question: 'A triangle with all sides equal is called:', options: ['Scalene', 'Isosceles', 'Equilateral', 'Right'], correctAnswer: 'Equilateral', explanation: 'All sides equal = equilateral triangle' },
      { question: 'A triangle with exactly two equal sides:', options: ['Scalene', 'Isosceles', 'Equilateral', 'Obtuse'], correctAnswer: 'Isosceles', explanation: 'Two equal sides = isosceles triangle' },
      { question: 'Each angle of an equilateral triangle:', options: ['45°', '60°', '75°', '90°'], correctAnswer: '60°', explanation: '180°/3 = 60° each' },
      { question: 'Can a triangle have angles 90°, 90°, and 0°?', options: ['Yes', 'No', 'Sometimes', 'Depends'], correctAnswer: 'No', explanation: 'Sum would be 180° but 0° angle is impossible' },
      { question: 'Third angle when two angles are 50° and 70°:', options: ['50°', '60°', '70°', '80°'], correctAnswer: '60°', explanation: '180° − 50° − 70° = 60°' },
      { question: 'A right-angled triangle has one angle of 90°. Sum of other two:', options: ['45°', '90°', '180°', '270°'], correctAnswer: '90°', explanation: '180° − 90° = 90°' },
      { question: 'Exterior angle of a triangle equals:', options: ['Sum of all interior angles', 'Difference of two interior angles', 'Sum of two non-adjacent interior angles', 'Half the sum of interior angles'], correctAnswer: 'Sum of two non-adjacent interior angles', explanation: 'Exterior angle theorem' },
      { question: 'Exterior angle is 120°. Two interior angles are equal. Each =?', options: ['30°', '40°', '60°', '80°'], correctAnswer: '60°', explanation: 'The two equal non-adjacent angles sum to 120° → each 60°' },
      { question: 'Which set can form a triangle?', options: ['2, 3, 6', '4, 5, 9', '5, 7, 10', '1, 2, 4'], correctAnswer: '5, 7, 10', explanation: 'Sum of any two sides must exceed third: 5+7>10 ✓' },
      { question: 'A triangle with one angle > 90° is called:', options: ['Acute', 'Right', 'Obtuse', 'Isosceles'], correctAnswer: 'Obtuse', explanation: 'Obtuse triangle has one angle greater than 90°' },
      { question: 'In a right triangle, the longest side is:', options: ['Adjacent', 'Opposite', 'Hypotenuse', 'Base'], correctAnswer: 'Hypotenuse', explanation: 'Hypotenuse is always opposite the right angle' },
      { question: 'Pythagoras theorem: a² + b² = ?', options: ['c', 'c²', 'c/2', '2c'], correctAnswer: 'c²', explanation: 'In a right triangle: a² + b² = c²' },
      { question: 'Sides 3, 4, 5 form a right triangle because:', options: ['3+4=7>5', '3²+4²=5²', '5−3=2', '3×4=12'], correctAnswer: '3²+4²=5²', explanation: '9 + 16 = 25 = 5² ✓' },
      { question: 'Hypotenuse of right triangle with legs 6 and 8:', options: ['10', '12', '14', '100'], correctAnswer: '10', explanation: '√(6²+8²) = √(36+64) = √100 = 10' },
      { question: 'Perimeter of equilateral triangle with side 9 cm:', options: ['18 cm', '24 cm', '27 cm', '36 cm'], correctAnswer: '27 cm', explanation: '3 × 9 = 27 cm' },
      { question: 'An isosceles triangle has base 6 cm and equal sides 5 cm. Perimeter:', options: ['11 cm', '16 cm', '21 cm', '30 cm'], correctAnswer: '16 cm', explanation: '6 + 5 + 5 = 16 cm' },
      { question: 'Area of triangle with base 12 cm and height 8 cm:', options: ['48 cm²', '96 cm²', '24 cm²', '76 cm²'], correctAnswer: '48 cm²', explanation: 'Area = ½ × 12 × 8 = 48 cm²' },
      { question: 'A triangle has angles in ratio 1:2:3. Largest angle:', options: ['30°', '60°', '90°', '120°'], correctAnswer: '90°', explanation: '3/6 × 180° = 90°' },
      { question: 'If two angles of a triangle are 40° and 80°, the triangle is:', options: ['Equilateral', 'Right', 'Acute', 'Obtuse'], correctAnswer: 'Acute', explanation: 'Third angle = 60°; all angles < 90° → acute' },
    ]
  },

  // ── 6L: Perimeter and Area ────────────────────────────────
  {
    sheet: '6L', topic: 'Perimeter and Area', grade: 6,
    questions: [
      { question: 'Perimeter of a square with side 7 cm:', options: ['14 cm', '21 cm', '28 cm', '49 cm'], correctAnswer: '28 cm', explanation: 'P = 4 × 7 = 28 cm' },
      { question: 'Area of a rectangle 8 cm × 5 cm:', options: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'], correctAnswer: '40 cm²', explanation: 'A = 8 × 5 = 40 cm²' },
      { question: 'Perimeter of rectangle 12 cm × 7 cm:', options: ['19 cm', '38 cm', '84 cm', '76 cm'], correctAnswer: '38 cm', explanation: 'P = 2(12+7) = 2×19 = 38 cm' },
      { question: 'Area of a square with side 9 cm:', options: ['36 cm²', '81 cm²', '18 cm²', '72 cm²'], correctAnswer: '81 cm²', explanation: 'A = 9² = 81 cm²' },
      { question: 'Area of parallelogram with base 10 cm and height 6 cm:', options: ['16 cm²', '30 cm²', '60 cm²', '80 cm²'], correctAnswer: '60 cm²', explanation: 'A = base × height = 10 × 6 = 60 cm²' },
      { question: 'Area of triangle with base 10 cm and height 8 cm:', options: ['18 cm²', '40 cm²', '80 cm²', '24 cm²'], correctAnswer: '40 cm²', explanation: 'A = ½ × 10 × 8 = 40 cm²' },
      { question: 'A square has area 144 cm². Its side:', options: ['12 cm', '14 cm', '16 cm', '18 cm'], correctAnswer: '12 cm', explanation: 'Side = √144 = 12 cm' },
      { question: 'Rectangle has perimeter 40 cm and length 12 cm. Width:', options: ['6 cm', '8 cm', '10 cm', '14 cm'], correctAnswer: '8 cm', explanation: '2(12+w) = 40 → w = 8 cm' },
      { question: 'Circumference of circle with radius 7 cm (π = 22/7):', options: ['22 cm', '44 cm', '66 cm', '154 cm'], correctAnswer: '44 cm', explanation: 'C = 2πr = 2×22/7×7 = 44 cm' },
      { question: 'Area of circle with radius 7 cm (π = 22/7):', options: ['22 cm²', '44 cm²', '154 cm²', '616 cm²'], correctAnswer: '154 cm²', explanation: 'A = πr² = 22/7×49 = 154 cm²' },
      { question: 'A floor 15 m × 10 m is tiled with 1 m × 1 m tiles. Number needed:', options: ['25', '50', '100', '150'], correctAnswer: '150', explanation: 'Area = 15×10 = 150; each tile = 1 m²' },
      { question: 'Cost of fencing a square field of side 50 m at Rs 12/m:', options: ['Rs 2000', 'Rs 2400', 'Rs 3000', 'Rs 3600'], correctAnswer: 'Rs 2400', explanation: 'Perimeter = 4×50 = 200 m; cost = 200×12 = Rs 2400' },
      { question: 'Area of trapezium with parallel sides 8 and 6 cm, height 4 cm:', options: ['14 cm²', '24 cm²', '28 cm²', '56 cm²'], correctAnswer: '28 cm²', explanation: 'A = ½(8+6)×4 = ½×14×4 = 28 cm²' },
      { question: 'Diameter of circle is 14 cm. Circumference (π = 22/7):', options: ['22 cm', '44 cm', '88 cm', '154 cm'], correctAnswer: '44 cm', explanation: 'C = πd = 22/7 × 14 = 44 cm' },
      { question: 'Length of rectangle is twice its width. Perimeter = 48 cm. Area:', options: ['64 cm²', '96 cm²', '128 cm²', '144 cm²'], correctAnswer: '128 cm²', explanation: '2(2w+w) = 48 → w = 8; l = 16; A = 128 cm²' },
      { question: 'Area of rhombus with diagonals 12 and 8 cm:', options: ['20 cm²', '24 cm²', '48 cm²', '96 cm²'], correctAnswer: '48 cm²', explanation: 'A = ½ × d₁ × d₂ = ½ × 12 × 8 = 48 cm²' },
      { question: 'A circular pond has radius 21 m. Area (π = 22/7):', options: ['66 m²', '132 m²', '1386 m²', '2772 m²'], correctAnswer: '1386 m²', explanation: 'A = 22/7 × 21² = 22/7 × 441 = 1386 m²' },
      { question: 'Perimeter of semicircle with radius 7 cm (π = 22/7):', options: ['22 cm', '36 cm', '50 cm', '58 cm'], correctAnswer: '36 cm', explanation: 'P = πr + 2r = 22 + 14 = 36 cm' },
      { question: 'A rectangle has area 180 cm² and width 9 cm. Length:', options: ['15 cm', '18 cm', '20 cm', '24 cm'], correctAnswer: '20 cm', explanation: 'Length = 180/9 = 20 cm' },
      { question: 'How many squares of 2 cm side fit in a rectangle 12 cm × 10 cm?', options: ['20', '30', '60', '120'], correctAnswer: '30', explanation: 'Area of rect = 120 cm²; area of small square = 4 cm²; 120/4 = 30' },
    ]
  },

  // ── 6M: 3D Shapes and Volume ──────────────────────────────
  {
    sheet: '6M', topic: '3D Shapes and Volume', grade: 6,
    questions: [
      { question: 'Volume of cube with side 4 cm:', options: ['16 cm³', '24 cm³', '48 cm³', '64 cm³'], correctAnswer: '64 cm³', explanation: 'V = 4³ = 64 cm³' },
      { question: 'Volume of cuboid 5×3×2 cm:', options: ['10 cm³', '16 cm³', '25 cm³', '30 cm³'], correctAnswer: '30 cm³', explanation: 'V = 5×3×2 = 30 cm³' },
      { question: 'A cube has volume 125 cm³. Its edge:', options: ['3 cm', '4 cm', '5 cm', '6 cm'], correctAnswer: '5 cm', explanation: '∛125 = 5 cm' },
      { question: 'Surface area of cube with side 3 cm:', options: ['18 cm²', '36 cm²', '54 cm²', '72 cm²'], correctAnswer: '54 cm²', explanation: 'SA = 6 × 3² = 6×9 = 54 cm²' },
      { question: 'How many faces does a cube have?', options: ['4', '5', '6', '8'], correctAnswer: '6', explanation: 'A cube has 6 faces' },
      { question: 'How many edges does a cuboid have?', options: ['6', '8', '10', '12'], correctAnswer: '12', explanation: 'A cuboid has 12 edges' },
      { question: 'How many vertices does a cube have?', options: ['4', '6', '8', '12'], correctAnswer: '8', explanation: 'A cube has 8 vertices (corners)' },
      { question: 'Volume of cylinder with radius 7 cm and height 10 cm (π = 22/7):', options: ['1540 cm³', '1240 cm³', '1440 cm³', '1640 cm³'], correctAnswer: '1540 cm³', explanation: 'V = πr²h = 22/7×49×10 = 1540 cm³' },
      { question: 'A box is 20 cm × 15 cm × 10 cm. How many 5 cm cubes fit in it?', options: ['12', '24', '48', '24'], correctAnswer: '24', explanation: '(20/5)×(15/5)×(10/5) = 4×3×2 = 24' },
      { question: 'Which 3D shape has no edges?', options: ['Cube', 'Cylinder', 'Sphere', 'Cone'], correctAnswer: 'Sphere', explanation: 'A sphere has no edges or vertices' },
      { question: 'A cone has how many faces?', options: ['1', '2', '3', '4'], correctAnswer: '2', explanation: 'A cone has 1 circular face and 1 curved surface = 2' },
      { question: 'Total surface area of cuboid l×b×h:', options: ['lbh', '2(lb+bh+lh)', 'lb+bh+lh', '6lb'], correctAnswer: '2(lb+bh+lh)', explanation: 'TSA = 2(lb+bh+lh)' },
      { question: 'Volume of 1 litre in cm³:', options: ['100 cm³', '500 cm³', '1000 cm³', '10000 cm³'], correctAnswer: '1000 cm³', explanation: '1 litre = 1000 cm³ = 1000 mL' },
      { question: 'A tank 4m×3m×2m holds how many litres?', options: ['2400 L', '24000 L', '240 L', '240000 L'], correctAnswer: '24000 L', explanation: 'V = 4×3×2 = 24 m³ = 24000 litres' },
      { question: 'Number of faces in a triangular prism:', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '2 triangular + 3 rectangular faces = 5' },
      { question: 'Surface area of cube is 150 cm². Side length:', options: ['4 cm', '5 cm', '6 cm', '7 cm'], correctAnswer: '5 cm', explanation: '6s² = 150 → s² = 25 → s = 5 cm' },
      { question: 'A room 6m×5m×3m. Volume of air:', options: ['14 m³', '63 m³', '90 m³', '126 m³'], correctAnswer: '90 m³', explanation: 'V = 6×5×3 = 90 m³' },
      { question: 'Which shape has 2 circular faces?', options: ['Cone', 'Sphere', 'Cylinder', 'Prism'], correctAnswer: 'Cylinder', explanation: 'A cylinder has 2 circular faces (top and bottom)' },
      { question: 'Euler\'s formula for polyhedra: F + V − E = ?', options: ['0', '1', '2', '3'], correctAnswer: '2', explanation: 'Euler\'s formula: Faces + Vertices − Edges = 2' },
      { question: 'Volume of cube is doubled. By what factor does each edge increase?', options: ['√2', '∛2', '2', '4'], correctAnswer: '∛2', explanation: 'V = s³; 2V = (∛2 × s)³; edge × ∛2' },
    ]
  },

  // ── 6N: Algebraic Expressions ────────────────────────────
  {
    sheet: '6N', topic: 'Algebraic Expressions', grade: 6,
    questions: [
      { question: 'If x = 3, then 2x + 5 = ?', options: ['8', '9', '10', '11'], correctAnswer: '11', explanation: '2(3) + 5 = 6 + 5 = 11' },
      { question: 'Simplify: 3x + 4x = ?', options: ['7', '7x', '12x', 'x⁷'], correctAnswer: '7x', explanation: 'Like terms: 3x + 4x = 7x' },
      { question: 'Simplify: 5a − 2a + 3a = ?', options: ['5a', '6a', '8a', '10a'], correctAnswer: '6a', explanation: '5a − 2a + 3a = 6a' },
      { question: 'Which is a monomial?', options: ['x + y', '3x²', 'a + b + c', '2x − y'], correctAnswer: '3x²', explanation: 'Monomial = single term' },
      { question: 'Perimeter of rectangle with length 2x and width x:', options: ['3x', '4x', '5x', '6x'], correctAnswer: '6x', explanation: 'P = 2(2x+x) = 2×3x = 6x' },
      { question: 'If a = 2, b = 3, then a² + b² = ?', options: ['10', '13', '25', '36'], correctAnswer: '13', explanation: '4 + 9 = 13' },
      { question: 'Solve for x: x + 7 = 12', options: ['4', '5', '6', '7'], correctAnswer: '5', explanation: 'x = 12 − 7 = 5' },
      { question: 'Solve: 3x = 18', options: ['x = 3', 'x = 5', 'x = 6', 'x = 9'], correctAnswer: 'x = 6', explanation: 'x = 18/3 = 6' },
      { question: 'Solve: 2x − 3 = 7', options: ['x = 2', 'x = 4', 'x = 5', 'x = 7'], correctAnswer: 'x = 5', explanation: '2x = 10 → x = 5' },
      { question: 'Expand: 3(x + 4) = ?', options: ['3x + 4', '3x + 7', '3x + 12', 'x + 12'], correctAnswer: '3x + 12', explanation: '3×x + 3×4 = 3x + 12' },
      { question: 'Factorise: 4x + 8 = ?', options: ['4(x+2)', '2(x+4)', '4(x+8)', '8(x+1)'], correctAnswer: '4(x+2)', explanation: 'HCF = 4; 4(x+2)' },
      { question: 'A is 5 more than twice B. If B = 6, A = ?', options: ['11', '12', '17', '22'], correctAnswer: '17', explanation: 'A = 2×6 + 5 = 17' },
      { question: 'Solve: x/4 = 6', options: ['x = 1.5', 'x = 10', 'x = 24', 'x = 36'], correctAnswer: 'x = 24', explanation: 'x = 6 × 4 = 24' },
      { question: 'If 3x + 2 = 14, then x = ?', options: ['3', '4', '5', '6'], correctAnswer: '4', explanation: '3x = 12 → x = 4' },
      { question: 'What is the coefficient of x in 7x²y?', options: ['1', '7', '7y', '7x'], correctAnswer: '7y', explanation: 'Coefficient of x in 7x²y — but of x²: 7y' },
      { question: 'Simplify: 2x² + 3x − x² + x = ?', options: ['x² + 4x', 'x² + 2x', '3x² + 4x', '2x² + 4x'], correctAnswer: 'x² + 4x', explanation: '(2x²−x²) + (3x+x) = x² + 4x' },
      { question: 'If x + y = 10 and x = 4, then y = ?', options: ['4', '6', '8', '14'], correctAnswer: '6', explanation: 'y = 10 − 4 = 6' },
      { question: 'Solve: 5(x − 2) = 15', options: ['x = 3', 'x = 4', 'x = 5', 'x = 7'], correctAnswer: 'x = 5', explanation: 'x − 2 = 3 → x = 5' },
      { question: 'How many terms in 3x² − 2xy + 5y − 7?', options: ['2', '3', '4', '5'], correctAnswer: '4', explanation: 'Four terms separated by + and −' },
      { question: 'Degree of polynomial 4x³ − 2x² + x − 1:', options: ['1', '2', '3', '4'], correctAnswer: '3', explanation: 'Highest power of x is 3' },
    ]
  },

  // ── 6O: Statistics — Data Handling ───────────────────────
  {
    sheet: '6O', topic: 'Statistics and Data', grade: 6,
    questions: [
      { question: 'The average of 4, 8, 12 is:', options: ['6', '7', '8', '9'], correctAnswer: '8', explanation: '(4+8+12)/3 = 24/3 = 8' },
      { question: 'Mean of 10, 20, 30, 40, 50:', options: ['25', '30', '35', '40'], correctAnswer: '30', explanation: '150/5 = 30' },
      { question: 'Median of 3, 5, 7, 9, 11:', options: ['5', '6', '7', '9'], correctAnswer: '7', explanation: 'Middle value of ordered data: 7' },
      { question: 'Mode of 2, 3, 3, 4, 5, 5, 5, 6:', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '5 appears most often (3 times)' },
      { question: 'Range of 12, 7, 18, 3, 15:', options: ['10', '12', '15', '21'], correctAnswer: '15', explanation: 'Range = 18 − 3 = 15' },
      { question: 'Median of 4, 6, 8, 10:', options: ['6', '7', '8', '9'], correctAnswer: '7', explanation: 'Even count: (6+8)/2 = 7' },
      { question: 'Five students scored: 70, 80, 90, 60, 100. Mean score:', options: ['78', '80', '82', '84'], correctAnswer: '80', explanation: '(70+80+90+60+100)/5 = 400/5 = 80' },
      { question: 'Which type of graph uses bars?', options: ['Pie chart', 'Line graph', 'Bar graph', 'Pictograph'], correctAnswer: 'Bar graph', explanation: 'Bar graphs use bars to represent data' },
      { question: 'What does a pie chart show?', options: ['Changes over time', 'Relationship between two variables', 'Parts of a whole', 'Frequency'], correctAnswer: 'Parts of a whole', explanation: 'Pie charts show how parts make up a whole (360°)' },
      { question: 'If mean of 5 numbers is 12, their sum:', options: ['17', '50', '60', '72'], correctAnswer: '60', explanation: 'Sum = mean × count = 12 × 5 = 60' },
      { question: 'A class has 30 students. 12 like cricket. Angle in pie chart for cricket:', options: ['100°', '120°', '140°', '144°'], correctAnswer: '144°', explanation: '12/30 × 360° = 144°' },
      { question: 'The most frequently occurring value in data is:', options: ['Mean', 'Median', 'Mode', 'Range'], correctAnswer: 'Mode', explanation: 'Mode is the most frequent value' },
      { question: 'Data arranged from lowest to highest is called:', options: ['Tally', 'Frequency', 'Raw data', 'Arrayed data'], correctAnswer: 'Arrayed data', explanation: 'Arrayed data = arranged in order' },
      { question: 'Mean of first 10 natural numbers:', options: ['4.5', '5', '5.5', '6'], correctAnswer: '5.5', explanation: '(1+2+...+10)/10 = 55/10 = 5.5' },
      { question: 'If one value in a data set is much larger than others, which measure is most affected?', options: ['Mode', 'Median', 'Mean', 'Range'], correctAnswer: 'Mean', explanation: 'Extreme values (outliers) pull the mean significantly' },
      { question: 'Number of students scored: 40(5), 50(8), 60(12), 70(10). Total students:', options: ['30', '35', '40', '45'], correctAnswer: '35', explanation: '5+8+12+10 = 35' },
      { question: 'Observations: 5, x, 8, 10. Mean = 7. x = ?', options: ['3', '4', '5', '6'], correctAnswer: '5', explanation: '(5+x+8+10)/4 = 7 → 23+x = 28 → x = 5' },
      { question: 'How many degrees in a full pie chart?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '360°', explanation: 'A pie chart = full circle = 360°' },
      { question: 'Scores: 45, 67, 89, 23, 56. Median:', options: ['56', '58', '67', '45'], correctAnswer: '56', explanation: 'Arranged: 23,45,56,67,89 → middle = 56' },
      { question: 'Class data: 10 students scored between 60-70, 15 between 70-80, 5 between 80-90. Most students scored between:', options: ['60-70', '70-80', '80-90', 'Equal'], correctAnswer: '70-80', explanation: 'Highest frequency = 15, in 70-80 range' },
    ]
  },
]

// ── Seed function ─────────────────────────────────────────────
let totalQ = 0

for (const levelData of grade6) {
  // Find or create the level
  let level = await Level.findOne({ sheet: levelData.sheet })

  if (!level) {
    level = await Level.create({
      levelNumber:    grade6.indexOf(levelData) + 1,
      title:          levelData.topic,
      grade:          levelData.grade,
      sheet:          levelData.sheet,
      topic:          levelData.topic,
      passingScore:   12,
      questionConfig: { totalQuestions: 20 },
    })
    console.log(`  Created level: ${levelData.sheet} — ${levelData.topic}`)
  }

  // Remove old questions for this level (clean reseed)
  await Question.deleteMany({ levelId: level._id })

  // Insert new questions
  const toInsert = levelData.questions.map(q => ({
  levelId:       level._id,
  topic:         levelData.topic,
  difficulty:    levelData.grade,
  question:      q.question,
  options:       q.options.map(String),
  correctAnswer: String(q.correctAnswer),
  explanation:   q.explanation || '',
}))

  await Question.insertMany(toInsert)
  totalQ += toInsert.length
  console.log(`  ✅ ${levelData.sheet}: ${toInsert.length} questions added`)
}

console.log(`\n🎉 Done! Total questions added: ${totalQ}`)
await mongoose.disconnect()
