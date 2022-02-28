import React from 'react'
import styled from 'styled-components'


interface SlideInputProps {
  max: number | string
  value: number
  min: number
  onChange:(e)=> void
}

const SlideInput: React.FC<SlideInputProps> = ({ max,value,min,onChange}) => {

  return (
        <SlideContainer>
            <Slider onChange={onChange}  type="range" min={min} value={value} max={max}/>
        </SlideContainer>
  )
}



const SlideContainer = styled.div`
  width: 100%;
`
const Slider = styled.input`
-webkit-appearance: none;
width: 100%;
height: 5px;
background: #fff;
outline: none;
opacity: 0.7;
-webkit-transition: .1s;
transition: opacity .1s;
border-radius:3px;
&::hover{
    opacity: 1;
}
&::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;

    cursor: pointer;
    border-radius:50%;
    background-image: linear-gradient(to bottom, #366a96, #1b354b);
  }
&::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background-image: linear-gradient(to bottom, #366a96, #1b354b);
    cursor: pointer;
    border-radius:50%;
  }
`



export default SlideInput
