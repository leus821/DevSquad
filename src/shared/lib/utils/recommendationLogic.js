export const calculateVacancyScore = (vacancy, userProfile) => {
	if (!userProfile) return 0;

	let score = 0;

	// 1. Совпадение по РОЛИ (Самый большой вес: +15 баллов)
	// Если юзер "Frontend" и вакансия "Frontend"
	const userRole = userProfile.role?.toLowerCase() || '';
	const vacancyRole = vacancy.role_name?.toLowerCase() || '';

	if (vacancyRole.includes(userRole) || userRole.includes(vacancyRole)) {
		score += 15;
	}

	// 2. Совпадение по СТЕКУ ВАКАНСИИ (+3 балла за каждый тег)
	// Это именно те навыки, которые нужны на это место
	const userSkills = userProfile.tech_stack || [];
	const vacancySkills = vacancy.tech_stack || []; // массив из таблицы vacancies

	const skillMatches = vacancySkills.filter(skill =>
		userSkills.includes(skill),
	);
	score += skillMatches.length * 3;

	// 3. Совпадение по ОБЩЕМУ СТЕКУ ПРОЕКТА (+1 балл)
	// Если у проекта в целом интересный стек
	const projectSkills = vacancy.projects?.tech_stack || [];
	const projectMatches = projectSkills.filter(skill =>
		userSkills.includes(skill),
	);
	score += projectMatches.length * 1;

	return score;
};
