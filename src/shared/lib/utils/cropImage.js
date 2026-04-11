export const createImage = url =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', error => reject(error));

		// ВАЖНО: crossOrigin нужен только для внешних ссылок (http/https).
		// Для data: URL (локальных файлов) он вызывает ошибку в браузерах.
		if (url && !url.startsWith('data:')) {
			image.setAttribute('crossOrigin', 'anonymous');
		}

		image.src = url;
	});

export async function getCroppedImg(imageSrc, pixelCrop) {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) return null;

	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height,
	);

	return new Promise((resolve, reject) => {
		canvas.toBlob(
			blob => {
				if (!blob) {
					reject(new Error('Canvas is empty'));
					return;
				}
				const fileUrl = URL.createObjectURL(blob);
				resolve(fileUrl);
			},
			'image/jpeg',
			0.9,
		);
	});
}
