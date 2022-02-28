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
} from '../../state/hooks'
import Socials from './Socials'

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
const MainFooter = () => {
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

      <div className="stat-card grid grid-cols-4  gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 text-left text-lg text-white ">
      
      <div className='sm:col-span-2 md:col-span-1'>
      <img  src="/images/footerlogo.png"  alt="rbs-ico" className='mt-10 sm:mr-0' />
      </div>
        <div className="grid text-gray-400 grid-cols-1 ml-10">
          <div className="text-white ">About</div>
          <a href="https://blokfield.gitbook.io/wisteria-swap/">Docs</a>
          <a href="https://steemit.com/@robinia/posts">News</a>
          <div>Partners</div>
          <div><a href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/December/Wisteria%20Swap.pdf">Audit</a></div>
          <div> </div>
        </div>

        <div className="grid grid-cols-1 text-gray-400">
          <div className="text-white ">Products</div>
          <div><a href="/stake">Stake(3,3)</a></div>
          <div><a href="/calloption">Call Options</a></div>
          <div><a href="/ifo">IFO</a> </div>
          <div> </div>
          <div> </div>
          <div> </div>
        </div>
        <div className="grid sm:ml-10 grid-cols-1  text-gray-400">
          <div className="text-white ">Service</div>
          <div>DAO</div>
          <a href="https://bridge.robiniaswap.com/">Bridge </a>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
        </div>
        <div className="grid grid-cols-1">
          Community
          <div className="mr-10">
            <Socials />
          </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
          <div> </div>
        </div>
    </div>
  )
}

export default MainFooter
