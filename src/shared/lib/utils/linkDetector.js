import { Github, Vk, Youtube } from '@/shared/assets/icons';
import { Globe, Send } from 'lucide-react';

// Конфигурация поддерживаемых ссылок
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
		pattern: ['youtube.com', 'youtu.be'], // Можно массивом
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

	// Ищем совпадение по паттернам
	const found = LINK_CONFIG.find(item =>
		Array.isArray(item.pattern)
			? item.pattern.some(p => lowUrl.includes(p))
			: lowUrl.includes(item.pattern),
	);

	if (found) {
		// Если нашли VK — возвращаем кастомную иконку
		if (found.name === 'vk') return { icon: VkIcon, isSocial: true };
		return { icon: found.icon, isSocial: true };
	}

	// Дефолт для всех остальных сайтов
	return { icon: Globe, isSocial: false };
};
