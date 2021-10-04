import { Flex, Label, Text } from 'components'
import BorderButton from 'components/Button/BorderButton'
import { BottomModal } from 'components/Modal'
import { useZooKeeper } from 'hooks/useContract'
import useWeb3 from 'hooks/useWeb3'
import React, { useEffect, useState } from 'react'

interface Props {
  onDismiss?: () => null
  item?: any
  animalGroup?: { [key: string]: number }
}
// rgb(254 29 135) Darker PINK
const YieldModal: React.FC<Props> = ({ item, onDismiss, animalGroup }) => {
  const [pendingTsx, setPending] = useState(false)
  const { account, chainId, library: web3 } = useWeb3()
  const zooKeeper = useZooKeeper()
  const multiplier = animalGroup[item.name]
  const canFree = item.owner.toLowerCase() === account.toLowerCase()

  useEffect(() => {
    return null
  }, [account])

  const callFreeAnimal = () => {
    try {
      setPending(true)
      const tknId = web3.utils.toBN(item.tokenID)
      zooKeeper.methods
        .freeAnimal(tknId)
        .send({ from: account })
        .then(() => {
          setPending(false)
          window.location.href = '/account'
        })
        .catch((e) => {
          console.error('THERE WAS AN ISSUE FREEING THE ANIMAL \n', e)
          setPending(false)
        })
    } catch (e) {
      console.error('THERE WAS AN ISSUE FREEING THE ANIMAL \n', e)
      setPending(false)
    }
  }

  // Calculate yield
  const daysOld = (Date.now() - item.dob) / 86400000
  const totalYield = daysOld > 0 ? (item.yield * daysOld).toFixed(8) : 0

  return (
    <>
      <BottomModal header='Yield Info' height='300px' onDismiss={onDismiss}>
        <Flex justifyContent='center' alignContent='center' flexDirection='column' ml='20px' mt='20px'>
          <Label fontSize='20px' color='text' fontWeight='550'>
            Daily Yield
          </Label>
          <Text bold ml='16px' mt='4px' mb='16px' fontSize='22px' color='text'>
            {multiplier ? `${multiplier} x ${Number(item.yield)} = ${multiplier * Number(item.yield)}` : `${Number(item.yield)}`} ZOO
          </Text>
          <Label fontSize='20px' color='text' fontWeight='550'>
            Accumulated Yield
          </Label>
          <Text bold ml='16px' mt='4px' mb='16px' fontSize='22px' color='text'>
            {totalYield} ZOO
          </Text>
          {canFree && (
            <Flex flexDirection='row' justifyContent='space-around'>
              <BorderButton onClick={() => callFreeAnimal()} scale='md'>
                Free Animal
              </BorderButton>
            </Flex>
          )}
        </Flex>
      </BottomModal>
    </>
  )
}
export default YieldModal
