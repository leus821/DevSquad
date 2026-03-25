const Container = ({ children, className }) => {
	return <div className={`w-full container-wide ${className}`}>{children}</div>;
};

export default Container;
