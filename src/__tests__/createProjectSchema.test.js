import { describe, it, expect } from 'vitest';
import { createProjectSchema } from '@/features/create-project/model/createProjectSchema';

describe('createProjectSchema', () => {
  const valid = {
    name: 'My Project',
    slogan: 'Amazing slogan here',
    status: 'idea',
    description: 'A great project description',
    idea: 'Solve an interesting problem',
    approach: 'Using modern technology',
    links: [{ id: '1', label: 'Site', url: 'https://example.com' }],
    gallery: [],
  };

  it('passes with valid data', () => {
    expect(createProjectSchema.safeParse(valid).success).toBe(true);
  });

  it('fails with empty name', () => {
    expect(createProjectSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
  });

  it('fails with short slogan', () => {
    expect(createProjectSchema.safeParse({ ...valid, slogan: 'abc' }).success).toBe(false);
  });

  it('fails with invalid url in links', () => {
    const result = createProjectSchema.safeParse({
      ...valid,
      links: [{ id: '1', label: 'Site', url: 'not-a-url' }],
    });
    expect(result.success).toBe(false);
  });

  it('fails with invalid status', () => {
    expect(createProjectSchema.safeParse({ ...valid, status: 'invalid' }).success).toBe(false);
  });
});
