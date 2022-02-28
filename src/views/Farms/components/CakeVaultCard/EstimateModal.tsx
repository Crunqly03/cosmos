import React,{ useState,useEffect } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Modal, Text, LinkExternal, Flex } from '@macist-m/robinia-uikit'
import useI18n from 'hooks/useI18n'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { calculateCakeEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'
import CustomInput from 'components/CustomInput/CustomInput'
import SlideInput from 'components/SlideInput/SlideInput'
import { useCustomTokenBalance } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'

interface EstimateModalProps {
  onDismiss?: () => void
  lpLabel?: string
  cakePrice?: BigNumber
  apy?: BigNumber
  cakeRewardPerYear?:BigNumber
  totalValue?:BigNumber
}

const Hr = styled.div`
  width:100%;
  height:2px;
  margin:16px 0;
  background-color:#aeaeae;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const EstimateModal: React.FC<EstimateModalProps> = ({
  onDismiss,
  lpLabel,
  cakePrice,
  apy,
  cakeRewardPerYear,
  totalValue
}) => {
  const TranslateString = useI18n()
  const farmApy = apy.times(new BigNumber(100)).toNumber().toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const cakePriceAsString = cakePrice.toNumber().toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const { account }: { account: string } = useWallet()
  const [amount,setAmount]=useState("0")
  const [balance,setBalance]=useState("0")
  const [dayValue,setDayValue]=useState(30)
  const [price,setPrice]=useState(cakePriceAsString)
  const [futurePrice,setfuturePrice]=useState(cakePriceAsString)
  const [reward,setReward]=useState(farmApy)


  const wstAmount= useCustomTokenBalance("0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7",account)
  const cakeRewardPerYearAsNumber=cakeRewardPerYear.toNumber()
  const cakeRewardPerDayAsNumber=cakeRewardPerYearAsNumber/365


useEffect(()=>{
  const wstbalance = getBalanceNumber(wstAmount).toString()
 setBalance(wstbalance)
},[account,wstAmount])
const handleAmount =(e)=>{
  console.log(e.target.value)
    setAmount(e.target.value)
}
const handlePrice =(e)=>{
    setPrice(e.target.value)
}
const handleFuturePrice =(e)=>{
    setfuturePrice(e.target.value)
}
const handleReward =(e)=>{
    setReward(e.target.value)
}
const setMaxAmount = () =>{
  setAmount(balance)
}
const setCurrentPrice = () =>{
  setPrice(cakePriceAsString)
}
const setCurrenFuturePrice = ()=>{
  setfuturePrice(cakePriceAsString)
}
const setCurrentReward = () =>{
  setReward(farmApy)
}
const handleDayValue = (e) =>{
  setDayValue(e.target.value)
}
const calculateUserRewards = (tokenamount) =>{
  const totalTokenInPool = totalValue.toNumber() / cakePrice.toNumber()
  console.log(`totalTokenInPool:${totalTokenInPool}`)
  const rewardAsPerchantge = ((100 * parseFloat(tokenamount)) / (totalTokenInPool+parseFloat(tokenamount))) / 100
  console.log(`rewardAsPerchantge:${rewardAsPerchantge}`)
  console.log(`cakeRewardPerDayAsNumber:${cakeRewardPerDayAsNumber}`)
  const userRewardPerDay = cakeRewardPerDayAsNumber*rewardAsPerchantge
  console.log(`userRewardPerDay:${userRewardPerDay}`)
  const userRewards = dayValue*userRewardPerDay
  return userRewards
}
  return (
    <Modal title="ESTIMATE" onDismiss={onDismiss}>
            <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" justifyContent="center" flexDirection="column" marginRight={32}>
                    <Text fontSize='16px' color="#aeaeae">Current {lpLabel} price</Text>
                    <Text bold fontSize='22px' color="secondary" >${cakePrice.toNumber().toFixed(2)}</Text>
                </Flex>
                <Flex alignItems="center" justifyContent="center" flexDirection="column"  marginRight={32}>
                    <Text fontSize='16px' color="#aeaeae">
                        Current Reward Yield
                    </Text>
                    <Text bold fontSize='22px' color="secondary">
                        {farmApy}%
                    </Text>
                </Flex>
                <Flex alignItems="center" justifyContent="center" flexDirection="column">
                    <Text fontSize='16px' color="#aeaeae">
                        Your {lpLabel} balance
                    </Text>
                    <Text bold fontSize='22px' color="secondary">{balance}</Text>
                </Flex>
            </Flex>
            <Flex>
                <Hr/>
            </Flex>
            <Flex justifyContent="space-between">
                <Flex marginRight="16px">
                    <CustomInput
                        onChange={handleAmount}
                        value={amount}
                        inputTitle="WST Amount"
                        endAbdormentText='Max'
                        endAbdormentAction={setMaxAmount}
                    />
                </Flex>
                <Flex>
                <CustomInput
                        onChange={handlePrice}
                        value={price}
                        inputTitle="WST Price at Purchase ($)"
                        endAbdormentText='Current'
                        endAbdormentAction={setCurrentPrice}
                    />
                </Flex>
            </Flex>
            <Flex justifyContent="space-between">
                <Flex marginRight="16px">
                    <CustomInput
                        onChange={handleReward}
                        value={reward}
                        inputTitle="Reward Yield(%)"
                        endAbdormentText='Current'
                        endAbdormentAction={setCurrentReward}
                    />
                </Flex>
                <Flex>
                <CustomInput
                        onChange={handleFuturePrice}
                        value={futurePrice}
                        inputTitle="Future WST Market Price ($)"
                        endAbdormentText='Current'
                        endAbdormentAction={setCurrenFuturePrice}
                    />
                </Flex>
            </Flex>
            <Flex flexDirection="column" paddingTop={32} paddingLeft={32} paddingRight={32} alignItems="center" justifyContent="center">
            <SlideInput
              max={365}
              min={1}
              value={dayValue}
              onChange={handleDayValue}
            />
            <Flex marginTop={16} alignItems="center" justifyContent="center">
              <Text bold color="primary" fontSize='28px'>
                {dayValue}
                {(dayValue === 1) ?
                " day"
                :" days"
                }
              </Text>
            </Flex>
            </Flex>
            <Flex>
                <Hr/>
            </Flex>
            <Flex flexDirection="column" padding={16}>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='18px' color='#aeaeae'>
                Your Initial Investment
                </Text>
                <Text fontSize='22px' color='primary' bold>
                  ${(amount) ?(parseFloat(amount)*parseFloat(price)).toLocaleString("ko-KR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }):
                  0
                  }
                </Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='18px' color='#aeaeae'>
                Current Wealth
                </Text>
                <Text fontSize='22px' color='primary' bold>
                ${
                (amount) ?
                (parseFloat(amount)*parseFloat(price)).toLocaleString("ko-KR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) :
                  0
                  }
                </Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='18px' color='#aeaeae'>
                WST Rewards Estimation
                </Text>
                <Text fontSize='22px' color='primary' bold>
                  {(parseFloat(amount) > 0) ? calculateUserRewards(amount) : 0}
                </Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='18px' color='#aeaeae'>Potential Return</Text>
                <Text fontSize='22px' color='primary' bold>${
                (parseFloat(amount) > 0) ?
                ((calculateUserRewards(amount)+parseFloat(amount))*cakePrice.toNumber()).toLocaleString("ko-KR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                :
                0
                }</Text>
              </Flex>
            </Flex>

    </Modal>
  )
}

export default EstimateModal
