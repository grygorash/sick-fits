import styled from 'styled-components';

const Dot = styled.div`
	min-width: 40px;
	background: ${props => props.theme.red};
	color: white;
	border-radius: 50%;
	padding: 10px;
	line-height: 2rem;
	margin-left: 1rem;
	font-weight: 100;
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
`;

export default Dot;