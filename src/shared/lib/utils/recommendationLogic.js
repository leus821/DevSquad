export const calculateVacancyScore = (vacancy, userProfile) => {
	if (!userProfile) return 0;

	let score = 0;

	const userRole = userProfile.role?.toLowerCase() || '';
	const vacancyRole = vacancy.role_name?.toLowerCase() || '';

	if (vacancyRole.includes(userRole) || userRole.includes(vacancyRole)) {
		score += 15;
	}

	const userSkills = userProfile.tech_stack || [];
	const vacancySkills = vacancy.tech_stack || [];

	const skillMatches = vacancySkills.filter(skill =>
		userSkills.includes(skill),
	);
	score += skillMatches.length * 3;

	const projectSkills = vacancy.projects?.tech_stack || [];
	const projectMatches = projectSkills.filter(skill =>
		userSkills.includes(skill),
	);
	score += projectMatches.length * 1;

	return score;
};
