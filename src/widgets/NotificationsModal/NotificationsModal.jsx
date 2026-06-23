'use client';

import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/shadcn/dialog';
import { useNotifications } from '@/entities/notification';
import { useAuth } from '@/app/providers/AuthContext';
import {
	Bell,
	UserPlus,
	UserCheck,
	ExternalLink,
	Loader2,
	X,
} from 'lucide-react';
import Link from 'next/link';

const NotificationsModal = ({ open, onOpenChange }) => {
	const {
		applicantNotifications,
		acceptedNotifications,
		totalUnread,
		loading,
		markApplicantsRead,
		markAcceptedRead,
	} = useNotifications();

	const handleClose = async () => {
		await markApplicantsRead();
		await markAcceptedRead();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent
				showCloseButton={false}
				className='top-0 left-auto right-0 translate-x-0 translate-y-0 h-dvh w-full max-w-md rounded-none p-0 data-open:slide-in-from-right data-closed:slide-out-to-right'
			>
				<div className='flex flex-col h-full bg-deep-dark'>
					<div className='flex items-center justify-between px-6 py-4 border-b border-card-border shrink-0'>
						<DialogTitle className='text-lg font-bold text-white m-0 flex items-center gap-2'>
							<Bell size={18} />
							Уведомления
							{totalUnread > 0 && (
								<span className='bg-brand-purple text-white text-[10px] font-black px-1.5 py-0.5 rounded-full'>
									{totalUnread}
								</span>
							)}
						</DialogTitle>
						<button
							onClick={() => onOpenChange(false)}
							className='p-2 text-header-icons hover:text-white rounded-xl hover:bg-white/5 transition-colors'
						>
							<X size={20} />
						</button>
					</div>

					<div className='flex-1 overflow-y-auto p-6 space-y-6'>
						{loading ? (
							<div className='flex justify-center py-10'>
								<Loader2 className='animate-spin text-brand-purple' size={28} />
							</div>
						) : totalUnread === 0 ? (
							<div className='text-center py-16'>
								<Bell size={40} className='mx-auto text-header-icons/30 mb-4' />
								<p className='text-header-icons'>Нет новых уведомлений</p>
							</div>
						) : (
							<>
								{acceptedNotifications.length > 0 && (
									<section>
										<h4 className='text-xs font-bold text-header-icons uppercase tracking-widest mb-3 flex items-center gap-2'>
											<UserCheck size={14} /> Вас приняли
										</h4>
										<div className='space-y-2'>
											{acceptedNotifications.map((n, i) => (
												<div
													key={i}
													className='flex items-center gap-3 p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20'
												>
													<div className='p-1.5 bg-brand-purple/20 rounded-lg text-brand-purple shrink-0'>
														<UserCheck size={16} />
													</div>
													<div className='flex-1 min-w-0'>
														<p className='text-sm text-white font-medium truncate'>
															{n.project_name}
														</p>
														<p className='text-xs text-header-icons'>
															Роль: {n.role}
														</p>
													</div>
													<Link
														href={`/project/${n.project_id}`}
														onClick={() => onOpenChange(false)}
														className='p-1.5 text-header-icons hover:text-white rounded-lg hover:bg-white/5 transition-colors shrink-0'
													>
														<ExternalLink size={16} />
													</Link>
												</div>
											))}
										</div>
										<button
											onClick={markAcceptedRead}
											className='mt-2 text-xs text-brand-purple hover:text-white font-bold uppercase tracking-widest transition-colors'
										>
											Отметить прочитанным
										</button>
									</section>
								)}

								{applicantNotifications.length > 0 && (
									<section>
										<h4 className='text-xs font-bold text-header-icons uppercase tracking-widest mb-3 flex items-center gap-2'>
											<UserPlus size={14} /> Новые отклики
										</h4>
										<div className='space-y-2'>
											{applicantNotifications.map(vac => (
												<div
													key={vac.id}
													className='flex items-center gap-3 p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20'
												>
													<div className='p-1.5 bg-brand-purple/20 rounded-lg text-brand-purple shrink-0'>
														<UserPlus size={16} />
													</div>
													<div className='flex-1 min-w-0'>
														<p className='text-sm text-white font-medium truncate'>
															{vac.projects?.name}
														</p>
														<p className='text-xs text-header-icons'>
															{vac.applicants?.length || 0} откл. · {vac.role}
														</p>
													</div>
													<Link
														href={`/project/${vac.project_id}/vacancies/${vac.id}/applications`}
														onClick={() => onOpenChange(false)}
														className='text-xs text-brand-purple hover:text-white font-bold uppercase tracking-widest shrink-0 transition-colors'
													>
														Смотреть
													</Link>
												</div>
											))}
										</div>
										<button
											onClick={markApplicantsRead}
											className='mt-2 text-xs text-brand-purple hover:text-white font-bold uppercase tracking-widest transition-colors'
										>
											Отметить прочитанным
										</button>
									</section>
								)}
							</>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default NotificationsModal;
