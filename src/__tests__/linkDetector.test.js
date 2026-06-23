import { describe, it, expect, vi } from 'vitest';
import { detectLinkData } from '@/shared/lib/utils/linkDetector';
import { Globe, Send } from 'lucide-react';

vi.mock('@/shared/assets/icons', () => ({
  Github: 'GithubIcon',
  Vk: 'VkIcon',
  Youtube: 'YoutubeIcon',
}));

describe('detectLinkData', () => {
  it('detects github link', () => {
    expect(detectLinkData('https://github.com/user').isSocial).toBe(true);
  });

  it('detects telegram link', () => {
    const result = detectLinkData('https://t.me/username');
    expect(result.isSocial).toBe(true);
    expect(result.icon).toBe(Send);
  });

  it('detects youtube link', () => {
    expect(detectLinkData('https://youtube.com/watch').isSocial).toBe(true);
    expect(detectLinkData('https://youtu.be/abc').isSocial).toBe(true);
  });

  it('returns Globe for unknown links', () => {
    const result = detectLinkData('https://example.com');
    expect(result.isSocial).toBe(false);
    expect(result.icon).toBe(Globe);
  });

  it('is case insensitive', () => {
    expect(detectLinkData('HTTPS://GITHUB.COM/USER').isSocial).toBe(true);
  });
});
