import React from "react";
import { NodeProps } from "reactflow";

export interface TransactionNodeProps {
  transactionType: string;
  transactionId: string;
  network: string;
  amount: number;
}

export const TransactionNode: React.FC<NodeProps<TransactionNodeProps>> = ({
  data,
}) => {
  return (
    <a
      href={`https://www.blockchain.com/explorer/transactions/${
        data.network.toLowerCase() === "bitcoin" ? "btc" : ""
      }/${data.transactionId}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "initial" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ textAlign: "center" }}>
          <strong>{data.transactionType}</strong>
        </div>
        <div>
          <strong>ID:</strong> {data.transactionId}
        </div>
        <div>
          <strong>Amount:</strong> {data.amount}
        </div>
      </div>
    </a>
  );
};
