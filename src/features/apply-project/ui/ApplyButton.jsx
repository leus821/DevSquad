'use client';
import { Button } from '@/shared/ui';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ApplyButton = ({ vacancyId, projectId }) => {
	const { user } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState('idle');

	useEffect(() => {
		if (!user || !projectId || !vacancyId) return;

		const checkStatus = async () => {
			const { data: project } = await supabase
				.from('projects')
				.select('members')
				.eq('id', projectId)
				.single();

			const isMember = project?.members?.some(
				m => String(m.user_id) === String(user.id),
			);
			if (isMember) {
				setStatus('member');
				return;
			}

			const { data: vac } = await supabase
				.from('vacancies')
				.select('applicants')
				.eq('id', vacancyId)
				.single();

			if (vac?.applicants?.includes(user.id)) {
				setStatus('applied');
			} else {
				setStatus('idle');
			}
		};

		checkStatus();
	}, [user, projectId, vacancyId]);

	const handleApply = async () => {
		const { data: vac } = await supabase
			.from('vacancies')
			.select('applicants, is_closed')
			.eq('id', vacancyId)
			.single();
		if (vac.is_closed) return alert('Вакансия закрыта');

		const { error } = await supabase
			.from('vacancies')
			.update({ applicants: [...(vac.applicants || []), user.id] })
			.eq('id', vacancyId);

		if (error) throw error;
		setStatus('applied');
		alert('Заявка отправлена!');
	};

	const handleWithdraw = async () => {
		if (!confirm('Вы уверены, что хотите отозвать свой отклик?')) return;

		const { data: vac } = await supabase
			.from('vacancies')
			.select('applicants')
			.eq('id', vacancyId)
			.single();

		const newApplicants = (vac.applicants || []).filter(id => id !== user.id);

		const { error } = await supabase
			.from('vacancies')
			.update({ applicants: newApplicants })
			.eq('id', vacancyId);

		if (error) throw error;

		setStatus('idle');
		alert('Отклик отозван');

		router.refresh();
	};

	const handleClick = async e => {
		e.preventDefault();
		e.stopPropagation();

		if (!user) return alert('Войдите в аккаунт');
		if (!user.is_completed)
			return alert('Заполните профиль, чтобы откликаться на вакансии');
		if (status === 'member') return;

		setLoading(true);
		try {
			if (status === 'applied') {
				await handleWithdraw();
			} else {
				await handleApply();
			}
		} catch (err) {
			alert(err.message);
		} finally {
			setLoading(false);
		}
	};

	const getButtonUI = () => {
		if (status === 'member')
			return {
				text: 'В команде',
				variant: 'ghost',
				disabled: true,
				className:
					'border-deep-lime/50 text-deep-lime opacity-100 cursor-default bg-deep-lime/5',
			};

		if (status === 'applied')
			return {
				text: loading ? '...' : 'Отозвать',
				variant: 'ghost',
				className: 'border-red-500/50 text-red-500 hover:bg-red-500/10',
			};

		return {
			text: loading ? 'Загрузка...' : 'Откликнуться',
			variant: 'primary',
			disabled: false,
		};
	};

	const ui = getButtonUI();

	return (
		<Button
			onClick={handleClick}
			disabled={ui.disabled || loading}
			variant={ui.variant}
			className={`w-full ${ui.className || ''}`}
		>
			{ui.text}
		</Button>
	);
};

export default ApplyButton;
