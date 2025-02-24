import { Designer } from "~/components/designer";

export default function Design() {
  return (
    <div className="flex flex-col">
      <div className="p-4 h-[80px]">Designer</div>
      <Designer className="w-screen h-[calc(100vh-80px)]" />
    </div>
  );
}
