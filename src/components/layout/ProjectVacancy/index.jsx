import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/shadcn/accordion';
import Skill from '@/components/ui/Skill';

const ProjectVacancy = ({ vacancyProps }) => {
	return (
		<AccordionItem
			value='vacancy'
			className='bg-card border-card-border border-2 rounded-2xl'
		>
			<AccordionTrigger className='font-bold text-2xl pl-8 pr-6'>
				Вакансия
			</AccordionTrigger>
			<AccordionContent>
				<div className='pl-8 pr-6'>
					<p className='text-front text-base'>
						Обязанности: Разработка и поддержка интерфейсов веб-приложений.
						Взаимодействие с дизайнерами и бэкенд-разработчиками. Оптимизация
						производительности и пользовательского опыта. Участие в код-ревью и
						разработке новых функциональных возможностей. Требования: Опыт
						работы с HTML, CSS, JavaScript (ES6+). Знание одного из фреймворков:
						React, Vue.js или Angular. Понимание принципов адаптивной и
						кроссбраузерной верстки. Опыт работы с системами контроля версий
						(Git). Желание обучаться и развиваться. Мы предлагаем: Дружелюбную
						атмосферу и интересные проекты. Возможности для профессионального
						роста. Если вы стремитесь к новым вызовам и хотите стать частью
						нашей команды, отправляйте резюме на [email]. [Название компании] –
						создаем будущее вместе
					</p>
					<h3 className='text-xl font-semibold mt-4 mb-2'>
						Технологический стек
					</h3>
					<ul className='flex flex-wrap gap-2'>
						{vacancyProps.skills.map((item, index) => (
							<li key={index}>
								<Skill className='text-base' skillName={item} />
							</li>
						))}
					</ul>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default ProjectVacancy;
