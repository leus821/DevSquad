'use client';
import { useMyProjects } from '@/shared/lib/hooks/useMyProjects';
import Link from 'next/link';
import { ProjectHeader } from '@/widgets';
import { ProjectDashboardPanel } from '@/entities/project';
import { Loader2, Plus } from 'lucide-react';
import { Button, Container } from '@/shared/ui';

const MyProjects = () => {
	const { projects, isLoading, canCreate, count } = useMyProjects();

	console.log(projects);

	if (isLoading) {
		return (
			<div className='min-h-[50vh] flex flex-all-center'>
				<Loader2 className='animate-spin text-brand-purple' size={40} />
			</div>
		);
	}

	return (
		<section className='py-10'>
			<Container>
				<div className='flex justify-between items-center mb-8'>
					<h1 className='title'>Мои проекты ({count} из 3)</h1>

					{canCreate && projects.length > 0 && (
						<Button asChild className='gap-2'>
							<Link href='/CreateProject'>
								<Plus size={18} /> Создать проект
							</Link>
						</Button>
					)}
				</div>

				<div className='flex flex-col gap-10'>
					{projects.length > 0 ? (
						projects.map(project => (
							<ProjectHeader
								key={project.id}
								projectId={project.id}
								projectName={project.name}
								slogan={project.slogan}
								links={project.links}
								status={project.status}
								isDashboard={true}
							>
								<ProjectDashboardPanel
									projectId={project.id}
									team={project.members || []}
									totalResponses={project.totalResponses || 0}
								/>
							</ProjectHeader>
						))
					) : (
						<div className='card p-20 flex flex-col items-center gap-6 border-dashed opacity-80'>
							<h3 className='text-xl font-bold text-white'>Здесь пока пусто</h3>
							<Button asChild={true}>
								<Link href='/CreateProject'>Создать первый проект</Link>
							</Button>
						</div>
					)}
				</div>
			</Container>
		</section>
	);
};

export default MyProjects;
