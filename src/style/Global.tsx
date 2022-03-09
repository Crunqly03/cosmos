import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@macist-m/robinia-uikit'
import backgrnd from './arkaplan.png'
import secondary from './secondbg.png'
import trend from './trendimage.svg'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Khand', sans-serif;
  }
  body {
    background-image: url(${backgrnd});
    background-attachment: local ,local ;
    background-position: 0px 0px , 100px 0px  ;
    background-size:cover;

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .rbs-bg {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(20px);
  }

  .slidbg {
    background-image: url(/images/slider1.ba7c4778.png);
    background-size: cover;
    border-radius: 30px;
    height: 100%;
  }

  .solofarmcard {
    border:"20px solid transparent";
    borderImage: url(kartbg.svg) 30 stretch;
    borderImageWidth:"110px";
    borderImageOutset:"45px";
    borderImageSlice:"20%";
  }

  .trend{
    background: rgba(255, 255, 255, 0.01);
    background-image:url(${trend});
    background-position:right bottom;
    background-repeat:no-repeat;
    padding: 24px;
    border:solid 1px rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    backdrop-filter:blur(10px);

    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
  }

  .statblur{
    background: rgba(255, 255, 255, 0.2);
    text-align:center;
    padding:8px;
    border-radius: 24px;
  }

  .partnerblur{
    background: rgba(0, 0, 0, 0.02);
    padding: 24px;
    background-size: contain;
    border-radius: 30px;
    backdrop-filter:blur(40px);
  }


  .details{
    background: rgba(255, 255, 255, 0.2);
    background-size:cover;
    text-align:center;
    padding:6px;
    backdrop-filter:blur(20px);
  }
  

  .blurred{
    background: rgba(255, 255, 255, 0.2);
    padding: 15px;
    margin-bottom:30px;
    border-radius: 30px;
    max-width:450px;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
  
  }

  .pbg{
    background: rgba(0, 0, 0, 0.02);
    border-radius: 30px;
    backdrop-filter:blur(40px);
    width:195px;
    height:105px;
  }

  .farmstaking{
    background: rgba(255, 255, 255, 1);
    padding: 15px;
    border-radius: 30px;
    backdrop-filter:blur(45px);

    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 20px;
    margin-left: 6px;
    margin-right: 6px;
    
  }

  .statistics{
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(15px);
    padding: 25px;
    border-radius: 30px;
    
  }

  .stat-card{
    background: rgba(255, 255, 255, 0.01);
    padding: 24px;
    border:solid 1px rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    backdrop-filter:blur(10px);

    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
    
  }
  
  .socialbg {
    background: rgba(235, 226, 255, 0.39);
    height: 30px;
    min-width:30px;
    max-width:30px;
    margin-right:5px;
  }
  
  .selectasset {
    background: rgba(235, 226, 255, 0.39);
    height: 45px;
    width:100px;
    min-width:30px;
    margin-right:5px;
  }

  
  .dropdown:hover > .dropdown-content {
    display: block;
  }

  .farmingcard{
    background: rgba(212, 211, 255, 0.4);
    padding: 25px;

    border-style : solid;
    border-color: white;
    border-width: 1.5px;
    border-radius: 30px;

    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
  }

  .aptbutton{
    background: rgba(212, 211, 255, 0.1);
    backdrop-filter: blur(5px);
  }

  .calloption{
    background: rgba(255, 255, 255, 0.1);
    padding: 55px;
    border-style : solid;
    border-color: rgba(200, 200, 200, 0.25);
    border-width: 2px;
    border-radius: 30px;
    backdrop-filter: blur(5px);

    
  }

  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3,minmax(0,1fr));
  }

  .rbs-card {
    background-image: url(/images/rbscardbg1.png);
    backdrop-filter: blur(45px);
    padding: 25px;
    border-radius: 30px;
    box shadow:rgba(0, 0, 0, 0.05) 1px 1px 20px;
  }

  .rbs-card1 {
    background: rgba(255, 255, 255, 0.15);
    padding: 15px;
    margin-bottom:30px;
    border-style : solid;
    border-color: rgba(255, 255, 255, 0.5);
    border-width: 1px;
    border-radius: 30px;
    backdrop-filter: blur(5px);

    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin: 0 auto;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      margin: 0 auto;
    }
  }

  .cog{
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    margin-bottom:30px;
    border-radius: 15px;
    backdrop-filter: blur(5px);

    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    ${({ theme }) => theme.mediaQueries.sm} {
      margin: 0 auto;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      margin: 0 auto;
    }
  }
  
  .coborder{
      border:solid;
      border-color: rgba(255, 255, 255, 0.25);
      border-width: 1px;
      border-radius: 15px;
  }
  
  .cborder{
    border:solid;
    border-color: rgba(255, 255, 255, 0.2);
    border-width: 2px;
    border-radius: 10px;
}
  
 

  .claim-card{
      background: rgba(255, 255, 255, 0.1);
      padding: 10px;
      border-style : solid;
      border-color: rgba(200, 200, 200, 0.25);
      border-width: 2px;
      border-radius: 30px;
      backdrop-filter: blur(5px);

      box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);

      ${({ theme }) => theme.mediaQueries.sm} {
        margin: 0 auto;
      }
      ${({ theme }) => theme.mediaQueries.lg} {
        margin: 0 auto;
    }
  }
  .noclaim-card{
    background: rgba(255, 255, 255, 0.25);
    padding:12px;
    border-radius: 30px;

    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin: 0 auto;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      margin: 0 auto;
  }
}

  .slick-list> div {
    margin-left:0;
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;  
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .slick-slider {
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
    tap-highlight-color: transparent;
  }

  .h-128 {
    height: 26rem;
    }

  .col-start-2 {
    grid-column-start: 2;
  }

  .p-4 {
    padding: 1rem;
  }

  .topslider {
    background: rgb(6, 77, 76);
    backdrop-filter: blur(45px);
    height: 100%;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.05) 1px 1px 20px;
  }

  .slick-dots li, .slick-dots li button {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .slick-dots li {
    position: relative;
    display: inline-block;
    margin: 0 5px;
    padding: 0;
  }

`

export default GlobalStyle