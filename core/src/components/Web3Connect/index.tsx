import Button, { ButtonProps } from "../Button";

import { Activity } from "react-feather";
import React from "react";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useWalletModalToggle } from "../../state/application/hooks";
import { useActiveWeb3React } from "hooks";

export default function Web3Connect({
  color = "gray",
  size = "sm",
  className = "",
  title,
  ...rest
}: ButtonProps) {
  const { i18n } = useLingui();
  const toggleWalletModal = useWalletModalToggle();
  const { error } = useActiveWeb3React();
  return error ? (
    <div
      className="flex items-center justify-center px-4 py-2 font-semibold text-white border rounded hover:bg-opacity-100"
      onClick={toggleWalletModal}
    >
      <div className="mr-1">
        <Activity className="w-4 h-4" />
      </div>
      {/* {error instanceof UnsupportedChainIdError
        ? i18n._(t`You are on the wrong network`)
        : i18n._(t`Error`)} */}
    </div>
  ) : (
    <Button
      id="connect-wallet"
      onClick={toggleWalletModal}
      variant="outlined"
      color={color}
      className={className}
      size={size}
      {...rest}
    >
      {title}
    </Button>
  );
}