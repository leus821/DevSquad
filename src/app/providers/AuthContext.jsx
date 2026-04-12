'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const setData = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user ?? null);
			setLoading(false);
		};

		setData();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
