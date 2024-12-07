import { useEffect } from 'react'
import { Edge, Node, NodeInternals, ReactFlowState, useNodesInitialized, useReactFlow, useStore } from 'reactflow'

import dagreLayout from './algorithms/dagre'
import { getSourceHandlePosition, getTargetHandlePosition } from './utils'

type LayoutDirection = 'TB' | 'LR' | 'RL' | 'BT'

interface LayoutOptions {
  direction: LayoutDirection
  spacing: [number, number]
}

function useAutoLayout() {
  const { setNodes, setEdges } = useReactFlow()
  const nodesInitialized = useNodesInitialized()

  // Storing a map of nodes and edges with a custom equality function
  const elements = useStore(
    (state: ReactFlowState) => ({
      nodeMap: state.nodeInternals,
      edgeMap: state.edges.reduce<Map<string, Edge>>((acc, edge) => acc.set(edge.id, edge), new Map()),
    }),
    compareElements
  )

  useEffect(() => {
    if (!nodesInitialized || elements.nodeMap.size === 0) {
      return
    }

    const runLayout = async () => {
      const layoutAlgorithm = dagreLayout
      const nodes = Array.from(elements.nodeMap.values())
      const edges = Array.from(elements.edgeMap.values())

      const { nodes: nextNodes, edges: nextEdges } = await layoutAlgorithm(nodes, edges, {
        direction: 'LR',
        spacing: [100, 200],
      } as LayoutOptions)

      for (const node of nextNodes) {
        node.style = { ...node.style, opacity: 1 }
        node.sourcePosition = getSourceHandlePosition('LR')
        node.targetPosition = getTargetHandlePosition('LR')
      }

      for (const edge of edges) {
        edge.style = { ...edge.style, opacity: 1 }
      }

      setNodes(nextNodes)
      setEdges(nextEdges)
    }

    runLayout()
  }, [nodesInitialized, elements, setNodes, setEdges])
}

export default useAutoLayout

// Comparison Functions
function compareElements(
  xs: { nodeMap: NodeInternals; edgeMap: Map<string, Edge> },
  ys: { nodeMap: NodeInternals; edgeMap: Map<string, Edge> }
): boolean {
  return compareNodes(xs.nodeMap, ys.nodeMap) && compareEdges(xs.edgeMap, ys.edgeMap)
}

function compareNodes(xs: NodeInternals, ys: NodeInternals): boolean {
  if (xs.size !== ys.size) return false
  const entries = Array.from(xs.entries())

  for (const [id, x] of entries) {
    const y = ys.get(id)

    if (!y) return false

    if (x.resizing || x.dragging) return true
    if (x.width !== y.width || x.height !== y.height) return false
  }

  return true
}

function compareEdges(xs: Map<string, Edge>, ys: Map<string, Edge>): boolean {
  if (xs.size !== ys.size) return false

  const entries = Array.from(xs.entries())
  for (const [id, x] of entries) {
    const y = ys.get(id)

    if (!y) return false
    if (x.source !== y.source || x.target !== y.target) return false
    if (x?.sourceHandle !== y?.sourceHandle) return false
    if (x?.targetHandle !== y?.targetHandle) return false
  }

  return true
}
