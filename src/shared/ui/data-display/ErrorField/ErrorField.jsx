const ErrorField = ({ errorText }) => {
	return (
		<p className='text-[10px] text-red-500 ml-1 font-medium animate-in fade-in slide-in-from-top-1'>
			{errorText}
		</p>
	);
};

export default ErrorField;
