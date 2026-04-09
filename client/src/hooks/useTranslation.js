import { useGame } from '../context/GameContext'
import en from '../locales/en'
import ne from '../locales/ne'

const locales = { en, ne }

export function useTranslation() {
  const { language } = useGame()

  const strings = locales[language] ?? locales.en

  // Translates a dot-separated key like 'login.welcomeBack'
  function t(key) {
    const parts = key.split('.')
    let value = strings
    for (const part of parts) {
      value = value?.[part]
    }
    return value ?? key
  }

  // Converts a number like 7 → '७' in Nepali, stays '7' in English
  function toNepaliDigit(num) {
    if (language !== 'ne') return String(num)
    const digits = strings.numbers.digits
    const n = Number(num)
    if (n >= 0 && n <= 20) return digits[n]
    // For numbers > 20, convert digit by digit
    return String(num)
      .split('')
      .map(ch => {
        const d = parseInt(ch)
        return isNaN(d) ? ch : ['०','१','२','३','४','५','६','७','८','९'][d]
      })
      .join('')
  }

  // Converts a number to its word name like 5 → 'पाँच' or 'five'
  function toWordName(num) {
    const n = Number(num)
    const words = strings.numbers.words
    if (n >= 0 && n <= 20) return words[n]
    return String(num)
  }

  return { t, toNepaliDigit, toWordName }
}