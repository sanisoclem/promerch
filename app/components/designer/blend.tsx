import { Handle, Position } from "@xyflow/react";
import { useStore, type StorePayload } from "./store";
import { shallow } from "zustand/shallow";

type Props = {
  id: string;
  data: {
    frequency: number;
    type: "sine" | "triangle" | "sawtooth" | "square";
  };
};

const selector = (id: string) => (store: StorePayload) => ({
  setFrequency: (e: number) => store.updateNode(id, { frequency: e }),
  setType: (e: "sine" | "triangle" | "sawtooth" | "square") =>
    store.updateNode(id, { type: e }),
});

export function Blend({ id, data }: Props) {
  const { setFrequency, setType } = useStore(selector(id), shallow);

  return (
    <div className="shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex flex-col">
        <div className="px-2 py-1 font-semibold text-white bg-emerald-500">
          Oscillator Node
        </div>
        <div className="px-2 py-1 flex flex-col gap-y-2">
          <label>
            <span>Frequency</span>
            <input
              className="nodrag"
              type="range"
              min="10"
              max="1000"
              value={data.frequency}
              onChange={(e) => setFrequency(+e.target.value)}
            />
            <span>{data.frequency}Hz</span>
          </label>
          <label>
            <span>Waveform</span>
            <select
              className="nodrag"
              value={data.type}
              onChange={(e) =>
                setType(
                  e.target.value as "sine" | "triangle" | "sawtooth" | "square"
                )
              }
            >
              <option value="sine">sine</option>
              <option value="triangle">triangle</option>
              <option value="sawtooth">sawtooth</option>
              <option value="square">square</option>
            </select>
          </label>
        </div>
      </div>

      <Handle type="source" position={Position.Right}  />
    </div>
  );
}
