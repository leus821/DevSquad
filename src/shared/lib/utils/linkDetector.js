import { Github, Vk, Youtube } from '@/shared/assets/icons';
import { Globe, Send } from 'lucide-react';

const LINK_CONFIG = [
	{
		name: 'github',
		pattern: 'github.com',
		icon: Github,
		isSocial: true,
	},
	{
		name: 'telegram',
		pattern: 't.me',
		icon: Send,
		isSocial: true,
	},
	{
		name: 'youtube',
		pattern: ['youtube.com', 'youtu.be'],
		icon: Youtube,
		isSocial: true,
	},
	{
		name: 'vk',
		pattern: 'vk.com',
		icon: Vk,
		isSocial: true,
	},
];

export const detectLinkData = url => {
	const lowUrl = url.toLowerCase();

	const found = LINK_CONFIG.find(item =>
		Array.isArray(item.pattern)
			? item.pattern.some(p => lowUrl.includes(p))
			: lowUrl.includes(item.pattern),
	);

	if (found) {
		if (found.name === 'vk') return { icon: VkIcon, isSocial: true };
		return { icon: found.icon, isSocial: true };
	}

	return { icon: Globe, isSocial: false };
};
