'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { ProjectHeader } from '@/widgets';
import { useProjectIdentity } from '@/entities/project';
import { Button, Container, Quantity, RemoveButton } from '@/shared/ui';
import { Loader2, Plus, Edit2 } from 'lucide-react';
import Link from 'next/link';

const ProjectVacanciesPage = () => {
    const { id: projectId } = useParams();
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
	
	const { project: identity, loading: identityLoading } = useProjectIdentity(projectId);

    const fetchVacancies = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('vacancies')
                .select('*')
                .eq('project_id', projectId);
            
            if (error) throw error;
            setVacancies(data || []);
        } catch (err) {
            console.error('Error fetching vacancies:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (vacancyId) => {
        if (!confirm('Вы уверены, что хотите удалить эту вакансию?')) return;

        try {
            const { error } = await supabase
                .from('vacancies')
                .delete()
                .eq('id', vacancyId);

            if (error) throw error;

            // Мгновенно удаляем из списка на экране
            setVacancies(prev => prev.filter(v => v.id !== vacancyId));
        } catch (err) {
            alert('Ошибка при удалении: ' + err.message);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, [projectId]);

    if (isLoading || identityLoading) {
        return (
            <div className='min-h-screen flex-all-center'>
                <Loader2 className='animate-spin text-brand-purple' size={40} />
            </div>
        );
    }

    return (
        <main className='py-10'>
            <Container>
                <ProjectHeader 
                    projectName={identity?.name} 
                    slogan={identity?.slogan} 
                    status={identity?.status}
                    isDashboard={true}
                    projectId={projectId}
                />

                <div className='flex justify-between items-center mb-8'>
                    <div className='flex items-center gap-4'>
                        <h1 className='text-3xl font-bold text-white'>Вакансии проекта</h1>
                        <Quantity quantity={vacancies.length} outOf={10} text="создано" />
                    </div>
                    
                    {vacancies.length < 10 && (
                        <Button asChild className='gap-2'>
                            <Link href={`/project/${projectId}/vacancies/create`}>
                                <Plus size={18} /> Создать вакансию
                            </Link>
                        </Button>
                    )}
                </div>

                <div className='grid gap-4'>
                    {vacancies.length > 0 ? (
                        vacancies.map(vacancy => (
                            <div 
                                key={vacancy.id} 
                                className='card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:border-brand-purple/30'
                            >
                                <div className='flex-1 min-w-0'>
                                    <h3 className='text-xl font-bold text-white truncate'>{vacancy.role}</h3>
                                    <p className='text-header-icons text-sm mt-1 line-clamp-2 leading-relaxed break-all'>
                                        {vacancy.hook}
                                    </p>
                                </div>

                                <div className='flex gap-3 shrink-0'>
                                    <Button variant='ghost' asChild size="sm" className="border-card-border hover:border-brand-purple/50">
                                        <Link href={`/project/${projectId}/vacancies/${vacancy.id}`}>
                                            <Edit2 size={16} className='mr-2'/> Редактировать
                                        </Link>
                                    </Button>

                                    <RemoveButton 
                                        onClick={() => handleDelete(vacancy.id)}
                                        className="rounded-xl"
                                        type="colored"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='card p-20 text-center opacity-50 border-dashed'>
                            <p>У проекта пока нет активных вакансий</p>
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
};

export default ProjectVacanciesPage;