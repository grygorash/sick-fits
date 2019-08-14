import styled from 'styled-components';

const Title = styled.div`
  margin: -3rem 0 1rem 0;
  transform: skew(-5deg) rotate(-1deg) translateX(-50%);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 60px;
  left: 50%;
  width: 100%;
  p {
    background: ${props => props.theme.red};
    display: inline;
    line-height: 1.3;
    font-size: 4rem!important;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

export default Title;
