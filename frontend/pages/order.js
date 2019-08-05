import SingleOrder from '../components/SingleOrder';

const Order = ({ query }) =>
	<section>
		<SingleOrder id={query.id} />
	</section>;

export default Order;