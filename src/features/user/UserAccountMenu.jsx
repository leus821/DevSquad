'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

export function UserAccountMenu() {
	const [isActive, toggleActive] = useState(false);

	return (
		<DropdownMenu onOpenChange={() => toggleActive(prev => !prev)}>
			<DropdownMenuTrigger className='flex items-center gap-2 outline-none hover:opacity-80 transition'>
				<div className='w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700'>
					<User size={18} />
				</div>
				<span>Анастасия</span>
				<ChevronDown
					size={14}
					className={cn(
						'text-muted-foreground ease-in-out duration-200',
						isActive && 'rotate-180',
					)}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer'>
					<User className='mr-2 h-4 w-4' /> Профиль
				</DropdownMenuItem>
				<DropdownMenuItem className='cursor-pointer'>
					<Settings className='mr-2 h-4 w-4' /> Настройки
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='text-red-500 cursor-pointer'>
					<LogOut className='mr-2 h-4 w-4' /> Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
