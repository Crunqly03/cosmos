import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import { getContract } from 'utils/web3'
import { ContractOptions } from 'web3-eth-contract'
import {getCakeVaultAddress} from 'utils/addressHelpers'
import cakeVaultAbi from '../../config/abi/cakeVault.json'



export const getCakeVaultContract = (contractOptions?: ContractOptions) => {
  const address= getCakeVaultAddress()
  const pancakeRabbitsAbi = (cakeVaultAbi as unknown) as AbiItem
  return getContract(pancakeRabbitsAbi, address, contractOptions)
}
const cakeVaultContract = getCakeVaultContract()

export const  fetchVaultUser = async (account: string ) => {

  try {
    const userContractResponse = await cakeVaultContract.methods.userInfo(account).call()
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      wisteriaAtLastUserAction: new BigNumber(userContractResponse.wisteriaAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      wisteriaAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
