'use client';

import { useState } from 'react';
import { NAV_ICONS } from '@/shared/static/navigations';
import { useNotifications } from '@/entities/notification';
import NotificationsModal from '@/widgets/NotificationsModal/NotificationsModal';
import Link from 'next/link';

const NavIcons = () => {
  const [open, setOpen] = useState(false);
  const { totalUnread } = useNotifications();

  return (
    <ul className='flex gap-x-3'>
      {NAV_ICONS.map(item => {
        const Icon = item.icon;
        const isBell = item.name === 'Notifications';

        if (isBell) {
          return (
            <li key={item.id} className='relative'>
              <button
                onClick={() => setOpen(true)}
                className='relative'
              >
                <Icon className='fill-header-icons stroke-header-icons hover:fill-white hover:stroke-white transition-colors' />
                {totalUnread > 0 && (
                  <span className='absolute -top-1 -right-1 bg-brand-purple text-white text-[8px] font-black px-1 rounded-full min-w-[14px] text-center leading-4'>
                    {totalUnread > 9 ? '9+' : totalUnread}
                  </span>
                )}
              </button>
              <NotificationsModal open={open} onOpenChange={setOpen} />
            </li>
          );
        }

        return (
          <li key={item.id}>
            <Link href={item.href}>
              <Icon className='fill-header-icons stroke-header-icons' />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavIcons;
