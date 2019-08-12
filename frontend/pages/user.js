import SingleUser from '../components/SingleUser';

const User = ({ query }) =>
	<SingleUser id={query.id} />;

export default User;