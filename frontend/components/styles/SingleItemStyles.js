import styled from 'styled-components';

const SingleItemStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${props => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 500px;
	img{
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.details{
		margin: 3rem;
		font-size: 2rem;
		.price{
			color: ${props => props.theme.red};
			font-size: 3rem;
		}
		a, button{
			background: ${props => props.theme.red};
			color: #fff;
			padding: 10px;
			border: none;
			font-size: 13px;
			margin-right: 10px;
		}
	}
`;

export default SingleItemStyles;