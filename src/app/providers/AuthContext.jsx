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

			// Если профиля нет, возвращаем данные из сессии, чтобы не блокировать UI
			return profile ? { ...sessionUser, ...profile } : { ...sessionUser, is_completed: false };
		} catch (e) {
			console.error('Ошибка загрузки профиля:', e.message);
			return { ...sessionUser, is_completed: false };
		}
	};

	const initializeAuth = async () => {
		try {
			setLoading(true);
			const { data: { session } } = await supabase.auth.getSession();

			if (session?.user) {
				// Сначала ставим базовые данные из сессии (email, id),
				// чтобы UI уже мог что-то отобразить
				setUser(session.user);
				// СРАЗУ выключаем лоадер, чтобы сайт не был черным
				setLoading(false); 

				// А теперь спокойно запрашиваем профиль в фоне
				const fullUser = await fetchProfile(session.user);
				if (fullUser) {
					setUser(fullUser);
				}
			} else {
				setUser(null);
				setLoading(false);
			}
		} catch (e) {
			console.error('Auth init error:', e);
			setUser(null);
			setLoading(false);
		}
	};

	useEffect(() => {
		let isMounted = true;

		const init = async () => {
			const { data: { session } } = await supabase.auth.getSession();
			if (session?.user && isMounted) {
				const fullUser = await fetchProfile(session.user);
				setUser(fullUser);
			}
			if (isMounted) setLoading(false);
		};

		init();

		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT') {
				setUser(null);
				setLoading(false);
				return;
			}

			if (session?.user) {
				// Ставим пользователя и выключаем лоадер
				setUser(session.user);
				setLoading(false);

				// Обновляем профиль в фоне
				const fullUser = await fetchProfile(session.user);
				if (fullUser) setUser(fullUser);
			} else {
				setLoading(false);
			}
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
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
