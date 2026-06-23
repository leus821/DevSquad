import { describe, it, expect } from 'vitest';
import { cn } from '@/shared/lib/utils/commonUtils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('handles tailwind conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});
