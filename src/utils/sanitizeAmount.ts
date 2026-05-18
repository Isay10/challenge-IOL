/**
 * Sanitizes user input for currency amount.
 * Removes invalid characters, handles decimal separators, and prevents negative values.
 * @param input - Raw user input string
 * @returns Sanitized amount string or empty string if cleared
 */
export function sanitizeAmount(input: string): string {
  if (!input) return ''

  const trimmed = input.trim()
  if (!trimmed) return ''

  // Remove the minus sign if present (prevent negatives)
  const withoutMinus = trimmed.replace('-', '')

  // Replace comma with period for decimal separator
  const normalized = withoutMinus.replace(/,/g, '.')

  // Remove all characters except digits and decimal point
  const digitsAndDecimal = normalized.replace(/[^\d.]/g, '')

  if (!digitsAndDecimal) return ''

  // Handle multiple decimal points: keep only the first one
  const parts = digitsAndDecimal.split('.')
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('')
  }

  return digitsAndDecimal
}
