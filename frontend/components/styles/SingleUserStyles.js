import styled from 'styled-components';

const SingleUserStyles = styled.div`
	display: flex;
	flex-direction: column;
	.user-info{
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 1px solid ${props => props.theme.lightgrey};
		img{
			border-radius: 50%;
		}
	}
	.user-items{
	>a{
			display: flex;
			justify-content: space-around;
			align-items: center;
			border: 1px solid ${props => props.theme.lightgrey};
			margin-top: 20px;
			transition: all .3s;
			&:hover{
				border-color: ${props => props.theme.red};
			}
		}
	}
	img{
			margin-right: 20px;
		}
`;

export default SingleUserStyles;