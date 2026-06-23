import { describe, it, expect } from 'vitest';
import { vacancySchema } from '@/features/create-vacancy/model/vacancySchema';

describe('vacancySchema', () => {
  const valid = {
    role: 'Frontend Developer',
    experience: 'middle',
    stack: ['React', 'TypeScript'],
    hook: 'Looking for a teammate to build something great together',
    thumbnail_url: '',
    description: 'We are looking for an experienced frontend developer who loves React and wants to build amazing products with our team.',
  };

  it('passes with valid data', () => {
    expect(vacancySchema.safeParse(valid).success).toBe(true);
  });

  it('fails with empty role', () => {
    expect(vacancySchema.safeParse({ ...valid, role: '' }).success).toBe(false);
  });

  it('fails with empty stack', () => {
    expect(vacancySchema.safeParse({ ...valid, stack: [] }).success).toBe(false);
  });

  it('fails with short hook', () => {
    expect(vacancySchema.safeParse({ ...valid, hook: 'Hi' }).success).toBe(false);
  });

  it('fails with short description', () => {
    expect(vacancySchema.safeParse({ ...valid, description: 'Short' }).success).toBe(false);
  });
});
