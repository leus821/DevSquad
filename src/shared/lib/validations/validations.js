import { z } from 'zod';

export const emailRule = z.string().email('Некорректный формат почты');

export const passwordRule = z
	.string()
	.min(6, 'Пароль должен быть не менее 6 символов')
	.max(50, 'Слишком длинный пароль');

export const fullNameRule = z
	.string()
	.min(2, 'Минимум 2 символа')
	.max(60, 'Максимум 60 символов');

export const usernameRule = z
	.string()
	.min(3, 'Никнейм от 3 символов')
	.regex(/^[a-zA-Z0-9_]+$/, 'Только латиница, цифры и _');

export const bioRule = z
	.string()
	.min(20, 'Расскажите о себе чуть подробнее (мин. 20 симв.)')
	.max(1000, 'Ого, вы слишком многословны');

export const roleRule = z
	.string()
	.min(2, 'Укажите вашу специализацию')
	.max(100, 'Слишком длинное название');

export const statusRule = z.string().min(1, 'Выберите статус');

export const hoursRule = z.coerce
	.number()
	.min(1, 'Минимум 1 час')
	.max(168, 'В неделе всего 168 часов');

export const singleSkillRule = z
	.string()
	.min(1, 'Название слишком короткое')
	.max(30, 'Название слишком длинное (макс 30 симв.)')
	.trim();

export const techStackRule = z
	.array(singleSkillRule)
	.min(1, 'Выберите хотя бы один навык')
	.max(20, 'Можно добавить не более 20 навыков');
