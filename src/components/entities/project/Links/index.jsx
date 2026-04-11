import { detectLinkData } from '@/lib/linkDetector';

const 
ProjectLinks = ({ links = [], className = '' }) => {
	if (links.length === 0) return null;

	return (
		<div
			className={`flex items-center border border-card-border rounded-lg bg-deep-dark/50 overflow-hidden w-fit ${className}`}
		>
			{links.map((link, index) => {
				const { icon: IconComponent, isSocial } = detectLinkData(link.url);

				return (
					<a
						key={index}
						href={link.url}
						target='_blank'
						rel='noopener noreferrer'
						className={`
              flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all
              text-header-icons hover:text-white hover:bg-white/5
              ${index !== 0 ? 'border-l border-card-border' : ''}
            `}
					>
						{!isSocial && <span className='text-brand-purple'>Сайт</span>}
						{IconComponent && <IconComponent size={16} />}
					</a>
				);
			})}
		</div>
	);
};

export default ProjectLinks;
