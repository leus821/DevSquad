import { z } from 'zod';
import {
	fullNameRule,
	roleRule,
	usernameRule,
	bioRule,
	hoursRule,
	techStackRule,
} from '@/shared/lib/validations/validations';

export const editProfileSchema = z.object({
	name: fullNameRule,
	surname: fullNameRule,
	username: usernameRule,
	role: roleRule,
	avatar_url: z.string(),
	bio: bioRule,

	status: z.string().min(1, 'Выберите статус'),
	hours_available: hoursRule,

	location: z
		.string()
		.max(20, 'Слишком длинное название')
		.optional()
		.or(z.literal('')),
	languages: z
		.string()
		.max(200, 'Слишком много символов')
		.optional()
		.or(z.literal('')),
	education: z
		.string()
		.max(200, 'Слишком много символов')
		.optional()
		.or(z.literal('')),

	github_url: z
		.string()
		.url('Введите корректную ссылку')
		.includes('github.com', { message: 'Ссылка должна быть на GitHub' })
		.optional()
		.or(z.literal('')),

	telegram: z
		.string()
		.min(2, 'Слишком короткий никнейм')
		.max(32, 'Слишком длинный никнейм')
		.regex(/^[a-zA-Z0-9_]+$/, 'Только латиница, цифры и _')
		.optional()
		.or(z.literal('')),

	linkedin_url: z
		.string()
		.url('Введите корректную ссылку')
		.optional()
		.or(z.literal('')),

	skills: techStackRule,
});
