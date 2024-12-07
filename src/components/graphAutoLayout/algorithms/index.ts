import dagreLayout from './dagre';
import { Node, Edge } from 'reactflow';
import { LayoutOptions } from './dagre'; // Explicit import

// Explicitly define and export the index object
const algorithms = {
  dagre: (
    nodes: Node[],
    edges: Edge[],
    options: LayoutOptions
  ): Promise<{ nodes: Node[]; edges: Edge[] }> => dagreLayout(nodes, edges, options),
};

export { LayoutOptions }; // Re-export the LayoutOptions type
export default algorithms;
