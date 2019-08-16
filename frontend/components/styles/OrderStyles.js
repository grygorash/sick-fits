import styled from 'styled-components';

const OrderStyles = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
  border-top: 10px solid red;
  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.offWhite};
    padding: 1rem;
    span {
      &:first-child {
        font-weight: 900;
        text-align: right;
      }
    }
  }
  .order-item {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 200px;
      height: auto;
      object-fit: cover;
    }
  }
  a, button{
	background: ${props => props.theme.red};
	color: #fff;
	padding: 10px;
	border: none;
	font-size: 13px;
	margin-right: 10px;
		}
`;
export default OrderStyles;
