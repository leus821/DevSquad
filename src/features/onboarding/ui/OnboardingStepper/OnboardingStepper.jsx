'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/app/providers/AuthContext';
import { useOnboarding, withOnboardingAccess } from '@/features/onboarding';
import { cn } from '@/shared/lib/utils/commonUtils';
import { onboardingSchema } from '../../model/onBoardingSchema';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { Button, ErrorField } from '@/shared/ui';
import { Progress } from '@/shared/ui/shadcn/progress';
import { ArrowRight, Check } from 'lucide-react';

const OnboardingStepper = () => {
	const [step, setStep] = useState(1);
	const { user } = useAuth();
	const { submitProfile, loading, error: apiError } = useOnboarding();

	const {
		register,
		handleSubmit,
		setValue,
		control,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(onboardingSchema),
		mode: 'onTouched',
		defaultValues: {
			username: '',
			status: 'search',
			hours_available: 20,
			bio: '',
			role: '',
		},
	});

	const handleNextStep = async () => {
		const fieldsByStep = {
			1: ['role'],
			2: ['username', 'status', 'hours_available'],
		};

		const isStepValid = await trigger(fieldsByStep[step]);
		if (isStepValid) setStep(s => s + 1);
	};

	const onSubmit = async data => {
		if (!user) return;
		await submitProfile(user.id, data);
	};

	return (
		<div className='w-full max-w-2xl bg-card border border-card-border rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500'>
			<Progress value={(step / 3) * 100} />

			<div className='p-8 md:p-6'>
				<div className='mb-10 text-center'>
					<p className='text-brand-purple text-xs font-black uppercase tracking-[0.3em] mb-3'>
						Шаг {step} из 3
					</p>
					<h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
						{step === 1 && 'Давайте познакомимся'}
						{step === 2 && 'Ваш опыт и навыки'}
						{step === 3 && 'Последние штрихи'}
					</h1>
				</div>

				<div className='min-h-80'>
					{step === 1 && (
						<StepOne
							setValue={setValue}
							register={register}
							control={control}
						/>
					)}
					{step === 2 && <StepTwo control={control} register={register} />}
					{step === 3 && <StepThree control={control} register={register} />}
				</div>

				{apiError && <ErrorField errorText={apiError} />}

				<footer className='flex justify-between items-center mt-6 pt-8 border-t border-card-border/50'>
					<button
						onClick={() => setStep(s => s - 1)}
						className={cn(
							'text-header-icons hover:text-white font-bold text-sm transition-colors',
							step === 1 && 'invisible',
						)}
					>
						Назад
					</button>

					{step < 3 ? (
						<Button
							onClick={handleNextStep}
							className='gap-2 px-10 h-14 text-base'
						>
							Продолжить <ArrowRight size={20} />
						</Button>
					) : (
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={loading}
							className='gap-2 px-10 h-14 text-base bg-deep-lime text-black hover:bg-[#00e685] border-none'
						>
							{loading ? 'Сохраняем...' : 'Завершить'}
							<Check size={20} strokeWidth={3} />
						</Button>
					)}
				</footer>
			</div>
		</div>
	);
};

export default withOnboardingAccess(OnboardingStepper);
