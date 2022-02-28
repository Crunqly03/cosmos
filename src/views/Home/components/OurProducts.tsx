import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@macist-m/robinia-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/egg/2a.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const OurProducts = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter(
    (balanceType) => balanceType.balance.toNumber() > 0,
  )

  return (
    <div className=" h-full place-items-center  text-white text-center grid lg:grid-cols-4 sm:grid-cols-2 gap-4 justify-item-center ">
      <div className="sm:col-span-2 lg:col-span-4   text-white text-5xl mb-10 py-2  rounded-xl   mb-10">
        Our Products
      </div>

      <div className="grid grid-cols-1  partnerblur gap-4">
        <div className="justify-item-center mb-6 mt-4 sm:ml-11  md:ml-24 lg:ml-20">
          <img src="/images/auto-wst.svg" alt="rbs-ico" style={{minWidth:50}} />
        </div>
        <div>Auto WST (3,3)</div>
        <div className="text-gray-300">
          WisteriaSwap provides the best APY to users through Auto-Compounding system.
        </div>
      </div>

      <div className="grid grid-cols-1 partnerblur gap-4">
        <div className="justify-item-center mb-6 mt-6 sm:ml-11 md:ml-12 lg:ml-20 ">
          <img src="/images/calloption.svg" alt="rbs-ico" style={{minWidth:50}} />
        </div>
        <div>Call Option (1,1)</div>
        <div className="text-gray-300">
          Users have the opportunity to purchase WST at a lower than market price through
          Call Option.
        </div>
      </div>

      <div className="grid grid-cols-1 partnerblur gap-2">
      <div className="justify-item-center mb-6 mt-6 sm:ml-11 md:ml-12  lg:ml-20">
        <img src="/images/treasury.svg" alt="rbs-ico" style={{minWidth:50}} />
        </div>
        <div>Treasury Fund</div>
        <div className="text-gray-300">
          Treasury Fund designed to maintain the value of WST. WisteriaSwap activates the
          Buy-Burn system using the Treasury Fund when the WST value drops below $1.
        </div>
      </div>
      <div className="grid grid-cols-1 partnerblur gap-2">
      <div className="justify-item-center mb-6 mt-6 sm:ml-11 md:ml-12 lg:ml-20">
        <img src="/images/deflation.svg" alt="rbs-ico" style={{minWidth:50}} />
        </div>
        <div>Deflation Model</div>
        <div className="text-gray-300">
          WisteriaSwap has more than 6 Deflation Models to control inflation. The
          deflation model allows the WST value to remain stable.
        </div>
      </div>
    </div>
  )
}

export default OurProducts
