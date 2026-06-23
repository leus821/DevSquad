import { describe, it, expect } from 'vitest';
import {
  fullNameRule,
  usernameRule,
  bioRule,
  roleRule,
  hoursRule,
  singleSkillRule,
  techStackRule,
} from './validations';

describe('validations', () => {
  it('fullNameRule: rejects too short', () => {
    expect(fullNameRule.safeParse('A').success).toBe(false);
  });

  it('fullNameRule: accepts valid name', () => {
    expect(fullNameRule.safeParse('Иван').success).toBe(true);
  });

  it('usernameRule: rejects with spaces', () => {
    expect(usernameRule.safeParse('user name').success).toBe(false);
  });

  it('usernameRule: accepts valid username', () => {
    expect(usernameRule.safeParse('john_doe').success).toBe(true);
  });

  it('bioRule: rejects too short', () => {
    expect(bioRule.safeParse('Коротко').success).toBe(false);
  });

  it('bioRule: accepts valid bio', () => {
    expect(bioRule.safeParse('Я разработчик с 5-летним опытом работы в вебе.').success).toBe(true);
  });

  it('roleRule: rejects empty', () => {
    expect(roleRule.safeParse('').success).toBe(false);
  });

  it('hoursRule: rejects 0', () => {
    expect(hoursRule.safeParse(0).success).toBe(false);
  });

  it('hoursRule: rejects > 168', () => {
    expect(hoursRule.safeParse(169).success).toBe(false);
  });

  it('hoursRule: accepts valid range', () => {
    expect(hoursRule.safeParse(40).success).toBe(true);
  });

  it('singleSkillRule: rejects empty', () => {
    expect(singleSkillRule.safeParse('').success).toBe(false);
  });

  it('techStackRule: rejects empty array', () => {
    expect(techStackRule.safeParse([]).success).toBe(false);
  });

  it('techStackRule: rejects more than 20 skills', () => {
    const skills = Array.from({ length: 21 }, (_, i) => `Skill ${i}`);
    expect(techStackRule.safeParse(skills).success).toBe(false);
  });
});
