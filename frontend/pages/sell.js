import CreateItem from '../components/CreateItem';
import PleaseSignin from '../components/PleaseSignin';

const Sell = () =>
	<section>
		<PleaseSignin>
			<CreateItem />
		</PleaseSignin>
	</section>;

export default Sell;