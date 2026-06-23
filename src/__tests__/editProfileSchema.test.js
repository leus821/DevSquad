import { describe, it, expect } from 'vitest';
import { editProfileSchema } from '@/features/edit-profile/model/editProfileSchema';

describe('editProfileSchema', () => {
  const valid = {
    name: 'Иван',
    surname: 'Иванов',
    username: 'ivan_96',
    role: 'Frontend Developer',
    avatar_url: '',
    bio: 'Experienced developer with 5 years of experience in web development.',
    status: 'search',
    hours_available: 20,
    location: 'Москва',
    languages: '',
    education: '',
    github_url: 'https://github.com/ivan',
    telegram: '',
    linkedin_url: '',
    skills: ['React', 'TypeScript'],
  };

  it('passes with valid data', () => {
    expect(editProfileSchema.safeParse(valid).success).toBe(true);
  });

  it('fails with empty name', () => {
    expect(editProfileSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
  });

  it('fails with short username', () => {
    expect(editProfileSchema.safeParse({ ...valid, username: 'ab' }).success).toBe(false);
  });

  it('fails when all info fields are empty', () => {
    const result = editProfileSchema.safeParse({
      ...valid, location: '', languages: '', education: '',
    });
    expect(result.success).toBe(false);
  });

  it('fails when all social fields are empty', () => {
    const result = editProfileSchema.safeParse({
      ...valid, github_url: '', telegram: '', linkedin_url: '',
    });
    expect(result.success).toBe(false);
  });

  it('fails with empty skills', () => {
    expect(editProfileSchema.safeParse({ ...valid, skills: [] }).success).toBe(false);
  });

  it('rejects more than 20 skills', () => {
    const skills = Array.from({ length: 21 }, (_, i) => `Skill ${i}`);
    expect(editProfileSchema.safeParse({ ...valid, skills }).success).toBe(false);
  });
});
