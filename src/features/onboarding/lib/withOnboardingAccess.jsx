'use client';
import { useAuth } from '@/app/providers/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const withOnboardingAccess = Component => {
	return function ProtectedOnboarding(props) {
		const { user, loading } = useAuth();
		const router = useRouter();
		const redirectedRef = useRef(false);

		useEffect(() => {
			if (loading || redirectedRef.current) return;

			if (!user) {
				redirectedRef.current = true;
				router.push('/?auth=true');
				return;
			}

			if (user.is_completed) {
				redirectedRef.current = true;
				router.push('/');
			}
		}, [user, loading, router]);

		if (loading || !user || user.is_completed) return null;

		return <Component {...props} />;
	};
};

export default withOnboardingAccess;
