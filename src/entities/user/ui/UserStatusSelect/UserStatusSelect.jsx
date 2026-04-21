import { SelectCustom } from '@/shared/ui';

const options = [
	{
		id: 'search',
		value: 'search',
		label: 'Ищу проект',
	},
	{
		id: 'busy',
		value: 'busy',
		label: 'Занят',
	},
	{
		id: 'considering',
		value: 'considering',
		label: 'Рассматриваю предложения',
	},
];

const UserStatusSelect = ({ value, onChange, error, className }) => {
	return (
		<SelectCustom
			value={value}
			onChange={onChange}
			className={className}
			options={options}
			error={error}
		/>
	);
};

export default UserStatusSelect;
