import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@macist-m/robinia-uikit'
import BigNumber from 'bignumber.js'
import SecondLeaf from 'components/layout/SecondLeaf'
import { useFetchPublicData } from 'state/hooks'
import CallOption from 'views/CallOption'
import LeafContainers from 'components/layout/LeafContainers'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'


// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const DelegateFarms = lazy(() => import('./views/DelegateFarm'))
const ApplyForIfos = lazy(() => import('./views/Ifos/ApplyForIfos'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Lottery = lazy(() => import('./views/Lottery'))
const Pools = lazy(() => import('./views/CallOption'))
const Ifos = lazy(() => import('./views/Ifos'))
const HourGlass = lazy(() => import('./views/HourGlass'))
const Dashboard = lazy(() => import('./views/Dashboard'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()
  return (

    <Router>

      <ResetCSS />
      <GlobalStyle />

      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/stake">
              <Farms />
            </Route>
            <Route path="/calloption">
              <Pools />
            </Route>
            <Route path="/delegatefarm">
              <DelegateFarms delegateMode />
            </Route>
            <Route path="/ifo">
              <Ifos />
            </Route>
            <Route path="/cakePools">
              <Pools />
            </Route>
            <Route path="/hourglass">
              <HourGlass />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            {/* <Route path="/lottery"> */}
            {/*  <Lottery /> */}
            {/* </Route> */}
            {/* <Route path="/ifo"> */}
            {/*  <Ifos /> */}
            {/* </Route> */}
            {/* <Route path="/nft"> */}
            {/*  <Nft /> */}
            {/* </Route> */}
            {/* Redirect */}
            {/* <Route path="/staking"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/syrup"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* 404 */}
            <Route path="/CallOption">
              <CallOption />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      <LeafContainers/>
      <SecondLeaf/>
      <NftGlobalNotification />
    </Router>

  )
}

export default React.memo(App)
