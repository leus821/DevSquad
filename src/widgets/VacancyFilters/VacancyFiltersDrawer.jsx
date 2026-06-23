'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/shadcn/dialog';
import { Button } from '@/shared/ui';
import { SlidersHorizontal, X } from 'lucide-react';
import VacancyFilters from './VacancyFilters';

const VacancyFiltersDrawer = ({ filters, onChange, onReset, vacanciesCount, filteredCount }) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);

  const handleOpenChange = (open) => {
    setOpen(open);
    if (open) setDraft(filters);
  };

  const handleApply = () => {
    onChange(draft);
    setOpen(false);
  };

  const handleReset = () => {
    setDraft({
      search: '',
      role: [],
      experience: 'all',
      status: 'all',
      stack: [],
    });
    onReset();
    setOpen(false);
  };

  const activeCount = [
    filters.search && 1,
    filters.role.length > 0 && 1,
    filters.experience !== 'all' && 1,
    filters.status !== 'all' && 1,
    filters.stack.length > 0 && 1,
  ].filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className='flex items-center gap-2 px-4 py-2.5 bg-card border border-card-border rounded-xl text-sm font-bold text-white hover:border-brand-purple/50 transition-all'>
          <SlidersHorizontal size={16} />
          Фильтры
          {activeCount > 0 && (
            <span className='bg-brand-purple text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center'>
              {activeCount}
            </span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className='top-0 left-auto right-0 translate-x-0 translate-y-0 h-dvh w-full max-w-md rounded-none p-0 bg-card border border-card-border text-white shadow-2xl data-open:slide-in-from-right data-closed:slide-out-to-right'
      >
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between px-6 py-4 border-b border-card-border shrink-0'>
            <DialogTitle className='text-lg font-bold text-white m-0'>
              Фильтры
            </DialogTitle>
            <DialogTrigger asChild>
              <button className='p-2 text-header-icons hover:text-white rounded-xl hover:bg-white/5 transition-colors'>
                <X size={20} />
              </button>
            </DialogTrigger>
          </div>

          <div className='flex-1 overflow-y-auto p-6'>
            <VacancyFilters
              filters={draft}
              onChange={setDraft}
              onReset={() => setDraft({
                search: '',
                role: [],
                experience: 'all',
                status: 'all',
                stack: [],
              })}
            />
          </div>

          <div className='shrink-0 border-t border-card-border p-4'>
            <div className='flex gap-3'>
              <Button
                variant='ghost'
                onClick={handleReset}
                className='flex-1 border border-card-border'
              >
                Сбросить
              </Button>
              <button
                onClick={handleApply}
                className='flex-1 bg-brand-purple text-white font-bold py-2.5 px-4 rounded-xl hover:bg-brand-purple/90 transition-colors'
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VacancyFiltersDrawer;
