import z from 'zod';
import {
	bioRule,
	hoursRule,
	roleRule,
	statusRule,
	usernameRule,
} from '@/shared/lib/validations/validations';

export const onboardingSchema = z.object({
	role: roleRule,
	username: usernameRule,
	status: statusRule,
	hours_available: hoursRule,
	bio: bioRule,
	github_url: z.string().optional().or(z.literal('')),
	telegram: z.string().optional().or(z.literal('')),
});
