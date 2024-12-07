import React from "react";
import { getBezierPath, Node, Position } from "reactflow";

import { getEdgeParams } from "../../utils/graph";

export interface FloatingConnectionLineProps {
  toX: number;
  toY: number;
  fromPosition?: Position;
  toPosition?: Position;
  fromNode?: Node | undefined;
}

export function FloatingConnectionLine({
  toX,
  toY,
  fromPosition,
  toPosition,
  fromNode,
}: FloatingConnectionLineProps) {
  if (!fromNode) {
    return null;
  }

  const targetNode = {
    id: "connection-target",
    width: 1,
    height: 1,
    positionAbsolute: { x: toX, y: toY },
  };

  const { sx, sy } = getEdgeParams(fromNode, targetNode);
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke="#222"
        strokeWidth={1.5}
      />
    </g>
  );
}
