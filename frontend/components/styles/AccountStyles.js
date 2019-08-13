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
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 50%;
		margin-right: 20px;
		}
	}
	p{
		margin: 0 0 10px;
	}
	a{
		padding: 10px;
		background: ${props => props.theme.red};
		color: #fff;
	}
`;

export default AccountStyles;
