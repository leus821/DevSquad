import { describe, it, expect } from 'vitest';
import { calculateVacancyScore } from '@/shared/lib/utils/recommendationLogic';

describe('calculateVacancyScore', () => {
  it('returns 0 when no user', () => {
    expect(calculateVacancyScore({}, null)).toBe(0);
  });

  it('adds 15 for role match', () => {
    const vacancy = { role_name: 'Frontend', tech_stack: [], projects: {} };
    const user = { role: 'Frontend', tech_stack: [] };
    expect(calculateVacancyScore(vacancy, user)).toBe(15);
  });

  it('adds 3 per matching skill', () => {
    const vacancy = { role_name: 'Backend', tech_stack: ['React', 'TypeScript', 'Node'], projects: {} };
    const user = { role: 'Designer', tech_stack: ['React', 'TypeScript'] };
    expect(calculateVacancyScore(vacancy, user)).toBe(6);
  });

  it('adds 1 per matching project stack skill', () => {
    const vacancy = { role_name: 'Backend', tech_stack: [], projects: { tech_stack: ['React', 'Vue'] } };
    const user = { role: 'Designer', tech_stack: ['React'] };
    expect(calculateVacancyScore(vacancy, user)).toBe(1);
  });

  it('combines all scores', () => {
    const vacancy = {
      role_name: 'Backend',
      tech_stack: ['Node.js'],
      projects: { tech_stack: ['Postgres', 'Docker'] },
    };
    const user = { role: 'Backend', tech_stack: ['Node.js', 'Postgres'] };
    expect(calculateVacancyScore(vacancy, user)).toBe(15 + 3 + 1);
  });

  it('is case-insensitive for role', () => {
    const vacancy = { role_name: 'Frontend', tech_stack: [], projects: {} };
    const user = { role: 'frontend', tech_stack: [] };
    expect(calculateVacancyScore(vacancy, user)).toBe(15);
  });
});
