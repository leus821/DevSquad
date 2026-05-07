'use client';

import { useParams } from 'next/navigation';
import { useProjectDetails } from '@/entities/project';
import { VacancyProject } from '@/widgets';
import { Loader2 } from 'lucide-react';

const ProjectPage = () => {
	const { id } = useParams();
	const { project, loading } = useProjectDetails(id);

	if (loading) {
		return (
			<div className='min-h-screen flex flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}

	return <VacancyProject project={project} vacancy={null} />;
};

export default ProjectPage;
