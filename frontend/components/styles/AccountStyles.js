import styled from 'styled-components';

const AccountStyles = styled.div`
.user-info{
	display: flex;
	align-items: center;
	img{
		width: 100px;
		border-radius: 50%;
		margin-right: 20px;
	}
	p{
		margin: 0 0 10px;
	}
	a{
		padding: 10px;
		background: ${props => props.theme.red};
		color: #fff;
	}
}
`;

export default AccountStyles;
