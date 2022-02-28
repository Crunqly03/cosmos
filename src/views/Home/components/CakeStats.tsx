import React from 'react'
import Slider from 'react-slick'

const TopSliderCard = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 750,
    autoplaySpeed: 5000,
    arrows: false,
  }

  return (
    <div >
          <img src="/images/image1.png" alt="trend-up"   />
    </div>
  )
}

export default TopSliderCard
