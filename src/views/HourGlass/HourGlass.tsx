import React,{ useState,useEffect } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import { Text,Flex ,Heading} from '@macist-m/robinia-uikit'
import CustomInput from 'components/CustomInput/CustomInput'
import Divider from 'views/Farms/components/Divider'
import SlideInput from 'components/SlideInput/SlideInput'
import { BLOCKS_PER_YEAR} from 'config'
import { useFarmFromPid,usePriceCakeBusd,useCakeVault,useFetchCakeVault} from 'state/hooks'
import { useCustomTokenBalance } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { getAutoAprDataWithDay } from 'views/Farms/helpers'
import ImaginateSlider from './imaginateSlider'


// interface HourGlassProps {
//   lpLabel?: string
//   cakePrice?: BigNumber
//   apy?: BigNumber
//   cakeRewardPerYear?:BigNumber
//   totalValue?:BigNumber
// }

const Hr = styled.div`
  width:100%;
  height:2px;
  margin:16px 0;
  background-color:#fff;
`

const Container = styled.div`
  width:100%;
  max-width:852px;
  flex-direction:column;
  padding: 50px;
  border-radius: 23px;
  backdrop-filter: blur(30px);
  background-color:rgba(255,255,255,0.1);
  border:1px solid;
  border-color:rgba(255, 255, 255, 0.5);
  margin-bottom:16px;
  @media (max-width: 576px) {
    padding:8px
  }

`

const SliderContainer =styled.div`
  margin-bottom: 28px;
  max-width:300px;
`

const HourGlass: React.FC = () => {
   const { account }: { account: string } = useWallet()
   useFetchCakeVault(account)
   const farm = useFarmFromPid(2)
   const cakePrice = usePriceCakeBusd()
   const {
    totalWisteriaInVault,
    fees: { performanceFee }
  } = useCakeVault()
  console.log(totalWisteriaInVault)
   const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
   .times(new BigNumber(farm.poolWeight))
   .div(new BigNumber(10).pow(18))
 const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
 // alert(cakeRewardPerBlock)
   let apy = cakePrice.times(cakeRewardPerYear)
   const totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)
   if (totalValue.comparedTo(0) > 0) {
    apy = apy.div(totalValue)
  }

   const farmApy = getAutoAprDataWithDay(apy.times(100).toNumber(),performanceFee,1).apr.toLocaleString("ko-KR", {
       minimumFractionDigits: 2,
       maximumFractionDigits: 2,
     })
  //  apy.times(100).toNumber().toLocaleString("ko-KR", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // })
  const cakePriceAsString = cakePrice.toNumber().toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const lamboPrice = 500000
  const watchPrice=40000
  const MacPrice=4000
  const [amount,setAmount]=useState("0")
  const [balance,setBalance]=useState("0")
  const [dayValue,setDayValue]=useState(30)
  const [price,setPrice]=useState(cakePriceAsString)
  const [futurePrice,setfuturePrice]=useState(cakePriceAsString)
  const [reward,setReward]=useState(farmApy)
  const AutoApr = getAutoAprDataWithDay(apy.times(100).toNumber(),performanceFee,1)
  console.log(AutoApr.apr.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }))

  const wstAmount= useCustomTokenBalance("0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7",account)
  const cakeRewardPerYearAsNumber=cakeRewardPerYear.toNumber()
  const cakeRewardPerDayAsNumber=cakeRewardPerYearAsNumber/365


useEffect(()=>{
  const wstbalance = getBalanceNumber(wstAmount).toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  setPrice(cakePriceAsString)
  setfuturePrice(cakePriceAsString)
 setBalance(wstbalance)
 setReward(farmApy)
},[account,wstAmount,cakePriceAsString,farmApy])
const handleAmount =(e)=>{
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
  // const totalTokenInPool = getBalanceNumber(totalWisteriaInVault,18)
  // console.log(`totalTokenInPool:${totalTokenInPool}`)
  // const rewardAsPerchantge = ((100 * parseFloat(tokenamount)) / (totalTokenInPool+parseFloat(tokenamount))) / 100
  // console.log(`rewardAsPerchantge:${rewardAsPerchantge}`)
  // console.log(`cakeRewardPerDayAsNumber:${cakeRewardPerDayAsNumber}`)
  // const userRewardPerDay = cakeRewardPerDayAsNumber*rewardAsPerchantge
  // console.log(`userRewardPerDay:${userRewardPerDay}`)
  // const userRewards = dayValue*userRewardPerDay
  const apyAsPerchantage = parseFloat(reward)/100
  console.log((apyAsPerchantage ** dayValue))
  let userRewards = (parseFloat(tokenamount) * ((1 + apyAsPerchantage) ** dayValue)) - parseFloat(tokenamount)
  if(Number.isNaN(userRewards)){
    userRewards = 0
  }
  return userRewards
}
  return (
    <Page>
      <Flex alignItems="center" justifyContent="center" flexDirection="column" marginBottom={3}>
        <img style={{maxWidth:127}} src="/images/flowers.png" alt="" />
        <Text fontSize='46px' color='#fff' bold>
         Hourglass
      </Text>
      <Text marginTop={-3} color='#fff' fontSize='20px'>Estimate Your Returns</Text>
   </Flex>


    <Flex justifyContent="center">
    <Container>
             <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" justifyContent="center" flexDirection="column" marginRight={32}>
                    <Text fontSize='22px' color="secondary">Current WST price</Text>
                    <Text bold fontSize='25px' color="#fff" >${cakePrice.toNumber().toFixed(2)}</Text>
                </Flex>
                <Flex alignItems="center" justifyContent="center" flexDirection="column"  marginRight={32}>
                    <Text fontSize='22px' color="secondary">
                    Current Daily Reward
                    </Text>
                    <Text bold fontSize='25px' color="#fff">
                        {farmApy}%
                    </Text>
                </Flex>
                <Flex alignItems="center" justifyContent="center" flexDirection="column">
                    <Text fontSize='22px' color="secondary">
                        Your WST balance
                    </Text>
                    <Text bold fontSize='25px' color="#fff">{balance}</Text>
                </Flex>
            </Flex>
            <Flex>
              <Divider/>
            </Flex>
            <Flex flexWrap="wrap" justifyContent="space-between">
                    <CustomInput
                        onChange={handleAmount}
                        value={amount}
                        inputTitle="WST Amount"
                        endAbdormentText='Max'
                        endAbdormentAction={setMaxAmount}

                    />
                <CustomInput
                        onChange={handlePrice}
                        value={price}
                        inputTitle="WST Price at Purchase ($)"
                        endAbdormentText='Current'
                        endAbdormentAction={setCurrentPrice}
                    />
            </Flex>
            <Flex flexWrap="wrap" justifyContent="space-between">
                    <CustomInput
                        onChange={handleReward}
                        value={reward}
                        inputTitle="Reward Yield(%)"
                        endAbdormentText='Current'
                        endAbdormentAction={setCurrentReward}
                    />
                <CustomInput
                        onChange={handleFuturePrice}
                        value={futurePrice}
                        inputTitle="Future WST Market Price ($)"
                        endAbdormentText='Current'
                        endAbdormentAction={setCurrenFuturePrice}
                    />
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
                <Divider/>
            </Flex>
            <Flex flexDirection="column" padding={16}>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='18px' color='#fff'>
                Your Initial Investment
                </Text>
                <Text fontSize='22px' color='primary' bold>
                  ${(amount) ? (parseFloat(amount)*parseFloat(price)).toLocaleString("ko-KR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }):
                  0
                  }
                </Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='18px' color='#fff'>
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
                <Text fontSize='18px' color='#fff'>
                WST Rewards Estimation
                </Text>
                <Text fontSize='22px' color='primary' bold>
                  {(parseFloat(amount) > 0) ? calculateUserRewards(amount).toLocaleString("ko-KR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) : 0}
                </Text>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize='18px' color='#fff'>Potential Return</Text>
                <Text fontSize='22px' color='primary' bold>${
                (parseFloat(amount) > 0) ?
                ((calculateUserRewards(amount)+parseFloat(amount))*parseFloat(futurePrice)).toLocaleString("ko-KR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                :
                0
                }</Text>
              </Flex>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
            <SliderContainer>
            <ImaginateSlider values={{
                macbook:(parseFloat(amount) > 0) ? Math.floor(((calculateUserRewards(amount)+parseFloat(amount))*parseFloat(futurePrice))/MacPrice) : 0,
                lambo:(parseFloat(amount) > 0) ? Math.floor(((calculateUserRewards(amount)+parseFloat(amount))*parseFloat(futurePrice))/lamboPrice) : 0,
                watch:(parseFloat(amount) > 0) ? Math.floor(((calculateUserRewards(amount)+parseFloat(amount))*parseFloat(futurePrice))/watchPrice) : 0,
            }}/>
            </SliderContainer>
            </Flex>


    </Container>
    </Flex>



    </Page>
  )
}

export default HourGlass
