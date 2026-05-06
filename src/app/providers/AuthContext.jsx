'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchProfile = async sessionUser => {
		if (!sessionUser) return null;
		try {
			const { data: profile, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', sessionUser.id)
				.maybeSingle();

			if (error) throw error;

			// Если профиля нет или он не завершен
			if (!profile || !profile.is_completed) {
				return { ...sessionUser, is_completed: false };
			}

			// Возвращаем полный объект
			return { ...sessionUser, ...profile, is_completed: true };
		} catch (e) {
			console.error('Ошибка загрузки профиля:', e.message);
			// В случае ошибки возвращаем хотя бы базовые данные из Auth
			return { ...sessionUser, is_completed: false };
		}
	};

	const initializeAuth = async () => {
		try {
			setLoading(true);
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session?.user) {
				const fullUser = await fetchProfile(session.user);
				setUser(fullUser);
			} else {
				setUser(null);
			}
		} catch (e) {
			console.error('Auth init error:', e);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		initializeAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT') {
				setUser(null);
				setLoading(false);
				return;
			}

			if (session?.user) {
				// Не включаем loading заново, чтобы UI не "моргал" при обновлении токена
				const fullUser = await fetchProfile(session.user);
				setUser(fullUser);
			}
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				refreshUser: initializeAuth,
				isAuthenticated: !!user && user.is_completed === true,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
