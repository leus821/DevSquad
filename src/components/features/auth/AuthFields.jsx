import Input from "@/components/ui/Input";
import { Mail, User, Lock } from "lucide-react";

const AuthFields = ({ isLogin }) => (
	<>
		{!isLogin && (
			<Input
				label='Как вас зовут?'
				icon={User}
				placeholder='Иван Иванов'
				required
			/>
		)}
		<Input
			label='Электронная почта'
			icon={Mail}
			type='email'
			placeholder='you@example.com'
			required
		/>
		<Input
			label='Пароль'
			icon={Lock}
			type='password'
			placeholder='••••••••'
			required
		/>
	</>
);

export default AuthFields;
