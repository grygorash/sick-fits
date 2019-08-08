import React from 'react';

import PleaseSignin from '../components/PleaseSignin';
import Account from '../components/Account';

const Me = () =>
	<PleaseSignin>
		<Account />
	</PleaseSignin>;

export default Me;