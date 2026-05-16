import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats whole numbers with 2 decimal places', () => {
    expect(formatCurrency(1)).toBe('1.00')
    expect(formatCurrency(10)).toBe('10.00')
    expect(formatCurrency(100)).toBe('100.00')
  })

  it('formats decimals with 2 decimal places', () => {
    expect(formatCurrency(1.2)).toBe('1.20')
    expect(formatCurrency(1.25)).toBe('1.25')
  })

  it('rounds to 2 decimal places', () => {
    expect(formatCurrency(1.234)).toBe('1.23')
    expect(formatCurrency(1.235)).toBe('1.24')
    expect(formatCurrency(1.999)).toBe('2.00')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('0.00')
  })

  it('handles very small positive numbers', () => {
    expect(formatCurrency(0.001)).toBe('0.00')
    expect(formatCurrency(0.01)).toBe('0.01')
  })

  it('handles very large numbers', () => {
    expect(formatCurrency(1000000)).toBe('1000000.00')
    expect(formatCurrency(1234567.89)).toBe('1234567.89')
  })

  it('handles NaN safely', () => {
    expect(formatCurrency(NaN)).toBe('0.00')
  })

  it('handles Infinity safely', () => {
    expect(formatCurrency(Infinity)).toBe('0.00')
    expect(formatCurrency(-Infinity)).toBe('0.00')
  })

  it('handles negative numbers', () => {
    expect(formatCurrency(-1)).toBe('-1.00')
    expect(formatCurrency(-1.5)).toBe('-1.50')
    expect(formatCurrency(-0.5)).toBe('-0.50')
  })

  it('does not include currency symbols', () => {
    const result = formatCurrency(100)
    expect(result).not.toContain('$')
    expect(result).not.toContain('€')
    expect(result).not.toContain('£')
  })

  it('returns a string', () => {
    expect(typeof formatCurrency(1)).toBe('string')
  })

  it('preserves significant decimal values', () => {
    expect(formatCurrency(1.5)).toBe('1.50')
    expect(formatCurrency(2.3)).toBe('2.30')
    expect(formatCurrency(99.99)).toBe('99.99')
  })

  it('handles edge case: 0.005 rounds correctly', () => {
    // 0.005 should round to 0.01 using standard rounding
    expect(formatCurrency(0.005)).toBe('0.01')
  })
})
