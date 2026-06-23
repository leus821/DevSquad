export const MOCK_CARDS = [
	{
		id: '1',
		title: 'StudHome — Умный дом для студентов',
		description:
			'Делаем Uber для выгула капибар. Есть готовое приложение на iOS, ищем технаря для реализации бэкенда и интеграции с умными датчиками в общежитиях.',
		image_url:
			'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
		status: 'Идея',
		is_bookmarked: true,
		vacancy: {
			role: 'Начинающий frontend разработчик',
			experience: 'Опыт от 1 года',
			skills: ['React', 'Next.js', 'Tailwind'],
		},
	},
	{
		id: '2',
		title: 'DevSquad Platform',
		description:
			'Социальная сеть для поиска единомышленников в IT-проекты. Мы создаем пространство, где идеи превращаются в код. Нужен опытный дизайнер для UX-аудита.',
		image_url:
			'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
		status: 'MVP',
		is_bookmarked: false,
		vacancy: {
			role: 'UI/UX Дизайнер (Senior)',
			experience: 'Опыт от 3 лет',
			skills: ['Figma', 'Prototyping', 'UX Research'],
		},
	},
	{
		id: '3',
		title: 'GreenMind — Эко-трекер',
		description:
			'Мобильное приложение для отслеживания углеродного следа. Используем машинное обучение для анализа покупок. Ищем специалиста по Python и FastAPI.',
		image_url:
			'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
		status: 'В разработке',
		is_bookmarked: false,
		vacancy: {
			role: 'Backend разработчик',
			experience: 'Без опыта / Intern',
			skills: ['Python', 'FastAPI', 'PostgreSQL'],
		},
	},
	{
		id: '4',
		title: 'CryptoFlow Dashboard',
		description:
			'Аналитический сервис для мониторинга DeFi протоколов в реальном времени. Сложные графики, работа с Web3. Нужен человек, который не боится математики.',
		image_url:
			'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
		status: 'Запущен',
		is_bookmarked: true,
		vacancy: {
			role: 'Fullstack разработчик',
			experience: 'Опыт от 2 лет',
			skills: ['React', 'Go', 'Web3.js'],
		},
	},
	{
		id: '5',
		title: 'EduSpace Kids',
		description:
			'Интерактивная платформа для обучения детей программированию через игры. Мы верим, что каждый ребенок — будущий инженер. Ищем крутого фронтенда.',
		image_url:
			'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
		status: 'MVP',
		is_bookmarked: false,
		vacancy: {
			role: 'Frontend разработчик',
			experience: 'Опыт от 1 года',
			skills: ['Vue.js', 'Canvas', 'TypeScript'],
		},
	},
	{
		id: '6',
		title: 'PetPal — Сервис для животных',
		description:
			'Помогаем найти передержку для питомцев на время отпуска. Масштабируемся на всю страну. Ищем сильного бэкенд-разработчика для оптимизации архитектуры.',
		image_url:
			'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=800&q=80',
		status: 'Запущен',
		is_bookmarked: true,
		vacancy: {
			role: 'Node.js разработчик',
			experience: 'Опыт от 3 лет',
			skills: ['Node.js', 'NestJS', 'Redis'],
		},
	},
];

export const TEAMLIST = [
	{
		id: 1,
		name: 'Даниил колбасенко',
		role: 'CEO',
		avatarUrl:
			'https://avatars.mds.yandex.net/i?id=6f2fa2e29019048d55dc0de3cdd5ffd2_l-5350111-images-thumbs&n=13',
	},
	{
		id: 2,
		name: 'Даниил колбасенко',
		role: 'CEO',
		avatarUrl:
			'https://avatars.mds.yandex.net/i?id=6f2fa2e29019048d55dc0de3cdd5ffd2_l-5350111-images-thumbs&n=13',
	},
	{
		id: 3,
		name: 'Даниил колбасенко',
		role: 'CEO',
		avatarUrl:
			'https://avatars.mds.yandex.net/i?id=6f2fa2e29019048d55dc0de3cdd5ffd2_l-5350111-images-thumbs&n=13',
	},
];


export const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Даниил Колбасенко',
    avatar: 'https://i.pravatar.cc/150?u=daniil', 
    role: 'Senior Fullstack Developer',
    github: 'https://github.com/daniil'
  },
  {
    id: 'u2',
    name: 'Александр Тортяков',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    role: 'CEO / Project Manager',
    github: 'https://github.com/alex'
  },
  {
    id: 'u3',
    name: 'Мария Иванова',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    role: 'UI/UX Designer',
    github: 'https://github.com/maria'
  },
  {
    id: 'u4',
    name: 'Иван Сидоров',
    avatar: 'https://i.pravatar.cc/150?u=ivan',
    role: 'Backend Developer',
    github: 'https://github.com/ivan'
  }
];


export const MOCK_PROJECT = {
  id: 'p1',
  name: 'STUD HOME',
  description: 'Платформа для прогноза погоды и управления умным домом и другими крутыми проектами',
  status: 'Идея', 
  links: [
    { url: 'https://studhome.com' },
    { url: 'https://vk.com/studhome' },
    { url: 'https://youtube.com/studhome' },
    { url: 'https://github.com/studhome' }
  ],
  
  stats: {
    views: '1.2k',
    totalResponses: 25,
    newResponses: 12
  },
  
  team: [
    MOCK_USERS[0],
    MOCK_USERS[1],
    MOCK_USERS[2],
    MOCK_USERS[3]
  ],
  
  tags: ['React', 'Node.js', 'Tailwind', 'Framer Motion']
};