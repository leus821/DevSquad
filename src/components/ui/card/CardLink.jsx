import Link from 'next/link';

const CardLink = ({ href }) => {
	return (
		<Link
			href={href}
			className="absolute inset-0 z-0 after:content-[''] after:absolute after:inset-0"
			aria-hidden='true'
		/>
	);
};

export default CardLink;
