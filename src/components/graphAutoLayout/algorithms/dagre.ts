import dagre from '@dagrejs/dagre'
import { Edge, Node } from 'reactflow'

// Define the type for layout options
export interface LayoutOptions {
  direction: 'TB' | 'BT' | 'LR' | 'RL' // Top-Bottom, Bottom-Top, Left-Right, Right-Left
  spacing: [number, number] // [nodeSpacing, rankSpacing]
}

// Initialize the Dagre graph
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

// Define the layout function
const dagreLayout = async (
  nodes: Node[], // React Flow Nodes
  edges: Edge[], // React Flow Edges
  options: LayoutOptions // Layout options
): Promise<{ nodes: Node[]; edges: Edge[] }> => {
  // Set graph configuration
  dagreGraph.setGraph({
    rankdir: options.direction, // Direction of the layout
    nodesep: options.spacing[0], // Node separation
    ranksep: options.spacing[1], // Rank separation
  })

  // Add nodes to the Dagre graph
  for (const node of nodes) {
    dagreGraph.setNode(node.id, {
      width: node.width ?? 0,
      height: node.height ?? 0,
    })

    // Uncomment the following block if parent-child relationships are needed
    // Dagre currently has an open issue preventing proper sub-flow layouts:
    // See: https://github.com/dagrejs/dagre/issues/238

    // if (node.parentNode) {
    //   dagreGraph.setParent(node.id, node.parentNode);
    // }
  }

  // Add edges to the Dagre graph
  for (const edge of edges) {
    dagreGraph.setEdge(edge.source, edge.target)
  }

  // Perform the layout
  dagre.layout(dagreGraph)

  // Update node positions
  const nextNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id)
    const position = {
      x: x - (node.width ?? 0) / 2,
      y: y - (node.height ?? 0) / 2,
    }

    return { ...node, position }
  })

  return { nodes: nextNodes, edges }
}

export default dagreLayout
