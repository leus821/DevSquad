import { describe, it, expect } from 'vitest';
import { editProfileSchema } from './editProfileSchema';

const validData = {
  name: 'Иван',
  surname: 'Иванов',
  username: 'ivan_96',
  role: 'Frontend Developer',
  avatar_url: '',
  bio: 'Я опытный разработчик с 5-летним стажем, работаю с React, TypeScript и Node.js.',
  status: 'active',
  hours_available: 40,
  location: 'Москва',
  languages: 'Русский, English',
  education: '',
  github_url: 'https://github.com/ivan',
  telegram: '',
  linkedin_url: '',
  skills: ['React', 'TypeScript'],
};

describe('editProfileSchema', () => {
  it('passes with valid data', () => {
    expect(editProfileSchema.safeParse(validData).success).toBe(true);
  });

  it('fails with empty name', () => {
    expect(editProfileSchema.safeParse({ ...validData, name: '' }).success).toBe(false);
  });

  it('fails with invalid username', () => {
    expect(editProfileSchema.safeParse({ ...validData, username: 'iv' }).success).toBe(false);
  });

  it('fails with empty bio', () => {
    expect(editProfileSchema.safeParse({ ...validData, bio: '' }).success).toBe(false);
  });

  it('rejects 0 hours', () => {
    expect(editProfileSchema.safeParse({ ...validData, hours_available: 0 }).success).toBe(false);
  });

  it('fails with empty skills', () => {
    expect(editProfileSchema.safeParse({ ...validData, skills: [] }).success).toBe(false);
  });

  it('fails when all info fields empty', () => {
    const result = editProfileSchema.safeParse({
      ...validData,
      location: '',
      languages: '',
      education: '',
    });
    expect(result.success).toBe(false);
  });

  it('fails when all social fields empty', () => {
    const result = editProfileSchema.safeParse({
      ...validData,
      github_url: '',
      telegram: '',
      linkedin_url: '',
    });
    expect(result.success).toBe(false);
  });

  it('passes when location is filled', () => {
    const result = editProfileSchema.safeParse({
      ...validData,
      location: 'Москва',
      languages: '',
      education: '',
    });
    expect(result.success).toBe(true);
  });

  it('passes when github is filled', () => {
    const result = editProfileSchema.safeParse({
      ...validData,
      github_url: 'https://github.com/ivan',
      telegram: '',
      linkedin_url: '',
    });
    expect(result.success).toBe(true);
  });

  it('coerces string hours to number', () => {
    expect(editProfileSchema.safeParse({ ...validData, hours_available: '40' }).success).toBe(true);
  });

  it('rejects more than 20 skills', () => {
    const skills = Array.from({ length: 21 }, (_, i) => `Skill ${i}`);
    expect(editProfileSchema.safeParse({ ...validData, skills }).success).toBe(false);
  });
});
