// ==========================
// 🚀 MAIN ENTRY
// ==========================
export const generateQuestion = (level) => {
  const { questionType, questionConfig } = level;
  const { min = 1, max = 10 } = questionConfig || {};

  switch (questionType) {

    // ===== GRADE 1–3 =====
    case "addition": return addition(min, max);
    case "subtraction": return subtraction(min, max);
    case "multiplication": return multiplication(min, max);
    case "division": return division(min, max);
    case "comparison": return comparison(min, max);

    // ===== GRADE 4–5 =====
    case "fraction": return fractionBasic();
    case "fraction_ops": return fractionOperation();
    case "decimal": return decimalQuestion();
    case "percentage": return percentageQuestion();
    case "ratio": return ratioQuestion();

    // ===== GRADE 6–7 =====
    case "integer": return integerQuestion();
    case "linear_equation": return linearEquation();
    case "simple_interest": return simpleInterest();
    case "probability": return probabilityBasic();

    // ===== GRADE 8 =====
    case "factorization": return factorization();
    case "pythagoras": return pythagoras();

    // ===== GRADE 9 =====
    case "quadratic": return quadratic();

    // ===== GRADE 10 =====
    case "ap": return arithmeticProgression();

    // ===== SAFE DEFAULT =====
    default:
      return {
        question: "Coming soon",
        options: ["A", "B", "C", "D"],
        correctAnswer: "A"
      };
  }
};

// ==========================
// 🔧 HELPERS
// ==========================
const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ==========================
// 🧩 SAFE BUILDER
// ==========================
function build(question, correct) {

  // NUMBER CASE
  if (typeof correct === "number") {
    return {
      question,
      options: shuffle([
        correct,
        correct + 1,
        correct - 1,
        correct + 2
      ]),
      correctAnswer: correct
    };
  }

  // STRING CASE
  return {
    question,
    options: shuffle([
      correct,
      "None of the above",
      "All of the above",
      "Cannot determine"
    ]),
    correctAnswer: correct
  };
}

// ==========================
// 🧮 GRADE 1–3
// ==========================

function addition(min, max) {
  const a = rand(min, max);
  const b = rand(min, max);
  return build(`${a} + ${b} = ?`, a + b);
}

function subtraction(min, max) {
  const a = rand(min, max);
  const b = rand(min, a);
  return build(`${a} - ${b} = ?`, a - b);
}

function multiplication(min, max) {
  const a = rand(min, max);
  const b = rand(1, 10);
  return build(`${a} × ${b} = ?`, a * b);
}

function division(min, max) {
  const b = rand(1, 10);
  const correct = rand(min, max);
  const a = b * correct;
  return build(`${a} ÷ ${b} = ?`, correct);
}

function comparison(min, max) {
  const a = rand(min, max);
  const b = rand(min, max);

  const correct = a > b ? ">" : a < b ? "<" : "=";

  return {
    question: `${a} ? ${b}`,
    options: shuffle([">", "<", "="]),
    correctAnswer: correct
  };
}

// ==========================
// 🧮 GRADE 4–5
// ==========================

function fractionBasic() {
  const a = rand(1, 9);
  const b = rand(1, 9);

  const correct = a > b ? `${a}/10` : `${b}/10`;

  return {
    question: `Which is bigger? ${a}/10 or ${b}/10`,
    options: shuffle([
      `${a}/10`,
      `${b}/10`,
      `${a + b}/10`,
      `${Math.abs(a - b)}/10`
    ]),
    correctAnswer: correct
  };
}

function fractionOperation() {
  const a = rand(1, 5);
  const b = rand(1, 5);

  return {
    question: `${a}/10 + ${b}/10 = ?`,
    options: shuffle([
      `${a + b}/10`,
      `${a}/10`,
      `${b}/10`,
      `${Math.abs(a - b)}/10`
    ]),
    correctAnswer: `${a + b}/10`
  };
}

function decimalQuestion() {
  const a = rand(1, 9) / 10;
  const b = rand(1, 9) / 10;
  const correct = (a + b).toFixed(1);

  return {
    question: `${a} + ${b} = ?`,
    options: shuffle([
      correct,
      (a + b + 0.1).toFixed(1),
      (a + b - 0.1).toFixed(1),
      (a + b + 0.2).toFixed(1)
    ]),
    correctAnswer: correct
  };
}

function percentageQuestion() {
  const p = rand(10, 90);
  const n = rand(10, 100);
  const correct = (p * n) / 100;

  return build(`${p}% of ${n} = ?`, correct);
}

function ratioQuestion() {
  const a = rand(1, 10);
  const b = rand(1, 10);

  const correct = `${a}:${b}`;

  return {
    question: `Simplify ratio ${a}:${b}`,
    options: shuffle([
      correct,
      `${a * 2}:${b * 2}`,
      `${a + 1}:${b}`,
      `${a}:${b + 1}`
    ]),
    correctAnswer: correct
  };
}

// ==========================
// 🧠 GRADE 6–7
// ==========================

function integerQuestion() {
  const a = rand(-10, 10);
  const b = rand(-10, 10);
  return build(`${a} + (${b}) = ?`, a + b);
}

function linearEquation() {
  const x = rand(1, 10);
  const a = rand(1, 5);
  const b = rand(1, 10);
  const c = a * x + b;

  return build(`${a}x + ${b} = ${c}. Find x`, x);
}

function simpleInterest() {
  const p = rand(100, 1000);
  const r = rand(1, 10);
  const t = rand(1, 5);

  const si = (p * r * t) / 100;

  return build(`Find SI: P=${p}, R=${r}%, T=${t}`, si);
}

function probabilityBasic() {
  return {
    question: "What is probability of getting head?",
    options: shuffle(["1/2", "1/3", "1/4", "1"]),
    correctAnswer: "1/2"
  };
}

// ==========================
// 📐 GRADE 8
// ==========================

function factorization() {
  const a = rand(1, 5);
  const b = rand(1, 5);

  const correct = `(x+${a})(x+${b})`;

  return {
    question: `Factor: x² + ${a + b}x + ${a * b}`,
    options: shuffle([
      correct,
      `(x-${a})(x-${b})`,
      `(x+${a})(x-${b})`,
      `(x-${a})(x+${b})`
    ]),
    correctAnswer: correct
  };
}

function pythagoras() {
  const a = rand(3, 10);
  const b = rand(3, 10);
  const correct = Math.sqrt(a * a + b * b).toFixed(2);

  return build(`Find hypotenuse: a=${a}, b=${b}`, correct);
}

// ==========================
// 📊 GRADE 9
// ==========================

function quadratic() {
  const x = rand(1, 5);

  return {
    question: `x² - ${2 * x}x + ${x * x} = 0`,
    options: shuffle([x, x + 1, x - 1, x + 2]),
    correctAnswer: x
  };
}

// ==========================
// 📈 GRADE 10
// ==========================

function arithmeticProgression() {
  const a = rand(1, 10);
  const d = rand(1, 5);

  return build(
    `Find next term: ${a}, ${a + d}, ${a + 2 * d}, ?`,
    a + 3 * d
  );
}