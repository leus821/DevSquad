import { describe, it, expect, vi } from 'vitest';
import { detectLinkData } from '@/shared/lib/utils/linkDetector';
import { getShortProjectName } from '@/shared/lib/utils/getShortProjectName';
import { cn } from '@/shared/lib/utils/commonUtils';

vi.mock('@/shared/assets/icons', () => ({
  Github: 'GithubIcon',
  Vk: 'VkIcon',
  Youtube: 'YoutubeIcon',
}));

describe('БАГИ ИСПРАВЛЕНЫ', () => {

  it('VK ссылка не кидает ошибку (VkIcon → Vk)', () => {
    expect(() => detectLinkData('https://vk.com/club1')).not.toThrow();
    expect(detectLinkData('https://vk.com/club1').isSocial).toBe(true);
  });

  it('cn(null) не падает', () => {
    expect(() => cn('base', null, 'active')).not.toThrow();
    expect(cn('base', null, 'active')).toBe('base active');
  });

  it('special case работает с двойным пробелом (добавили .trim() перед поиском)', () => {
    expect(getShortProjectName('щенячий  патруль')).toBe('ЩПТР');
  });

});
