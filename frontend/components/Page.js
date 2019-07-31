import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import Meta from './Meta';
import Header from './Header';

const theme = {
	red: '#ff0000',
	black: '#393939',
	grey: '#3a3a3a',
	lightgrey: '#e1e1e1',
	offWhite: '#ededed',
	maxWidth: '1000px',
	bs: '0 12px 24px 0 rgba(0,0,0,0.09)'
};

const StyledPage = styled.div`
	background:white;
	color:${props => props.theme.black};
`;

const Inner = styled.section`
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;
	padding: 2rem;
`;

injectGlobal`
	html{
		box-sizing: border-box;
		font-size: 10px;
	}
	*, *:before, *:after{
		box-sizing: inherit;
	}
	body{
		padding: 0;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2;
		font-family: Arial, sans-serif;
		*::-webkit-scrollbar, ::-webkit-scrollbar {
			  width: 8px;
			}
		*::-webkit-scrollbar-track, ::-webkit-scrollbar-track {
		  background: white; 
		}
		*::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb {
		  background: #ff0000;
      border-radius: 10px;
		}
	}
	a{
		text-decoration: none;
		color: ${theme.black};
	}
	a, button{
			cursor:pointer;
			outline: none;
			&:disabled{
				opacity: .2;
			}
	}
`;

const Page = ({ children }) =>
	<ThemeProvider theme={theme}>
		<StyledPage>
			<Meta />
			<Header />
			<Inner>{children}</Inner>
		</StyledPage>
	</ThemeProvider>;

export default Page;