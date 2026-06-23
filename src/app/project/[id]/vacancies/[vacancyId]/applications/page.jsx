'use client';
import { Container, Button } from '@/shared/ui'; 
import { UserAvatar } from '@/entities/user';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { Check, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const VacancyApplicationsPage = () => {
	const { id: projectId, vacancyId } = useParams();
	const [profiles, setProfiles] = useState([]);
	const [vacancy, setVacancy] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			

			const { data: vac } = await supabase
				.from('vacancies')
				.select('*')
				.eq('id', vacancyId)
				.single();
			
			setVacancy(vac);

			if (vac?.applicants?.length > 0) {
				

				const { data: users, error } = await supabase
					.from('profiles')
					.select('*')
					.in('id', vac.applicants);
				
				if (!error) setProfiles(users || []);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [vacancyId]);

	const handleAccept = async (candidate) => {
        const confirmText = `Принять ${candidate.full_name} в команду на роль "${vacancy.role}"? \n\nЭто закроет вакансию для других.`;
        if (!confirm(confirmText)) return;
    
        try {
            const { data: projectData, error: projFetchError } = await supabase
                .from('projects')
                .select('members, name')
                .eq('id', projectId)
                .single();
    
            if (projFetchError) throw projFetchError;
    
            const newMember = {
                user_id: candidate.id,
                full_name: candidate.full_name,
                role: vacancy.role, 

                avatar_url: candidate.avatar_url,
                joined_at: new Date().toISOString()
            };
    
            

            

            const currentMembers = Array.isArray(projectData.members) ? projectData.members : [];
            
            const { error: projectUpdateError } = await supabase
                .from('projects')
                .update({ 
                    members: [...currentMembers, newMember] 
                })
                .eq('id', projectId);
    
            if (projectUpdateError) throw projectUpdateError;
    
            

            const { error: vacancyUpdateError } = await supabase
                .from('vacancies')
                .update({ 
                    is_closed: true,
                    applicants: []
                })
                .eq('id', vacancyId);
    
            if (vacancyUpdateError) throw vacancyUpdateError;

            const { data: candidateProfile } = await supabase
                .from('profiles')
                .select('accepted_notifications')
                .eq('id', candidate.id)
                .single();

            const newNotif = {
                project_id: projectId,
                project_name: projectData.name || 'Проект',
                role: vacancy.role,
                accepted_at: new Date().toISOString(),
            };

            const currentNotifs = candidateProfile?.accepted_notifications || [];
            await supabase
                .from('profiles')
                .update({ accepted_notifications: [...currentNotifs, newNotif] })
                .eq('id', candidate.id);
    
            alert('Участник принят! Вакансия закрыта и удалена из общего поиска.');
            
            

            router.push(`/project/${projectId}/vacancies`);
    
        } catch (e) {
            console.error('Ошибка при принятии:', e);
            alert('Не удалось принять участника: ' + e.message);
        }
    };

	if (isLoading) return (
		<div className='min-h-screen flex-all-center'>
			<Loader2 className='animate-spin text-brand-purple' size={40} />
		</div>
	);

	return (
		<main className="py-10">
			<Container>
				<Link 
					href={`/project/${projectId}/vacancies`} 
					className="flex items-center gap-2 text-header-icons hover:text-white mb-6 transition-colors w-fit"
				>
					<ArrowLeft size={16} /> Назад к вакансиям
				</Link>

				<div className="mb-10">
					<h1 className="text-3xl font-bold text-white">Кандидаты</h1>
					<p className="text-header-icons mt-1">
						Роль: <span className="text-brand-purple font-bold">{vacancy?.role}</span>
					</p>
				</div>

				<div className="grid gap-4">
					{profiles.length > 0 ? (
						profiles.map(user => (
							<div key={user.id} className="card p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
								<div className="flex items-center gap-4 w-full">
									<UserAvatar avatarUrl={user.avatar_url} name={user.full_name} className="w-14 h-14" />
									<div className="min-w-0">
										<p className="font-bold text-white text-lg truncate">{user.full_name}</p>
										<p className="text-sm text-header-icons">@{user.username}</p>
										<Link 
											href={`/user/${user.id}`} 
											target="_blank"
											className="text-xs text-brand-purple hover:underline mt-1 block"
										>
											Посмотреть профиль →
										</Link>
									</div>
								</div>
								
								<Button 
									onClick={() => handleAccept(user)} 
									className="gap-2 w-full sm:w-auto px-8 bg-deep-lime text-black hover:bg-opacity-90"
								>
									<Check size={18} strokeWidth={3}/> Принять
								</Button>
							</div>
						))
					) : (
						<div className="card p-20 text-center border-dashed opacity-50">
							<p className="text-white text-lg">На эту вакансию пока никто не откликнулся.</p>
						</div>
					)}
				</div>
			</Container>
		</main>
	);
};

export default VacancyApplicationsPage;