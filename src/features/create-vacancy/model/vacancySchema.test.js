import { describe, it, expect } from 'vitest';
import { vacancySchema } from './vacancySchema';

const validData = {
  role: 'Frontend Developer',
  experience: '2-5 лет',
  stack: ['React', 'TypeScript'],
  hook: 'Ищем крутого фронтендера в команду для роста!',
  thumbnail_url: '',
  description: 'Мы ищем опытного разработчика для работы над крутым проектом. Нужно знать React, TypeScript и уметь работать в команде.',
};

describe('vacancySchema', () => {
  it('passes with valid data', () => {
    expect(vacancySchema.safeParse(validData).success).toBe(true);
  });

  it('fails with empty role', () => {
    expect(vacancySchema.safeParse({ ...validData, role: '' }).success).toBe(false);
  });

  it('fails with empty stack', () => {
    expect(vacancySchema.safeParse({ ...validData, stack: [] }).success).toBe(false);
  });

  it('fails with short hook', () => {
    expect(vacancySchema.safeParse({ ...validData, hook: 'Короткий хук' }).success).toBe(false);
  });

  it('fails with short description', () => {
    expect(vacancySchema.safeParse({ ...validData, description: 'Коротко' }).success).toBe(false);
  });

  it('fails with role longer than 60 chars', () => {
    expect(vacancySchema.safeParse({ ...validData, role: 'A'.repeat(61) }).success).toBe(false);
  });
});
