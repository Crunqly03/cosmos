import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Farm } from 'state/types'
import { QuoteToken } from 'config/constants/types'
import Slider from 'react-slick'
import { provider } from 'web3-core'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useTotalValue,useAutoFarmApy } from 'state/hooks'
import CardValue from 'views/Home/components/CardValue'
import { Link } from 'react-router-dom'
import { Flex, Image ,Text} from '@macist-m/robinia-uikit'
import Divider from 'views/Farms/components/Divider'
import { getBalanceNumber } from 'utils/formatBalance'
import { useBurnedBalance, useTotalSupply ,useCustomTokenBalance} from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'




const TopSliderCard = () => {
  // const totalValue = useTotalValue()

  // const apy =useAutoFarmApy(2)
  // const wstprice = usePriceCakeBusd()

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    // responsive: [

    //     {
    //     breakpoint: 1140,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: false,
    //       dots: false,
    //     },
    //   },
    //   {
    //     breakpoint: 660,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: false,
    //       dots: false,
    //     },
    //   },
      
      
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  }

  return (
    <div className="slidbg top-slider">
      <div className="h-full">
        <Slider {...sliderSettings} clasName=""> 
          <div className="">
            <div className="grid grid-cols-2  h-128 ">
              <div className="col-start-2 p-4 topslider   ">
                <div className="text-white  text-2xl mt-24 mb-4 leading-7">
                  The Cross-Chain DEX on BSC network with a STEEM, RIZON Blockchain.
                </div>
                <div className="text-gray-300 text-lg  leading-6">
                  RobiniaSwap utilizes a cross-chain bridge to make DeFi services more accessible to various users.
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div> 
        
//     <div className="h-full mt-10  ">
//       <div className="grid grid-cols-1 gap-6">
//         <div>
//           <div className="text-white text-6xl mb-8 leading-14">
//             The FIRST <br/> YIELDFARM DEFI
//           </div>
//           <div className="text-pink-200 text-4xl mb-8">2.0 (PCV) on BSC network.</div>

//         </div>

//         <div className="blurred  grid grid-cols-3 gap-8 ">
//           <div >
//             <div className='text-gray-300 text-center text-sm'>Total Value Locked</div>

//             {totalValue.toNumber() > 0 ? (

//              <div className='statblur'>
//              <CardValue
//                 value={totalValue.toNumber()}
//                 prefix="$"
//                 decimals={2}
//                 fontSize="18px"
//               />
//               </div>
//             ) : (
//               <CardValue value={0} prefix="$" decimals={2} fontSize="18px" />
//             )}
//           </div>
//           <div className=' text-gray-300 text-center  text-sm'>
//           WST APY
//         {!Number.isNaN(apy) ? (
//         <div className='statblur'>

//                       <Flex marginLeft={3}>
//                       <CardValue
//                       fontSize="18px"
//                       value={apy}
//                       decimals={0}
//                     />

//                     <Text fontSize="18px" bold color='primary'>
//                     %
//                   </Text>
//                       </Flex>
//                   </div>

//  )
//                     :(
//                     <CardValue
//                     fontSize="18px"
//                     value={0}
//                     decimals={0}
//                     prefix="%"
//                   />)
//         }

//           </div>
//           <div className=' text-gray-300 text-center text-sm  '>
//           WST Price
//           <div className='statblur'>
//           <CardValue
//                     fontSize="18px"
//                     value={wstprice.toNumber()}
//                     decimals={3}
//                     prefix='$'
//                   />

//           </div>
//         </div>
//         </div>
        
//       </div>
//     </div>
  )
}

export default TopSliderCard
