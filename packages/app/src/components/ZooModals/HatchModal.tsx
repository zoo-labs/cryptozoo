import React from "react";
import styled from "styled-components";
import { Modal, Text as Standard } from "components";
import BorderButton from "components/Button/BorderButton";
import { Flex } from "components/Box";

interface Props {
   onDismiss?: () => void;
   confirmation: any;
}

const HatchModal: React.FC<Props> = ({
   onDismiss = () => null,
   confirmation,
}) => {
   function onConfirm() {
      confirmation();
      onDismiss();
   }
   return (
      <Modal title="Are you Sure?" onDismiss={onDismiss}>
         <Standard>{`You want to hatch this egg?`}</Standard>

         <Flex justifyContent="space-around" flexDirection="row" mt="16px">

            <BorderButton scale="sm" onClick={() => onConfirm()} >
               YES
            </BorderButton>
            <BorderButton scale="sm" onClick={() => onDismiss()}>
               No
            </BorderButton>
         </Flex>
      </Modal>
   );
};

export default HatchModal;
