'use client';

import CreatableSelect from 'react-select/creatable';
import { cn } from '@/shared/lib/utils/commonUtils';
import { ErrorField } from '@/shared/ui';

const MultiCreatableSelect = ({
	label,
	value = [],
	onChange,
	suggestions = [],
	placeholder = 'Начните вводить (например: React)...',
	error,
	name,
}) => {
	const formattedValue = value.map(skill => ({ label: skill, value: skill }));

	const handleChange = selected => {
		onChange(selected ? selected.map(item => item.value.toLowerCase()) : []);
	};

	return (
		<div className='w-full space-y-1.5 text-left'>
			{label && (
				<label className='text-xs font-bold text-header-icons uppercase ml-1 '>
					{label}
				</label>
			)}

			<CreatableSelect
				isMulti
				value={formattedValue}
				onChange={handleChange}
				options={suggestions}
				placeholder={placeholder}
				instanceId={name || 'tech-stack-select'}
				formatCreateLabel={inputValue => `Добавить "${inputValue}"`}
				unstyled
				isValidNewOption={inputValue => {
					return (
						inputValue.trim().length >= 1 && inputValue.trim().length <= 30
					);
				}}
				noOptionsMessage={({ inputValue }) =>
					inputValue.length > 30
						? 'Слишком длинное название'
						: 'Ничего не найдено'
				}
				classNames={{
					control: state =>
						cn(
							'w-full bg-input border rounded-xl min-h-[52px] px-2 transition-all cursor-text',
							state.isFocused
								? 'border-brand-purple shadow-[0_0_15px_rgba(99,102,241,0.1)]'
								: 'border-card-border hover:border-brand-purple/50',
							error && 'border-red-500',
						),
					menu: () =>
						'bg-[#151921] border border-card-border rounded-xl shadow-2xl mt-2 overflow-hidden z-50',
					menuList: () => 'p-1 custom-scrollbar max-h-60',
					option: state =>
						cn(
							'px-4 py-2.5 text-sm rounded-lg cursor-pointer transition-colors',
							state.isFocused
								? 'bg-brand-purple/20 text-white'
								: 'text-header-icons hover:text-white',
						),
					multiValue: () =>
						'bg-brand-purple/10 border border-brand-purple/30 rounded-full m-1 flex items-center',
					multiValueLabel: () =>
						'text-brand-purple text-[11px] font-bold uppercase  px-3 py-1',
					multiValueRemove: () =>
						'text-brand-purple hover:bg-brand-purple hover:text-white rounded-r-full px-2 transition-colors cursor-pointer',
					input: () => 'text-white text-sm ml-1',
					placeholder: () => 'text-header-icons/50 text-sm ml-2',
					clearIndicator: () =>
						'text-header-icons hover:text-white p-2 cursor-pointer',
					dropdownIndicator: () =>
						'text-header-icons hover:text-white p-2 cursor-pointer',
				}}
			/>

			{error && <ErrorField errorText={error.message} />}
		</div>
	);
};

export default MultiCreatableSelect;
