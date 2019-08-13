import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  &.disabled{
	  pointer-events: none;
  }
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    position: relative;
    text-align: center;
    &:hover{
    	  background: #d2cfcf;
    	}
    &:last-child {
      border-right: none;
      width: 150px;
    }
    label{
    	display: block;
    	padding: 5px 10px; 
    	cursor:pointer;
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
`;

export default Table;
