import z from 'zod';
import {
	emailRule,
	fullNameRule,
	passwordRule,
} from '@/shared/lib/validations/validations';

export const loginSchema = z.object({
	email: emailRule,
	password: passwordRule,
});

export const registerSchema = z.object({
	email: emailRule,
	password: passwordRule,
	name: fullNameRule,
	surname: fullNameRule,
});
