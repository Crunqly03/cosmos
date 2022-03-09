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
        label: 'Exchange',
        href: 'https://pancakeswap.finance/swap?outputCurrency=0x95d104b8a6d97820d7c169f1d02489c08958c89d',
      },
      {
        label: 'Liquidity',
        href: 'https://pancakeswap.finance/add/BNB/0x95d104b8a6d97820d7c169f1d02489c08958c89d',
      },
    ],
  },
   {
     label: 'Farms',
     icon: 'FarmIcon',
     items: [
      {
        label: 'Farms',
        href: '/farms', // 'https://pancakeswap.finance/swap?outputCurrency=0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
      },
      {
        label: 'Cake Farm',
        href: '/cakePools', // 'https://app.1inch.io/#/56/classic/swap/BNB/0xaadff17d56d80312b392ced903f3e8dbe5c3ece7',
      },
      {
        label: 'SP Delegate',
        href: '/delegatefarm', // 'https://pancakeswap.finance/add/BNB/0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
      },
    ],
   },

   {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  // {
  //   label: 'Hourglass',
  //   icon: 'HourglassIcon',
  //   href:'/hourglass',

  // },
  // {
  //   label: 'Dashboard  (Alpha Version)',
  //   icon: 'DashIcon',
  //   href:'/dashboard',

  // },
  // {
  //   label: 'Call Option (1,1)',
  //   icon: 'NftIcon',
  //   href:'/calloption',
  // },
   {
     label: 'IFO',
     icon: 'IfoIcon',
     href: '/ifo',
   },
  
  // {
  //   label: "Partner's Defi ",
  //   icon: 'TicketIcon',
  //   items: [
  //     {
  //       label: 'RobiniaSwap',
  //       href: 'https://robiniaswap.com/',
  //     },
  //     {
  //       label: 'Yanabu Farm',
  //       href: 'https://yanabu.com/',
  //     },
  //     {
  //       label: 'Honey Farm',
  //       href: 'https://honeyfarm.finance/',
  //     },
  //   ],
  //   },


   {
     label: 'Info',
     icon: 'InfoIcon',
     items: [
       {
         label: 'Docs',
         href: 'https://blokfield.gitbook.io/robiniaswap-v2/',
       },
       {
         label: 'Audit',
         href: 'https://github.com/TechRate/Smart-Contract-Audits/blob/main/February/RobiniaSwapV2.pdf',
       },
       {
         label: 'Price Chart',
         href: 'https://poocoin.app/tokens/0x95d104b8a6d97820d7c169f1d02489c08958c89d',
       },
     ],
   },

   {
    label: 'Bridge',
    icon: 'HandshakeIcon',
     href:'https://bridge.robiniaswap.com/'
  },
  // {
  //   label: 'Assuredefi KYC',
  //   icon: 'KycIcon',
  //   href: 'https://www.assuredefi.io/projects/wisteriaswap/',
  // }



   
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
