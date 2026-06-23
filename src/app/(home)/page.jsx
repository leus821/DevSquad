import { VacancyFeed } from '@/widgets';
import IncompleteProfileBanner from '@/widgets/IncompleteProfileBanner/IncompleteProfileBanner';

const Home = () => {
	return (
		<main>
			<IncompleteProfileBanner />
			<VacancyFeed />
		</main>
	);
};

export default Home;
