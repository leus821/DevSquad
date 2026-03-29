import ProjectCard from '@/components/entities/project-card';
import Container from '@/components/ui/Container';
import { MOCK_CARDS } from '@/constants/mock_data';

const Home = () => {
	return (
		<Container>
			<div className='grid grid-cols-3 gap-x-8 gap-y-5'>
				{MOCK_CARDS.map(item => (
					<ProjectCard
						key={item.id}
						title={item.title}
						description={item.description}
						imageUrl={item.image_url}
						vacancy={item.vacancy}
						status={item.status}
						isBookmarked={item.is_bookmarked}
					/>
				))}
			</div>
		</Container>
	);
};

export default Home;
