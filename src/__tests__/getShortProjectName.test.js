import { describe, it, expect } from 'vitest';
import { getShortProjectName } from '@/shared/lib/utils/getShortProjectName';

describe('getShortProjectName', () => {
  it('returns empty string for null', () => {
    expect(getShortProjectName(null)).toBe('');
  });

  it('returns empty string for non-string', () => {
    expect(getShortProjectName(123)).toBe('');
  });

  it('returns special case for known names', () => {
    expect(getShortProjectName('щенячий патруль')).toBe('ЩПТР');
  });

  it('abbreviates first 2 words with max 4 letters', () => {
    expect(getShortProjectName('Мой проект')).toBe('МОЙ\nПРКТ');
  });

  it('uses consonants when available', () => {
    expect(getShortProjectName('Разработка')).toBe('РАЗР.');
  });

  it('adds dot when word is cut', () => {
    expect(getShortProjectName('ДлинноеНазваниеПроекта')).toBe('ДЛИН.');
  });

  it('respects maxWords option', () => {
    expect(getShortProjectName('Один Два Три', { maxWords: 3 })).toBe('ОДИН\nДВА\nТРИ');
  });

  it('supports custom separator', () => {
    expect(getShortProjectName('Тест Проект', { separator: ' ' })).toBe('ТЕСТ ПРКТ');
  });

  it('supports toUpperCase false', () => {
    expect(getShortProjectName('Тест', { toUpperCase: false })).toBe('Тест');
  });

  it('removes special characters', () => {
    expect(getShortProjectName('Hello-World')).toBe('HELL.');
  });
});
