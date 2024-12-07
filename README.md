# chain-insights-graph-module

`chain-insights-graph-module` is a React library for building custom graph visualizations using ReactFlow. It provides prebuilt components and utilities to streamline the creation of dynamic and interactive graph layouts.

## Features

- **Prebuilt Graph Components**: Simplify graph rendering with reusable React components.
- **Customizable Nodes and Edges**: Define custom styles and data for graph nodes and edges.
- **Dagre Layout Support**: Automatically arrange nodes and edges with customizable layouts.
- **TypeScript Support**: Fully typed for safer and more efficient development.

## Installation

You can install the package using `npm` or `pnpm`:

### Using npm

```bash
npm install chain-insights-graph-module
```

### Using pnpm

```bash
pnpm add chain-insights-graph-module
```

### CSS Import

To ensure the proper styling of the graph components, include the CSS file from the package at the top of your main application file:

### JavaScript

```javascript
import "chain-insights-graph-module/dist/chain-insights-graph-module.css";
```

This line imports the default styles for the graph components provided by the package. Make sure this is added before rendering any components from the package.

## Basic Usage

Here’s how you can get started with chain-insights-graph-module in your React project:

1. Import the Components

```javascript
import React from "react";
import { GraphResponse } from "chain-insights-graph-module";
```

2. Provide Data for Nodes and Edges
   Create mock data for your graph:

```javascript
const graphData = {
  response: {
    result: [
      {
        id: "node-1",
        type: "node",
        label: "Node 1",
        address: "Address 1",
      },
      {
        id: "node-2",
        type: "node",
        label: "Node 2",
        address: "Address 2",
      },
      {
        id: "edge-1",
        type: "edge",
        tx_id: "10001",
        label: "Edge Label",
        amount: 10,
        timestamp: "2024-02-15T17:16:00Z",
        from_id: "node-1",
        to_id: "node-2",
      },
    ],
  },
};
```

3. Render the Graph
   Use the GraphResponse component to render the graph with the provided data:

```javascript
const App = () => {
  return (
    <div>
      <GraphResponse
        // Pass your graph data
        response={graphData}
        // Title of the graph
        title="Custom Graph"
        // Custom title color
        titleColor="#0EBC65"
        // Border color of the container
        borderColor="#0EBC65"
        // Border radius of the container
        borderRadius="8px"
        // Additional styles for the container
        containerStyles={{ backgroundColor: "#F4F6F6", padding: "20px" }}
        // Height of the graph container
        height="600px"
        // Custom styles for edge labels
        edgeLabelStyles={{
          backgroundColor: "#0EBC65",
          color: "black",
          padding: "10px",
          borderRadius: "8px",
        }}
        // Customize edge rendering if needed
        renderEdgeLabel={(edge) => (
          <div>
            <div className="text-center">{edge.transaction_type}</div>
            <div>
              <strong>tx_id:</strong> {edge.tx_id}
            </div>
            <div>
              <strong>amount:</strong> {edge.amount}
            </div>
          </div>
        )}
        // Styling options for nodes
        nodeContainerStyles={{
          backgroundColor: "#333", // Background color for nodes
          border: "1px solid #0EBC65", // Border for nodes
        }}
        nodeTitleStyles={{
          color: "#0EBC65", // Title color for nodes
        }}
        nodeIdStyles={{
          color: "#0EBC65", // ID text color for nodes
        }}
        nodeHandleStyles={{
          backgroundColor: "#FF0000", // Handle color for connecting nodes
        }}
        nodeAnchorProps={{
          href: "https://custom-link.com", // Hyperlink for the node
          target: "_blank", // Open link in a new tab
          style: { color: "#00FF00", textDecoration: "none" }, // Style for the anchor
        }}
      />
    </div>
  );
};
```

## API Documentation

### GraphResponse
| Name               | Type                                                      | Default          | Description                                                                                 |
|--------------------|-----------------------------------------------------------|------------------|---------------------------------------------------------------------------------------------|
| `response`         | `object`                                                  | `undefined`      | The graph data including nodes and edges.                                                  |
| `title`            | `string | (graphData: boolean) => string`                 | `"Graph View"`   | The title of the graph. Supports dynamic titles based on graph data availability.          |
| `titleColor`       | `string`                                                  | `"#000000"`      | Customizable title color.                                                                  |
| `borderColor`      | `string`                                                  | `"#000000"`      | Customizable border color for the graph container.                                         |
| `borderRadius`     | `string`                                                  | `"4px"`          | Customizable border radius for the graph container.                                        |
| `containerStyles`  | `React.CSSProperties`                                     | `{}`             | Additional styles for the container.                                                       |
| `height`           | `string`                                                  | `"500px"`        | Height of the graph container.                                                             |
| `edgeLabelStyles`  | `React.CSSProperties`                                     | `{}`             | Customizable styles for edge labels.                                                       |
| `renderEdgeLabel`  | `(edge: GraphEdge) => React.ReactNode`                    | `undefined`      | Custom render function for edge labels.                                                    |
| `nodeContainerStyles` | `React.CSSProperties`                                  | `{}`             | Additional styles for the node container.                                                  |
| `nodeTitleStyles`  | `React.CSSProperties`                                     | `{}`             | Additional styles for the node title.                                                      |
| `nodeIdStyles`     | `React.CSSProperties`                                     | `{}`             | Additional styles for the node ID.                                                         |
| `nodeHandleStyles` | `React.CSSProperties`                                     | `{}`             | Additional styles for the node handles.                                                    |
| `nodeAnchorProps`  | `Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>` | `{}`             | Props for the anchor element wrapping the node.                                             |