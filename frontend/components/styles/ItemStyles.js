import styled from 'styled-components';

const ItemStyles = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    a,button{
	    cursor: pointer;
	    transition: all .3s;
	    &:hover{
		    background: ${props => props.theme.red};
		    color: ${props => props.theme.lightgrey};
	    }
    }
    & > * {
      background: white;
      border: 0;
      padding: 1rem;
    }
  }
  .crossed{
  	span:first-child{
  		text-decoration: line-through;
 		}
    span:last-child{
      top: 40px;
      font-size: 4rem;
    }
  }
`;

export default ItemStyles;
