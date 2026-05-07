import { Vacancy } from '@/entities/vacancy';

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/ui/shadcn/accordion';

const VacancyBlock = ({ vacancyProps }) => {
	return (
		<AccordionItem
			value='vacancy'
			className='bg-card border-card-border border-2 rounded-2xl'
		>
			<AccordionTrigger className='font-bold text-2xl pl-8 pr-6'>
				Вакансия
			</AccordionTrigger>
			<AccordionContent>
				<Vacancy vacancy={vacancyProps} />
			</AccordionContent>
		</AccordionItem>
	);
};

export default VacancyBlock;
