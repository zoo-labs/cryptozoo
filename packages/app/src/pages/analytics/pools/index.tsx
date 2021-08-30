import { useMemo } from 'react'
import Search from '../../../components/Search'
import AnalyticsContainer from '../../../features/analytics/AnalyticsContainer'
import PoolList from '../../../features/analytics/Pools/PoolsList'
import { useFuse } from '../../../hooks'
import useFarmRewards from '../../../hooks/useFarmRewards'
import { useKashiPairs, useSushiPairs } from '../../../services/graph'

// TODO: Rewards, APR
export default function Pools(): JSX.Element {
  const pairs = useSushiPairs()
  const farms = useFarmRewards()
  const kashiPairs = useKashiPairs()

  const farmsFormatted = useMemo(() => {
    return farms && pairs && kashiPairs
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
  }, [farms, pairs, kashiPairs])

  const options = useMemo(
    () => ({
      keys: ['pair.address0', 'pair.address1', 'pair.symbol'],
      threshold: 0.4,
    }),
    []
  )

  const {
    result: poolsSearched,
    term,
    search,
  } = useFuse({
    data: farmsFormatted,
    options,
  })

  return (
    <AnalyticsContainer>
      <div className="ml-3 text-2xl font-bold text-high-emphesis">Pools</div>
      <Search term={term} search={search} />
      <PoolList pools={poolsSearched} />
    </AnalyticsContainer>
  )
}
