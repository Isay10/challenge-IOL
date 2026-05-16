/**
 * Sanitizes user input for currency amount.
 * 
 * Rules:
 * - Rejects negative numbers
 * - Accepts valid positive numbers with optional decimal
 * - Converts comma decimal separator to period
 * - Strips whitespace
 * - Preserves decimal format (including trailing zeros)
 * - Returns empty string for invalid input
 * 
 * @param input - Raw user input string
 * @returns Sanitized amount string or empty string if invalid
 */
export function sanitizeAmount(input: string): string {
  if (!input) return ''

  // Trim whitespace
  const trimmed = input.trim()
  if (!trimmed) return ''

  // Replace comma with period (normalize decimal separator)
  const normalized = trimmed.replace(',', '.')

  // Check for multiple decimal points
  if ((normalized.match(/\./g) || []).length > 1) {
    return ''
  }

  // Validate format: must be only digits and at most one decimal point
  // Pattern: optional digits, optional (dot followed by digits)
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return ''
  }

  // Parse as number to validate
  const parsed = parseFloat(normalized)

  // Reject negative, NaN, or Infinity
  if (isNaN(parsed) || parsed < 0 || !isFinite(parsed)) {
    return ''
  }

  // If no decimal point, convert to remove leading zeros
  if (!normalized.includes('.')) {
    return parsed.toString()
  }

  // If has decimal, preserve the format (including trailing zeros)
  return normalized
}
