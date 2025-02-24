import {
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type Node,
  type EdgeChange,
  type Edge,
  type Connection,
  Position,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { createWithEqualityFn } from "zustand/traditional";

export type StorePayload = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (c: NodeChange<Node>[]) => void;
  onEdgesChange: (c: EdgeChange<Edge>[]) => void;
  onConnect: (c: Connection) => void;
  updateNode: (
    id: string,
    data: Partial<{
      frequency: number;
      type: "sine" | "triangle" | "sawtooth" | "square";
    }>
  ) => void;
};

export const useStore = createWithEqualityFn<StorePayload>((set, get) => ({
  nodes: [
    {
      type: "blend",
      id: "a",
      data: { frequency: 220, type: "square" },
      position: { x: 0, y: 0 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
    {
      id: "b",
      data: { label: "gain" },
      position: { x: 50, y: 200 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
  ],
  edges: [
    {
      id: "horizontal-e6-8",
      source: "a",
      type: "smoothstep",
      target: "b",
      animated: true,
    },
  ],
  onNodesChange(changes: NodeChange<Node>[]) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange(changes: EdgeChange<Edge>[]) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect(data: Connection) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
  },
  updateNode(
    id: string,
    data: Partial<{
      frequency: number;
      type: "sine" | "triangle" | "sawtooth" | "square";
    }>
  ) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
}));
