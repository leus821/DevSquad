import { describe, it, expect } from 'vitest';
import { createProjectSchema } from './createProjectSchema';

const validData = {
  name: 'Мой проект',
  slogan: 'Делаем мир лучше через код',
  status: 'idea',
  logo_url: undefined,
  description: 'Мы создаем инновационный продукт для разработчиков, который помогает автоматизировать рутинные задачи.',
  idea: 'Идея в том, чтобы объединить разработчиков со всего мира.',
  approach: 'Используем современные технологии и Agile методологии.',
  gallery: [],
  links: [],
};

describe('createProjectSchema', () => {
  it('passes with valid data', () => {
    expect(createProjectSchema.safeParse(validData).success).toBe(true);
  });

  it('fails with empty name', () => {
    expect(createProjectSchema.safeParse({ ...validData, name: '' }).success).toBe(false);
  });

  it('fails with short slogan', () => {
    expect(createProjectSchema.safeParse({ ...validData, slogan: 'ABCD' }).success).toBe(false);
  });

  it('rejects invalid status', () => {
    expect(createProjectSchema.safeParse({ ...validData, status: 'invalid' }).success).toBe(false);
  });

  it('rejects invalid URL in link', () => {
    const data = {
      ...validData,
      links: [{ id: '1', label: 'GitHub', url: 'not-a-url' }],
    };
    expect(createProjectSchema.safeParse(data).success).toBe(false);
  });

  it('rejects more than 5 links', () => {
    const links = Array.from({ length: 6 }, (_, i) => ({
      id: String(i),
      label: `Link ${i}`,
      url: 'https://example.com',
    }));
    expect(createProjectSchema.safeParse({ ...validData, links }).success).toBe(false);
  });

  it('fails with short description', () => {
    expect(createProjectSchema.safeParse({ ...validData, description: 'Коротко' }).success).toBe(false);
  });

  it('rejects gallery more than 10', () => {
    const gallery = Array.from({ length: 11 }, (_, i) => `https://example.com/${i}.jpg`);
    expect(createProjectSchema.safeParse({ ...validData, gallery }).success).toBe(false);
  });
});
