import React from 'react'
import CardValue from 'views/Home/components/CardValue'
import { getBalanceNumber } from 'utils/formatBalance'
import { Text ,Flex} from '@macist-m/robinia-uikit'
import BigNumber from 'bignumber.js/bignumber'
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

declare global {
  interface Window {
    ethereum: any
  }
}
const addToMetamask = function () {
  window.ethereum
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
          symbol: 'WST',
          decimals: 18,
          image: `${window.location.origin}/images/favicons/apple-icon-72x72.png`,
        },
      },
    })
    .then((success) => {
      if (success) {
        console.log('WST successfully added to wallet!')
      } else {
        throw new Error('Something went wrong.')
      }
    })
    .catch(console.error)
}
const Statistics = () => {
  const cakePriceUsd = usePriceCakeBusd()
  // const totalValue = useTotalValue()
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
    <div className="stat-card h-full  text-white text-center   grid  grid-cols-1 gap-4 justify-item-center ">
      <div className="grid   sm:grid-cols-1  text-lg md:grid-cols-2  lg:grid-cols-3   ">



        <div className="grid grid-cols-2  gap-2 ">
          <div className="grid grid-cols-1 md:ml-20 lg:ml-0 text-left">
            <div>WST APY</div>
            <div>Total Supply</div>
            <div>Circulation Supply</div>

          </div>

          <div className="grid grid-cols-1 md:mr-20 lg:mr-0 text-center ">
            <div>
              {!Number.isNaN(autoApy) ?
              <Flex justifyContent="center">

                <CardValue  fontSize="17px" value={autoApy} decimals={0}/>

                <Text bold fontSize="17px" color="primary">%</Text>
              </Flex>
              :
              <Text bold fontSize="17px" color="primary">
                0
              </Text>
              }

            </div>
            <div>
              {' '}
              {cakeSupply && (
                <CardValue fontSize="17px" value={getBalanceNumber(totalSupply)} decimals={0} />
              )}
            </div>
            <div>
              {cakeSupply && (
                <CardValue fontSize="17px" value={cakeSupply} decimals={0} />
              )}
            </div>


          </div>
        </div>

        <div className="grid grid-cols-2  gap-2 ">
        <div className="grid grid-cols-1 md:ml-20 lg:ml-0 text-left">

            <div>Total Burned</div>
            <div>Market Cap</div>
            <div>WST Per Block</div>
          </div>

          <div className="grid grid-cols-1 md:mr-20 lg:mr-0 text-center ">

            <div>
              <CardValue
                fontSize="17px"
                value={getBalanceNumber(burnedBalance)}
                decimals={0}
              />
            </div>
            <div>
              {totalSupply && (
                <CardValue
                  fontSize="17px"
                  value={getBalanceNumber(marketCap)}
                  decimals={0}
                  prefix='$'
                />
              )}
            </div>
            <div>
              <Text bold fontSize="17px" color="primary">
                {eggPerBlock}
              </Text>
            </div>
          </div>
        </div>
        <div className='grid'>
        <div> </div>
            <Flex flexDirection="column" alignItems="center">

            <Flex alignItems="center">
               <img style={{minWidth:"60px",width:"70px"}} src="/images/metamask-ico.svg" alt="rbs-ico" />
               <button type='button' style={{minWidth:"135px"}} className="bg-gray-800 bg-transparent ml-4 py-3   rounded-xl sm:mt-2  lg:mt-1 text-sm  text-white cursor-pointer hover:opacity-75" onClick={addToMetamask}>
                Add to Metamask
              </button>
            </Flex>
            </Flex>
            <div> </div>
        </div>
      </div>



    </div>
  )
}

export default Statistics
