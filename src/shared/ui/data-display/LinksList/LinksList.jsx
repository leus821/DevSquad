import { LinkIcon } from '@/shared/ui';

const LinksList = ({ links = [], className = '' }) => {
	if (links.length === 0) return null;

	return (
		<div
			className={`flex items-center border border-card-border rounded-lg bg-deep-dark/50 overflow-hidden w-fit ${className}`}
		>
			{links.map((link, index) => (
				<a
					key={index}
					href={link.url}
					target='_blank'
					rel='noopener noreferrer'
					className={`
              flex items-center gap-2 px-2 py-0.5 text-sm font-medium transition-all
              text-header-icons hover:text-white hover:bg-white/5
              ${index !== 0 ? 'border-l border-card-border' : ''}
            `}
				>
					<LinkIcon
						linkName={link.label}
						className='p-1.5 flex gap-1 items-center bg-transparent'
						url={link.url}
					/>
				</a>
			))}
		</div>
	);
};

export default LinksList;
