import { z } from 'zod';

export const vacancySchema = z.object({
	role: z.string().min(2, 'Введите название роли').max(60),
	experience: z.string().min(1, 'Выберите опыт'),
	stack: z.array(z.string()).min(1, 'Выберите хотя бы один навык'),
	hook: z
		.string()
		.min(20, 'Хук слишком короткий')
		.max(160, 'Максимум 160 символов'),
	thumbnail_url: z.string().min(1, 'Добавьте обложку').optional(),
	description: z.string().min(50, 'Опишите вакансию подробнее'),
});
