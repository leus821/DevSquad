'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Modal } from '@/shared/ui';

import { Info, ChevronLeft, ChevronRight } from 'lucide-react';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PAGE_HELP_DATA } from '@/shared/static/helpContent';

export const HelpModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState(null);
	const pathname = usePathname();

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'F2') {
				e.preventDefault();

				let foundKey = null;

				if (pathname.includes('/vacancies')) {
					foundKey = 'vacancies';
				} else if (pathname.includes('/project/create')) {
					foundKey = '/project/create';
				} else if (pathname.startsWith('/project/')) {
					foundKey = '/project';
				} else {
					foundKey =
						Object.keys(PAGE_HELP_DATA).find(
							key => key !== '/' && pathname.startsWith(key),
						) || '/';
				}

				const foundContent = PAGE_HELP_DATA[foundKey];

				if (foundContent) {
					setContent(foundContent);
					setIsOpen(true);
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [pathname]);

	if (!content) return null;

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			maxWidth='max-w-7xl'
			title={content.title}
		>
			<div className='p-6 space-y-6'>
				{}
				<div className='relative group rounded-2xl overflow-hidden border border-card-border bg-input'>
					<Swiper
						modules={[Pagination, Navigation]}
						spaceBetween={0}
						slidesPerView={1}
						navigation={{
							nextEl: '.swiper-button-next-custom',
							prevEl: '.swiper-button-prev-custom',
						}}
						pagination={{ clickable: true }}
						className='w-full aspect-video'
					>
						{content.images.map((img, idx) => (
							<SwiperSlide key={idx}>
								<img
									src={img}
									alt={`Инструкция ${idx + 1}`}
									className='w-full h-full object-cover'
								/>
							</SwiperSlide>
						))}
					</Swiper>

					{}
					<button className='swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-purple'>
						<ChevronLeft size={20} />
					</button>
					<button className='swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-purple'>
						<ChevronRight size={20} />
					</button>
				</div>

				{}
				<div className='flex gap-4 items-start bg-white/5 p-5 rounded-2xl border border-card-border'>
					<div className='p-2.5 bg-brand-purple/20 rounded-xl text-brand-purple shrink-0'>
						<Info size={24} />
					</div>
					<div className='space-y-3'>
						<p className='text-white/80 text-sm leading-relaxed'>
							{content.description}
						</p>
						<div className='flex gap-4'>
							<button
								onClick={() => window.open('/docs/help.pdf', '_blank')}
								className='text-brand-purple text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors'
							>
								Открыть PDF-инструкцию
							</button>
						</div>
					</div>
				</div>
			</div>

			{}
			<style jsx global>{`
				.swiper-pagination-bullet {
					background: #94a3b8 !important;
					opacity: 0.5;
				}
				.swiper-pagination-bullet-active {
					background: #6366f1 !important;
					opacity: 1 !important;
					box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
				}
			`}</style>
		</Modal>
	);
};

export default HelpModal;
