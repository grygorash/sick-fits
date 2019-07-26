import styled from 'styled-components';

const CartItemStyles = styled.li`
	padding: 1rem -0px;
	border-bottom: 1px solid ${props => props.theme.lightgrey};
	display: grid;
	align-items: center;
	grid-template-columns: auto 1fr auto;
	img{
		width: 100px;
		margin-right: 10px;
	}
	h3, p{
		margin: 0;
	}
`;

export default CartItemStyles;
