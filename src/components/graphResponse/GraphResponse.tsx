import React, { useMemo } from "react";
import { MarkerType, ReactFlowProvider } from "reactflow";
import GraphAutoLayout from "../graphAutoLayout/GraphAutoLayout";
import { TransactionNode } from "../nodes/TransactionNode";

// Define the types for the props
interface GraphResponseProps {
  response: {
    network: string;
    response?: {
      result?: Array<GraphNode | GraphEdge>;
    };
  };
  title?: string | ((graphData: boolean) => string); // Allow dynamic title based on graphData
  titleColor?: string; // Customizable title color
  borderColor?: string; // Customizable border color
  borderRadius?: string; // Customizable border radius
  containerStyles?: React.CSSProperties; // Customizable container styles
  transactionBoxStyle?: React.CSSProperties; // Customizable container styles
  width?: string; // Customizable width
  height?: string; // Customizable height
  noDataMessage?: string | ((response: any) => string); // Dynamic message for no data
  edgeLabelStyles?:
    | React.CSSProperties
    | ((edge: GraphEdge) => React.CSSProperties); // Dynamic styles for edge labels
  renderEdgeLabel?: (edge: GraphEdge) => React.ReactNode; // Custom render function for edge labels

  // Node customization props
  nodeContainerStyles?: React.CSSProperties;
  nodeTitleStyles?: React.CSSProperties;
  nodeIdStyles?: React.CSSProperties;
  nodeHandleStyles?: React.CSSProperties;
  nodeAnchorProps?: Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>; // Anchor props for nodes
}

// Define the types for nodes and edges
interface GraphNode {
  id: string;
  type: string;
  label: string;
  address: string;
  block_height?: number;
}

interface GraphEdge {
  id: string;
  tx_id: string;
  type: string;
  label: string;
  amount: number;
  timestamp: string;
  block_height: number;
  transaction_type: string;
  from_id: string;
  to_id: string;
}

const GraphResponse: React.FC<GraphResponseProps> = React.memo(
  ({
    response,
    title = "Graph View",
    titleColor = "#000000",
    borderColor = "#000000",
    borderRadius = "4px",
    containerStyles = {},
    height = "500px",
    width = "100%",
    noDataMessage = "No data available",
    edgeLabelStyles = {},
    renderEdgeLabel,
    nodeContainerStyles = {},
    nodeTitleStyles = {},
    nodeIdStyles = {},
    nodeHandleStyles = {},
    nodeAnchorProps = {},
  }) => {
    // Helper: Process Nodes
    const processNodes = (
      result: Array<GraphNode | GraphEdge>,
      nodeContainerStyles?: React.CSSProperties,
      nodeTitleStyles?: React.CSSProperties,
      nodeIdStyles?: React.CSSProperties,
      nodeHandleStyles?: React.CSSProperties,
      nodeAnchorProps?: Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>
    ) => {
      const network = response.network;
      return result
        .filter((item): item is GraphNode => item.type === "node")
        .map((node) => ({
          id: node.id,
          type: "addressNode",
          position: { x: 100, y: 100 },
          data: {
            title: node.label,
            containerStyles: {
              backgroundColor: nodeContainerStyles?.backgroundColor || "#333",
              border: nodeContainerStyles?.border || "1px solid #0EBC65",
              ...nodeContainerStyles,
            },
            titleStyles: {
              color: nodeTitleStyles?.color || "#FFD700",
              ...nodeTitleStyles,
            },
            idStyles: {
              color: nodeIdStyles?.color || "#FFF",
              ...nodeIdStyles,
            },
            handleStyles: {
              backgroundColor: nodeHandleStyles?.backgroundColor || "#FF0000",
              ...nodeHandleStyles,
            },
            anchorProps: {
              href:
                nodeAnchorProps?.href ||
                `https://www.blockchain.com/explorer/addresses/${
                  network.toLowerCase() === "bitcoin" ? "btc" : ""
                }/${node.id}`,
              target: nodeAnchorProps?.target || "_self",
              style: {
                color: nodeAnchorProps?.style?.color || "#0EBC65",
                textDecoration:
                  nodeAnchorProps?.style?.textDecoration || "underline",
                ...nodeAnchorProps?.style,
              },
              ...nodeAnchorProps,
            },
          },
        }));
    };

    // Helper: Process Edges
    const processEdges = (result: Array<GraphNode | GraphEdge>) =>
      result
        .filter((item): item is GraphEdge => item.type === "edge")
        .map((edge) => ({
          id: edge.id,
          source: edge.from_id,
          target: edge.to_id,
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: borderColor,
          },
          style: { stroke: borderColor },
          labelStyle:
            typeof edgeLabelStyles === "function"
              ? edgeLabelStyles(edge) // Dynamically evaluate if edgeLabelStyles is a function
              : edgeLabelStyles, // Use static styles if provided
          label: renderEdgeLabel ? (
            renderEdgeLabel(edge)
          ) : (
            <TransactionNode
              data={{
                transactionType: edge.transaction_type,
                transactionId: edge.tx_id,
                amount: edge.amount,
                network: response.network,
              }}
              id={""}
              selected={false}
              type={""}
              zIndex={0}
              isConnectable={true}
              xPos={0}
              yPos={0}
              dragging={false}
            />
          ),
        }));

    // Memoized Graph Data
    const graphData = useMemo(() => {
      if (!response?.response?.result) return undefined;

      const { result } = response.response;

      const nodes = processNodes(
        result,
        nodeContainerStyles, // Pass dynamic container styles
        nodeTitleStyles, // Pass dynamic title styles
        nodeIdStyles, // Pass dynamic ID styles
        nodeHandleStyles, // Pass dynamic handle styles
        nodeAnchorProps // Pass dynamic anchor props
      );
      const edges = processEdges(result);

      return { nodes, edges };
    }, [
      response,
      nodeContainerStyles,
      nodeTitleStyles,
      nodeIdStyles,
      nodeHandleStyles,
      nodeAnchorProps,
      renderEdgeLabel,
      borderColor,
      edgeLabelStyles,
      renderEdgeLabel,
    ]);

    // Dynamic values
    const dynamicTitle =
      typeof title === "function" ? title(!!graphData) : title;
    const dynamicNoDataMessage =
      typeof noDataMessage === "function"
        ? noDataMessage(response)
        : noDataMessage;

    return (
      <div
        style={{
          width: graphData ? width : "",
          height: graphData ? height : "fit-content",
          border: `1px solid ${borderColor}`,
          borderRadius,
          padding: "16px",
          ...containerStyles,
        }}
      >
        <h3 style={{ color: titleColor }}>{dynamicTitle}</h3>
        {!graphData ? (
          <p>{dynamicNoDataMessage}</p>
        ) : (
          <ReactFlowProvider>
            <GraphAutoLayout graphData={graphData} />
          </ReactFlowProvider>
        )}
      </div>
    );
  }
);

export default GraphResponse;
