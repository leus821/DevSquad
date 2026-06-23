export const getShortProjectName = (projectName, options = {}) => {
	const {
		maxWords = 2,
		maxLetters = 4,
		separator = '\n',
		addDotAfterCut = true,
		toUpperCase = true,
	} = options;

	if (!projectName || typeof projectName !== 'string') {
		return '';
	}

	const specialCases = {
		'щенячий патруль': 'ЩПТР',
		'щенячий патруль 2': 'ЩП-2',
		'щенячий патруль сила щенков': 'ЩПСЩ',
	};

	const lowerInput = projectName.trim().toLowerCase().replace(/\s+/g, ' ');
	if (specialCases[lowerInput]) {
		return specialCases[lowerInput];
	}

	let words = projectName.trim().split(/\s+/);
	words = words.slice(0, maxWords);

	const processed = words
		.map(word => {
			let cleanWord = word.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '');

			if (cleanWord.length === 0) return '';

			if (cleanWord.length > maxLetters) {
				const consonants = cleanWord.replace(/[аеёиоуыэюяaeiou]/gi, '');
				if (consonants.length >= 2 && consonants.length <= maxLetters) {
					cleanWord = consonants;
				} else {
					cleanWord = cleanWord.slice(0, maxLetters);
					if (addDotAfterCut) cleanWord += '.';
				}
			}

			return toUpperCase ? cleanWord.toUpperCase() : cleanWord;
		})
		.filter(w => w.length > 0);

	return processed.join(separator);
};
