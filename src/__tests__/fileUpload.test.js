import { describe, it, expect, vi, beforeEach } from 'vitest';
import { uploadFile } from '@/shared/lib/utils/fileUpload';

const mockUpload = vi.fn();
const mockGetPublicUrl = vi.fn(() => ({
  data: { publicUrl: 'https://cdn.example.com/file.jpg' },
}));

vi.mock('@/shared/lib/supabase', () => ({
  supabase: {
    storage: {
      from: vi.fn(() => ({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl,
      })),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockUpload.mockResolvedValue({ error: null });
});

describe('uploadFile', () => {
  it('returns null when no file data', async () => {
    expect(await uploadFile(null, 'bucket')).toBeNull();
  });

  it('returns http url as-is', async () => {
    expect(await uploadFile('https://example.com/img.png', 'bucket')).toBe('https://example.com/img.png');
  });

  it('uploads blob and returns public url', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ blob: () => Promise.resolve(new Blob(['test'])) }),
    );
    const result = await uploadFile('data:image/png;base64,abc', 'bucket', 'folder');
    expect(result).toBe('https://cdn.example.com/file.jpg');
    expect(mockUpload).toHaveBeenCalled();
  });

  it('throws on upload error', async () => {
    mockUpload.mockResolvedValue({ error: new Error('Upload failed') });
    global.fetch = vi.fn(() =>
      Promise.resolve({ blob: () => Promise.resolve(new Blob(['test'])) }),
    );
    await expect(uploadFile('data:image/png,abc', 'bucket')).rejects.toThrow('Upload failed');
  });
});
