import React from 'react';
import styled from 'styled-components';
import { Label, Text, Flex, Button } from 'components'
import { BottomModal } from 'components/Modal';

interface Props {
    onDismiss?: () => null
    item?: any
}

const YieldModal: React.FC<Props> = ({ item,   onDismiss }) => {
        return (
            <>
                <BottomModal header="Yield Info" onDismiss={onDismiss}>
                    <Flex justifyContent="center" alignContent="center" flexDirection="column" ml="20px" mt="20px">
                        <Label fontSize="22px" color="#C82064" fontWeight="550">
                            Daily Yield
                        </Label>
                        <Text bold ml="16px" fontSize="22px" color="background">
                            {item.yield}
                        </Text>
                        <Label fontSize="22px" color="#C82064" fontWeight="550">
                            Accumulated Yield
                        </Label>
                        <Text bold ml="16px" fontSize="22px" color="background">
                            {Math.floor(item.yield * (Math.random() * (12 - 1) + (1)))}
                        </Text>
                        <Flex justifyContent="center" mt="16px">
                       <Button width="250px" variant="primary" color="black" scale="md" style={{border: "0px", letterSpacing: ".1rem", boxShadow: "none", textTransform:"uppercase"}}>
                            Bid
                            </Button>
                            </Flex>
                    </Flex>
                     
                </BottomModal>
            </>
        );
}
export default YieldModal
