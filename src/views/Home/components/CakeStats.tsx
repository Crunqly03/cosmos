import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Text ,Flex} from '@macist-m/robinia-uikit'
import BigNumber from 'bignumber.js/bignumber'
import CardValue from 'views/Home/components/CardValue'
import { useTotalSupply, useBurnedBalance ,useCustomTokenBalance} from 'hooks/useTokenBalance'
import {useAutoFarmApy} from 'state/hooks'
import { BLOCKS_PER_YEAR } from 'config'
import { getCakeAddress } from 'utils/addressHelpers'
import { QuoteToken } from 'config/constants/types'
import {
  useFarms,
  usePriceCakeBusd,
  useTotalValue,
  usePriceBnbBusd,
} from '../../../state/hooks'

// const TopSliderCard = () => {
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     speed: 750,
//     autoplaySpeed: 5000,
//     arrows: false,
//   }
const CakeStats = () => {
  const cakePriceUsd = usePriceCakeBusd()
  // const totalValue = useTotalValue()
  const totalValue = useTotalValue()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const eggPrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const exacutedBalance= useCustomTokenBalance("0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7","0xf808b408e464FcaA2a28C673ca7F5C16f6e775aB")
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance).minus(exacutedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)

  const marketCap = eggPrice.times(circSupply)

  const autoApy = useAutoFarmApy(2)
  let eggPerBlock = 0
  if (farms && farms[0] && farms[0].eggPerBlock) {
    eggPerBlock = new BigNumber(farms[0].eggPerBlock)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }
  const x = []
  farms.map((farm) => {
    // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
    //   return farm
    // }
    const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
      .times(new BigNumber(farm.poolWeight))
      .div(new BigNumber(10).pow(18))
    const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

    let apy = eggPrice.times(cakeRewardPerYear)

    let totalValuex = new BigNumber(farm.lpTotalInQuoteToken || 0)

    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      totalValuex = totalValuex.times(bnbPrice)
    }

    if (totalValuex.comparedTo(0) > 0) {
      apy = apy.div(totalValuex)
    }

    x.push(apy)
    return null
  })
  const topAPY = x.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue)
  })
  return (
    <div className="rbs-card h-full relative" style={{minHeight: "400px"}}>
      <div className="w-1/2 h-full  float-left flex flex-col items-center justify-center" style={{borderRight: "1px solid rgb(208, 208, 208)", paddingRight: "12px"}}>
        <div className="text-center text-md text-white tracking-wide leading-6 font-bold">Stake LP tokens in Farms and Earn Up To</div>
        <div className="text-center my-2 text-white text-xl font-bold border-solid border-2 border-white  p-4 rounded-2xl shadow-sm w-full">{Number(x)} % APR
        </div>
        <div className="text-center text-md text-white tracking-wide leading-6 mt-8 font-bold">Total Value Locked (TVL)</div>
        <div className="text-center my-2 text-white border-solid border-2 border-white text-2xl font-bold p-4 rounded-2xl shadow-sm w-full">
          <CardValue fontSize="22px" color="#ffffff" value={totalValue.toNumber()} decimals={2} prefix='$'/></div>
        </div>
      <div className="w-1/2 float-left" style={{paddingLeft: "20px"}}>
        <div className="text-2xl text-white font-bold mb-5">Robinia Stats</div>
        <div className="mb-2">
          <div className="text-gray-300">USD Market Cap</div>
          <div>{totalSupply && (<CardValue fontSize="18px" color="#ffffff" value={getBalanceNumber(marketCap)} decimals={0} prefix='$'/>)}
          </div>
        </div>
        <div className="mb-2">
          <div className="text-gray-300">Total Minted</div>
          <div>
                <Text bold fontSize="18px" color="green">
                  {eggPerBlock}
                </Text>
              </div>
        </div>
        <div className="mb-2">
          <div className="text-gray-300">Total Burned</div>
          <div><CardValue fontSize="18px" color="#ffffff" value={getBalanceNumber(burnedBalance)} decimals={0}/>
          </div>
        </div>
        <div className="mb-2">
          <div className="text-gray-300">Circulating Supply</div>
          <div>{cakeSupply && (<CardValue fontSize="18px" color="#ffffff" value={cakeSupply} decimals={0}/>)}
          </div>
        </div>
        <div className="mb-2">
          <div className="text-gray-300">RV2 Per Block</div>
          {/* <div>
            <Text bold fontSize="18px" color="green">
                  {eggPerBlock}
            </Text>
          </div> */}
           <CardValue
                  fontSize="18px" color="#ffffff" value={(eggPerBlock)}
                  decimals={2}
                />
        </div>
        <div className="mb-2">
          <div className="text-gray-300">Max Supply</div>
          <div>{cakeSupply && (<CardValue fontSize="18px" color="green" value={cakeSupply+getBalanceNumber(burnedBalance)} decimals={0}/>)}
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 opacity-5">
          <img src="/images/trend-up.svg" alt="trend-up" width={220}/>
        </div> 
      </div>   
    </div>
  )
}

export default CakeStats
