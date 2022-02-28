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

const Partners = () => {
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
    <div className=" h-full  place-items-center text-white grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-4  ">
      <div className="lg:col-span-6  md:col-span-2 sm:col-span-2 text-white text-5xl   py-2  rounded-xl   mt-6">Partners</div>

       <a className='pbg' href='https://coinmarketcap.com/'>
        <img className='mt-6 p-4'  src="/images/coinmarket.png" alt="rbs-ico" />
      </a>
      <a className='pbg ' href='https://www.coingecko.com/'>
        <img className='mt-4 p-4'  src="/images/coingecko.png"  alt="rbs-ico" />
      </a>
      <a className='pbg' href='https://honeyfarm.finance/'>
        <img className='mt-4 p-4'  src="/images/honeybee.png"  alt="rbs-ico" />
      </a>
      <a className='pbg' href='https://yanabu.com/'>
        <img className='p-10'  src="/images/yanabu1.png" style={{marginTop:-44}} alt="rbs-ico" />
      </a>
      <a className='pbg' href='https://robiniaswap.com/'>
        <img className='mt-4'  src="/images/rbb.png" alt="rbs-ico" />
      </a>
      <a className='pbg'  href='https://ccgaglobal.com/'>
        <img  className='p-12' src="/images/partner6.png" style={{marginTop:-48}}  alt="rbs-ico" />
      </a> 
      

    </div>
  )
}

export default Partners
