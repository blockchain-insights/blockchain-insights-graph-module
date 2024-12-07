import { AddressNode, AddressNodeData } from "../../nodes/AddressNode";
import { TransactionNode, TransactionNodeProps } from "../../nodes/TransactionNode";
import { NodeProps } from "reactflow";

// Create type aliases for clarity
type AddressNodeComponent = React.FC<NodeProps<AddressNodeData>>;
type TransactionNodeComponent = React.FC<NodeProps<TransactionNodeProps>>;

// Explicitly type the nodeTypes object
const nodeTypes: {
  addressNode: AddressNodeComponent;
  transaction: TransactionNodeComponent;
} = {
  addressNode: AddressNode,
  transaction: TransactionNode,
};

export default nodeTypes;
