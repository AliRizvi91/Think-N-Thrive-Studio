import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MiniLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent">
      {/* Black background circle */}

      <div role="status">
        <AiOutlineLoading3Quarters className="w-15 h-15 text-pink-500"/>
      </div>

    </div>
  );
}