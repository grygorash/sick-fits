import styled from 'styled-components';

const AccountStyles = styled.div`
display: flex;
flex-direction: column;
[class*="user-"]{
	padding-bottom: 20px;
	border-bottom: 1px solid ${props => props.theme.lightgrey};
	&:not(:first-child){
		padding-top: 20px;
	}
}
.user-info{
	display: flex;
	align-items: center;
	img{
		margin-right: 20px;
		}
	}
	p{
		margin: 0 0 10px;
	}
	a{
		margin-right: 5px;
	}
}
a, button{
	border: none;
	outline: none;
	padding: 10px;
	background: ${props => props.theme.red};
	color: #fff;
	font-size: 14px;
}
`;

export default AccountStyles;
