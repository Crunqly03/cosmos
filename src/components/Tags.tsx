import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon,AutoRenewIcon } from '@macist-m/robinia-uikit'

const NoFeeTag = () => (
  <Tag variant="success" outline startIcon={<VerifiedIcon />}>
    No Fees
  </Tag>
)

const RiskTag = ({ risk }) => (
  <Tag variant={risk >= 3 ? 'failure' : 'success'} outline startIcon={<VerifiedIcon />}>
    Risk {risk}
  </Tag>
)

const CoreTag = () => (
  <Tag variant="secondary" outline startIcon={<VerifiedIcon />}>
    Core
  </Tag>
)

const CommunityTag = () => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon />}>
    Community
  </Tag>
)

const BinanceTag = () => (
  <Tag variant="binance" outline startIcon={<BinanceIcon />}>
    Binance
  </Tag>
)

const AutoStaking = () => (
  <Tag variant="secondary" outline startIcon={<AutoRenewIcon />}>
    Automatic restaking
    </Tag>
    )
export { CoreTag, CommunityTag, BinanceTag, RiskTag, NoFeeTag ,AutoStaking}
