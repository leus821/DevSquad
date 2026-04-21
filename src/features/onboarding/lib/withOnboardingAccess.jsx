'use client';
import { useAuth } from '@/app/providers/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withOnboardingAccess = Component => {
	return function ProtectedOnboarding(props) {
		const { user, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (loading) return;

			if (!user) {
				router.push('/?auth=true');
				return;
			}

			if (user.is_completed) {
				router.push('/');
			}
		}, [user, loading, router]);

		if (loading || !user || user.is_completed) return null;

		return <Component {...props} />;
	};
};

export default withOnboardingAccess;
