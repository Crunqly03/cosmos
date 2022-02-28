import { MenuEntry } from '@macist-m/robinia-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange Pancake',
        href: 'https://pancakeswap.finance/swap?outputCurrency=0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
      },
      {
        label: 'Exhcnage 1Inch',
        href: 'https://app.1inch.io/#/56/classic/swap/BNB/0xaadff17d56d80312b392ced903f3e8dbe5c3ece7',
      },
      {
        label: 'Liquidity',
        href: 'https://pancakeswap.finance/add/BNB/0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
      },
    ],
  },
  {
    label: 'Stake(3,3)',
    icon: 'FarmIcon',
    href:'/stake',

  },
  {
    label: 'Hourglass',
    icon: 'HourglassIcon',
    href:'/hourglass',

  },
  {
    label: 'Dashboard  (Alpha Version)',
    icon: 'DashIcon',
    href:'/dashboard',

  },
  {
    label: 'Call Option (1,1)',
    icon: 'NftIcon',
    href:'/calloption',
  },
  {
    label: 'IFO',
    icon: 'GooseIcon',
    href: '/ifo',
  },
  {
    label: 'Bridge',
    icon: 'PoolIcon',
     href:'https://bridge.robiniaswap.com/'
  },
  {
    label: "Partner's Defi ",
    icon: 'TicketIcon',
    items: [
      {
        label: 'RobiniaSwap',
        href: 'https://robiniaswap.com/',
      },
      {
        label: 'Yanabu Farm',
        href: 'https://yanabu.com/',
      },
      {
        label: 'Honey Farm',
        href: 'https://honeyfarm.finance/',
      },
    ],
    },


  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Docs',
        href: 'https://blokfield.gitbook.io/wisteria-swap/',
      },
      {
        label: 'Audit',
        href: 'https://github.com/TechRate/Smart-Contract-Audits/blob/main/December/Wisteria%20Swap.pdf',
      },
      {
        label: 'Price Chart',
        href: 'https://swap.arken.finance/tokens/bsc/0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
      },
    ],
  },
  {
    label: 'Assuredefi KYC',
    icon: 'KycIcon',
    href: 'https://www.assuredefi.io/projects/wisteriaswap/',
  }



  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },


  // {
  //   label: 'Audit by Hacken',
  //   icon: 'AuditIcon',
  //   href: 'https://www.goosedefi.com/files/hackenAudit.pdf',
  // },
  // {
  //   label: 'Audit by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://certik.org/projects/goose-finance',
  // },
]

export default config
