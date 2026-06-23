'use client';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '@/shared/lib/supabase';

const AuthContext = createContext({});

const isProfileCompleted = profile => {
	if (!profile) return false;
	const required = ['name', 'surname', 'username', 'role', 'bio', 'status', 'hours_available'];
	const hasAllRequired = required.every(field => {
		const val = profile[field];
		return val !== null && val !== undefined && val !== '';
	});
	if (!hasAllRequired) return false;
	const infoFields = ['location', 'languages', 'education'];
	const hasInfo = infoFields.some(field => {
		const val = profile[field];
		return val !== null && val !== undefined && val !== '';
	});
	const socialFields = ['github_url', 'telegram'];
	const hasSocial = socialFields.some(field => {
		const val = profile[field];
		return val !== null && val !== undefined && val !== '';
	});
	const hasSkills = profile.skills?.length > 0;
	return hasInfo || hasSocial || hasSkills;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const fetchingRef = useRef(false);

	const fetchProfile = async sessionUser => {
		if (!sessionUser) return null;
		try {
			const { data: profile, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', sessionUser.id)
				.maybeSingle();

			if (error) throw error;

			if (profile) {
				const merged = { ...sessionUser, ...profile };
				merged.is_completed = isProfileCompleted(profile);
				return merged;
			}
			return { ...sessionUser, is_completed: false };
		} catch (e) {
			console.error('Auth: fetchProfile error:', e.message);
			return { ...sessionUser, is_completed: false };
		}
	};

	useEffect(() => {
		let isMounted = true;

		const init = async () => {
			setLoading(true);
			const { data: { session } } = await supabase.auth.getSession();

			if (!isMounted) return;

			if (session?.user) {
				setUser(session.user);
				setLoading(false);
				const fullUser = await fetchProfile(session.user);
				if (isMounted && fullUser) setUser(fullUser);
			} else {
				setUser(null);
				setLoading(false);
			}
		};

		init();

		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (!isMounted) return;

			if (event === 'SIGNED_OUT') {
				setUser(null);
				setLoading(false);
				return;
			}

			if (session?.user) {
				setUser(session.user);
				setLoading(false);
				const fullUser = await fetchProfile(session.user);
				if (isMounted && fullUser) setUser(fullUser);
			} else {
				setLoading(false);
			}
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, []);

	const refreshUser = async () => {
		if (fetchingRef.current) return;
		fetchingRef.current = true;
		try {
			const { data: { session } } = await supabase.auth.getSession();
			if (session?.user) {
				const fullUser = await fetchProfile(session.user);
				if (fullUser) setUser(fullUser);
			}
		} finally {
			fetchingRef.current = false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				refreshUser,
				isAuthenticated: !!user && user.is_completed === true,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
