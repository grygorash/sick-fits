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
	.user-items, .user-feedback{
	>a, >div{
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
	button{
		background: ${props => props.theme.red};
		padding: 10px;
		border: none;
		font-size: 13px;
		margin-right: 10px;
		a{
			color: #fff;
		}
	}
	img{
			width: 100px;
			height: 100px;
			object-fit: cover;
			margin-right: 20px;
		}
`;

export default SingleUserStyles;