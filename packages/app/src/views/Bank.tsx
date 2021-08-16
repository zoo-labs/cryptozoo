import BorderButton from 'components/Button/BorderButton'
import styled from 'styled-components'
import StickyBottomMenu from 'components/Button/StickyBottomMenu'
import Page from 'components/layout/Page'
import React, { useState, useEffect } from 'react'
import { AppState } from 'state'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from 'hooks/useWeb3'
import { useHistory } from 'react-router-dom'
import styles from 'styled-components'
import { Label, Text } from 'components/Text'
import { Flex, Heading } from 'components'
import Body from 'components/layout/Body'
import { useModal } from 'components/Modal'
import BuyEggs from 'components/BuyEggs'
import { getZooToken, getZooFaucet } from 'util/contractHelpers'
import { useMatchBreakpoints } from 'components'
import { FaHome } from 'react-icons/fa'
import Moralis from 'moralis'
import { resourceLimits } from 'worker_threads'

const HeadingContainer = styles.div`
    width: 100%;
    display: flex;
    justify-content: start;
    margin: 0px 8px;
`

const StyledButton = styles.button`
    cursor: pointer;
    text-decoration: underline;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    background: transparent;
    border: none;
    margin-left: 8px;
`

const LabelWrapper = styles.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    color: ${({ theme }) => theme.colors.text};
`

const ValueWrapper = styles(Text)`
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 16px;
    font-size: 18px;
`

const EarnerValueWrapper = styles(Text)`
   color: ${({ theme }) => theme.colors.text};
   width: 100%;
   flex-direction: column;
   overflow: hidden;
   text-overflow: ellipsis;
   padding: 12px 16px;
`

const EarnerValue = styles(Text)`
   color: ${({ theme }) => theme.colors.text};
   font-size: 18px;
   line-height: 1.8;
`

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  min-width: 280px;
`

const TableWrapper = styled.div`
  flex-direction: row;
  flex: 1 1 auto;
  -webkit-box-pack: start;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  display: flex;
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 16px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: relative;
  overflow-x: scroll;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${({ theme }) => theme.colors.primaryPop};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primaryPop};
  }
  &::-webkit-scrollbar {
    height: 7px;
  }
`

const TableBody = styled.tbody`
  width: fit-content;
  & tr {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    td {
      font-size: 16px;
      vertical-align: left;
    }
    th {
      vertical-align: left;
    }
  }
`

const TableRow = styled.tr`
  color: white;
`

const TableContainer = styled.div`
  position: relative;
`

const TableData = styled.td`
  width: 100px;
  margin: 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TableHeader = styled.th`
  width: 100px;
  margin: 15px 0px;
  font-weight: 700;
  text-align: left;
  font-size: 18px;
`

const TableText = styled(Text)`
  width: 100%;
  text-align: center;
  margin: 20px 0px;
  font-size: 16px;
`

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => theme.colors.text};
`

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}

const Bank: React.FC = () => {
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()
  const history = useHistory()
  const { isXl } = useMatchBreakpoints()

  const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)

  const [zooBalance, setBalance] = useState(0.0)
  const [wait, setWait] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [waitTx, setWaitTx] = useState(true)

  const zooToken = getZooToken(web3, chainId)
  const faucet = getZooFaucet(web3, chainId)

  const accountAnimals = Object.values(animalsState).filter((animal) => {
    return animal.owner && animal.owner.toLowerCase() === account.toLowerCase()
  })

  const getBalance = async () => {
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(balance)
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
    }
  }

  useEffect(() => {
    getBalance()
    getTransactions()
  }, [account, chainId])

  useEffect(() => {
    getBalance()
  }, [])

  const handleFaucet = () => {
    try {
      setWait(true)
      faucet.methods
        .fund(account)
        .send({ gas: 21000, from: account })
        .then(() => {
          setWait(false)
          getBalance()
        })
        .catch((e) => {
          console.error('ISSUE USING FAUCET \n', e)
          setWait(false)
        })
      getBalance() // update balance
    } catch (e) {
      console.error('ISSUE USING FAUCET \n', e)
    }
  }

  const handleFunds = () => {
    switch (chainId) {
      case 1337:
        handleFaucet()
        break
      case 97:
        handleFaucet()
        break
      default:
        location.href = 'https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997'
    }
  }

  const getTransactions = async () => {
    console.log('GETTING TRANSACTIONS for account', account)
    try {
      const Transactions = Moralis.Object.extend('Transactions')
      const query = new Moralis.Query(Transactions)
      query.limit(1000)
      query.descending('createdAt')
      query.equalTo('from', account.toLowerCase())
      const results = await query.find()
      let transactions = []
      for (const tx of results) {
        const action = tx.get('action')
        const txHash = tx.get('transactionHash')
        const URL = `https://testnet.bscscan.com/tx/${txHash}`

        // Filter out Burned Tokens
        if (action == 'Burned Token') continue

        console.log('tx', tx)
        transactions.push({
          id: tx.get('objectId'),
          from: tx.get('from'),
          action: action,
          hash: txHash,
          URL: URL,
          createdAt: tx.get('createdAt').toLocaleDateString(),
          blockNumber: tx.get('blockNumber'),
          timestamp: tx.get('timestamp'),
          tokenID: tx.get('tokenID'),
        })
      }
      console.log('transactions', transactions)
      setTransactions(transactions)
      setWaitTx(false)
    } catch (e) {
      console.error('ISSUE GETTING TRANSACTIONS \n', e)
    }
  }

  // Calculate yield
  const dailyYield = accountAnimals.reduce((acc, x) => acc + Number(x.yield), 0)

  // Get top ten animals
  const topTenAnimals = accountAnimals.sort((a, b) => Number(b.yield) - Number(a.yield)).slice(0, 10)

  const pageHeading = (
    <HeadingContainer>
      <StyledHeading>My Bank</StyledHeading>
      <StyledButton onClick={() => history.push('/account')}>View Account</StyledButton>
    </HeadingContainer>
  )

  return (
    <>
      <Page>
        {pageHeading}
        <Body>
          <LabelWrapper>
            <Label small>Wallet Balance</Label>

            <BorderButton scale='sm' minWidth={!isXl ? '120px' : '140px'} style={{ fontSize: `${!isXl ? '14px' : '16px'}` }} onClick={handleFunds}>
              {chainId !== 97 ? 'Buy ZOO' : wait ? 'Processing' : 'Get ZOO'}
            </BorderButton>
          </LabelWrapper>
          <Flex width='100%' alignItems='center' justifyContent='space-around'>
            <ValueWrapper>{numberWithCommas(zooBalance)} ZOO </ValueWrapper>
            {/* Commented out since there is to ZOO to USD conversion yet */}
            {/* <ValueWrapper style={{ fontSize: "16px",  color: "rgb(221 224 26)" }}>0 USD</ValueWrapper> */}
          </Flex>
          <Label small>Total Daily Yield</Label>
          <ValueWrapper> {dailyYield} ZOO </ValueWrapper>
          <Label small>Top Earners</Label>
          {topTenAnimals.length === 0 ? (
            <ValueWrapper style={{ justifyContent: 'center' }}> No animals </ValueWrapper>
          ) : (
            <EarnerValueWrapper>
              {topTenAnimals.map((animal) => {
                return (
                  <EarnerValue key={animal.tokenID + '_earner_'}>
                    {animal.name} - {animal.yield}/day
                  </EarnerValue>
                )
              })}
            </EarnerValueWrapper>
          )}
          <Label small>Recent Tansactions</Label>
          {waitTx ? (
            <TableText> Loading Transactions... </TableText>
          ) : transactions.length === 0 ? (
            <TableText> No Transaction Data </TableText>
          ) : (
            <Container>
              <TableContainer>
                <TableWrapper>
                  <StyledTable>
                    <TableBody>
                      <TableRow>
                        <TableHeader>Tx Hash</TableHeader>
                        <TableHeader>Action</TableHeader>
                        <TableHeader>Block Number</TableHeader>
                        <TableHeader>Token ID</TableHeader>
                      </TableRow>
                      {transactions.map((tx) => {
                        return (
                          <TableRow key={tx.id}>
                            <TableData>
                              <a href={tx.url}>{tx.hash}</a>
                            </TableData>
                            <TableData>{tx.action}</TableData>
                            <TableData>{tx.blockNumber}</TableData>
                            <TableData>
                              <a href={`/feed/myzoo/${tx.tokenID}`}>{tx.tokenID}</a>
                            </TableData>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </StyledTable>
                </TableWrapper>
              </TableContainer>
            </Container>
          )}
        </Body>
      </Page>
    </>
  )
}

export default Bank
