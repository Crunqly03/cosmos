import React from 'react'
import { Flex,Text } from '@macist-m/robinia-uikit';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components'

export interface SliderProps {
  values?: any
}


const ImaginateSlider: React.FC<SliderProps> = ({values}) => {

const SlideContainer = styled.div`
    display:flex;
    align-items:center;
    min-height:90px;
    padding:16px;
    width:100%;
}`
const SlideContainerLeft = styled.div`
    display:flex;
    align-items:center;
    position:relative;
    margin-right:16px;
}`
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}
 const SlideData=[{
     url:`${window.location.origin}/images/macbook.png`,
     title:"MacBook",
     subTitle:"MacBook Pro M1",
     amount:values.macbook
 },
 {
    url:`${window.location.origin}/images/watch.png`,
    title:"Patek Philippe Watch",
    subTitle:"5712/1A - NAUTILUS",
    amount:values.watch
},
{
    url:`${window.location.origin}/images/lamborghini.png`,
    title:"Lamborghini",
    subTitle:"Aventador Ultimae",
    amount:values.lambo
},

]
  return (
    <>
    <Slider  {...sliderSettings}>
        {SlideData.map((item)=>
        <div>
            <SlideContainer key={item.title}>
                <SlideContainerLeft>
                    <img style={{width:74}} src={item.url} alt={item.title} />
                </SlideContainerLeft>
                <Flex flexDirection="column">
                    <Text bold fontSize='18px' color="primary">
                      {`${item.amount} `}  {item.title}
                    </Text>
                    <Text bold fontSize='14px' color="#fff">
                        {item.subTitle}
                    </Text>
                </Flex>
            </SlideContainer>
        </div>

            )}
    </Slider>




    </>
  )
}

export default ImaginateSlider