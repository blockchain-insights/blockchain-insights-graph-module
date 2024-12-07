import React, { useCallback } from "react";
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useStore,
} from "reactflow";

import { getEdgeParams } from "../../utils/graph";

export function SmoothStepEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  label,
  data,
}: EdgeProps & { data?: { labelStyle?: React.CSSProperties } }) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    console.error("Missing source or target node:", { sourceNode, targetNode });
    return null;
  }

  // Fallback function for safe values
  const safeValue = (value: number) =>
    typeof value === "number" && !isNaN(value) ? value : 0;

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: safeValue(sx),
    sourceY: safeValue(sy),
    targetX: safeValue(tx),
    targetY: safeValue(ty),
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  });

  // Default styles for the label
  const defaultLabelStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 50,
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 1)",
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
    fontWeight: "bold",
    pointerEvents: "all",
    textDecoration: "none",
    color: "white",
    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
  };

  const combinedLabelStyle = {
    ...defaultLabelStyle,
    ...(data?.labelStyles || {}),
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
      {label && (
        <EdgeLabelRenderer>
          <span style={combinedLabelStyle} className="nodrag nopan">
            {label}
          </span>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
