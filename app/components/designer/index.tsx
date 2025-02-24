import { Background, Controls, ReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { shallow } from "zustand/shallow";
import { useStore, type StorePayload } from "./store";
import { Blend } from "./blend";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const selector = (store: StorePayload) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  onConnect: store.onConnect,
});

const nodeTypes = {
  blend: Blend,
};

export function Designer({ ...props }: Props) {
  const store = useStore(selector, shallow);

  return (
    <div {...props}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={store.nodes}
          edges={store.edges}
          nodeTypes={nodeTypes}
          onNodesChange={store.onNodesChange}
          onEdgesChange={store.onEdgesChange}
          onConnect={store.onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
