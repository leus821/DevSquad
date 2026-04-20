import { Send, MapPin, Languages, GraduationCap, Save } from 'lucide-react';
import { Button, Input, card } from '@/shared/ui';
import { ImageUploader } from '@/features/upload-image';
import { Github, Vk } from '@/shared/assets/icons';

const ProfileEditPage = () => {
	return (
		<section className='container-wide py-10'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold text-white'>
					Редактирование профиля
				</h1>
				<div className='flex gap-3'>
					<Button variant='ghost'>Отмена</Button>
					<Button className='gap-2'>
						<Save size={18} /> Сохранить изменения
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start'>
				{/* ЛЕВАЯ КОЛОНКА (Сайдбар) */}
				<aside className='flex flex-col gap-6'>
					{/* Блок Статус */}
					<div className='card p-6 flex flex-col gap-4'>
						<h3 className='text-header-icons text-xs font-bold uppercase tracking-wider'>
							Статус
						</h3>
						<div className='flex flex-col gap-3'>
							<label className='text-sm text-white'>Ваша занятость</label>
							<select className='w-full bg-black/20 border border-card-border rounded-xl px-4 py-3 text-white outline-none focus:border-brand-purple transition-all'>
								<option>Ищу проект</option>
								<option>В команде</option>
								<option>Занят</option>
							</select>
							<Input label='Часов в неделю' type='number' placeholder='20' />
						</div>
					</div>

					<div className='card p-6 flex flex-col gap-5'>
						<h3 className='text-header-icons text-xs font-bold uppercase tracking-wider'>
							Инфо
						</h3>
						<Input icon={MapPin} label='Локация' placeholder='Пермь, +2 МСК' />
						<Input
							icon={Languages}
							label='Языки'
							placeholder='Русский, English (B2)'
						/>
						<Input
							icon={GraduationCap}
							label='Образование'
							placeholder='НИУ ВШЭ Пермь'
						/>
					</div>

					{/* Блок Соцсети */}
					<div className='card p-6 flex flex-col gap-5'>
						<h3 className='text-header-icons text-xs font-bold uppercase tracking-wider'>
							Соц. сети
						</h3>
						<Input
							icon={Github}
							label='GitHub'
							placeholder='github.com/username'
						/>
						<Input icon={Send} label='Telegram' placeholder='@username' />
						<Input
							icon={Vk}
							label='LinkedIn'
							placeholder='linkedin.com/in/...'
						/>
					</div>
				</aside>

				{/* ПРАВАЯ КОЛОНКА (Основной контент) */}
				<main className='flex flex-col gap-8'>
					{/* Главная карточка (Аватар + Имя) */}
					<div className='card p-8 flex flex-col md:flex-row gap-8 items-center md:items-start'>
						<div className='flex flex-col items-center gap-3'>
							<ImageUploader className='w-40 h-40' />
							<span className='text-[10px] text-header-icons uppercase font-bold'>
								Сменить фото
							</span>
						</div>

						<div className='flex flex-col gap-5 flex-grow w-full'>
							<Input
								label='Полное имя'
								placeholder='Даниил Колбасенко'
								className='text-xl font-bold'
							/>
							<Input
								label='Ваша роль'
								placeholder='Senior Fullstack Developer | React & Go'
							/>
							<Input label='Никнейм (@)' placeholder='daniil_dev' />
						</div>
					</div>

					{/* Блок О себе */}
					<div className='card p-8 flex flex-col gap-4'>
						<h3 className='text-white text-lg font-bold'>О себе</h3>
						<textarea
							placeholder='Расскажите о своем опыте, целях и интересах...'
							className='w-full min-h-[200px] bg-black/20 border border-card-border rounded-2xl p-5 text-header-icons focus:text-white outline-none focus:border-brand-purple transition-all resize-none leading-relaxed'
						/>
						<p className='text-[10px] text-header-icons text-right'>
							0 / 2000 символов
						</p>
					</div>

					{/* Блок Технологии (Упрощенно) */}
					<div className='card p-8 flex flex-col gap-6'>
						<h3 className='text-white text-lg font-bold'>
							Технологический стек
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<Input
								label='Языки программирования'
								placeholder='React, Go, Python...'
							/>
							<Input
								label='Фреймворки'
								placeholder='Next.js, Gin, Tailwind...'
							/>
							<Input label='Инструменты' placeholder='Figma, Docker, Git...' />
						</div>
					</div>
				</main>
			</div>
		</section>
	);
};

export default ProfileEditPage;
