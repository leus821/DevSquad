'use client';

import { Controller } from 'react-hook-form';
import { SUGGESTED_SKILLS } from '@/shared/static/skills';
import { MultiCreatableSelect } from '@/shared/ui';

const SkillsSelect = ({ control, error }) => {
	return (
		<Controller
			name='skills'
			control={control}
			render={({ field }) => (
				<MultiCreatableSelect
					placeholder='Начните вводить: React, Node, Docker...'
					value={field.value || []}
					onChange={field.onChange}
					suggestions={SUGGESTED_SKILLS}
					error={error}
				/>
			)}
		/>
	);
};

export default SkillsSelect;
