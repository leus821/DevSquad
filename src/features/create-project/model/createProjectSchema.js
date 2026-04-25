import { z } from 'zod';
import { bioRule } from '@/shared/lib/validations/validations';
import { PROJECT_INPUTS_MAX_LENGTH } from '@/shared/static/project';

export const createProjectSchema = z.object({
	name: z
		.string()
		.min(2, 'Минимум 2 символа')
		.max(PROJECT_INPUTS_MAX_LENGTH.name, 'Слишком длинное название'),
	slogan: z
		.string()
		.min(5, 'Минимум 5 символов')
		.max(PROJECT_INPUTS_MAX_LENGTH.slogan, 'Слишком длинный слоган'),
	status: z.enum(['idea', 'mvp', 'launched'], {
		errorMap: () => ({ message: 'Выберите статус проекта' }),
	}),
	logo_url: z.any().optional(),

	description: bioRule,
	idea: bioRule,
	approach: bioRule,

	gallery: z.array(z.string()).max(10, 'Максимум 10 скриншотов'),

	links: z
		.array(
			z.object({
				id: z.string(),
				label: z
					.string()
					.min(1, 'Метка обязательна')
					.max(15, 'Максимум 15 символов'),
				url: z.string().url('Введите корректный URL'),
			}),
		)
		.max(5, 'Максимум 5 ссылок'),
});
