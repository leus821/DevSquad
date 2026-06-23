'use client';

import { useAuth } from '@/app/providers/AuthContext';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const IncompleteProfileBanner = () => {
  const { user, loading } = useAuth();

  if (loading || !user || user.is_completed) return null;

  return (
    <div className='mx-auto px-6 pt-4'>
      <div className='flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400'>
        <div className='p-2 bg-amber-500/20 rounded-xl shrink-0'>
          <AlertTriangle size={20} />
        </div>
        <p className='text-sm font-medium flex-1'>
          Заполните профиль, чтобы откликаться на вакансии
        </p>
        <Link
          href='/myprofile'
          className='flex items-center gap-1.5 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl text-sm font-bold transition-colors shrink-0'
        >
          Заполнить <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default IncompleteProfileBanner;
