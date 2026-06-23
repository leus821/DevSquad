'use client';

import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/providers/AuthContext';
import { UserAvatar } from '@/entities/user';

function UserAccountMenu({ handleUserExit }) {
	const { user } = useAuth();
	const [isActive, toggleActive] = useState(false);

	return (
		<DropdownMenu onOpenChange={() => toggleActive(prev => !prev)}>
			<DropdownMenuTrigger className='flex items-center gap-2 outline-none hover:opacity-80 transition'>
				<div className='w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700'>
					<UserAvatar
						iconSize={20}
						className='h-full w-full border'
						avatarUrl={user?.avatar_url}
					/>
				</div>
				<span>{user?.full_name || user?.user_metadata?.name}</span>
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
				<DropdownMenuItem>
					<Link className='flex items-center' href={`/user/${user.id}`}>
						<User className='mr-2 h-4 w-4' /> Профиль
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />
				<DropdownMenuItem className='text-red-500'>
					<button onClick={handleUserExit} className='flex-all-center'>
						<LogOut className='mr-2 h-4 w-4' /> Выйти
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserAccountMenu;
