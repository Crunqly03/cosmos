import BigNumber from 'bignumber.js'
// import { convertSharesToCake } from 'views/Pools/helpers'
import multicall from 'utils/multicall'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO ,BIG_TEN} from 'utils/bigNumber'

export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}
export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, displayDecimals?: number) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals)
}
export const convertSharesToCake = (
  shares: BigNumber,
  cakePerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(cakePerFullShare, decimals)
  const amountInCake = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const cakeAsNumberBalance = getBalanceNumber(amountInCake, decimals)
  const cakeAsBigNumber = getDecimalAmount(new BigNumber(cakeAsNumberBalance), decimals)
  const cakeAsDisplayBalance = getFullDisplayBalance(amountInCake, decimals, decimalsToRound)
  return { cakeAsNumberBalance, cakeAsBigNumber, cakeAsDisplayBalance }
}
export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestWisteriaRewards',
      'calculateTotalPendingWisteriaRewards',
      'getTokenTaxRate'
    ].map((method) => ({
      address: getCakeVaultAddress(),
      name: method,
    }))

    const [sharePrice, shares, estimatedWisteriaBountyReward, totalPendingWisteriaHarvest,tokenTaxRate] = await multicall(cakeVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalWisteriaInVaultEstimate = convertSharesToCake(totalSharesAsBigNumber, sharePriceAsBigNumber)

    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalWisteriaInVault: totalWisteriaInVaultEstimate.cakeAsBigNumber.toJSON(),
      estimatedWisteriaBountyReward: new BigNumber(estimatedWisteriaBountyReward.toString()).toJSON(),
      totalPendingWisteriaHarvest: new BigNumber(totalPendingWisteriaHarvest.toString()).toJSON(),
      tokenTaxRate:new BigNumber(tokenTaxRate.toString()).toJSON()
    }
  } catch (error) {

    return {
      totalShares: null,
      pricePerFullShare: null,
      totalWisteriaInVault: null,
      estimatedWisteriaBountyReward: null,
      totalPendingWisteriaHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getCakeVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicall(cakeVaultAbi, calls)
    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }

  } catch (error) {

    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
