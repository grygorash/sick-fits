import SingleItem from '../components/SingleItem';

const Item = ({ query }) =>
	<section>
		<SingleItem id={query.id} />
	</section>;

export default Item;