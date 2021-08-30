import {
  useEthPrice,
  useFarms,
  useNativePrice,
  useOneDayBlock,
  useOneWeekBlock,
  useSushiPairs,
  useTokens,
} from '../../../services/graph'
import { useMemo, useState } from 'react'

import AnalyticsContainer from '../../../features/analytics/AnalyticsContainer'
import ChartCard from '../../../features/analytics/Dashboard/ChartCard'
import Container from '../../../components/Container'
import DashboardTabs from '../../../features/analytics/Dashboard/DashboardTabs'
import Head from 'next/head'
import PairList from '../../../features/analytics/Pairs/PairList'
import PoolList from '../../../features/analytics/Pools/PoolsList'
import Search from '../../../components/Search'
import TokenList from '../../../features/analytics/Tokens/TokenList'
import useFarmRewards from '../../../hooks/useFarmRewards'
import { useFuse } from '../../../hooks'
import { useKashiPairs } from '../../../services/graph/index'
import { useRouter } from 'next/router'

// TODO: Top Pools: Rewards, APR
export default function Dashboard(): JSX.Element {
  const router = useRouter()
  const type: any = ['pools', 'pairs', 'tokens'].includes(router.query.type?.[0]) ? router.query.type?.[0] : 'pools'

  const block1d = useOneDayBlock()
  const block1w = useOneWeekBlock()

  // For Top Pairs
  const pairs = useSushiPairs()
  const pairs1d = useSushiPairs({ block: { number: Number(block1d) } })
  const pairs1w = useSushiPairs({ block: { number: Number(block1w) } })

  const pairsFormatted = useMemo(() => {
    return pairs && pairs1d && pairs1w
      ? pairs.map((pair) => {
          const pair1d = pairs1d.find((p) => pair.id === p.id) ?? pair
          const pair1w = pairs1w.find((p) => pair.id === p.id) ?? pair1d

          return {
            pair: {
              address0: pair.token0.id,
              address1: pair.token1.id,
              symbol0: pair.token0.symbol,
              symbol1: pair.token1.symbol,
              name0: pair.token0.name,
              name1: pair.token1.name,
            },
            liquidity: pair.reserveUSD,
            volume1d: pair.volumeUSD - pair1d.volumeUSD,
            volume1w: pair.volumeUSD - pair1w.volumeUSD,
          }
        })
      : []
  }, [pairs, pairs1d, pairs1w])

  // For Top Farms
  const farms = useFarmRewards()
  const kashiPairs = useKashiPairs()
  const nativePrice = useNativePrice()
  const farmsFormatted = useMemo(() => {
    return farms && (pairs || (kashiPairs && nativePrice))
      ? farms
          .map((farm) => ({
            pair: {
              address0: farm.pair.token0.id,
              address1: farm.pair.token1.id,
              symbol: farm.pair.symbol ?? `${farm.pair.token0.symbol}-${farm.pair.token1.symbol}`,
            },
            rewards: farm.rewards,
            liquidity: farm.tvl,
            apr: farm.roiPerYear * 100,
          }))
          .filter((farm) => (farm ? true : false))
      : []
  }, [farms, pairs, kashiPairs, nativePrice])

  // For Top Tokens
  const ethPrice = useEthPrice()
  const ethPrice1d = useEthPrice({ block: { number: Number(block1d) } })
  const ethPrice1w = useEthPrice({ block: { number: Number(block1w) } })

  const tokens = useTokens()
  const tokens1d = useTokens({ block: { number: Number(block1d) } })
  const tokens1w = useTokens({ block: { number: Number(block1w) } })

  const tokensFormatted = useMemo(
    () =>
      tokens && tokens1d && tokens1w && ethPrice && ethPrice1d && ethPrice1w
        ? tokens.map((token) => {
            const token1d = tokens1d.find((p) => token.id === p.id) ?? token
            const token1w = tokens1w.find((p) => token.id === p.id) ?? token

            return {
              token: {
                address: token.id,
                symbol: token.symbol,
                name: token.name,
              },
              liquidity: token.liquidity * token.derivedETH * ethPrice,
              volume24h: token.volumeUSD - token1d.volumeUSD,
              price: token.derivedETH * ethPrice,
              change1d: ((token.derivedETH * ethPrice) / (token1d.derivedETH * ethPrice1d)) * 100 - 100,
              change1w: ((token.derivedETH * ethPrice) / (token1w.derivedETH * ethPrice1w)) * 100 - 100,
            }
          })
        : [],
    [ethPrice, ethPrice1d, ethPrice1w, tokens, tokens1d, tokens1w]
  )

  const { options, data } = useMemo(() => {
    switch (type) {
      case 'pools':
        return {
          options: {
            keys: ['pair.address0', 'pair.address1', 'pair.symbol', 'pair.symbol'],
            threshold: 0.4,
          },
          data: farmsFormatted,
        }

      case 'pairs':
        return {
          options: {
            keys: ['pair.address0', 'pair.address1', 'pair.symbol0', 'pair.symbol1', 'pair.name0', 'pair.name1'],
            threshold: 0.4,
          },
          data: pairsFormatted,
        }

      case 'tokens':
        return {
          options: {
            keys: ['token.address', 'token.symbol', 'token.name'],
            threshold: 0.4,
          },
          data: tokensFormatted,
        }
    }
  }, [type, farmsFormatted, pairsFormatted, tokensFormatted])

  const {
    result: searched,
    term,
    search,
  } = useFuse({
    data,
    options,
  })

  return (
    <AnalyticsContainer>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ChartCard type="liquidity" />
        <ChartCard type="volume" />
      </div>
      <div className="flex flex-row items-center">
        <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.46492 19.7858H2.10026C1.41438 19.7858 0.85321 19.3047 0.85321 18.7168V8.02622C0.85321 7.43824 1.41438 6.95717 2.10026 6.95717H6.46492C7.15079 6.95717 7.71197 7.43824 7.71197 8.02622V18.7168C7.71197 19.3047 7.15079 19.7858 6.46492 19.7858ZM15.506 0.542847H11.1413C10.4555 0.542847 9.8943 1.02392 9.8943 1.6119V18.7168C9.8943 19.3047 10.4555 19.7858 11.1413 19.7858H15.506C16.1919 19.7858 16.7531 19.3047 16.7531 18.7168V1.6119C16.7531 1.02392 16.1919 0.542847 15.506 0.542847ZM24.5471 9.09528H20.1824C19.4966 9.09528 18.9354 9.57635 18.9354 10.1643V18.7168C18.9354 19.3047 19.4966 19.7858 20.1824 19.7858H24.5471C25.233 19.7858 25.7941 19.3047 25.7941 18.7168V10.1643C25.7941 9.57635 25.233 9.09528 24.5471 9.09528Z"
            fill="#E3E3E3"
          />
        </svg>
        <div className="ml-3 text-lg font-bold text-high-emphesis">Leaderboard</div>
      </div>
      <Search term={term} search={search} />
      <DashboardTabs />
      {type === 'pools' && <PoolList pools={searched} />}
      {type === 'pairs' && <PairList pairs={searched} type={'all'} />}
      {type === 'tokens' && <TokenList tokens={searched} />}
    </AnalyticsContainer>
  )
}
