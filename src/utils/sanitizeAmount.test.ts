import { describe, it, expect } from 'vitest'
import { sanitizeAmount } from './sanitizeAmount'

describe('sanitizeAmount', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeAmount('')).toBe('')
  })

  it('returns empty string for whitespace only', () => {
    expect(sanitizeAmount('   ')).toBe('')
  })

  it('accepts valid positive numbers', () => {
    expect(sanitizeAmount('123')).toBe('123')
    expect(sanitizeAmount('1.50')).toBe('1.50')
    expect(sanitizeAmount('100')).toBe('100')
    expect(sanitizeAmount('0.01')).toBe('0.01')
  })

  it('strips negative sign from input', () => {
    expect(sanitizeAmount('-10')).toBe('10')
    expect(sanitizeAmount('-1.50')).toBe('1.50')
  })

  it('converts comma decimal separator to period', () => {
    expect(sanitizeAmount('1,50')).toBe('1.50')
    expect(sanitizeAmount('10,5')).toBe('10.5')
  })

  it('removes letters and symbols, keeping only digits and decimals', () => {
    expect(sanitizeAmount('abc123')).toBe('123')
    expect(sanitizeAmount('12abc')).toBe('12')
    expect(sanitizeAmount('abc')).toBe('')
    expect(sanitizeAmount('$100')).toBe('100')
    expect(sanitizeAmount('12.5a')).toBe('12.5')
    expect(sanitizeAmount('a12.5')).toBe('12.5')
  })

  it('handles multiple decimal points by keeping first', () => {
    expect(sanitizeAmount('1.2.3')).toBe('1.23')
    expect(sanitizeAmount('1.5.0')).toBe('1.50')
  })

  it('handles comma as decimal separator with invalid chars', () => {
    expect(sanitizeAmount('1,5a0')).toBe('1.50')
  })

  it('handles zero correctly', () => {
    expect(sanitizeAmount('0')).toBe('0')
    expect(sanitizeAmount('0.00')).toBe('0.00')
  })

  it('trims whitespace', () => {
    expect(sanitizeAmount('  10.5  ')).toBe('10.5')
    expect(sanitizeAmount('  123  ')).toBe('123')
  })

  it('allows empty string as valid intermediate state', () => {
    expect(sanitizeAmount('')).toBe('')
  })
})
