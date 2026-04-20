'use client';
import { OnboardingStepper } from '@/features/onboarding';

const OnboardingPage = () => {
	return (
		<section className='min-h-screen bg-deep-dark flex items-center justify-center p-4'>
			<OnboardingStepper />
		</section>
	);
};

export default OnboardingPage;
