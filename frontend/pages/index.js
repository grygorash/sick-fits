import ItemList from '../components/ItemList';

const Home = ({ query }) =>
	<ItemList page={+query.page || 1} />;

export default Home;