import { supabase } from '@/shared/lib/supabase';

export const uploadFile = async (fileData, bucket, folder = '') => {
	// 1. Если данных нет или это уже готовая ссылка (начинается с http) — просто возвращаем её
	if (!fileData) return null;
	if (typeof fileData === 'string' && fileData.startsWith('http'))
		return fileData;

	try {
		let body = fileData;

		// 2. Обрабатываем строки (DataURL или BlobURL)
		if (
			typeof fileData === 'string' &&
			(fileData.startsWith('data:') || fileData.startsWith('blob:'))
		) {
			const res = await fetch(fileData);
			body = await res.blob();
		}

		const fileExt = 'jpg';
		const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
		const filePath = folder ? `${folder}/${fileName}` : fileName;

		// 3. Загружаем в Storage
		const { error: uploadError } = await supabase.storage
			.from(bucket)
			.upload(filePath, body, {
				cacheControl: '3600',
				upsert: false,
			});

		if (uploadError) throw uploadError;

		// 4. Получаем публичную ссылку
		const {
			data: { publicUrl },
		} = supabase.storage.from(bucket).getPublicUrl(filePath);

		return publicUrl;
	} catch (error) {
		console.error('Ошибка загрузки файла:', error.message);
		throw error;
	}
};
