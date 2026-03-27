import ProjectCard from '@/components/entities/project-card';
import Container from '@/components/ui/Container';

const Home = () => {
	return (
		<Container>
			<div className='grid grid-cols-3 gap-x-8 gap-y-5'>
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
			</div>
		</Container>
	);
};

export default Home;
