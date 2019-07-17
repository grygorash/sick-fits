import Items from '../components/Items';

const Home = ({ query }) =>
	<section>
		<Items page={+query.page || 1} />
	</section>;

export default Home;