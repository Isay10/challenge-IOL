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
    expect(sanitizeAmount('1.50')).toBe('1.50')
    expect(sanitizeAmount('100')).toBe('100')
    expect(sanitizeAmount('0.01')).toBe('0.01')
  })

  it('rejects negative numbers', () => {
    expect(sanitizeAmount('-10')).toBe('')
    expect(sanitizeAmount('-1.50')).toBe('')
  })

  it('handles leading zeros', () => {
    expect(sanitizeAmount('007')).toBe('7')
    expect(sanitizeAmount('0.5')).toBe('0.5')
  })

  it('handles comma as decimal separator and converts to period', () => {
    expect(sanitizeAmount('1,50')).toBe('1.50')
    expect(sanitizeAmount('10,5')).toBe('10.5')
  })

  it('rejects multiple decimal points or commas', () => {
    expect(sanitizeAmount('1.5.0')).toBe('')
    expect(sanitizeAmount('1,5,0')).toBe('')
  })

  it('strips non-numeric characters except decimal', () => {
    expect(sanitizeAmount('1a5')).toBe('')
    expect(sanitizeAmount('$100')).toBe('')
  })

  it('handles zero correctly', () => {
    expect(sanitizeAmount('0')).toBe('0')
    expect(sanitizeAmount('0.00')).toBe('0.00')
  })

  it('trims whitespace', () => {
    expect(sanitizeAmount('  10.5  ')).toBe('10.5')
  })

  it('rejects NaN', () => {
    expect(sanitizeAmount('NaN')).toBe('')
  })

  it('rejects Infinity', () => {
    expect(sanitizeAmount('Infinity')).toBe('')
  })
})
