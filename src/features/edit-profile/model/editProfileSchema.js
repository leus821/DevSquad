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
		.optional()
		.or(z.literal('')),

	telegram: z
		.string()
		.optional()
		.or(z.literal('')),

	linkedin_url: z
		.string()
		.optional()
		.or(z.literal('')),

	skills: techStackRule,
}).superRefine((data, ctx) => {
	const infoFields = [data.location, data.languages, data.education];
	const hasInfo = infoFields.some(v => v && (typeof v !== 'string' || v.trim()));
	if (!hasInfo) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Заполните хотя бы одно поле в блоке Инфо',
			path: ['location'],
		});
	}

	const socialFields = [data.github_url, data.telegram, data.linkedin_url];
	const hasSocial = socialFields.some(v => v && (typeof v !== 'string' || v.trim()));
	if (!hasSocial) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Заполните хотя бы одну соц. сеть',
			path: ['github_url'],
		});
	}
});
