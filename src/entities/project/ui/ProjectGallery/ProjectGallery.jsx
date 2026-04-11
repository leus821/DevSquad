import { Image } from '@/shared/ui';

const ProjectGallery = () => {
	return (
		<div className='flex gap-5'>
			{Array(3)
				.fill(null)
				.map((_, index) => (
					<Image
						key={index}
						src='https://yastatic.net/naydex/yandex-search/bwO8Sc021/0eb805Mz8g/KF-GzqN20WlZQQgE3314imEFkv_ZOL6ndW0Of7rristnXdVWb6fUmisizKMnlpPMkgHitDfcoWAUvitV8y0mIzxbxYLkN8oxCQQfUNd-fYh8WNHuxWK6-m8vUiCu6YKVNFy-Ok_fofJVRefXWu_eycUHs_QpyrIGLQ'
						className='rounded-xl w-1/3'
					/>
				))}
		</div>
	);
};

export default ProjectGallery;
