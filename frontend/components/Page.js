import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { ThemeProvider } from 'styled-components';

import Meta from './Meta';
import Header from './Header';
import { GlobalStyle, Inner, StyledPage, theme } from './styles/DefaultStyles';

const Page = ({ children }) =>
	<ThemeProvider theme={theme}>
		<StyledPage>
			<GlobalStyle />
			<Meta />
			<Header />
			<Inner>{children}</Inner>
		</StyledPage>
	</ThemeProvider>;

export default Page;