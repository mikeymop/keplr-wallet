import React, { FunctionComponent } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router";

import styleTransfer from "./ibc-transfer.module.scss";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Dec } from "@keplr-wallet/unit";

export const IBCTransferView: FunctionComponent = observer(() => {
  const history = useHistory();
  const { accountStore, chainStore, queriesStore } = useStore();

  const accountInfo = accountStore.getAccount(chainStore.current.chainId);
  const queries = queriesStore.get(chainStore.current.chainId);
  const queryBalances = queries
    .getQueryBalances()
    .getQueryBech32Address(accountInfo.bech32Address);

  const hasAssets =
    queryBalances.balances.find((bal) => bal.balance.toDec().gt(new Dec(0))) !==
    undefined;

  return (
    <div className={styleTransfer.containerInner}>
      <div className={styleTransfer.vertical}>
        <p
          className={classnames(
            "h2",
            "my-0",
            "font-weight-normal",
            styleTransfer.paragraphMain
          )}
        >
          IBC Transfer
        </p>
        <p
          className={classnames(
            "h4",
            "my-0",
            "font-weight-normal",
            styleTransfer.paragraphSub
          )}
        >
          Send tokens over IBC
        </p>
      </div>
      <div style={{ flex: 1 }} />
      <Button
        className={styleTransfer.button}
        color="primary"
        size="sm"
        disabled={!hasAssets}
        data-loading={accountInfo.isSendingMsg === "ibcTransfer"}
        onClick={(e) => {
          e.preventDefault();

          history.push("/ibc-transfer");
        }}
      >
        Transfer
      </Button>
    </div>
  );
});