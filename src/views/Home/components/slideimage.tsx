import React, { useEffect, useCallback, useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

export interface FarmsProps {
  tokenMode?: boolean
}

const SlideImage: React.FC<FarmsProps> = (farmsProps) => {


  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [

        {
        breakpoint: 1140,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>


    <div className="grid  grid-cols-1 gap-20">
    <Slider  {...sliderSettings}>

         
         
          
          <a href='https://blokfield.gitbook.io/wisteria-swap/create-your-own-defi'>
            <img src="/images/slid1.png" className=" rounded-3xl"  width='370' alt='1' />
          </a>
          <a href='https://blokfield.gitbook.io/wisteria-swap/create-your-own-defi'>
            <img src="/images/slidd.png" className=" rounded-3xl"  width='370' alt='1' />
          </a>
          <a href='https://blokfield.gitbook.io/wisteria-swap/tokenomics/deflation-model'>
            <img src="/images/burn.png" className=" rounded-3xl"  width='370' alt='1' />
          </a>
          <a href='https://blokfield.gitbook.io/wisteria-swap/security/kyc'>
            <img src="/images/slide6.png" className=" rounded-3xl"  width='370' alt='1' />
          </a>


    </Slider>

    </div>



    </>
  )
}

export default SlideImage
