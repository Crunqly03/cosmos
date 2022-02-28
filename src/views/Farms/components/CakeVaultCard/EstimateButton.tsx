import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal } from '@macist-m/robinia-uikit'
import { Address } from 'config/constants/types'
import EstimateModal from './EstimateModal'

export interface EstimateProps {
  lpLabel?: string
  cakePrice?: BigNumber
  apy?: BigNumber
  cakeRewardPerYear?:BigNumber
  totalValue?:BigNumber
}

const Estimate: React.FC<EstimateProps> = ({
  lpLabel,
  cakePrice,
  apy,
  cakeRewardPerYear,
  totalValue
}) => {
  const [onPresentApyModal] = useModal(
    <EstimateModal
      lpLabel={lpLabel}
      cakePrice={cakePrice}
      apy={apy}
      cakeRewardPerYear={cakeRewardPerYear}
      totalValue={totalValue}
    />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <CalculateIcon />
    </IconButton>
  )
}

export default Estimate
