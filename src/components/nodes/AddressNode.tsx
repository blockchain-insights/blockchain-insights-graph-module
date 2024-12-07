import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

export interface AddressNodeData {
  title: string;
  containerStyles?: React.CSSProperties;
  titleStyles?: React.CSSProperties;
  idStyles?: React.CSSProperties;
  handleStyles?: React.CSSProperties;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export const AddressNode: React.FC<NodeProps<AddressNodeData>> = ({ id, data }) => {
  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        style={{ display: "none", ...data?.handleStyles }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ display: "none", ...data?.handleStyles }}
        isConnectable={true}
      />
      <a {...data?.anchorProps}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", height: "100%" }}>
          <div
            style={{
              zIndex: 50,
              display: "flex",
              width: "20rem",
              flexDirection: "column",
              gap: "0.75rem",
              wordBreak: "break-all",
              borderRadius: "0.5rem",
              border: "1px solid",
              backgroundColor: "#26272E",
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: 600,
              lineHeight: "1",
              color: "#0EBC65",
              ...data?.containerStyles,
            }}
          >
            <p style={{ margin: 0, ...data?.titleStyles }}>{data?.title}</p>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 400,
                margin: 0,
                ...data?.idStyles,
              }}
            >
              {id}
            </p>
          </div>
        </div>
      </a>
    </>
  );
};
