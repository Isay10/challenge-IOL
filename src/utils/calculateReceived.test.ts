import { describe, it, expect } from 'vitest'
import { calculateReceived } from './calculateReceived'

describe('calculateReceived', () => {
  it('multiplies amount by rate correctly', () => {
    expect(calculateReceived(1, 0.9)).toBe(0.9)
    expect(calculateReceived(10, 2)).toBe(20)
    expect(calculateReceived(5, 2.5)).toBe(12.5)
  })

  it('accepts string amounts and parses them', () => {
    expect(calculateReceived('1', 0.9)).toBe(0.9)
    expect(calculateReceived('10', 2)).toBe(20)
    expect(calculateReceived('5', 2.5)).toBe(12.5)
  })

  it('returns 0 for empty string amount', () => {
    expect(calculateReceived('', 2)).toBe(0)
  })

  it('returns 0 for invalid string amount', () => {
    expect(calculateReceived('abc', 2)).toBe(0)
    expect(calculateReceived('1.2.3', 2)).toBe(0)
  })

  it('returns 0 for undefined rate', () => {
    expect(calculateReceived(10, undefined)).toBe(0)
  })

  it('returns 0 for null rate', () => {
    expect(calculateReceived(10, null as any)).toBe(0)
  })

  it('returns 0 for NaN rate', () => {
    expect(calculateReceived(10, NaN)).toBe(0)
  })

  it('returns 0 for Infinity rate', () => {
    expect(calculateReceived(10, Infinity)).toBe(0)
  })

  it('handles zero amount', () => {
    expect(calculateReceived(0, 2)).toBe(0)
    expect(calculateReceived('0', 2)).toBe(0)
  })

  it('handles zero rate', () => {
    expect(calculateReceived(10, 0)).toBe(0)
  })

  it('handles negative amount as zero', () => {
    expect(calculateReceived(-10, 2)).toBe(0)
    expect(calculateReceived('-5', 2)).toBe(0)
  })

  it('handles negative rate safely', () => {
    expect(calculateReceived(10, -2)).toBe(0)
  })

  it('handles very small decimal rates', () => {
    expect(calculateReceived(1, 0.001)).toBe(0.001)
  })

  it('handles very large amounts', () => {
    expect(calculateReceived(1000000, 2.5)).toBe(2500000)
  })

  it('does not format the result', () => {
    expect(calculateReceived(10, 0.333333)).toBe(3.33333)
    // Result is a raw number, not a formatted string
    expect(typeof calculateReceived(10, 0.333333)).toBe('number')
  })

  it('returns 0 for whitespace-only amount string', () => {
    expect(calculateReceived('   ', 2)).toBe(0)
  })

  it('trims and parses amount strings correctly', () => {
    expect(calculateReceived('  10  ', 2)).toBe(20)
  })
})
