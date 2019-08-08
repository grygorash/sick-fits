import SingleOrder from '../components/SingleOrder';
import PleaseSignin from '../components/PleaseSignin';

const Order = ({ query }) =>
	<PleaseSignin>
		<SingleOrder id={query.id} />
	</PleaseSignin>;

export default Order;