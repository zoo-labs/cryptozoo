import BorderButton from 'components/Button/BorderButton'
import StickyBottomMenu from 'components/Button/StickyBottomMenu'
import Page from 'components/layout/Page'
import React, { useState, useEffect } from 'react'
import { AppState } from 'state'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'
import styles from 'styled-components'
import web3 from 'web3'

import { Label, Text } from 'components/Text'
import { Flex, Heading, useMatchBreakpoints } from 'components'
import Body from 'components/layout/Body'
import { useModal } from 'components/Modal'
import BuyEggs from 'components/BuyEggs'
import MyZooAccount from 'views/MyZooAccount'
import { Egg } from 'types/zoo'
import { useDispatch } from 'react-redux'
import { breedTimeouts, eggTimeout } from 'constants/constants'
import { getMilliseconds, getDaysHours } from 'util/timeHelpers'
import { getZooToken, getZooDrop, getZooFaucet, getZooMedia, getZooKeeper } from 'util/contractHelpers'

import useWeb3 from 'hooks/useWeb3'
import useToast from 'hooks/useToast'

const HeadingContainer = styles.div`
    width: 100%;
    display: flex;
    justify-content: start;
    margin: 0px 8px;
`

const MyZooContainer = styles.div`
    width: 100%;
    display: flex;
    padding: 16px;
`

const StyledButton = styles.button`
    cursor: pointer;
    text-decoration: underline;
    text-transform: uppercase;
`

const LabelWrapper = styles.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`

const ValueWrapper = styles(Text)`
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 550;
`

const RowWrapper = styles.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 16px;
`

const StyledHeading = styles(Heading)`
    color: ${({ theme }) => theme.colors.text};
`

function numberWithCommas(num) {
  const values = num.toString().split('.')
  return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length == 2 ? '.' + values[1] : '')
}

const Account: React.FC = () => {
  const [isInitial, setIsInitial] = useState(true)
  const [balance, setBalance] = useState(0.0)
  const [wait, setWait] = useState(false)
  const { account, chainId } = useWeb3React()
  const [allowance, setAllowance] = useState(false)
  const [disable, setDisable] = useState(false)
  const [disableApprove, setDisableApprove] = useState(false)
  const [keepApprove, setKeepApprove] = useState(true)
  const web3 = useWeb3()
  const { isXl } = useMatchBreakpoints()
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const history = useHistory()
  const [onBuyEggs] = useModal(<BuyEggs />)
  const dispatch = useDispatch()
  const allEggs = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)

  const toastClear = () => {
    clear()
  }

  const currentEggsOwned = Object.values(allEggs).filter((egg) => (egg.owner || '').toLowerCase() === account.toLowerCase() && !egg.burned).length

  const zooToken = getZooToken(web3, chainId)
  const faucet = getZooFaucet(web3, chainId)
  const zooMedia = getZooMedia(web3, chainId)
  const zooKeeper = getZooKeeper(web3, chainId)
  const zooDrop = getZooDrop(web3, chainId)
  const keeperAdd = zooKeeper.options.address
  const faucetAmt = web3.utils.toWei('50')

  const getBalance = async () => {
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(balance)
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
      toastClear()
      toastError('Failed to load ZOO balance')
    }

    try {
      const allowance = await zooToken.methods.allowance(account, keeperAdd).call()
      if (allowance > 0) {
        setAllowance(true)
        setKeepApprove(false)
        if (isInitial) {
          toastClear()
          toastSuccess('Wallet connected')
        }
      } else {
        setKeepApprove(true)
        toastClear()
        toastInfo('Please approve allowance to play')
      }
    } catch (error) {
      console.log(error)
    }
    setIsInitial(false)
  }

  const approve = async () => {
    toastClear()
    setDisableApprove(true)
    toastInfo('Processing approval...')

    // Increase allowance
    const eggPrice = await zooDrop.methods.eggPrice().call()
    const allowance = web3.utils.toBN(eggPrice).mul(web3.utils.toBN(100))
    const tx = zooToken.methods.approve(keeperAdd, allowance).send({ from: account })

    tx.then(() => {
      setAllowance(true)
      setDisableApprove(false)
      toastClear()
      toastSuccess('Approval success!')
    }).catch((e) => {
      console.error('APPROVE ERROR', e)
      setDisableApprove(false)
      toastClear()
      toastError('Failed to approve account')
    })
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      getBalance()
    }
    return () => {
      mounted = false
    }
  }, [account, chainId])

  const bankClick = () => {
    history.push('/bank')
    toastClear()
  }

  const pageHeading = (
    <HeadingContainer>
      <StyledHeading>My Account</StyledHeading>
      <StyledButton
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          marginLeft: '16px',
          letterSpacing: '1.4px',
        }}
        onClick={() => bankClick()}>
        View Bank
      </StyledButton>
    </HeadingContainer>
  )

  const handleFaucet = () => {
    try {
      setWait(true)
      toastClear()
      toastInfo('Sending ZOO...')
      faucet.methods
        .fund(account)
        .send({ from: account })
        .then(() => {
          setWait(false)
          getBalance()
          toastClear()
          toastSuccess('Sent ZOO!')
        })
        .catch((e) => {
          console.error('ISSUE USING FAUCET \n', e)
          setWait(false)
          toastClear()
          toastInfo('Canceled request for ZOO.')
        })
    } catch (e) {
      console.error('ISSUE USING FAUCET \n', e)
      toastClear()
      toastError('Unable to process transaction. Try again later.')
    }
  }

  const handleFunds = () => {
    console.log(chainId)
    switch (chainId) {
      case 1337:
        handleFaucet()
        break
      case 97:
        handleFaucet()
        break
      default:
        const redirectWindow = window.open('https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997', '_blank')
        redirectWindow.location
    }
  }

  const buyEgg = async () => {
    setDisable(true)

    // const drop = await zooKeeper.methods.drops(0).call()
    // const token = await zooKeeper.methods.buyEgg(1).call({ from: account })
    const createdAt = Date.now()
    const now = Date.now()
    const hatchTimeout = getMilliseconds(eggTimeout)
    const elapsedTime = now - createdAt
    const timeRemaining = hatchTimeout - elapsedTime
    const timeRemainingDaysHours = getDaysHours(timeRemaining)
    const barwidth = [100 * (elapsedTime / hatchTimeout), '%'].join('')

    try {
      await zooKeeper.methods
        .buyEgg(1)
        .send({ from: account })
        .then((res) => {
          toastClear()
          toastInfo('Transaction submitted.')
          console.log('bought egg', res)
          setDisable(false)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      setDisable(false)
      console.log(error)
      toastClear()
      toastError('Unable to purchase eggs. Try again later.')
    }

    // onBuyEggs()
  }

  const handleRedirect = () => {
    history.push('/feed')
  }

  return (
    <>
      <Page>
        {pageHeading}
        <Body>
          <RowWrapper style={{ margin: '0 auto' }}>
            <LabelWrapper style={{ marginBottom: '32px' }}>
              <Label style={{ fontSize: '20px' }}>
                Wallet Balance
                <ValueWrapper style={{ fontWeight: 550 }}>{numberWithCommas(balance)} ZOO</ValueWrapper>
              </Label>
              {(keepApprove || !allowance) && (
                <BorderButton
                  disabledApprove={disableApprove || allowance}
                  scale='sm'
                  minWidth={!isXl ? '120px' : '140px'}
                  onClick={approve}
                  style={{
                    marginRight: '8px',
                    fontSize: `${!isXl ? '14px' : '16px'}`,
                  }}>
                  {allowance ? 'APPROVED' : disableApprove ? 'PROCESSING' : 'APPROVE'}
                </BorderButton>
              )}
              <BorderButton disabled={wait} scale='sm' minWidth={!isXl ? '120px' : '140px'} style={{ fontSize: `${!isXl ? '14px' : '16px'}` }} onClick={handleFunds}>
                {chainId !== 97 && chainId !== 1337 ? 'Add Funds' : wait ? 'Processing' : 'Get Zoo'}
              </BorderButton>
            </LabelWrapper>
          </RowWrapper>
          <LabelWrapper>
            <Flex alignItems='flex-start' flexDirection='column' flexGrow={2} height={allowance && !keepApprove ? '100%' : '65px'}>
              <Label style={{ fontSize: '20px' }}>{currentEggsOwned} Eggs Owned</Label>
            </Flex>
            <Flex flexDirection='column' height={allowance && !keepApprove ? '100%' : '65px'} justifyContent='space-between'>
              <BorderButton disabled={disable || !allowance} scale='sm' minWidth={!isXl ? '120px' : '140px'} onClick={buyEgg} style={{ fontSize: `${!isXl ? '14px' : '16px'}` }}>
                {disable ? 'PROCESSING' : 'BUY EGGS'}
              </BorderButton>
            </Flex>
          </LabelWrapper>
        </Body>
        <MyZooAccount />
      </Page>
    </>
  )
}

export default Account
