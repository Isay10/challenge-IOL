/**
 * Sanitizes user input for currency amount.
 * @param input - Raw user input string
 * @returns Sanitized amount string or empty string if invalid
 */
export function sanitizeAmount(input: string): string {
  if (!input) return ''

  const trimmed = input.trim()
  if (!trimmed) return ''

  const normalized = trimmed.replace(',', '.')

  if ((normalized.match(/\./g) || []).length > 1) {
    return ''
  }

  
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return ''
  }

  const parsed = parseFloat(normalized)

  if (isNaN(parsed) || parsed < 0 || !isFinite(parsed)) {
    return ''
  }

  if (!normalized.includes('.')) {
    return parsed.toString()
  }

  return normalized
}
