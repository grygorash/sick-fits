import styled from 'styled-components';

const ErrorPageStyles = styled.div`
	width: 100%;
	height: calc(100vh - 187px);
	position: fixed;
	left: 0;
	top: 187px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	color: ${props => props.theme.red};
	h3, p{
		margin: 0;
	}
	p{
		font-size: 22px;
	}
`;

export default ErrorPageStyles;