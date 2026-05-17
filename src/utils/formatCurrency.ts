/**
 * Formats a numeric amount as a currency string with 2 decimal places.
 *
 * Pure utility function for display formatting.
 
 * @param value - The numeric amount to format
 * @returns Formatted string with 2 decimal places, or "0.00" for invalid input
 */
export function formatCurrency(value: number): string {

  if (!isFinite(value)) {
    return '0.00'
  }

  return value.toFixed(2)
}
