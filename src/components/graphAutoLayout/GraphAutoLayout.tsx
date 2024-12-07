import React from "react";
import { useEffect } from "react";
import ReactFlow, {
  ConnectionLineType,
  Edge,
  MarkerType,
  Node,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import edgeTypes from "./graphTypes/edgeTypes";
import nodeTypes from "./graphTypes/nodeTypes";
import useAutoLayout from "./useAutoLayout";

import "reactflow/dist/style.css";

type CryptoGraph = {
  nodes: Node[];
  edges: Edge[];
};

interface GraphAutoLayoutProps {
  graphData: CryptoGraph;
  edgeOptions?: typeof defaultEdgeOptions;
  proOptions?: { account: string; hideAttribution: boolean };
  enableZoom?: boolean; // Allow toggling zoom functionality
  draggableNodes?: boolean; // Allow toggling node drag functionality
}

const defaultProOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "#FFC29A",
  },
  transactionBoxStyle: { color: "#FFC29A" },
  pathOptions: { offset: 5 },
  style: {
    stroke: "#FFC29A",
  },
};

function GraphAutoLayout({
  graphData,
  edgeOptions = defaultEdgeOptions,
  proOptions = defaultProOptions,
  enableZoom = true,
  draggableNodes = true,
}: GraphAutoLayoutProps) {
  const { fitView } = useReactFlow();

  // Destructure graph data for state initialization
  const { nodes: initialNodes, edges: initialEdges } = graphData;

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Automatically compute layout whenever nodes or edges change
  useAutoLayout();

  // Center the graph view on changes
  useEffect(() => {
    fitView();
  }, [nodes, fitView]);

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges.map((edge) => ({
        ...edge,
        type: edge.type || "smoothstep",
        data: { labelStyles: edge.labelStyle || {} }, // Pass labelStyles dynamically
      }))}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodesDraggable={draggableNodes}
      defaultEdgeOptions={edgeOptions}
      connectionLineType={ConnectionLineType.SmoothStep}
      proOptions={proOptions}
      zoomOnDoubleClick={enableZoom}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    />
  );
}

export default GraphAutoLayout;
