import { ProjectHeader } from '@/widgets';
import { Container } from '@/shared/ui';
import { MOCK_PROJECT } from '@/shared/static/mock_data';
import { ProjectDashboardPanel } from '@/entities/project';

const MyProjects = () => {
	return (
		<section>
			<Container>
				<h1 className='title mb-4'>Мои проекты (1 из 3)</h1>
				<ProjectHeader isDashboard={true}>
					<ProjectDashboardPanel
						team={MOCK_PROJECT.team}
						stats={MOCK_PROJECT.stats}
					/>
				</ProjectHeader>
			</Container>
		</section>
	);
};

export default MyProjects;
