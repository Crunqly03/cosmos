import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@macist-m/robinia-uikit'
import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance from 'hooks/useTokenBalance'
import useMerkleTree from 'hooks/useNMerkleTree'
import { getFullDisplayBalance } from 'utils/formatBalance'
// import * as keccak256 from 'keccak256'
// const keccak256 = require('keccak256')

interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss }) => {
  const [value, setValue] = useState('')

  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const balance = getFullDisplayBalance(useTokenBalance(currencyAddress))
  const merkleTree = useMerkleTree()

  // const proof = merkleTree.getHexProof(keccak256(account))
  // console.log(merkleTree.getHexProof(keccak256(account)))
  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await contract.methods
              .deposit(new BigNumber(value).times(new BigNumber(10).pow(18)).toString())
              .send({ from: account })
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </Button>
      </Flex>
      <LinkExternal
        href="https://pancakeswap.finance/add/0xAfAEEe58a58867c73245397C0F768FF041D32d70/BNB"
        style={{ margin: 'auto' }}
      >
        {`Get ${currency}`}
      </LinkExternal>
    </Modal>
  )
}

export default ContributeModal
