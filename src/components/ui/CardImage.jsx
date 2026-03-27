const CardImage = () => {
	return (
		<div className='relative w-full aspect-[16/7] overflow-hidden rounded-t-xl bg-slate-900'>
			<img
				src='https://yandex-images.clstorage.net/z1v0S0323/f7ccb9wKabCs/d2ErPHW4UnlHEhG5AAnK3DWjmKmXHsEWvOV2qA1dNSUlqY4L-4l4z4jxqLR3J1ZqrZUqYVV3YibcBVXda6yB2QZ170h0bQdN9mdROTBZ6wnhkolsN1sQspklkt3Y3dAAMx8MCfnKynkqM_o2htcmmqiRKwVxoaT3ijEhae6oIYzEYAjfYzmQSzEiIfmDOdu4hTKIn-YrwWe7xwKJeUpEZ2B9vFv5GKr6uBCph0Q3dplKYt-EE-PUcOgRQCnN6XE-5PA7LzD4wmpA4KIq4enoa0Wiq39UyRLmWyRSuEk6tJZQH876mTo7iImR-_fENCVZm_D_twPQZDC4kmKoHdnD_8bSmwwiy6J4spACqLAZ6cj1YLq8NvvCJCglEFrIC6f1MK9eCanIqflqYCsH5id3W2vC_4cCIgRB-ZLx6awrEv004LgvUEhSaQNRQTmC-PsYVXNL3FdbIaWJdZK4SVrVZeF_nQtZKekYK-CateUlBkgaM_30caPHU0giEHmeeULcJNJIzeF6QQigoBM4oGvKO1YQWI4EyCO2OReg2jt4RmQQXr4rixqpKrry-kdWB7aqWqG9lzJTFjG5wBNaXvrhLDcBCY8Sa-LZ42HymQC6m5r1wxsvpzux5OhVYbtZmMRUQB_sKsir6fgoEtglNhd2mIhBjZUxoqUzOTKQui3bYE60wFqcMwoDaLJTMUiCqNkIBwDZfzcr08S5hDEZ-Xj3V2N8LNj5mcqZSBN6xqV0ZDjKs--mgVB0chkwshitq7DNBFBbXWM6AFsSY9PromobmucRi9xmmwO12nZjiuh7l2Wwvczoqsg5mMmi-YX3BaRZ6EHNJDIBZUIJ4MCqzFrj3RVDG34iK5BYI9AQm1LYiRhFsotvlJhzxBmVg3gbq5ZHc3_cmnvaeYp6I1p2VaXW2inhjfTSQKczWVHTi3zbMS1k4Bg-EYpRKVJisgrTOQlod4FKn3cLU7d5JNFqI'
				className='absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110'
				alt='background blur'
			/>
			<img
				src='https://yandex-images.clstorage.net/z1v0S0323/f7ccb9wKabCs/d2ErPHW4UnlHEhG5AAnK3DWjmKmXHsEWvOV2qA1dNSUlqY4L-4l4z4jxqLR3J1ZqrZUqYVV3YibcBVXda6yB2QZ170h0bQdN9mdROTBZ6wnhkolsN1sQspklkt3Y3dAAMx8MCfnKynkqM_o2htcmmqiRKwVxoaT3ijEhae6oIYzEYAjfYzmQSzEiIfmDOdu4hTKIn-YrwWe7xwKJeUpEZ2B9vFv5GKr6uBCph0Q3dplKYt-EE-PUcOgRQCnN6XE-5PA7LzD4wmpA4KIq4enoa0Wiq39UyRLmWyRSuEk6tJZQH876mTo7iImR-_fENCVZm_D_twPQZDC4kmKoHdnD_8bSmwwiy6J4spACqLAZ6cj1YLq8NvvCJCglEFrIC6f1MK9eCanIqflqYCsH5id3W2vC_4cCIgRB-ZLx6awrEv004LgvUEhSaQNRQTmC-PsYVXNL3FdbIaWJdZK4SVrVZeF_nQtZKekYK-CateUlBkgaM_30caPHU0giEHmeeULcJNJIzeF6QQigoBM4oGvKO1YQWI4EyCO2OReg2jt4RmQQXr4rixqpKrry-kdWB7aqWqG9lzJTFjG5wBNaXvrhLDcBCY8Sa-LZ42HymQC6m5r1wxsvpzux5OhVYbtZmMRUQB_sKsir6fgoEtglNhd2mIhBjZUxoqUzOTKQui3bYE60wFqcMwoDaLJTMUiCqNkIBwDZfzcr08S5hDEZ-Xj3V2N8LNj5mcqZSBN6xqV0ZDjKs--mgVB0chkwshitq7DNBFBbXWM6AFsSY9PromobmucRi9xmmwO12nZjiuh7l2Wwvczoqsg5mMmi-YX3BaRZ6EHNJDIBZUIJ4MCqzFrj3RVDG34iK5BYI9AQm1LYiRhFsotvlJhzxBmVg3gbq5ZHc3_cmnvaeYp6I1p2VaXW2inhjfTSQKczWVHTi3zbMS1k4Bg-EYpRKVJisgrTOQlod4FKn3cLU7d5JNFqI'
				className='relative w-full h-full object-contain'
				alt='project preview'
			/>

			<div className='absolute top-3 left-3'>
				<svg
					className='w-6 h-8 text-indigo-500 fill-current drop-shadow-md'
					viewBox='0 0 24 24'
				>
					<path d='M5 3v18l7-5 7 5V3z' />
				</svg>
			</div>

			<div className='absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10'>
				<span className='text-orange-400'>💡</span>
				<span className='text-xs font-medium text-white'>Идея</span>
			</div>
		</div>
	);
};

export default CardImage;
