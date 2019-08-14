import styled from 'styled-components';

const CarouselStyles = styled.div`
	.carousel .slider-wrapper.axis-horizontal .slider .slide{
		height: 500px;
	}
	.carousel .thumb{
		height: 100px;
		cursor: pointer;
		border: 1px solid transparent;
		&.selected,
		&:hover{
			border: 1px solid ${props => props.theme.red};
		}
	}
	.carousel .control-arrow, 
	.carousel.carousel-slider .control-arrow{
		background: ${props => props.theme.red};
		opacity: .6;
		&:hover{
			opacity: 1;
		}  
	}
	.carousel .carousel-status{
		right: 35px; 
	}
	.carousel .slide{
		background: #fff;
	}
`
export default CarouselStyles;

