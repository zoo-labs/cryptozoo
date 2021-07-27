import React, { Suspense, useEffect, lazy } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import  ResetCSS  from './components/ResetCSS'
import GlobalStyle from './components/style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/Svg/Icons/LoadingLogo'
import history from './routerHistory'
import { PrivateRoute } from 'components/PrivateRoute'
import { useWeb3React } from '@web3-react/core'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Account = lazy(() => import('./views/Account'))
const Login = lazy(() => import('./views/Login'))
const Bank = lazy(() => import('./views/Bank'))
const Feed = lazy(() => import('./views/Feed'))
const Faucet = lazy(() => import('./views/Faucet'))
// const Splash = lazy(() => import('./views/Splash'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-repeat: no-repeat;
    background-position: center 420px, 10% 230px, 90% 230px;
    background-size: contain, 266px, 266px;
    min-height: 90vh;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released

  useEffect(() => {
    console.warn = () => null
  }, [])

  useEagerConnect()
  const { chainId } = useWeb3React()

  const signedIn = chainId && window.localStorage.getItem("connectorId")

  return (
    <Suspense fallback={null}>
    
      <Router history={history}>
        <ResetCSS />
        <GlobalStyle />
            <Switch>
              {/* Zswap Routes  */}
              {/* <Route path="/marketplace" exact>

                <Marketplace />
              </Route>
              <Route path="/splash" exact>

                <Splash />
              </Route>
              <Route path="/account" exact>

                <Account />
              </Route> */}

              <Route exact path="/login">
                {signedIn? <Redirect to="/account" />: <Login/>}
              </Route>
              
                <SuspenseWithChunkError fallback={<></>}>
                  <Route exact path="/account">
                    {signedIn? <Menu><Account /></Menu> : <Redirect to="/login" />}
                  </Route>
                  <Route path="/feed">
                    {signedIn? <Feed /> : <Redirect to="/login" />}
                  </Route>
                  <Route exact path="/bank">
                    {signedIn? <Menu><Bank /></Menu> : <Redirect to="/login" />}
                  </Route>
		    <Route exact path="/faucet">
                    {signedIn? <Menu><Faucet /></Menu> : <Redirect to="/login" />}
                  </Route>

                  <Route  path="/">
                    {signedIn? <Redirect to="/account" />: <Redirect to="/login" />}
                  </Route>
                  {/* <Route exact path="/login" component={Login} />
                  <Route exact path="/account" component={signedIn? Account : <Redirect to="/docs/overview" />} />
                  <Route exact path="/market" component={signedIn? Marketplace : <Redirect to="/docs/overview" />} />
                  <Route exact path="/" component={signedIn? Account : <Redirect to="/docs/overview" />} /> */}
                  {/* <PrivateRoute path="/marketplace" component={Marketplace} />
                  <PrivateRoute path="/account" component={Account} />
                  <PrivateRoute path="/" component={Account} /> */}
                </SuspenseWithChunkError>
              {/* <Route component={NotFound} /> */}
            </Switch>
        
        <ToastListener />
      </Router>
    </Suspense>
  )
}

export default React.memo(App)
