import ProjectDashboardPanel from '@/components/layout/ProjectDashboardPanel';
import ProjectHeader from '@/components/layout/ProjectHeader';
import Container from '@/components/ui/Container';
import { MOCK_PROJECT, MOCK_USERS } from '@/constants/mock_data';

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
